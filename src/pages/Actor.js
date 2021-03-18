import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Actor.css';
import firebase from '../Firebase';

class Actor extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('actor');
    this.unsubscribe = null;
    this.state = {
      actor: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const actor = [];
    querySnapshot.forEach((doc) => {
      const { Gender, Name } = doc.data();
      actor.push({
        key: doc.id,
        doc, // DocumentSnapshot
        Gender,
        Name,
      });
    });
    this.setState({
      actor
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
              ACTOR LIST
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/create" class="btn btn-primary">Add actor</Link></h4>
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Gender</th>
                </tr>
              </thead>
              <tbody>
                {this.state.actor.map(actor =>
                  <tr>
                    <td><Link to={`/show/${actor.key}`}>{actor.Name}</Link></td>
                    <td>{actor.Gender}</td>
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

export default Actor;
