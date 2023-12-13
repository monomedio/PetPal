import React from "react";
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from "../../components/navbar";
import PetCarousel from "../../components/PetCarousel";
import PetIntro from "../../components/PetIntro";
import PetInfoBox from "../../components/PetInfoBox";
import Footer from "../../components/footer";

export const url = 'http://localhost:8000'

export default function PetDetails() {
    const { id } = useParams();
    const authToken = localStorage.getItem('authToken');

    
    return (
        <div>
            <NavBar />
            <PetIntro id={id} authToken={authToken}/>
            <PetCarousel id={id} authToken={authToken} variant="sm" />
            <PetCarousel id={id} authToken={authToken} variant="lg" />
            <PetInfoBox id={id} authToken={authToken}/>
            <Footer />
        </div>
    )
}