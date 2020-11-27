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
            sekolahs: [],
            // activePage: 1,
            // itemsCountPerPage: 1,
            // totalItemsCount: 1,
            // pageRangeDisplayed:3,
            alert_message:'',

        }
        // this.handlePageChange = this.handlePageChange.bind(this);
    }


    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/sekolah').then(response => {
            this.setState({
                sekolahs:response.data,
            });
        });
    }

    onDelete(sekolah_id) {
        if(confirm("Do you really want to delete?")){
            axios.delete('http://127.0.0.1:8000/api/sekolah/' + sekolah_id)
                .then(response => {
                    var sekolahs = this.state.sekolahs;
                    for (var i = 0; i < sekolahs.length; i++) {
                        if (sekolahs[i].id === sekolah_id) {
                            sekolahs.splice(i,1);
                            this.setState({sekolahs: sekolahs});
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
                        <th scope="col">Nama Sekolah</th>
                        <th scope="col">Alamat</th>
                        <th scope="col">Kota</th>
                        <th scope="col">Provinsi</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.sekolahs.map(sekolah=>{
                            return(
                                <tr key={sekolah.id}>
                                    <td scope="row">{sekolah.id}</td>
                                    <td ><Link to={`/sekolah/show/${sekolah.id}`}>{sekolah.nama_sekolah} </Link></td>
                                    <td>{sekolah.alamat}</td>
                                    <td>{sekolah.kota}</td>
                                    <td>{sekolah.provinsi}</td>
                                    <td>
                                        <Link to={`/sekolah/edit/${sekolah.id}`}> Edit </Link>
                                        <a href="#" onClick={this.onDelete.bind(this, sekolah.id)}>Delete</a>
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

