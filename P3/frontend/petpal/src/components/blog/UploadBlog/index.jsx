import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';
import uploadImage from '../../../assets/images/blog/upload-image.svg';// Adjust the path as necessary
import 'bootstrap/dist/css/bootstrap.min.css';


function UploadBlog() { 
    const navigate = useNavigate();
    
    const [postData, setPostData] = useState({ title: '', content: '', image: null, imageFile: null});

    const [ successMessage, setSuccessMessage] = useState('');

    const handleSubmit = event => {
        console.log(postData.id)
        event.preventDefault()
        const apiUrl = 'http://localhost:8000/blog/';
        const authToken = localStorage.getItem('authToken');

        const formData = new FormData();
        formData.append('title', postData.title);
        formData.append('content', postData.content);
        console.log('Image to append:', postData.imageFile);
        // if (postData.image) {
        //     formData.append('image', postData.image);
        // }
        if (postData.imageFile) {
            formData.append('image', postData.imageFile);
        }

 
        fetch(apiUrl, {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => { throw new Error('Error: ' + text) });
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            setPostData({ title: '', content: '', image: null});
            // setSuccessMessage('Blog post uploaded successfully!');
            navigate('/blog');
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    // const handleImage = (event) => {
    //     const file = event.target.files[0];
    //     if (file) {
    //         const fileUrl = URL.createObjectURL(file);
    //         setPostData({ ...postData, image: fileUrl });
    //         // setSuccessMessage("File uploaded successfully!");

    //     }
    // }

    const handleImage = (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileUrl = URL.createObjectURL(file);
            setPostData({ ...postData, image: fileUrl, imageFile: file });
        }
    }

    
    return (
        <div className='window-containter'>
            <div className='post-title text-center'>Upload a Blog Post</div>
            <form onSubmit={handleSubmit}>
                <div className='text-center'>
                    <label>
                        <div className='label-font'>Title:</div>
                        <input className="title-input" type="text" value={postData.title} onChange={(e) => setPostData({...postData, title: e.target.value})}/>
                    </label>
                </div>

                <div className='text-center'>
                    <label>
                        <div className='label-font'>Content:</div>
                        <textarea className="content-input" rows="4" type="text" value={postData.content} onChange={(e) => setPostData({...postData, content: e.target.value})}/>
                    </label>
                </div>

                <div className='containter'>
                    <div className='label-font'>Upload a Photo:</div>
    
                    <label htmlFor="file-upload" className='add-photo-blog'>
                        <img src={uploadImage} alt="Upload" className='upload-icon'/>
                        <input className="image-input" id="file-upload" type="file" accept=".jpg, .jpeg, .png" onChange={handleImage}/>
                        {/* {successMessage && <div className="success-message">{successMessage}</div>}  */}
                        <div className='preview-image'>{postData.image && <img src={postData.image} alt={postData.title}/>}</div>
                    </label>
                <button className='upload-btn' type="submit">Upload Post</button>
                </div>

            </form>
        </div>
    );
}
export default UploadBlog;