"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";


export default function UserProfile(){
    const { data: session } = useSession();

    return(

    )

}