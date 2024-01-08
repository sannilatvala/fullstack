const Total = ({ exercises }) => {
    const sum = exercises.reduce((acc, exercise) => acc + exercise, 0)
    return (
      <p>Number of exercises {sum}</p>
    )
  }
  
  const Part = ({ parts }) => 
    <ul>
      {parts.map(part => 
        <li key={part.id}>
          {part.name} {part.exercises}
        </li>
      )}
    </ul>
  
  const Content = ({ parts }) => 
    <div>
      <Part parts={parts} />
    </div>
  
  const Header = ({ name }) => {
    return (
      <h1>{name}</h1>
    )
  }

const Course = ({ courses }) => 
  <div>
    {courses.map(course => (
      <div key={course.id}>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total exercises={course.parts.map(part => part.exercises)} />
      </div>
    ))}
  </div>

export default Course
