"use client" // use client 👉 For Client Component
import { useGlobalContext } from "@/context/store";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'

type Props = {}

const TodayFeeCollection = (props: Props) => {

    const router = useRouter();
    const {userList,auth} =useGlobalContext();
    console.log(userList);

    const [feeCollectionList,setFeeCollectionList]=useState<any>()


useEffect(() => {
    // Call getUserList Function
      const arr= userList.filter((elm:any)=>elm.joining_date.toString().substring(8,10) === new Date().toDateString().substring(8,10))
      setFeeCollectionList(arr)

      if(!auth){ router.push("/")}


}, [userList,auth]);

 console.log(feeCollectionList);

const t:any= new Date().toDateString().substring(8,10)

// const feeCollectionList= userList.filter((elm:any)=>elm.joining_date.toString().substring(8,10) === new Date().toDateString().substring(8,10))


console.log("Todays Date:- ", t , "p")

  
// if(load){return <h1 className='text-center my-10 text-3xl font-[900] h-screen flex justify-center items-center text-white'>Loading ...</h1>}

  return (

    <div >
        {t && <>
           <div className="fixed  py-6 w-full z-50 bg-[#AFE61E] border-b-2">
           <Link  href={"/dashboard"} >
           <h1 className='text-center tracking-wider text-2xl md:text-3xl font-[900] w-full'>{`Today's Fees Collection List :- ${feeCollectionList?.length >= 0 ? feeCollectionList?.length : "0" }`}</h1>
           </Link>
           
           </div>
           {feeCollectionList?.length > 0 ?
            
           ( <div className="pt-36 md:pt-40 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mx-10  gap-8  mb-10">
           
           {feeCollectionList?.map((user:any,index:any)=>(
               <Link href={`/${user._id}`} key={index}>
               <div  className={`${user.fee_paid ?"bg-[#AFE61E]":"bg-red-500 animate-bounce"} p-1.5 md:p-4 font-semibold rounded-xl shadow-sm shadow-white  hover:scale-105 transition-all`}>
                   <div className='flex flex-col gap-y-2   justify-center w-fit m-auto'>
                       <h1 className="text-sm md:text-md font-bold "> {user.name}</h1>
                       <h1 className="text-sm md:text-md font-bold "> {user.email}</h1>
                       <h1 className="text-sm md:text-md font-bold "> {user.fee_paid?"Fees Paid by ":"Please Collect Fees from "}{user.name}</h1>
 

                   </div>
               </div>
              
               </Link>
           ))}
           </div>)
           :(
           <div className="h-screen flex justify-center items-center">
                 <h1 className='text-center my-10 text-xl md:text-3xl font-[900]  text-white'>{"Today we don't have any member for fees collection. Thank You!"}</h1>
            </div>)}
        
        </>}
      
    </div>
  )
}

export default TodayFeeCollection