import React from 'react';
import { useEffect } from 'react';
import NavBar from "../../components/navbar";
import Footer from "../../components/footer";
import seeker from "../../assets/images/sign-up-seeker.png";
import shelter from "../../assets/images/sign-up-shelter.png";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./style.css";

const SignUp = () => {

    useEffect(() => {
        const script = document.createElement('script');
      
        script.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js";
        script.async = true;
        script.integrity = "sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+";
        script.crossOrigin = "anonymous";
      
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
    }, []);

    return (
        <>
        <NavBar />
        <div className="container d-flex flex-column">
            <div className="row ">
            <div className=" col-md-6 mt-3">
                <div className="container light-blue rounded-item py-5 text-center d-flex flex-column">
                <div className="row">
                    <div className="col-md-12">
                    <p className="text-black">Sign up as a</p>
                    <h2>Pet Seeker</h2>
                    <p className="text-black">View available pets and apply to adopt.</p>
                    </div>
                </div>

                <div className="row">
                    <div className="col d-flex flex-column">
                    <img
                        className="mx-auto mt-md-4"
                        src={seeker}
                        alt="cat"
                        width="400px"
                    />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12 mt-4">
                    <Link to={`/signup-seeker`}>
                        <a className="button-fill" href="">
                            Sign up as a pet seeker
                        </a>
                    </Link>
                    </div>
                </div>
                </div>
            </div>

            <div className=" col-md-6 mt-3">
                <div className="container yellow rounded-item py-5 text-center d-flex flex-column">
                <div className="row">
                    <div className="col-md-12">
                    <p className="text-black">Sign up as a</p>
                    <h2>Pet Seeker</h2>
                    <p className="text-black">Partner with PetPal and list available pets for adoption.</p>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                    <img
                        className="mx-auto mt-md-4"
                        src={shelter}
                        alt="cats"
                        width="400px"
                    />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12 mt-4">
                    <Link to={`/signup-seeker`}>
                        <a className="button-fill" href="">
                            Sign up as a pet shelter
                        </a>
                    </Link>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        <Footer />
        </>
    );
    };

export default SignUp;