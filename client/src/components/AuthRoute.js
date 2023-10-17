import React from 'react'
import {useSelector} from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export default function AuthRoute(props) {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    // console.log(isAuthenticated);
    if (!isAuthenticated) {
        // console.log(this.props.isAuthenticated);
        return <Redirect to="/login"/>
    }
    else{
        // console.log(this.props.isAuthenticated);
        return <Route {...props} />
    }
}


