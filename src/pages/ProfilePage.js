import Profile from '../components/Profile/Profile';
import Navbar from '../components/Shared/Navbar';

const ProfilePage = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <Profile />
      </div>
    </div>
  );
};

export default ProfilePage;
