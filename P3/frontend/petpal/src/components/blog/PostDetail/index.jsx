import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './index.css';

function PostDetail() {
    const { postId } = useParams();
    const [ post, setPost] = useState(null);
    const navigate = useNavigate();
    const authToken = localStorage.getItem('authToken');

    useEffect(() => {
        fetch(`http://localhost:8000/blog/${postId}`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        })
        .then(response => response.json())
        .then(
            data => setPost(data))
        .catch(error => console.error('Error:', error));

    }, [postId]);


    return (
        <div className='window-containter'>
            {post && (
                <>
                    <div className='post-title'>{post.title}</div>
                    <button className="edit-btn" onClick={() => navigate(`/blog/edit/${postId}`)}>Edit Blog</button>
                    <div className='post-container'>
                        <div className='post-image'> {post.image && <img src={post.image} alt={post.title}/>} </div>
                        <pre>
                            <div className='post-content'>{post.content}</div>
                        </pre>
                    </div>
                </>
            )}
        </div>

    );
}

export default PostDetail;
