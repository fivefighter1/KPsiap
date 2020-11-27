import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
// import Pagination from "react-js-pagination";
import SuccessAlert from "./SuccessAlert";
import ErrorAlert from "./ErrorAlert";

export default class Listing extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            // activePage: 1,
            // itemsCountPerPage: 1,
            // totalItemsCount: 1,
            // pageRangeDisplayed:3,
            alert_message:'',

        }
        // this.handlePageChange = this.handlePageChange.bind(this);
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/user').then(response => {
            this.setState({
                users:response.data,
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


    onDelete(user_id) {
        if(confirm("Do you really want to delete?")){
            axios.delete('http://127.0.0.1:8000/api/user/' + user_id)
                .then(response => {
                    var users = this.state.users;
                    for (var i = 0; i < users.length; i++) {
                        if (users[i].id === user_id) {
                            users.splice(i,1);
                            this.setState({users: users});
                        }
                        this.setState({alert_message : "success"})
                    }

                })
                .catch(function (error) {
                    console.log(error);
                    this.setState({alert_message : "error"})
                });
        }

    }

    render() {
        return (
            <div>
                {/*<hr/>*/}
                {this.state.alert_message==="success"?<SuccessAlert message={"User deleted successfully"} />:null}
                {this.state.alert_message==="error"?<ErrorAlert message={"Error occured while deleting user.."}/>:null}
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nama</th>
                        <th scope="col">Email</th>
                        <th scope="col">Username</th>
                        {/*<th scope="col">Password</th>*/}
                        <th scope="col">Role</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.users.map(user=>{
                            return(
                                <tr key={user.id}>
                                    <td scope="row">{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.username}</td>
                                    <td>{user.role}</td>
                                    {/*<td>{user.updated_at}</td>*/}
                                    <td>
                                        <Link to={`/user/edit/${user.id}`}> Edit </Link>
                                        <a href="#" onClick={this.onDelete.bind(this, user.id)}>Delete</a>
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
