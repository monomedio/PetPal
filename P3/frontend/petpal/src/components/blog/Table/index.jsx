
import React from 'react';
import PostItem from '../PostItem';

function PostsGrid({ posts, onPostClick }) {
    return (
        <div className="posts-container">
            <div>Cell 1</div>
            <div className="posts-collection">
                {posts.map(post => (
                    <PostItem key={post.id} post={post} onClick={() => onPostClick(post.id)} />
                ))}
            </div>
        </div>
    );
}

export default PostsGrid;
