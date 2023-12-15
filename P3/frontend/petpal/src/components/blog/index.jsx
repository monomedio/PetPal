// import {useCallback, useEffect, useState} from 'react';
// import "./index.css"

import PostsGrid from "./Table";
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"; 

function BlogList() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]); 
    const authToken = localStorage.getItem('authToken');
    const [ query, setQuery] = useState({search: "", page: 1});
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetch(`http://localhost:8000/blog/?q=${query.search}&page=${query.page}`
        , {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        }
        )
        .then(response => 
            // if (response.status === 401) {
            //     navigate(`/login/`);
            // }
            // else {
                response.json()
            )
        .then(data => {
                setPosts(data.results);
                setTotalPages(data.count);

            })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, [query]);

    
    const handlePostClick = (postId) => {
        navigate(`/blog/${postId}`);
    };

    const numPages = Math.ceil(totalPages/6);


    return (

        <div className="window-containter">
            <h1 className="blog-title">PetPal Blogs</h1>

            <div>
                <label>
                    Search for a Blog:
                </label>
                <input className="search" type="text" id="search" value={query.search} onChange={event => setQuery({ search: event.target.value, page: 1 })} />
            </div>

            <PostsGrid posts={posts} onPostClick={handlePostClick} />

            {/* { query.page > 1 && <button onClick ={() => setQuery({...query, page: query.page-1})}>Previous</button>}
            { query.page < totalPages && <button onClick ={() => setQuery({...query, page: query.page+1})}>Next</button>} */}
            <ul className="pagination">
                {query.page > 1 && (
                    <li onClick={() => setQuery({...query, page: query.page - 1})}>&lt;</li>
                )}

                {[...Array(numPages)].map((_, index) => (
                    <li
                        key={index + 1}
                        className={query.page === index + 1 ? 'active' : ''}
                        onClick={() => setQuery({...query, page: (index + 1)})}>
                        {index + 1}
                    </li>
                ))}

                {query.page < numPages && (
                                <li onClick={() => setQuery({...query, page: query.page + 1})}>&gt;</li>
                )}
            </ul>
        </div>

        
        ); 
    }
    
export default BlogList;
    

