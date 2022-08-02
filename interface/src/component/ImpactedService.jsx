import { useEffect, useState } from "react";
import Swal from "sweetalert2";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenNib, faFloppyDisk, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import { domain } from "../constants";

const findBystoryNumber = domain() + "api/impactedService/search/storyNumber?storyNumber="

export default function ImpactedService({ storyNo, setShowSpinner }) {

    const [serviceImpactDetailses, setserviceImpactDetailses] = useState([]);
    const [serviceImpactDetail, setServiceImpactDetail] = useState({

    });
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        loadServiceForStory();
    }, [storyNo])

    function loadServiceForStory() {
        axios.get(findBystoryNumber).then(
            resp => {
                setShowSpinner(false)
                let arr = resp.data._embedded.serviceImpactDetail
                setserviceImpactDetailses(arr)
            },
            err => {
                setShowSpinner(false)
                Swal.fire({
                    title: 'Error!',
                    text: "Error While Fetching data",
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
            }
        )
    }
    function addImpactedService() {
        setShowModal(true)
    }
    let impSvcModal = showModal ? <ImpactedServiceForm setShowModal={setShowModal} serviceImpactDetail={serviceImpactDetail} setserviceImpactDetail={setServiceImpactDetail} /> : ""
    return (
        <div className="card  mt-4">
            <div className="card-header">
                Impacted service  <button className="btn btn-sm btn-success float-end" type="button" onClick={() => addImpactedService()}>
                    <FontAwesomeIcon icon={faPlusCircle} />&nbsp; Add Impacted service</button>
            </div>
            <div className="card-body">
                ImpactedService 
            </div>
            {impSvcModal}
        </div>
    )
}

function ImpactedServiceForm({ serviceImpactDetail, setserviceImpactDetail, setShowModal }) {
    return (
        <div className="modal overlay" >
            <div className="modal-dialog  modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                    <div className="col-md-12">
                    <label htmlFor="storyNumber" className="form-label">Story Number</label>
                    <input type="text" className="form-control" name="storyNumber" value={serviceImpactDetail.storyNumber} readOnly/>
                </div>
                    </div>
                    <div className="modal-body">
                        <ImpactedServiceFormElements serviceImpactDetail={serviceImpactDetail} setserviceImpactDetail={setserviceImpactDetail} />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowModal(false)}>Close</button>
                        <button type="button" className="btn btn-primary btn-sm">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function ImpactedServiceFormElements({ serviceImpactDetail, setserviceImpactDetail }) {

    function handleChange(e) {
        e.preventDefault();
        let data = { ...serviceImpactDetail }
        data[e.target.name] = e.target.value
        setserviceImpactDetail(data)
    }

    return (
        <div>
            <div className="row mb-3">
                <div className="col-md-12">
                    <label htmlFor="impactedServiceName" className="form-label">Impacted Service</label>
                    <select type="text" className="form-select" name="impactedServiceName" onChange={(e) => handleChange(e)} value={serviceImpactDetail.impactedServiceName} >
                        <option></option>
                    </select>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col border p-1">
                    <input class="form-check-input" type="checkbox" value={serviceImpactDetail.install} name="install" />
                    <label class="form-check-label" htmlFor="install">
                        &nbsp;Install
                    </label>
                </div>
                <div className="col border p-1">
                <input class="form-check-input" type="checkbox" value={serviceImpactDetail.restart} name="restart" />
                    <label class="form-check-label" htmlFor="restart">
                        &nbsp;Restart
                    </label>
                </div>
                <div className="col border p-1">
                <input class="form-check-input" type="checkbox" value={serviceImpactDetail.dbChange} name="dbChange" />
                    <label class="form-check-label" htmlFor="dbChange">
                        &nbsp;DB Change
                    </label>
                </div>
                <div className="col border p-1">
                <input class="form-check-input" type="checkbox" value={serviceImpactDetail.cacheClear} name="cacheClear" />
                    <label class="form-check-label" htmlFor="cacheClear">
                        &nbsp;Clear Cache
                    </label>
                </div>
                <div className="col border p-1">
                <input class="form-check-input" type="checkbox" value={serviceImpactDetail.codeChange} name="codeChange" />
                    <label class="form-check-label" htmlFor="codeChange">
                        &nbsp;Code Change
                    </label>
                </div>
            </div>
            <div className="row mb-3">
            <div className="col-md-6">
                    <label htmlFor="storyNumber" className="form-label">dbChangeCommitUrl</label>
                    <input type="text" className="form-control" name="storyNumber" onChange={(e) => handleChange(e)} value={serviceImpactDetail.storyNumber} />
                </div>
               
                <div className="col-md-6">
                    <label htmlFor="impactedServiceName" className="form-label">codeChangeCommitUrl</label>
                    <input type="text" className="form-control" name="impactedServiceName" onChange={(e) => handleChange(e)} value={serviceImpactDetail.impactedServiceName} />
                </div>
            </div>
        </div>
    )
}
/*
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
*/