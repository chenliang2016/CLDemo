package com.lmm.order.controller;

import com.lmm.common.auth.Authorize;
import com.lmm.order.dto.*;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import com.lmm.order.service.TestService;

@RestController
@RequestMapping("/v1/test")
@Validated
public class TestController {

    @Autowired
    TestService testService;

    @Authorize(value = {

    })
    @GetMapping(path = "/test")
    @ApiOperation(value = "post请求调用示例", notes = "invokePost说明", httpMethod = "POST")
    public TestResponse testList() {
        TestList list = testService.listAdmins();
        return new TestResponse(list);
    }


}
