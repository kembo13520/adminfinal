import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Actor.css';
import firebase from '../Firebase';

class Movie extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('movie');
    this.unsubscribe = null;
    this.state = {
      movie: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const movie = [];
    querySnapshot.forEach((doc) => {
      const { ageRating, desc, director, duration, genre, onShowing, ratingIMDB, releaseDate, releaseYear, stars, title, LgImage } = doc.data();
      movie.push({
        key: doc.id,
        doc, // DocumentSnapshot
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
        LgImage,
        onShowing
      });
    });
    this.setState({
      movie
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
              MOVIE LIST
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/createMovie" class="btn btn-primary">Add Movie</Link></h4>
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Image</th>
                  <th>Director</th>
                  <th>Stars</th>
                  <th>Age Rating</th>
                  <th>Genre</th>
                  <th>Duration</th>
                  <th>Release Date</th>
                  <th>Release Year</th>
                  <th>On Showing</th>
                  <th>IMDB</th>
                  <th>Desc</th>
                </tr>
              </thead>
              <tbody>
                {this.state.movie.map(movie =>
                  <tr>
                    <td><Link to={`/showMovie/${movie.key}`}>{movie.title}</Link></td>
                    <td><img src={movie.LgImage} width="80px" height="110px" alt=""></img></td>
                    <td>{movie.director}</td>
                    <td>{movie.stars}</td>
                    <td>{movie.ageRating}</td>
                    <td>{movie.genre}</td>
                    <td>{movie.duration}</td>
                    <td>{movie.releaseDate}</td>
                    <td>{movie.releaseYear}</td>
                    <td>{movie.onShowing}</td>
                    <td>{movie.ratingIMDB}</td>
                    <td>{movie.desc}</td>
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

export default Movie;
