package com.example.text_two;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.example.text_two.mapper")
public class TextTwoApplication {

	public static void main(String[] args) {
		SpringApplication.run(TextTwoApplication.class, args);
	}

}
