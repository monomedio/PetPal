import React from 'react';
import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {getShelter} from '../../api/shelter-info.js';
import {getPet, getPetImage} from '../../api/pets.js';
import "./style.css"
export const url = 'http://localhost:8000'

const PetCard = ({id, authToken}) => {
    const [data, setData] = useState();
    const [images, setImages] = useState([]);

    const getData = useCallback(async () => {
        const data = await getPet(id, authToken);
        const images = await getPetImage(id, authToken);
        console.log('Data:', data);
        console.log('Images:', images);
        setData(data)
        setImages(images)
    }, [id])

    useEffect(() => {
        const script = document.createElement('script');
      
        script.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js";
        script.async = true;
        script.integrity = "sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+";
        script.crossOrigin = "anonymous";
      
        document.body.appendChild(script);
        getData();

        return () => {
            document.body.removeChild(script);
        }
    }, [getData]);

    // {
    //     "charity_id": 1,
    //     "address": "Street1",
    //     "user": {
    //         "is_shelter": true,
    //         "shelter_name": "Shelter1",
    //         "email": "shelter1@shelter1.com",
    //         "phone": "123467890",
    //         "username": "shelter1",
    //         "profile_pic": null
    //     }
    // }

    // {
    //     "id": 1,
    //     "location": "Street1",
    //     "name": "Clifford",
    //     "breed": "Giant Vizsla",
    //     "age": 3,
    //     "size": 21,
    //     "color": "Red",
    //     "gender": "male",
    //     "description": "A big red dog.",
    //     "status": "available",
    //     "created_at": "2023-12-11T07:28:24.033072Z",
    //     "updated_at": "2023-12-11T07:28:24.033072Z"
    // }
    return (
        <div id="listing-cards" class="row mx-sm-3">
            <div class="col-12 h-100">
                <div class="card light-yellow-box border-0">
                    <div class="row g-0">
                        <div class="col-6">
                            <img class="w-100"
                                src="../assets/images/duoduo/duoduo1.jpg" />
                        </div>
                        <div class="col-6 text-center">
                            <div class="card-body">
                                <div class="d-flex justify-content-center mt-5">
                                    <p class="body-bold m-0">Name:&nbsp</p>
                                    <p class="important-p m-0">Duo Duo</p>
                                </div>
                                <div class="d-flex justify-content-center">
                                    <p class="body-bold m-0">Gender:&nbsp</p>
                                    <p class="important-p m-0">Female</p>
                                </div>
                                <div class="d-flex justify-content-center">
                                    <p class="body-bold m-0">Breed:&nbsp</p>
                                    <p class="important-p m-0">Ragamuffin</p>
                                </div>
                                <div class="d-flex justify-content-center">
                                    <p class="body-bold m-0">Age:&nbsp</p>
                                    <p class="important-p m-0">6 years</p>
                                </div>
                                <div class="d-flex justify-content-center">
                                    <p class="body-bold m-0">Status:&nbsp</p>
                                    <p class="important-p m-0">Available</p>
                                </div>
                                <br></br>
                                <a href="..\pages\pet-detail-page.html" class="button-fill">Learn More</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PetCard;