import { useState, useEffect } from 'react';
import { onSnapshot, query, orderBy, limit } from 'firebase/firestore';

const useFirestoreQuery = (collectionRef, limitValue = 20) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const q = query(collectionRef, orderBy('timestamp', 'desc'), limit(limitValue));
    const unsubscribe = onSnapshot(q, snapshot => {
      setData(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, [collectionRef, limitValue]);

  return data;
};

export default useFirestoreQuery;
