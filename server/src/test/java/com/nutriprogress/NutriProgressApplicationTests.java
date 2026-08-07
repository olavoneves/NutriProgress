package com.nutriprogress;

import com.nutriprogress.config.TestContainersConfig;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test")
@Import(TestContainersConfig.class)
class NutriProgressApplicationTests {

    @Test
    void contextLoads() {
    }
}
