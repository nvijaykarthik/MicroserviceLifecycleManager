import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";

import Spinner from "./component/spinner";

export default function ServiceChanges() {
    const [showSpinner, setShowSpinner] = useState(false);
    const [selectedSvcData, setSelectedSvcData] = useState({
        storyNumber: "First Story",
        featureNumber: "",
        epicNumber: "",
        storyLink: "",
        storyDescription: "",
        targetReleaseNumber: "",
        targetReleaseDate: "",
    });

    const [newOrEdit, setNewOrEdit] = useState("");
    const filter = useRef()

    useEffect(() => {

    })

    function spin() {
        alert(filter.current.value);
    }

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


    return (
        <div>
            <ShowSpin showSpinner={showSpinner} />
            <h3>Service Changes</h3>
            <div className="row">
                <div className="col-4">
                    <div className="card text-light bg-info shadow">
                        <div className="card-header">
                            Search
                        </div>
                        <div className="card-body">
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="story or feature"/>
                                <select class="form-select" aria-label="Default select example">
                                <option value="story">Story</option>
                                <option value="feature">Feature</option>
                                </select>
                                <button className="btn btn-warning" type="button">Search</button>
                            </div>
                       
                        </div>
                    </div>
                </div>

                <div className="col-4">
                    <div className="card shadow">
                        <div className="card-header">
                        <button className="btn btn-success" type="button" onClick={()=>newSvcChange()}>New SC</button>  Service Changes  
                        </div>
                        <div className="card-body">
                            <DisplaySvcChange selectedSvcData={selectedSvcData} setSelectedSvcData={setSelectedSvcData} newOrEdit={newOrEdit} />
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    Impacted service
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

function DisplaySvcChange({ selectedSvcData, setSelectedSvcData, newOrEdit }) {

    function handleChange(e) {
        e.preventDefault();
        let data = { ...selectedSvcData }
        data[e.target.name] = e.target.value
        setSelectedSvcData(data)
    }

    function add() {
        Swal.fire({
            title: 'Information',
            text: "Adding the data",
            icon: 'info',
            confirmButtonText: 'Ok'
        })
    }
    function update() {
        Swal.fire({
            title: 'Information',
            text: "Updating the data",
            icon: 'info',
            confirmButtonText: 'Ok'
        })
    }
    let nre = (newOrEdit === 'new') ? <button type="button" className="btn btn-primary" onClick={() => add()}>Add</button> :
        <button type="button" className="btn btn-primary" onClick={() => update()}>Update</button>

    return (
        <div>
            <div className="mb-2">
                <label htmlFor="storyNumber" className="form-label">Story Number</label>
                <input type="text" className="form-control" name="storyNumber" onChange={(e) => handleChange(e)} value={selectedSvcData.storyNumber} />
                <div name="storyNumber" className="form-text">Please enter Story Number</div>
            </div>
            <div className="mb-2">
                <label htmlFor="featureNumber" className="form-label">Feature Number</label>
                <input type="text" className="form-control" name="featureNumber" onChange={(e) => handleChange(e)} value={selectedSvcData.featureNumber} />
                <div name="featureNumber" className="form-text">Please enter Feature Number</div>
            </div>
            <div className="mb-2">
                <label htmlFor="epicNumber" className="form-label">Epic Number</label>
                <input type="text" className="form-control" name="epicNumber" onChange={(e) => handleChange(e)} value={selectedSvcData.epicNumber} />
                <div name="epicNumber" className="form-text">Please enter Epic Number</div>
            </div>
            <div className="mb-2">
                <label htmlFor="storyLink" className="form-label">Story Link</label>
                <input type="text" className="form-control" name="storyLink" onChange={(e) => handleChange(e)} value={selectedSvcData.storyLink} />
                <div name="storyLink" className="form-text">Please enter Story link</div>
            </div>
            <div className="mb-2">
                <label htmlFor="storyDescription" className="form-label">Story Description</label>
                <input type="text" className="form-control" name="storyDescription" onChange={(e) => handleChange(e)} value={selectedSvcData.storyDescription} />
                <div name="storyDescription" className="form-text">Please enter Story Description</div>
            </div>
            <div className="mb-2">
                <label htmlFor="targetReleaseNumber" className="form-label">Target Release Number</label>
                <input type="text" className="form-control" name="targetReleaseNumber" onChange={(e) => handleChange(e)} value={selectedSvcData.targetReleaseNumber} />
                <div name="targetReleaseNumber" className="form-text">Please enter Target Release Number</div>
            </div>
            <div className="mb-2">
                <label htmlFor="targetReleaseDate" className="form-label">Target Release Date</label>
                <input type="text" className="form-control" name="targetReleaseDate" onChange={(e) => handleChange(e)} value={selectedSvcData.targetReleaseDate} />
                <div name="targetReleaseDate" className="form-text">Please enter Target Release Date</div>
            </div>
            <div className="col-12">
                {nre}
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
