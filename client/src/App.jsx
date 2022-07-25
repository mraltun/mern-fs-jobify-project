import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Import pages
import { Register, Landing, Error, ProtectedRoute } from "./pages";
// Import dashboard pages
import {
  AddJob,
  AllJobs,
  Profile,
  SharedLayout,
  Stats,
} from "./pages/dashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Check if the user is logged in to show SharedLayout */}
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          {/* Routes for  "/dashboard", the index is Stats page */}
          <Route index element={<Stats />} />
          <Route path='all-jobs' element={<AllJobs />}></Route>
          <Route path='add-job' element={<AddJob />}></Route>
          <Route path='profile' element={<Profile />}></Route>
        </Route>
        <Route path='/register' element={<Register />} />
        <Route path='/landing' element={<Landing />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
