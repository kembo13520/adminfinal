import React, { Component } from 'react';
import firebase from '../../Firebase';
import { Link } from 'react-router-dom';

class ShowUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {},
      key: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('users').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          user: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  delete(id){
    firebase.firestore().collection('users').doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
      this.props.history.push("/user")
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
          <h4><Link to="/user">User List</Link></h4>
          <dt>User Name:</dt>
              <dd>{this.state.user.userName}</dd>
          </div>
          <div class="panel-body">
            <dl>
              <dt>First Name:</dt>
              <dd>{this.state.user.firstName}</dd>
              <dt>Lats Name:</dt>
              <dd>{this.state.user.lastName}</dd>
              <dt>Email:</dt>
              <dd>{this.state.user.email}</dd>
              <dt>Password:</dt>
              <dd>{this.state.user.password}</dd>
              <dt>Confirm Password:</dt>
              <dd>{this.state.user.confirmPassword}</dd>
              <dt>DOB:</dt>
              <dd>{this.state.user.DOB}</dd>
              <dt>Phone Number:</dt>
              <dd>{this.state.user.phoneNumber}</dd>
            </dl>
            <Link to={`/editUser/${this.state.key}`} class="btn btn-success">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.key)} class="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ShowUser;
