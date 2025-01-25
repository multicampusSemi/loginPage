package com.project.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.project.mapper.PjeSemiMapper;
import com.project.model.PjeRecent;

@Service
public class RecentOrderService {
    private final PjeSemiMapper mapper;

    public RecentOrderService(PjeSemiMapper mapper) {
        this.mapper = mapper;
    }

    public List<PjeRecent> getRecentOrders() {
        return mapper.getRecentOrders();
    }
    public List<PjeRecent> getRecentOrders(int userId) {
        return mapper.getRecentOrdersByUserId(userId);
    }
}