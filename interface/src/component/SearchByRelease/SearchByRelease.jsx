import { useCallback, useEffect, useState } from "react";
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
    const [groupName, setGroupName] = useState('')
    const [targetReleaseDate, setTargetReleaseDate] = useState('')

    const searchByReleaseDateAndServiceGroup = () => {
        const searchByReleaseServiceGroupUrl=domain()+`api/impactedService/search/serviceNameAndReleaseDate?groupName=${groupName}&targetReleaseDate=${targetReleaseDate}`;
        setShowSpinner(true)
        axios.get(searchByReleaseServiceGroupUrl).then(
            resp => {
                setServiceImpactDetailsList(resp.data._embedded.serviceImpactDetailses)
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

    const preparereleaseDates = data => [...new Set(data.map(a => a.targetReleaseDate))]

    const getReleaseDates = useCallback(() => {
        const getAllReleaseDatesUrl=domain()+`api/serviceChangeRequest/`;
        setShowSpinner(true)
        axios.get(getAllReleaseDatesUrl).then(
            resp => {
                setReleaseDates(preparereleaseDates(resp.data._embedded.serviceChangeRequests))
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
    },[])

    const prepareServiceGroupNames = data => [...new Set(data.map(a => a.name))]

    const getServiceGroups = useCallback(() => {
        const getAllServiceGroupsUrl=domain()+`api/group/`;
        setShowSpinner(true)
        axios.get(getAllServiceGroupsUrl).then(
            resp => {
                setServiceGroups(prepareServiceGroupNames(resp.data._embedded.serviceGroups))
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
    },[])

    useEffect(() => {
        getReleaseDates()
        getServiceGroups()
      }, [getReleaseDates, getServiceGroups])

    return (
        <>
            <div className="row mb-3">
                <div className="col-md-4">
                    <label htmlFor="targetReleaseDate" className="form-label">Select Release Date</label>
                    <input className="form-control" name="targetReleaseDate" list="datalistOptions" id="targetReleaseDate" placeholder="Type to search..." 
                    value={targetReleaseDate} onInput={e => setTargetReleaseDate(e.target.value)} />
                    <datalist id="datalistOptions">
                    {releaseDates?.map(date => (
                      <option
                        value={date}
                        key={date}
                      >{date}</option>
                    ))}
                    </datalist>
                </div>
                <div className="col-md-4">
                    <label htmlFor="groupName" className="form-label">Select Service Group</label>
                    <input className="form-control" name="groupName" list="serviceGroupOptions" id="groupName" placeholder="Type to search..." 
                     value={groupName} onInput={e => setGroupName(e.target.value)} />
                    <datalist id="serviceGroupOptions">
                    {serviceGroups?.map(group => (
                      <option
                        value={group}
                        key={group}
                      >{group}</option>
                    ))}
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
            <DisplaySearchResults serviceImpactDetailsList={serviceImpactDetailsList} showSpinner={showSpinner}></DisplaySearchResults>
        </>
    )
}