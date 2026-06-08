package com.example.demo.controller;
import jakarta.validation.Valid;
import com.example.demo.Entity.Employee;
import com.example.demo.dto.EmployeeDTO;
import com.example.demo.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;


@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/employees")

public class EmployeeController {

    @GetMapping("/sort/{field}")
    public List<Employee> getEmployeesSortedBy(@PathVariable String field) {

        return employeeService.getEmployeesSortedBy(field);
    }

    @GetMapping("/pagination")
    public Page<Employee> getEmployeesWithPagination(
            @RequestParam int page,
            @RequestParam int size) {

        return employeeService.getEmployeesWithPagination(page, size);
    }

    @GetMapping("/department/{department}")
    public List<Employee> getEmployeesByDepartment(@PathVariable String department) {

        return employeeService.getEmployeesByDepartment(department);
    }

    @GetMapping("/dto/{id}")
    public EmployeeDTO getEmployeeDTO(@PathVariable int id) {

        return employeeService.getEmployeeDTOById(id);
    }

    @Autowired
    private EmployeeService employeeService;

    // Get All Employees
    @GetMapping
    public List<Employee> getAllEmployees() {
        return employeeService.getAllEmployees();
    }

    // Get Employee By ID
    @GetMapping("/{id}")
    public Employee getEmployeeById(@PathVariable int id) {
        return employeeService.getEmployeeById(id);
    }

    // Add Employee
    @PostMapping
    public Employee addEmployee(@Valid @RequestBody Employee employee) {
        return employeeService.addEmployee(employee);
    }

    // Update Employee
    @PutMapping("/{id}")
    public Employee updateEmployee(@PathVariable int id,
                                   @RequestBody Employee updatedEmployee) {



        return employeeService.updateEmployee(id, updatedEmployee);
    }


    // Delete Employee
    @DeleteMapping("/{id}")
    public String deleteEmployee(@PathVariable int id) {

        return employeeService.deleteEmployee(id);
    }
}