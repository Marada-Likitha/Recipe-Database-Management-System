// // ReviewForm.jsx
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router';

// const ReviewForm = () => {
//   const [rating, setRating] = useState(0);
//   const [comments, setComments] = useState('');
//   const { id } = useParams();

//   const submitReview = () => {
//     axios
//       .post(`http://localhost:8800/reviews/${id}`, { rating, comments })  // Corrected route
//       .then((response) => {
//         console.log(response.data);
//         alert('Review added successfully');
//         // Handle success (e.g., show a success message)
//       })
//       .catch((error) => {
//         console.error('Error adding review:', error);
//         // Handle error (e.g., show an error message)
//       });
//   };

//   return (
//     <div className="container mt-4">
//       <h2>Write a Review</h2>
//       <form>
//         <div className="mb-3">
//           <label className="form-label">Rating:</label>
//           <input
//             type="number"
//             className="form-control"
//             value={rating}
//             onChange={(e) => setRating(e.target.value)}
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Comments:</label>
//           <textarea
//             className="form-control"
//             value={comments}
//             onChange={(e) => setComments(e.target.value)}
//           />
//         </div>
//         <button type="button" className="btn btn-primary" onClick={submitReview}>
//           Submit Review
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ReviewForm;

// ReviewForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ReviewForm = () => {
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  // const submitReview = () => {
  //   // Check if the rating is within the valid range (1 to 5)
  //   if (rating >= 1 && rating <= 5) {
  //     axios
  //       .post(`http://localhost:8800/reviews/${id}`, { rating, comments })
  //       .then((response) => {
  //         console.log(response.data);
  //         alert('Review added successfully');
  //         // Navigate to the Recipe page after successful submission
  //         navigate('/Recipe');
  //       })
  //       .catch((error) => {
  //         console.error('Error adding review:', error);
  //       });
  //   } else {
  //     // Handle invalid rating (outside the range)
  //     alert('Please enter a rating between 1 and 5.');
  //   }
  // };

  const submitReview = () => {
    // Check if the rating is within the valid range (1 to 5)
    if (rating >= 1 && rating <= 5) {
      axios
        .post(`http://localhost:8800/reviews/${id}`, { rating, comments })
        .then((response) => {
          console.log(response.data);
          alert('Review added successfully');
          // Navigate to the Recipe page after successful submission
          // navigate('/Recipe', { replace: true });  // Use replace to replace the current entry in the history stack
        })
        .catch((error) => {
          console.error('Error adding review:', error);
        });
    } else {
      // Handle invalid rating (outside the range)
      alert('Please enter a rating between 1 and 5.');
    }
  };
  
  return (
    <div className="container mt-4">
      <h2>Write a Review</h2>
      <form>
        <div className="mb-3">
          <label className="form-label">Rating:</label>
          <input
            type="number"
            className="form-control"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Comments:</label>
          <textarea
            className="form-control"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={submitReview}>
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;