import React from 'react';
import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {getPet, getPetImage, getShelterPets} from '../../api/pets.js';
import {getShelter} from '../../api/shelter-info.js';
import PetCard from '../PetCard';
import "./style.css"
export const url = 'http://localhost:8000'

const ListingCarousel = ({id, authToken, variant}) => {
    const [shelterData, setShelterData] = useState();
    const [petsList, setPetsList] = useState();

    const getData = useCallback(async () => {
        try {
            const shelterData = await getShelter(id, authToken);
            setShelterData(shelterData);
            console.log(shelterData);
    
            const petsList = await getShelterPets(id, authToken);
            console.log(petsList.results);
            setPetsList(petsList.results);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, [id]);


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

    return (
        <>
        <div class="text-center mt-4">
            <h1 class="text-black heading-slab">Current Listings:</h1>
        </div>
        <div id="pet-listings-carousel-sm" className="carousel slide my-md-auto mt-md-3 mx-3" data-bs-ride="carousel">
        <div className="carousel-indicators">
            {petsList?.map((pet, index) => (
            <button
                key={index}
                type="button"
                data-bs-target="#pet-listings-carousel-lg"
                data-bs-slide-to={index}
                className={index === 0 ? 'active' : ''}
                aria-current={index === 0 ? 'true' : 'false'}
                aria-label={`Slide ${index + 1}`}
            ></button>
            ))}
        </div>
        <div className="carousel-inner ml-3">
            {petsList?.map((pet, index) => (
            <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                <div className="col-12 row">
                <PetCard id={index + 1} authToken={authToken}/>
                </div>
            </div>
            ))}
        </div>
        </div>
        <div id="pet-listings-carousel-lg" className="carousel slide my-md-auto mt-md-3 mx-3" data-bs-ride="carousel">
        <div className="carousel-indicators">
            {petsList?.map((pet, index) => (
            <button
                key={index}
                type="button"
                data-bs-target="#pet-listings-carousel-lg"
                data-bs-slide-to={index}
                className={index === 0 ? 'active' : ''}
                aria-current={index === 0 ? 'true' : 'false'}
                aria-label={`Slide ${index + 1}`}
            ></button>
            ))}
        </div>
        <div className="carousel-inner ml-3">
            {petsList?.map((pet, index) => (
            <div key={index} className={`carousel-item ${index % 3 === 0 ? 'active' : ''}`}>
                <div className="col-12 row">
                {[0, 1, 2].map(innerIndex => (
                    <div key={innerIndex} className="col-4">
                    <PetCard id={(index + innerIndex) % petsList.length + 1} authToken={authToken} />
                    </div>
                ))}
                </div>
            </div>
            ))}
        </div>
        </div>
      </>
    );
};

export default ListingCarousel;