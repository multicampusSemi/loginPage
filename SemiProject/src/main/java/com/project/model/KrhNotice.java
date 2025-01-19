package com.project.model;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class KrhNotice {
	private int id;
    private String title;
    private String content;
    private LocalDateTime createdAt;
    private int views;
}