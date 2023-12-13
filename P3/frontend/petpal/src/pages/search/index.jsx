import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import NavBar from "../../components/navbar";
import Footer from "../../components/footer";
import placeholder from "../../assets/images/pet_placeholder.jpg";
import profile_pic from "../../assets/images/among-us.jpeg";
import "./style.css";
import { getAllPets } from "../../api/pets";
import moment from 'moment';

export default function Search() {
    const { pet_id } = useParams();
    const authToken = localStorage.getItem('authToken');

    // pets.results to access list of pet objects
    const [pets, setPets] = useState();

    async function fetchPets() {
        try {
            const res = await getAllPets(authToken);
            setPets(res);
            console.log('Pets fetched:', res);
            console.log('Authtoken:', authToken);
        } catch (error) {
            console.error('Fetch pets error:', error.message);
        }
    };
    
    useEffect( () => {
        fetchPets();
    }, []);

    // fetchPets(); 

    return (
        <body class="light-blue">
        <NavBar />
        <div class="d-flex flex-column my-3 justify-content-center container white rounded-item">
            <div class="search-container px-3">
            <span class="search-title">Find your new best friend</span>
            <form
                action="./search-result.html"
                method="GET"
                class="text-center mt-2"
            >
                <div class="input-group mb-3">
                <input
                    id="search-bar"
                    type="text"
                    class="form-control search-input"
                    placeholder="Search Labrador, Kitten, etc."
                    aria-label="Search for an animal..."
                    aria-describedby="search-button"
                />
                <button
                    class="btn btn-primary search-btn"
                    type="submit"
                    id="search-button"
                >
                    Search
                </button>
                </div>
            </form>
            </div>
            <div class="d-flex flex-column justify-content-center container w-100">
            <div class="row mb-3">
                <span class="available-nearby-title"
                >Pets Available for Adoption Nearby</span>
            </div>
            <div class="row">
                {pets === undefined ?
                    <div class="m-3">There are no pets currently available.</div>
                :
                pets.results.map((data) => (
                    <div
                    class="col-12 col-md-6 col-lg-4 col-xxl-3 mb-4 d-flex justify-content-center"
                    >
                    <a href={'/pets/' + data.id}>
                        <div class="card pet-card">
                        <img
                            src={data.image? data.image : placeholder}
                            class="pet-card-img"
                            alt="..."
                        />
                        
                        <div class="card-body">
                            <h5 class="card-title">{data.name}</h5>
                            <p class="card-text">{data.description}</p>
                            <p class="card-text">
                            <i class="bi bi-geo-alt-fill me-3">{data.location}</i>
                            </p>
                            {data.status === "available"? 
                                <p class="teal rounded-item px-3 m-0 me-3">
                                    {data.status.charAt(0).toUpperCase() + data.status.slice(1)}</p>:
                                <p class="grey rounded-item px-3 m-0 me-3">
                                    {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
                                </p>
                            }
                            <p class="card-text">
                            <small class="text-body-secondary"
                                >Last updated {moment(new Date(data.updated_at)).fromNow()}</small>
                            </p>
                        </div>
                        </div>
                    </a>
                    </div>
                ))}
                </div>
            </div>
        </div>
        <Footer />
        </body>
    )
}