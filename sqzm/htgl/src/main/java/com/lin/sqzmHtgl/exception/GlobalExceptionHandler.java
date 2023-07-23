package com.lin.sqzmHtgl.exception;


import com.lin.common.Result;
import lombok.extern.slf4j.Slf4j;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.DisabledAccountException;
import org.apache.shiro.authz.AuthorizationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MissingRequestHeaderException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.io.IOException;
import java.sql.SQLException;

/**
 * 全局异常处理
 */
@Slf4j
@RestControllerAdvice
class GlobalExceptionHandler {


    //未登录
    @ExceptionHandler(value = MissingRequestHeaderException.class)
    public Result handler(MissingRequestHeaderException e) {
        return Result.fail(400, "未登录,请登录");
    }

    @ExceptionHandler(value = DisabledAccountException.class)
    public Result handler(DisabledAccountException e) {
        return Result.fail(403, "帐号被禁用");
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(value = NullPointerException.class)
    public Result handler(NullPointerException e) {
        return Result.fail(400, "权限不够,请联系管理员");
    }

    @ExceptionHandler(value = AuthenticationException.class)
    public Result handler(AuthenticationException e) {
        return Result.fail(420, "token过期了,请重新登录");
    }
    @ExceptionHandler(value = AuthorizationException.class)
    public Result handler(AuthorizationException e) {
        return Result.fail(403, "权限不够,请联系管理员");
    }


    @ExceptionHandler({HttpMessageNotReadableException.class})
    public Result messageExceptionHandler(HttpMessageNotReadableException e) {
        return Result.fail(415, "http请求参数转换异常" + e);
    }

    @ExceptionHandler(value = MissingServletRequestParameterException.class)
    public Result handler(MissingServletRequestParameterException e) {
        return Result.fail(415, "请求参数格式错误" + e);
    }

    @ExceptionHandler(value = IllegalArgumentException.class)
    public Result handler(IllegalArgumentException e) {
        return Result.fail(415, "请求参数格式错误" + e);
    }

    /** sql异常 */
    @ExceptionHandler(SQLException.class)
    public Result SQLException(SQLException e) {
        log.error("SQL异常，原因："+e);
        return Result.fail(500,"程序出现错误");
    }

    /* IO异常 */
    @ExceptionHandler(IOException.class)
    public Result iOExceptionHandler(IOException e) {
        log.error("IO异常,原因为 "+ e.getMessage()+"----"+ e);
        return Result.fail(500,"IO异常");
    }

}