import "./DisplayMore.css";

const DisplayMore = ({ offset, setOffset, setNeedRefresh }) => {
  const handleClick = () => {
    setOffset(offset + 5);
    setNeedRefresh(true);
  };

  return <button onClick={handleClick}>Afficher plus</button>;
};

export default DisplayMore;
