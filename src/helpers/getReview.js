import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export const getReview = async(id) => {
    const docRef =  doc(db,'reviews',id)
    const docSnap =  await getDoc(docRef);
    if (docSnap.exists()) {
       return docSnap.data()
    }
}