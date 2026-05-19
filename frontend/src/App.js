import {
  Routes,
  Route,
} from "react-router-dom";

import Login from "./pages/Login.jsx";

import Signup from "./pages/Signup.jsx";

import Dashboard from "./pages/Dashboard.jsx";

import ComplaintForm from "./pages/ComplaintForm.jsx";

import ComplaintList from "./pages/ComplaintList.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {

  return (
    <Routes>

      <Route
        path="/"
        element={<Login />}
      />

      <Route
        path="/signup"
        element={<Signup />}
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/add-complaint"
        element={
          <ProtectedRoute>
            <ComplaintForm />
          </ProtectedRoute>
        }
      />

      <Route
        path="/complaints"
        element={
          <ProtectedRoute>
            <ComplaintList />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;