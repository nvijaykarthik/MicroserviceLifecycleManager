package com.vijaykarthik.mlyfcycle.entity;

import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class ServiceGroup {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;

    @Column(nullable = false)
    String name;

    @Column(nullable = false)
    String portfolioName;

    public String getPortfolioName() {
        return this.portfolioName;
    }

    public void setPortfolioName(String portfolioName) {
        this.portfolioName = portfolioName;
    }

    
    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof ServiceGroup)) {
            return false;
        }
        ServiceGroup serviceGroup = (ServiceGroup) o;
        return Objects.equals(id, serviceGroup.id) && Objects.equals(name, serviceGroup.name) && Objects.equals(portfolioName, serviceGroup.portfolioName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, portfolioName);
    }


    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", name='" + getName() + "'" +
            ", portfolioName='" + getPortfolioName() + "'" +
            "}";
    }
 

}
