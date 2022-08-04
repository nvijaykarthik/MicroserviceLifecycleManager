package com.vijaykarthik.mlyfcycle.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.vijaykarthik.mlyfcycle.entity.ServiceImpactDetails;

@RepositoryRestResource(path="impactedService")
@CrossOrigin(origins = "http://localhost:3000")
public interface SercviceImpactRepo extends CrudRepository<ServiceImpactDetails,Long>{

    @RestResource(path="/storyNumber")
    List<ServiceImpactDetails> findByStoryNumber(@Param("storyNumber") String storyNumber);
    
    
    @RestResource(path="/serviceNameAndReleaseDate")
    @Query("Select sid FROM ServiceImpactDetails sid, ServiceChangeRequest scr where scr.storyNumber = sid.storyNumber and sid.impactedServiceName = :impactedServiceName and scr.targetReleaseDate = :targetReleaseDate")
    List<ServiceImpactDetails> findByserviceNameAndReleaseDate(@Param(value = "impactedServiceName") String impactedServiceName, @Param(value = "targetReleaseDate") String targetReleaseDate);
    
}
