// import { Employee } from "@/Models/employee";
import { NextResponse } from "next/server";

//ROUTE 1 : GET Employee By Id [http://localhost:3000/api/employee/employeeId]
export async function GET(reuest, { params }) {
    // Get employeeId From params 
    const { employeeID } = params;
    // console.log(params)

    try {
        // Create Get Single Employee
        const getSingleEmployee = await Employee.findById(employeeID)

        // Return getSingleEmployee and status 
        return NextResponse.json(
            {getSingleEmployee,},{ status: 200,}
        )
    } catch (error) {
        console.log(error);

        // Return Error And status 
        return NextResponse.json(
            {
                error: 'failed to get single employee',
            },
            {
                status: 404,
            }
        )
    }
}

//ROUTE 2 : UPDATE[PUT] Employee Detail [http://localhost:3000/api/employee/employeeId]

export async function PUT(req, { params }) {
   // Get employeeId From params 
   const { employeeID } = params;

   // Get Data From Frontend 
   const { name, email, address, salary } = await req.json();

   try {
       // Create Employee ( Get Employee By Id )
       let employee = await Employee.findById(employeeID);
       // set employee name 
       employee.name = name;
       // set employee email 
       employee.email = email;
       // set employee address 
       employee.address = address;
       // set employee salary 
       employee.salary = salary;

       // Create Update Employee
       const updatedEmployee = await employee.save();

       // Return updatedEmployee, message and status 
       return NextResponse.json(
           { updatedEmployee, message: "Employee Updated Successfully"},
           { status: 201}
       )
   } catch (error) {
       console.log(error)

       // Return Error And Status 
     return NextResponse.json( {error: 'failed to update employee',}, {status: 404,})
   }
}


//ROUTE 3 : DELETE Employee  [http://localhost:3000/api/employee/employeeId]
export async function DELETE(request, { params }) {
   // Get employeeId From params 
  const { employeeID } = params;

  try {
      await Employee.findByIdAndDelete( employeeID )

      // Return message And Status 
      return NextResponse.json(
          { message: "Employee deleted successfully"},
          { status: 201 }
      )
  } catch (error) {
      console.log(error)

      // Return Error And Status 
      return NextResponse.json(
          { error: 'failed to delete employee',},
          { status: 404, }
      )
  }
}