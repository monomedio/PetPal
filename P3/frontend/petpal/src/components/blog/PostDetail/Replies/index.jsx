
import React, { useState, useEffect } from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Replies({ postId, authToken, newReply }) {
    const [replies, setReplies] = useState([]);
    const [ currentPage, setCurrentPage ] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetch(`http://localhost:8000/blog/${postId}/replies/?page=${currentPage}`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log("this is count", data.count);
            // const filteredReplies = data.results.filter(reply => reply.blog_post.id === parseInt(postId));
            setTotalPages(Math.ceil(data.count / 5));
            console.log(data.results);
            setReplies(data.results)})
        .catch(error => console.error('Error fetching replies:', error));
    }, [postId, authToken, currentPage, newReply]);
    


    console.log(postId);

    function formatDateString(dateString) {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
        const date = new Date(dateString);
        return date.toLocaleString('en-US', options);
    }
    
    

    return (
        <div className="replies-container">
            <div className='reply-title'>
                Replies:
            </div>
            {replies.length > 0 ? (
                replies.map((reply, index) => (
                    <div key={index} className="reply">
                        <div className='auth-date'>
                            {/* <div className='col-6'> */}
                                <div className='reply-author'>{reply.author}</div>
                            {/* </div> */}
                            {/* <div className='col-6'> */}
                                <div className='reply-date'>{formatDateString(reply.created_at)}</div>
                            {/* </div> */}
                        </div>
                        <div className="reply-content">{reply.content}</div>
                    </div>
                ))
            ) : (
                <div className='reply-font'>There are no replies yet. Please leave your thoughts!</div>
            
            )}
        {currentPage > 1 && <button onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>}
        {currentPage < totalPages && <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>}
        
        </div>
    );
}

export default Replies;
