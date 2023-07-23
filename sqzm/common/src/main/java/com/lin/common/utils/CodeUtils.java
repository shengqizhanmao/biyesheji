package com.lin.common.utils;

import io.minio.MinioClient;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Random;

/**
 * @author lin
 */
@Component
@Lazy
public class CodeUtils {

    public CodeUtils() {
    }

    /**
     * 生成验证码图片的工具类
     */
    private int width = 100;// 生成验证码图片的宽度
    private int height = 30;// 生成验证码图片的高度
    @NotNull
    private String[] fontNames = {"宋体", "楷体", "隶书", "微软雅黑"};
    @NotNull
    private Color bgColor = new Color(255, 255, 255);// 定义验证码图片的背景颜色为白色
    @NotNull
    private Random random = new Random();
    @NotNull
    private String codes = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private String text;// 记录随机字符串

    /**
     * 获取一个随意颜色
     *
     */
    @NotNull
    private Color randomColor() {
        int red = random.nextInt(150);
        int green = random.nextInt(150);
        int blue = random.nextInt(150);
        return new Color(red, green, blue);
    }

    /**
     * 获取一个随机字体
     *
     */
    @NotNull
    private Font randomFont() {
        String name = fontNames[random.nextInt(fontNames.length)];
        int style = random.nextInt(4);
        int size = random.nextInt(5) + 24;
        return new Font(name, style, size);
    }

    /**
     * 获取一个随机字符
     *
     */
    private char randomChar() {
        return codes.charAt(random.nextInt(codes.length()));
    }

    /**
     * 获取n个随机字符
     *
     */
    public String randomString(int n) {
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i <  n; i++) {
            char s = randomChar();
            sb.append(s);
        }
        return sb.toString();
    }

    /**
     * 创建一个空白的BufferedImage对象
     *
     */
    @NotNull
    private BufferedImage createImage() {
        BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
        Graphics2D g2 = (Graphics2D) image.getGraphics();
        g2.setColor(bgColor);// 设置验证码图片的背景颜色
        g2.fillRect(0, 0, width, height);
        return image;
    }

    @NotNull
    public BufferedImage getImage() {
        BufferedImage image = createImage();
        Graphics2D g2 = (Graphics2D) image.getGraphics();
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < 4; i++) {
            String s = randomChar() + "";
            sb.append(s);
            g2.setColor(randomColor());
            g2.setFont(randomFont());
            float x = i * width * 1.0f / 4;
            g2.drawString(s, x, height - 8);
        }
        this.text = sb.toString();
        drawLine(image);
        return image;
    }

    /**
     * 绘制干扰线
     *
     */
    private void drawLine(@NotNull BufferedImage image) {
        Graphics2D g2 = (Graphics2D) image.getGraphics();
        int num = 5;
        for (int i = 0; i < num; i++) {
            int x1 = random.nextInt(width);
            int y1 = random.nextInt(height);
            int x2 = random.nextInt(width);
            int y2 = random.nextInt(height);
            g2.setColor(randomColor());
            g2.setStroke(new BasicStroke(1.5f));
            g2.drawLine(x1, y1, x2, y2);
        }
    }

    public String getText() {
        return text;
    }

    public void output(@NotNull BufferedImage image, @NotNull OutputStream out) throws IOException {
        ImageIO.write(image, "JPEG", out);
    }
}