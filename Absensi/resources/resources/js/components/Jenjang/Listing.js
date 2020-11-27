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
            jenjangs: [],
            // activePage: 1,
            // itemsCountPerPage: 1,
            // totalItemsCount: 1,
            // pageRangeDisplayed:3,
            alert_message:'',

        }
        // this.handlePageChange = this.handlePageChange.bind(this);
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/jenjang').then(response => {
            this.setState({
                jenjangs:response.data,
            });
        });
    }

    onDelete(jenjang_id) {
        if(confirm("Do you really want to delete?")){
            axios.delete('http://127.0.0.1:8000/api/jenjang/' + jenjang_id)
                .then(response => {
                    var jenjangs = this.state.jenjangs;
                    for (var i = 0; i < jenjangs.length; i++) {
                        if (jenjangs[i].id === jenjang_id) {
                            jenjangs.splice(i,1);
                            this.setState({jenjangs: jenjangs});
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
                        <th scope="col">Nama Jenjang</th>
                        <th scope="col">Sekolah</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.jenjangs.map(jenjang=>{
                            return(
                                <tr key={jenjang.id}>
                                    <td scope="row">{jenjang.id}</td>
                                    <td>{jenjang.nama_jenjang}</td>
                                    <td>{jenjang.nama_sekolah}</td>
                                    <td>
                                        {/*<Link to={`/sekolah/edit/${jenjang.id}`}> Edit </Link>*/}
                                        <a href="#" onClick={this.onDelete.bind(this, jenjang.id)}>Delete</a>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
            // </div>
        );
    }
}
