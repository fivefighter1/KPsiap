import React, { Component } from 'react';
import {Link, Route} from 'react-router-dom';
import Add from './Add';
import Listing from './Listing';
import Edit from "./Edit";
import Search from "./Search";



export default class Index extends Component {
    render() {
        return (
            <div>
                <div>
                    <Link to='/fingerprint' className="btn btn-default">Listing </Link>
                    <Link to='/fingerprint/add' className="btn btn-default">Add</Link>
                    <Link to='/fingerprint/search' className="btn btn-default"> Search </Link>
                    <Route exact path='/fingerprint/edit/:id' component={Edit}/>
                    <Route exact path='/fingerprint' component={Listing}/>
                    <Route exact path='/fingerprint/add' component={Add}/>
                    <Route exact path='/fingerprint/search' component={Search}/>
                </div>
            </div>
        );
    }
}
