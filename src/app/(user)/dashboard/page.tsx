"use client"
import { useGlobalContext } from "@/context/store";
import Link from "next/link";
import {useEffect} from "react"
import { useRouter } from 'next/navigation'



export default function Dashboard() {

  const router = useRouter();

  const {userList,setUserList,auth,setAuth} =useGlobalContext();
  console.log(userList);

  const getUserList = async () => {
    // Fetch data from api 
    const res = await fetch(`/api/user`)

    // Create data
    const data = await res.json();

    // Store data in employee state through setEmployee()
    setUserList(data)

}

useEffect(()=>{
  getUserList()
  
  if(!auth){ router.push("/")}

},[auth])

  return (
    <main  className="text-center  h-screen flex flex-col justify-center items-center font-bold gap-10 text-white">
      <h1 className="text-4xl ">Dashboard</h1>
      <div className="flex flex-col gap-10 bg-[#AFE61E] p-10 md:p-16 rounded-xl mx-4 md:mx-0 ">
        
        <div className="flex flex-col md:flex-row gap-10 md:gap-10">
            <Link href="/userlist" className="bg-red-500 hover:bg-indigo-500 px-4 py-1.5 rounded-xl "> All User List </Link>
            <Link href="/activeuser" className="bg-red-500 hover:bg-indigo-500  px-4 py-1.5 rounded-xl "> Active User List </Link>
            <Link href="/adduser"  className="bg-red-500 hover:bg-indigo-500 px-4 py-1.5 rounded-xl "> Add User </Link>
            <Link href="/fee"  className="bg-red-500 hover:bg-indigo-500 px-4  py-1.5 rounded-xl "> Fees Collection </Link>
            <button onClick={()=>setAuth(false)} className="bg-red-500 hover:bg-indigo-500 px-4 py-1.5 rounded-xl ">Logout</button>
        </div>
      </div>
    </main>
  );
}
