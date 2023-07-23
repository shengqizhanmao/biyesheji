package com.lin.common.service.impl;

import com.alibaba.excel.util.StringUtils;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.lin.common.RedisStatus;
import com.lin.common.Result;
import com.lin.common.mapper.ArticleMapper;
import com.lin.common.pojo.*;
import com.lin.common.pojo.Vo.ArticleContentVo;
import com.lin.common.pojo.Vo.ArticleNoContentVo;
import com.lin.common.pojo.Vo.ArticleVo;
import com.lin.common.pojo.Vo.UserTokenVo;
import com.lin.common.service.*;
import com.lin.common.utils.MinioUtils;
import com.lin.common.utils.PagesHashMap;
import io.minio.GetObjectResponse;
import org.springframework.beans.BeanUtils;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.stereotype.Service;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.*;
import java.util.List;
import java.util.concurrent.TimeUnit;

/**
 * <p>
 * 服务实现类
 * </p>
 *
 * @author linShengWei
 * @since 2023-02-22
 */
@Service
public class ArticleServiceImpl extends ServiceImpl<ArticleMapper, Article> implements ArticleService {

    @Resource
    private DataSourceTransactionManager dataSourceTransactionManager;
    @Resource
    private TransactionDefinition transactionDefinition;
    @Resource
    private RedisTemplate<String,String> redisTemplate;
    @Resource
    private ArticleMapper articleMapper;
    @Resource
    private ArticleTagsService articleTagsService;
    @Resource
    private BodyService bodyService;
    @Resource
    private UserService userService;
    @Resource
    private TagsService tagsService;
    @Resource
    private CategoryService categoryService;
    @Resource
    private PalteService palteService;
    @Resource
    private ModularsService modularsService;
    @Resource
    private ArticleLikesCollectionService articleLikesCollectionService;
    @Resource
    private CommentService commentService;

    @Resource
    private MinioUtils minioUtils;

    //上传图片
    @Override
    public Result img(MultipartFile file) {
        //获取上传文件的文件名
        String fileName = file.getOriginalFilename();
        //获取上传文件的类型是否为图片,获取的是文件的类型，注意是文件的类型，不是文件的拓展名。
        String contentType = file.getContentType();
        //只要其中之一满足了就为图片
        if (!(Objects.equals(contentType, "image/png")
                || Objects.equals(contentType, "image/jpeg")
                || Objects.equals(contentType, "image/bmp")
                || Objects.equals(contentType, "image/gif"))){
            return Result.fail("上传图片失败,非图片,允许类型为image/png和image/jpeg、image/bmp、image/gif");
        }

        //判断是否为恶意文件
        try {
            //转换失败说明不是图片
            BufferedImage read = ImageIO.read(file.getInputStream());
            int width = read.getWidth();
            int height = read.getHeight();
            //宽和高是否有值,无值说明不是图片
            if(width==0||height==0){
                return Result.fail("上传图片失败,非图片");
            }
        } catch (IOException e) {
            return Result.fail("上传图片失败,非图片");
        }
        // 为了避免文件名重复，使用UUID重命名文件，将横杠去掉
        String uuid = UUID.randomUUID().toString().replace("-", "");
        String newFileName = uuid + fileName;
        minioUtils.MinioUtilsUpdate("article");
        //上传文件到minio服务器
        try {
            String s = minioUtils.putObject(file.getInputStream(), newFileName, file.getContentType());
            // 返回文件名,图片地址
            String fileName2 = s + "/" + newFileName;
            //
            redisTemplate.opsForValue().set(RedisStatus.ARTICLE_IMAGES+newFileName,newFileName,1,TimeUnit.HOURS);
            redisTemplate.opsForValue().set(RedisStatus.GQ_ARTICLE_IMAGES+newFileName,newFileName);
            //进行修改头像
            return Result.succ("获取图片成功", fileName2);
        } catch (Exception e) {
            log.error("上传图片失败，原因是" + e);
            return Result.fail(501, "上传图片失败");
        } finally {
            minioUtils.MinioUtilsUpdateDefault();
        }
    }

    //作者获取帖子列表
    @Override
    public Result getArticleList(String token) {
        List<Article> listArticle = getListArticle(null, null, token);
        List<ArticleVo> articleVos = copyMethod(listArticle);
        return Result.succ("获取自己的文章成功", articleVos);
    }
    //作者获取帖子列表,根据帖子状态
    @Override
    public Result getArticleListByStatus(String status, String token) {
        List<Article> listArticle = getListArticle(null, status, token);
        List<ArticleVo> articleVos = copyMethod(listArticle);
        return Result.succ("获取自己的文章成功", articleVos);
    }

    //作者获取帖子,根据板块id
    @Override
    public Result getArticleListByPalteId(String palteId, String token) {
        List<Article> listArticle = getListArticle(palteId, null, token);
        List<ArticleVo> articleVos = copyMethod(listArticle);
        return Result.succ("获取自己的文章成功", articleVos);
    }

    //作者获取帖子,根据板块id和状态
    @Override
    public Result getArticleListByPalteIdAndStatus(String palteId, String status, String token) {
        List<Article> listArticle = getListArticle(palteId, status, token);
        List<ArticleVo> articleVos = copyMethod(listArticle);
        return Result.succ("获取自己的文章成功", articleVos);
    }

    //作者获取详细信息,主要:避免用户查询未审核的帖子
    @Override
    public Result getArticleByArticleId(String articleId, String token) {
        UserTokenVo userByToken = userService.findUserByToken(token);
        Article article = articleMapper.selectById(articleId);
        if (!article.getUserId().equals(userByToken.getId())) {
            return Result.fail("无权限不能查询");//非作者查询自己的文章
        }
        ArticleContentVo articleContentVo = copy2Method(article);
        return Result.succ("查询成功", articleContentVo);
    }

    //获取帖子列表，根据模块和帖子状态
    @Override
    public Result getArticleListPageByModularsIdStatus(String modularsId, String status, Long size, Long page) {
        LambdaQueryWrapper<Article> articleLambdaQueryWrapper = new LambdaQueryWrapper<>();
        articleLambdaQueryWrapper.eq(Article::getModularsId, modularsId)
                .eq(Article::getStatus, status)
                .orderByDesc(Article::getCreateDate);
        Page<Article> articlePage = articleMapper.selectPage(page, size, articleLambdaQueryWrapper);
        long total = articlePage.getTotal();
        List<Article> articleList = articlePage.getRecords();
        List<ArticleNoContentVo> articleNoContentVos = copy2Method(articleList);
        Map<String, Object> articleListMap = PagesHashMap.getPagesHashMap(total, "articleList", articleNoContentVos);
        return Result.succ("获取成功", articleListMap);
    }

    //获取帖子列表，根据板块和排序规则
    @Override
    public Result getArticleByPalteIdAndSort(String palteId, String modularsId, String sort, Long pages, Long pagesSize) {
        if (StringUtils.isBlank(palteId)||StringUtils.isBlank(sort)||StringUtils.isBlank(modularsId)) {
            return Result.fail("参数不能为空");
        }
        if(pages<=0L || pagesSize<=0L){
            return Result.fail("参数错误");
        }
        LambdaQueryWrapper<Article> articleLambdaQueryWrapper = new LambdaQueryWrapper<>();
        articleLambdaQueryWrapper.eq(Article::getPlateId, palteId)
            .eq(Article::getStatus, "1")
        //如果等于0,就查询全部模块
            .eq(!modularsId.equals("0"),Article::getModularsId, modularsId)
        //0,创建日期排序
            .orderByDesc(sort.equals("0"),Article::getCreateDate)
        //1,点赞排序
            .orderByDesc(sort.equals("1"),Article::getLikesCounts)
        //2,评论人数
            .orderByDesc(sort.equals("2"),Article::getCommentCounts)
        //3,收藏人数
            .orderByDesc(sort.equals("3"),Article::getCollectionCounts);
        Page<Article> articleIPage = new Page<>(pages, pagesSize);
        Page<Article> articlePage = articleMapper.selectPage(articleIPage, articleLambdaQueryWrapper);
        List<Article> listArticle = articlePage.getRecords();
        List<ArticleNoContentVo> articleNoContentVos = copy2Method(listArticle);
        return Result.succ("查询成功", articleNoContentVos);
    }

    @Override
    public Result getArticleByCateory( String modularsId, String categoryId, Long page, Long pageSize) {
        if (StringUtils.isBlank(modularsId)||StringUtils.isBlank(categoryId)) {
            return Result.fail("参数不能为空");
        }
        if(page<=0L || pageSize<=0L){
            return Result.fail("参数错误");
        }
        LambdaQueryWrapper<Article> articleLambdaQueryWrapper = new LambdaQueryWrapper<>();
        articleLambdaQueryWrapper
                .eq(Article::getModularsId, modularsId)
                .eq(Article::getStatus, "1")
                .eq(Article::getCategoryId, categoryId)
                .orderByDesc(Article::getCreateDate);
        Page<Article> articlePage = articleMapper.selectPage(page,pageSize, articleLambdaQueryWrapper);
        List<Article> records = articlePage.getRecords();
        List<ArticleNoContentVo> articleNoContentVos = copy2Method(records);
        return Result.succ("查询成功", articleNoContentVos);
    }

    //获取文章，根据收藏
    @Override
    public Result getArticleByUserCollect(String palteId,String token) {
        UserTokenVo userByToken = userService.findUserByToken(token);
        String id = userByToken.getId();
        //获取收藏的文章id
        LambdaQueryWrapper<ArticleLikesCollection> articleLikesCollectionLambdaQueryWrapper = new LambdaQueryWrapper<>();
        articleLikesCollectionLambdaQueryWrapper.eq(ArticleLikesCollection::getUserId, id)
                .eq(ArticleLikesCollection::getCollection, "1");
        List<ArticleLikesCollection> list = articleLikesCollectionService.list(articleLikesCollectionLambdaQueryWrapper);
        //获取文章列表,根据文章id列表
        List<Article> articleList = new ArrayList<>();
        for (ArticleLikesCollection articleLikesCollection : list) {
            LambdaQueryWrapper<Article> articleLambdaQueryWrapper = new LambdaQueryWrapper<>();
            articleLambdaQueryWrapper.eq(Article::getId,articleLikesCollection.getArticleId())
                            .eq(Article::getPlateId,palteId)
                            .eq(Article::getStatus,"1");
            Article article = articleMapper.selectOne(articleLambdaQueryWrapper);
            if(Objects.isNull(article)){
                continue;
            }
            //未null不添加
            articleList.add(article);
        }
        //根据时间排序
        articleList.sort((o1, o2) -> o2.getCreateDate().compareTo(o1.getCreateDate()));
        //Vo
        List<ArticleNoContentVo> articleNoContentVos = copy2Method(articleList);
        return Result.succ("查询成功", articleNoContentVos);
    }

    //获取文章的详细内容
    @Override
    public Result getArticleDetail(String articleId, String token) {
        UserTokenVo userByToken = userService.findUserByToken(token);
        Article article = articleMapper.selectById(articleId);
        //进行组合数据.
        ArticleContentVo articleContentVo = copy2Method(article);
        //获取用户是否查看过该帖子，
        String s = redisTemplate.opsForValue().get(RedisStatus.ARTICLE_USER_VIEW_TOKEN + token + ":" + articleId);
        log.error(s);
        //未登录不增加view,登录之后查询相同文章,再一次查询间隔1分钟不增加view
        if (userByToken==null || s!=null){
            article.setViewCounts(article.getViewCounts());
        }else{
            redisTemplate.opsForValue().set(RedisStatus.ARTICLE_USER_VIEW_TOKEN+token+":"+articleId,"1",1, TimeUnit.MINUTES);
            article.setViewCounts(article.getViewCounts() + 1L);
            articleMapper.updateById(article);
        }
        return Result.succ("获取成功", articleContentVo);
    }

    //作者添加帖子
    @Override
    public Result saveArticle(Article article, String token, Body body, List<String> tagsIdList) {
        TransactionStatus transactionStatus = dataSourceTransactionManager.getTransaction(transactionDefinition);
        UserTokenVo userByToken = userService.findUserByToken(token);
        if(userByToken==null){
            dataSourceTransactionManager.rollback(transactionStatus);
            return Result.fail("请重新登录");
        }
        //对封面图片进行判断
        String frontCover = article.getFrontCover();
        try {
            String fileNameByUrl = minioUtils.getFileNameByUrl(frontCover);
            String s = redisTemplate.opsForValue().get(RedisStatus.ARTICLE_IMAGES + fileNameByUrl);
            if (StringUtils.isBlank(s)){
                minioUtils.MinioUtilsUpdate("article");
                minioUtils.removeObject(s);
                return Result.fail("该图片已过期了，请在一个小时内提交");
            }
            //删除缓存，避免过期时被删除
            redisTemplate.delete(RedisStatus.ARTICLE_IMAGES + fileNameByUrl);
            redisTemplate.delete(RedisStatus.GQ_ARTICLE_IMAGES + fileNameByUrl);
        }catch (Exception e){
            dataSourceTransactionManager.rollback(transactionStatus);
            return Result.fail("该图片已过期了，请在一个小时内提交");
        }finally {
            minioUtils.MinioUtilsUpdateDefault();
        }
        //添加作者id,
        article.setUserId(userByToken.getId());
        int insert = articleMapper.insert(article);
        if (insert == 0) {
            dataSourceTransactionManager.rollback(transactionStatus);
            return Result.fail("插入错误");
        }
        //添加文章id
        body.setArticleId(article.getId());
        boolean save = bodyService.save(body);
        if (!save) {
            dataSourceTransactionManager.rollback(transactionStatus);
            return Result.fail("插入错误");
        }
        //添加内容id
        article.setBodyId(body.getId());
        int i = articleMapper.updateById(article);
        if (i == 0) {
            dataSourceTransactionManager.rollback(transactionStatus);
            return Result.fail("插入错误");
        }
        //添加文章标签
        List<ArticleTags> articleTagsList = copyMethod(tagsIdList, article.getId());
        boolean b2 = articleTagsService.saveBatch(articleTagsList);
        if (!b2) {
            dataSourceTransactionManager.rollback(transactionStatus);
            return Result.fail("插入错误");
        }
        dataSourceTransactionManager.commit(transactionStatus);
        return Result.succ("提交成功,请等待审核");
    }

    //修改帖子
    @Override
    public Result updateArticle(Article article, String token, Body body, List<String> tagsIdList) {
        TransactionStatus transactionStatus = dataSourceTransactionManager.getTransaction(transactionDefinition);
        UserTokenVo userByToken = userService.findUserByToken(token);
        //获取原来的文章
        article.setUserId(userByToken.getId());
        Article articleSource = articleMapper.selectById(article.getId());
        article.setBodyId(articleSource.getBodyId());
        //修改了图片,封面
        if (!articleSource.getFrontCover().equals(article.getFrontCover())){
            String frontCover = articleSource.getFrontCover();
            String frontCover1 = article.getFrontCover();
            try {
                String fileNameByUrl = minioUtils.getFileNameByUrl(frontCover1);
                String s = redisTemplate.opsForValue().get(RedisStatus.ARTICLE_IMAGES + fileNameByUrl);
                if (StringUtils.isBlank(s)){
                    dataSourceTransactionManager.rollback(transactionStatus);
                    return Result.fail("该图片已过期了，请在一个小时内提交");
                }
                redisTemplate.delete(RedisStatus.ARTICLE_IMAGES + fileNameByUrl);
                redisTemplate.delete(RedisStatus.GQ_ARTICLE_IMAGES + fileNameByUrl);
                //修改minio服务器的桶
                minioUtils.MinioUtilsUpdate("article");
                //去前缀
                String oldFrontCover = minioUtils.getFileNameByUrl(frontCover);
                //删除之前数据库的图片。
                minioUtils.removeObject(oldFrontCover);
            }catch (Exception e){
                dataSourceTransactionManager.rollback(transactionStatus);
                return Result.fail("该图片已过期了，请在一个小时内提交");
            }finally {
                minioUtils.MinioUtilsUpdateDefault();
            }
        }
        //需要重新审核
        article.setStatus("0");
        //修改
        Result result = updateArticle(article, body, tagsIdList, transactionStatus);
        if (result.getSuccess()){
            result.setMsg(result.getMsg()+",等待审核");
        }
        return result;
    }

    //管理员修改帖子
    @Override
    public Result updateArticle(Article article, Body body, List<String> tagsIdList) {
        TransactionStatus transactionStatus = dataSourceTransactionManager.getTransaction(transactionDefinition);
        //获取原来的文章
        Article articleSource = articleMapper.selectById(article.getId());
        BeanUtils.copyProperties(article, articleSource);
        //修改
        return updateArticle(article, body, tagsIdList, transactionStatus);
    }


    @Override
    public Result updateStatus(String id, String status) {
        Article article = articleMapper.selectById(id);
        if (article.getStatus().equals(status)) {
            return Result.fail("已经修改过了,请重新刷新");
        }
        if (status.equals("1")) {
            article.setCreateDate(new Date());
        }
        article.setStatus(status);
        int i = articleMapper.updateById(article);
        if (i == 0) {
            return Result.fail("修改失败");
        }
        return Result.succ("修改成功");
    }

    @Override
    public Result deleteByArticleId(String id, String token) {
        //事务
        TransactionStatus transactionStatus = dataSourceTransactionManager.getTransaction(transactionDefinition);
        //登录用户
        UserTokenVo userByToken = userService.findUserByToken(token);
        //删除帖子
        Article article = articleMapper.selectById(id);
        if (!userByToken.getId().equals(article.getUserId())) {
            dataSourceTransactionManager.rollback(transactionStatus);
            return Result.fail("删除失败,不是作者本人");
        }
        int i = articleMapper.deleteById(id);
        if (i == 0) {
            dataSourceTransactionManager.rollback(transactionStatus);
            return Result.fail("出现错误");
        }
        //帖子内容
        Body body = bodyService.getBodyByArticleId(id);

        boolean b = bodyService.removeById(body);
        if (!b) {
            dataSourceTransactionManager.rollback(transactionStatus);
            return Result.fail("出现错误");
        }
        dataSourceTransactionManager.commit(transactionStatus);
        return Result.succ("删除成功");
    }

    @Override
    public boolean deleteByUserId(String userId) {
        //事务
        TransactionStatus transactionStatus = dataSourceTransactionManager.getTransaction(transactionDefinition);
        boolean b = deleteByUserId(userId, transactionStatus);
        if (b){
            dataSourceTransactionManager.commit(transactionStatus);
        }
        return b;
    }


    @Override
    public boolean deleteByUserId(String userId, TransactionStatus transactionStatus) {
        //验证用户是否存在。
        User byId = userService.getById(userId);
        if(byId==null){
            return false;
        }
        LambdaQueryWrapper<Article> articleLambdaQueryWrapper = new LambdaQueryWrapper<>();
        articleLambdaQueryWrapper.eq(Article::getUserId,userId);
        List<Article> articleList = articleMapper.selectList(articleLambdaQueryWrapper);
        if (articleList.size()==0){
            return true;
        }
        return deleteByArticleListMethod(articleList, transactionStatus);
    }

//方法区
    public Result updateArticle(Article article, Body body, List<String> tagsIdList,TransactionStatus transactionStatus){
        int insert = articleMapper.updateById(article);
        if (insert == 0) {
            dataSourceTransactionManager.rollback(transactionStatus);
            return Result.fail("修改错误");
        }
        //修改文章的内容
        Body bodyByArticleId = bodyService.getBodyByArticleId(article.getId());
        //原来的body,获取图片列表
        String contentHtml1 = bodyByArticleId.getContentHtml();
        List<String> imagesByContentHtml1 = minioUtils.getImagesByContentHtml(contentHtml1);
        List<String> fileNameByUrl1 = minioUtils.getFileNameByUrl(imagesByContentHtml1);
        //修改的body,获取图片列表
        String contentHtml = body.getContentHtml();
        List<String> imagesByContentHtml = minioUtils.getImagesByContentHtml(contentHtml);
        List<String> fileNameByUrl = minioUtils.getFileNameByUrl(imagesByContentHtml);
        //新增的图片列表
        List<String> addName=new ArrayList<>();
        //要删除的图片列表
        List<String> deleteName=new ArrayList<>();
        //新增的图片列表
        for(String fileName:fileNameByUrl){
            int a=0;
            for(String fileName2:fileNameByUrl1){
                if(fileName.equals(fileName2)){
                    a=a+1;
                }
            }
            if (a==0){
                addName.add(fileName);
            }
        }
        //要删除的图片列表
        for(String fileName2:fileNameByUrl1){
            int a=0;
            for(String fileName:fileNameByUrl){
                if(fileName2.equals(fileName)){
                    a=a+1;
                }
            }
            if (a==0){
                deleteName.add(fileName2);
            }
        }
        //进行删除图片列表,和删除缓存中要新增的图片列表,缓存过期时会删除图片
        try {
            minioUtils.MinioUtilsUpdate("article");
            //删除Redis缓存，避免过期被删除。
            for(String fileName:addName){
                String s = redisTemplate.opsForValue().get(RedisStatus.ARTICLE_IMAGES + fileName);
                if (StringUtils.isBlank(s)){
                    dataSourceTransactionManager.rollback(transactionStatus);
                    return Result.fail("该图片已过期了，请在一个小时内提交");
                }
                redisTemplate.delete(RedisStatus.ARTICLE_IMAGES + fileName);
                redisTemplate.delete(RedisStatus.GQ_ARTICLE_IMAGES + fileName);
            }
            //删除Minio服务器上的图片
            for (String fileName:deleteName){
                minioUtils.removeObject(fileName);
            }
        }catch (Exception e){
            dataSourceTransactionManager.rollback(transactionStatus);
            return Result.fail("该图片已过期了，请在一个小时内提交");
        }finally {
            minioUtils.MinioUtilsUpdateDefault();
        }
        bodyByArticleId.setContent(body.getContent());
        bodyByArticleId.setContentHtml(body.getContentHtml());
        boolean b = bodyService.updateById(bodyByArticleId);
        if (!b) {
            dataSourceTransactionManager.rollback(transactionStatus);
            return Result.fail("修改错误");
        }
        //修改文章标签,先全部删除文章标签,再添加文章标签
        List<ArticleTags> listArticleTagsByArticleId = articleTagsService.getListArticleTagsByArticleId(article.getId());
        for (ArticleTags articleTags : listArticleTagsByArticleId) {
            boolean b1 = articleTagsService.removeById(articleTags.getId());
            if (!b1) {
                dataSourceTransactionManager.rollback(transactionStatus);
                return Result.fail("删除错误");
            }
        }
        //修改文章标签
        List<ArticleTags> articleTagsList = copyMethod(tagsIdList, article.getId());
        boolean b2 = articleTagsService.saveBatch(articleTagsList);
        if (!b2) {
            dataSourceTransactionManager.rollback(transactionStatus);
            return Result.fail("插入错误");
        }
        dataSourceTransactionManager.commit(transactionStatus);
        return Result.succ("修改成功");
    }
    public List<Article> getListArticle(String palteId, String status, String token) {
        UserTokenVo userByToken = userService.findUserByToken(token);
        LambdaQueryWrapper<Article> articleLambdaQueryWrapper = new LambdaQueryWrapper<>();
        articleLambdaQueryWrapper.eq(Article::getUserId,userByToken.getId())
                .eq(null!=status,Article::getStatus,status)
                .eq(null!=palteId,Article::getPlateId,palteId)
                .orderByDesc(Article::getCreateDate);
        return articleMapper.selectList(articleLambdaQueryWrapper);
    }
    private List<String> getTagsNameList(String articleId) {
        List<ArticleTags> articleTagsList = articleTagsService.getListArticleTagsByArticleId(articleId);
        List<String> tagsNameList = new ArrayList<>();
        for (ArticleTags articleTags : articleTagsList) {
            Tags tags = tagsService.getById(articleTags.getTagsId());
            String name = tags.getName();
            tagsNameList.add(name);
        }
        return tagsNameList;
    }
    private List<Tags> getTags(List<ArticleTags> listArticleTagsByArticleId) {
        List<String> tagsIdList=new ArrayList<>();
        for (ArticleTags articleTags : listArticleTagsByArticleId) {
            tagsIdList.add(articleTags.getTagsId());
        }
        if (tagsIdList.size()==0){
            return null;
        }
        return tagsService.listByIds(tagsIdList);
    }
    private ArticleContentVo copy2Method(Article article) {
        ArticleContentVo articleContentVo = new ArticleContentVo();
        //分类
        Category category = categoryService.getById(article.getCategoryId());
        articleContentVo.setCategory(category);
        //标签
        List<ArticleTags> listArticleTagsByArticleId = articleTagsService.getListArticleTagsByArticleId(article.getId());
        List<Tags> tags = getTags(listArticleTagsByArticleId);
        articleContentVo.setTagsList(tags);
        //作者昵称和头像
        User user = userService.getById(article.getUserId());
        articleContentVo.setUserId(article.getUserId());
        articleContentVo.setAvatar(user.getAvatar());
        articleContentVo.setNickname(user.getNickname());
        BeanUtils.copyProperties(article, articleContentVo);
        //帖子内容
        Body bodyByArticleId = bodyService.getBodyByArticleId(article.getId());
        articleContentVo.setBody(bodyByArticleId);
        return articleContentVo;
    }
    private List<ArticleNoContentVo> copy2Method(List<Article> listArticle) {
        List<ArticleNoContentVo> articleNoContentVos = new ArrayList<>();
        for (Article article : listArticle) {
            ArticleNoContentVo articleNoContentVo = new ArticleNoContentVo();
            //分类
            Category category = categoryService.getById(article.getCategoryId());
            articleNoContentVo.setCategory(category);
            //标签
            List<ArticleTags> listArticleTagsByArticleId = articleTagsService.getListArticleTagsByArticleId(article.getId());
            List<Tags> tags = getTags(listArticleTagsByArticleId);
            articleNoContentVo.setTagsList(tags);
//            articleNoContentVo.setTagsList(tags);
            //作者昵称和头像
            User user = userService.getById(article.getUserId());
            articleNoContentVo.setUserId(article.getUserId());
            articleNoContentVo.setAvatar(user.getAvatar());
            articleNoContentVo.setNickname(user.getNickname());
            //其他一样的赋值
            BeanUtils.copyProperties(article, articleNoContentVo);
            articleNoContentVos.add(articleNoContentVo);
        }
        return articleNoContentVos;
    }
    private List<ArticleVo> copyMethod(List<Article> listArticle) {
        List<ArticleVo> articleVos = new ArrayList<>();
        for (Article article : listArticle) {
            //文章
            ArticleVo articleVo = copyMethod(article);
            articleVos.add(articleVo);
        }
        return articleVos;
    }
    private ArticleVo copyMethod(Article article) {
        ArticleVo articleVo = new ArticleVo();
        BeanUtils.copyProperties(article, articleVo);
        //作者
        User byId = userService.getById(article.getUserId());
        articleVo.setNickname(byId.getNickname());
        articleVo.setUserId(byId.getId());
        //内容
        Body body = bodyService.getBodyByArticleId(article.getId());
        articleVo.setContent(body.getContent());
        articleVo.setContentHtml(body.getContentHtml());
        //标签
        List<String> tagsNameList = getTagsNameList(article.getId());
        articleVo.setTagsNameList(tagsNameList);
        //板块
        Palte palte = palteService.getById(article.getPlateId());
        articleVo.setPalteName(palte.getName());
        //模块
        Modulars modulars = modularsService.getById(article.getModularsId());
        articleVo.setModularsName(modulars.getName());
        //分类
        Category category = categoryService.getById(article.getCategoryId());
        articleVo.setCategoryName(category.getName());
        return articleVo;
    }

    private List<ArticleTags> copyMethod(List<String> tagsIdList,String articleId){
        List<ArticleTags> articleTagsList = new ArrayList<>();
        for (String tagsId : tagsIdList) {
            ArticleTags articleTags = new ArticleTags();
            articleTags.setArticleId(articleId);
            articleTags.setTagsId(tagsId);
            articleTagsList.add(articleTags);
        }
        return articleTagsList;
    }

    private boolean deleteByArticleListMethod(List<Article> articleList,TransactionStatus transactionStatus) {
        // 帖子列表
        List<String> articleIdList = new ArrayList<>();
        // 帖子详细
        List<String> bodyIdList =new ArrayList<>();
        // 该帖子的评论
        List<String> commentIdList =new ArrayList<>();
        // 帖子的点赞和收藏的中间表
        List<String> artilceLikesCollectionIdList=new ArrayList<>();
        // 帖子的标签的中间表
        List<String> artilceTagsIdList=new ArrayList<>();
        for (Article article:articleList){
            String articleId = article.getId();
            articleIdList.add(articleId);
            Body body = bodyService.getBodyByArticleId(articleId);
            bodyIdList.add(body.getId());
            //对body内的图片从minio服务器中删除
            String contentHtml = body.getContentHtml();
            List<String> imagesByContentHtml = minioUtils.getImagesByContentHtml(contentHtml);
            List<String> fileNameByUrl = minioUtils.getFileNameByUrl(imagesByContentHtml);
            for (String fileName:fileNameByUrl){
                try {
                    minioUtils.removeObject(fileName);
                } catch (Exception e) {
                   return false;
                }
            }
            //评论
            List<Comment> commentsByArticleId = commentService.getCommentsByArticleId(articleId);
            for (Comment comment:commentsByArticleId) {
                commentIdList.add(comment.getId());
            }
            List<ArticleLikesCollection> byArticleId = articleLikesCollectionService.getByArticleId(articleId);
            for (ArticleLikesCollection articleLikesCollection:byArticleId) {
                artilceLikesCollectionIdList.add(articleLikesCollection.getId());
            }
            List<ArticleTags> listArticleTagsByArticleId = articleTagsService.getListArticleTagsByArticleId(articleId);
            for (ArticleTags articleTags:listArticleTagsByArticleId) {
                artilceTagsIdList.add(articleTags.getId());
            }
        }
            boolean b = bodyService.removeBatchByIds(bodyIdList);
            boolean b1 = commentService.removeBatchByIds(commentIdList);
            boolean b2 = articleTagsService.removeBatchByIds(artilceTagsIdList);
            boolean b3 = articleLikesCollectionService.removeBatchByIds(artilceLikesCollectionIdList);
            if (!(b && b1 && b2 && b3)) {
                return false;
            }
            articleMapper.deleteBatchIds(articleIdList);
            return true;
    }
}
