import { React, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Home from "./Home"
import Register from "./Register"
import Login from "./Login"
import Authenticated from "./Authenticated"

export default function App() {
  const [users, setUsers] = useState([]);

  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>

        <hr />

        <Routes>
          <Route
            exact
            path="/"
            element={<Home />}
          />
          <Route
            path="/register"
            element={
              <Register
                users={users}
                setUsers={setUsers}
              />
            }
          />
          <Route
            path="/login"
            element={<Login users={users} />}
          />
          <Route
            path="/authenticated"
            element={<Authenticated />}
          />
        </Routes>
      </div>
    </Router>
  );
}
