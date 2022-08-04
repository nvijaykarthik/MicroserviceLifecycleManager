import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { DisplaySearchResults } from './DisplaySearchResults'
import { domain } from "../../constants";

export const SearchByRelease = () => {
    const [showSpinner, setShowSpinner] = useState(false);
    const [releaseDates, setReleaseDates] = useState([])
    const [serviceGroups, setServiceGroups] = useState([])
    const [serviceImpactDetailsList, setServiceImpactDetailsList] = useState([])
    const [impactedServiceName, setImpactedServiceName] = useState('')
    const [targetReleaseDate, setTargetReleaseDate] = useState('')

    const searchByReleaseDateAndServiceGroup = () => {
        const searchByReleaseServiceGroupUrl=domain()+`api/impactedService/serviceNameAndReleaseDate?impactedServiceName=${impactedServiceName}&targetReleaseDate=${targetReleaseDate}`;
        setShowSpinner(true)
        axios.get(searchByReleaseServiceGroupUrl).then(
            resp => {
                let arr = resp.data._embedded.serviceImpactDetailses
                setServiceImpactDetailsList(arr)
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

    const getReleaseDates = () => {
       //setShowSpinner(true)
    }

    const getServiceGroups = () => {
        //setShowSpinner(true)
    }

    /* useEffect(() => {
        getReleaseDates()
        setReleaseDates(releaseDates.toArray())
      }, [releaseDates])

    useEffect(() => {
        getServiceGroups()
        setServiceGroups(serviceGroups.toArray())
      }, [serviceGroups]) */

    return (
        <>
            <div className="row mb-3">
                <div className="col-md-4">
                    <label htmlFor="releaseDate" className="form-label">Select Release Date</label>
                    <input class="form-control" name="targetReleaseDate" list="datalistOptions" id="exampleDataList" placeholder="Type to search..." />
                    <datalist id="datalistOptions">
                        <option value="San Francisco">San Francisco</option>
                        <option value="New York">New York</option>
                        <option value="Seattle">Seattle</option>
                        <option value="Los Angeles"></option>
                        <option value="Chicago">Chicago</option>
                    </datalist>
                </div>
                <div className="col-md-4">
                    <label htmlFor="serviceGroup" className="form-label">Select Service Group</label>
                    <input class="form-control" name="impactedServiceName" list="datalistOptions" id="exampleDataList" placeholder="Type to search..." />
                    <datalist id="datalistOptions">
                        <option value="San Francisco">San Francisco</option>
                        <option value="New York">New York</option>
                        <option value="Seattle">Seattle</option>
                        <option value="Los Angeles">Los Angeles</option>
                        <option value="Chicago">Chicago</option>
                    </datalist>
                </div>
                <div className="col-md-4">
                    <div className="p-4">
                        <button type="button" className="btn btn-primary float-start" onClick={() => searchByReleaseDateAndServiceGroup()}>
                            <FontAwesomeIcon icon={faSearch} />&nbsp; Search
                        </button>
                    </div>
                </div>
            </div>
            <DisplaySearchResults serviceImpactDetailsList={serviceImpactDetailsList}></DisplaySearchResults>
        </>
    )
}