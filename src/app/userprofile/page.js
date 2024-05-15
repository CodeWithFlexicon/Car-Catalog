"use client";
import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function UserProfile(){
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status !== "loading" && !session) {
        router.push("/login");
      }
    }, [session, status, router]);

    if (!session){
      return <div>Redirecting to login</div>
    }    

    return(
      <div class="bg-white overflow-hidden shadow rounded-lg border">
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          User Profile
        </h3>
        
      </div>
      <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl class="sm:divide-y sm:divide-gray-200">
          <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Username</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {session.user.name}
            </dd>
          </div>
          <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Email address</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {session.user.email}
            </dd> 
          </div>
          
        </dl>
        
      </div>
           
    </div>
    

    

    

    )

}