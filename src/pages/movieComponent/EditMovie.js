import React, { Component } from 'react';
import firebase from '../../Firebase';
import { Link } from 'react-router-dom';
import {v4 as uuid} from "uuid";

class EditMovie extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ageRating: '',
      ratingIMDB: '',
      releaseDate: '',
      releaseYear: '',
      stars: '',
      title: '',
      desc: '',
      director: '',
      duration: '',
      genre: '',
      onShowing: '',
      LgImage: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('movie').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const movie = doc.data();
        this.setState({
          key: doc.id,
          ageRating: movie.ageRating,
          ratingIMDB: movie.ratingIMDB,
          releaseDate: movie.releaseDate,
          releaseYear: movie.releaseYear,
          stars: movie.stars,
          title: movie.title,
          desc: movie.desc,
          director: movie.director,
          duration: movie.duration,
          genre: movie.genre,
          onShowing: movie.onShowing,
          LgImage: movie.LgImage
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  readImage = async (e) => {
    const file = e.target.files[0];
    const id = uuid();
    const imageRef = firebase.storage().ref('image').child(id)
    await imageRef.put(file);
    imageRef.getDownloadURL().then((url) => {
      this.setState({
        LgImage : url
      });
      console.log(url)
    })
  }

    onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({movie:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { ageRating, desc, director, duration, genre, onShowing, ratingIMDB, releaseDate, releaseYear, stars, title, LgImage } = this.state;

    const updateRef = firebase.firestore().collection('movie').doc(this.state.key);
    updateRef.set({
      ageRating,
      ratingIMDB,
      releaseDate,
      releaseYear,
      stars,
      title,
      desc,
      director,
      duration,
      genre,
      onShowing,
      LgImage
    }).then((docRef) => {
      this.setState({
        key: '',
        ageRating: '',
        ratingIMDB: '',
        releaseDate: '',
        releaseYear: '',
        stars: '',
        title: '',
        desc: '',
        director: '',
        duration: '',
        genre: '',
        onShowing: '',
        LgImage: ''
      });
      this.props.history.push("/showMovie/"+this.props.match.params.id)
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
              EDIT MOVIE
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to={`/movie`} class="btn btn-primary">Movie List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="title">Title:</label>
                <input type="text" class="form-control" name="title" value={this.state.title} onChange={this.onChange} placeholder="Title" />
              </div>
              <div className="upload-data">
                <label for="image">Image:</label>
                <div><input type="file" name="image" onChange={this.readImage} placeholder="Image" /></div>
                <img height="300" width="200" src={this.state.LgImage}></img>
              </div>
              <div class="form-group">
                <label for="director">Director:</label>
                <input type="text" class="form-control" name="director" value={this.state.director} onChange={this.onChange} placeholder="Director" />
              </div>
              <div class="form-group">
                <label for="stars">Stars:</label>
                <input type="text" class="form-control" name="stars" value={this.state.stars} onChange={this.onChange} placeholder="Stars" />
              </div>
              <div class="form-group">
                <label for="ageRating">Age Rating:</label>
                <input type="text" class="form-control" name="ageRating" value={this.state.ageRating} onChange={this.onChange} placeholder="Age Rating" />
              </div>
              <div class="form-group">
                <label for="genre">Type:</label>
                <input type="text" class="form-control" name="genre" value={this.state.genre} onChange={this.onChange} placeholder="Genre" />
              </div>
              <div class="form-group">
                <label for="duration">Duration:</label>
                <input type="text" class="form-control" name="duration" value={this.state.duration} onChange={this.onChange} placeholder="Duration" />
              </div>
              <div class="form-group">
                <label for="releaseDate">Release Date:</label>
                <input type="text" class="form-control" name="releaseDate" value={this.state.releaseDate} onChange={this.onChange} placeholder="Release Date" />
              </div>
              <div class="form-group">
                <label for="releaseYear">Release Year:</label>
                <input type="text" class="form-control" name="releaseYear" value={this.state.releaseYear} onChange={this.onChange} placeholder="Release Year" />
              </div>
              <div class="form-group">
                <label for="onShowing">On Showing:</label>
                <input type="text" class="form-control" name="onShowing" value={this.state.onShowing} onChange={this.onChange} placeholder="On Showing" />
              </div>
              <div class="form-group">
                <label for="ratingIMDB">IMDB:</label>
                <input type="text" class="form-control" name="ratingIMDB" value={this.state.ratingIMDB} onChange={this.onChange} placeholder="IMDB" />
              </div>
              <div class="form-group">
                <label for="desc">Description:</label>
                <input type="text" class="form-control" name="desc" value={this.state.desc} onChange={this.onChange} placeholder="Description" />
              </div>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default EditMovie;
