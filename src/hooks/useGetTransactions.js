import React from 'react'
import { query, collection, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useGetUserInfo } from './useGetUserInfo'


export const useGetTransactions = () => {
    const [transactions, setTransactions] = React.useState([]);
    const [transactionTotals, setTransactionTotals] = React.useState({balance:0.0, income:0.0, expenses:0.0})

    const transactionCollectionRef = collection(db, "transactions");
    const { uid } = useGetUserInfo();

    const getTransactions = async () => {
        let unsubscribe;
        try{
        const queryTransactions = query(transactionCollectionRef, where("uid", "==", uid ),
        orderBy("createdAt"));

        unsubscribe = onSnapshot(queryTransactions, (snapshot) =>{

            let docs = [];
            let totalIncome = 0;
            let totalExpenses = 0;

            snapshot.forEach((doc) => {
                const data = doc.data()
                const id = doc.id;
                docs.push({...data,id})

                if(data.transactionType === "expense"){
                    totalExpenses += Number(data.transactionAmount);
                }
                else{
                    totalIncome += Number(data.transactionAmount)
                }

            })
            let balance = totalIncome - totalExpenses;
            setTransactions(docs);
            setTransactionTotals({
                balance,
                income: totalIncome,
                expenses: totalExpenses,
            })
        })

        }catch(error){

            console.error(error)
        }
        return () => unsubscribe();
    }

    React.useEffect(() =>{
        getTransactions()
    }, [])

    return { transactions, transactionTotals } 
}