import React from "react";
import NavBar from "../../components/navbar";
import PetCarousel from "../../components/pet-carousel";

export default function PetDetails() {
    return (
        <div>
            <NavBar />
            <h1>Pet Details</h1>
            <PetCarousel />
        </div>
    )
}