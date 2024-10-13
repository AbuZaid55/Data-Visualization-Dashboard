"use client"
import { graphqlClient } from "@/client/graphqlClient";
import { GetUser } from "@/graphql/queries/user";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Charts from "./components/Charts";
import { useSearchParams } from "next/navigation";
import { GetData } from "@/graphql/queries/data";

export default function Home() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const featureKeys = ['a', 'b', 'c', 'd', 'e', 'f'];
  const [filter,setFilter]=useState({from:"",to:"",age:"",gender:""})
  const [data,setData]=useState([])
  const [filterdData,setFilteredData]=useState([])
  const [showCustomFilter,setShowCustomFilter]=useState(false)
  const [user,setUser]=useState(null)
  const [showSidebar,setShowSidebar]=useState(false)

  const formatDate = (date:Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };
  const handleCustomInput = (e:any)=>{
    const params = new URLSearchParams(searchParams);
    const key = e.target.name
    params.set(key,e.target.value);
    router.push(`/?${params.toString()}`);
  }
  const barChartData = featureKeys.map((key) => {
    return {
      feature: key,
      total: filterdData.reduce((acc, cur:any) => acc + parseInt(cur[key]), 0),
    };
  });

  useEffect(()=>{
    (async()=>{
      try {
        const data = await graphqlClient.request(GetUser)
        if(!data || !data.getUser || !data.getUser.token){
          router.push('/login')
        }else{
          setUser(data?.getUser as any)
        }
      } catch (error:any) {
        console.log(error)
        router.push('/login')
      }
    })()
  },[])
  useEffect(()=>{
    setShowCustomFilter(false)
    const queryFilter = searchParams.get('filter') || '';
    const today = new Date();
    if(queryFilter==="yesterday"){
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      const date = formatDate(yesterday)
      setFilter({from:date,to:date,age:"",gender:""})
    }else if(queryFilter==="last7days"){
      const from =  new Date(today)
      from.setDate(today.getDate()-7)
      const toDate = formatDate(today)
      const fromDate = formatDate(from)
      setFilter({from:fromDate,to:toDate,age:"",gender:""})
    }else if(queryFilter==="this_month"){
      const from = new Date(today.getFullYear(), today.getMonth(), 1);
      const toDate = formatDate(today)
      const fromDate = formatDate(from)
      setFilter({from:fromDate,to:toDate,age:"",gender:""})
    }else if(queryFilter==="custom_range"){
      setShowCustomFilter(true)
      const from = searchParams.get('from') || '';
      const to = searchParams.get('to') || '';
      const age = searchParams.get('age') || '';
      const gender = searchParams.get('gender') || '';
      if(from && !to){
        const to = formatDate(today)
        setFilter({from:from,to:to,age:age,gender:gender})
      }else if(from && to){
        setFilter({from:from,to:to,age:age,gender:gender})
      }else{
        const date = formatDate(today)
        setFilter({from:date,to:date,age:"",gender:""})
      }
    }else{
      const date = formatDate(today)
      setFilter({from:date,to:date,age:"",gender:""})
    }
  },[searchParams])
  useEffect(()=>{
    (async()=>{
      if(!user) return;
      try {
        const _data = await graphqlClient.request(GetData)
        setData(_data?.getData as any)
      } catch (error) {
        console.log(error)
      }
    })()
  },[user])
  useEffect(()=>{
    if(!filter.from || !filter.to) return;
    const _filteredData = data.filter((item:any)=>{
      const itemDate = new Date(item.day.split('/').reverse().join('-'));
      if(itemDate>=new Date(filter.from) && itemDate<=new Date(filter.to) && item.age.includes(filter.age) && item.gender.includes(filter.gender)){
        return item
      }
    })
    setFilteredData(_filteredData)
  },[filter,data])
  return (
    <div className="relative">
      <div className={`fixed z-20 top-0 ${showSidebar?'left-0':'-left-[200px]'} sm:left-0 w-[200px] bg-[#f0f5f8] h-screen transition-all ease-in-out duration-150`}><Sidebar setShowSidebar={setShowSidebar} showSidebar={showSidebar}/></div> 
      <div className={`sm:ml-[200px] pt-12 px-4 mb-10`}>
        <div className="w-full">
          {showCustomFilter && <div className="flex items-center justify-center flex-col mb-10">
          <div className="flex">
            <div>
              <label className="text-2xl text-[#344563]"  htmlFor="from">From:</label>
              <input id="from" value={filter.from} onChange={handleCustomInput} name="from" type="date"  max={new Date().toISOString().split("T")[0]}/>
            </div>
            <div>
              <label className="text-2xl text-[#344563]" htmlFor="to">To:</label>
              <input id="to"  value={filter.to} onChange={handleCustomInput} name="to" type="date"  max={new Date().toISOString().split("T")[0]}/>
            </div>
          </div>
            <div className="flex">
              <div>
                <label className="text-2xl text-[#344563]" htmlFor="age">Age:</label>
                <select id="age" className="bg-[#344563] px-10 py-3 text-white rounded-md m-4" value={filter.age} onChange={handleCustomInput} name="age">
                  <option value="">All</option>
                  <option value="15-25">15-25</option>
                  <option value=">25">25+</option>
                </select>
              </div>
              <div>
                <label className="text-2xl text-[#344563]" htmlFor="gender">Gender:</label>
                <select id="gender" className="bg-[#344563] px-10 py-3 text-white rounded-md m-4" value={filter.gender} onChange={handleCustomInput} name="gender">
                  <option value="">All</option> 
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
          </div>}
          <Charts barChartData={barChartData} filteredData={filterdData}/>
        </div>
      </div>
    </div>
  );
}
