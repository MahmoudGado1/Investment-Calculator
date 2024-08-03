import React, { useState } from 'react';
import Header from './Components/Header/Header';
import UserInput from './Components/UserInput/UserInput';
import ResultsTable from './Components/ResultsTable/ResultsTable';
const App = () => {
  const [userInput,setUserInput]=useState(null)
  const calculateHandeler=(userInput)=>{
    setUserInput(userInput)
  }
  const yearlyDate=[]
  if(userInput){
    let currentSavings = userInput['current-savings']
    const yearlyContribution= userInput['yearly-contribution']
    const expectedReturn = userInput['expected-return']/100;
    const duration = userInput['duration']
  
    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      yearlyDate.push({
        year: i+1,
        savingsEndOfYear: currentSavings,
        yearlyInterest: yearlyInterest,
        yearlyContribution:yearlyContribution,
      })
    }
  }

  return (
    <div>
      <Header/>
      <UserInput onCalculate={calculateHandeler}/>
      {!userInput && <p style={{textAlign:'center'}}>No Investment Calculated Yet.</p>}
      {userInput && <ResultsTable data={yearlyDate} initialInvestment={userInput['current-savings']}/>}
    </div>
  );
}

export default App;
