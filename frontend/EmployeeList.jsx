import { useEffect, useState } from "react";
import axios from "axios";

function EmployeeList() {

    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    async function loadEmployees() {
        try {

            const response = await axios.get(
                `http://localhost:8080/employees/pagination?page=${page}&size=5`
            );

            setEmployees(response.data.content);
            setTotalPages(response.data.totalPages);

        } catch (error) {
            console.error(error);
        }
    }

    async function deleteEmployee(id) {
        try {
            await axios.delete(
                `http://localhost:8080/employees/${id}`
            );

            alert("Employee Deleted Successfully");

            await loadEmployees();

        } catch (error) {
            console.error(error);
        }
    }

    function handleEdit(employee) {
        setSelectedEmployee(employee);
    }

    async function updateEmployee() {
        try {
            await axios.put(
                `http://localhost:8080/employees/${selectedEmployee.id}`,
                selectedEmployee
            );

            alert("Employee Updated Successfully");

            setSelectedEmployee(null);

            await loadEmployees();

        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        loadEmployees();
    }, [page]);

    return (
        <div>

            <h2 className="mb-3">Employee List</h2>
            <h5 className="text-primary">
                Total Employees: {employees.length}
            </h5>


            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search Employee Name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="card p-3 shadow">
                <div className="mt-3 d-flex justify-content-between">

                    <button
                        className="btn btn-secondary"
                        disabled={page === 0}
                        onClick={() => setPage(page - 1)}
                    >
                        Previous
                    </button>

                    <span>
        Page {page + 1} of {totalPages}
    </span>

                    <button
                        className="btn btn-secondary"
                        disabled={page + 1 >= totalPages}
                        onClick={() => setPage(page + 1)}
                    >
                        Next
                    </button>

                </div>

                <table className="table table-bordered table-hover table-striped">

                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Salary</th>
                        <th>Actions</th>
                    </tr>
                    </thead>

                    <tbody>

                    {employees
                        .filter((emp) =>
                            emp.name.toLowerCase().includes(
                                searchTerm.toLowerCase()
                            )
                        )
                        .map((emp) => (
                            <tr key={emp.id}>
                                <td>{emp.id}</td>
                                <td>{emp.name}</td>
                                <td>{emp.department}</td>
                                <td>{emp.salary}</td>

                                <td>
                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => handleEdit(emp)}
                                    >
                                        Update
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => deleteEmployee(emp.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}

                    </tbody>

                </table>

            </div>

            {selectedEmployee && (

                <div className="card p-4 shadow mt-4">

                    <h3 className="mb-3">
                        Update Employee
                    </h3>

                    <input
                        type="text"
                        className="form-control mb-3"
                        value={selectedEmployee.name}
                        onChange={(e) =>
                            setSelectedEmployee({
                                ...selectedEmployee,
                                name: e.target.value
                            })
                        }
                    />

                    <input
                        type="text"
                        className="form-control mb-3"
                        value={selectedEmployee.department}
                        onChange={(e) =>
                            setSelectedEmployee({
                                ...selectedEmployee,
                                department: e.target.value
                            })
                        }
                    />

                    <input
                        type="number"
                        className="form-control mb-3"
                        value={selectedEmployee.salary}
                        onChange={(e) =>
                            setSelectedEmployee({
                                ...selectedEmployee,
                                salary: e.target.value
                            })
                        }
                    />

                    <button
                        className="btn btn-success"
                        onClick={updateEmployee}
                    >
                        Save Changes
                    </button>

                </div>
            )}

        </div>
    );
}

export default EmployeeList;