// Recipe.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NavBar from './navbar';
import axios from 'axios';
import RecipeReviews from './RecipeReviews'; // Import the RecipeReviews component

const Recipe = ({ category }) => {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();
  const { subpage } = useParams();
  
  useEffect(() => {
    // Fetch recipes based on the category and subpage
    axios.get(`http://localhost:8800/recipes?category=${category}&subpage=${subpage}`)
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((error) => {
        console.error('Error fetching recipes:', error);
      });
  }, [category, subpage]);

  const handleDelete = async (id) => {        
    try {            
        await axios.delete('http://localhost:8800/delete/'+id)            
        window.location.reload();        
    } catch(err) {            
        console.log(err);        
    }    
}

  return (
    <div className="container mt-4">
      <h2>{category} Recipes</h2>
      <NavBar />
      {recipes.map((recipe) => (
        <div key={recipe.Recipe_ID} className="mb-4">
          <div>
            <h3>{recipe.Title}</h3>
             {/* Display the image */}
             <img src={recipe.Image} alt={`Recipe: ${recipe.Title}`} style={{ maxWidth: '100%' }} />
            <p>Ingredients Needed: {recipe.Ingredient}<br />
            Instructions: {recipe.Instructions}<br />
            Time to cook: {recipe.Time}</p>
            <button onClick={() => navigate(`/reviews/${recipe.Recipe_ID}`)} className='btn btn-primary mr-2'>Reviews</button>&nbsp;&nbsp;
            <button onClick={() => navigate(`/update/${recipe.Recipe_ID}`)} className="btn btn-primary mr-2">Update</button>&nbsp;&nbsp;
            <button onClick={() => handleDelete(recipe.Recipe_ID)} className="btn btn-danger">Delete</button>
          </div>
          {/* Add RecipeReviews component below each recipe */}
          <RecipeReviews recipeId={recipe.Recipe_ID} />
        </div>
      ))}
    </div>
  );
};

export default Recipe;