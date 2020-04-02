package com.lmm.order.dto;

import com.lmm.common.api.BaseResponse;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true)
@EqualsAndHashCode(callSuper = true)
public class TestResponse extends BaseResponse {
    private TestList testList;
}
