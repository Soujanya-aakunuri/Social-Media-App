const Post = ({ post }) => (
    <div className="post border-b border-gray-300 p-4">
      <h3 className="font-bold">{post.text}</h3>
      {post.images && post.images.map((img, idx) => <img key={idx} src={img} alt="Post" />)}
      {post.videos && post.videos.map((video, idx) => (
        <video key={idx} controls src={video} className="w-full mt-2" />
      ))}
    </div>
  );
  
  export default Post;
  