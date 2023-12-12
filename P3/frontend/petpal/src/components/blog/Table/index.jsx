
import React from 'react';
import PostItem from '../PostItem';
import { Link } from 'react-router-dom'
import { useNavigate, useParams } from "react-router-dom";
import './index.css';

function PostsGrid({ posts, onPostClick }) {
    const navigate = useNavigate();
    return (
        <div className="posts-container">
            <div>
                Cell 1
                <button className = "new-post-btn" onClick={() => navigate("/blog/upload")}>New Post</button>
            </div>
            <div className="posts-collection">
                {posts.map(post => (
                    <PostItem key={post.id} post={post} onClick={() => onPostClick(post.id)} />
                ))}
            </div>
        </div>
    );
}

export default PostsGrid;
