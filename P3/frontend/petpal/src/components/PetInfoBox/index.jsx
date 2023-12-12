import React from 'react';
import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {getPet, getPetImage} from '../../api/pet-info.js';
import "./style.css"
export const url = 'http://localhost:8000'

const PetInfoBox = ({id, authToken}) => {
    const [data, setData] = useState();

    const getData = useCallback(async () => {
        const data = await getPet(id, authToken);
        console.log('Data:', data);
        setData(data)
    }, [id])

    useEffect(() => {
        // Run script on component mount
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
            <div id="pet-details" className="container light-yellow-box mb-4">
                <h1 className="text-black heading-slab mb-3 text-center">More Pet Information:</h1>

                <div className="row">
                    <div className="col important-p text-black">
                        <p>Breed: {data?.breed}</p>
                        <p>Sex: {data?.gender} </p>
                        <p>Colour: {data?.color}</p>
                        <p>Age: {data?.age} years</p>
                        <p>Size: {data?.size} kg</p>
                    </div>
                    <div className="col important-p text-black">
                        <div className="d-flex">
                            <div className="important-p">Shelter:</div>
                            <a className="important-p teal-text" href="../pages/shelter-detail-page.html"> {data?.shelter?.shelter_name}</a>
                        </div>
                        <p></p>
                        <p>Address: {data?.shelter?.address}</p>
                        <p>Contact:</p>
                        <p>Date Published: {data?.created_at}</p>
                        <div className="justify-content-right">
                            <img className="mx-auto" src="../assets/images/dark-yellow-pawprint.svg" alt=""></img>
                        </div>
                    </div>
                    <div className="text-center">
                        <a className="button-fill text-center" id="apply" href="./adopt.html">Apply to Adopt</a>
                    </div>
                </div>
            </div>
        );
};

export default PetInfoBox;