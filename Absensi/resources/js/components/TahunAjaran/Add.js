import React, { Component } from 'react';
import axios from 'axios';
// import SuccessAlert from "./SuccessAlert";
// import ErrorAlert from "./ErrorAlert";

export default class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            kelass:[],
            tahun_ajaran: '',
            angkatan: '',
            kelas_id:'',
            alert_message: '',
        }
        this.onChangeTahunAjaran = this.onChangeTahunAjaran.bind(this);
        this.onChangeAngkatan = this.onChangeAngkatan.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeTahunAjaran(e){
        this.setState({
            tahun_ajaran: e.target.value
        })
    }

    onChangeAngkatan(e){
        this.setState({
            angkatan: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        const tahun_ajaran = {
            tahun_ajaran : this.state.tahun_ajaran,
            angkatan: this.state.angkatan,
        }

        axios.post('http://127.0.0.1:8000/api/tahun_ajaran', tahun_ajaran)
            .then(function (response) {
                console.log(response.data);
                // this.setState({alert_message : "success"})
            })
            .catch(function (error) {
                console.log(error);
                // this.setState({alert_message : "error"})
            });

        this.setState({
            tahun_ajaran : '',
            angkatan: '',
        });
    }


    render() {
        return (
            <div className="container">
                <div className="row">
                    <form className="form-horizontal" onSubmit={this.onSubmit} style={{width:'100%'}}>
                        <div className="form-group">
                            <label htmlFor="tahun_ajaran" className="col-lg-6 control-label">Tahun Ajaran </label>
                            <div className="col-lg-12">
                                <input type="text"
                                       className="form-control"
                                       id="tahun_ajaran"
                                       value={this.state.tahun_ajaran}
                                       onChange={this.onChangeTahunAjaran}
                                       placeholder="Enter Tahun Ajaran"
                                />
                                <label htmlFor="angkatan" className="col-lg-6 control-label">Angkatan </label>
                                <input type="text"
                                       className="form-control"
                                       id="angkatan"
                                       value={this.state.angkatan}
                                       onChange={this.onChangeAngkatan}
                                       placeholder="Enter Angkatan"
                                />

                            </div>
                        </div>
                        <div className="col-lg-12">
                            <button type="submit" className="btn btn-primary pull-right">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
