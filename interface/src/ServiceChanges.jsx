import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";

import Spinner from "./component/spinner";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faRefresh, faPlusCircle, faTrash, faPenNib, faFloppyDisk, faSearch, faEdit } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import { domain } from "./constants";

const serviceChangeRequestUrl=domain() + "api/serviceChangeRequest";
const serviceChangeRequestByStoryNo=domain()+"api/serviceChangeRequest/search/byStoryNumber?storyNumber=";
const serviceChangeRequestByFeatureNo=domain()+"api/serviceChangeRequest/search/byFeatureNumber?featureNumber=";

export default function ServiceChanges() {
    const [showSpinner, setShowSpinner] = useState(false);
    const [selectedSvcData, setSelectedSvcData] = useState({
        storyNumber: "",
        featureNumber: "",
        epicNumber: "",
        storyLink: "",
        storyDescription: "",
        targetReleaseNumber: "",
        targetReleaseDate: "",
    });

    const [newOrEdit, setNewOrEdit] = useState("");
    const filter = useRef()
    const [searchSelect,setSearchSelect]=useState("story");
    const [searchInput,setSearchInput]=useState("")
    const [searchResult,setSearchResult]=useState([]);

    useEffect(() => {
    })

    function newSvcChange() {
        setSelectedSvcData({
            storyNumber: "",
            featureNumber: "",
            epicNumber: "",
            storyLink: "",
            storyDescription: "",
            targetReleaseNumber: "",
            targetReleaseDate: "",
        })
        setNewOrEdit('new')
    }

    function search(){
        setShowSpinner(true)
        let url=serviceChangeRequestByStoryNo.concat(searchInput)
        if(searchSelect==="story"){
            url=serviceChangeRequestByStoryNo.concat(searchInput)
        }else if(searchSelect==="feature"){
            url=serviceChangeRequestByFeatureNo.concat(searchInput)
        }
        
        axios.get(url).then(
            resp => {
                setShowSpinner(false)
                let arr=resp.data._embedded.serviceChangeRequests
                setSearchResult(arr)
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

    function edit(herf){
        axios.get(herf).then(
            resp => {
                setShowSpinner(false)
                let arr=resp.data
                setSelectedSvcData(arr)
                setNewOrEdit("update")
            },
            err => {
                setShowSpinner(false)
                Swal.fire({
                title: 'Error!',
                text: "Error While editing data",
                icon: 'error',
                confirmButtonText: 'Ok'
                })
            }
        )
    }

    return (
        <div>
            <ShowSpin showSpinner={showSpinner} />
            <h3>Service Changes</h3>
            <div className="row">
                <div className="col-4">
                    <div className="card text-light bg-info ">
                        <div className="card-header">
                            Search
                        </div>
                        <div className="card-body">
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="story or feature" value={searchInput}  onChange={(e)=>setSearchInput(e.target.value)}/>
                                <select className="form-select" aria-label="Default select example" value={searchSelect} onChange={(e)=>setSearchSelect(e.target.value)}>
                                    <option value="story">Story</option>
                                    <option value="feature">Feature</option>
                                </select>
                                <button className="btn btn-warning" type="button" onClick={()=>search()}><FontAwesomeIcon icon={faSearch} />&nbsp; Search</button>
                            </div>
                            <div>
                                <div class="list-group">
                                        {searchResult.map(res=>{
                                            return(
                                                <a className="list-group-item list-group-item-action" style={{cursor:"pointer"}}
                                                onClick={()=>edit(res._links.self.href)}>{res.storyNumber}</a>
                                            );
                                        })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-8">
                    <div className="card ">
                        <div className="card-header">
                            Service Changes <button className="btn btn-sm btn-success float-end" type="button" onClick={() => newSvcChange()}>
                                <FontAwesomeIcon icon={faPlusCircle} />&nbsp; New SC</button>
                        </div>
                        <div className="card-body">
                            <DisplaySvcChange selectedSvcData={selectedSvcData} setSelectedSvcData={setSelectedSvcData} newOrEdit={newOrEdit} setShowSpinner={setShowSpinner} />
                        </div>
                    </div>
                    <div className="card  mt-4">
                        <div className="card-header">
                            Impacted service  <button className="btn btn-sm btn-success float-end" type="button" onClick={() => newSvcChange()}>
                                <FontAwesomeIcon icon={faPlusCircle} />&nbsp; Add Impacted service</button>
                        </div>
                        <div className="card-body">
                            Impacted service
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

function ShowSpin({ showSpinner }) {
    if (showSpinner) {
        return (<Spinner />)
    }
}

function DisplaySvcChange({ selectedSvcData, setSelectedSvcData, newOrEdit,setShowSpinner }) {

    function handleChange(e) {
        e.preventDefault();
        let data = { ...selectedSvcData }
        data[e.target.name] = e.target.value
        setSelectedSvcData(data)
    }

    function add() {
        setShowSpinner(true)
        axios.post(serviceChangeRequestUrl,selectedSvcData).then(
            resp => {
                setShowSpinner(false)
                console.log(resp)
                Swal.fire({
                    title: 'success',
                    text: "Service change created",
                    icon: 'success',
                    confirmButtonText: 'Ok'
                    })
            },
            err => {
                setShowSpinner(false)
                Swal.fire({
                title: 'Error!',
                text: "Error While creating the service change",
                icon: 'error',
                confirmButtonText: 'Ok'
                })
                
            }
        )
    }
    function update() {
        Swal.fire({
            title: 'Information',
            text: "Updating the data",
            icon: 'info',
            confirmButtonText: 'Ok'
        })
    }
    let nre = (newOrEdit === 'new') ? <button type="button" className="btn btn-primary" onClick={() => add()}>
        <FontAwesomeIcon icon={faFloppyDisk} />&nbsp; Add</button> : 
        (newOrEdit === 'update') ? <button type="button" className="btn btn-primary" onClick={() => update()}>
            <FontAwesomeIcon icon={faPenNib} />&nbsp; Update</button> : null

    return (
        <div>
            <div className="row mb-3">
                <div className="col-md-4">
                    <label htmlFor="storyNumber" className="form-label">Story Number</label>
                    <input type="text" className="form-control" name="storyNumber" onChange={(e) => handleChange(e)} value={selectedSvcData.storyNumber} />
                </div>
                <div className="col-md-4">
                    <label htmlFor="featureNumber" className="form-label">Feature Number</label>
                    <input type="text" className="form-control" name="featureNumber" onChange={(e) => handleChange(e)} value={selectedSvcData.featureNumber} />
                </div>
                <div className="col-md-4">
                    <label htmlFor="epicNumber" className="form-label">Epic Number</label>
                    <input type="text" className="form-control" name="epicNumber" onChange={(e) => handleChange(e)} value={selectedSvcData.epicNumber} />
                </div>
            </div>
            <div className="row mb-2">
                <div className="col-md-4">
                    <label htmlFor="storyLink" className="form-label">Story Link</label>
                    <input type="text" className="form-control" name="storyLink" onChange={(e) => handleChange(e)} value={selectedSvcData.storyLink} />
                </div>
                <div className="col-md-4">
                    <label htmlFor="storyDescription" className="form-label">Story Description</label>
                    <input type="text" className="form-control" name="storyDescription" onChange={(e) => handleChange(e)} value={selectedSvcData.storyDescription} />
                </div>
                <div className="col-md-4">
                    <label htmlFor="targetReleaseNumber" className="form-label">Target Release Number</label>
                    <input type="text" className="form-control" name="targetReleaseNumber" onChange={(e) => handleChange(e)} value={selectedSvcData.targetReleaseNumber} />
                </div>
            </div>
            <div className="row mb-2">
                <div className="col-md-4">
                    <label htmlFor="targetReleaseDate" className="form-label">Target Release Date</label>
                    <input type="text" className="form-control" name="targetReleaseDate" onChange={(e) => handleChange(e)} value={selectedSvcData.targetReleaseDate} />
                </div>
                <div className="col-md-8 pt-4 mt-2 float-end">
                    {nre}
                </div>
            </div>



        </div>
    )
    /*
     storyNumber: "",
     featureNumber: "",
     epicNumber: "",
     storyLink: "",
     storyDescription: "",
     targetReleaseNumber: "",
     targetReleaseDate: "",
     */
}
