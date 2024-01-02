
import React from 'react';
import PostItem from '../PostItem';
import { Link } from 'react-router-dom'
import { useNavigate, useParams } from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function PostsGrid({ posts, onPostClick, toggleAuthorFilter, filterByAuthor }) {
    const navigate = useNavigate();
    return (
        <div className="posts-container">

            {/* <div className='container'> */}

                <div className="row">
                    <div>
                        <div>
                            <button className = "new-post-btn" onClick={() => navigate("/blog/upload")}>New Post</button>
                        </div>
                    
                    {/* <div class="col-6"> */}
                        <div className="mt-2">
                                <label className="switch">
                                    <input type="checkbox" checked={filterByAuthor} onChange={toggleAuthorFilter} />
                                        <span className="slider round">
                                            <span className="slider-text">{filterByAuthor ? "My Posts" : "All Posts"}</span>
                                        </span>
                                </label>
                        </div>
                    </div>
                </div>


                {/* <button className = "new-post-btn" onClick={() => navigate("/blog/upload")}>New Post</button> */}
                {/* <label className="switch">
                <input type="checkbox" checked={filterByAuthor} onChange={toggleAuthorFilter} />
                    <span className="slider round">
                        <span className="slider-text">{filterByAuthor ? "My Posts" : "All Posts"}</span>
                    </span>
                </label> */}
            {/* </div> */}
         


            <div className="posts-collection">
                {posts.map(post => (
                    <PostItem key={post.id} post={post} onClick={() => onPostClick(post.id)} />
                ))}
            </div>
        </div>
    );
}

export default PostsGrid;
