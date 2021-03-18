import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Actor.css';
import firebase from '../Firebase';

class Users extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('users');
    this.unsubscribe = null;
    this.state = {
      users: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const users = [];
    querySnapshot.forEach((doc) => {
      const { DOB, confirmPassword, email, firstName, lastName, password, phoneNumber, username } = doc.data();
      users.push({
        key: doc.id,
        doc, // DocumentSnapshot
        DOB,
        confirmPassword,
        lastName,
        email,
        firstName,
        password,
        phoneNumber,
        username,
      });
    });
    this.setState({
      users
   });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              USERS LIST
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/createUser" class="btn btn-primary">Add User</Link></h4>
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>username</th>
                  <th>lastName</th>
                  <th>firstName</th>
                  <th>email</th>
                  <th>password</th>
                  <th>confirmPassword</th>
                  <th>DOB</th>
                  <th>phoneNumber</th>
                </tr>
              </thead>
              <tbody>
                {this.state.users.map(user =>
                  <tr>
                    <td><Link to={`/showUser/${user.key}`}>{user.username}</Link></td>
                    <td>{user.lastName}</td>
                    <td>{user.firstName}</td>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                    <td>{user.confirmPassword}</td>
                    <td>{user.DOB}</td>
                    <td>{user.phoneNumber}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Users;
