import React, { Component } from 'react';
import {Link, Route} from 'react-router-dom';
import Add from './Add';
import Listing from './Listing';
import Absen from './Absen';
// import Edit from "./Edit";



export default class Index extends Component {
    render() {
        return (
            <div>
                <div>
                    <Link to='/absensi' className="btn btn-default">Listing </Link>
                    <Link to='/absensi/add' className="btn btn-default">Add</Link>
                    {/*<Route exact path='/absensi/edit/:id' component={Edit}/>*/}
                    <Route exact path='/absensi' component={Listing}/>
                    <Route exact path='/absensi/absen/:id' component={Absen}/>
                    {/*<Route exact path='/absensi/add' component={Add}/>*/}
                </div>
            </div>
        );
    }
}
