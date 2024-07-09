"use client" // use client 👉 For Client Component

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

type Props = {}

const UserList = (props: Props) => {

// User State 
const [userList, setUserList] = useState([]);

// Get User List Function 
const getUserList = async () => {
    // Fetch data from api 
    const res = await fetch(`/api/user`)

    // Create data
    const data = await res.json();

    // Store data in employee state through setEmployee()
    setUserList(data)
}

// Delete Employee Function 
const deleteEmployee = async (_id:string) => {
    const res = await fetch(`/api/user/${_id}`, {
        method: 'DELETE'
    })

    // Create Data 
    const data = await res.json();
    // console.log(data)

    // Destructure data
    const { message, error } = data

    // Condition
    if (error) {
        alert(error) // Error Message
    }
    else {
        alert(message) // Success Message
    }

    getUserList(); // Call GetEmployeeList Function
}


useEffect(() => {
    // Call getUserList Function
    getUserList();
}, []);

console.log(userList);

  return (
    <div>UserList</div>
  )
}

export default UserList