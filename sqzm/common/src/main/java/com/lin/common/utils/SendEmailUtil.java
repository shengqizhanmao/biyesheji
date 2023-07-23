package com.lin.common.utils;

import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

/**
 * @author lin
 */
@Component
public class SendEmailUtil {
    @Value("${spring.mail.from}")
    private String from; // 发送发邮箱地址

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    @Autowired
    private JavaMailSender mailSender;

    /**
     * 发送纯文本邮件信息
     *
     * @param to      接收方
     * @param subject 设置邮件标题
     * @param content 邮件内容（发送内容）
     */
    public void sendMessage(@NotNull String to,
                            @NotNull String subject,
                            @NotNull String content) {
        // 创建一个邮件对象
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setFrom(from); // 设置发送发
        msg.setTo(to); // 设置接收方
        msg.setSubject(subject); // 设置邮件标题
        msg.setText(content); // 设置邮件内容
        // 发送邮件
        mailSender.send(msg);
    }
}
