import { connectDb } from "@/database/db";
import { User } from "@/model/model";
import { NextResponse } from "next/server";


connectDb();
//ROUTE 1 : GET user By Id [http://localhost:3000/api/user]

export async function GET (req:any){

   try {
    const getUser= await User.find()
    return NextResponse.json(getUser)
   } catch (error) {
    return NextResponse.json({error : "Failed to get User"},{status:404})
   }
}

//ROUTE 2 : POST User By Id [http://localhost:3000/api/user]

export async function POST (req:any){
   const {name, email, mobile, address, fee_paid, is_active}= await req.json();

   if( !name || !email || !address  ){
      return NextResponse.json({message:"All Fields are required"},{status:404})
   }

   const user= await User.findOne({email})

   if(user){
      return NextResponse.json({ error : "User Already exists"})
   }

   const newUser= new User({
      name, email , mobile, address, fee_paid, is_active
   })

   try{
      const saveUser= await newUser.save();
      return NextResponse.json(
         {saveUser, message:"User created successfully"},{status:201}
      )
   }catch(error){
      console.log(error)
      return NextResponse.json({error:"Failed to create User"},{status:404})
   }

}

//  ROUTE 1 : GET User ⟹ http://localhost:3000/api/user

//  ROUTE 2 : POST User Detail ⟹ http://localhost:3000/api/user

//  ROUTE 3 : GET User By Id ⟹ http://localhost:3000/api/user/userId

//  ROUTE 4 : UPDATE[PUT] User Detail ⟹ http://localhost:3000/api/user/userId

//  ROUTE 5 : DELETE User ⟹  http://localhost:3000/api/user/userId