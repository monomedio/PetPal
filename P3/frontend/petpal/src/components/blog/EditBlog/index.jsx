import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import uploadImage from '../../../assets/images/blog/upload-image.svg';
import './index.css';



function EditBlog() {

    const { postId } = useParams();
    const navigate = useNavigate();
    const [postData, setPostData] = useState({ title: '', content: '', image: null});
    const authToken = localStorage.getItem('authToken');
    const currUser = localStorage.getItem('username');

    const [ successMessage, setSuccessMessage] = useState('');

    const url = `http://localhost:8000/blog/${postId}/`;

    
    
    useEffect(() => {
        fetch(url, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        })
        .then(response => 
            response.json())
        .then(
            data => setPostData(data))
        .catch(error => console.error('Error:', error));

    }, [postId]);

    const formSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('title', postData.title);
        formData.append('content', postData.content);
        if (postData.image && postData.image instanceof File) {
            formData.append('image', postData.image);
        }
        fetch(url, {
            method: 'PATCH',
            body: formData, 
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
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
    }

    const handleImage = (event) => {
        const file = event.target.files[0];
        if (file) {
            // console.log(file)
            // const fileUrl = URL.createObjectURL(file);
            // console.log(fileUrl)
            setPostData({ ...postData, image: file });
            setSuccessMessage("File uploaded successfully!");
        }
    }



    

    return (
        <div className='window-containter'>
            <div className='post-title'>Edit Your Blog</div>
            <form onSubmit={formSubmit}>
                <div>
                    <label>
                        <div className='label-font'>Title:</div>
                        <input className="title-input" type="text" value={postData.title} onChange={(e) => setPostData({...postData, title: e.target.value})}/>
                    </label>
                </div>

                <div>
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
                </div>


                {<button className='upload-edit-btn' type="submit">Edit Post</button>}
                
            </form>
        </div>
    );


}

export default EditBlog;