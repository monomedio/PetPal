import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './index.css';
import Replies from './Replies';
import RepliesForm from './RepliesForm';
import 'bootstrap/dist/css/bootstrap.min.css';

function PostDetail() {
    const { postId } = useParams();
    const [ post, setPost] = useState(null);
    const [replies, setReplies] = useState([]);
    const [newReply, setNewReply] = useState(null);
    const navigate = useNavigate();
    const authToken = localStorage.getItem('authToken');
    const currUser = localStorage.getItem('username');

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
                    <div className='post-author'>Written by: {post.author}</div>
                    <div>
                        <button className="edit-btn" onClick={() => navigate('/blog/')}>Back to PetPal Blogs</button>
                        {(post.author === currUser) &&
                            <button className="edit-btn" onClick={() => navigate(`/blog/edit/${postId}`)}>Edit Blog</button>
                        }   
                    </div>
                    <div className='post-container'>
                        <div className='post-image'> {post.image && <img src={post.image} alt={post.title}/>} </div>
                        <pre>
                            <div className='post-content'>{post.content}</div>
                        </pre>
                    </div>
                    <div>
                        <Replies postId={postId} authToken={authToken} newReply={newReply} setNewReply={setNewReply}/>
                    </div>
                    <div>
                        <RepliesForm postId={postId} authToken={authToken} newReply={newReply} setNewReply={setNewReply}/>
                    </div>
                    
                </>
            )}
        </div>

    );
}

export default PostDetail;
