import React, { Component } from 'react';
import {Link, Route} from 'react-router-dom';
import Add from './Add';
import Listing from './Listing';
import Edit from "./Edit";



export default class Index extends Component {
    render() {
        return (
            <div>
                <div>
                    <Link to='/user' className="btn btn-default">Listing </Link>
                    <Link to='/user/add' className="btn btn-default">Add</Link>
                    <Route exact path='/user/edit/:id' component={Edit}/>
                    <Route exact path='/user' component={Listing}/>
                    <Route exact path='/user/add' component={Add}/>
                </div>
            </div>
        );
    }
}
