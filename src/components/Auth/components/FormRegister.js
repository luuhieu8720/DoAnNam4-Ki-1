import React from 'react';
import './Login-Register.css'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import axios from 'axios';
import swal from 'sweetalert'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

function FormRegister(props) {

    const schema = yup.object().shape({
        username: yup.string().required(),
        password: yup.string().required(),
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        birthDay: yup.date().required(),
        phone: yup.string().required(),
    }).required();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const history = useNavigate();

    const submitFormRegister = (data) => {
        const newData = { ...data, birthDay: data.birthDay.toISOString() }
        axios.post('https://pbl6-backend.herokuapp.com/api/auth/signup', newData).then(() => {
            swal("Account successfully created!", "Click ok to continue!", "success");
            history('/signin');
        }).catch(err => console.log(err))
    }

    return (
        <div className="grid grid-cols-1 bg-gray-50 pt-20" >
            <div className="mt-4 container-form-Register">
                <h1 className="text-3xl text-center font-bold mt-2">Register Account</h1>
                <form className="mt-4 p-8 auth-form shadow-md" onSubmit={handleSubmit(submitFormRegister)}>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="firstName" className="font-medium">First Name</label>
                            <input
                                id="firstName"
                                className="focus:ring-indigo-500 focus:border focus:border-indigo-500 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                                type="text"
                                {...register("firstName")}
                            />
                        </div>

                        <div className="">
                            <label htmlFor="lastName" className="font-medium">Last Name</label>
                            <input
                                id="lastName"
                                className="focus:ring-indigo-500 focus:border focus:border-indigo-500 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                                type="text"
                                {...register("lastName")}
                            />
                        </div>
                    </div>

                    <div className="mt-4">
                        <label htmlFor="phone" className="font-medium">Phone</label>
                        <input
                            id="phone"
                            className="focus:ring-indigo-500 focus:border focus:border-indigo-500 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                            type="text"
                            {...register("phone")}
                        />
                    </div>


                    <div className="mt-4">
                        <label htmlFor="email" className="font-medium">BirthDay</label>
                        <input
                            id="birthDay"
                            className="focus:ring-indigo-500 focus:border focus:border-indigo-500 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                            type="date"
                            {...register("birthDay")}
                        />
                    </div>

                    <div className="mt-4">
                        <label htmlFor="username" className="font-medium">Username</label>
                        <input
                            id="username"
                            className="focus:ring-indigo-500 focus:border focus:border-indigo-500 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                            type="text"
                            {...register("username")}
                        />
                    </div>

                    <div className="mt-4">
                        <label htmlFor="password" className="font-medium">Password</label>
                        <input
                            id="password"
                            className="focus:ring-indigo-500 focus:border focus:border-indigo-500 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                            type="password"
                            {...register("password")}
                        />
                    </div>

                    <div className="flex items-center mt-4">
                        <div className="flex items-center">
                            <input name="remember-me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />

                            <span className="ml-2 block text-sm font-medium text-gray-400">
                                I accept Terms and Conditions
                            </span>
                        </div>

                    </div>

                    <button className="mt-4 text-white bg-indigo-600 text-center w-full py-2 border border-gray-300 rounded-md"
                        type="submit"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>

    );
}

export default FormRegister;