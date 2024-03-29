import React from 'react';
import { useEffect, useState, useCallback } from 'react';
import {getPet, getPetImage} from '../../api/pets.js';
import "./style.css"
import placeholder from "../../assets/images/pet_placeholder.jpg";
export const url = 'http://localhost:8000'

const PetIntro = ({id, authToken}) => {
    const [data, setData] = useState();
    const [images, setImages] = useState([]);

    const getData = useCallback(async () => {
        const data = await getPet(id, authToken);
        const images = await getPetImage(id, authToken);
        console.log('Data:', data);
        console.log('Images:', images);
        setData(data)
        setImages(images)
        if (images === "This pet has no images.") {
            setImages([undefined])
          } else {
          setImages(images)
        }
    }, [id])

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
        <div id="pet-intro" className="container teal rounded-item p-5 mt-2 d-flex flex-column">
            <div className="row">
                <div className="col-12 col-sm">
                    {images.length > 0 && (
                        <img className="rounded-circle w-75" 
                        src={images[0] !== undefined?images[0].image:placeholder} 
                        alt="Pet Image" />
                    )}
                    </div>
                <div className="col-12 col-sm-8 ml-4">
                    <h1 className="text-white heading-slab">Meet {data?.name}</h1>
                    <p className="important-p text-white my-4">{data?.description}</p>
                    <a className="button-fill text-center" id="apply" href={'/adopt/' + data?.id}>Apply to Adopt</a>
                </div>
            </div>
        </div>
    );
};

export default PetIntro;