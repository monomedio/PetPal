import React from "react";
import { useParams } from 'react-router-dom';
import NavBar from "../../components/navbar";
import ShelterDescription from "../../components/ShelterDescription";
import ListingCarousel from "../../components/ListingCarousel";
import Reviews from "../../components/Reviews";
import Footer from "../../components/footer";

export const url = 'http://localhost:8000'

export default function ShelterDetails() {
    const { id } = useParams();
    const authToken = localStorage.getItem('authToken');

    return (
        <div>
            <NavBar />
            <ShelterDescription id={id} authToken={authToken}/>
            <ListingCarousel id={id} authToken={authToken}/>
            <Reviews id={id} authToken={authToken}/>
            <Footer />
        </div>
    )
}