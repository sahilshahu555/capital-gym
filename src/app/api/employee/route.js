import { connectDb } from "@/Database/db";
import { Employee } from "@/Models/employee";
import { NextResponse } from "next/server";


connectDb();
//ROUTE 1 : GET Employee By Id [http://localhost:3000/api/employee]

export async function GET (req){

   try {
    const getEmployee= await Employee.find()
    return NextResponse.json(getEmployee)
   } catch (error) {
    return NextResponse.json({error : "Failed to get Employee"},{status:404})
   }
}

//ROUTE 2 : POST Employee By Id [http://localhost:3000/api/employee]

export async function POST (req){
   const {name, email, address,salary}= await req.json();

   if( !name || !email || !address || !salary ){
      return NextResponse.json({message:"All Fields are required"},{status:404})
   }

   const employee= await Employee.findOne({email})

   if(employee){
      return NextResponse.json({ error : "Employee Already exists"})
   }

   const newEmployee= new Employee({
      name,email,address,salary
   })

   try{
      const saveEmployee= await newEmployee.save();
      return NextResponse.json(
         {saveEmployee, message:"Employee created successfully"},{status:201}
      )
   }catch(error){
      console.log(error)
      return NextResponse.json({error:"Failed to create Employee"},{status:404})
   }

}

//  ROUTE 1 : GET Employee ⟹ http://localhost:3000/api/employee

//  ROUTE 2 : POST Employee Detail ⟹ http://localhost:3000/api/employee

//  ROUTE 3 : GET Employee By Id ⟹ http://localhost:3000/api/employee/employeeId

//  ROUTE 4 : UPDATE[PUT] Employee Detail ⟹ http://localhost:3000/api/employee/employeeId

//  ROUTE 5 : DELETE Employee ⟹  http://localhost:3000/api/employee/employeeId