import React from 'react';
import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {getPet, getPetImage} from '../../api/pet-info.js';
import "./style.css"
export const url = 'http://localhost:8000'

const PetCarousel = ({id, authToken, variant}) => {
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

    const generateCarouselItems = () => {
        return images.map((image, index) => (
          <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
            <div className={`col-12 row${variant === 'lg' ? ' ' : '-4'}`}>
              {variant === 'lg' ? (
                images.map((image, i) => (
                  <div key={i} className="col-4 carousel-img">
                    <img src={image.image} className="d-block w-100" alt={`Pet Picture ${i + 1}`} />
                  </div>
                ))
              ) : (
                <div className="col carousel-img">
                  <img src={image.image} className="d-block w-100" alt={`Pet Picture ${index + 1}`} />
                </div>
              )}
            </div>
          </div>
        ));
      };


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
            <div id={id} className={`carousel slide margin-v ${variant === 'lg' ? 'mx-3' : ''}`} data-bs-ride="carousel">
              <div className="carousel-indicators">
                {images && images.length > 0 && images.map((image, index) => (
                    <button
                    key={index}
                    type="button"
                    data-bs-target={`#${id}`}
                    data-bs-slide-to={index}
                    className={index === 0 ? 'active' : ''}
                    aria-label={`Slide ${index + 1}`}
                    ></button>
                ))}
                </div>
              <div className="carousel-inner">
                {generateCarouselItems()}
              </div>
              {variant === 'lg' && (
                <>
                  <button className="carousel-control-prev" type="button" data-bs-target={`#${id}`} data-bs-slide="prev">
                    <img src="../assets/images/left-paw.svg" alt="Previous" />
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button className="carousel-control-next" type="button" data-bs-target={`#${id}`} data-bs-slide="next">
                    <img className="img-fluid" src="../assets/images/right-paw.svg" alt="Next" />
                    <span className="visually-hidden">Next</span>
                  </button>
                </>
              )}
            </div>
          );

        // return (
        //     // Small Carousel
        //     <>
        //     <div id="pet-images-sm" className="carousel slide margin-v" data-bs-ride="carousel">
        //         <div className="carousel-inner">
        //             {images && images.length > 0 && (
        //             <>
        //                 {images.map((image, index) => (
        //                 <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
        //                     <div className="col-12 row">
        //                     <div className="col carousel-img">
        //                         <img src={image.image} className="d-block w-100" alt={`Pet Picture ${index + 1}`} />
        //                     </div>
        //                     </div>
        //                 </div>
        //                 ))}
        //             </>
        //             )}
        //         </div>
        //     </div>

        //     // Big Carousel
        //     <div id={targetId} className={`carousel slide margin-v ${variant === 'lg' ? 'mx-3' : ''}`} data-bs-ride="carousel">
        //         <div className="carousel-indicators">
        //         {images.map((_, index) => (
        //             <button
        //             key={index}
        //             type="button"
        //             data-bs-target={`#${targetId}`}
        //             data-bs-slide-to={index}
        //             className={index === 0 ? 'active' : ''}
        //             aria-label={`Slide ${index + 1}`}
        //             ></button>
        //         ))}
        //         </div>
        //         <div className="carousel-inner">
        //         {images.map((image, index) => (
        //             <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
        //             <div className={`col-12 row${variant === 'lg' ? ' ' : '-4'}`}>
        //                 {variant === 'lg' ? (
        //                 images.map((image, i) => (
        //                     <div key={i} className="col-4 carousel-img">
        //                     <img src={image} className="d-block w-100" alt={`Pet Picture ${i + 1}`} />
        //                     </div>
        //                 ))
        //                 ) : (
        //                 <div className="col carousel-img">
        //                     <img src={image} className="d-block w-100" alt={`Pet Picture ${index + 1}`} />
        //                 </div>
        //                 )}
        //             </div>
        //             </div>
        //         ))}
        //         </div>
        //         {variant === 'lg' && (
        //         <>
        //             <button className="carousel-control-prev" type="button" data-bs-target={`#${targetId}`} data-bs-slide="prev">
        //             <img src="../assets/images/left-paw.svg" alt="Previous" />
        //             <span className="visually-hidden">Previous</span>
        //             </button>
        //             <button className="carousel-control-next" type="button" data-bs-target={`#${targetId}`} data-bs-slide="next">
        //             <img className="img-fluid" src="../assets/images/right-paw.svg" alt="Next" />
        //             <span className="visually-hidden">Next</span>
        //             </button>
        //         </>
        //         )}
        //     </div>
        //   </>
            
        // );
};

export default PetCarousel;