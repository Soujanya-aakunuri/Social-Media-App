import { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, startAfter, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import InfiniteScroll from 'react-infinite-scroll-component';
import Post from './Post';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = async () => {
    const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'), limit(20));
    const querySnapshot = await getDocs(q);
    const newPosts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setPosts(newPosts);
    setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
  };

  const fetchMorePosts = async () => {
    if (!lastDoc) return;
    const q = query(
      collection(db, 'posts'),
      orderBy('timestamp', 'desc'),
      startAfter(lastDoc),
      limit(20)
    );
    const querySnapshot = await getDocs(q);
    const newPosts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setPosts(prev => [...prev, ...newPosts]);
    setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
    if (querySnapshot.docs.length === 0) setHasMore(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={fetchMorePosts}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
    >
      <div className="feed">
        {posts.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default Feed;
