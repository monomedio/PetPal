import React, { useState, useCallback, useEffect } from "react";
import { useParams } from 'react-router-dom';
import NavBar from "../../components/navbar";
import Footer from "../../components/footer";
import duoduo from "../../assets/images/duoduo/duoduo1.jpg";
import fluffy from "../../assets/images/duoduo/duoduo2.jpg";
import shelter_pic from "../../assets/images/shelter-images/toronto-humane-society.png";
import profile_pic from "../../assets/images/among-us.jpeg";
import placeholder from "../../assets/images/pet_placeholder.jpg";
import "./style.css";
import { getAllApplications } from "../../api/applications";

export default function Applications() {
    const { pet_id } = useParams();
    const authToken = localStorage.getItem('authToken');

    // applications.results for objects array
    const [applications, setApplications] = useState();
    const [curr_application, setCurrApplication] = useState();

    const fetchApplications = useCallback(async () => {
      try {
        const res = await getAllApplications(authToken);
        setApplications(res.results);
        if (res.results.length > 0) {
            setCurrApplication(res.results[0]);
        }
        console.log('Applications fetched:', res);
      } catch (error) {
        console.error('Fetch applications error:', error.message);
      }
    });

    useEffect(() => {
        fetchApplications();
    }, []);

    return (
        <body class="light-blue">
        <NavBar />
        <div class="my-3 container white rounded-item p-0">
            <div class="row">
                <div class="col-12 col-md-3 light-orange h-120 p-0">
                    <h3 class="ms-3">All Applications</h3>
                    {curr_application === undefined ?
                        <div class="m-3">You don't have any applications.</div>
                    :
                    // applications.map((data) => (
                        <a href="./applications.html">
                            <div class="orange d-flex align-items-center w-100">
                                <img
                                src={placeholder}
                                alt="Profile pic"
                                class="rounded-circle m-2"
                                width="50px"
                                height="50px"
                                />
                                <p class="text-black m-0">Application for Linda</p>
                            </div>
                        </a>
                    // ))
                    }
                </div>
                <div class="col-12 col-md-9 h-100 p-0">
                    {curr_application === undefined ?
                        <>
                        <h3 class="m-3">No Applications Yet</h3>
                        <p class="text-black m-3">Search pets to get started with an applications.</p>
                        </>
                        :
                        <>
                            <div class="d-flex w-100 align-items-center border-bottom">
                            <img
                                src={duoduo}
                                alt="Profile pic"
                                class="rounded-circle m-3"
                                width="100px"
                                height="100px"
                            />
                            <div>
                                <h3 class="mt-0">Application For Duo Duo</h3>
                                <div class="d-flex">
                                <p class="teal rounded-item px-3 m-0 me-3">Pending</p>
                                <p class="text-black m-0">Submitted on 10/10/2023</p>
                                </div>
                            </div>
                            </div>
                            <div class="d-flex w-100 align-items-center border-bottom grey">
                            <p class="text-black m-3"><b>Name:</b> Anisha Latchman</p>
                            <p class="text-black m-3">
                                <b>Email:</b> anisha.latchman@utoronto.ca
                            </p>
                            <p class="text-black m-3"><b>Phone:</b> +1 (123) 456-7890</p>
                            <p class="text-black m-3">
                                <b>Address:</b> 123 Street, City, PROV, POSTAL
                            </p>
                            </div>
                            <div class="d-flex w-100 align-items-center border-bottom grey">
                            <p class="text-black m-3">
                                <b>Message:</b> Hi, I am interested in adopting Duo Duo. I have
                                2 years of experience with cats and I live in a high-rise
                                apartment.
                            </p>
                            </div>
                            <h3 class="ms-4">Chat</h3>
                            <div class="container chat-container">
                            <div>
                                <div class="d-flex w-100 align-items-center">
                                <img
                                    src={shelter_pic}
                                    alt="Profile pic"
                                    class="rounded-circle ms-3"
                                    width="40px"
                                    height="40px"
                                />
                                <p class="chat-msg ms-2">Hello! Nice to meet you!</p>
                                </div>
                                <p class="chat-sent-name left">Humane Society</p>
                            </div>
                            <div>
                                <div
                                class="d-flex w-100 align-items-center justify-content-end"
                                >
                                <p class="chat-msg ms-2">You as well. Duo Duo is adorable.</p>
                                <img
                                    src={profile_pic}
                                    alt="Profile pic"
                                    class="rounded-circle ms-3"
                                    width="40px"
                                    height="40px"/>
                                </div>
                                <p class="text-end chat-sent-name right">You</p>
                            </div>
                            <div
                                class="d-flex justify-content-center align-items-center my-3">
                                <input
                                type="text"
                                id="chat-message"
                                name="message"
                                class="msg-bar p-2 me-2"
                                placeholder="Type your message here"
                                required
                                />
                                <a class="button-fill" href="/">Send</a>
                            </div>
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
        <Footer />
        </body>
    )
}