import React from 'react';
import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {getShelter} from '../../api/shelter-info.js';
import star from "../../assets/images/yellow-star.svg";
import pfp from "../../assets/images/pfp-placeholder.png";

import "./style.css"
export const url = 'http://localhost:8000'

const ReviewCard = ({name, rating, body, repliesCount}) => {

    useEffect(() => {
        const script = document.createElement('script');
      
        script.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js";
        script.async = true;
        script.integrity = "sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+";
        script.crossOrigin = "anonymous";
      
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
    }, []);

    const renderStars = () => {
        const stars = [];
        for (let i = 0; i < rating; i++) {
          stars.push(<img key={i} className="img-fluid" src={star} alt={`Star ${i + 1}`} />);
        }
        return stars;
    };

    return (
        <div className="card mx-1">
          <div className="card-body">
            <div className="row">
              <div className="col-12 col-md-4">
                <img className="rounded-item-circle" src={pfp} alt='profile pic' />
              </div>
              <div className="col-8">
                <p className="d-flex justify-content-left body-bold m-2 text-black">Reviewer: {name}</p>
                <div className="d-flex justify-content-left">{renderStars()}</div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 mt-3">
                <p className="important-p text-left text-black">{body}</p>
                <a className="teal-text" href={`#replies-${name}`}>View Replies ({repliesCount})</a>
              </div>
            </div>
            <form id={`replies-${name}`}>
              {}
            </form>
          </div>
        </div>
      );
};

export default ReviewCard;