package com.lmm.order.client;

import com.lmm.order.dto.TestResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;
import com.lmm.order.OrderConstant;

@FeignClient(name = OrderConstant.SERVICE_NAME, path = "/v1/test", url = "${staffjoy.company-service-endpoint}")
public interface OrderClient {
    // Company Apis
    @PostMapping(path = "/test")
    TestResponse testList();

}
