// import {useCallback, useEffect, useState} from 'react';
// import "./index.css"

import PostsGrid from "./Table";
import './index.css'

import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"; 

function BlogList() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]); 
    const authToken = localStorage.getItem('authToken');

    useEffect(() => {
        fetch('http://localhost:8000/blog/', {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        })
        .then(response => 
            // if (response.status === 401) {
            //     navigate(`/login/`);
            // }
            // else {
                response.json()
            )
        .then(data => {
                setPosts(data.results);
            })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, []);

    
    const handlePostClick = (postId) => {
        navigate(`/blog/${postId}`);
    };

    return (
        <div className="window-containter">
            <h1 className="blog-title">PetPal Blogs</h1>
            <PostsGrid posts={posts} onPostClick={handlePostClick} />
        </div>
        ); 
    }
    
export default BlogList;
    

