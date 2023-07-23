package com.lin.sqzmYxlt.controller;

import com.lin.common.Result;
import com.lin.common.service.CommentService;
import com.lin.sqzmYxlt.controller.param.CommentCreateParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * <p>
 * 评论
 * </p>
 *
 * @author linShengWei
 * @apiNote 评论
 * @since 2023-02-06
 */
@RestController
@RequestMapping("/comment")
public class CommentController {

    @Resource
    private CommentService commentService;

    //获取评论
    @GetMapping("/get/{articleId}")
    public Result comments(@PathVariable("articleId") String articleId) {
        return commentService.getCommentsVoByArticleId(articleId);
    }
    //进行评论
    @PostMapping("/create")
    public Result create(@RequestBody CommentCreateParam commentCreateParam, @RequestHeader("Authorization") String token) {
        String articleId = commentCreateParam.getArticleId();
        String content = commentCreateParam.getContent();
        String toUserId = commentCreateParam.getToUserId();
        String parentId = commentCreateParam.getParentId();
        return commentService.create(articleId, content, toUserId, parentId, token);
    }

    @PostMapping("/delete/{id}")
    public Result delete(@PathVariable("id") String id, @RequestHeader("Authorization") String token) {
        return commentService.delete(id,token);
    }
}
