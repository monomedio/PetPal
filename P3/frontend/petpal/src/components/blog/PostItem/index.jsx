import './index.css';
import { useContext } from "react";


function PostItem({ post, onClick }) {

    console.log(post);
    return (
        <div className="box" onClick={() => onClick(post.id)}>
            <div className='post-title-item'>{post.title}</div>
            <div className='post-author-item'>Written by: {post.author}</div>
            <div className='post-author-item'>
                {new Date(post.updated_at).getTime() !== new Date(post.created_at).getTime() 
                ? "Updated on: " + new Date(post.updated_at).toLocaleString() 
                :  new Date(post.created_at).toLocaleString()}
            </div>

            <div className='post-subtitle-item'>{
                post.content.length > 70 
                ? post.content.slice(0, post.content.slice(0, 70).lastIndexOf(' ') + 1) + '. . .' 
                : post.content
            }</div>
            <div className='post-image-item'>{post.image && <img src={post.image} alt={post.title}/>}</div>
        </div>
    );
}

export default PostItem;