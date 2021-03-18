import React, { Component } from 'react';
import firebase from '../../Firebase';
import { Link } from 'react-router-dom';

class EditUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
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

  componentDidMount() {
    const ref = firebase.firestore().collection('users').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const user = doc.data();
        this.setState({
          key: doc.id,
          DOB:user.DOB,
          confirmPassword:user.confirmPassword,
          lastName:user.lastName,
          email:user.email,
          firstName:user.firstName,
          password:user.password,
          phoneNumber:user.phoneNumber,
          userName:user.userName,
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({user:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { DOB, confirmPassword, email, firstName, lastName, password, phoneNumber, userName } = this.state;

    const updateRef = firebase.firestore().collection('users').doc(this.state.key);
    updateRef.set({
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
        key: '',
        DOB: '',
        confirmPassword: '',
        lastName: '',
        email: '',
        firstName: '',
        password: '',
        phoneNumber: '',
        userName: ''
      });
      this.props.history.push("/showUser/"+this.props.match.params.id)
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              EDIT USER
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to={`/user`} class="btn btn-primary">User List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="userName">User Name:</label>
                <input type="text" class="form-control" name="userName" value={this.state.userName} onChange={this.onChange} placeholder="User Name" />
              </div>
              <div class="form-group">
                <label for="firstName">First Name:</label>
                <input type="text" class="form-control" name="firstName" value={this.state.firstName} onChange={this.onChange} placeholder="First Name" />
              </div>
              <div class="form-group">
                <label for="lastName">Last Name:</label>
                <input type="text" class="form-control" name="lastName" value={this.state.lastName} onChange={this.onChange} placeholder="Last Name" />
              </div>
              <div class="form-group">
                <label for="email">Email:</label>
                <input type="text" class="form-control" name="email" value={this.state.email} onChange={this.onChange} placeholder="Email" />
              </div>
              <div class="form-group">
                <label for="password">Password:</label>
                <input type="text" class="form-control" name="passWord" value={this.state.password} onChange={this.onChange} placeholder="Password" />
              </div>
              <div class="form-group">
                <label for="confirmPassword">Confirm Password:</label>
                <input type="text" class="form-control" name="confirmPassword" value={this.state.confirmPassword} onChange={this.onChange} placeholder="Confirm Password" />
              </div>
              <div class="form-group">
                <label for="DOB">DOB:</label>
                <input type="text" class="form-control" name="DOB" value={this.state.DOB} onChange={this.onChange} placeholder="DOB" />
              </div>
              <div class="form-group">
                <label for="Phone Number">Phone Number:</label>
                <input type="text" class="form-control" name="phoneNumber" value={this.state.phoneNumber} onChange={this.onChange} placeholder="Phone Number" />
              </div>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default EditUser;
