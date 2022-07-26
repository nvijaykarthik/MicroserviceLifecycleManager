import axios from "axios";
import { Component } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faRefresh, faPlusCircle, faTrash,faPenNib,faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import Spinner from "./component/spinner";
import { domain } from "./constants";
import Swal from 'sweetalert2'

const urlData = domain() + "api/group";
const portfolioUrl = domain() + "api/portfolio";

class ServiceGroup extends Component {

  state = {
    dateList: [],
    filteredDataList: [],
    selectedData: {
      name: "",
      portfolioName: ""
    },
    parentDataList: [],
    filter: "",
    showUpdate: false,
    showAdd: false,
    showSpin: false
  }


  componentDidMount() {
    this.loadDataList()
    this.loadParentDataList()
  }

  loadDataList() {
    this.setState({ showSpin: true })
    axios.get(urlData).then(
      resp => {
        // console.log(resp)
        let serviceGroups = resp.data._embedded.serviceGroups
        this.setState({ dateList: serviceGroups, filteredDataList: serviceGroups, showSpin: false })
      },
      err => {
        Swal.fire({
          title: 'Error!',
          text: "Error While getting service group",
          icon: 'error',
          confirmButtonText: 'Ok'
        })
        this.setState({ showSpin: false })
      }
    )
  }

  loadParentDataList() {
    this.setState({ showSpin: true })
    axios.get(portfolioUrl).then(
      resp => {
        // console.log(resp)
        let portfolios = resp.data._embedded.portfolios
        this.setState({ parentDataList: portfolios, showSpin: false })
      },
      err => {
        Swal.fire({
          title: 'Error!',
          text: "Error While getting portfolio list",
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
        let portFolio = resp.data
        this.setState({ selectedData: portFolio, showUpdate: true, showAdd: false, showSpin: false })
      },
      err => {
        Swal.fire({
          title: 'Error!',
          text: "Error While getting" + url,
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
        this.loadDataList();
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
    let data = {
      "name": this.state.selectedData.name,
      "portfolioName": this.state.selectedData.portfolioName
    }
    this.setState({ showSpin: true })
    axios.patch(url, data).then(
      resp => {
        // console.log(resp)
        this.loadDataList();
      },
      err => {
        Swal.fire({
          title: 'Error!',
          text: "Error While Updating",
          icon: 'error',
          confirmButtonText: 'Ok'
        })
        this.setState({ showSpin: false })
      }
    )
  }

  new() {
    let selectedData = this.state.selectedData
    selectedData['name'] = ""
    selectedData['portfolioName'] = ""
    this.setState({ selectedData: selectedData, showAdd: true, showUpdate: false })
  }

  add() {
    if (this.state.selectedData.name === "") {
      alert("Name is empty");
      return
    }
    let data = {
      "name": this.state.selectedData.name,
      "portfolioName": this.state.selectedData.portfolioName
    }
    this.setState({ showSpin: true })
    axios.post(urlData, data).then(
      resp => {
        // console.log(resp)
        this.loadDataList();
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
      let filteredData = this.state.dateList.filter(data => data.name.includes(e.target.value))
      // console.log(filteredData)
      this.setState({ filter: e.target.value, filteredDataList: filteredData })
    }

  }
  inputOnchange(e) {
    let selectedData = this.state.selectedData
    selectedData['name'] = e.target.value
    this.setState({ selectedData: selectedData })
  }

  inputOnchangePortfolioName(e) {
    let selectedData = this.state.selectedData
    selectedData['portfolioName'] = e.target.value
    this.setState({ selectedData: selectedData })
  }


  render() {
    let trData = this.state.filteredDataList ? this.state.filteredDataList.map((data, i) => {
      return (
        <tr key={i}>
          <th> {i}</th>
          <td>{data.name}</td>
          <td>{data.portfolioName}</td>
          <td><div class="btn-group" role="group" aria-label="Basic example"><button className="btn btn-success btn-sm" onClick={() => this.getEdit(data._links.self.href)}>
            <FontAwesomeIcon icon={faPencil} /></button>
            <button className="btn btn-danger btn-sm" onClick={() => this.delete(data._links.self.href)}>
              <FontAwesomeIcon icon={faTrash} /></button></div>
          </td>
        </tr>
      )
    }) : null

    let updateOrAdd = () => {
      if (this.state.showUpdate) {
        return (
          <button type="submit" className="btn btn-primary"
            onClick={() => this.update(this.state.selectedData._links.self.href)}>
            <FontAwesomeIcon icon={faPenNib} /> &nbsp;Update
          </button>
        )
      } else if (this.state.showAdd) {
        return (
          <button type="submit" className="btn btn-primary"
            onClick={() => this.add()}>
            <FontAwesomeIcon icon={faFloppyDisk} /> &nbsp;Add
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
        <h3>Service Group</h3>
        <div className="row">
          <div className="col-4">
            <div className="card ">
              <div className="card-header">
                <p>List of Service Group
                  <button className="btn btn-sm btn-secondary float-end mt-2"
                    onClick={() => this.loadDataList()}><FontAwesomeIcon icon={faRefresh} /></button>
                </p>
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
                        <th scope="col">Group Name</th>
                        <th scope="col">Portfolio Name</th>
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
                <button className="btn btn-sm btn-warning" onClick={() => this.new()} ><FontAwesomeIcon icon={faPlusCircle} /> &nbsp; Add New</button>
              </div>
              <div className="card-body">
                <div className="mb-2">
                  <label htmlFor="Group name" className="form-label">Group Name</label>
                  <input type="text" className="form-control" id="name" aria-describedby="name" name="selectedData.name"
                    value={this.state.selectedData.name} onChange={(e) => this.inputOnchange(e)} />
                  <div id="name" className="form-text">Please enter the Service Group name</div>
                </div>
                <div className="mb-2">
                  <label htmlFor="portfolio name" className="form-label">Portfolio name</label>
                  <select className="form-select" id="portfolioName" aria-describedby="portfolioName" name="selectedData.portfolioName"
                    onChange={(e) => this.inputOnchangePortfolioName(e)} value={this.state.selectedData.portfolioName}>
                    {Option}
                  </select>
                  <div id="name" className="form-text">Please Select the Portfolio name</div>
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

export default ServiceGroup;
