// App.js
import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, Outlet, RouterProvider } from 'react-router-dom';
import NavBar from './navbar';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Home from './Home';
import Recipe from './Recipe';
import Add from './Add';
import Update from './Update';
import Delete from './Delete';
import ReviewForm from './reviews';

const Root = () => {
  return (
    <>
      <div>
        <Outlet />
      </div>
    </>
  );
};

const HomeRoutes = () => {
  return (
    <>
      <Route index path="/Home" element={<Home />} />
      <Route path="breakfast/*" element={<Recipe category="Breakfast" />} />
      <Route path="lunch/*" element={<Recipe category="Lunch" />} />
      <Route path="snacks/*" element={<Recipe category="Snacks" />} />
      <Route path="italian/*" element={<Recipe category="Italian" />} />
      <Route path="juices/*" element={<Recipe category="Juices" />} />
      <Route path="desserts/*" element={<Recipe category="Desserts" />} />
    </>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index path="/" element={<SignIn />} />
      <Route path="/SignUp" element={<SignUp />} />
      {HomeRoutes()}
      <Route path="/Add" element={<Add />} />
      <Route path="/update/:id" element={<Update />} />
      <Route path="/reviews/:id" element={<ReviewForm/>} />
    </Route>
  )
);

function App() {
  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
