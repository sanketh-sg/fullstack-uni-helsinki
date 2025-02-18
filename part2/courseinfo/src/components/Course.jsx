/* eslint-disable react/prop-types */
import Header from './Header'
import Content from './Content'

export default function Course({course}) {
    // console.log(course.parts)
    const total = course.parts.reduce((acc, part) => acc + part.exercises, 0);

  return (
    <div>
        <Header courseName={course.name}/>
        <Content parts={course.parts}/>
        <p><strong>Total exercises: {total}</strong></p>
    </div>

  )
}
