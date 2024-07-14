"use client" // use client 👉 For Client Component

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
// Single User Page
const EditUser = ({ params }:any) => {
    // Crreate Router 
    const router = useRouter()
    const [flag, setFlag] = useState<boolean>(false)
    const [load, setLoad] = useState<boolean>(false)



    //Create Employee State 
    const [user, setUser] = useState({
        name: "",
        email: "",
        mobile:"",
        address: "",
        is_active: true,
        fee_paid: false,
        joining_date:""
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
       

        // Set Employee Data
        setUser({
            name: data?.getSingleUser?.name,
            email: data?.getSingleUser?.email,
            address: data?.getSingleUser?.address,
            mobile: data?.getSingleUser?.mobile,
            is_active: data?.getSingleUser?.is_active,
            fee_paid: data?.getSingleUser?.fee_paid,
            joining_date: data?.getSingleUser?.joining_date,

        })
        setLoad(false)

    }


    // Create Update Employee Function
    const updateUser = async () => {
        setLoad(true)

        const res = await
            fetch(`/api/user/${userid}`, {
                method: 'PUT',
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    name: user.name,
                    email: user.email,
                    mobile:user.mobile,
                    address: user.address,
                    fee_paid: user.fee_paid,
                    is_active:user.is_active,
                    joining_date:user.joining_date
                })
            })
        // Create Data 
        const data = await res.json();
        console.log(data)

        // Destructure Data 
        const { message, error } = data;

        // Condition
        if (error) {
            alert(JSON.stringify(error)) // Error Message
        }
        else {
            alert(message) // Success Message
            router.push('/userlist') // navigate (/userlist) route
        }
        setLoad(false)

    }

    useEffect(() => {
        // Call getUserById Function 
        setLoad(true)
        getUserById();
    }, []);

    if(load){return <h1 className='text-center my-10 text-3xl font-[900] h-screen flex justify-center items-center text-white'>Loading ...</h1>}

  return (
    
    
    <div className='text-center  font-bold '>
        {flag &&
           <div className=' bg-[#262626]  m-auto flex flex-col justify-center items-center gap-y-6 h-screen '>
            <h1 className="text-4xl font-bold text-white">Capital Gym</h1>
            {/* Main  */}
            <div className="md:w-[30%] shadow-md border border-gray-400 rounded-xl py-6 px-9 bg-[#AFE61E] ">
                {/* Top  */}
                <div className="top">
                    {/* Top-Child  */}
                    <div className="flex gap-[40px] mb-5 items-center">
                        {/* link  */}
                        <button onClick={()=>setFlag(!flag)}>
                            {/* Svg icon  */}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </button>

                        {/* text  */}
                        <h1 className='text-2xl font-semibold'>Edit User Detail</h1>
                    </div>
                </div>

                {/* Bottom  */}
                <div className=" ">
                    {/* User Name Input   */}
                    <div className="">
                        <input
                            type="text"
                            name='userName'
                            placeholder='Enter name'
                            value={user.name}
                            onChange={(e) => setUser({
                                ...user,
                                name: e.target.value
                            })}
                            className='text-sm p-1.5 border border-gray-400 hover:border-gray-700  w-full rounded-md outline-none mb-5 placeholder-gray-400'
                        />
                    </div>

                    {/* User Email Input  */}
                    <div className="">
                        <input
                            type="email"
                            name='userEmail'
                            placeholder='Enter email'
                            value={user.email}
                            onChange={(e) => setUser({
                                ...user,
                                email: e.target.value
                            })}
                            className='text-sm p-1.5 border border-gray-400 hover:border-gray-700  w-full rounded-md outline-none mb-5 placeholder-gray-400'
                        />
                    </div>

                    {/* User Mobile Input  */}
                    <div className="">
                        <input
                            type="number"
                            name='mobile'
                            placeholder='Enter salary'
                            value={user.mobile}
                            onChange={(e) => setUser({
                                ...user,
                                mobile: e.target.value
                            })}
                            className='text-sm p-1.5 border border-gray-400 hover:border-gray-700 w-full  rounded-md outline-none mb-5 placeholder-gray-400'
                        />
                    </div>


                    {/* User Address Input  */}
                    <div className="">
                        <textarea
                           
                            name='userAddress'
                            placeholder='Enter address'
                            value={user.address}
                            onChange={(e) => setUser({
                                ...user,
                                address: e.target.value
                            })}
                            className='text-sm p-1.5 border border-gray-400 hover:border-gray-700  w-full rounded-md outline-none  placeholder-gray-400'
                        />
                    </div>

                    
                    {/* Update Button  */}
                    <div>
                        <button onClick={()=>{updateUser()}} className='mt-5 bg-red-500 hover:bg-red-400 w-full py-1.5 border border-gray-400 rounded-md font-medium mb-5'>Edit Detail</button>
                    </div>
                </div>
            </div>
           </div>
        }

        {user.name && !flag &&
        <div className="flex flex-col justify-center items-center h-screen">
           <Link href={`/userlist`} className="text-white"> {user?.name}</Link>
           <h1 className="text-white">{user?.email}</h1>
           <h1 className="text-white">{user?.mobile}</h1>
           <h1 className="text-white">{user?.joining_date.toString().substring(0,10)}</h1>
           <h1 className="text-white">{user?.address}</h1>



          


           <button className="bg-red-500  w-40 text-white rounded-xl m-auto text-md p-2 my-10 active:scale-90" onClick={()=>{setFlag(!flag)}}>Edit User</button>
        </div>
        }
    </div>
    
  )
}

export default EditUser