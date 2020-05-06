import React, {useState, useEffect, useContext} from 'react';
import {Redirect, Route} from "react-router-dom";
import {UserContext} from "../Context/UserProvider";




const AuthRoute = ({ component: Component, ...rest }) => {
    const User=useContext(UserContext);
    let authUser=User.isLogIn;

    return (
        <Route
            {...rest}
            render={props =>
                authUser ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />

    );
};


export default AuthRoute;