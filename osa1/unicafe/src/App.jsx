import { useState } from 'react'

const Text = (props) => {
  console.log(props)
  return (
    <div>
      <h1>{props.text}</h1>
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = (props) => {
  console.log(props)
  return (
    <div>
      {props.text} {props.value} {props.percent}
    </div>
  )
}

const Statistics = (props) => {
  console.log(props)
  if (props.all === 0) {
    return (
      <div>No feedback given</div>
    )
    }
    return(
        <table>
          <tbody>
            <tr>
              <td><StatisticLine text='good' value={props.good} /></td>
            </tr>
            <tr>
              <td><StatisticLine text='neutral' value={props.neutral} /></td>
            </tr>
            <tr>
              <td><StatisticLine text='bad' value={props.bad} /></td>
            </tr>
            <tr>
              <td><StatisticLine text='all' value={props.all} /></td>
            </tr>
            <tr>
              <td><StatisticLine text='average' value={props.average} /></td>
            </tr>
            <tr>
              <td><StatisticLine text='positive' value={props.positive} percent={'%'} /></td>
            </tr>
          </tbody>
        </table>
    )
  }

const App = () => {
  const text1 = 'give feedback'
  const text2 = 'statistics'
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleGoodClick = () => {
    setAll(all + 1)
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setAll(all + 1)
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setAll(all + 1)
    setBad(bad + 1)
  }

  return (
    <div>
      <Text text={text1} />
      <Button handleClick={handleGoodClick} text='good'/>
      <Button handleClick={handleNeutralClick} text='neutral'/>
      <Button handleClick={handleBadClick} text='bad'/>
      <Text text={text2} />
      <Statistics good={good} neutral={neutral} bad={bad} 
        all={all} average={(good-bad)/all} positive={(good/all)*100}
        />
    </div>
  )
}

export default App
