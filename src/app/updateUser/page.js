"use client";
import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";




export default function UserProfile(){
    const { data: session, status } = useSession();
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    useEffect(() => {
      if (status !== "loading" && !session) {
        router.push("/login");
      }
    }, [session, status, router]);

    if (!session){
        return <div>Redirecting to login</div>
    }

    

     
    return (
        <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8">
          <div>
            <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Change Username
            </h2>
          </div>
          <form class="mt-8 space-y-6" action="#" method="POST">
            <div class="rounded-md shadow-sm -space-y-px">
              <div>
                </div>
              <div>
                <label for="new_password" class="sr-only">New Username</label>
                <input className="p-2 border rounded-md text-black"/>
              </div>
              <div>
                <label for="confirm_password" class="sr-only">Confirm Username</label>
                <input className="p-2 border rounded-md text-black"/>
              </div>
            </div>
      
            <div>
              <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Change Username
              </button>
            </div>
          </form>
        </div>    
        <div class="max-w-md w-full space-y-8">
          <div>
            <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Change Password
            </h2>
          </div>
          <form class="mt-8 space-y-6" action="#" method="POST">
            <div class="rounded-md shadow-sm -space-y-px">
              <div>
                 </div>
              <div>
                <label for="new_password" class="sr-only">New Password</label>
                <input className="p-2 border rounded-md text-black"/>
              </div>
              <div>
                <label for="confirm_password" class="sr-only">Confirm Password</label>
                <input className="p-2 border rounded-md text-black"/>
              </div>
            </div>
      
            <div>
              <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
      
    )
}

/*


*/ 
   