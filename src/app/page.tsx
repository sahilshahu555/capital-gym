"use client"
import {useState} from "react"
import Link from "next/link";
import { useRouter } from 'next/navigation'


export default function Home() {

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
        router.push("/dashboard")
      }else{
        alert("Invalid Email or Password")
      }
      
    }
  console.log(user)
  return (
    <main  className="text-center  h-screen flex flex-col justify-center items-center font-bold gap-10 text-white">

    
      <form className=" flex flex-col justify-center items-center gap-10 bg-[#AFE61E] p-5 rounded-xl" onSubmit={onSubmit}>
        <h1 className="text-4xl text-gray-600">Login Form</h1>
        <input type="text" placeholder="Enter Your Email" value={user.email} onChange={(e) => setUser({ ...user,email: e.target.value})} className="border px-2 py-1.5 rounded-xl text-black"/>

        <input type="password" placeholder="Enter Yor Password" value={user.password}    onChange={(e)=>{setUser({...user, password:e.target.value})}} className=" px-2 py-1.5 rounded-xl text-black" />

        <input type="submit" className="bg-red-500 px-4 py-1 rounded-xl w-full" />
      </form>

      
    </main>
  );
}
