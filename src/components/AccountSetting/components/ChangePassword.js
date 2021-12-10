import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import '../../Auth/components/Login-Register.css';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import swal from 'sweetalert'
import { useSelector } from 'react-redux';

function ChangePassword(props) {

    const token = useSelector(state => state.Auth ? state.Auth.token : "");

    const [err, setErr] = useState(false);

    const [mess, setMess] = useState();

    const schema = yup.object().shape({
        oldPassword: yup.string().required(),
        newPassword: yup.string().required(),
        confirmPassword: yup.string().required()
    }).required();

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });

    const submitFormProfile = (data) => {
        if (data.newPassword !== data.confirmPassword) {
            setErr(true);
            setMess("");
        } else {
            axios.put(`https://pbl6-backend.herokuapp.com/api/users/password`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(() => {
                    swal("Password change successful!", "Click ok to go back!", "success");
                    reset();
                })
                .catch(err => {
                    setMess(err.response.data.message);
                    setErr(true);
                })
        }
    }

    return (
        <div className="mt-4 px-12">
            <form className="mt-4 p-8 shadow-md bg-white rounded" onSubmit={handleSubmit(submitFormProfile)}>
                <div>
                    <p className="font-medium">Current Password</p>
                    <input className="focus:ring-indigo-500 focus:border focus:border-indigo-500 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                        autoComplete="off"
                        type="password"
                        {...register("oldPassword", { onChange: () => setErr(false) })}
                    />
                    {errors.oldPassword && <p className="text-sm text-red-600 ml-2 tracking-tighter font-semibold">Current Password is a required field</p>}
                </div>

                <div className="mt-6">
                    <p className="font-medium">New Password</p>
                    <input className="focus:ring-indigo-500 focus:border focus:border-indigo-500 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                        autoComplete="off"
                        type="password"
                        {...register("newPassword", { onChange: () => setErr(false) })}
                    />
                    {errors.newPassword && <p className="text-sm text-red-600 ml-2 tracking-tighter font-semibold">New Password is a required field</p>}

                </div>

                <div className="mt-6">
                    <p className="font-medium">Retype New Password</p>
                    <input className="focus:ring-indigo-500 focus:border focus:border-indigo-500 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                        autoComplete="off"
                        type="password"
                        {...register("confirmPassword", { onChange: () => setErr(false) })}
                    />
                    {errors.confirmPassword && <p className="text-sm text-red-600 ml-2 tracking-tighter font-semibold">Retype New Password is a required field</p>}
                </div>
                {err && <p className="text-sm text-red-600 ml-2 tracking-tighter font-semibold">{mess}</p>}

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

export default ChangePassword;