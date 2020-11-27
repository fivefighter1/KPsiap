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
            fingerprints: [],
            listFingerPrintSiswa:[],
            listFingerPrintGuru:[],
            listFingerPrintSiswaIsActive : false,
            listFingerPrintGuruIsActive : false,
            // activePage: 1,
            // itemsCountPerPage: 1,
            // totalItemsCount: 1,
            // pageRangeDisplayed:3,
            alert_message:'',

        }
        // this.handlePageChange = this.handlePageChange.bind(this);
        this.handleListFingerPrintSiswaIsActive = this.handleListFingerPrintSiswaIsActive.bind(this);
        this.handleListFingerPrintGuruIsActive = this.handleListFingerPrintGuruIsActive.bind(this);
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/fingerprint').then(response => {
            this.setState({
                fingerprints:response.data,
            });
        });

        axios.get('http://127.0.0.1:8000/api/fingerprint/listFingerPrintSiswa').then(response =>{
            this.setState({
                listFingerPrintSiswa: response.data,
            })
        })

        axios.get('http://127.0.0.1:8000/api/fingerprint/listFingerPrintGuru').then(response =>{
            this.setState({
                listFingerPrintGuru: response.data,
            })
        })
    }

    handleListFingerPrintSiswaIsActive(){
        this.setState({
            listFingerPrintSiswaIsActive : !this.state.listFingerPrintSiswaIsActive,
        })
        if(this.state.listFingerPrintGuruIsActive){
            this.setState({
                listFingerPrintGuruIsActive : false,
            })
        }

    }

    handleListFingerPrintGuruIsActive(){
        this.setState({
            listFingerPrintGuruIsActive : !this.state.listFingerPrintGuruIsActive,
        })
        if(this.state.listFingerPrintSiswaIsActive){
            this.setState({
                listFingerPrintSiswaIsActive : false,
            })
        }
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


    onDelete(id) {
        if(confirm("Do you really want to delete?")){
            axios.delete('http://127.0.0.1:8000/api/fingerprint/' + id)
                .then(response => {
                    var fingerprints = this.state.fingerprints;

                    for (var i = 0; i < fingerprints.length; i++) {
                        if (fingerprints[i].id === id) {
                            fingerprints.splice(i,1);
                            this.setState({fingerprints: fingerprints});
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
                <button onClick={this.handleListFingerPrintSiswaIsActive}>Siswa</button>
                <button onClick={this.handleListFingerPrintGuruIsActive}> Guru </button>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nama</th>
                        <th scope="col">Finger Print</th>
                        <th scope="col">Keterangan</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.listFingerPrintSiswaIsActive == true ?(
                        this.state.listFingerPrintSiswa.map(fingerprint=> {
                            return (
                                <tr key={fingerprint.id}>
                                    <td scope="row">{fingerprint.id}</td>
                                    <td>{fingerprint.nama_siswa}</td>
                                    <td>{fingerprint.fingerprint}</td>
                                    <td>{fingerprint.keterangan}</td>
                                    <td>
                                    <Link to={`/fingerprint/edit/${fingerprint.id}`}> Edit </Link>
                                    <a href="#" onClick={this.onDelete.bind(this, fingerprint.id)}>Delete</a>
                                    </td>
                                </tr>
                            )
                        })
                        ) :null
                    }


                    </tbody>
                    <tbody>
                    {
                        this.state.listFingerPrintGuruIsActive == true ?(
                            this.state.listFingerPrintGuru.map(fingerprint => {
                            return(
                                <tr key={fingerprint.id}>
                                    <td scope="row">{fingerprint.id}</td>
                                    <td>{fingerprint.nama_guru}</td>
                                    <td>{fingerprint.fingerprint}</td>
                                    <td>{fingerprint.keterangan}</td>
                                    <td>
                                        <Link to={`/fingerprint/edit/${fingerprint.id}`}> Edit </Link>
                                        <a href="#" onClick={this.onDelete.bind(this, fingerprint.id)}>Delete</a>
                                    </td>
                                </tr>
                                )
                        })
                        ):null
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
