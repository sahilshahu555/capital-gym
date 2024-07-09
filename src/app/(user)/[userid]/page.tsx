"use client" // use client 👉 For Client Component

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
// Single User Page
const EditUser = ({ params }:any) => {
    // Crreate Router 
    const router = useRouter()
    const [data, setData] = useState<any>({})

    //Create Employee State 
    const [user, setUser] = useState({
        name: "",
        email: "",
        address: "",
        salary: ""
    });

    // Destructure EmployeeId from params
    const { userid } = params
    // console.log(params)

    // Create Get User By Id Function
    const getUserById = async () => {
        const res = await fetch(`/api/user/${userid}`, {
            method: 'GET',
        })

        // Create Data
        const data = await res.json();
         console.log(data?.getSingleUser)
         setData(data?.getSingleUser)

        // Set Employee Data
        // setUser({
        //     name: data.getSingleEmployee?.name,
        //     email: data.getSingleEmployee?.email,
        //     address: data.getSingleEmployee?.address,
        //     salary: data.getSingleEmployee?.salary
        // })
    }


    // Create Update Employee Function
    const updateEmployee = async () => {

        const res = await
            fetch(`/api/user/${userid}`, {
                method: 'PUT',
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    // name: employee.name,
                    // email: employee.email,
                    // address: employee.address,
                    // salary: employee.salary
                })
            })
        // Create Data 
        const data = await res.json();
        console.log(data)

        // Destructure Data 
        const { message, error } = data;

        // Condition
        if (error) {
            alert(error) // Error Message
        }
        else {
            alert(message) // Success Message
            router.push('/userlist') // navigate (/userlist) route
        }
    }

    useEffect(() => {
        // Call getUserById Function 
        getUserById();
    }, [userid]);
  return (
    
    
    <div className='text-center text-2xl font-bold mt-20'>
        {data && 
        <div>
           <Link href={"/userlist"}> {data?.name}</Link>
        </div>
        }
    </div>
    
  )
}

export default EditUser