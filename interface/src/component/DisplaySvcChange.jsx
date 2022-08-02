import Swal from "sweetalert2";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenNib, faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import { domain } from "../constants";

const serviceChangeRequestUrl=domain() + "api/serviceChangeRequest";

export default function DisplaySvcChange({ selectedSvcData, setSelectedSvcData, newOrEdit,setShowSpinner }) {

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

    function update(url) {
        setShowSpinner(true)
        axios.patch(url,selectedSvcData).then(
            resp => {
                setShowSpinner(false)
                console.log(resp)
                Swal.fire({
                    title: 'success',
                    text: "Service change updated",
                    icon: 'success',
                    confirmButtonText: 'Ok'
                    })
            },
            err => {
                setShowSpinner(false)
                Swal.fire({
                title: 'Error!',
                text: "Error While update the service change",
                icon: 'error',
                confirmButtonText: 'Ok'
                })
                
            }
        )
    }
    
    const nre = (newOrEdit === 'new') ? <button type="button" className="btn btn-primary" onClick={() => add()}>
        <FontAwesomeIcon icon={faFloppyDisk} />&nbsp; Add</button> : 
        (newOrEdit === 'update') ? <button type="button" className="btn btn-primary" onClick={() => update(selectedSvcData._links.self.href)}>
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
}