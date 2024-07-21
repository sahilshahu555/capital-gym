"use client" // use client 👉 For Client Component
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useGlobalContext } from "@/context/store";
import { useRouter } from 'next/navigation'

type Props = {}

const UserList = (props: Props) => {
    const router = useRouter();

    const {userList,auth} =useGlobalContext();
    console.log(userList);
    
// const [load, setLoad] = useState(false);


// Get User List Function 
// const getUserList = async () => {
//     // Fetch data from api 
//     const res = await fetch(`/api/user`)

//     // Create data
//     const data = await res.json();

//     // Store data in employee state through setEmployee()
//     setUserList(data)
//     setLoad(false)

// }




useEffect(() => {
  
    if(!auth){ router.push("/")}

}, [auth]);

  if(userList){console.log(userList);}

const t:any= new Date().toDateString().substring(8,10)



console.log("Todays Date:- ", t , "p")
  
// if(load){return <h1 className='text-center my-10 text-3xl font-[900] h-screen flex justify-center items-center text-white'>Loading ...</h1>}

  return (

    <div >
        {t && <>
           <div className="fixed  py-6 w-full z-50 bg-[#AFE61E] border-b-2">
           <Link href={"/dashboard"} >
           <h1 className='text-center   text-3xl font-[900] w-full'>{`All User List :- ${userList.length}`}</h1>
           </Link>
           
           </div>
        <div className="pt-36 md:pt-40 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-10  gap-8  mb-10">
            {userList?.map((user:any,index:any)=>(
                
                <div  className={`${!!user.fee_paid ?"bg-[#AFE61E]":"bg-red-500"} p-1.5 md:p-4 font-semibold rounded-xl shadow-sm shadow-white  hover:scale-105 transition-all`} key={index}>
                    <Link  href={`/${user._id}`} >
                        <div className='flex flex-col gap-y-2   justify-center w-fit m-auto'>
                            <h1 className="text-sm md:text-md font-bold "> {user.name}</h1>
                            <h1 className="text-sm md:text-md font-bold "> {user.email}</h1>
                        </div>
                    </Link>
                    
                </div>
               
               
            ))}
        </div>
        </>}
      
    </div>
  )
}

export default UserList