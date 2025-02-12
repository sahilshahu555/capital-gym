import { User } from "@/model/model";
import { NextResponse } from "next/server";

//ROUTE 1 : GET User By Id [http://localhost:3000/api/user/userId]
export async function GET( request:any,{ params }:any) {
    // Get employeeId From params 
    const { userID } = params;
    console.log(params)

    try {
        // Create Get Single User Account
        const getSingleUser = await User.findById(userID)

        // Return getSingleUser and status 
        return NextResponse.json({getSingleUser},{ status: 200})

    } catch (error) {
        console.log(error);
        // Return Error And status 
        return NextResponse.json({ error: 'failed to get single User'},{status: 404})
    }
}

//ROUTE 2 : UPDATE[PUT] User Detail [http://localhost:3000/api/user/userId]

export async function PUT(req:any , { params }:any){
   // Get userID From params 
   const { userID } = params;


   // Get Data From Frontend 
   const { name, email, mobile, address, fee_paid, is_active,joining_date } = await req.json();

   try {
       // Create User ( Get User By Id )
       let user = await User.findById(userID);
       if (!user) {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        );
      }
       // set user name 
       user.name = name;
       // set user email 
       user.email = email;
       // set user mobile 
       user.mobile = mobile;
       // set user address 
       user.address = address;
       // set user fee  
       user.fee_paid = fee_paid;
       // set user is_active
       user.is_active = is_active;
       user.joining_date= joining_date;

       // Create Update User
       const updatedUser = await user.save();

       // Return updatedUser, message and status 
       return NextResponse.json({ updatedUser, message: "User Updated Successfully"},{ status: 201})

   } catch (error) {
       console.log(error)

       // Return Error And Status 
     return NextResponse.json( {Error: 'failed to update User',error}, {status: 404,})
   }
}


//ROUTE 3 : DELETE User  [http://localhost:3000/api/user/userId]
export async function DELETE(request:any, { params }:any) {
   // Get userId From params 
  const { userID } = params;

  

  try {
    const deletedUser = await User.findByIdAndDelete(userID);

    if (!deletedUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
        { message: "User deleted successfully" },
        { status: 200 }
      );
       
  } catch (error) {
      console.log(error)
      // Return Error And Status 
      return NextResponse.json(  { error: 'failed to delete User'},  { status: 404 })
  }
}