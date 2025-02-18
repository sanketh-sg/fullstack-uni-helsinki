import Course from './components/Course'
import './App.css'
const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  // const totalExercises = courses.reduce((acc, course) => {
  //   const total = course.parts.reduce((acc, part) => acc + part.exercises, 0);
  //   return acc + total;
  // }, 0);

  return (
    <>
      <h1>Course List</h1>
      {courses.map(course => (
        <Course key={course.id} course={course} />
      ))}
     
    </>
  );
}
export default App
