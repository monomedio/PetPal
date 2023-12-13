import React from 'react';
import { useEffect, useState, useCallback } from 'react';
import {getShelterReviews} from '../../api/shelter-info.js';
import ReviewCard from '../ReviewCard';
import "./style.css"
export const url = 'http://localhost:8000'

const Reviews = ({id, authToken}) => {
    const [shelterData, setShelterData] = useState();
    const [reviewsList, setReviewsList] = useState();

    const getData = useCallback(async () => {
        try {
            const reviewsList = await getShelterReviews(id, authToken);
            setReviewsList(reviewsList?.results);
            console.log(`Reviews: ${reviewsList?.results}`);
            console.log(`Review: ${reviewsList?.results[0].commenter}`);
    
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, [id]);


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
        <>
        <div id="reviews" class="light-blue my-md-auto mt-md-3 pb-3">
        <div class="text-center mt-4">
            <h1 class="text-black heading-slab">Reviews:</h1>
        </div>
        <div class="row mt-md-3  px-2">
            {reviewsList?.map((review, index) => (
                <div class="col-12 col-md-6 col-lg-4">
                <div key={index} className="mb-3">
                <ReviewCard
                    name={review.commenter}
                    rating={review.rating}
                    body={review.body}
                    repliesCount={review.repliesCount}
                />
                </div>
                </div>
            ))}
        </div>
        </div>
      </>
    );
};

export default Reviews;