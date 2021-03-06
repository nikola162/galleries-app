import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import NavBar from "./components/NavBar";
import GuestRoute from "./components/shared/GuestRoute";
import PrivateRoute from "./components/shared/PrivateRoute";
import AppGalleries from "./containers/AppGalleries";
import MyGalleries from "./containers/MyGalleries";
import CreateGallery from "./pages/CreateGallery";

import Register from "./pages/Register";
import Login from "./pages/Login";
import ViewSingleGallery from "./containers/ViewSingleGallery";
import ViewAuthorGalleries from "./containers/ViewAuthorGalleries";

import { getActiveUser } from "./store/auth";
import store from './store';

function App() {
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setTimeout(() => {
        store.dispatch(getActiveUser());
      }, 500);
    }
  }, []);

  return (
    <div>
      <Router>
        <NavBar />
        <Switch>
        <Route exact path="/galleries">
            <AppGalleries />
          </Route>
          <GuestRoute exact path="/login">
            <Login />
          </GuestRoute>
          <GuestRoute exact path="/register">
            <Register />
          </GuestRoute>
          <Route exact path="/galleries/:id">
            <ViewSingleGallery />
          </Route>
          <PrivateRoute exact path="/my-galleries" >
            <MyGalleries/>
          </PrivateRoute>
          <PrivateRoute exact path="/create-galleries">
            <CreateGallery/>
          </PrivateRoute>
          <PrivateRoute exact path="/edit-galleries/:id">
            <CreateGallery/>
          </PrivateRoute>
          <PrivateRoute exact path="/authors/:id">
            <ViewAuthorGalleries />
          </PrivateRoute>
          <Route exact path="/">
            <Redirect to="/galleries" />
          </Route>
          <Route  path="/">
            <div>There is no page</div>          
        </Route>
          
        </Switch>
      </Router>
    </div>
  );
}

export default App;