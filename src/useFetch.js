import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { firestore } from "./firebase";

const useFetch = (colTitle) => {
  const colRef = collection(firestore, colTitle);
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const q = query(colRef, orderBy("createdAt", "desc"));

  useEffect(() => {
    try {
      onSnapshot(q, (snapshot) => {
        setData(
          snapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          })
        );
        setIsPending(false);
        setError(null);
      });
    } catch {
      setIsPending(false);
      setError("could not fetch the data for that resource");
    }
  }, [q]);

  return { data, isPending, error };
};

export default useFetch;
