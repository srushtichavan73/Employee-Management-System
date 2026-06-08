import { useState } from "react";
import axios from "axios";

function Register() {

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

    const registerUser = async (e) => {
        e.preventDefault();

        try {
            await axios.post(
                "http://localhost:8080/users/register",
                user
            );

            alert("Registration Successful ✅");

            setUser({
                username: "",
                password: ""
            });

        } catch (error) {
            console.error(error);
            alert("Registration Failed ❌");
        }
    };

    return (
        <div className="container mt-5">

            <div className="card p-4 shadow">

                <h2 className="text-center mb-4">
                    Register User
                </h2>

                <form onSubmit={registerUser}>

                    <input
                        type="text"
                        name="username"
                        placeholder="Enter Username"
                        className="form-control mb-3"
                        value={user.username}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        className="form-control mb-3"
                        value={user.password}
                        onChange={handleChange}
                        required
                    />

                    <button
                        type="submit"
                        className="btn btn-success w-100"
                    >
                        Register
                    </button>

                </form>

            </div>

        </div>
    );
}

export default Register;