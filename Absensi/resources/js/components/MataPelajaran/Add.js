import React, { Component } from 'react';
import axios from 'axios';
// import SuccessAlert from "./SuccessAlert";
// import ErrorAlert from "./ErrorAlert";

export default class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            kode_mata_pelajaran: '',
            nama_mata_pelajaran: '',
            alert_message: '',
        }

        this.onChangeKodeMataPelajaran = this.onChangeKodeMataPelajaran.bind(this);
        this.onChangeNamaMataPelajaran = this.onChangeNamaMataPelajaran.bind(this);
        // this.onChangeCategoryName = this.onChangeCategoryName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeKodeMataPelajaran(e){
        this.setState({
            kode_mata_pelajaran: e.target.value
        });
    }

    onChangeNamaMataPelajaran(e){
        this.setState({
            nama_mata_pelajaran: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const mata_pelajaran = {
            kode_mata_pelajaran: this.state.kode_mata_pelajaran,
            nama_mata_pelajaran: this.state.nama_mata_pelajaran,
            // category_name : this.state.category_name
        }

        axios.post('http://127.0.0.1:8000/api/mata_pelajaran', mata_pelajaran)
            .then(function (response) {
                console.log(response.data);
                // this.setState({alert_message : "success"})
            })
            .catch(function (error) {
                console.log(error);
                // this.setState({alert_message : "error"})
            });

        this.setState({
            kode_mata_pelajaran: '',
            nama_mata_pelajaran:'',
        });
    }


    render() {
        return (
            <div className="container">

                <div className="row">
                    {/*<hr/>*/}
                    {/*{this.state.alert_message==="success"?<SuccessAlert message={"Role updated successfully"} />:null}*/}
                    {/*{this.state.alert_message==="error"?<ErrorAlert message={"Error occured while adding role.."}/>:null}*/}

                    <form className="form-horizontal" onSubmit={this.onSubmit} style={{width:'100%'}}>
                        <div className="form-group">
                            <label htmlFor="kode_mata_pelajaran" className="col-lg-6 control-label">Kode Mata Pelajaran </label>
                            <div className="col-lg-12">
                                <input type="text"
                                       className="form-control"
                                       id="kode_mata_pelajaran"
                                       value={this.state.kode_mata_pelajaran}
                                       onChange={this.onChangeKodeMataPelajaran}
                                       placeholder="Enter Kode Mata Pelajaran"
                                />
                                <label htmlFor="nama_mata_pelajaran" className="col-lg-6 control-label"> Nama Mata Pelajaran </label>
                                <input type="text"
                                       className="form-control"
                                       id="nama_mata_pelajaran"
                                       value={this.state.nama_mata_pelajaran}
                                       onChange={this.onChangeNamaMataPelajaran}
                                       placeholder="Enter Nama Mata Pelajaran"
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
