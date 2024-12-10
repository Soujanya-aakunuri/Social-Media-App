import { useState } from 'react';
import { storage, db } from '../../firebase/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const CreatePost = () => {
  const [text, setText] = useState('');
  const [files, setFiles] = useState([]);

  const handlePost = async () => {
    const uploadedFiles = await Promise.all(
      files.map(async file => {
        const storageRef = ref(storage, `posts/${file.name}`);
        await uploadBytes(storageRef, file);
        return getDownloadURL(storageRef);
      })
    );

    await addDoc(collection(db, 'posts'), {
      text,
      images: uploadedFiles,
      timestamp: serverTimestamp(),
    });

    setText('');
    setFiles([]);
  };

  return (
    <div>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="What's on your mind?"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="file"
        multiple
        onChange={e => setFiles([...e.target.files])}
        className="mt-2"
      />
      <button onClick={handlePost} className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">
        Post
      </button>
    </div>
  );
};

export default CreatePost;
