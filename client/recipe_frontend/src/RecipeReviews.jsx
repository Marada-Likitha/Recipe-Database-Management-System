// // RecipeReviews.jsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const RecipeReviews = ({ recipeId }) => {
//   const [reviews, setReviews] = useState([]);

//   useEffect(() => {
//     // Fetch reviews for the specified recipeId
//     axios.get(`http://localhost:8800/reviews/${recipeId}`)
//       .then((response) => {
//         setReviews(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching reviews:', error);
//       });
//   }, [recipeId]);

//   return (
//     <div>
//       <h4>Reviews</h4>
//       <ul>
//         {reviews.map((review) => (
//           <li key={review.ReviewID}>
//             <p>Rating: {review.Rating}</p>
//             <p>Comment: {review.Comment}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default RecipeReviews;

// RecipeReviews.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RecipeReviews = ({ recipeId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch reviews for the specified recipeId
    axios.get(`http://localhost:8800/reviews/${recipeId}`)
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.error('Error fetching reviews:', error);
      });
  }, [recipeId]);

  const deleteReview = (reviewId) => {
    // Make a request to delete the review
    axios
      .delete(`http://localhost:8800/reviews/${reviewId}`)
      .then((response) => {
        console.log(response.data);
        alert('Review deleted successfully');
        // Update the state to remove the deleted review
        setReviews((prevReviews) => prevReviews.filter((review) => review.ReviewID !== reviewId));
      })
      .catch((error) => {
        console.error('Error deleting review:', error);
        // Handle error (e.g., show an error message)
      });
  };

  return (
    <div>
      <h4>Reviews</h4>
      <ul>
        {reviews.map((review) => (
          <li key={review.ReviewID}>
            <p>Rating: {review.Rating}</p>
            <p>Comment: {review.Comment}</p>
            {/* You can add some logic here to check if the user is allowed to delete */}
            <button onClick={() => deleteReview(review.ReviewID)}>Delete Review</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeReviews;