import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import './Header.scss';
import faceMask from '../../image/face-mask.png';
import fmd from '../../image/fmd.png';
import arrow from '../../image/arrow.svg';
import { Link } from 'react-router-dom';

function Header(props) {

    const location = useLocation().pathname;

    return (
        <div className={`header ${location === "/" && "home"}`} >
            <div className={`header__container ${location === "/" ? "" : "bg-white shadow"}`}>
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

                            <li className="navigation__group">
                                <p className="button button--action">Sign up</p>
                                <p className="button">Sign in</p>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>

            {location === "/" &&
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
            }
        </div>

    );
}

export default Header;