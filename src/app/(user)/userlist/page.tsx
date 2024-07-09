"use client" // use client 👉 For Client Component

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

type Props = {}

const UserList = (props: Props) => {

// User State 
const [userList, setUserList] = useState([]);
const [load, setLoad] = useState(false);


// Get User List Function 
const getUserList = async () => {
    // Fetch data from api 
    const res = await fetch(`/api/user`)

    // Create data
    const data = await res.json();

    // Store data in employee state through setEmployee()
    setUserList(data)
    setLoad(false)

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
    setLoad(true)
    getUserList();
}, []);

  if(userList){console.log(userList);}

  
if(load){return <h1 className='text-center my-10 text-3xl font-[900]'>Loading ...</h1>}

  return (
    <div >
        <h1 className='text-center my-10 text-3xl font-[900] '>All User List</h1>
        <div className="grid grid-cols-2 mx-20 gap-5 text-center ">
            {userList?.map((user:any,index)=>(
                <Link href={`/${user._id}`} key={index}>
                <div  className="bg-red-500 p-10">
                    {user.name}
                </div>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default UserList