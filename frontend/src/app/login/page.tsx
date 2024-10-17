"use client"
import React, { useCallback, useState } from 'react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { graphqlClient } from '@/client/graphqlClient'
import { LogIn } from '@/graphql/queries/user'
import { useRouter } from 'next/navigation'

const Page = () => {
  const router = useRouter()
  const [input,setInput] = useState({email:'',password:''})
  const submitForm = useCallback(async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    try {
      const data = await graphqlClient.request(LogIn,input)
      if(data?.logIn?.token){
        window.localStorage.setItem('token',data.logIn.token)
        router.push('/')
      }
    } catch (error:any) {
      toast.error(error?.response?.errors[0]?.message)
    }
  },[input])
  return (
    <div className='h-screen flex items-center justify-center bg-white sm:bg-[#f0f5f8]'>
      <form onSubmit={submitForm} className='flex flex-col bg-white p-8 text-xl w-full max-w-[400px] sm:rounded-3xl sm:shadow-xl'>

        <h1 className='text-center mb-5 text-4xl font-semibold text-[#344563]'>Log In</h1>

        
        <div className='relative my-2 w-full'>
          <input value={input.email} onChange={(e)=>{setInput({...input,"email":e.target.value})}} type="text" className='w-full rounded-lg py-2 px-2 outline-none border-2 border-[#737787]' id='email' required={true}/>
          <label className='absolute left-2 top-1 my-1 px-1 text-[#737787]' htmlFor="email">Email</label>
        </div>
        
        <div className='relative my-2 w-full'>
          <input value={input.password} onChange={(e)=>{setInput({...input,"password":e.target.value})}} type="text" className='w-full rounded-lg py-2 px-2 outline-none border-2 border-[#737787]' id='password' required={true}/>
          <label className='absolute left-2 top-1 my-1 px-1 text-[#737787]' htmlFor="password">Password</label>
        </div>

        <button type='submit' className='w-full py-3 bg-[#344563] text-white rounded-lg mt-2'>Log In</button>

        <p className='text-center mt-3 text-lg text-[#737787]'>Don&apos;t have an account? <Link className='text-[#159eee]' href="/signup">Sing Up</Link></p>
      </form>
    </div>
  )
}

export default Page
