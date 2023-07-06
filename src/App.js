import logo from './logo.svg';
import './App.css';
import Home from './Component/Home/Home';
import Header from './Component/Body/Header';
import Content from './Component/Body/Content';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import Login from './Component/Login/Login';
import Signup from './Component/Login/Signup';
import { useEffect } from 'react';


function App() {

  const config = {
    apiKey: 'AIzaSyDafK_Fk0gXKC5zEgXdUGNpIT_s_aSexGs',
    authDomain: 'spck-login-b01d4.firebaseapp.com',
    // ...
  };
  firebase.initializeApp(config);

  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (userLogin) => {
      if (!userLogin) {
        // user logs out, handle something here
        console.log('User is not logged in');
        // setUser(null);
        return;
      }
      console.log('Logged in user: ', userLogin);
      // setUser({ ...user, userName: userLogin.displayName, avt: userLogin.photoURL });
      // notification("success", "Logged in successfully!")
      // const token = await userLogin.getIdToken();
      // console.log('Logged in user token: ', token);
    });

    return () => unregisterAuthObserver();
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />

        {/* <Home/> */}

        <Switch>
          <Route path="/" exact component={() => <Content />} ></Route>
          <Route path="/info-account" exact component={() => <Login />} ></Route>
          <Route path="/game" exact component={() => <Signup />} ></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
