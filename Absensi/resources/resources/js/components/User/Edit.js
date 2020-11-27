import React, { Component } from 'react';
import axios from 'axios';
import SuccessAlert from "./SuccessAlert";
import ErrorAlert from "./ErrorAlert";

export default class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roles:[],
            name: '',
            email: '',
            username:'',
            password:'',
            role_id:'',
            alert_message: '',
        }
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeRoleID = this.onChangeRoleID.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/user/' + this.props.match.params.id).then(response => {
            this.setState({name:response.data.name});
            this.setState({email:response.data.email});
            this.setState({username:response.data.username});
            this.setState({role_id:response.data.role_id});
        });

        axios.get('http://127.0.0.1:8000/api/role').then(response => {
            this.setState({roles:response.data});
        });
    }

    onChangeName(e){
        this.setState({
            name: e.target.value
        })
    }

    onChangeEmail(e){
        this.setState({
            email: e.target.value
        })
    }

    onChangeUsername(e){
        this.setState({
            username: e.target.value
        })
    }

    onChangePassword(e){
        this.setState({
            password : e.target.value
        })
    }

    onChangeRoleID(e){
        this.setState({
            role_id: e.target.value
        })
    }


    onSubmit(e) {
        e.preventDefault();
        const userChange = {
            name : this.state.name,
            email: this.state.email,
            username : this.state.username,
            role_id : this.state.role_id,

            // category_name : this.state.category_name
        }

        axios.patch('http://127.0.0.1:8000/api/user/' + this.props.match.params.id, userChange)
            .then(function (response) {
                console.log(response.data);
                this.setState({alert_message : "success"})
            }.bind(this))
            .catch(function (error) {
                console.log(error);
                this.setState({alert_message : "error"})
            });

        this.setState({
            name : '',
            email: '',
            username : '',
            // password : '',
            role_id : '',
        });
    }


    render() {
        return (
            <div className="container">

                <div className="row">
                    {/*<hr/>*/}
                    {this.state.alert_message === "success"?<SuccessAlert className="form-control" message={"User updated successfully"} />:null}
                    {this.state.alert_message === "error"?<ErrorAlert className="form-control" message={"Error occured while adding user.."}/>:null}

                    <form className="form-horizontal" onSubmit={this.onSubmit} style={{width:'100%'}}>
                        <div className="form-group">
                            <label htmlFor="name" className="col-lg-6 control-label">Nama</label>
                            <div className="col-lg-12">
                                <input type="text"
                                       className="form-control"
                                       id="name"
                                       value={this.state.name}
                                       onChange={this.onChangeName}
                                       placeholder="Enter Name"
                                />
                                <label htmlFor="email" className="col-lg-6 control-label"> Email </label>
                                <input type="text"
                                       className="form-control"
                                       id="email"
                                       value={this.state.email}
                                       onChange={this.onChangeEmail}
                                       placeholder="Enter Email"
                                />
                                <label htmlFor="username" className="col-lg-6 control-label"> Username </label>
                                <input type="text"
                                       className="form-control"
                                       id="username"
                                       value={this.state.username}
                                       onChange={this.onChangeUsername}
                                       placeholder="Enter Username"
                                />
                                <label htmlFor="role_id" className="col-lg-6 control-label"> Role </label>
                                <select className="form-control" value={this.state.role_id}  onChange={this.onChangeRoleID}>
                                    {
                                        this.state.roles.map(role=> {
                                            return (
                                                <option key={role.id} value={role.id}>{role.role}</option>
                                            )
                                        })
                                    }
                                </select>

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
