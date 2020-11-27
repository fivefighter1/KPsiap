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
            gurus: [],
            alert_message:'',
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/guru').then(response => {
            this.setState({
                gurus:response.data,
            });
        });
    }

    onDelete(user_id) {
        if(confirm("Do you really want to delete?")){
            axios.delete('http://127.0.0.1:8000/api/guru/' + user_id)
                .then(response => {
                    var gurus = this.state.gurus;
                    for (var i = 0; i < gurus.length; i++) {
                        if (gurus[i].id === user_id) {
                            gurus.splice(i,1);
                            this.setState({gurus: gurus});
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
                        <th scope="col">NIP</th>
                        <th scope="col">Nama Guru</th>
                        <th scope="col">Jenis Kelamin</th>
                        <th scope="col">Tempat Lahir</th>
                        <th scope="col">Tanggal Lahir</th>
                        <th scope="col">Nomor Telepon</th>
                        <th scope="col">Alamat</th>
                        <th scope="col">Jabatan</th>
                        <th scope="col">Agama</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.gurus.map(guru=>{
                            return(
                                <tr key={guru.user_id}>
                                    <td scope="row">{guru.user_id}</td>
                                    <td>{guru.NIP}</td>
                                    <td>{guru.nama_guru}</td>
                                    <td>{guru.jenis_kelamin}</td>
                                    <td>{guru.tempat_lahir}</td>
                                    <td>{guru.tanggal_lahir}</td>
                                    <td>{guru.no_telp}</td>
                                    <td>{guru.alamat}</td>
                                    <td>{guru.jabatan}</td>
                                    <td>{guru.agama}</td>
                                    <td>
                                        {/*<Link to={`/guru/edit/${guru.user_id}`}> Edit </Link>*/}
                                        <a href="#" onClick={this.onDelete.bind(this, guru.user_id)}>Delete</a>
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
