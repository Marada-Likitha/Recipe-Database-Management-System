import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import NavBar from './navbar'; // Import the NavBar component
import Carousel from 'react-bootstrap/Carousel';

function Home() {
  // Define a style object for consistent image size
  const imgStyle = {
    width: '100%', // Set the width to 100%
    height: '300px', 
    objectFit: 'cover', // This property ensures the image covers the container while maintaining its aspect ratio
  };

  const location = useLocation();

  // Function to check if the current route is a recipe category route
  const isRecipeCategoryRoute = () => {
    return location.pathname.includes('/breakfast') ||
      location.pathname.includes('/lunch') ||
      location.pathname.includes('/snacks') ||
      location.pathname.includes('/italian') ||
      location.pathname.includes('/juices') ||
      location.pathname.includes('/desserts');
  };

  return (
    <div className="container text-center mt-5">
      <h2>Welcome to the Recipe App</h2>

      {/* Conditionally render the NavBar only for recipe category routes */}
      {isRecipeCategoryRoute() && <NavBar />}

      {/* Display recipe category content */}
      <Outlet />


      {/* Breakfast Section */}
      <div className="row mt-4">
        <div className="col-md-4">
          <Link to="/breakfast" className="text-decoration-none">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Breakfast</h5>
              </div>
            </div>
          </Link>
          <Carousel>
            <Carousel.Item>
              <img src="/images/bf1.jpg" style={imgStyle} alt="Breakfast 1" />
            </Carousel.Item>
            <Carousel.Item>
              <img src="/images/bf2.jpg" style={imgStyle} alt="Breakfast 2" />
            </Carousel.Item>
            <Carousel.Item>
              <img src="/images/bf3.jpg" style={imgStyle} alt="Breakfast 3" />
            </Carousel.Item>
          </Carousel>
        </div>

        {/* Lunch Section */}
        <div className="col-md-4">
          <Link to="/lunch" className="text-decoration-none">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Lunch</h5>
              </div>
            </div>
          </Link>
          <Carousel>
            <Carousel.Item>
              <img src="/images/l1.jpg" style={imgStyle} alt="Lunch 1" />
            </Carousel.Item>
            <Carousel.Item>
              <img src="/images/l2.jpg" style={imgStyle} alt="Lunch 2" />
            </Carousel.Item>
            <Carousel.Item>
              <img src="/images/l3.jpg" style={imgStyle} alt="Lunch 3" />
            </Carousel.Item>
          </Carousel>
        </div>

        {/* Snacks Section */}
        <div className="col-md-4">
          <Link to="/snacks" className="text-decoration-none">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Snacks</h5>
              </div>
            </div>
          </Link>
          <Carousel>
            <Carousel.Item>
              <img src="/images/s1.jpg" style={imgStyle} alt="Snacks 1" />
            </Carousel.Item>
            <Carousel.Item>
              <img src="/images/s2.jpg" style={imgStyle} alt="Snacks 2" />
            </Carousel.Item>
            <Carousel.Item>
              <img src="/images/s3.jpg" style={imgStyle} alt="Snacks 3" />
            </Carousel.Item>
          </Carousel>
        </div>
      </div>

      {/* Italian Section */}
      <div className="row mt-4">
        <div className="col-md-4">
          <Link to="/italian" className="text-decoration-none">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Italian</h5>
              </div>
            </div>
          </Link>
          <Carousel>
            <Carousel.Item>
              <img src="/images/sp1.jpg" style={imgStyle} alt="Italian 1" />
            </Carousel.Item>
            <Carousel.Item>
              <img src="/images/sp2.jpg" style={imgStyle} alt="Italian 2" />
            </Carousel.Item>
            <Carousel.Item>
              <img src="/images/sp3.jpg" style={imgStyle} alt="Italian 3" />
            </Carousel.Item>
          </Carousel>
        </div>

        {/* Juices Section */}
        <div className="col-md-4">
          <Link to="/juices" className="text-decoration-none">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Juices</h5>
              </div>
            </div>
          </Link>
          <Carousel>
            <Carousel.Item>
              <img src="/images/j1.jpg" style={imgStyle} alt="Juice 1" />
            </Carousel.Item>
            <Carousel.Item>
              <img src="/images/j2.jpg" style={imgStyle} alt="Juice 2" />
            </Carousel.Item>
            <Carousel.Item>
              <img src="/images/j3.jpg" style={imgStyle} alt="Juice 3" />
            </Carousel.Item>
          </Carousel>
        </div>

        {/* Desserts Section */}
        <div className="col-md-4">
          <Link to="/desserts" className="text-decoration-none">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Desserts</h5>
              </div>
            </div>
          </Link>
          <Carousel>
            <Carousel.Item>
              <img src="/images/d1.jpg" style={imgStyle} alt="Dessert 1" />
            </Carousel.Item>
            <Carousel.Item>
              <img src="/images/d2.jpg" style={imgStyle} alt="Dessert 2" />
            </Carousel.Item>
            <Carousel.Item>
              <img src="/images/d3.jpg" style={imgStyle} alt="Dessert 3" />
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default Home;
