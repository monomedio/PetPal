import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function UploadBlog() { 
    const navigate = useNavigate();
    
    const [ title, setTitle] = useState('');
    const [ content, setContent] = useState('');
    const [ successMessage, setSuccessMessage] = useState('');

    const handleSubmit = event => {
        event.preventDefault()
        const apiUrl = 'http://localhost:8000/blog/';

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, content})
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            setTitle('');
            setContent('');
            setSuccessMessage('Blog post uploaded successfully!');
            navigate('/blog');
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    
    return (
        <div>
            <h1>Upload a Blog Post</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Title:
                        <input type="text" value={title}onChange={(e) => setTitle(e.target.value)}/>
                    </label>
                </div>

                <div>
                    <label>
                        Content:
                        <input type="text" value={content}onChange={(e) => setContent(e.target.value)}/>
                    </label>
                </div>

                <button type="submit">Upload Post</button>
            </form>
            {successMessage && <div className="success-message">{successMessage}</div>} 
        </div>
    );
}
export default UploadBlog;