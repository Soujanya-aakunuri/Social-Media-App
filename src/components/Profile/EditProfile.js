import { useState } from 'react';
import { auth, db } from '../../firebase/firebase';
import { updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';

const EditProfile = () => {
  const user = auth.currentUser;
  const [displayName, setDisplayName] = useState(user.displayName || '');
  const [bio, setBio] = useState('');

  const handleUpdate = async () => {
    if (displayName.trim() === '') return;

    try {
      await updateProfile(user, { displayName });
      const userDoc = doc(db, 'users', user.uid);
      await updateDoc(userDoc, { displayName, bio });
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile.');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Edit Profile</h2>
      <div className="mt-4">
        <label className="block font-medium">Display Name</label>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="w-full mt-2 p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mt-4">
        <label className="block font-medium">Bio</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full mt-2 p-2 border border-gray-300 rounded"
        />
      </div>
      <button
        onClick={handleUpdate}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Save Changes
      </button>
    </div>
  );
};

export default EditProfile;
