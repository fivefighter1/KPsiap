import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
// import Pagination from "react-js-pagination";
// import SuccessAlert from "./SuccessAlert";
// import ErrorAlert from "./ErrorAlert";

export default class Listing extends Component {
    constructor() {
        super();
        this.state = {
            tahun_ajarans: [],
            // activePage: 1,
            // itemsCountPerPage: 1,
            // totalItemsCount: 1,
            // pageRangeDisplayed:3,
            alert_message:'',

        }
        // this.handlePageChange = this.handlePageChange.bind(this);
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/tahun_ajaran').then(response => {
            this.setState({
                tahun_ajarans:response.data,
                // itemsCountPerPage: response.data.per_page,
                // totalItemsCount:response.data.total,
                // activePage:response.data.current_page,
            });
        });
    }
    // handlePageChange(pageNumber) {
    //     console.log(`active page is ${pageNumber}`);
    //     // this.setState({activePage: pageNumber});
    //     axios.get('http://127.0.0.1:8000/api/category?page=' +pageNumber).then(response => {
    //         this.setState({
    //             categories:response.data.data,
    //             itemsCountPerPage: response.data.per_page,
    //             totalItemsCount:response.data.total,
    //             activePage:response.data.current_page,
    //
    //         });
    //     });
    // }


    onDelete(tahun_ajaran_id) {
        if(confirm("Do you really want to delete?")){
            axios.delete('http://127.0.0.1:8000/api/tahun_ajaran/' + tahun_ajaran_id)
                .then(response => {
                    var tahun_ajarans = this.state.tahun_ajarans;
                    for (var i = 0; i < tahun_ajarans.length; i++) {
                        if (tahun_ajarans[i].id === tahun_ajaran_id) {
                            tahun_ajarans.splice(i,1);
                            this.setState({tahun_ajarans: tahun_ajarans});
                        }
                        // this.setState({alert_message : "success"})
                    }

                })
                .catch(function (error) {
                    console.log(error);
                    // this.setState({alert_message : "error"})
                });
        }

    }

    render() {
        return (
            <div>
                {/*<hr/>*/}
                {/*{this.state.alert_message==="success"?<SuccessAlert message={"User deleted successfully"} />:null}*/}
                {/*{this.state.alert_message==="error"?<ErrorAlert message={"Error occured while deleting user.."}/>:null}*/}
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Tahun Ajaran</th>
                        <th scope="col">Angkatan</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.tahun_ajarans.map(tahun_ajaran=>{
                            return(
                                <tr key={tahun_ajaran.id}>
                                    <td scope="row">{tahun_ajaran.id}</td>
                                    <td >{tahun_ajaran.tahun_ajaran}</td>
                                    <td>{tahun_ajaran.angkatan}</td>
                                    {/*<td>{user.updated_at}</td>*/}
                                    <td>
                                        <Link to={`/tahun_ajaran/edit/${tahun_ajaran.id}`}> Edit </Link>
                                        <a href="#" onClick={this.onDelete.bind(this, tahun_ajaran.id)}>Delete</a>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
                {/*<div className="d-flex justify-content-center">*/}
                {/*    <Pagination*/}
                {/*        activePage={this.state.activePage}*/}
                {/*        itemsCountPerPage={this.state.itemsCountPerPage}*/}
                {/*        totalItemsCount={this.state.totalItemsCount}*/}
                {/*        pageRangeDisplayed={this.state.pageRangeDisplayed}*/}
                {/*        onChange={this.handlePageChange}*/}

                {/*    />*/}
            </div>
            // </div>
        );
    }
}
