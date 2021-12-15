import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
import './Login-Register.css'
import axios from 'axios';
import { useForm } from 'react-hook-form';
// import { onLogin } from '../reducers/Auth';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router';
import { onLogin } from '../../Auth/reducers/Auth';
import { useDispatch } from 'react-redux';


function FormLogin(props) {

    const dispatch = useDispatch();

    const schema = yup.object().shape({
        username: yup.string().required(),
        password: yup.string().required(),
    }).required();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const [mess, setMess] = useState();

    const [err, setErr] = useState(true);

    const [showPass, setShowPass] = useState(false);

    // const dispatch = useDispatch();

    const navigate = useNavigate();

    const submitFormLogin = (data) => {
        axios.post('https://pbl6-backend.herokuapp.com/api/auth/signin', {
            username: data.username,
            password: data.password
        }).then(res => {
            dispatch(onLogin(res.data))
            navigate('/');
        }).catch(err => {
            if (err.response) {
                setMess(err.response.data);
                setErr(true);
            }
        })
    }

    return (

        <div className="grid grid-cols-1 bg-gray-50 form-login pt-32 h-screen">
            <div className="mt-4 container-form-Login">
                <h1 className="text-3xl text-center font-bold mt-2">Sign in to your account</h1>
                <p className="text-center font-xs text-gray-400 tracking-tighter">Sign in to continue to App.</p>

                <form className="mt-4 p-8 auth-form shadow-md" onSubmit={handleSubmit(submitFormLogin)} >
                    <div>
                        <label htmlFor="username" className="font-medium">Username</label>
                        <input
                            className="text"
                            type="text"
                            id="username"
                            {...register("username", { onChange: () => setErr(false) })}
                        />
                        {errors.username && <p className="text-sm text-red-600 ml-2 tracking-tighter font-semibold">{errors.username.message}</p>}
                    </div>

                    <div className="mt-6">
                        <label htmlFor="password" className="font-medium">Password</label>
                        <div className="password flex items-center">
                            <input
                                className="w-full focus:outline-none focus:border-none"
                                id="password"
                                type={`${showPass ? 'text' : 'password'}`}
                                {...register("password", { onChange: () => setErr(false) })}
                            />
                            <i className={`far fa-eye cursor-pointer duration-300 ${showPass ? 'text-blue-500' : 'text-gray-400  hover:text-gray-600'}`}
                                onClick={() => setShowPass(!showPass)}
                            ></i>
                        </div>
                        {errors.password && <p className="text-sm text-red-600 ml-2 tracking-tighter font-semibold">{errors.password.message}</p>}
                    </div>

                    {err && <span className="text-sm text-red-600 ml-2 mt-1 tracking-tighter font-semibold">{mess}</span>}

                    <button
                        className="btn-login mt-6"
                        type="submit"
                    >
                        Sign in
                    </button>


                    <div className="my-6">
                        <div className="other-login">
                            <span>Or continue with</span>
                        </div>
                    </div>

                    <div className="flex">
                        <div className="flex-grow mx-2 text-center py-1 shadow-sm border-2 border-gray-200 rounded-lg">
                            <div className="text-2xl text-gray-500 flex items-center justify-center h-full w-full">
                                <ion-icon name="logo-facebook"></ion-icon>
                            </div>
                        </div>

                        <div className="flex-grow mx-1 text-center py-1 shadow-sm border-2 border-gray-200 rounded-lg">
                            <div className="text-2xl text-gray-500 flex items-center justify-center h-full w-full">
                                <ion-icon name="logo-twitter"></ion-icon>
                            </div>
                        </div>

                        <div className="flex-grow mx-2 text-center py-1 shadow-sm border-2 border-gray-200 rounded-lg">
                            <div className="text-2xl text-gray-500 flex items-center justify-center h-full w-full">
                                <ion-icon name="logo-github"></ion-icon>
                            </div>
                        </div>
                    </div>

                </form>
            </div>
        </div>

    );
}

export default FormLogin;