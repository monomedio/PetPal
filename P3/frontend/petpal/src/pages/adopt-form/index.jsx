import React, { useState, useCallback, useEffect } from "react";
import { useParams } from 'react-router-dom';
import NavBar from "../../components/navbar";
import Footer from "../../components/footer";
import shelter_pic from "../../assets/images/shelter-images/toronto-humane-society.png";
import profile_pic from "../../assets/images/among-us.jpeg";
import "./style.css";
import placeholder from "../../assets/images/pet_placeholder.jpg";
import { getPet, getPetImage } from "../../api/pets";
import { createApplication } from "../../api/applications";
import { createComment } from "../../api/comments";

export default function AdoptForm() {
    const { pet_id } = useParams();
    const authToken = localStorage.getItem('authToken');
    const [data, setData] = useState();
    const [userData, setUserData] = useState();
    const [images, setImages] = useState([]);
    const [message, setMessage] = useState('');

    const getData = useCallback(async () => {
        const data = await getPet(pet_id, authToken);
        const images = await getPetImage(pet_id, authToken);
        // const user = await getUser(authToken);
        console.log('Data:', data);
        console.log('Images:', images);
        setData(data)
        setImages(images)
        if (images === "This pet has no images.") {
            setImages([undefined])
          } else {
          setImages(images)
        }
    }, [pet_id])

    useEffect(() => {
        getData();
    }, [getData]);

    const submitApplication = async () => {
        try {
            const application = await createApplication(pet_id, authToken);
            console.log('Application created:', application);
            const comment = await createComment(application.id, message, authToken);
            console.log('Comment created:', comment);
          } catch (error) {
            console.error('Submit application error:', error.message);
          }
        };    

    return (
        <body class="light-blue">
        <NavBar />
        <div class="my-3 container white rounded-item p-0 width-50">
        <form
          action="/applications/"
          class="edit-profile-container d-flex justify-content-center p-4 container flex-column"
        >
          <div class="text-center">
            <h2 class="mt-0">Apply To Adopt {data?.name}</h2>
          </div>
          <div class="d-flex justify-content-center">
            <img
              src={images[0] !== undefined?images[0].image:placeholder} 
              class="rounded-circle w-25 mb-3"
              alt="Profile Photo"
            />
          </div>
          <div class="row mt-3">
            <div class="col-6 mb-3">
              <label for="InputFirstName" class="form-label">First name*</label>
              <input
                type="text"
                class="form-control"
                id="InputFirstName"
                value="Anisha"
                aria-describedby="firstNameHelp"
                required
              />
            </div>
            <div class="col-6 mb-3">
              <label for="InputLastName" class="form-label">Last name*</label>
              <input
                type="text"
                class="form-control"
                id="InputLastName"
                value="Latchman"
                aria-describedby="LastNameHelp"
                required
              />
            </div>
          </div>
          <div class="row">
            <div class="col-6 mb-3">
              <label for="InputEmail" class="form-label">Email address*</label>
              <input
                type="email"
                class="form-control"
                id="InputEmail"
                value="anisha.latchman@utoronto.ca"
                aria-describedby="emailHelp"
                required
              />
            </div>
            <div class="col-6 mb-3">
              <label for="InputPhoneNumber" class="form-label"
                >Phone number*</label>
              <input
                type="tel"
                class="form-control"
                id="InputPhoneNumber"
                value="+1 (123) 456-7890"
                aria-describedby="phoneHelp"
                required
              />
            </div>
          </div>

          <div class="mb-3">
            <label for="InputAddress" class="form-label">Address*</label>
            <input
              type="text"
              class="form-control"
              id="InputAddress"
              placeholder="123 Street, City, PROV, POSTAL CODE"
              aria-describedby="AddressHelp"
              required
            />
          </div>

          <div class="mb-3">
            <label for="InputMessage" class="form-label"
              >Message to Shelter*</label>
            <textarea
              class="form-control"
              id="InputMessage"
              placeholder={"Hi, I am interested in adopting " + data?.name}
              aria-describedby="MessageHelp"
              rows="4"
              required
              onChange={e => setMessage(e.target.value)}
            ></textarea>
          </div>

          <a
            type="submit"
            class="button-fill text-center"
            href="/applications/"
            onClick={() => {submitApplication()}}
            >Submit</a>
        </form>
      </div>
        <Footer />
        </body>
    )
}