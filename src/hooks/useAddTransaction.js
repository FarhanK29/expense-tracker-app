import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from "../config/firebase"
import { useGetUserInfo } from './useGetUserInfo';

export const useAddTransaction = () =>{
    const transactionCollectionRef = collection(db, "transactions");
    const { uid } = useGetUserInfo();


    const addTransaction = async({
        description,
        transactionAmount,
        transactionType,
    }) =>{
        await addDoc(transactionCollectionRef, {
            uid,
            description,
            transactionAmount,
            transactionType,
            createdAt: serverTimestamp()
        });
    }
    return { addTransaction };
}