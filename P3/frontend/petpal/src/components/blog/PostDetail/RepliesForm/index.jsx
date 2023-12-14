import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function RepliesForm(props) {

    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [postContent, setPostContent] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log("this is the reply: ", postContent);

            fetch(`http://localhost:8000/blog/${props.postId}/replies/`, {
                method: "POST",
                body: JSON.stringify({ "content": postContent }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${props.authToken}`
                    // 'Authorization': props.authToken ? `Bearer ${props.authToken}` : '',
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }
                else {
                    response.json();
                }
            })
            .then(
                data => {
                    console.log('Success:', data);
                    // props.onReplyAdded(postContent);
                    setPostContent('');
                    props.setNewReply(postContent);
                    event.target.reset();
                })
            .catch(error => console.error('Error:', error));
    
    }

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                value={props.content}
                onChange={(e) => setPostContent(e.target.value)}
                placeholder="Write your reply here..."
                required
            />
            <button type="submit">Post Reply</button>
        </form>
    );
}





export default RepliesForm;