import './App.css'
import Header from './components/Header'
import Content from './components/Content'
import Total from './components/Total'

function App() {
  const course = 'Half Stack application development'
  const parts = [{
    name: 'Fundamentals of React',
    exercises: 10
  },
  {
    name: 'Using props to pass data',
    exercises: 7
  },
  {
    name: 'State of a component',
    exercises: 14
  }]
  return (
    <div>
      <Header course={course}/>
      <Content parts={parts}/>
      <Total Number of exercises={parts[0].exercises + parts[1].exercises + parts[2].exercises}/>
    </div>
  )
}

export default App
