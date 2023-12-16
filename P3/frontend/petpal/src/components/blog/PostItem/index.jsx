import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function PostItem({ post, onClick }) {

    return (
        <div className="box" onClick={() => onClick(post.id)}>
            <div className='post-title-item text-center'>{post.title}</div>
            <div className='auth-date-box'>
                <div className='post-author-item text-center'>Written by: {post.author}</div>
                <div className='post-author-item text-center'>
                    {new Date(post.updated_at).getTime() !== new Date(post.created_at).getTime() 
                    ? "Updated on: " + new Date(post.updated_at).toLocaleString() 
                    :  new Date(post.created_at).toLocaleString()}
                </div>
            </div>

            <div className='post-subtitle-item text-center'>{
                post.content.length > 70 
                ? post.content.slice(0, post.content.slice(0, 70).lastIndexOf(' ') + 1) + '. . .' 
                : post.content
            }</div>
            <div className='post-image-item'>{post.image && <img src={post.image} alt={post.title}/>}</div>
        </div>
    );
}

export default PostItem;