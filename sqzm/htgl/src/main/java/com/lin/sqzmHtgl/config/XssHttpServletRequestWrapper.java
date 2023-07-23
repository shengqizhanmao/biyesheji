package com.lin.sqzmHtgl.config;

import com.lin.common.utils.XssUtils;
import org.springframework.context.annotation.Configuration;

import javax.servlet.ReadListener;
import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

public class XssHttpServletRequestWrapper extends HttpServletRequestWrapper {


    //初始化
    public XssHttpServletRequestWrapper(HttpServletRequest request) {
        super(request);
    }


    /*
    * 对数组进行处理
    * @param name
    * @return cleanXSS解析后的参数
    * */
    @Override
    public String[] getParameterValues(String parameter) {
        String[] values = super.getParameterValues(parameter);
        if (values==null)  {
            return null;
        }
        int count = values.length;
        String[] encodedValues = new String[count];
        for (int i = 0; i < count; i++) {
            encodedValues[i] = XssUtils.cleanXSS(values[i]);
        }
        return encodedValues;
    }

    /*
    * @PathVariable注解是REST风格url获取参数的方式，只能用在GET请求类型，通过getParameter获取参数
    * @RequestParam注解支持GET和POST/PUT/DELETE/PATCH方式，Get方式通过getParameter获取参数
    * HttpServletRequest参数可以通过getParameter和getInputStream或getReader获取参数
    *
    * 对参数处理
    * @param name
    * @return cleanXSS解析后的参数
    * */
    @Override
    public String getParameter(String parameter) {
        String value = super.getParameter(parameter);
        if (value != null) {
            return XssUtils.cleanXSS(value);
        }
        return null;
    }

    /**
     * 对 application/x-www-form-urlencoded 格式的POST请求参数，进行 cleanXSS解析
     * @return cleanXSS解析后的参数
     */
    @Override
    public Map<String, String[]> getParameterMap() {
        Map<String, String[]> values = super.getParameterMap();
        if (values == null) {
            return null;
        }
        Map<String, String[]> result = new HashMap<>();
        for (String key : values.keySet()) {
            String encodedKey = XssUtils.cleanXSS(key);
            int count = values.get(key).length;
            String[] encodedValues = new String[count];
            for (int i = 0; i < count; i++) {
                encodedValues[i] = XssUtils.cleanXSS(values.get(key)[i]);
            }
            result.put(encodedKey, encodedValues);
        }
        return result;
    }

    /*
    * 获取请求头的参数
    * HttpServletRequest参数可以通过getParameter和getInputStream或getReader获取参数
    * */
    @Override
    public String getHeader(String name) {
        String value = super.getHeader(name);
        if (value == null)
            return null;
        return XssUtils.cleanXSS(value);
    }



    /*
    * @RequestBody注解支持POST/PUT/DELETE/PATCH，可以通过getInputStream和getReader获取参数
    * @RequestParam注解支持GET和POST/PUT/DELETE/PATCH方式，post方式通过getInputStream或getReader获取参数
    * 获取参数
    * */
    @Override
    public ServletInputStream getInputStream() throws IOException {
        final ByteArrayInputStream bais = new ByteArrayInputStream(inputHandlers(super.getInputStream ()).getBytes ());
        return new ServletInputStream() {
            @Override
            public int read() throws IOException {
                return bais.read();
            }
            @Override
            public boolean isFinished() {
                return false;
            }
            @Override
            public boolean isReady() {
                return false;
            }
            @Override
            public void setReadListener(ReadListener readListener) { }
        };
    }


    public String inputHandlers(ServletInputStream servletInputStream){
        StringBuilder sb = new StringBuilder();
        BufferedReader reader = null;
        try {
            reader = new BufferedReader(new InputStreamReader(servletInputStream, StandardCharsets.UTF_8));
            String line = "";
            while ((line = reader.readLine()) != null) {
                sb.append(line);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (servletInputStream != null) {
                try {
                    servletInputStream.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            if (reader != null) {
                try {
                    reader.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return  XssUtils.cleanXSS(sb.toString ());
    }

}