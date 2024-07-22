"use client" // use client 👉 For Client Component
import { useGlobalContext } from "@/context/store";

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'

// Single User Page
const EditUser = ({ params }: any) => {

    const { userList, auth } = useGlobalContext();
    console.log(userList);
    // Create Router 
    const router = useRouter()
    const [flag, setFlag] = useState<boolean>(false)
    const [load, setLoad] = useState<boolean>(false)

    // Create Employee State 
    const [user, setUser] = useState({
        _id: "",
        name: "",
        email: "",
        mobile: "",
        address: "",
        is_active: true,
        fee_paid: false,
        joining_date: ""
    });

    // Destructure EmployeeId from params
    const { userid } = params

    // Create Get User By Id Function
    const getUserById = async () => {
        const UserArr = userList.filter((user: any) => user._id == userid)
        const User = UserArr?.[0]
        console.log("User :- ", User)

        // Set Employee Data
        setUser({
            _id: User?._id,
            name: User?.name,
            email: User?.email,
            address: User?.address,
            mobile: User?.mobile,
            is_active: User?.is_active,
            fee_paid: User?.fee_paid,
            joining_date: User?.joining_date ? User?.joining_date.split('T')[0] : "", // Ensure date is in YYYY-MM-DD format
        })
        setLoad(false)
    }

    // Create Update Employee Function
    const updateUser = async () => {
        setLoad(true)

        const res = await fetch(`/api/user/${userid}`, {
            method: 'PUT',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                name: user.name,
                email: user.email,
                mobile: user.mobile,
                address: user.address,
                fee_paid: user.fee_paid,
                is_active: user.is_active,
                joining_date: user.joining_date
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
            // navigate (/userlist) route
        }
        setFlag(!flag)
        setLoad(false)
    }

    // Delete Employee Function 
    const deleteUser = async (_id: string) => {
        const res = await fetch(`/api/user/${userid}`, {
            method: 'DELETE'
        })

        // Create Data 
        const data = await res.json();
        console.log(data)

        // Destructure data
        const { message, error } = data

        // Condition
        if (error) {
            alert(error) // Error Message
        }
        else {
            alert(message) // Success Message
            router.push("/dashboard")
        }
    }

    useEffect(() => {
        // Call getUserById Function 
        setLoad(true)
        getUserById();

        if (!auth) { router.push("/") }

    }, [auth]);

    if (load) { return <h1 className='text-center my-10 text-3xl font-[900] h-screen flex justify-center items-center text-white'>Loading ...</h1> }

    return (
        <div className='font-bold '>
            <div className="fixed py-6 w-full z-50 bg-[#AFE61E] border-b-2">
                <Link href={"/dashboard"} >
                    <h1 className='text-center text-3xl font-[900] w-full'>Edit User </h1>
                </Link>
            </div>
            {flag &&
                <div className='bg-[#262626] m-auto flex flex-col justify-center items-center gap-y-6 h-screen '>
                    {/* Main  */}
                    <div className="md:w-[30%] shadow-md border border-gray-400 rounded-xl py-4 px-9 bg-[#AFE61E] mt-20 ">
                        {/* Top  */}
                        <div className="top ">
                            {/* Top-Child  */}
                            <div className="flex gap-[20px] mb-5 items-center">
                                {/* link  */}
                                <button onClick={() => setFlag(!flag)}>
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
                                    className='text-sm p-1.5 border border-gray-400 hover:border-gray-700 w-full rounded-md outline-none mb-5 placeholder-gray-400'
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
                                    className='text-sm p-1.5 border border-gray-400 hover:border-gray-700 w-full rounded-md outline-none mb-5 placeholder-gray-400'
                                />
                            </div>

                            {/* User Mobile Input  */}
                            <div className="">
                                <input
                                    type="number"
                                    name='mobile'
                                    placeholder='Enter number'
                                    value={user.mobile}
                                    onChange={(e) => setUser({
                                        ...user,
                                        mobile: e.target.value
                                    })}
                                    className='text-sm p-1.5 border border-gray-400 hover:border-gray-700 w-full rounded-md outline-none mb-5 placeholder-gray-400'
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
                                    className='text-sm p-1.5 border border-gray-400 hover:border-gray-700 w-full rounded-md outline-none placeholder-gray-400'
                                />
                            </div>

                            {/* Joining Date Input  */}
                            <div className="mb-5">
                                <input
                                    type="date"
                                    name='joiningDate'
                                    value={user.joining_date}
                                    onChange={(e) => setUser({
                                        ...user,
                                        joining_date: e.target.value
                                    })}
                                    className='text-sm p-1.5 border border-gray-400 hover:border-gray-700 w-full rounded-md outline-none placeholder-gray-400'
                                />
                            </div>

                            {/* Fee Paid Select */}
                            <div className="mb-5">
                                <select
                                    value={user.fee_paid ? "true" : "false"}
                                    onChange={(e) => setUser({
                                        ...user,
                                        fee_paid: e.target.value === "true"
                                    })}
                                    className='text-sm p-1.5 border border-gray-400 hover:border-gray-700 w-full rounded-md outline-none'
                                >
                                    <option value="true">Fee Paid</option>
                                    <option value="false">Fee Not Paid</option>
                                </select>
                            </div>

                            {/* Is Active Select */}
                            <div className="mb-5 w-full">
                                <select
                                    value={user.is_active ? "true" : "false"}
                                    onChange={(e) => setUser({
                                        ...user,
                                        is_active: e.target.value === "true"
                                    })}
                                    className='text-sm p-1.5 border border-gray-400 hover:border-gray-700 w-full rounded-md outline-none'
                                >
                                    <option value="true">Active</option>
                                    <option value="false">Inactive</option>
                                </select>
                            </div>

                            {/* Update Button  */}
                            <div>
                                <button onClick={() => { updateUser() }} className=' bg-red-500 hover:bg-red-400 w-full py-1.5 border border-gray-400 rounded-md font-medium '>Edit Detail</button>
                            </div>
                        </div>
                    </div>
                </div>
            }

            {user.name && !flag &&
                <div className="flex flex-col justify-center items-center h-screen pt-20">
                    <div className="text-start text-xl flex flex-col gap-3">
                        <Link href={`/userlist`} className="text-white px-4 md:px-0">Name :- {user?.name}</Link>
                        <h1 className="text-white px-4 md:px-0">Email :- {user?.email}</h1>
                        <h1 className="text-white px-4 md:px-0">Mobile :- {user?.mobile}</h1>
                        <h1 className="text-white px-4 md:px-0">Joining Date :- {user?.joining_date}</h1>
                        <h1 className={`${user?.fee_paid ? "text-green-500" : "text-red-500 animate-bounce"} text-white px-4 md:px-0`}>Fee Paid :- {user?.fee_paid ? "Yes" : "No"}</h1>
                        <h1 className={`${user?.is_active? "text-green-500 " : "text-red-500 animate-bounce"} text-white px-4 md:px-0`}>Active :- {user?.is_active ? "Yes" : "No"}</h1>
                        <h1 className="text-white px-4 md:px-0">Address :- {user?.address}</h1>

                        <div className="flex flex-row justift-center gap-5 items-center my-4 md:my-10 px-2 md:px-0">
                            <button className="bg-red-500 w-40 text-white rounded-xl m-auto text-md p-2 active:scale-90 hover:bg-indigo-500" onClick={() => { setFlag(!flag) }}>Edit User</button>
                            <button className="bg-red-500 w-40 text-white rounded-xl m-auto text-md p-2 active:scale-90 hover:bg-indigo-500" onClick={() => { deleteUser(user?._id) }}>Delete User</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default EditUser
