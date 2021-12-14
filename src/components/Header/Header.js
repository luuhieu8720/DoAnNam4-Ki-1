import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import './Header.scss';
import faceMask from '../../image/face-mask.png';
import { Link } from 'react-router-dom';
import { onLogout } from '../Auth/reducers/Auth';

function Header(props) {

    const location = useLocation().pathname;

    const dispatch = useDispatch();

    const firstName = useSelector(auth => auth.Auth ? auth.Auth.firstName : "");

    const lastName = useSelector(auth => auth.Auth ? auth.Auth.lastName : "");

    const role = useSelector(auth => auth.Auth ? auth.Auth.role : 1);

    const [dropdownUser, setDropdownUser] = useState(false);

    const [changeClass, setChangeClass] = useState(false);

    const ScrollChangeClass = () => {
        window.scrollY > 10 ? setChangeClass(true) : setChangeClass(false);
    }

    useEffect(() => {
        // adding the event when scroll change background
        window.addEventListener("scroll", ScrollChangeClass)
    })

    return (
        <div className="header" >
            <div className={`header__container ${changeClass ?"bg-white shadow" : ""} ${location !== "/" && "bg-white shadow"}`}>
                <nav className="navigation">
                    <Link to="/" className="logo">
                        <img
                            src={faceMask}
                            alt=""
                            className="h-12 w-12 mr-2"
                        />
                        <p className="logo__text tracking-widest">FMD</p>
                    </Link>

                    <div className="navigation__container">
                        <ul className="navigation__list">
                            <li className="navigation__item">
                                <Link to="/">Home</Link>
                            </li>
                            <li className="navigation__item">
                                <Link to="/webcam">Stream</Link>
                            </li>
                            <li className="navigation__item">
                                <Link to="/upload-image">Take a photo</Link>
                            </li>

                            {(firstName === "" || typeof firstName === "undefined") ?
                                <li className="navigation__group">
                                    <Link to="/signup" className="button button--action">Sign up</Link>
                                    <Link to="/signin" className="button">Sign in</Link>
                                </li> :

                                <li className="relative navigation__group">
                                    <div onClick={() => setDropdownUser(!dropdownUser)}>
                                        <div className="cursor-pointer flex items-center rounded w-full px-4 py-2 text-xl font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" id="menu-button" aria-expanded="true" aria-haspopup="true">
                                            <p>{`${firstName} ${lastName}`}</p>
                                            <svg className="-mr-1 ml-2 h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" aria-hidden="true">
                                                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                            </svg>
                                        </div>
                                    </div>

                                    {dropdownUser && <div className="z-10 origin-top-right absolute right-0 mt-12 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="divide-y divide-fuchsia-300" role="none">
                                            <Link
                                                to="/account-setting"
                                                className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 transition duration-300 ease-in-out text-base"
                                                onClick={() => setDropdownUser(false)}
                                            >
                                                <i className="fas fa-user-cog w-1/5"></i>
                                                <span>Account setting</span>
                                            </Link>
                                            {
                                                role !== 1 &&
                                                <Link
                                                    to="/admin/user-management"
                                                    className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 transition duration-300 text-base ease-in-out"
                                                    onClick={() => setDropdownUser(false)}
                                                >
                                                    <i className="fas fa-users-cog w-1/5"></i>
                                                    <span>User management</span>
                                                </Link>
                                            }
                                             {
                                                role !== 1 &&
                                                <Link
                                                    to="/admin/violator-management"
                                                    className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 transition duration-300 text-base ease-in-out"
                                                    onClick={() => setDropdownUser(false)}
                                                >
                                                    <i className="fas fa-images w-1/5"></i>
                                                    <span>Violator Management</span>
                                                </Link>
                                            }
                                            <button
                                                className="text-gray-700 w-full rounded-b-md text-left px-4 py-2 text-sm hover:bg-gray-100 transition duration-300 ease-in-out text-base"
                                                onClick={() => {
                                                    dispatch(onLogout());
                                                    setDropdownUser(false);
                                                }}
                                            >
                                                <i class="fas fa-sign-out-alt w-1/5"></i>
                                                <span>Sign out</span>
                                            </button>
                                        </div>
                                    </div>}
                                </li>}
                        </ul>
                    </div>
                </nav>
            </div>

            {/* {location === "/" &&
                <section className="header-content">
                    <div className="header-content__container wrapper">
                        <div className="header-content__inner">
                            <h1 className="header-content__caption">
                                Face Mask Detection
                            </h1>
                            <h2 className="header-content__title">
                                Introduction: Technology to recognize people wearing masks
                            </h2>
                            <p className="header-content__text">
                                The problem is reverse engineering of face detection where the face is detected
                                using different machine learning algorithms for the purpose of security, authentication and surveillance.
                            </p>
                            <p className="header-content-button header-content-button__blue">
                                <span className="button_text">Try it yourself</span>
                                <img src={arrow} alt="" />
                            </p>
                        </div>

                        <div className="header-content__image">
                            <img className="image" src={fmd} loading="lazy" width="100%" height="auto" alt="Sumsub Liveness Solution" />
                        </div>
                    </div>
                </section>
            } */}
        </div>

    );
}

export default Header;