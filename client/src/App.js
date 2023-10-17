import './App.css';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import Home from './pages/Home.js';
import MainNavbar from './components/MainNavbar.js';
import Login from './pages/Login.js';
import Signup from './pages/Signup.js';
import Chat from './pages/Chat.js';
// import Tchat from './pages/Tchat.js';
import Find from './pages/Find.js';
import store from './store';
import AuthRoute from './components/AuthRoute';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {logout, getUserData} from './actions/userActions';

const token = localStorage.token;

if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logout());
    window.location.href = '/login';
  } else {
    // console.log("In main app");
    store.dispatch({type: 'SET_AUTHENTICATED', payload: true});
    axios.defaults.headers.common['authorization'] = token;
    
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MainNavbar/>
        <Switch>
          <AuthRoute exact path='/' component={Home}/>
          <Route path='/signup' component={Signup}/>
          <Route path='/login' component={Login}/>
          <Route path='/find' component={Find}/>
          <Route path='/chat/:rid/:tchat' component={Chat}/>
          {/* <Route path='/tchat/:id' component={Tchat}/> */}
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
