import React from "react";
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from "../../components/navbar";
import PetCarousel from "../../components/pet-carousel";

export default function PetDetails() {
    const { id } = useParams();

    return (
        <div>
            <NavBar />
            <h1>Pet Details</h1>
            <PetCarousel targetId={id} variant="sm" />
            <PetCarousel targetId={id} variant="lg" />
        </div>
    )
}