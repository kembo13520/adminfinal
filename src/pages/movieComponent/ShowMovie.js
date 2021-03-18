import React, { Component } from 'react';
import firebase from '../../Firebase';
import { Link } from 'react-router-dom';
import {v4 as uuid} from "uuid";

class ShowMovie extends Component {

  constructor(props) {
    super(props);
    this.state = {
      movie: {},
      key: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('movie').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          movie: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  delete(id){
    firebase.firestore().collection('movie').doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
      this.props.history.push("/movie")
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
          <h4><Link to="/movie">Movie List</Link></h4>
            <dt>Title</dt>
            <dd class="panel-title">
              {this.state.movie.title}
            </dd>
          </div>
          <div class="panel-body">
            <dl>
              <dt>Image:</dt>
              <dd><img src={this.state.movie.LgImage} width="80px" height="110px" alt="" ></img></dd>
              <dt>Director:</dt>
              <dd>{this.state.movie.director}</dd>
              <dt>Stars:</dt>
              <dd>{this.state.movie.stars}</dd>
              <dt>Age Rating:</dt>
              <dd>{this.state.movie.ageRating}</dd>
              <dt>Genre:</dt>
              <dd>{this.state.movie.genre}</dd>
              <dt>Duration:</dt>
              <dd>{this.state.movie.duration}</dd>
              <dt>Release Date:</dt>
              <dd>{this.state.movie.releaseDate}</dd>
              <dt>Release Year:</dt>
              <dd>{this.state.movie.releaseYear}</dd>
              <dt>On Showing:</dt>
              <dd>{this.state.movie.onShowing}</dd>
              <dt>IMDB:</dt>
              <dd>{this.state.movie.IMDB}</dd>
              <dt>Description:</dt>
              <dd>{this.state.movie.desc}</dd>
            </dl>
            <Link to={`/editMovie/${this.state.key}`} class="btn btn-success">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.key)} class="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ShowMovie;
