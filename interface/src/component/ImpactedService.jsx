import { useEffect, useState } from "react";
import Swal from "sweetalert2";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenNib, faFloppyDisk, faPlusCircle, faSpinner, faCheckCircle, faMinusCircle, faClose } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import { domain } from "../constants";

const findBystoryNumber = domain() + "api/impactedService/search/storyNumber?storyNumber="
const groupUrl = domain() + "api/group";
const serviceListUrl = domain() + "api/service/search/byGroup?groupName=";

export default function ImpactedService({ storyNo, setShowSpinner }) {
    const [serviceImpactDetailses, setServiceImpactDetailses] = useState([]);
    const [serviceImpactDetail, setServiceImpactDetail] = useState({
        storyNumber: storyNo,
        impactedServiceName: "",
        install: "",
        restart: false,
        cacheClear: false,
        dbChange: false,
        dbChangeCommitUrl: "",
        codeChange: false,
        codeChangeCommitUrl: ""
    });
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        loadServiceForStory();
    }, [storyNo])

    function loadServiceForStory() {
        setShowSpinner(true)
        axios.get(findBystoryNumber.concat(storyNo)).then(
            resp => {
                let arr = resp.data._embedded.serviceImpactDetailses
                setServiceImpactDetailses(arr)
                setShowSpinner(false)
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
        setServiceImpactDetail({
            storyNumber: storyNo,
            impactedServiceName: "",
            install: "",
            restart: false,
            cacheClear: false,
            dbChange: false,
            dbChangeCommitUrl: "",
            codeChange: false,
            codeChangeCommitUrl: ""
        })
        setShowModal(true)
    }

    let impSvcModal = showModal ? <ImpactedServiceForm setShowModal={setShowModal} serviceImpactDetail={serviceImpactDetail}
        setServiceImpactDetail={setServiceImpactDetail} /> : "";

    function greenOrAmber(bool) {
        if (bool) {
            return <FontAwesomeIcon icon={faCheckCircle} className="txtIcongreen" />
        }
        return <FontAwesomeIcon icon={faMinusCircle} className="txtIconamber" />
    };

    return (
        <div className="card  mt-4">
            <div className="card-header">
                Impacted service  <button className="btn btn-sm btn-success float-end" type="button" onClick={() => addImpactedService()}>
                    <FontAwesomeIcon icon={faPlusCircle} />&nbsp; Add Impacted service</button>
            </div>
            <div className="card-body">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Impacted Service</th>
                            <th scope="col">DB commit Url</th>
                            <th scope="col">Code commit Url</th>
                            <th scope="col">Install</th>
                            <th scope="col">Re-Start</th>
                            <th scope="col">Clear Cache</th>
                            <th scope="col">DB Change</th>
                            <th scope="col">Code Change</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {serviceImpactDetailses.map((svcs, i) => {
                            return (
                                <tr key={i}>
                                    <td>{i}</td>
                                    <td >{svcs.impactedServiceName}</td>
                                    <td >{svcs.dbChangeCommitUrl}</td>
                                    <td >{svcs.codeChangeCommitUrl}</td>
                                    <td >{greenOrAmber(svcs.install)}</td>
                                    <td >{greenOrAmber(svcs.restart)}</td>
                                    <td >{greenOrAmber(svcs.cacheClear)}</td>
                                    <td >{greenOrAmber(svcs.dbChange)}</td>
                                    <td >{greenOrAmber(svcs.codeChange)}</td>
                                    <td >edit</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            {impSvcModal}
        </div>
    )
}

function ImpactedServiceForm({ serviceImpactDetail, setServiceImpactDetail, setShowModal }) {
    const impactedSvcUrl = domain() + "api/impactedService";

    const [showSpin, setShowSpin] = useState(false)
    const [impactedServices, setImpactedServices] = useState([])



    function saveChanges() {
        setShowSpin(true)
        axios.post(impactedSvcUrl, serviceImpactDetail).then(
            resp => {
                setShowSpin(false)
                console.log(resp)
                Swal.fire({
                    title: 'success',
                    text: "Service change created",
                    icon: 'success',
                    confirmButtonText: 'Ok'
                })
            },
            err => {
                setShowSpin(false)
                Swal.fire({
                    title: 'Error!',
                    text: "Error While creating the service change",
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
            }
        )
    }



    let spin = showSpin ? <FontAwesomeIcon icon={faSpinner} className="spinner" /> : ""

    return (
        <div className="modal overlay" >
            <div className="modal-dialog  modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header bg-success">
                        <div className="col-md-12">
                            <label htmlFor="storyNumber" className="form-label">Story Number</label>
                            <input type="text" className="form-control" name="storyNumber" value={serviceImpactDetail.storyNumber} readOnly />
                        </div>
                    </div>
                    <div className="modal-body">
                        {spin}
                        <ImpactedServiceFormElements serviceImpactDetail={serviceImpactDetail} setServiceImpactDetail={setServiceImpactDetail} setShowSpin={setShowSpin} />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}><FontAwesomeIcon icon={faClose} /> &nbsp;Close</button>
                        <button type="button" className="btn btn-primary " onClick={() => saveChanges()}><FontAwesomeIcon icon={faFloppyDisk} /> &nbsp;Save changes </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function ImpactedServiceFormElements({ serviceImpactDetail, setServiceImpactDetail, setShowSpin }) {

    useEffect(() => { loadServiceGroupsList() }, [])

    const [selectedServiceList, setSelectedServiceList] = useState([])
    const [serviceGroups, setServiceGroups] = useState([])
    const [selectedServiceGroupName, setSelectedServiceGroupName] = useState("")


    function handleChange(e) {
        let data = { ...serviceImpactDetail }
        data[e.target.name] = e.target.value
        setServiceImpactDetail(data)
    }

    function handleChangeCkbx(e) {
        let data = { ...serviceImpactDetail }
        data[e.target.name] = e.target.checked
        setServiceImpactDetail(data)
    }

    function inputOnchangeGroupName(e) {
        let selectedServiceGroupName = e.target.value
        setSelectedServiceGroupName(selectedServiceGroupName);
        setShowSpin(true)
        axios.get(serviceListUrl.concat(selectedServiceGroupName)).then(
            resp => {
                // console.log(resp)
                let serviceses = resp.data._embedded.serviceses
                setSelectedServiceList(serviceses)
                setShowSpin(false)
            },
            err => {
                setShowSpin(false)
                Swal.fire({
                    title: 'Error!',
                    text: "Error While getting services for the service group" + selectedServiceGroupName,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })

            }
        )
    }

    function loadServiceGroupsList() {
        setShowSpin(true)
        axios.get(groupUrl).then(
            resp => {
                let serviceGroups = resp.data._embedded.serviceGroups
                setServiceGroups(serviceGroups)
                setShowSpin(false)
            },
            err => {
                setShowSpin(false)
                Swal.fire({
                    title: 'Error!',
                    text: "Error While getting service group list",
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })

            }
        )
    }

    return (
        <div>
            <div className="row mb-3">
                <div className="col-md-12">
                    <label htmlFor="serviceGroup" className="form-label">Service Group</label>
                    <select className="form-select" name="selectedGroup"
                        onChange={(e) => inputOnchangeGroupName(e)} value={selectedServiceGroupName}>
                        <option value=""></option>
                        {
                            serviceGroups.map((grps, i) => <option key={i} value={grps.name}>{grps.name}({grps.portfolioName})</option>)
                        }
                    </select>
                    <label htmlFor="impactedServiceName" className="form-label">Impacted Service</label>
                    <select type="text" className="form-select" name="impactedServiceName" onChange={(e) => handleChange(e)} value={serviceImpactDetail.impactedServiceName} >
                        <option value=""></option>
                        {
                            selectedServiceList.map((lst, i) => <option key={i} value={lst.serviceName}>{lst.serviceName}</option>)
                        }
                    </select>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col border p-1">
                    <input className="form-check-input" type="checkbox" checked={serviceImpactDetail.install} name="install" onChange={(e) => handleChangeCkbx(e)} />
                    <label className="form-check-label" htmlFor="install">
                        &nbsp;Install
                    </label>
                </div>
                <div className="col border p-1">
                    <input className="form-check-input" type="checkbox" checked={serviceImpactDetail.restart} name="restart" onChange={(e) => handleChangeCkbx(e)} />
                    <label className="form-check-label" htmlFor="restart">
                        &nbsp;Restart
                    </label>
                </div>
                <div className="col border p-1">
                    <input className="form-check-input" type="checkbox" checked={serviceImpactDetail.dbChange} name="dbChange" onChange={(e) => handleChangeCkbx(e)} />
                    <label className="form-check-label" htmlFor="dbChange">
                        &nbsp;DB Change
                    </label>
                </div>
                <div className="col border p-1">
                    <input className="form-check-input" type="checkbox" checked={serviceImpactDetail.cacheClear} name="cacheClear" onChange={(e) => handleChangeCkbx(e)} />
                    <label className="form-check-label" htmlFor="cacheClear">
                        &nbsp;Clear Cache
                    </label>
                </div>
                <div className="col border p-1">
                    <input className="form-check-input" type="checkbox" checked={serviceImpactDetail.codeChange} name="codeChange" onChange={(e) => handleChangeCkbx(e)} />
                    <label className="form-check-label" htmlFor="codeChange">
                        &nbsp;Code Change
                    </label>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-md-6">
                    <label htmlFor="dbChangeCommitUrl" className="form-label">dbChangeCommitUrl</label>
                    <input type="text" className="form-control" name="dbChangeCommitUrl" onChange={(e) => handleChange(e)} value={serviceImpactDetail.dbChangeCommitUrl} />
                </div>

                <div className="col-md-6">
                    <label htmlFor="codeChangeCommitUrl" className="form-label">codeChangeCommitUrl</label>
                    <input type="text" className="form-control" name="codeChangeCommitUrl" onChange={(e) => handleChange(e)} value={serviceImpactDetail.codeChangeCommitUrl} />
                </div>
            </div>
        </div>
    )
}
/*
impactedServiceName:"",
install:"",
 restart:"",
 cacheClear:"",
  dbChange:"",
  dbChangeCommitUrl:"",
  codeChange codeChangeCommitUrl:""
*/