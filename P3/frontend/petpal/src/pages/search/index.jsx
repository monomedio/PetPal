import React from "react";
import NavBar from "../../components/navbar";
import Footer from "../../components/footer";
import duoduo from "../../assets/images/duoduo/duoduo1.jpg";
import rodney from "../../assets/images/rodney.jpeg"
import babybara from "../../assets/images/babybara.JPG";
import profile_pic from "../../assets/images/among-us.jpeg";
import "./style.css";

export default function Search() {

    return (
        <body class="light-blue">
        <NavBar />
        <div class="d-flex flex-column my-3 justify-content-center container white rounded-item">
            <div class="search-container px-3">
            <span class="search-title">Find your new best friend</span>
            <form
                action="./search-result.html"
                method="GET"
                class="text-center mt-2"
            >
                <div class="input-group mb-3">
                <input
                    id="search-bar"
                    type="text"
                    class="form-control search-input"
                    placeholder="Search Labrador, Kitten, etc."
                    aria-label="Search for an animal..."
                    aria-describedby="search-button"
                />
                <button
                    class="btn btn-primary search-btn"
                    type="submit"
                    id="search-button"
                >
                    Search
                </button>
                </div>
            </form>
            </div>
            <div class="d-flex flex-column justify-content-center container w-100">
            <div class="row mb-3">
                <span class="available-nearby-title"
                >Pets Available for Adoption Nearby</span>
            </div>
            <div class="row">
                <div
                class="col-12 col-md-6 col-lg-4 col-xxl-3 mb-4 d-flex justify-content-center"
                >
                <a href="./pet-detail-page.html">
                    <div class="card pet-card">
                    <img
                        src={duoduo}
                        class="pet-card-img"
                        alt="..."
                    />
                    <div class="card-body">
                        <h5 class="card-title">Duo Duo</h5>
                        <p class="card-text">6 years old Ragamuffin</p>
                        <p class="card-text">
                        <i class="bi bi-geo-alt-fill me-3">Toronto, ON</i>
                        </p>
                        <p class="card-text">
                        <small class="text-body-secondary"
                            >Last updated 2 hours ago</small>
                        </p>
                    </div>
                    </div>
                </a>
                </div>
                <div
                class="col-12 col-md-6 col-lg-4 col-xxl-3 mb-4 d-flex justify-content-center"
                >
                <div class="card pet-card">
                    <img
                    src={profile_pic}
                    class="pet-card-img"
                    alt="..."
                    />
                    <div class="card-body">
                    <h5 class="card-title">Among Us</h5>
                    <p class="card-text">3 years old imposter</p>
                    <p class="card-text">
                        <i class="bi bi-geo-alt-fill me-3">Mississauga, ON</i>
                    </p>
                    <p class="card-text">
                        <small class="text-body-secondary"
                        >Last updated 3 mins ago</small>
                    </p>
                    </div>
                </div>
                </div>
                <div
                class="col-12 col-md-6 col-lg-4 col-xxl-3 mb-4 d-flex justify-content-center"
                >
                <div class="card pet-card">
                    <img
                    src={babybara}
                    class="pet-card-img"
                    alt="..."
                    />
                    <div class="card-body">
                    <h5 class="card-title">Babybara</h5>
                    <p class="card-text">2 months old Capybara</p>
                    <p class="card-text">
                        <i class="bi bi-geo-alt-fill me-3">Scarborough, ON</i>
                    </p>
                    <p class="card-text">
                        <small class="text-body-secondary"
                        >Last updated 35 mins ago</small>
                    </p>
                    </div>
                </div>
                </div>
                <div
                class="col-12 col-md-6 col-lg-4 col-xxl-3 mb-4 d-flex justify-content-center"
                >
                <div class="card pet-card">
                    <img
                    src={rodney}
                    class="pet-card-img"
                    alt="..."
                    />
                    <div class="card-body">
                    <h5 class="card-title">Rodney</h5>
                    <p class="card-text">2 months old plushie</p>
                    <p class="card-text">
                        <i class="bi bi-geo-alt-fill me-3">Markham, ON</i>
                    </p>
                    <p class="card-text">
                        <small class="text-body-secondary"
                        >Last updated 12 hours ago</small>
                    </p>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        <Footer />
        </body>
    )
}