import React, { Component } from 'react';
import firebase from '../../Firebase';
import { Link } from 'react-router-dom';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      Name: '',
      Gender:'',
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('actor').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const actor = doc.data();
        this.setState({
          key: doc.id,
          Name: actor.Name,
          Gender: actor.Gender
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({actor:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { Name, Gender } = this.state;

    const updateRef = firebase.firestore().collection('actor').doc(this.state.key);
    updateRef.set({
      Name,
      Gender,
    }).then((docRef) => {
      this.setState({
        key: '',
        Name: '',
        Gender: '',
      });
      this.props.history.push("/show/"+this.props.match.params.id)
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
              EDIT BOARD
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to={`/`} class="btn btn-primary">Actor List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="title">Name:</label>
                <input type="text" class="form-control" name="Name" value={this.state.Name} onChange={this.onChange} placeholder="Name" />
              </div>
              <div class="form-group">
                <label for="title">Gender:</label>
                <input type="text" class="form-control" name="Gender" value={this.state.Gender} onChange={this.onChange} placeholder="Gender" />
              </div>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;
