"use client"
import { graphqlClient } from "@/client/graphqlClient";
import { GetUser } from "@/graphql/queries/user";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter()
  useEffect(()=>{
    (async()=>{
      try {
        const data = await graphqlClient.request(GetUser)
        if(!data || !data.getUser || !data.getUser.token){
          router.push('/login')
        }
      } catch (error:any) {
        console.log(error)
        router.push('/login')
      }
    })()
  },[])
  return (
    <div>Home page</div>
  );
}
