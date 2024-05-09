import { useRef } from "react";
import { firestore } from "./firebase";
import {
  addDoc,
  collection,
  // getDocs,
  // getDoc,
  // doc,
  onSnapshot,
  query,
  // where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

const Demo = () => {
  const messageRef = useRef();

  //collection reference
  const colRef = collection(firestore, "messages");

  //document reference
  // const docRef = doc(firestore, "messages", "KDXajkreU2GMoa0laR06s");

  //query
  const q = query(colRef, orderBy("createdAt"));

  const handleSend = async (e) => {
    e.preventDefault();
    let data = {
      message: messageRef.current.value,
      createdAt: serverTimestamp(),
    };
    messageRef.current.value = "";
    addDoc(colRef, data);
  };

  onSnapshot(q, (snapshot) => {
    let docs = [];
    snapshot.docs.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id });
    });
    console.log(docs);
  });

  return (
    <div>
      <form onSubmit={handleSend}>
        <label>Enter message</label>
        <input type="text" ref={messageRef} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Demo;
