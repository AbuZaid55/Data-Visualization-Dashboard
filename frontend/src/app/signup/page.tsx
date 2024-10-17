"use client"
import { graphqlClient } from '@/client/graphqlClient'
import { SignUp } from '@/graphql/mutations/user'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { toast } from 'react-hot-toast'

const Page = () => {
  const router = useRouter()
  const [input,setInput] = useState({name:'',email:'',password:'',confirmPass:''}) 
  const handleInput = (e:any)=>{
    setInput({...input,[e.target.name]:e.target.value}) 
  }
  const submitForm = useCallback(async(e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const data= await graphqlClient.request(SignUp,input)
      toast.success(data?.signUp)
      router.push("/login")
    } catch (error:any) {
      toast.error(error?.response?.errors[0]?.message)
    }
  },[input])
  return (
    <div className='h-screen flex items-center justify-center bg-white sm:bg-[#f0f5f8]'>
      <form onSubmit={submitForm} className='flex flex-col bg-white p-8 text-xl w-full max-w-[500px] sm:rounded-3xl sm:shadow-xl'>

        <h1 className='text-center mb-5 text-4xl font-semibold text-[#344563]'>Sign Up</h1>

        <div className='relative my-2 w-full'>
          <input value={input.name} onChange={handleInput} name='name' type="text" className='w-full rounded-lg py-2 px-2 outline-none border-2 border-[#737787]' id='name' required={true}/>
          <label className='absolute left-2 top-1 my-1 px-1 text-[#737787]' htmlFor="name">Name</label>
        </div>
        
        <div className='relative my-2 w-full'>
          <input value={input.email} onChange={handleInput} name='email' type="email" className='w-full rounded-lg py-2 px-2 outline-none border-2 border-[#737787]' id='email' required={true}/>
          <label className='absolute left-2 top-1 my-1 px-1 text-[#737787]' htmlFor="email">Email</label>
        </div>
        
        <div className='relative my-2 w-full'>
          <input value={input.password} onChange={handleInput} name='password' type="text" className='w-full rounded-lg py-2 px-2 outline-none border-2 border-[#737787]' id='password' required={true}/>
          <label className='absolute left-2 top-1 my-1 px-1 text-[#737787]' htmlFor="password">Password</label>
        </div>
        
        <div className='relative my-2 w-full'>
          <input value={input.confirmPass} onChange={handleInput} name='confirmPass' type="text" className='w-full rounded-lg py-2 px-2 outline-none border-2 border-[#737787]' id='confirm_pass' required={true}/>
          <label className='absolute left-2 top-1 my-1 px-1 text-[#737787]' htmlFor="confirm_pass">Confirm Password</label>
        </div>

        <button type='submit' className='w-full py-3 bg-[#344563] text-white rounded-lg mt-2'>Sign Up</button>

        <p className='text-center mt-3 text-lg text-[#737787]'>Already have an account? <Link className='text-[#159eee]' href="/login">Log In</Link></p>
      </form>
    </div>
  )
}

export default Page
