package com.lin.sqzmHtgl.controller;

import com.lin.common.Result;
import com.lin.common.service.CommentService;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 *
 * @author linShengWei
 * @apiNote 分类
 * @since 2023-02-06
 */
@RestController
@RequestMapping("/comment")
public class CommentController {
    @Resource
    private CommentService commentService;


    @RequiresPermissions("comment:get")
    //获取评论
    @GetMapping("/getByArticleId/{articleId}")
    public Result getComments(@PathVariable("articleId") String articleId) {
        return commentService.getCommentsVoByArticleId(articleId);
    }

    @RequiresPermissions("comment:delete")
    @DeleteMapping ("/delete/{id}")
    public Result delete(@PathVariable("id") String id, @RequestHeader("Authorization") String token) {
        return commentService.delete(id,token);
    }
}
