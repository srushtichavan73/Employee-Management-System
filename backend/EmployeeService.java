package com.example.demo.service;
import com.example.demo.dto.EmployeeDTO;
import com.example.demo.Entity.Employee;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


import java.util.List;

@Service
public class EmployeeService {



        private static final Logger logger =
                LoggerFactory.getLogger(EmployeeService.class);



    public List<Employee> getEmployeesSortedBy(String field) {


        return employeeRepository.findAll(Sort.by(Sort.Direction.ASC, field));
    }


    public Page<Employee> getEmployeesWithPagination(int page, int size) {

        return employeeRepository.findAll(PageRequest.of(page, size));
    }

    public EmployeeDTO getEmployeeDTOById(int id) {

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Employee not found with id: " + id));

        EmployeeDTO dto = new EmployeeDTO();

        dto.setId(employee.getId());
        dto.setName(employee.getName());
        dto.setDepartment(employee.getDepartment());

        return dto;
    }

    public List<Employee> getEmployeesByDepartment(String department) {

        return employeeRepository.findByDepartment(department);
    }

    @Autowired
    private EmployeeRepository employeeRepository;

    // Get All Employees
    public List<Employee> getAllEmployees() {



            logger.info("Fetching all employees");


        return employeeRepository.findAll();
    }

    public Employee getEmployeeById(int id) {

        return employeeRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Employee not found with id: " + id));
    }

    // Add Employee
    public Employee addEmployee(Employee employee) {


            logger.info("Adding employee: {}", employee.getName());


        return employeeRepository.save(employee);
    }

    // Update Employee
    public Employee updateEmployee(int id, Employee updatedEmployee) {

        Employee employee = employeeRepository.findById(id).orElse(null);

        if (employee != null) {
            employee.setName(updatedEmployee.getName());
            employee.setDepartment(updatedEmployee.getDepartment());
            employee.setSalary(updatedEmployee.getSalary());

            return employeeRepository.save(employee);
        }

        return null;
    }

    // Delete Employee
    public String deleteEmployee(int id) {



            logger.warn("Deleting employee with id: {}", id);

            employeeRepository.deleteById(id);

            return "Employee deleted successfully";
        }


}