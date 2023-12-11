import React from 'react';
import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {getPet, getPetImage} from '../../api/pet-info.js';
import "./style.css"
export const url = 'http://localhost:8000'

function PetCarousel() {
    const [data, setData] = useState();
    const [images, setImages] = useState();
    const { id } = useParams();


    const getData = useCallback(async () => {
        const data = await getPet(id);
        const images = await getPetImage(id);
        console.log('Data:', data);
        console.log('Images:', images);
        setData(data)
        setImages(images)
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
            images && images.length > 0 && (
            <div className="carousel-inner">
                {images.map((image, index) => (
                <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                    <div className="col-12 row">
                    <div className="col carousel-img">
                        <img src={image.image} className="d-block w-100" alt={`Pet Picture ${index + 1}`} />
                    </div>
                    </div>
                </div>
                ))}
            </div>
            )
        );
};

export default PetCarousel;