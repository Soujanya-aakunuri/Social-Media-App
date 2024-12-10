import Feed from '../components/Feed/Feed';
import CreatePost from '../components/Feed/CreatePost';
import Navbar from '../components/Shared/Navbar';

const FeedPage = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <CreatePost />
        <Feed />
      </div>
    </div>
  );
};

export default FeedPage;
