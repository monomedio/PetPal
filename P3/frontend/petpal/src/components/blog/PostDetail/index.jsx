import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function PostDetail() {
    const { postId } = useParams();
    const [ post, setPost] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8000/blog/${postId}`)
        .then(response => response.json())
        .then(
            data => setPost(data))
        .catch(error => console.error('Error:', error));

    }, [postId]);

    // if (!post) {
    //     return <div>Loading...</div>;
    // }

    return (
        <div>
            {post && (
                <>
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                </>
            )}
            <button onClick={() => navigate(`/blog/edit/${postId}`)}>Edit Blog</button>
        </div>
    );
}

export default PostDetail;
