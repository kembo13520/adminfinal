import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase from '../../Firebase';
import storage from '../../Firebase';
import { Link } from 'react-router-dom';
import {v4 as uuid} from "uuid";
import axios from "axios"

class CreateMovie extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('movie');
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
      LgImage: '',
      iamge: null
    };
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
  // fileSeclectedHandler = (e) => {
  //   this.setState({
  //     image : e.target.files[0]
  //   })
  // }

  // fileUploadHandler = () => {
  //   axios.post('')
  // }

  // handleChange = (image) => {
  //   this.setState({
  //     image : image
  //   })
  // }

  // handleSave = () => {
  //   let bucketName = 'image'
  //   let image = this.state.file[0]
  //   let storageRef = firebase.storage().ref(`${bucketName}/${image.name}`)
  //   let uploadTask = storageRef.put(image)
  //   uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
  //     () => {
  //       let downloadURL = uploadTask.snapshot.ref.getDownloadURL
  //     })
  // }

  onSubmit = (e) => {
    e.preventDefault();

    const { ageRating, desc, director, duration, genre, onShowing, ratingIMDB, releaseDate, releaseYear, stars, title, LgImage, image } = this.state;

    this.ref.add({
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
      LgImage,
    }).then((docRef) => {
      this.setState({
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
        LgImage: '',
      });
      this.props.history.push("/movie")
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    const { ageRating, desc, director, duration, genre, onShowing, ratingIMDB, releaseDate, releaseYear, stars, title, LgImage, iamge } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              ADD MOVIE
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/movie" class="btn btn-primary">Movie List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="title">Title:</label>
                <input type="text" class="form-control" name="title" value={title} onChange={this.onChange} placeholder="Title" />
              </div>
              <div className="upload-data">
                <label for="image">Image:</label>
                <div><input type="file" name="image" onChange={this.readImage} placeholder="Image" /></div>
                <img height="300" width="200" src={LgImage}></img>
              </div>
              <div class="form-group">
                <label for="director">Director:</label>
                <input type="text" class="form-control" name="director" value={director} onChange={this.onChange} placeholder="Director" />
              </div>
              <div class="form-group">
                <label for="stars">Starts:</label>
                <input type="text" class="form-control" name="stars" value={stars} onChange={this.onChange} placeholder="Stars" />
              </div>
              <div class="form-group">
                <label for="ageRating">Age Rating:</label>
                <input type="text" class="form-control" name="ageRating" value={ageRating} onChange={this.onChange} placeholder="Age Rating" />
              </div>
              <div class="form-group">
                <label for="genre">Genre:</label>
                <input type="text" class="form-control" name="genre" value={genre} onChange={this.onChange} placeholder="Genre" />
              </div>
              <div class="form-group">
                <label for="duration">Duration:</label>
                <input type="text" class="form-control" name="duration" value={duration} onChange={this.onChange} placeholder="Duration" />
              </div>
              <div class="form-group">
                <label for="releaseDate">Release Date:</label>
                <input type="text" class="form-control" name="releaseDate" value={releaseDate} onChange={this.onChange} placeholder="Release Date" />
              </div>
              <div class="form-group">
                <label for="releaseYear">Release Year:</label>
                <input type="text" class="form-control" name="releaseYear" value={releaseYear} onChange={this.onChange} placeholder="Release Year" />
              </div>
              <div class="form-group">
                <label for="onShowing">On Showing:</label>
                <input type="text" class="form-control" name="onShowing" value={onShowing} onChange={this.onChange} placeholder="On Showing" />
              </div>
              <div class="form-group">
                <label for="ratingIMDB">Rating IMDB:</label>
                <input type="text" class="form-control" name="ratingIMDB" value={ratingIMDB} onChange={this.onChange} placeholder="Rating IMDB" />
              </div>
              <div class="form-group">
                <label for="desc">Description:</label>
                <textArea class="form-control" name="desc" onChange={this.onChange} placeholder="Description" cols="80" rows="3">{desc}</textArea>
              </div>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateMovie;
