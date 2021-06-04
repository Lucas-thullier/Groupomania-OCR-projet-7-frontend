import './DisplayMore.css'

const DisplayMore = ({ offset, setOffset }) => {
  const handleClick = () => {
    setOffset(offset + 5)
  }

  return (
    <button className="displayMore" onClick={handleClick}>
      Afficher plus
    </button>
  )
}

export default DisplayMore
