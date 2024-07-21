"use client"
import {useEffect, useState} from "react"
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { useGlobalContext } from "@/context/store";


export default function Home() {
  const {setUserList, auth, setAuth} =useGlobalContext();

  const getUserList = async () => {
    // Fetch data from api 
    const res = await fetch(`/api/user`)

    // Create data
    const data = await res.json();

    // Store data in employee state through setEmployee()
    setUserList(data)

}

    const router = useRouter();

    const [user,setUser]=useState({
      email:"",
      password:""
    })

    const onSubmit=(e: { preventDefault: () => void; })=>{
       e.preventDefault()
      if(!user){
        alert("Please Fill All Fields")
      }

      if(user.email=== "sahil@gmail.com" && user.password ==="sahil@123"){
         setAuth(true)
        router.push("/dashboard")
      }else{
        alert("Invalid Email or Password")
      }
      
    }

    useEffect(()=>{
      if(auth){
        router.push("/dashboard")
      }
    },[auth])

 
  return (
    <main  className="text-center  h-screen flex flex-col justify-center items-center font-bold gap-10 text-white">

      <h1 className="text-3xl md:text-4xl text-white font-bold">Welcome to Capital Gym</h1>

      <form className=" flex flex-col justify-center items-center gap-10 bg-[#AFE61E] p-5 rounded-xl" onSubmit={onSubmit}>
        <h1 className="text-4xl text-gray-600">Login Form</h1>
        <input type="text" placeholder="Enter Your Email" value={user.email} onChange={(e) => setUser({ ...user,email: e.target.value})} className="border px-4 py-1.5 rounded-xl text-black"/>

        <input type="password" placeholder="Enter Yor Password" value={user.password}    onChange={(e)=>{setUser({...user, password:e.target.value})}} className=" px-4 py-1.5 rounded-xl text-black" />

        <input type="submit" className="bg-red-500 px-4 py-1.5 rounded-xl w-full active:scale-90" />
      </form>

      
    </main>
  );
}
