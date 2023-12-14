import React from 'react';
import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {getShelter} from '../../api/shelter-info.js';
import "./style.css"
import search from "../../assets/images/search-icon.svg";
export const url = 'http://localhost:8000'

const ShelterDescription = ({id, authToken}) => {
    const [data, setData] = useState();

    const getData = useCallback(async () => {
        const data = await getShelter(id, authToken);
        console.log('Data:', data);
        setData(data)
    }, [id])

    useEffect(() => {
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

    // {
    //     "charity_id": 1,
    //     "address": "Street1",
    //     "user": {
    //         "is_shelter": true,
    //         "shelter_name": "Shelter1",
    //         "email": "shelter1@shelter1.com",
    //         "phone": "123467890",
    //         "username": "shelter1",
    //         "profile_pic": null
    //     }
    // }
    return (
        <div className="light-blue pb-4">
            <div className="row pt-3">
                <div className="col-12 col-md-8 col-xl-9 mx-3">
                    <div className="d-flex align-items-center">
                    </div>
                </div>
                <div className="col mx-3">
                    <div className="float-right input-group">
                        <input type="search" className="form-control rounded-item search-bar" placeholder="Search for Pets"/>
                        <img className="d-inline" src={search}></img>
                    </div>
                </div>
            </div>
            <div id="shelter-description" className="container bg-white rounded-item my-2 p-4">
                <div className="row w-100 mx-4">
                    <div className="col">
                        <h1 className="text-black heading-slab"> {data?.user?.shelter_name} </h1>
                        <p className=" text-black body-bold">About the Organization:</p>
                        <div className="d-flex">
                            <p className="text-black body-bold m-0">Address: &nbsp; </p>
                            <p className="text-black important-p m-0">{data?.address}</p>
                        </div>
                        <div className="d-flex">
                            <p className="text-black body-bold m-0">Telephone: &nbsp; </p>
                            <p className="text-black important-p m-0">{data?.user?.phone}</p>
                        </div>
                        <div className="d-flex">
                            <p className="text-black body-bold m-0">Email: &nbsp; </p>
                            <p className="text-black important-p m-0">{data?.user?.email}</p>
                        </div>
                        <div className="d-flex">
                            <p className="text-black body-bold m-0">Charity Registration Number: &nbsp; </p>
                            <p className="text-black important-p m-0">{data?.charity_id}</p>
                        </div>
                    </div>
                    <div className="col">
                        {data?.user?.profile_pic != null && (
                            <img className="mt-5 img-fluid" src={data.profile_pic} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShelterDescription;