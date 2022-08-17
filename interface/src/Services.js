import axios from "axios";
import { Component } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faRefresh, faPlusCircle, faTrash,faPenNib,faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import Spinner from "./component/spinner";
import { domain } from "./constants";

import Swal from 'sweetalert2'

const urlDataLoad = domain() + "api/service/search/byGroup?groupName=";
const groupUrl = domain() + "api/group";

const urlData = domain() + "api/service";

class Services extends Component {

  state = {
    dateList: [],
    filteredDataList: [],
    selectedData: {
      "serviceName": "",
      "serviceDescription": "",
      "codeRepoUrl": "",
      "ciCdPlanUrl": "",
      "Owner": "",
      "groupName": "",
    },
    selectedGroup: "",
    parentDataList: [],
    filter: "",
    showUpdate: false,
    showAdd: false,
    showSpin: false
  }


  componentDidMount() {
    this.loadParentDataList()
  }

  loadDataList(group) {
    this.setState({ showSpin: true })
    axios.get(urlDataLoad.concat(group)).then(
      resp => {
        // console.log(resp)
        let serviceses = resp.data._embedded.serviceses
        this.setState({ dateList: serviceses, filteredDataList: serviceses, showSpin: false })
      },
      err => {

        Swal.fire({
          title: 'Error!',
          text: "Error While getting services for the service group" + group,
          icon: 'error',
          confirmButtonText: 'Ok'
        })
        this.setState({ showSpin: false })
      }
    )
  }

  loadParentDataList() {
    this.setState({ showSpin: true })
    axios.get(groupUrl).then(
      resp => {
        // console.log(resp)
        let serviceGroups = resp.data._embedded.serviceGroups
        this.setState({ parentDataList: serviceGroups, showSpin: false })
      },
      err => {
        Swal.fire({
          title: 'Error!',
          text: "Error While getting service group list",
          icon: 'error',
          confirmButtonText: 'Ok'
        })
        this.setState({ showSpin: false })
      }
    )
  }

  getEdit(url) {
    this.setState({ showSpin: true })
    axios.get(url).then(
      resp => {
        // console.log(resp)
        let serviceses = resp.data
        this.setState({ selectedData: serviceses, showUpdate: true, showAdd: false, showSpin: false })
      },
      err => {
        Swal.fire({
          title: 'Error!',
          text: "Error While getting " + url,
          icon: 'error',
          confirmButtonText: 'Ok'
        })
        this.setState({ showSpin: false })
      }
    )
  }

  delete(url) {
    this.setState({ showSpin: true })
    axios.delete(url).then(
      resp => {
        // console.log(resp)
        this.loadDataList(this.state.selectedGroup);
      },
      err => {
        Swal.fire({
          title: 'Error!',
          text: "Error While deleting",
          icon: 'error',
          confirmButtonText: 'Ok'
        })
        this.setState({ showSpin: false })
      }
    )
  }

  update(url) {
    if (this.state.selectedGroup === "") {
      alert("Please select the Service Group");
      return
    }
    let data = {
      "serviceName": this.state.selectedData.serviceName,
      "serviceDescription": this.state.selectedData.serviceDescription,
      "codeRepoUrl": this.state.selectedData.codeRepoUrl,
      "ciCdPlanUrl": this.state.selectedData.ciCdPlanUrl,
      "owner": this.state.selectedData.owner,
      "groupName": this.state.selectedData.groupName
    }
    this.setState({ showSpin: true })
    axios.patch(url, data).then(
      resp => {
        // console.log(resp)
        this.loadDataList(this.state.selectedGroup);
      },
      err => {
        Swal.fire({
          title: 'Error!',
          text: "Error While updating",
          icon: 'error',
          confirmButtonText: 'Ok'
        })
        this.setState({ showSpin: false })
      }
    )
  }

  new() {
    if (this.state.selectedGroup === "") {
      alert("Please select the Service Group");
      return
    }
    let selectedData = this.state.selectedData
    selectedData['serviceName'] = "";
    selectedData['serviceDescription'] = "";
    selectedData['codeRepoUrl'] = "";
    selectedData['ciCdPlanUrl'] = "";
    selectedData['owner'] = "";
    this.setState({ selectedData: selectedData, showAdd: true, showUpdate: false })
  }

  add() {
    if (this.state.selectedGroup === "") {
      alert("Please select the Service Group");
      return
    }
    if (this.state.selectedData.serviceName === "") {
      alert("serviceName is empty");
      return
    }
    let data = {
      "serviceName": this.state.selectedData.serviceName,
      "serviceDescription": this.state.selectedData.serviceDescription,
      "codeRepoUrl": this.state.selectedData.codeRepoUrl,
      "ciCdPlanUrl": this.state.selectedData.ciCdPlanUrl,
      "owner": this.state.selectedData.owner,
      "groupName": this.state.selectedData.groupName
    }
    // console.log(this.state.selectedData)
    // console.log(data)
    this.setState({ showSpin: true })
    axios.post(urlData, data).then(
      resp => {
        // console.log(resp)
        this.setState({ showSpin: false })
        this.loadDataList(this.state.selectedGroup);
      },
      err => {
        Swal.fire({
          title: 'Error!',
          text: "Error While adding",
          icon: 'error',
          confirmButtonText: 'Ok'
        })
        this.setState({ showSpin: false })
      }
    )
  }

  filter(e) {
    if (this.state.filteredDataList) {
      let filteredData = this.state.dateList.filter(data => data.serviceName.includes(e.target.value))
      // console.log(filteredData)
      this.setState({ filter: e.target.value, filteredDataList: filteredData })
    }
  }

  inputOnchange(e) {
    let selectedData = this.state.selectedData
    selectedData[e.target.name] = e.target.value
    // console.log(selectedData)
    this.setState({ selectedData: selectedData })
  }


  inputOnchangeGroupName(e) {
    let selectedData = this.state.selectedData
    selectedData['groupName'] = e.target.value
    this.setState({ selectedGroup: e.target.value, selectedData: selectedData })
    this.loadDataList(e.target.value)
  }

  render() {
    let trData = this.state.filteredDataList ? this.state.filteredDataList.map((data, i) => {
      return (
        <tr key={i}>
          <th> {i}</th>
          <td>{data.serviceName}</td>
          <td><div class="btn-group" role="group" aria-label="Basic example"><button className="btn btn-success btn-sm" onClick={() => this.getEdit(data._links.self.href)}>
            <FontAwesomeIcon icon={faPencil} /></button>
            <button className="btn btn-danger btn-sm" onClick={() => this.delete(data._links.self.href)}>
              <FontAwesomeIcon icon={faTrash} /></button>
              </div>
          </td>
        </tr>
      )
    }) : null

    let updateOrAdd = () => {
      if (this.state.showUpdate) {
        return (
          <button type="submit" className="btn btn-primary"
            onClick={() => this.update(this.state.selectedData._links.self.href)}>
           <FontAwesomeIcon icon={faPenNib} /> &nbsp; Update
          </button>
        )
      } else if (this.state.showAdd) {
        return (
          <button type="submit" className="btn btn-primary"
            onClick={() => this.add()}>
           <FontAwesomeIcon icon={faFloppyDisk} /> &nbsp; Add
          </button>
        )
      }
    }
    let spinner = () => {
      if (this.state.showSpin) {
        return (<Spinner />)
      }
    }

    let Option = this.state.parentDataList ? this.state.parentDataList.map((data, i) => <option key={i} value={data.name}>{data.name}</option>) : null;
    return (
      <div>
        {spinner()}
        <h3>Services</h3>
        <div className="row">
          <div className="col-4">
            <div className="card ">
              <div className="card-header">
                <p>List of Services for Servcie Group</p>
                <select className="form-select" name="selectedGroup"
                  onChange={(e) => this.inputOnchangeGroupName(e)} value={this.state.selectedGroup}>
                  <option value=""></option>{Option}
                </select>
              </div>
              <div className="card-body">
                <div className="card-title">
                  <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="filter" value={this.state.filter} onChange={(e) => this.filter(e)} />
                  </div>
                </div>
                <div className="scroller">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Service Name</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {trData}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="col-8">
            <div className="card ">
              <div className="card-header">
                <button className="btn btn-sm btn-warning" onClick={() => this.new()} ><FontAwesomeIcon icon={faPlusCircle} /> &nbsp; Add New Service</button>
              </div>
              <div className="card-body">
                <div className="mb-2">
                  <label htmlFor="serviceName" className="form-label">Service Name</label>
                  <input type="text" className="form-control" name="serviceName"
                    value={this.state.selectedData.serviceName} onChange={(e) => this.inputOnchange(e)} />
                  <div id="name" className="form-text">Please enter the Service name</div>
                </div>
                <div className="mb-2">
                  <label htmlFor="serviceDescription" className="form-label">Service Description</label>
                  <input type="text" className="form-control" name="serviceDescription"
                    value={this.state.selectedData.serviceDescription} onChange={(e) => this.inputOnchange(e)} />
                  <div id="name" className="form-text">Please enter the Service Description</div>
                </div>
                <div className="mb-2">
                  <label htmlFor="codeRepoUrl" className="form-label">Code repository </label>
                  <input type="text" className="form-control" name="codeRepoUrl"
                    value={this.state.selectedData.codeRepoUrl} onChange={(e) => this.inputOnchange(e)} />
                  <div id="name" className="form-text">Url for your code base</div>
                </div>
                <div className="mb-2">
                  <label htmlFor="ciCdPlanUrl" className="form-label">Continues Integration and Deployment</label>
                  <input type="text" className="form-control" name="ciCdPlanUrl"
                    value={this.state.selectedData.ciCdPlanUrl} onChange={(e) => this.inputOnchange(e)} />
                  <div id="name" className="form-text">Url for your CI/CD pipeline</div>
                </div>
                <div className="mb-2">
                  <label htmlFor="owner" className="form-label">Owner</label>
                  <input type="text" className="form-control" name="owner"
                    value={this.state.selectedData.owner} onChange={(e) => this.inputOnchange(e)} />
                  <div id="name" className="form-text">Please enter the Service Owner</div>
                </div>
                <div className="mb-2">
                  <label htmlFor="groupName" className="form-label">Service Group Name</label>
                  <input type="text" className="form-control" name="groupName"
                    value={this.state.selectedData.groupName} readOnly />
                  <div id="name" className="form-text">Please enter the Service name</div>
                </div>
                {updateOrAdd()}
              </div>
            </div>
          </div>
        </div>

      </div>

    );
  }
}

export default Services;
