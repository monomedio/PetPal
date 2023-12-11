// import {useCallback, useEffect, useState} from 'react';
// import { useParams } from 'react-router-dom'
// import "./index.css"

import PostsGrid from "./Table";
import PostItem from "./PostItem"
import './index.css'

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom"; 

function BlogList() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);   

    useEffect(() => {
        fetch('http://localhost:8000/blog/')
        .then(response => response.json())
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
        <div>
            <h1 className="blog-title">PetPal Blogs</h1>

            <PostsGrid posts={posts} onPostClick={handlePostClick} />

        
            <button onClick={() => navigate("/blog/upload")}>New Post</button>
        </div>
        ); 
    }
    
    export default BlogList;
    

