package com.lin.common.utils;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Objects;

public class XssUtils {

    //非富文本过滤
    public static String cleanXSS(String value) {
        if (Objects.isNull(value)) {
            return value;
        }
        //在这里自定义需要过滤的字符
        value = value.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
        value = value.replaceAll("%3C", "&lt;").replaceAll("%3E", "&gt;");
        value = value.replaceAll("%28", "&#40;").replaceAll("%29", "&#41;");
        value = value.replaceAll("'", "&#39;");
        value = value.replaceAll("eval\\((.*)\\)", "");
        value = value.replaceAll("<[\\s]*?script[^>]*?>[\\s\\S]*?<[\\s]*?\\/[\\s]*?script[\\s]*?>", "");
        value = value.replaceAll("<[\\s]*?javascript[^>]*?>[\\s\\S]*?<[\\s]*?\\/[\\s]*?javascript[\\s]*?>", "");
        value = value.replaceAll("alert", "");
        return value;
    }
    //富文本过滤
    public static String cleanEditerXSS(String value) {
        if (StringUtils.isBlank(value)) {
            return "";
        }
        value = value.replaceAll("eval\\((.*)\\)", "");
        value = value.replaceAll("<[\\s]*?script[^>]*?>[\\s\\S]*?<[\\s]*?\\/[\\s]*?script[\\s]*?>", "");
        value = value.replaceAll("<[\\s]*?javascript[^>]*?>[\\s\\S]*?<[\\s]*?\\/[\\s]*?javascript[\\s]*?>", "");
        value = value.replaceAll("alert", "");
        return value;
    }
}