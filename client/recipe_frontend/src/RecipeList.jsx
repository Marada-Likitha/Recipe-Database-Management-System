// RecipeList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';

const RecipeList = ({ category }) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Fetch recipes based on the selected category from the backend
    const url = category ? `http://localhost:8800/recipes?category=${category}` : 'http://localhost:8800/recipes';

    axios.get(url)
      .then(response => setRecipes(response.data))
      .catch(error => console.error('Error fetching recipes:', error));
  }, [category]);

  return (
    <Container className="mt-5">
      <h2>{category ? `${category} Recipes` : 'All Recipes'}</h2>
      <Row>
        {recipes.map(recipe => (
          <Col key={recipe.id} md={4} className="mb-4">
            <div className="card">
              <img src={recipe.image} alt={recipe.title} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{recipe.title}</h5>
                <p className="card-text">{recipe.instructions}</p>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default RecipeList;
