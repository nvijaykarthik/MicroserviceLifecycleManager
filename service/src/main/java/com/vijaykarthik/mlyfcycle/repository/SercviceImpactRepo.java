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
    
    @RestResource(path="/groupNameAndReleaseDateAndFeatureNumber")
    @Query("Select sid FROM ServiceImpactDetails sid, ServiceChangeRequest scr, Services s where scr.storyNumber = sid.storyNumber and s.serviceName = sid.impactedServiceName and s.groupName = :groupName and scr.featureNumber = :featureNumber and scr.targetReleaseDate = :targetReleaseDate")
    List<ServiceImpactDetails> findByGroupNameAndReleaseDateAndFeatureNumber(@Param(value = "groupName") String groupName, @Param(value = "featureNumber") String featureNumber, @Param(value = "targetReleaseDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate targetReleaseDate);
    
    @RestResource(path="/groupNameAndReleaseDate")
    @Query("Select sid FROM ServiceImpactDetails sid, ServiceChangeRequest scr, Services s where scr.storyNumber = sid.storyNumber and s.serviceName = sid.impactedServiceName and s.groupName = :groupName and scr.targetReleaseDate = :targetReleaseDate")
    List<ServiceImpactDetails> findByGroupNameAndReleaseDate(@Param(value = "groupName") String groupName, @Param(value = "targetReleaseDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate targetReleaseDate);
    
    @RestResource(path="/groupName")
    @Query("Select sid FROM ServiceImpactDetails sid, ServiceChangeRequest scr, Services s where scr.storyNumber = sid.storyNumber and s.serviceName = sid.impactedServiceName and s.groupName = :groupName")
    List<ServiceImpactDetails> findByGroupName(@Param(value = "groupName") String groupName);
    
    @RestResource(path="/releaseDate")
    @Query("Select sid FROM ServiceImpactDetails sid, ServiceChangeRequest scr, Services s where scr.storyNumber = sid.storyNumber and s.serviceName = sid.impactedServiceName and scr.targetReleaseDate = :targetReleaseDate")
    List<ServiceImpactDetails> findByReleaseDate(@Param(value = "targetReleaseDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate targetReleaseDate);
    
    @RestResource(path="/featureNumber")
    @Query("Select sid FROM ServiceImpactDetails sid, ServiceChangeRequest scr, Services s where scr.storyNumber = sid.storyNumber and s.serviceName = sid.impactedServiceName and scr.featureNumber = :featureNumber")
    List<ServiceImpactDetails> findByFeatureNumber(@Param(value = "featureNumber") String featureNumber);
    
    @RestResource(path="/featureNumberAndReleaseDate")
    @Query("Select sid FROM ServiceImpactDetails sid, ServiceChangeRequest scr, Services s where scr.storyNumber = sid.storyNumber and s.serviceName = sid.impactedServiceName and scr.featureNumber = :featureNumber and scr.targetReleaseDate = :targetReleaseDate")
    List<ServiceImpactDetails> findByFeatureNumberAndReleaseDate(@Param(value = "featureNumber") String featureNumber, @Param(value = "targetReleaseDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate targetReleaseDate);
    
    @RestResource(path="/groupNameAndFeatureNumber")
    @Query("Select sid FROM ServiceImpactDetails sid, ServiceChangeRequest scr, Services s where scr.storyNumber = sid.storyNumber and s.serviceName = sid.impactedServiceName and s.groupName = :groupName and scr.featureNumber = :featureNumber")
    List<ServiceImpactDetails> findByGroupNameAndFeatureNumber(@Param(value = "groupName") String groupName, @Param(value = "featureNumber") String featureNumber);

}
