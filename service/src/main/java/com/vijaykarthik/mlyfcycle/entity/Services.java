package com.vijaykarthik.mlyfcycle.entity;

import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Services {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;
    @Column(unique = true,nullable = false)
    String serviceName;
    @Column
    String serviceDescription;
    @Column
    String codeRepoUrl;
    @Column
    String ciCdPlanUrl;
    @Column
    String Owner;
    @Column
    String groupName;


    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getServiceName() {
        return this.serviceName;
    }

    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }

    public String getServiceDescription() {
        return this.serviceDescription;
    }

    public void setServiceDescription(String serviceDescription) {
        this.serviceDescription = serviceDescription;
    }

    public String getCodeRepoUrl() {
        return this.codeRepoUrl;
    }

    public void setCodeRepoUrl(String codeRepoUrl) {
        this.codeRepoUrl = codeRepoUrl;
    }

    public String getCiCdPlanUrl() {
        return this.ciCdPlanUrl;
    }

    public void setCiCdPlanUrl(String ciCdPlanUrl) {
        this.ciCdPlanUrl = ciCdPlanUrl;
    }

    public String getOwner() {
        return this.Owner;
    }

    public void setOwner(String Owner) {
        this.Owner = Owner;
    }

    public String getGroupName() {
        return this.groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }



    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof Services)) {
            return false;
        }
        Services services = (Services) o;
        return Objects.equals(id, services.id) && Objects.equals(serviceName, services.serviceName) && 
        Objects.equals(serviceDescription, services.serviceDescription) && Objects.equals(codeRepoUrl, services.codeRepoUrl) && 
        Objects.equals(ciCdPlanUrl, services.ciCdPlanUrl) && Objects.equals(Owner, services.Owner) && Objects.equals(groupName, services.groupName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, serviceName, serviceDescription, codeRepoUrl, ciCdPlanUrl, Owner, groupName);
    }

    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", serviceName='" + getServiceName() + "'" +
            ", serviceDescription='" + getServiceDescription() + "'" +
            ", codeRepoUrl='" + getCodeRepoUrl() + "'" +
            ", ciCdPlanUrl='" + getCiCdPlanUrl() + "'" +
            ", Owner='" + getOwner() + "'" +
            ", groupName='" + getGroupName() + "'" +
            "}";
    }
    
}
