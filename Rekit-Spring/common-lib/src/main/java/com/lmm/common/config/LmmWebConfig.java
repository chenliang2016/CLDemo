package com.lmm.common.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import com.lmm.common.aop.SentryClientAspect;

/**
 * Use this common order for Web App
 */
@Configuration
@Import(value = {LmmConfig.class, })
public class LmmWebConfig {
}
