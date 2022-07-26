import axios from "axios";
import { Component } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faRefresh, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons'
import Spinner from "./component/spinner";
import { domain } from "./constants";

const urlData = domain()+"api/portfolio";

class Portfolio extends Component {

  state = {
    dateList: [],
    filteredDataList: [],
    selectedData: {
      name: ""
    },
    filter: "",
    showUpdate: false,
    showAdd: false,
    showSpin: false
  }

  componentDidMount() {
    this.loadDataList()
  }

  loadDataList() {
    this.setState({ showSpin: true })
    axios.get(urlData).then(
      resp => {
        console.log(resp)
        let portfolios = resp.data._embedded.portfolios
        this.setState({ dateList: portfolios, filteredDataList: portfolios, showSpin: false })
      },
      err => {
        alert("Error While getting portfolio list")
        this.setState({ showSpin: false })
      }
    )
  }

  getEdit(url) {
    this.setState({ showSpin: true })
    axios.get(url).then(
      resp => {
        console.log(resp)
        let portFolio = resp.data
        this.setState({ selectedData: portFolio, showUpdate: true, showAdd: false, showSpin: false })
      },
      err => {
        alert("Error While getting data for"+url)
        this.setState({ showSpin: false })
      }
    )
  }

  delete(url) {
    this.setState({ showSpin: true })
    axios.delete(url).then(
      resp => {
        console.log(resp)
        this.loadDataList();
      },
      err => {
        alert("Error While deleting")
        this.setState({ showSpin: false })
      }
    )
  }

  update(url) {
    let data = {
      "name": this.state.selectedData.name
    }
    this.setState({ showSpin: true })
    axios.patch(url, data).then(
      resp => {
        console.log(resp)
        this.loadDataList();
      },
      err => {
        alert("Error While Updating")
        this.setState({ showSpin: false })
      }
    )
  }

  new() {
    let selectedData = this.state.selectedData
    selectedData['name'] = ""
    this.setState({ selectedData: selectedData, showAdd: true, showUpdate: false })
  }

  add() {
    if (this.state.selectedData.name === "") {
      alert("Name is empty");
      return
    }
    let data = {
      "name": this.state.selectedData.name
    }
    this.setState({ showSpin: true })
    axios.post(urlData, data).then(
      resp => {
        console.log(resp)
        this.loadDataList();
      },
      err => {
        alert("Error While Adding")
        this.setState({ showSpin: false })
      }
    )
  }

  filter(e) {
    if (this.state.filteredDataList) {
    let filteredData = this.state.dateList.filter(data => data.name.includes(e.target.value))
    console.log(filteredData)
    this.setState({ filter: e.target.value, filteredDataList: filteredData })
    }

  }
  inputOnchange(e) {
    let selectedData = this.state.selectedData
    selectedData['name'] = e.target.value
    this.setState({ selectedData: selectedData })
  }

  render() {
    let trData = this.state.filteredDataList ? this.state.filteredDataList.map((portfolio, i) => {
      return (
        <tr key={i}>
          <th> {i}</th>
          <td>{portfolio.name}</td>
          <td><button className="btn btn-success btn-sm" onClick={() => this.getEdit(portfolio._links.self.href)}>
            <FontAwesomeIcon icon={faPencil} /></button>
            &nbsp;
            <button className="btn btn-danger btn-sm" onClick={() => this.delete(portfolio._links.self.href)}>
              <FontAwesomeIcon icon={faTrash} /></button>
          </td>
        </tr>
      )
    }):null

    let updateOrAdd = () => {
      if (this.state.showUpdate) {
        return (
          <button type="submit" className="btn btn-primary"
            onClick={() => this.update(this.state.selectedData._links.self.href)}>
            Update
          </button>
        )
      } else if (this.state.showAdd) {
        return (
          <button type="submit" className="btn btn-primary"
            onClick={() => this.add()}>
            Add
          </button>
        )
      }
    }
    let spinner = () => {
      if (this.state.showSpin) {
        return (<Spinner />)
      }
    }

    return (
      <div>
        {spinner()}
        <h3>Portfolio</h3>
        <div className="row">
          <div className="col-4">
            <div className="card shadow">
              <div className="card-header">
                <p>List of Portfolio
                  <button className="btn btn-sm btn-secondary float-end"
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
                        <th scope="col">Name</th>
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
            <div className="card shadow">
              <div className="card-header">
                <button className="btn btn-sm btn-warning" onClick={() => this.new()} ><FontAwesomeIcon icon={faPlusCircle} /> &nbsp; Add New</button>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input type="text" className="form-control" id="name" aria-describedby="name" name="selectedData.name"
                    value={this.state.selectedData.name} onChange={(e) => this.inputOnchange(e)} />
                  <div id="name" className="form-text">Please enter the portfolio name</div>
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

export default Portfolio;
