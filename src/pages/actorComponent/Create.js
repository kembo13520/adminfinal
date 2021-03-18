import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase from '../../Firebase';
import { Link } from 'react-router-dom';

class Create extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('actor');
    this.state = {
      Gender: '',
      Name: '',
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { Name, Gender } = this.state;

    this.ref.add({
      Gender,
      Name,
    }).then((docRef) => {
      this.setState({
        Gender: '',
        Name: '',
      });
      this.props.history.push("/")
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    const { Name, Gender } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              ADD ACTOR
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/" class="btn btn-primary">Actor List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="title">Name:</label>
                <input type="text" class="form-control" name="Name" value={Name} onChange={this.onChange} placeholder="Name" />
              </div>
              <div class="form-group">
                <label for="type">Gender</label>
                <input type="text" class="form-control" name="Gender" value={Gender} onChange={this.onChange} placeholder="Gender" />
              </div>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;
