package com.lin.sqzmYxlt.listener;

import com.lin.common.RedisStatus;
import com.lin.common.utils.MinioUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.KeyExpirationEventMessageListener;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.nio.charset.StandardCharsets;

@Component
@Slf4j
public class RedisKeyExpirationListener extends KeyExpirationEventMessageListener {

    @Resource
    private RedisTemplate<String,String> redisTemplate;
    @Resource
    private MinioUtils minioUtils;

    public RedisKeyExpirationListener(RedisMessageListenerContainer listenerContainer) {
        super(listenerContainer);
    }

    @Override
    public void onMessage(Message message, byte[] pattern) {
        String key = message.toString();
        String key2 = "Gq:"+key;
//        log.info("过期消息key："+key+"-----value："+new String(pattern, StandardCharsets.UTF_8));
//        log.info("过期消息key："+key2+"-----value："+new String(pattern, StandardCharsets.UTF_8));
        //图片
        if (key2.startsWith(RedisStatus.ARTICLE_IMAGES)){
            String value = redisTemplate.opsForValue().get(key2);
            System.out.println("key:"+key2+"，value:"+value);
            try {
                minioUtils.removeObject(value);
            } catch (Exception e) {
                log.error("删除图片出现错误");
            }
            redisTemplate.delete(key2);
        }
        super.onMessage(message, pattern);
    }
}
