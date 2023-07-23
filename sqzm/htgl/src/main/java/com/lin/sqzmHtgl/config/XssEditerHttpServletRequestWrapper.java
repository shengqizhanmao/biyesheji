package com.lin.sqzmHtgl.config;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lin.common.utils.XssUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.context.annotation.Configuration;

import javax.servlet.ReadListener;
import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import java.io.*;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.*;

/**
 * @description XSS过滤(针对含富文本变量的接口进行过滤)
 */
public class XssEditerHttpServletRequestWrapper extends HttpServletRequestWrapper {

    /**
     * 声明富文本字段，多个请用”|“分隔开
     * */
    private static String richTextKey = "contentHtml";
    private static Set<String> richTextKeySet = new HashSet<>(0);

    public XssEditerHttpServletRequestWrapper(HttpServletRequest request) {
        super(request);
    }


    /*
     * 初始化富文本字段
     */
    static {
        String[] keyStr = richTextKey.split("\\|");
        //将key添加到Set集合中
        richTextKeySet.addAll(Arrays.asList(keyStr));
//        for (String str : keyStr) {
//            richTextKeySet.add(str);
//        }
    }


    /**
     * 重写getParameter
     * @param name
     * @return
     */
    @Override
    public String getParameter(String name) {
        String value = super.getParameter(name);
        if (!StringUtils.isEmpty(value)) {
            value = XssUtils.cleanEditerXSS(value);
        }
        return value;
    }

    @Override
    public String[] getParameterValues(String name) {
        String[] parameterValues = super.getParameterValues(name);
        if (parameterValues == null) {
            return null;
        }
        for (int i = 0; i < parameterValues.length; i++) {
            String value = parameterValues[i];
            parameterValues[i] = XssUtils.cleanEditerXSS(value);
        }
        return parameterValues;
    }

    @Override
    public String getHeader(String name) {
        //过滤xss攻击
        String value = XssUtils.cleanEditerXSS(super.getHeader(name));
        if (value == null){
            return null;
        }
        return value;
    }

    @Override
    public String getQueryString() {
        return XssUtils.cleanEditerXSS(super.getQueryString());
    }

    /**
     * 过滤json数据中xss攻击
     */
    @Override
    public ServletInputStream getInputStream() throws IOException {
        //调用方法将流数据return为String
        String bodyStr = getRequestBody(super.getInputStream());
        //如果bodyStr为""，则返回0
        if ("".equals(bodyStr)) {
            return new ServletInputStream() {
                @Override
                public int read() throws IOException {
                    return 0;
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
                public void setReadListener(ReadListener readListener) {
                }
            };
        }
        final ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(bodyStr.getBytes());
        return new ServletInputStream() {
            @Override
            public int read() throws IOException {
                return byteArrayInputStream.read();
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
            public void setReadListener(ReadListener readListener) {
            }
        };
    }

    /**
     * 获取json数据
     * @param stream
     * @return
     */
    private String getRequestBody(InputStream stream) throws IOException {
        String line = "";
        StringBuilder body = new StringBuilder();
        // 读取POST提交的数据内容
        BufferedReader reader = new BufferedReader(new InputStreamReader(stream, StandardCharsets.UTF_8));
        while ((line = reader.readLine()) != null) {
            //拼接读取到的数据
            body.append(line);
        }
        if (body == null) {
            return "";
        }
        //最后返回数据
        return transJsonNode(body.toString());
    }


    /**
     * 将json字符串数据转成json树，再深度遍历去除xss
     * @param jsonStr json字符串
     * @return
     */
    private String transJsonNode(String jsonStr) {
        String str = "";
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(jsonStr);
            str = objectMapper.writeValueAsString(cleanJsonNodeXSS(jsonNode));
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return str;
    }

    /**
     * 对json树深度遍历去除xss
     * @param jsonNode json树
     * @return
     */
    private Object cleanJsonNodeXSS(JsonNode jsonNode) {
        Iterator<Map.Entry<String, JsonNode>> fields = jsonNode.fields();
        if (!fields.hasNext()) {
            String value = jsonNode.asText();
            return XssUtils.cleanEditerXSS(value);
        }
        Map<String, Object> map = new HashMap<>();
        while(fields.hasNext()) {
            Map.Entry<String, JsonNode> next = fields.next();
            if (next.getValue().isTextual()) {
                String value = next.getValue().asText();
                String key = next.getKey();
                //如果key=富文本字段名，进行特殊过滤
                String str = "";
                if (richTextKeySet.contains(key)) {
                    str =  XssUtils.cleanEditerXSS(value);
                } else {
                    str = XssUtils.cleanXSS(value);
                }
                map.put(next.getKey(),str);
            }else if (next.getValue().isObject()){
                map.put(next.getKey(),cleanJsonNodeXSS(next.getValue()));
            }else if(next.getValue().isArray()) {
                List<Object> elementList = new ArrayList<>();
                Iterator<JsonNode> elements = next.getValue().elements();
                while (elements.hasNext()) {
                    JsonNode childrenNext = elements.next();
                    Object nodeMap = cleanJsonNodeXSS(childrenNext);
                    elementList.add(nodeMap);
                }
                map.put(next.getKey(),elementList);
            }else {
                map.put(next.getKey(),next.getValue());
            }
        }
        return map;
    }
}
