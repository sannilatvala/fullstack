const Person = ({ person, deletePerson }) => {

  const handleDeleteClick = () => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      deletePerson(person.id);
    }
  }

  return (
    <div>
      {person.name} {person.number}
      <button onClick={handleDeleteClick}>delete</button>
    </div>
  )
}

export default Person
