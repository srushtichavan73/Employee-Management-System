import { useState } from "react";
import axios from "axios";

function AddEmployee() {

    const [employee, setEmployee] = useState({
        id: "",
        name: "",
        department: "",
        salary: ""
    });

    const handleChange = (e) => {
        setEmployee({
            ...employee,
            [e.target.name]: e.target.value
        });
    };

    const saveEmployee = async (e) => {
        e.preventDefault();
        if (
            employee.id === "" ||
            employee.name.trim() === "" ||
            employee.department.trim() === "" ||
            employee.salary === "" ||
            employee.salary <= 0
        ) {
            alert("Please enter valid employee details");
            return;
        }

        try {
            await axios.post(
                "http://localhost:8080/employees",
                employee
            );

            alert("Employee Added Successfully");

            window.location.reload();

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="card p-4 shadow mb-4">

            <h3 className="text-center mb-4">
                Add Employee
            </h3>

            <form onSubmit={saveEmployee}>

                <div className="mb-3">
                    <input
                        type="number"
                        name="id"
                        className="form-control"
                        placeholder="Enter Employee ID"
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Enter Employee Name"
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="text"
                        name="department"
                        className="form-control"
                        placeholder="Enter Department"
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="number"
                        name="salary"
                        className="form-control"
                        placeholder="Enter Salary"
                        onChange={handleChange}
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary w-100"
                >
                    Add Employee
                </button>

            </form>

        </div>
    );
}

export default AddEmployee;