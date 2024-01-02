// import {useCallback, useEffect, useState} from 'react';
// import "./index.css"

import PostsGrid from "./Table";
import Footer from "../../components/footer";
import NavBar from "../../components/navbar";
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"; 

function BlogList() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]); 
    const [filterByAuthor, setFilterByAuthor] = useState(false);
    const authToken = localStorage.getItem('authToken');
    const [ query, setQuery] = useState({search: "", page: 1});
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        let url = `http://localhost:8000/blog/?q=${query.search}&page=${query.page}`;
        if (filterByAuthor) {
            // Assuming 'authorId' is available and represents the current author
            const authorId = localStorage.getItem('username');
            url += `&author=${authorId}`;
        }

        fetch(url, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        })
        .then(response => {
            if (response.status === 401) {
                navigate(`/login/`);
                return;
            }
            // else {
                return response.json()
        })
        .then(data => {
                setPosts(data.results);
                setTotalPages(data.count);

            })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, [query, filterByAuthor]);

    
    const handlePostClick = (postId) => {
        navigate(`/blog/${postId}`);
    };

    const numPages = Math.ceil(totalPages/6);

    const toggleAuthorFilter = () => {
        setFilterByAuthor(prevState => !prevState);
        // Reset to first page when filter changes
        setQuery({ ...query, page: 1 });
    };


    return (
        <>
        <NavBar />
        <body>

        

        <div className="container-fluid">
            <div className="blog-title">PetPal Blogs</div>
            {/* <div>
            {localStorage.getItem('usename')}
            </div> */}

            <div className="col text-center">
                <input className="search" type="text" id="search" placeholder="Search for a Blog" value={query.search} onChange={event => setQuery({ search: event.target.value, page: 1 })} />
            </div>

            <PostsGrid posts={posts} onPostClick={handlePostClick} toggleAuthorFilter = {toggleAuthorFilter} filterByAuthor={filterByAuthor}  />

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
        
        <Footer />
        </body>
        </>
        ); 
    }
    
export default BlogList;
    

