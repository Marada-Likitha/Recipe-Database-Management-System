// delete.jsx
import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function DeleteRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Implement logic to delete recipe on the server
    axios.delete(`http://localhost:8800/Recipe/${id}`)
      .then(() => {
        alert('Recipe deleted successfully');
        navigate('/Recipe');
      })
      .catch((error) => console.error('Error deleting recipe:', error));
  }, [id, navigate]);

  return (
    <div>
      <p>Deleting recipe...</p>
    </div>
  );
}

export default DeleteRecipe;