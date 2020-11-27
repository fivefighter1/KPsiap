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
            roles: [],
            // activePage: 1,
            // itemsCountPerPage: 1,
            // totalItemsCount: 1,
            // pageRangeDisplayed:3,
            alert_message:'',

        }
        // this.handlePageChange = this.handlePageChange.bind(this);
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/role').then(response => {
            this.setState({
                roles:response.data,
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


    onDelete(role_id) {
        if(confirm("Do you really want to delete?")){
            axios.delete('http://127.0.0.1:8000/api/role/' + role_id)
                .then(response => {
                    var roles = this.state.roles;

                    for (var i = 0; i < roles.length; i++) {
                        if (roles[i].id === role_id) {
                            roles.splice(i,1);
                            this.setState({roles: roles});
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
                        <th scope="col">Role Name</th>
                        <th scope="col">Role Strength</th>
                        <th scope="col">Created At</th>
                        <th scope="col">Updated At</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.roles.map(role=>{
                            return(
                                <tr key={role.id}>
                                    <td scope="row">{role.id}</td>
                                    <td>{role.role}</td>
                                    <td>{role.strength}</td>
                                    <td>{role.created_at}</td>
                                    <td>{role.updated_at}</td>
                                    <td>
                                        <Link to={`/role/edit/${role.id}`}> Edit </Link>
                                        <a href="#" onClick={this.onDelete.bind(this, role.id)}>Delete</a>
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
