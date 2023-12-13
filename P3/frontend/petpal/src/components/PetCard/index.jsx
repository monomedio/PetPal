import React from 'react';
import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
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
                                src={images[0]?.image} />
                        </div>
                        <div class="col-6 text-center">
                            <div class="card-body">
                                <div class="d-flex justify-content-center mt-5">
                                    <p class="body-bold m-0 text-black">Name: &nbsp;</p>
                                    <p class="important-p m-0 text-black">{data?.name}</p>
                                </div>
                                <div class="d-flex justify-content-center">
                                    <p class="body-bold m-0 text-black">Gender:&nbsp;</p>
                                    <p class="important-p m-0 text-black">{data?.gender}</p>
                                </div>
                                <div class="d-flex justify-content-center">
                                    <p class="body-bold m-0 text-black">Breed:&nbsp;</p>
                                    <p class="important-p m-0 text-black">{data?.breed}</p>
                                </div>
                                <div class="d-flex justify-content-center">
                                    <p class="body-bold m-0 text-black">Age:&nbsp;</p>
                                    <p class="important-p m-0 text-black">{data?.age}</p>
                                </div>
                                <div class="d-flex justify-content-center">
                                    <p class="body-bold m-0 text-black">Status:&nbsp;</p>
                                    <p class="important-p m-0 text-black">{data?.status}</p>
                                </div>
                                <br></br>
                                <Link to={`/pets/${id}`}>
                                    <a href="" class="button-fill">Learn More</a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PetCard;