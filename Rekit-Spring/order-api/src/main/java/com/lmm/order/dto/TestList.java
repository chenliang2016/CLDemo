package com.lmm.order.dto;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TestList {
    private List<TestDto> tests = new ArrayList<TestDto>();
}
