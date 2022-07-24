package in.vijaykarthik.mlyfcycle.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import in.vijaykarthik.mlyfcycle.entity.ServiceGroup;

@RepositoryRestResource(path = "group")
@CrossOrigin(origins = "http://localhost:3000")
public interface ServiceGroupRepo extends JpaRepository<ServiceGroup,Long>{
    
}
