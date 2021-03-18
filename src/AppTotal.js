import React from 'react';
import Signup from "./pages/Signup";
import { Container } from "react-bootstrap"
import { AuthProvider } from './contexts/authContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import App from './App';
import Login from "./pages/Login"
import PrivateRoute from "./contexts/PrivateRoute"

function AppTotal() {
    return (
        <Router>
            <AuthProvider>
                <Switch>
                    <PrivateRoute exact path="/admin" component={App} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/login" component={Login} />
                </Switch>
            </AuthProvider>
        </Router>
    )
}

export default AppTotal