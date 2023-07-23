package com.lin.sqzmYxlt.filter;

import com.lin.sqzmYxlt.config.XssEditerHttpServletRequestWrapper;
import com.lin.sqzmYxlt.config.XssHttpServletRequestWrapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.annotation.Order;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;


//@Component
@Slf4j
@WebFilter(filterName="XSSFilter", urlPatterns="/*")
@Order(1)
//@WebFilter
public class XssFilter implements Filter {
    FilterConfig filterConfig = null;

    /*
    * 初始化
    * */
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        this.filterConfig = filterConfig;
    }

    /*
    * Xss过滤
    * */
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
//        log.info("进入xss过滤器");
        //获取请求数据
        HttpServletRequest req = (HttpServletRequest) servletRequest;
        //预处理放过
        if (req.getMethod().contains("OPTIONS")){
//            log.info("xss过滤器:请求为OPTIONS预检,直接放过");
//            log.info("xss过滤器过滤完毕");
            filterChain.doFilter(servletRequest, servletResponse);
            return;
        }
        //uri是favicon.ico放过
        if(req.getRequestURI().contains("favicon.ico")){
            log.info(req.getRequestURI());
//            log.info("favicon.ico");
//            log.info("xss过滤器过滤完毕");
            filterChain.doFilter(servletRequest, servletResponse);
            return;
        }
        StringBuffer requestURL = ((HttpServletRequest) servletRequest).getRequestURL();
        //获取请求的url路径
        String path = ((HttpServletRequest) servletRequest).getServletPath();
        //声明要被忽略请求的数组
        String[] exclusionsUrls = {"/article/img","/user/updateUserAvatar"};
        //声明带有富文本的接口数组
        String[] richTextUrls = {"/article/apply","/article/update"};
//        log.info("请求的URL:"+path);
//        log.info("请求完整的URL:"+requestURL);
        //第一种xss过滤，对富文本过滤
        XssEditerHttpServletRequestWrapper xssEditerHttpServletRequestWrapper = new XssEditerHttpServletRequestWrapper(req);
        //遍历忽略的请求数组，若该接口url为忽略的就调用原本的过滤器，不走xss过滤
        for (String str : exclusionsUrls) {
            if (path.contains(str)) {
//                log.info("忽略上传文件等");
//                log.info("xss过滤器过滤完毕");
                filterChain.doFilter(servletRequest, servletResponse);
                return;
            }
        }
        //若为带有富文本的接口，走富文本xss过滤
        for (String rtu : richTextUrls) {
            if (path.contains(rtu)) {
//                log.info("富文本");
//                log.info("xss过滤器过滤完毕");
                filterChain.doFilter(xssEditerHttpServletRequestWrapper, servletResponse);
                return;
            }
        }
//        log.info("非富文本");
//        log.info("xss过滤器过滤完毕");
        //非富文本
        filterChain.doFilter(new XssHttpServletRequestWrapper((HttpServletRequest) servletRequest), servletResponse);
    }
    /*
    * 销毁
    * */
    @Override
    public void destroy() {
        this.filterConfig = null;
    }

}
