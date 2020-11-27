import React, { Component } from 'react';
import axios from 'axios';
import SuccessAlert from "./SuccessAlert";
import ErrorAlert from "./ErrorAlert";

export default class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            role:'',
            strength:'',
            alert_message: '',
        }

        this.onChangeRole = this.onChangeRole.bind(this);
        this.onChangeStrength = this.onChangeStrength.bind(this);
        // this.onChangeCategoryName = this.onChangeCategoryName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/role/' + this.props.match.params.id).then(response => {
            this.setState({role:response.data.role});
            this.setState({strength:response.data.strength});
        });
    }

    onChangeRole(e){
        this.setState({
            role: e.target.value
        });
    }

    onChangeStrength(e){
        this.setState({
            strength: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const roleChange = {
            // category_name : this.state.category_name,
            role : this.state.role,
            strength: this.state.strength,

        }

        axios.patch('http://127.0.0.1:8000/api/role/' + this.props.match.params.id, roleChange)
            .then(function (response) {
                console.log(response.data);
                this.setState({alert_message : "success"})
            }.bind(this))

            .catch(function (error) {
                console.log(error);
                this.setState({alert_message: "error"})
            }.bind(this));


        this.setState({
            role:'',
            strength:'',
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
                        <label htmlFor="role" className="col-lg-6 control-label">Role Name</label>
                        <div className="col-lg-12">
                            <input type="text"
                                   className="form-control"
                                   id="role"
                                   value={this.state.role}
                                   onChange={this.onChangeRole}
                                   placeholder="Enter Role"
                            />
                        </div>
                        <label htmlFor="strength" className="col-lg-6 control-label">Role Strength</label>
                        <div className="col-lg-12">
                            <input type="text"
                                   className="form-control"
                                   id="strength"
                                   value={this.state.strength}
                                   onChange={this.onChangeStrength}
                                   placeholder="Enter Strength"
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
