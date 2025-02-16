import './App.css'
import { useState } from 'react'
import Statistics from './components/Statistics'
import Button from './components/Button'

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleGood = () => {
    const updatedGood = good + 1;
    setGood(updatedGood)
    setAll(good + neutral + bad)
  }

  const handleNeutral = () => {
    const updatedNeutral = neutral + 1;
    setNeutral(updatedNeutral)
    setAll(good + neutral + bad)
  }

  const handleBad = () => {
    const updatedBad = bad + 1;
    setBad(updatedBad)
    setAll(good + neutral + bad)
  }

  return (
    <>
      <div>
        <h1>Give Feedback</h1>
        <Button clickHandler={handleGood} text="Good"/>
        <Button clickHandler={handleNeutral} text="Neutral"/>
        <Button clickHandler={handleBad} text="Bad"/>
      </div>

      <div>
        <h1>Statistics</h1>
        <Statistics good={good} neutral={neutral} bad={bad} all={all} />
      </div>
      
    </>
    
  )
}

export default App
