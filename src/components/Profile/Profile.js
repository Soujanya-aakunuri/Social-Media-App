import { useState, useEffect } from 'react';
import { auth, db } from '../../firebase/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const Profile = () => {
  const user = auth.currentUser;
  const [posts, setPosts] = useState([]);

  const fetchUserPosts = async () => {
    const q = query(collection(db, 'posts'), where('uid', '==', user.uid));
    const querySnapshot = await getDocs(q);
    setPosts(querySnapshot.docs.map(doc => doc.data()));
  };

  useEffect(() => {
    if (user) fetchUserPosts();
  }, [user]);

  return (
    <div>
      <img src={user.photoURL} alt="Profile" className="rounded-full w-16 h-16" />
      <h1>{user.displayName}</h1>
      <h2>My Posts</h2>
      {posts.map((post, idx) => (
        <div key={idx} className="border-b border-gray-300 p-4">
          {post.text}
        </div>
      ))}
    </div>
  );
};

export default Profile;
