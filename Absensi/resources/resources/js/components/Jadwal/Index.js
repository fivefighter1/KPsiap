import React, { Component } from 'react';
import {Link, Route} from 'react-router-dom';
import Add from './Add';
import Listing from './Listing';
// import EditJenjang from './EditJenjang';
import Edit from "./Edit";



export default class Index extends Component {
    render() {
        return (
            <div>
                <div>
                    <Link to='/jadwal' className="btn btn-default">Listing </Link>
                    <Link to='/jadwal/add' className="btn btn-default">Add</Link>
                    <Route exact path='/jadwal/edit/:id' component={Edit}/>
                    <Route exact path='/jadwal' component={Listing}/>
                    <Route exact path='/jadwal/add' component={Add}/>
                </div>
            </div>
        );
    }
}
