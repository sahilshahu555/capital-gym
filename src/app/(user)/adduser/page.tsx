"use client" // use client 👉 For Client Component

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { useGlobalContext } from "@/context/store";

const AddUser = () => {
    const router = useRouter();
    const { auth } = useGlobalContext();

    // User State 
    const [user, setUser] = useState({
        name: "",
        email: "",
        mobile: "",
        address: "",
        is_active: true,
        fee_paid: false,
        joining_date: ""
    });

    // Create Add User Detail Function 
    const addUserDetail = async () => {
        try {
            const res = await fetch('/api/user', {
                method: 'POST',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(user)
            });

            // Create Data 
            const data = await res.json();
            alert(data?.message); // Success Message
            if (data?.message === "User created successfully") {
                // Reset User State 
                setUser({
                    name: "",
                    email: "",
                    mobile: "",
                    address: "",
                    is_active: true,
                    fee_paid: false,
                    joining_date: ""
                });
                router.push('/dashboard');
            }

        } catch (error: any) {
            alert(error.error); // Error Message
            console.log(error);
        }
    }

    useEffect(() => {
        if (!auth) { router.push("/") }
    }, [auth]);

    return (
        <div className=' bg-[#262626] w-full m-auto flex flex-col justify-center items-center gap-y-6 '>
            <h1 className="text-4xl font-bold text-white ">Capital Gym</h1>
            {/* Main  */}
            <div className="form border shadow-md border-white bg-[#AFE61E] rounded-xl p-4">
                {/* Top  */}
                <div className="top">
                    {/* Top-Child  */}
                    <div className="flex gap-[40px] mb-5 items-center ">
                        {/* Link  */}
                        <Link href='/dashboard'>
                            {/* Svg Icon  */}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </Link>

                        {/* Text  */}
                        <h1 className='text-xl -ml-5 traking-wider font-semibold'>
                            Add User Detail
                        </h1>
                    </div>
                </div>

                {/* Form  */}
                <div className=" lg:w-full">

                    {/* User Name Input  */}
                    <div className=" ">
                        <input
                            type="text"
                            name='userName'
                            placeholder='Enter name'
                            value={user.name}
                            onChange={(e) => setUser({
                                ...user,
                                name: e.target.value
                            })}
                            className='border border-gray-400 hover:border-gray-700 md:w-96 px-1.5 py-1.5 rounded-md outline-none mb-5 placeholder-gray-400'
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
                            className='border border-gray-400 hover:border-gray-700 md:w-96 px-1.5 py-1.5 rounded-md outline-none mb-5 placeholder-gray-400'
                        />
                    </div>

                    {/* User Mobile Number Input  */}
                    <div className="">
                        <input
                            type="number"
                            name='mobile'
                            placeholder='Enter mobile number'
                            value={user.mobile}
                            onChange={(e) => setUser({
                                ...user,
                                mobile: e.target.value
                            })}
                            className='border border-gray-400 hover:border-gray-700 md:w-96 px-1.5 py-1.5 rounded-md outline-none mb-5 placeholder-gray-400'
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
                            className='border border-gray-400 hover:border-gray-700 w-full md:w-96 px-1.5 py-1.5 rounded-md outline-none mb-5 placeholder-gray-400'
                        />
                    </div>

                    {/* Joining Date Input  */}
                    <div className="mb-5 ">
                        <input
                            type="date"
                            name='joiningDate'
                            value={user.joining_date}
                            onChange={(e) => setUser({
                                ...user,
                                joining_date: e.target.value
                            })}
                            className='border border-gray-400 hover:border-gray-700 w-full md:w-96 px-1.5 py-1.5 rounded-md outline-none placeholder-gray-400'
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
                            className='border border-gray-400 hover:border-gray-700  w-full md:w-96 px-1.5 py-1.5 rounded-md outline-none'
                        >
                            <option value="true">Fee Paid</option>
                            <option value="false">Fee Not Paid</option>
                        </select>
                    </div>

                    {/* Is Active Select */}
                    <div className="mb-5">
                        <select
                            value={user.is_active ? "true" : "false"}
                            onChange={(e) => setUser({
                                ...user,
                                is_active: e.target.value === "true"
                            })}
                            className='border border-gray-400 hover:border-gray-700  w-full md:w-96 px-1.5 py-1.5 rounded-md outline-none'
                        >
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>
                        </select>
                    </div>

                    {/* Add User Details Button  */}
                    <button onClick={addUserDetail}
                        className='bg-red-400 hover:bg-red-500 w-full m-auto py-1.5 border border-gray-400 rounded-md font-medium mb-5 flex justify-center'>
                        Add Detail
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddUser;
