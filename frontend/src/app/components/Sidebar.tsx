import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Sidebar = ({showSidebar,setShowSidebar}:{showSidebar:boolean,setShowSidebar:React.Dispatch<React.SetStateAction<boolean>>}) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [filter,setFilter]=useState("today")

  const handleClick = (value:string) => {
    const params = new URLSearchParams(searchParams);
    params.set("filter",value)
    router.push(`?${params.toString()}`);
  }
  const handleLogOut = () =>{
    window.localStorage.removeItem("token")
    router.push("/login")
  }
  useEffect(()=>{
    const queryFilter = searchParams.get('filter') || ''; 
    if(queryFilter==="custom_range"){
      setFilter("custom_range")
    }else if(queryFilter==="yesterday"){
      setFilter("yesterday")
    }else if(queryFilter==="last7days"){
      setFilter("last7days")
    }else if(queryFilter==="this_month"){
      setFilter("this_month")
    }else{
      setFilter("today")
    }
  },[searchParams])
  return (
    <div className='text-xl relative h-screen'>
      <h1 className='text-3xl text-center py-4 font-semibold text-[#344563]'>Dashboard</h1>
      <span onClick={()=>{setShowSidebar(false)}} className={`sm:hidden ${showSidebar?"":"hidden"} absolute z-20 top-5 left-full bg-[#f0f5f8] text-[#344563] cursor-pointer px-2 py-2 rounded-xl rounded-l-none flex items-center justify-center`}>&larr;</span>
      <span  onClick={()=>{setShowSidebar(true)}} className={`sm:hidden ${showSidebar?"hidden":""} absolute z-20 top-5 left-full bg-[#f0f5f8] text-[#344563] cursor-pointer px-2 py-2 rounded-xl rounded-l-none flex items-center justify-center`}>&rarr;</span>
      <p className={`${filter==="today"?"bg-[#344563] text-white":"text-[#344563]"} cursor-pointer px-4 py-2 my-2`} onClick={()=>{handleClick("today")}}>Today</p>
      <p className={`${filter==="yesterday"?"bg-[#344563] text-white":"text-[#344563]"} cursor-pointer px-4 py-2 my-2`} onClick={()=>{handleClick("yesterday")}}>Yesterday</p>
      <p className={`${filter==="last7days"?"bg-[#344563] text-white":"text-[#344563]"} cursor-pointer px-4 py-2 my-2`} onClick={()=>{handleClick("last7days")}}>Last 7 Days</p>
      <p className={`${filter==="this_month"?"bg-[#344563] text-white":"text-[#344563]"} cursor-pointer px-4 py-2 my-2`} onClick={()=>{handleClick("this_month")}}>This Month</p>
      <p className={`${filter==="custom_range"?"bg-[#344563] text-white":"text-[#344563]"} cursor-pointer px-4 py-2 my-2`} onClick={()=>{handleClick("custom_range")}}>Custom Range</p>
      <p onClick={()=>{handleLogOut()}} className='absolute bottom-5 left-0 bg-[#344563] py-2 px-4 w-full text-white cursor-pointer'>Log Out</p>
    </div>
  )
}

export default Sidebar
