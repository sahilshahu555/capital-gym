import Image from "next/image";
import Link from "next/link";


export default function Dashboard() {
  return (
    <main  className="text-center  h-screen flex flex-col justify-center items-center font-bold gap-10 text-white">
      <div className="flex flex-col gap-10 bg-[#AFE61E] p-10 md:p-16 rounded-xl mx-4 md:mx-0 ">
        <h1 className="text-4xl text-gray-600">Dashboard</h1>
        <div className="flex gap-4 md:gap-10">
            <Link href="/userlist" className="bg-red-500 px-4 py-1 rounded-xl "> All User List </Link>
            <Link href="/adduser"  className="bg-red-500 px-4 py-1 rounded-xl "> Add User </Link>
        </div>
      </div>
    </main>
  );
}
