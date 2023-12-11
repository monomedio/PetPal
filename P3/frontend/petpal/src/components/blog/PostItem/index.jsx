import './index.css';

function PostItem({ post, onClick }) {
    console.log(post);
    return (
        <div className="box" onClick={() => onClick(post.id)}>
            <h3 className='post-title'>{post.title}</h3>
            <p>{post.content}</p>
        </div>
    );
}

export default PostItem;