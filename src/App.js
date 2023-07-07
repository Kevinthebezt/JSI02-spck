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
import { useEffect, useState } from 'react';
import { Alert } from 'antd';
import Swal from 'sweetalert2'
import About from './Component/About';
import User from './Component/User/User';

function App() {

  const [user, setUser] = useState({
    userName: '',
    email: '',
    avt: '',
    uid: ''
  });
  const [reload, setReload] = useState(false)
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
        setUser(null);
        return;
      }
      console.log('Logged in user: ', userLogin);
      setUser({ ...user, userName: userLogin.displayName, avt: userLogin.photoURL, email: userLogin.email, uid: userLogin.uid });
    });

    return () => unregisterAuthObserver();
  }, [reload]);

  const notification = (icon, title) => {
    return Swal.fire({
      position: 'top',
      icon: icon,
      title: title,
      showConfirmButton: false,
      timer: 1500
    })

  }



  return (
    <Router>
      <div className="App">
        <Header notification={notification} user={user} />

        {/* <Home/> */}

        <Switch>
          <Route path="/" exact component={() => <Content />} ></Route>
          {/* <Route path="/info-account" exact component={() => <Login />} ></Route> */}
          <Route path="/login" exact component={() => <Login notification={notification} />} ></Route>
          <Route path="/signup" exact component={() => <Signup notification={notification} user={user} setReload={setReload} />} ></Route>
          <Route path="/about" exact component={() => <About notification={notification} user={user} />} ></Route>
          <Route path="/information-user" exact component={() => <User notification={notification} user={user} />} ></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
