import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import AddEmployee from "./components/AddEmployee";
import EmployeeList from "./components/EmployeeList";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
    return (
        <Router>

            {/* Navigation */}
            <div style={{ textAlign: "center", margin: "20px" }}>
                <Link to="/">
                    <button className="btn btn-primary m-2">Home</button>
                </Link>

                <Link to="/register">
                    <button className="btn btn-success m-2">Register</button>
                </Link>

                <Link to="/login">
                    <button className="btn btn-dark m-2">Login</button>
                </Link>
                <button
                    className="btn btn-danger m-2"
                    onClick={() => {
                        localStorage.removeItem("isLoggedIn");
                        window.location.href = "/login";
                    }}
                >
                    Logout
                </button>

            </div>

            {/* MUST wrap inside Routes */}
            <Routes>

                <Route
                    path="/"
                    element={
                        localStorage.getItem("isLoggedIn") === "true" ? (
                            <>
                                <AddEmployee />
                                <EmployeeList />
                            </>
                        ) : (
                            <h2 style={{ textAlign: "center" }}>
                                Please Login First 🔒
                            </h2>
                        )
                    }
                />

                <Route path="/register" element={<Register />} />

                <Route path="/login" element={<Login />} />

            </Routes>

        </Router>
    );
}

export default App;