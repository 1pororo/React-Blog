import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { firestore } from "./firebase";

const useFetch = (colTitle) => {
  const colRef = collection(firestore, colTitle);
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  try {
    useEffect(() => {
      const abortCont = new AbortController();
      const q = query(colRef, orderBy("createdAt", "desc"));

      onSnapshot(
        q,
        (snapshot) => {
          if (snapshot.empty) {
            setError("could not fetch the data for that resource");
            setIsPending(false);
            return;
          }

          setData(
            snapshot.docs.map((doc) => {
              return { ...doc.data(), id: doc.id };
            })
          );

          setIsPending(false);
          setError(null);
        },
        { signal: abortCont.signal }
      );
    }, [colRef]);
  } catch (err) {
    if (err.name === "Abort Message") {
      return;
    }
  }

  return { data, isPending, error };
};

export default useFetch;
