package com.project.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.project.mapper.PjeSemiMapper;
import com.project.model.PjeOrder;

@Service
public class OrderHistoryService {
    private final PjeSemiMapper pjeSemiMapper;

    public OrderHistoryService(PjeSemiMapper pjeSemiMapper) {
        this.pjeSemiMapper = pjeSemiMapper;
    }

    public List<PjeOrder> getOrderHistoryList() {
        return pjeSemiMapper.findAll();
    }
    public List<PjeOrder> getOrderHistoryList(int userId) {
        return pjeSemiMapper.findAllByUserId(userId);
    }

}