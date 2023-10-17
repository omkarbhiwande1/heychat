import React from 'react'
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router';
import {logout} from '../actions/userActions';
import '../styles/MainNavbar.css'
// import {Navbar, Nav} from 'react-bootstrap';
export default function MainNavbar() {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const username = useSelector(state => state.user.username);
    const history = useHistory();
    const dispatch = useDispatch();
    function handleLogout(){
        dispatch(logout());
        history.push({pathname: '/login'});
    }
    return (
        <nav className="d-flex flex-row navbar navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">HeyChat</Link>
            {
                isAuthenticated?(
                    <ul className="d-flex flex-row navbar-nav  mr-2">
                        <li  className="nav-item">
                            <p style={{fontSize: '1em'}} className="nav-link text-white mt-0 pb-0" >Welcome {username}</p>
                        </li>
                        <li  className="nav-item ml-5">
                            <Link style={{fontSize: '1em'}} className="nav-link text-white" to="/find">Find People</Link>
                        </li>
                        <li className="nav-item ml-4">
                            <a style={{fontSize: '1em', color: 'white', 'cursor': 'pointer'}} className="nav-link text-white text-lg" onClick={handleLogout}>Logout</a>
                        </li>
                    </ul>
                ):(
                    <ul className="d-flex flex-row navbar-nav ml-auto mr-2">
                        <li  className="nav-item">
                            <Link style={{fontSize: '1.3em'}} className="nav-link text-white" to="/signup">Signup</Link>
                        </li>
                        <li className="nav-item ml-4">
                            <Link style={{fontSize: '1.3em'}} className="nav-link text-white" to="/login">Login</Link>
                        </li>
                    </ul>
                )
            }
            
        </nav>
        
    )
}
