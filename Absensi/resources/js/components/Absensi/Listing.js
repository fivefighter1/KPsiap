import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
// import Pagination from "react-js-pagination";
// import SuccessAlert from "./SuccessAlert";
// import ErrorAlert from "./ErrorAlert";

export default class Listing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jadwal:[],
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
        axios.get('http://127.0.0.1:8000/api/jadwal').then(response => {
            this.setState({
                jadwal:response.data,
            });
        });

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
                <h3> Absensi </h3>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Jadwal</th>
                        <th scope="col">Kelas</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                            this.state.jadwal.map(jadwal=> {
                                return (
                                    <tr key={jadwal.id}>
                                        <td scope="row">{jadwal.jadwal_id}</td>
                                        <td>{jadwal.nama_mata_pelajaran}</td>
                                        <td>{jadwal.nama_tingkat} {jadwal.nama_kelas}</td>
                                        <td>
                                            <Link to={`/absensi/absen/${jadwal.jadwal_id}`}> Absensi </Link>
                                            {/*<a href="#" onClick={this.onDelete.bind(this, fingerprint.id)}>Delete</a>*/}
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
