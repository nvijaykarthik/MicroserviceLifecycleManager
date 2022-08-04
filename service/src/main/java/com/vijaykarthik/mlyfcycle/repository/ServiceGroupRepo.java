package com.vijaykarthik.mlyfcycle.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.vijaykarthik.mlyfcycle.entity.ServiceGroup;

@RepositoryRestResource(path = "group")
@CrossOrigin(origins = "http://localhost:3000")
public interface ServiceGroupRepo extends CrudRepository<ServiceGroup,Long>{
    
}
