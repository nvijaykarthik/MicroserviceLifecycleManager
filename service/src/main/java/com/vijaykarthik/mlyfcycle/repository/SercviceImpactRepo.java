package com.vijaykarthik.mlyfcycle.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.vijaykarthik.mlyfcycle.entity.ServiceImpactDetails;

@RepositoryRestResource(path="impactedService")
@CrossOrigin(origins = "http://localhost:3000")
public interface SercviceImpactRepo extends CrudRepository<ServiceImpactDetails,Long>{

    @RestResource(path="/storyNumber")
    List<ServiceImpactDetails> findByStoryNumber(@Param("storyNumber") String storyNumber);
    
    @RestResource(path="/serviceNameAndReleaseDate")
    @Query("Select sid FROM ServiceImpactDetails sid, ServiceChangeRequest scr, Services s where scr.storyNumber = sid.storyNumber and s.serviceName = sid.impactedServiceName and s.groupName = :groupName and scr.targetReleaseDate = :targetReleaseDate")
    List<ServiceImpactDetails> findByServiceNameAndReleaseDate(@Param(value = "groupName") String groupName, @Param(value = "targetReleaseDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate targetReleaseDate);
    
}
