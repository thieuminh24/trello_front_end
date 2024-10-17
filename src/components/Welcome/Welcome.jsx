import React from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>Welcome</div>
      <button onClick={() => navigate("/login")}></button>
    </>
  );
};

export default Welcome;
