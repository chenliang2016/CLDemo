package com.lmm.order;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

//@EnableFeignClients(basePackages = {"xyz.staffjoy.account", "xyz.staffjoy.bot"})
@MapperScan({"com.lmm.order.mapper","com.lmm.order.dao"})
@SpringBootApplication
public class OrderApplication {

    public static void main(String[] args) {
        SpringApplication.run(OrderApplication.class, args);
    }
}

