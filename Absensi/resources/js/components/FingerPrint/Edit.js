import React, { Component } from 'react';
import axios from 'axios';
// import SuccessAlert from "./SuccessAlert";
// import ErrorAlert from "./ErrorAlert";

export default class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nama_siswa:'',
            fingerprint:'',
            keterangan:'',
        }

        this.onChangeFingerPrint = this.onChangeFingerPrint.bind(this);
        this.onChangeKeterangan = this.onChangeKeterangan.bind(this);
        // this.onChangeCategoryName = this.onChangeCategoryName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/fingerprint/' + this.props.match.params.id).then(response => {
            this.setState({fingerprint:response.data.fingerprint});
            this.setState({keterangan:response.data.keterangan});
        });
    }

    onChangeFingerPrint(e){
        this.setState({
            fingerprint: e.target.value
        });
    }

    onChangeKeterangan(e){
        this.setState({
            keterangan: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const fingerPrintChange = {
            // category_name : this.state.category_name,
            fingerprint : this.state.fingerprint,
            keterangan: this.state.keterangan,

        }

        axios.patch('http://127.0.0.1:8000/api/fingerprint/' + this.props.match.params.id, fingerPrintChange)
            .then(function (response) {
                console.log(response.data);
                // this.setState({alert_message : "success"})
            }.bind(this))

            .catch(function (error) {
                console.log(error);
                // this.setState({alert_message: "error"})
            }.bind(this));


        this.setState({
            fingerprint:'',
            keterangan:'',
        });
    }



    render() {
        return (
            <div className="container">
                <div className="row">
                    {/*<hr/>*/}
                    {this.state.alert_message==="success"?<SuccessAlert message={"Role updated successfully"} />:null}
                    {this.state.alert_message==="error"?<ErrorAlert message={"Error occured while updating role."}/>:null}

                    <form className="form-horizontal" onSubmit={this.onSubmit} style={{width:'100%'}}>
                        <div className="form-group">
                            <label htmlFor="fingerprint" className="col-lg-6 control-label">Fingerprint</label>
                            <div className="col-lg-12">
                                <input type="text"
                                       className="form-control"
                                       id="fingerprint"
                                       value={this.state.fingerprint}
                                       onChange={this.onChangeFingerPrint}
                                       placeholder="Enter Finger Print"
                                />
                            </div>
                            <label htmlFor="keterangan" className="col-lg-6 control-label"> Keterangan </label>
                            <select value={this.state.keterangan} onChange={this.onChangeKeterangan} selected={this.state.keterangan} className="form-control">
                                <option value={null}> Pilih Keterangan </option>
                                <option value="Jempol Kanan"> Jempol Kanan</option>
                                <option value="Telunjuk Kanan"> Telunjuk Kanan</option>
                                <option value="Jari Tengah Kanan"> Jari Tengah Kanan</option>
                                <option value="Jari Manis Kanan"> Jari Manis Kanan</option>
                                <option value="Kelingking Kanan"> Kelingking Kanan</option>
                                <option value="Jempol Kiri"> Jempol Kiri</option>
                                <option value="Telunjuk Kiri"> Telunjuk Kiri</option>
                                <option value="Jari Tengah Kiri"> Jari Tengah Kiri</option>
                                <option value="Jari Manis Kiri"> Jari Manis Kiri</option>
                                <option value="Kelingking Kiri"> Kelingking Kiri</option>
                            </select>

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
