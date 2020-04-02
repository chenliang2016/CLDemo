package com.lmm.order.dto;

import com.lmm.common.validation.Group1;
import com.lmm.common.validation.Group2;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TestDto {
    @NotBlank(groups = {Group1.class})
    private String id;
    @NotBlank(groups = {Group1.class, Group2.class})
    private String name;
}
