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

const t:any= new Date().toDateString().substring(8,10)



console.log("Todays Date:- ", t , "p")
  
if(load){return <h1 className='text-center my-10 text-3xl font-[900]'>Loading ...</h1>}

  return (

    <div >
        {t && <>
            <h1 className='text-center mt-10 my-20 text-3xl font-[900] '>All User List</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-10 gap-8  ">
            {userList?.map((user:any,index)=>(
                <Link href={`/${user._id}`} key={index}>
                <div  className={`${user.joining_date.toString().substring(8,10) === t?"bg-red-500":"bg-gray-500"} p-4 text-white rounded-xl shadow-md shadow-indigo-500  hover:scale-105 transition-all`}>
                    <div className='flex flex-col gap-y-1   justify-center w-fit m-auto'>
                        <h1>Full Name :- {user.name}</h1>
                        <h1>Joining Date :- {user.joining_date.toString().substring(8,10) === t ? user.joining_date.toString().substring(0,10):"00"}</h1>

                    </div>
                </div>
                </Link>
            ))}
        </div>
        </>}
      
    </div>
  )
}

export default UserList