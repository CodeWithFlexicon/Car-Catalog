"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";


export default function UserProfile(){
    const { data: session } = useSession();

    return(
    <div className="flex flex-col justify-center items-center h-screen font-semibold text-4xl">
      What ev
    </div>

    )

}