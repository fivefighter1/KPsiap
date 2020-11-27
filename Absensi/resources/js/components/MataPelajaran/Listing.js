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
            mata_pelajarans: [],
            // activePage: 1,
            // itemsCountPerPage: 1,
            // totalItemsCount: 1,
            // pageRangeDisplayed:3,
            alert_message:'',

        }
        // this.handlePageChange = this.handlePageChange.bind(this);
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/mata_pelajaran').then(response => {
            this.setState({
                mata_pelajarans:response.data,
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


    onDelete(mata_pelajaran_id) {
        if(confirm("Do you really want to delete?")){
            axios.delete('/http://127.0.0.1:8000/api/mata_pelajaran/' + mata_pelajaran_id)
                .then(response => {
                    var mata_pelajarans = this.state.mata_pelajarans;

                    for (var i = 0; i < roles.length; i++) {
                        if (mata_pelajarans[i].id === mata_pelajaran_id) {
                            mata_pelajarans.splice(i,1);
                            this.setState({mata_pelajarans: mata_pelajarans});
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
                {/*{this.state.alert_message==="success"?<SuccessAlert message={"Category deleted successfully"} />:null}*/}
                {/*{this.state.alert_message==="error"?<ErrorAlert message={"Error occured while deleting category.."}/>:null}*/}
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Kode Mata Pelajaran</th>
                        <th scope="col">Nama Mata Pelajaran</th>
                        <th scope="col">Created At</th>
                        <th scope="col">Updated At</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.mata_pelajarans.map(mata_pelajaran=>{
                            return(
                                <tr key={mata_pelajaran.id}>
                                    <td scope="row">{mata_pelajaran.id}</td>
                                    <td>{mata_pelajaran.kode_mata_pelajaran}</td>
                                    <td>{mata_pelajaran.nama_mata_pelajaran}</td>
                                    <td>{mata_pelajaran.created_at}</td>
                                    <td>{mata_pelajaran.updated_at}</td>
                                    <td>
                                        <Link to={`/mata_pelajaran/edit/${mata_pelajaran.id}`}> Edit </Link>
                                        <a href="#" onClick={this.onDelete.bind(this, mata_pelajaran.id)}>Delete</a>
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
