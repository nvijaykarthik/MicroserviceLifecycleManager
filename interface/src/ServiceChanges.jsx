import { useState } from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";

import Spinner from "./component/spinner";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlusCircle,  faSearch } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import { domain } from "./constants";
import DisplaySvcChange from "./component/DisplaySvcChange";
import ImpactedService from "./component/ImpactedService";

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
        _links: {
            self: {
              href: ""
            },
            serviceChangeRequest: {
              href: ""
            }
        }
    });

    const [newOrEdit, setNewOrEdit] = useState("");
    const [searchSelect,setSearchSelect]=useState("story");
    const [searchInput,setSearchInput]=useState("")
    const [searchResult,setSearchResult]=useState([]);

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
                                <input type="text" className="form-control" placeholder="story or feature" value={searchInput}  
                                onChange={(e)=>setSearchInput(e.target.value)}/>
                                <select className="form-select" aria-label="Default select example" value={searchSelect} 
                                onChange={(e)=>setSearchSelect(e.target.value)}>
                                    <option value="story">Story</option>
                                    <option value="feature">Feature</option>
                                </select>
                                <button className="btn btn-warning" type="button" onClick={()=>search()}>
                                    <FontAwesomeIcon icon={faSearch} />&nbsp; Search</button>
                            </div>
                            <div>
                                <div className="list-group">
                                        {searchResult.map((res,i)=>{
                                            return(
                                                <button key={i} className="list-group-item list-group-item-action" style={{cursor:"pointer"}}
                                                onClick={()=>edit(res._links.self.href)}>{res.storyNumber}</button>
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
                            Service Changes <button className="btn btn-sm btn-secondary float-end" type="button" onClick={() => newSvcChange()}>
                                <FontAwesomeIcon icon={faPlusCircle} />&nbsp; New SC</button>
                        </div>
                        <div className="card-body">
                            <DisplaySvcChange selectedSvcData={selectedSvcData} setSelectedSvcData={setSelectedSvcData} 
                            newOrEdit={newOrEdit} setShowSpinner={setShowSpinner} setNewOrEdit={setNewOrEdit}
                            setSearchInput={setSearchInput} setSearchSelect={setSearchSelect} search={search}/>
                        </div>
                    </div>
                    {newOrEdit==="update"?<ImpactedService storyNo={selectedSvcData.storyNumber} setShowSpinner={setShowSpinner}/>:""}
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


