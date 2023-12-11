import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


function EditBlog() {

    const { postId } = useParams();
    const navigate = useNavigate();
    const [postData, setPostData] = useState({ title: '', content: '', image: null});

    const url = `http://localhost:8000/blog/${postId}/`;
    useEffect(() => {
        fetch(url)
        .then(response => response.json())
        .then(
            data => setPostData(data))
        .catch(error => console.error('Error:', error));

    }, [postId]);

    const formSubmit = (event) => {
        event.preventDefault();
        fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setPostData({ title: '', content: '', image: null})
            navigate(`/blog/${postId}`);
        })
        .catch(error => {
            console.error('Error updating the post:', error);
        });
    };


    return (
        <div>
            <h1>Edit Your Blog</h1>
            <form onSubmit={formSubmit}>
                <div>
                    <label>
                        Title:
                        <input type="text" value={postData.title} onChange={(e) => setPostData({...postData, title: e.target.value})}/>
                    </label>
                </div>

                <div>
                    <label>
                        Content:
                        <input type="text" value={postData.content} onChange={(e) => setPostData({...postData, content: e.target.value})}/>
                    </label>
                </div>

                <button type="submit">Edit Post</button>
            </form>
        </div>
    );


}

export default EditBlog;