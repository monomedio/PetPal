import React from 'react';
import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {getPet, getPetImage} from '../../api/pets.js';
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


        return (

            <div id="pet-details" className="d-flex flex-column container text-black light-yellow-box mb-4">
                <h1 className="text-black heading-slab mb-3 text-center">More Pet Information:</h1>

                <div className="row m-2">
                    <div className="col important-p text-black">
                        <p className="text-black">Breed: {data?.breed}</p>
                        <p className="text-black">Sex: {data?.gender} </p>
                        <p className="text-black">Colour: {data?.color}</p>
                        <p className="text-black">Age: {data?.age} years</p>
                        <p className="text-black">Size: {data?.size} kg</p>
                    </div>
                    <div className="col important-p text-black">
                        <div className="d-flex">
                            <div className="important-p">Shelter:</div>
                            <a className="important-p text-black" href="../pages/shelter-detail-page.html"> {data?.shelter?.user.shelter_name}</a>
                        </div>
                        <p></p>
                        <p className="text-black">Address: {data?.shelter?.address}</p>
                        <p className="text-black">Contact:</p>
                        <p className="text-black">Date Published: {data?.created_at}</p>
                        <div className="justify-content-right">
                            <img className="mx-auto" src="../src/assets/images/dark-yellow-pawprint.svg" alt=""></img>
                        </div>
                    </div>
                    <div className="text-center">
                        <a className="button-fill text-center" id="apply" href={'/adopt/' + data?.id}>Apply to Adopt</a>
                    </div>
                </div>
            </div>
        );
};

export default PetInfoBox;