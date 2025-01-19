package com.project.model;

import lombok.Data;

@Data
public class KrhPage {
	int nowPage=1;
    int startNo, endNo;
    int listSize=6;
    int totSize;
    String findStr; 
    
    public void compute(){
        endNo=nowPage*listSize;
        startNo=endNo-listSize;
    }
}
