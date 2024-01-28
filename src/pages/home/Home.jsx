import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import './Home.css'
import { useAddTransaction } from '../../hooks/useAddTransaction';
import { useGetTransactions } from '../../hooks/useGetTransactions';
import { db } from '../../config/firebase';
import { doc, deleteDoc } from 'firebase/firestore'

const Home = () => {
  const { addTransaction } = useAddTransaction();
  const { transactions, transactionTotals } = useGetTransactions();

  const { balance, income, expenses } = transactionTotals;


  const handleIncomeSubmit = (event) => {
    event.preventDefault();
    const description = event.target.name.value;
    const amount = parseFloat(event.target.amount.value);
    const transactionType = "income"

    if(description !== "" || amount != null)
    {
    addTransaction(
      {
        description: event.target.name.value,
        transactionAmount: parseFloat(event.target.amount.value),
        transactionType: "income"
      })
    }
    event.target.name.value = "";
    event.target.amount.value = "";
  }

  const handleExpenseSubmit = (event) =>{
    event.preventDefault();
    const description = event.target.name.value;
    const amount = parseFloat(event.target.amount.value);
    const transactionType = "expense"
    if(description !== "" || amount != null)
    {
      addTransaction(
      {
        description: event.target.name.value,
        transactionAmount: parseFloat(event.target.amount.value),
        transactionType: "expense"
      })
    }
    event.target.name.value = "";
    event.target.amount.value = "";
  }

  const deleteItem = async (id) =>{
    try{
    await deleteDoc(doc(db, "transactions", id))
    }
    catch(error){
      console.error("Failed to delete from database: ", error)
    }
  }


  const transactionFormatted = transactions.map((transaction) => {
    const{ description, transactionAmount, transactionType, id} = transaction;
    return(
      <li key = {id}> 
        <h4>{description}</h4>
        <p>${transactionAmount} - {transactionType}</p>
        <button className = "expense-item-delete" onClick = {() => deleteItem(id)}>Delete</button>
        <p>id = {id}</p>
      </li>
    )
  })


  return (
    <div className = "expense-home">

      <Navbar />

      <div className = "expense-home-container">
        <div className = "expense-info">
          <h1 className = "expense-balance">Balance: ${balance}   </h1>
          <h1 className = "expense-income">Income:${income}  </h1>
          <h1 className = "expense-total">Expenses: ${expenses}</h1>
        </div>

        <div className = "add-expense-container">
          <h3>Add Income</h3>
          <form className = "add-income-container" onSubmit = {handleIncomeSubmit}>
            <input name = "name" placeholder = "Name" type = "text" className = "expense-home-inputs"/>
            <input name = "amount" placeholder = "Amount" type = "text'" className = "expense-home-inputs-amounts"/>
            <button className = "expense-home-buttons">Add</button>
          </form>
        </div>
        
        <div className = "add-expense-container">
          <h3>Add Expenses</h3>
          <form className = "add-expense-container" onSubmit = {handleExpenseSubmit}>
            <input name = "name" placeholder = "Name" type = "text" className = "expense-home-inputs"/>
            <input name = "amount" placeholder = "Amount" type = "number" className = "expense-home-inputs-amounts"/>
            <button className = "expense-home-buttons">Add</button>
          </form>
        </div>

        <div className = "expense-income-list">
          <h2>Transactions</h2>
          <ul>
            {transactionFormatted}
          </ul>
        </div>



      </div>

    </div>
  )
}

export default Home