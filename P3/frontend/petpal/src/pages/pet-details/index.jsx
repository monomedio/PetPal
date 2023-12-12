import React from "react";
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from "../../components/navbar";
import PetCarousel from "../../components/PetCarousel";
import PetIntro from "../../components/PetIntro";
import PetInfoBox from "../../components/PetInfoBox";
import { useMediaQuery } from 'react-responsive';

export const url = 'http://localhost:8000'

export default function PetDetails() {
    const { id } = useParams();
    const authToken = localStorage.getItem('authToken');

    // const isSmallScreen = useMediaQuery({ query: '(max-width: 576px)' });
    // const isLargeScreen = useMediaQuery({ query: '(min-width: 577px)' });
    
    return (
        <div>
            <NavBar />
            <PetIntro id={id} authToken={authToken}/>
            {/* {isSmallScreen && <PetCarousel id={id} authToken={authToken} variant="sm" />}
            {isLargeScreen && <PetCarousel id={id} authToken={authToken} variant="lg" />} */}

            <PetCarousel id={id} authToken={authToken} variant="sm" />
            <PetCarousel id={id} authToken={authToken} variant="lg" />
            <PetInfoBox id={id} authToken={authToken}/>
        </div>
    )
}