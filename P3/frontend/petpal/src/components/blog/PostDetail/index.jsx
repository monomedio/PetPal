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
        <div >
            {post && (
                <>
                    <div className='container-fluid'>

                        {/* <div className='row'> */}
                            {/* <div className=''>   */}
                                <div className='post-title text-center'>{post.title}</div>
                            {/* </div> */}

                            <div className='col-12 text-center'>
                                <div className='post-author'>Written by: {post.author}</div>
                            </div>
                        {/* </div> */}

                        <div className='row p-2'>
                            <div className='col text-start'>
                                <button className="edit-btn" onClick={() => navigate('/blog/')}> &lt; Back to PetPal Blogs</button>
                            </div>
    
                            <div className='col text-end'>
                                {(post.author === currUser) &&
                                    <button className="edit-btn" onClick={() => navigate(`/blog/edit/${postId}`)}>Edit Blog</button>
                                }   
                            </div>
                        </div>
                        
                        <div className='row'>
                            <div className='post-image col-auto'> 
                                {console.log("this is image", post.image)}
                                {post.image && <img className='mx-auto' src={post.image} alt={post.title}/>} 
                            </div>
                            <div className='col-md'>
                                <pre className='post-content'>{post.content}</pre>
                            </div>
                        </div>

                        <div>
                            <Replies postId={postId} authToken={authToken} newReply={newReply} setNewReply={setNewReply}/>
                        </div>
                        <div>
                            <RepliesForm postId={postId} authToken={authToken} newReply={newReply} setNewReply={setNewReply}/>
                        </div>
                    </div>
                    
                </>
            )}
        </div>

    );
}

export default PostDetail;
