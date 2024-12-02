import React from 'react';
import styles from '../styles/Report.module.scss'

// Component hiển thị thông tin nhân viên và khách hàng
const EmployeeDetails = () => {
    const employees = [
        {
            employeeId: 1,
            firstName: "John",
            lastName: "Doe",
            email: "employee1@example.com",
            phoneNumber: "101",
            street: "123 Main St",
            district: "District A",
            city: "City A",
            customers: [
                {
                    customerId: 1,
                    firstName: "Alice",
                    lastName: "Johnson",
                    email: "alice.johnson@example.com",
                    homeAddress: "123 Home St",
                    officeAddress: "100 Office St",
                },
                {
                    customerId: 2,
                    firstName: "Bob",
                    lastName: "Smith",
                    email: "bob.smith@example.com",
                    homeAddress: "456 Home St",
                    officeAddress: "200 Office St",
                },
            ],
        },
        {
            employeeId: 2,
            firstName: "Jane",
            lastName: "Doe",
            email: "employee2@example.com",
            phoneNumber: "102",
            street: "456 Main St",
            district: "District B",
            city: "City B",
            customers: [
                {
                    customerId: 3,
                    firstName: "Eve",
                    lastName: "Davis",
                    email: "eve.davis@example.com",
                    homeAddress: "789 Home St",
                    officeAddress: "300 Office St",
                },
                {
                    customerId: 4,
                    firstName: "Charlie",
                    lastName: "Brown",
                    email: "charlie.brown@example.com",
                    homeAddress: "321 Home St",
                    officeAddress: "400 Office St",
                },
            ],
        },
        {
            employeeId: 3,
            firstName: "Mark",
            lastName: "Taylor",
            email: "employee3@example.com",
            phoneNumber: "103",
            street: "789 Central St",
            district: "District C",
            city: "City C",
            customers: [
                {
                    customerId: 5,
                    firstName: "Grace",
                    lastName: "Wilson",
                    email: "grace.wilson@example.com",
                    homeAddress: "555 Home St",
                    officeAddress: "600 Office St",
                },
            ],
        },
        {
            employeeId: 4,
            firstName: "Lucas",
            lastName: "Miller",
            email: "employee4@example.com",
            phoneNumber: "104",
            street: "321 South St",
            district: "District D",
            city: "City D",
            customers: [
                {
                    customerId: 6,
                    firstName: "Sophia",
                    lastName: "Anderson",
                    email: "sophia.anderson@example.com",
                    homeAddress: "777 Home St",
                    officeAddress: "800 Office St",
                },
                {
                    customerId: 7,
                    firstName: "Mason",
                    lastName: "Thomas",
                    email: "mason.thomas@example.com",
                    homeAddress: "999 Home St",
                    officeAddress: "1000 Office St",
                },
            ],
        },
        {
            employeeId: 5,
            firstName: "Olivia",
            lastName: "Garcia",
            email: "employee5@example.com",
            phoneNumber: "105",
            street: "654 West St",
            district: "District E",
            city: "City E",
            customers: [
                {
                    customerId: 8,
                    firstName: "Liam",
                    lastName: "Martinez",
                    email: "liam.martinez@example.com",
                    homeAddress: "222 Home St",
                    officeAddress: "300 Office St",
                },
                {
                    customerId: 9,
                    firstName: "Isabella",
                    lastName: "Rodriguez",
                    email: "isabella.rodriguez@example.com",
                    homeAddress: "444 Home St",
                    officeAddress: "500 Office St",
                },
            ],
        },
        {
            employeeId: 6,
            firstName: "Emma",
            lastName: "Lopez",
            email: "employee6@example.com",
            phoneNumber: "106",
            street: "987 North St",
            district: "District F",
            city: "City F",
            customers: [
                {
                    customerId: 10,
                    firstName: "Alexander",
                    lastName: "Hernandez",
                    email: "alexander.hernandez@example.com",
                    homeAddress: "666 Home St",
                    officeAddress: "700 Office St",
                },
            ],
        },
    ];
    return (
        <div className='row' style={{ borderBottom: '1px solid #ccc' }}>
            {employees.map((employee) => (
                <div key={employee.employeeId} style={{padding: '10px'}} className='col l-6'>
                    <div className={styles.container} style={{padding: '20px'}}>
                        <h2 style={{ color: '#2c3e50' }}>{employee.firstName} {employee.lastName}</h2>
                        <p><strong>Email:</strong> {employee.email}</p>
                        <p><strong>Số điện thoại:</strong> {employee.phoneNumber}</p>
                        <p><strong>Địa chỉ:</strong> {employee.street}, {employee.district}, {employee.city}</p>

                        <h3 style={{ marginTop: '15px' }}>Khách Hàng Liên Quan:</h3>
                        <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
                            {employee.customers.map((customer) => (
                                <li key={customer.customerId} style={{ marginBottom: '10px', backgroundColor: '#f9f9f9', padding: '10px', borderRadius: '8px' }}>
                                    <p><strong>Tên:</strong> {customer.firstName} {customer.lastName}</p>
                                    <p><strong>Email:</strong> {customer.email}</p>
                                    <p><strong>Địa chỉ nhà:</strong> {customer.homeAddress}</p>
                                    <p><strong>Địa chỉ văn phòng:</strong> {customer.officeAddress}</p>
                                </li>
                            ))}
                        </ul>

                    </div>
                </div>
            ))}
        </div>
    );
};

export default EmployeeDetails;
