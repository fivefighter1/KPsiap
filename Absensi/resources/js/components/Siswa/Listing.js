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
            siswas: [],
            alert_message:'',
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/siswa').then(response => {
            this.setState({
                siswas:response.data,
            });
        });
    }

    onDelete(user_id) {
        if(confirm("Do you really want to delete?")){
            axios.delete('http://127.0.0.1:8000/api/siswa/' + user_id)
                .then(response => {
                    var siswas = this.state.siswas;
                    for (var i = 0; i < siswas.length; i++) {
                        if (siswas[i].id === user_id) {
                            siswas.splice(i,1);
                            this.setState({siswas: siswas});
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
                        <th scope="col">Nama Siswa</th>
                        <th scope="col">NIS</th>
                        <th scope="col">Jenis Kelamin</th>
                        <th scope="col">Tempat Lahir</th>
                        <th scope="col">Tanggal Lahir</th>
                        <th scope="col">Alamat</th>
                        <th scope="col">Nomor Telepon</th>
                        <th scope="col">Agama</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.siswas.map(siswa=>{
                            return(
                                <tr key={siswa.user_id}>
                                    <td scope="row">{siswa.user_id}</td>
                                    <td>{siswa.nama_siswa}</td>
                                    <td>{siswa.NIS}</td>
                                    <td>{siswa.jenis_kelamin}</td>
                                    <td>{siswa.tempat_lahir}</td>
                                    <td>{siswa.tanggal_lahir}</td>
                                    <td>{siswa.alamat}</td>
                                    <td>{siswa.no_telp}</td>
                                    <td>{siswa.agama}</td>
                                    <td>
                                        <Link to={`/siswa/edit/${siswa.user_id}`}> Edit </Link>
                                        <a href="#" onClick={this.onDelete.bind(this, siswa.user_id)}>Delete</a>
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
