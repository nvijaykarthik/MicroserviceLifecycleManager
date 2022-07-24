package in.vijaykarthik.mlyfcycle;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Profile;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Component
@Profile(value = {"default"})
public class SpringDataRestConfig implements RepositoryRestConfigurer {

    Logger log = LoggerFactory.getLogger(SpringDataRestConfig.class);
    @Override
    public void configureRepositoryRestConfiguration(
        RepositoryRestConfiguration config, CorsRegistry cors) {

        log.info("Enabling cors origin");

      cors.addMapping("/*")
          .allowedOrigins("*")
          .allowedMethods("GET", "PUT", "DELETE","POST","HEAD","OPTIONS","PATCH")
          .allowCredentials(false).maxAge(3600);
    }
  }
