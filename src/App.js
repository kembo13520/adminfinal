import './App.css';
import React from 'react';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Create from './pages/actorComponent/Create'
import Actor from './pages/Actor';
import Edit from './pages/actorComponent/Edit';
import Show from './pages/actorComponent/Show';
import Users from './pages/User';
import CreateUser from './pages/userComponent/CreateUser';
import EditUser from './pages/userComponent/EditUser';
import ShowUser from './pages/userComponent/ShowUser';
import movie from './pages/Movie';
import Movi from './pages/Movie';
import Movie from './pages/Movie';
import CreateMovie from './pages/movieComponent/CreateMovie';
import EditMovie from './pages/movieComponent/EditMovie';
import ShowMovie from './pages/movieComponent/ShowMovie';

function App() {
  return (
    <>
       <Router>
        <NavBar/>
        <Switch>
          <Route path='/' exact component={Actor} />
          <Route path='/create' component={Create} />
          <Route path='/edit/:id' component={Edit} />
          <Route path='/show/:id' component={Show} />
          <Route path='/user' component={Users} />
          <Route path='/createUser' component={CreateUser} />
          <Route path='/editUser/:id' component={EditUser} />
          <Route path='/showUser/:id' component={ShowUser} />
          <Route path='/movie' component={Movie} />
          <Route path='/createMovie' component={CreateMovie} />
          <Route path='/editMovie/:id' component={EditMovie} />
          <Route path='/showMovie/:id' component={ShowMovie} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
