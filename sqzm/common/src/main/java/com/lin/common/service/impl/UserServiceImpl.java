package com.lin.common.service.impl;

import com.alibaba.fastjson.JSON;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.lin.common.RedisStatus;
import com.lin.common.Result;
import com.lin.common.mapper.UserMapper;
import com.lin.common.pojo.User;
import com.lin.common.pojo.Vo.UserTokenVo;
import com.lin.common.pojo.Vo.UserVo;
import com.lin.common.service.*;
import com.lin.common.utils.*;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.aspectj.apache.bcel.classfile.Code;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.springframework.beans.BeanUtils;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.stereotype.Service;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.*;
import java.util.concurrent.TimeUnit;

/**
 * <p>
 * 服务实现类
 * </p>
 *
 * @author linShengWei
 * @since 2023-01-05
 */
@Slf4j
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {
    @Resource
    private DataSourceTransactionManager dataSourceTransactionManager;
    @Resource
    private TransactionDefinition transactionDefinition;

    @Resource
    private UserMapper userMapper;
    @Resource(name = "minioUtils")
    private MinioUtils minioUtils;

    @Resource
    private CodeUtils codeUtils;

    @Resource
    private ArticleService articleService;
    @Resource
    private CommentService commentService;
    @Resource
    private ArticleLikesCollectionService articleLikesCollectionService;

    @Resource
    private RedisTemplate<String, String> redisTemplate;

    @Resource
    private FriendsService friendsService;

    @Resource
    private FriendsUserService friendsUserService;

    @Resource
    private AuthorService authorService;
    @Resource
    private SendEmailUtil emailUtil;

    @NotNull
    public Result Login(String username, String password, String code, String codeDate) {
        if (StringUtils.isEmpty(username)) {
            return Result.fail(401, "登录失败: 用户名不能为空");
        }
        if (StringUtils.isEmpty(password)) {
            return Result.fail(401, "登录失败: 密码不能为空");
        }
        if (StringUtils.isEmpty(code)) {
            return Result.fail(401, "登录失败: 验证码不能为空");
        }
        String codeRedis = redisTemplate.opsForValue().get(RedisStatus.USER_CODE + codeDate);
        if (StringUtils.isEmpty(codeRedis)) {
            return Result.fail(401, "登录失败: 验证码已经过期了");
        }
        //获取当前登录对象
        User user = null;
        user = getUserByUsername(username);
        //用户是否存在
        if (user == null) {
            return Result.fail("登录失败,用户不存在");
        }
        code = code.toLowerCase();      //变小写
        codeRedis = codeRedis.toLowerCase(); //变小写
        if (!code.equals(codeRedis)) {
            return Result.fail(401, "验证码错误");
        }
        //进行加密
        String salt = user.getSalt();
        String password2 = Md5Utils.md5Encryption(password, salt);
        //密码是否正确
        if (!password2.equals(user.getPassword())) {
            return Result.fail("登录失败,密码错误");
        }
        if (user.getEnableFlag().equals("-1")) {
            return Result.fail(402, "帐号被禁用");
        }
        String token = JWTUtils.createToken(user.getUsername());
        UserTokenVo userTokenVo = getUserTokenVoByUser(user);
        redisTemplate.delete(RedisStatus.USER_CODE + codeDate);
        redisTemplate.opsForValue().set(RedisStatus.TOKEN_USER + token, JSON.toJSONString(userTokenVo), 7, TimeUnit.DAYS);
        return Result.succ("登录成功", token);
    }


    @Override
    public Result listPage(Long size, Long page) {
        //分页
        if (size <= 0L) {
            return Result.fail("参数错误,个数不能小于0");
        }
        if (page <= 0L) {
            return Result.fail("参数错误,页数不能小于0");
        }
        Page<User> userPage = userMapper.selectPage(page, size);
        long total = userPage.getTotal();
        List<User> list = userPage.getRecords();
        //Vo
        List<UserVo> list1 = new ArrayList<>();
        for (User user : list) {
            UserVo userVo = new UserVo();
            BeanUtils.copyProperties(user, userVo);
            list1.add(userVo);
        }
        //map
        Map<String, Object> userListHashMap = PagesHashMap.getPagesHashMap(total, "userList", list1);
        return Result.succ("查询用户成功", userListHashMap);
    }

    @NotNull
    public Result getEmailCode(String email) {
        if (StringUtils.isBlank(email)) {
            return Result.fail(401, "邮箱不能为空");
        }
        if (!email.matches("^([a-zA-Z0-9]+[_|\\_|\\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\\_|\\.]?)*[a-zA-Z0-9]+\\.[a-zA-Z]{2,3}$")) {
            return Result.fail(401, "邮箱格式错误");
        }
        String code = redisTemplate.opsForValue().get(RedisStatus.USER_EMAIL_CODE + email);
        if (!StringUtils.isBlank(code)) {
            log.info("code" + code);
            return Result.fail(401, "请等待60秒");
        }
        LambdaQueryWrapper<User> userLambdaQueryWrapper = new LambdaQueryWrapper<>();
        userLambdaQueryWrapper.eq(User::getEmail, email);
        User user = userMapper.selectOne(userLambdaQueryWrapper);
        if (user == null) {
            return Result.fail(401, "邮箱不存在");
        }
        String checkCode = codeUtils.randomString(6);
//        String checkCode = String.valueOf(new Random().nextInt(999999));
        String title = "SQZM游戏论坛登录验证码";
        String content = "您正在登录SQZM游戏论坛，本次验证码为:" + checkCode + ",有效期1分钟,如非本人操作，请忽略！谢谢！60秒才能发下次验证码";
        emailUtil.sendMessage(user.getEmail(), title, content);
        redisTemplate.opsForValue().set(RedisStatus.USER_EMAIL_CODE + email, checkCode, 1, TimeUnit.MINUTES);
        return Result.succ("发送邮箱成功");
    }

    public Result getUpdateEmailCode(String email) {
        if (StringUtils.isBlank(email)) {
            return Result.fail(401, "邮箱不能为空");
        }
        if (!email.matches("^([a-zA-Z0-9]+[_|\\_|\\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\\_|\\.]?)*[a-zA-Z0-9]+\\.[a-zA-Z]{2,3}$")) {
            return Result.fail(401, "邮箱格式错误");
        }
        String code =  redisTemplate.opsForValue().get(RedisStatus.USER_UPDATE_EMAIL_CODE + email);
        if (!StringUtils.isBlank(code)) {
            log.info("code" + code);
            return Result.fail(401, "请等待60秒");
        }
        LambdaQueryWrapper<User> userLambdaQueryWrapper = new LambdaQueryWrapper<>();
        userLambdaQueryWrapper.eq(User::getEmail, email);
        User user = userMapper.selectOne(userLambdaQueryWrapper);
        if (user != null) {
            return Result.fail(401, "邮箱已经存在");
        }
        String checkCode = codeUtils.randomString(6);
        String title = "SQZM游戏论坛修改邮箱验证码";
        String content = "您正在修改SQZM游戏论坛的邮箱，本次验证码为:" + checkCode + ",有效期1分钟,如非本人操作，请忽略！谢谢！60秒才能发下次验证码";
        emailUtil.sendMessage(email, title, content);
        redisTemplate.opsForValue().set(RedisStatus.USER_UPDATE_EMAIL_CODE + email, checkCode, 1, TimeUnit.MINUTES);
        return Result.succ("发送邮箱成功");
    }


    @Override
    public Result LoginEmail(String email, String code) {
        if (StringUtils.isBlank(email)) {
            return Result.fail(401, "邮箱不能为空");
        }
        //根据邮箱查询用户存在
        LambdaQueryWrapper<User> userLambdaQueryWrapper = new LambdaQueryWrapper<>();
        userLambdaQueryWrapper.eq(User::getEmail, email);
        User user = userMapper.selectOne(userLambdaQueryWrapper);
        if (user == null) {
            return Result.fail(401, "邮箱不存在");
        }
        if (StringUtils.isBlank(code)) {
            return Result.fail(401, "验证码不能为空");
        }
        if (user.getEnableFlag().equals("-1")) {
            return Result.fail(401, "帐号被禁用");
        }
        //根据邮箱获取验证码
        String EmailCode = redisTemplate.opsForValue().get(RedisStatus.USER_EMAIL_CODE + email);
        //判断验证码是否过期
        if (StringUtils.isBlank(EmailCode)) {
            return Result.fail(401, "验证码已过期，请重新发送验证码");
        }
        code = code.toLowerCase();      //变小写
        EmailCode = EmailCode.toLowerCase(); //变小写
        //判断验证码与用户输入的验证码是否一致
        if (!EmailCode.equals(code)) {
            return Result.fail(401, "验证码错误，请重新输入");
        }
        //生成token
        String token = JWTUtils.createToken(user.getId());
        redisTemplate.delete(RedisStatus.USER_EMAIL_CODE + email);
        //保存token,7天过期
        redisTemplate.opsForValue().set(RedisStatus.TOKEN_USER + token, JSON.toJSONString(user), 7, TimeUnit.DAYS);
        return Result.succ("登录成功", token);
    }

    @Override
    public UserTokenVo findUserByToken(String token) {
        /*
         * 1.token合法性校验,是否为空,解析是否成功,redis是否存在
         * 2.如果校验失败,返回错误
         * 3.如果成功,返回对应的结果Login
         * */
        if (StringUtils.isBlank(token)) {
            return null;
        }
        try {
            //获取redis是否存在
            String userJson = redisTemplate.opsForValue().get(RedisStatus.TOKEN_USER + token);
            if (StringUtils.isBlank(userJson)) {
                return null;
            }
            //解析token

            Map<String, Object> stringObjectMap = JWTUtils.checkToken(token);
            if (stringObjectMap.size() == 0) {
                return null;
            }
            return JSON.parseObject(userJson, UserTokenVo.class);
        }catch (Exception e){
            log.info(String.valueOf(e));
            return null;
        }
    }

    @Override
    public User getUserByUsername(String username) {
        LambdaQueryWrapper<User> userLambdaQueryWrapper = new LambdaQueryWrapper<>();
        userLambdaQueryWrapper.eq(User::getUsername, username);
        return userMapper.selectOne(userLambdaQueryWrapper);
    }

    @Override
    public Result getNewCookie(String token) {
        if (StringUtils.isBlank(token)) {
            return Result.fail(500, "出现错误,token为空了");
        }
        UserTokenVo userByToken = findUserByToken(token);
        if (userByToken == null) {
            log.error("服务器出现错误,错误在userServicelmpl.getNewCookie");
            return Result.fail(500, "服务器出现错误");
        }
        String id = userByToken.getId();
        User user = userMapper.selectById(id);
        if (user == null) {
            log.error("服务器出现错误,错误在userServicelmpl.getNewCookie");
            return Result.fail(500, "服务器出现错误");
        }
        redisTemplate.delete(RedisStatus.TOKEN_USER + token);
        UserTokenVo userTokenVo = getUserTokenVoByUser(user);
        redisTemplate.opsForValue().set(RedisStatus.TOKEN_USER + token, JSON.toJSONString(userTokenVo), 7, TimeUnit.DAYS);
        return Result.succ("获取修改后用户信息成功", userTokenVo);
    }

    private UserTokenVo getUserTokenVoByUser(User user) {
        UserTokenVo userTokenVo = new UserTokenVo();
        userTokenVo.setId(user.getId());
        userTokenVo.setUserName(user.getUsername());
        userTokenVo.setAvatar(user.getAvatar());
        userTokenVo.setEmail(user.getEmail());
        userTokenVo.setNickName(user.getNickname());
        userTokenVo.setGender(user.getGender());
        userTokenVo.setEnableFlag(user.getEnableFlag());
        return userTokenVo;
    }

    @NotNull
    @Override
    public Result addUser(User user) {
        String password = user.getPassword();
        String username = user.getUsername();
        if (StringUtils.isEmpty(username)  ) {
            return Result.fail("登陆名不能为空");
        }
        if (StringUtils.isEmpty(password)) {
            password = "123456";
        }
        LambdaQueryWrapper<User> lambdaQueryWrapper = new LambdaQueryWrapper<>();
        lambdaQueryWrapper.eq(User::getUsername, user.getUsername());
        User user1 = userMapper.selectOne(lambdaQueryWrapper);
        if (user1 != null) {
            return Result.fail("添加失败,用户已存在");
        }
        String salt = Md5Utils.CretaeMd5();
        String password2 = Md5Utils.md5Encryption(password, salt);
        user.setCreateDate(new Date());
        user.setEnableFlag("1");
        user.setSalt(salt);
        user.setPassword(password2);
        int insert = userMapper.insert(user);
        if (insert == 0) {
            return Result.fail(500,"添加用户失败");
        }
        return Result.succ("添加用户成功");
    }

    @NotNull
    @Override
    public Result updateUser(@NotNull User user) {
        LambdaUpdateWrapper<User> lambdaUpdateWrapper = new LambdaUpdateWrapper<>();
        lambdaUpdateWrapper.eq(User::getId, user.getId())
                //空则不修改
                    .set(!StringUtils.isBlank(user.getNickname()),User::getNickname, user.getNickname())
                    .set(!StringUtils.isBlank(user.getEmail()),User::getEmail, user.getEmail())
                    .set(!StringUtils.isBlank(user.getGender()),User::getGender, user.getGender());
        if (!StringUtils.isBlank(user.getPassword())) {
            String salt = Md5Utils.CretaeMd5();
            String password2 = Md5Utils.md5Encryption(user.getPassword(), salt);
            lambdaUpdateWrapper.set(User::getSalt, salt)
                    .set(User::getPassword, password2);
        }
        int update = userMapper.update(user, lambdaUpdateWrapper);
        if (update == 0) {
            return Result.fail("用户修改失败");
        }
        return Result.succ("用户修改成功");

    }

    @Override
    public Result updateEmail(String id, String email, String code) {
        if (StringUtils.isBlank(id)) {
            return Result.fail(401, "出现错误,id为空了");
        }
        if (StringUtils.isBlank(email)) {
            return Result.fail(401, "邮箱不能为空");
        }
        if (StringUtils.isBlank(code)) {
            return Result.fail(401, "验证码不能为空");
        }
        String EmailCode =  redisTemplate.opsForValue().get(RedisStatus.USER_UPDATE_EMAIL_CODE + email);
        if (StringUtils.isBlank(EmailCode)) {
            return Result.fail(401, "验证码已过期，请重新发送验证码");
        }
        if (!EmailCode.equals(code)) {
            return Result.fail(401, "验证码错误，请重新输入");
        }
        User user = userMapper.selectById(id);
        if (user == null) {
            return Result.fail("修改邮箱失败,用户不存在");
        }
        LambdaUpdateWrapper<User> userLambdaUpdateWrapper = new LambdaUpdateWrapper<>();
        userLambdaUpdateWrapper.eq(User::getId, id).set(User::getEmail, email);
        user.setEmail(email);
        try {
            int update = userMapper.update(user, userLambdaUpdateWrapper);
            if (update == 0) {
                return Result.fail("修改邮箱失败");
            }
            return Result.succ("修改邮箱成功");
        } catch (Exception e) {
            log.error("修改邮箱失败,原因是" + e);
            return Result.fail(500, "修改邮箱失败");
        }
    }

    //修改用户头像
    public Result upAvatar(@NotNull MultipartFile file, String id) {
        //获取上传文件的文件名
        String fileName = file.getOriginalFilename();
        //获取上传文件的类型是否为图片,获取的是文件的类型，注意是文件的类型，不是文件的拓展名。
        String contentType = file.getContentType();
        System.out.println(contentType);
        //只要其中之一满足了,就为图片
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
        minioUtils.MinioUtilsUpdate("user");
        //上传文件到minio服务器
        try {
            String s = minioUtils.putObject(file.getInputStream(), newFileName, file.getContentType());
            // 返回文件名
            String fileName2 = s + "/" + newFileName;
            User user = userMapper.selectById(id);
            String avatar = user.getAvatar();

            user.setAvatar(fileName2);
            //进行修改头像
            try {
                userMapper.updateById(user);
                //去掉桶和minio服务器地址
                String avatar2 = minioUtils.getFileNameByUrl(avatar);
                minioUtils.removeObject(avatar2);
            } catch (Exception e) {
                System.out.println("修改头像错误:" + e);
            }
            return Result.succ("修改头像成功");
        } catch (Exception e) {
            log.error("上传图片失败，原因是" + e);
            return Result.fail(503, "上传图片失败");
        } finally {
            minioUtils.MinioUtilsUpdateDefault();
        }
    }

    @Override
    public Result updateEnableFlag(String id, String enableFlag) {
        User user = userMapper.selectById(id);
        user.setEnableFlag(enableFlag);
        int i = userMapper.updateById(user);
        if (i == 0) {
            if (enableFlag.equals("1")) {
                return Result.fail("启动用户失败");
            }
            return Result.fail("禁用用户失败");
        }
        if (enableFlag.equals("1")) {
            return Result.succ("启动用户成功");
        }
        return Result.succ("禁用用户成功");
    }

    @Override
    public Result updatePassword(String id, String password, String newPassword) {
        if (StringUtils.isBlank(id)) {
            return Result.fail(401, "出现错误,id为空了");
        }
        if (StringUtils.isBlank(password)) {
            return Result.fail(401, "密码不能为空");
        }
        if (StringUtils.isBlank(newPassword)) {
            return Result.fail(401, "新密码不能为空");
        }
        if (password.equals(newPassword)) {
            return Result.fail(401, "新密码不能与旧密码相同");
        }
        User user = userMapper.selectById(id);
        if (user == null) {
            return Result.fail("修改密码失败,用户不存在");
        }
        String salt = user.getSalt();
        String oldPassword = Md5Utils.md5Encryption(password, salt);
        if (!oldPassword.equals(user.getPassword())) {
            return Result.fail("修改密码失败,旧密码不对");
        }
        String newSalt = Md5Utils.CretaeMd5();
        String newPassword2 = Md5Utils.md5Encryption(newPassword, newSalt);
        LambdaUpdateWrapper<User> userLambdaUpdateWrapper = new LambdaUpdateWrapper<>();
        userLambdaUpdateWrapper.eq(User::getId, id).set(User::getPassword, newPassword2).set(User::getSalt, newSalt);
        try {
            int update = userMapper.update(user, userLambdaUpdateWrapper);
            if (update == 0) {
                return Result.fail(500, "修改密码失败");
            }
            return Result.succ("修改密码成功");
        } catch (Exception e) {
            log.error("修改密码失败,原因是:" + e);
            return Result.fail(500, "修改密码失败");
        }
    }


    /*
    * @param String id;普通用户的id
    * */
    @Override
    public Result deleteUser(String id) {
        TransactionStatus transaction = dataSourceTransactionManager.getTransaction(transactionDefinition);
        if (StringUtils.isBlank(id)) {
            dataSourceTransactionManager.rollback(transaction);
            return Result.fail("id参数不能为空");
        }
        try {
            //验证User是否存在
            User user1 = userMapper.selectById(id);
            if (user1 == null) {
                dataSourceTransactionManager.rollback(transaction);
                return Result.fail("用户删除失败,用户不存在");
            }
            //删除帖子
            boolean b = articleService.deleteByUserId(id,transaction);
            //该用户的评论
            boolean b1 = commentService.deleteByUserId(id,transaction);
            // 该用户点赞收藏中间表、
            boolean b2 =articleLikesCollectionService.deleteByUserId(id,transaction);
            // 该用户的好友中间表和好友聊天记录
            boolean b3 =friendsService.deleteByUserId(id,transaction);
            boolean b4 =friendsUserService.deleteByUserId(id,transaction);
            // 删除该用户的作者记录表
            boolean b5 =authorService.deleteByUserId(id,transaction);
            if (!b || !b1 || !b2 || !b3 || !b4 || !b5 ) {
                dataSourceTransactionManager.rollback(transaction);
                return Result.fail("删除失败");
            }
            int i = userMapper.deleteById(id);
            if (i == 0) {
                dataSourceTransactionManager.rollback(transaction);
                return Result.fail("删除失败");
            }
            dataSourceTransactionManager.commit(transaction);
            return Result.succ("删除成功");
        } catch (Exception e) {
            dataSourceTransactionManager.rollback(transaction);
            log.error("用户删除失败,原因是" + e);
            return Result.fail("用户删除失败");
        }
    }

    @Override
    public List<User> getListUserByUsernameOrNickname(String usernameOrNickname) {
        return userMapper.selectListUserByUsernameOrNickname(usernameOrNickname);
    }
}
