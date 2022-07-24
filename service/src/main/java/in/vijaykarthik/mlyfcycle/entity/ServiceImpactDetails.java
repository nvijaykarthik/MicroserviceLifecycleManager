package in.vijaykarthik.mlyfcycle.entity;

import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class ServiceImpactDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;
    @Column(nullable = false)
    String storyNumber;
    @Column(nullable = false)
    String impactedServiceName;
    @Column
    Boolean install;
    @Column
    Boolean restart;
    @Column
    Boolean cacheClear;
    @Column
    Boolean dbChange;
    @Column
    String dbChangeCommitUrl;
    @Column
    Boolean codeChange;
    @Column
    String codeChangeCommitUrl;

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

    public String getImpactedServiceName() {
        return this.impactedServiceName;
    }

    public void setImpactedServiceName(String impactedServiceName) {
        this.impactedServiceName = impactedServiceName;
    }

    public Boolean isInstall() {
        return this.install;
    }

    public Boolean getInstall() {
        return this.install;
    }

    public void setInstall(Boolean install) {
        this.install = install;
    }

    public Boolean isRestart() {
        return this.restart;
    }

    public Boolean getRestart() {
        return this.restart;
    }

    public void setRestart(Boolean restart) {
        this.restart = restart;
    }

    public Boolean isCacheClear() {
        return this.cacheClear;
    }

    public Boolean getCacheClear() {
        return this.cacheClear;
    }

    public void setCacheClear(Boolean cacheClear) {
        this.cacheClear = cacheClear;
    }

    public Boolean isDbChange() {
        return this.dbChange;
    }

    public Boolean getDbChange() {
        return this.dbChange;
    }

    public void setDbChange(Boolean dbChange) {
        this.dbChange = dbChange;
    }

    public String getDbChangeCommitUrl() {
        return this.dbChangeCommitUrl;
    }

    public void setDbChangeCommitUrl(String dbChangeCommitUrl) {
        this.dbChangeCommitUrl = dbChangeCommitUrl;
    }

    public Boolean isCodeChange() {
        return this.codeChange;
    }

    public Boolean getCodeChange() {
        return this.codeChange;
    }

    public void setCodeChange(Boolean codeChange) {
        this.codeChange = codeChange;
    }

    public String getCodeChangeCommitUrl() {
        return this.codeChangeCommitUrl;
    }

    public void setCodeChangeCommitUrl(String codeChangeCommitUrl) {
        this.codeChangeCommitUrl = codeChangeCommitUrl;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof ServiceImpactDetails)) {
            return false;
        }
        ServiceImpactDetails serviceImpactDetails = (ServiceImpactDetails) o;
        return Objects.equals(id, serviceImpactDetails.id) && Objects.equals(storyNumber, serviceImpactDetails.storyNumber) && Objects.equals(impactedServiceName, serviceImpactDetails.impactedServiceName) && Objects.equals(install, serviceImpactDetails.install) && Objects.equals(restart, serviceImpactDetails.restart) && Objects.equals(cacheClear, serviceImpactDetails.cacheClear) && Objects.equals(dbChange, serviceImpactDetails.dbChange) && Objects.equals(dbChangeCommitUrl, serviceImpactDetails.dbChangeCommitUrl) && Objects.equals(codeChange, serviceImpactDetails.codeChange) && Objects.equals(codeChangeCommitUrl, serviceImpactDetails.codeChangeCommitUrl);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, storyNumber, impactedServiceName, install, restart, cacheClear, dbChange, dbChangeCommitUrl, codeChange, codeChangeCommitUrl);
    }

    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", storyNumber='" + getStoryNumber() + "'" +
            ", impactedServiceName='" + getImpactedServiceName() + "'" +
            ", install='" + isInstall() + "'" +
            ", restart='" + isRestart() + "'" +
            ", cacheClear='" + isCacheClear() + "'" +
            ", dbChange='" + isDbChange() + "'" +
            ", dbChangeCommitUrl='" + getDbChangeCommitUrl() + "'" +
            ", codeChange='" + isCodeChange() + "'" +
            ", codeChangeCommitUrl='" + getCodeChangeCommitUrl() + "'" +
            "}";
    }

}
