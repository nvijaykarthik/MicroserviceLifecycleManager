package in.vijaykarthik.mlyfcycle.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import in.vijaykarthik.mlyfcycle.entity.ServiceChangeRequest;

@RepositoryRestResource(path="serviceChangeRequest")
@CrossOrigin(origins = "http://localhost:3000")
public interface ServiceChangeRepo extends CrudRepository<ServiceChangeRequest,Long>{
    
}
