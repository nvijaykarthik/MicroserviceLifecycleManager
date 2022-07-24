package in.vijaykarthik.mlyfcycle.entity;

import java.time.LocalDate;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class ServiceChangeRequest {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;
    @Column(unique = true,nullable = false)
    String storyNumber;
    @Column(nullable = false)
    String featureNumber;
    @Column
    String epicNumber;
    @Column(nullable = false)
    String storyLink;
    @Column
    String storyDescription;
    @Column
    String targetReleaseNumber;
    @Column
    LocalDate targetReleaseDate;

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStoryNumber() {
        return this.storyNumber;
    }

    public void setStoryNumber(String storyNumber) {
        this.storyNumber = storyNumber;
    }

    public String getFeatureNumber() {
        return this.featureNumber;
    }

    public void setFeatureNumber(String featureNumber) {
        this.featureNumber = featureNumber;
    }

    public String getEpicNumber() {
        return this.epicNumber;
    }

    public void setEpicNumber(String epicNumber) {
        this.epicNumber = epicNumber;
    }

    public String getStoryLink() {
        return this.storyLink;
    }

    public void setStoryLink(String storyLink) {
        this.storyLink = storyLink;
    }

    public String getStoryDescription() {
        return this.storyDescription;
    }

    public void setStoryDescription(String storyDescription) {
        this.storyDescription = storyDescription;
    }

    public String getTargetReleaseNumber() {
        return this.targetReleaseNumber;
    }

    public void setTargetReleaseNumber(String targetReleaseNumber) {
        this.targetReleaseNumber = targetReleaseNumber;
    }

    public LocalDate getTargetReleaseDate() {
        return this.targetReleaseDate;
    }

    public void setTargetReleaseDate(LocalDate targetReleaseDate) {
        this.targetReleaseDate = targetReleaseDate;
    }


    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof ServiceChangeRequest)) {
            return false;
        }
        ServiceChangeRequest serviceChangeRequest = (ServiceChangeRequest) o;
        return Objects.equals(id, serviceChangeRequest.id) && Objects.equals(storyNumber, serviceChangeRequest.storyNumber) && Objects.equals(featureNumber, serviceChangeRequest.featureNumber) && Objects.equals(epicNumber, serviceChangeRequest.epicNumber) && Objects.equals(storyLink, serviceChangeRequest.storyLink) && Objects.equals(storyDescription, serviceChangeRequest.storyDescription) && Objects.equals(targetReleaseNumber, serviceChangeRequest.targetReleaseNumber) && Objects.equals(targetReleaseDate, serviceChangeRequest.targetReleaseDate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, storyNumber, featureNumber, epicNumber, storyLink, storyDescription, targetReleaseNumber, targetReleaseDate);
    }

    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", storyNumber='" + getStoryNumber() + "'" +
            ", featureNumber='" + getFeatureNumber() + "'" +
            ", epicNumber='" + getEpicNumber() + "'" +
            ", storyLink='" + getStoryLink() + "'" +
            ", storyDescription='" + getStoryDescription() + "'" +
            ", targetReleaseNumber='" + getTargetReleaseNumber() + "'" +
            ", targetReleaseDate='" + getTargetReleaseDate() + "'" +
            "}";
    }

}
