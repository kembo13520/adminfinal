import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase from '../../Firebase';
import { Link } from 'react-router-dom';

class CreateUser extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('users');
    this.state = {
      DOB: '',
      confirmPassword: '',
      lastName: '',
      email: '',
      firstName: '',
      password: '',
      phoneNumber: '',
      userName: '',
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { DOB, confirmPassword, email, firstName, lastName, password, phoneNumber, userName } = this.state;

    this.ref.add({
      DOB,
      confirmPassword,
      lastName,
      email,
      firstName,
      password,
      phoneNumber,
      userName,
    }).then((docRef) => {
      this.setState({
        DOB: '',
        confirmPassword: '',
        lastName: '',
        email: '',
        firstName: '',
        password: '',
        phoneNumber: '',
        userName: '',
      });
      this.props.history.push("/user")
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    const { DOB, confirmPassword, email, firstName, lastName, password, phoneNumber, userName } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              ADD USER
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/user" class="btn btn-primary">Users List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="title">User Name:</label>
                <input type="text" class="form-control" name="userName" value={userName} onChange={this.onChange} placeholder="User Name" />
              </div>
              <div class="form-group">
                <label for="title">First Name:</label>
                <input type="text" class="form-control" name="firstName" value={firstName} onChange={this.onChange} placeholder="First Name" />
              </div>
              <div class="form-group">
                <label for="title">Last Name:</label>
                <input type="text" class="form-control" name="lastName" value={lastName} onChange={this.onChange} placeholder="Last Name" />
              </div>
              <div class="form-group">
                <label for="title">Email:</label>
                <input type="text" class="form-control" name="email" value={email} onChange={this.onChange} placeholder="Email" />
              </div>
              <div class="form-group">
                <label for="title">Password:</label>
                <input type="text" class="form-control" name="password" value={password} onChange={this.onChange} placeholder="Password" />
              </div>
              <div class="form-group">
                <label for="title">Confirm Password:</label>
                <input type="text" class="form-control" name="confirmPassword" value={confirmPassword} onChange={this.onChange} placeholder="Confirm Password" />
              </div>
              <div class="form-group">
                <label for="title">DOB:</label>
                <input type="text" class="form-control" name="DOB" value={DOB} onChange={this.onChange} placeholder="DOB" />
              </div>
              <div class="form-group">
                <label for="title">Phone Number:</label>
                <input type="text" class="form-control" name="phoneNumber" value={phoneNumber} onChange={this.onChange} placeholder="Phone Number" />
              </div>
              
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateUser;
