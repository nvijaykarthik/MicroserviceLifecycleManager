package in.vijaykarthik.mlyfcycle.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import in.vijaykarthik.mlyfcycle.entity.ServiceChangeRequest;

@RepositoryRestResource(path="serviceChangeRequest")
@CrossOrigin(origins = "http://localhost:3000")
public interface ServiceChangeRepo extends CrudRepository<ServiceChangeRequest,Long>{

    @RestResource(path="/byStoryNumber")
     List<ServiceChangeRequest> findByStoryNumber(@Param(value = "storyNumber") String storyNumber);

    @RestResource(path="/byFeatureNumber")
    List<ServiceChangeRequest> findByFeatureNumber(@Param(value = "featureNumber") String featureNumber);
}
