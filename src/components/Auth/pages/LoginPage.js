import React from 'react';
import { useSelector } from 'react-redux';
import FormLogin from '../components/FormLogin';
import {} from 'react-router';


function LoginPage(props) {

    const token = useSelector(auth => auth.Auth.accessToken);
    if (token === "") {
        return <FormLogin />
    } else {
        
    }

}

export default LoginPage;