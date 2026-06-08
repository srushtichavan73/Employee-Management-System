import { useState } from "react";
import axios from "axios";

function Login() {

    const [user, setUser] = useState({
        username: "",
        password: ""
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const loginUser = async (e) => {
        e.preventDefault();

      

        try {
            const response = await axios.post(
                "http://localhost:8080/users/login",
                user
            );

            alert(response.data);

            if (response.data === "Login Successful") {

                localStorage.setItem("isLoggedIn", "true");

                alert("Login Successful");

                window.location.href = "/";
            }

        } catch (error) {
            alert("Error Occurred");
            console.error(error);
        }
    };

    return (
        <div className="container mt-5">

            <div className="card p-4 shadow">

                <h2 className="text-center mb-4">
                    Login
                </h2>

                <form onSubmit={loginUser}>

                    <input
                        type="text"
                        name="username"
                        placeholder="Enter Username"
                        className="form-control mb-3"
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        className="form-control mb-3"
                        onChange={handleChange}
                        required
                    />

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                    >
                        Login
                    </button>

                </form>

            </div>

        </div>
    );
}

export default Login;