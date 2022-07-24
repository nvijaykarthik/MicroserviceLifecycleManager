package in.vijaykarthik.mlyfcycle.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import in.vijaykarthik.mlyfcycle.entity.Portfolio;

@RepositoryRestResource(path = "portfolio")
@CrossOrigin(origins = "http://localhost:3000")
public interface PortfolioRepo extends CrudRepository<Portfolio,Long>{
    
    @RestResource(path = "/byName")
    List<Portfolio> findByNameContainingIgnoreCase(@Param("name") String name);
}
