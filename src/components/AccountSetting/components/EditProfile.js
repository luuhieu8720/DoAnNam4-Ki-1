import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import '../../Auth/components/Login-Register.css';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import swal from 'sweetalert'
import { changeInfo } from '../../Auth/reducers/Auth';
import moment from 'moment';

function EditProfile(props) {

    const token = useSelector(state => state.Auth ? state.Auth.token : "");

    const schema = yup.object().shape({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        phone: yup.string().required(),
        birthday: yup.date().required()
    }).required();

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema),
    });

    const dispatch = useDispatch();

    useEffect(() => {

        const fetchInfo = () => {
            axios.get('https://pbl6-backend.herokuapp.com/api/auth', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(res => {
                setValue("firstName", res.data.firstName);
                setValue("lastName", res.data.lastName);
                setValue("phone", res.data.phone);
                setValue("birthday", res.data.birthday.substring(0, 10));
            })
        }

        fetchInfo();
    }, [token, setValue, dispatch])

    const submitFormProfile = (data) => {
        const newData = {...data, birthday: moment(data.birthday).format('YYYY-MM-DD')}
        console.log(newData)
        axios.put(`https://pbl6-backend.herokuapp.com/api/users/update`, newData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                swal("Successfully changed information!", " Click ok to go back!", "success");
                dispatch(changeInfo(newData));
            })
            .catch(err => console.log(err))
    }


    return (
        <div className="mt-4 px-12">
            <form className="mt-4 p-8 shadow-md bg-white rounded" onSubmit={handleSubmit(submitFormProfile)}>

                <div>
                    <p className="font-medium">First Name</p>
                    <input className="focus:ring-indigo-500 focus:border focus:border-indigo-500 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                        autoComplete="off"
                        type="text"
                        {...register("firstName")}
                    />
                    {errors.firstName && <p className="text-sm text-red-600 ml-2 tracking-tighter font-semibold">{errors.firstName.message}</p>}
                </div>

                <div className="mt-6">
                    <p className="font-medium">Last Name</p>
                    <input className="focus:ring-indigo-500 focus:border focus:border-indigo-500 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                        autoComplete="off"
                        type="text"
                        {...register("lastName")}
                    />
                    {errors.lastName && <p className="text-sm text-red-600 ml-2 tracking-tighter font-semibold">{errors.lastName.message}</p>}

                </div>

                <div className="mt-6">
                    <p className="font-medium">Phone</p>
                    <input className="focus:ring-indigo-500 focus:border focus:border-indigo-500 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                        autoComplete="off"
                        type="text"
                        {...register("phone")}
                    />
                    {errors.phone && <p className="text-sm text-red-600 ml-2 tracking-tighter font-semibold">{errors.phone.message}</p>}

                </div>

                <div className="mt-6">
                    <p className="font-medium">Birthday</p>
                    <input className="focus:ring-indigo-500 focus:border focus:border-indigo-500 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                        autoComplete="off"
                        type="date"
                        {...register("birthday")}
                    />
                    {errors.birthday && <p className="text-sm text-red-600 ml-2 tracking-tighter font-semibold">{errors.birthday.message}</p>}

                </div>

                <div className="text-right mt-6">
                    <button className="text-white bg-red-500 hover:bg-red-700 text-center py-2 px-3 rounded-lg mr-4"
                        type="reset"
                    >
                        Reset
                    </button>

                    <button className="text-white bg-indigo-500 hover:bg-indigo-600 text-center py-2 px-4 rounded-lg"
                        type="submit"
                    >
                        Save
                    </button>
                </div>

            </form>
        </div>
    );
}

export default EditProfile;