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
                    <Link to='/role' className="btn btn-default">Listing </Link>
                    <Link to='/role/add' className="btn btn-default">Add</Link>
                    <Route exact path='/role/edit/:id' component={Edit}/>
                    <Route exact path='/role' component={Listing}/>
                    <Route exact path='/role/add' component={Add}/>
                </div>

            </div>
        );
    }
}
