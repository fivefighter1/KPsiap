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
            jadwals: [],
            alert_message:'',
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/jadwal').then(response => {
            this.setState({
                jadwals:response.data,
            });
        });
    }

    onDelete(jadwal_id) {
        if(confirm("Do you really want to delete?")){
            axios.delete('http://127.0.0.1:8000/api/jadwal/' + jadwal_id)
                .then(response => {
                    var jadwals = this.state.jadwals;
                    for (var i = 0; i < jadwals.length; i++) {
                        if (jadwals[i].id === jadwal_id) {
                            jadwals.splice(i,1);
                            this.setState({jadwals: jadwals});
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
                {/*{this.state.alert_message==="success"?<SuccessAlert message={"User deleted successfully"} />:null}*/}
                {/*{this.state.alert_message==="error"?<ErrorAlert message={"Error occured while deleting user.."}/>:null}*/}
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Mata Pelajaran</th>
                        <th scope="col">Kelas </th>
                        <th scope="col">Hari</th>
                        <th scope="col">Waktu Mulai</th>
                        <th scope="col">Waktu Selesai</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.jadwals.map(jadwal=>{
                            return(
                                <tr key={jadwal.jadwal_id} >
                                    <td scope="row">{jadwal.jadwal_id}</td>
                                    <td scope="row">{jadwal.nama_mata_pelajaran}</td>
                                    <td>{jadwal.nama_tingkat}{jadwal.nama_kelas}</td>
                                    <td>{jadwal.hari}</td>
                                    <td>{jadwal.waktu_mulai}</td>
                                    <td>{jadwal.waktu_selesai}</td>
                                    <td>
                                        <Link to={`/jadwal/edit/${jadwal.jadwal_id}`}> Edit </Link>
                                        <a href="#" onClick={this.onDelete.bind(this, jadwal.jadwal_id)}>Delete</a>
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
