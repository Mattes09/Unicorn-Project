import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    console.log("Clicked");
    navigate("/flashcards");
  };
  return (
    <div>
      <h1> Home </h1>
      <p> Welcome to the MyWordie</p>
      <button onClick={handleClick}>Flashcards </button>
    </div>
  );
};
