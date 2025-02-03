import React from 'react';
import Leaderboard from '../Components/LeaderBoard';
import { useAuth } from '../context/auth'; // Import the useAuth hook

function DashBoard() {
  const [auth] = useAuth(); // Access the auth data

  const handleButtonClick = () => {
    console.log(auth); // Log the auth data to the console
  };

  return (
    <div>
      <Leaderboard />
      <button onClick={handleButtonClick}>Log Auth Data</button>
    </div>
  );
}

export default DashBoard;
