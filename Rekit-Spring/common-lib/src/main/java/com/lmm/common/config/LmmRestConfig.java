package com.lmm.common.config;

import com.lmm.common.aop.SentryClientAspect;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import com.lmm.common.error.GlobalExceptionTranslator;

/**
 * Use this common order for Rest API
 */
@Configuration
@Import(value = {LmmConfig.class, GlobalExceptionTranslator.class})
public class LmmRestConfig {
}
