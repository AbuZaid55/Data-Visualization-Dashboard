import bcrypt from 'bcrypt'
import { prisma } from '../db'
import { LogInPayload, SignUpPayload } from '../interfaces'
import JWTService from '../services/jwt'
export async function SignUp (data:SignUpPayload){
    const {name,email,password, confirm_pass} = data
    if(!name || !email || !password || !confirm_pass){
        throw new Error("All field are required!")
    }
    if(password.length<8){
        throw new Error("Password should be minimum of 8 characters")
    }
    if(password!==confirm_pass){
        throw new Error("Password doesn't match!")
    }
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password,salt)
    const isExist = await prisma.user.findUnique({where:{email:email}})
    if(isExist){
        throw new Error("User already exist!")
    }
    await prisma.user.create({data:{name,email,password:hashPassword}})
    return "Sing up successfull"
}

export async function LogIn(data:LogInPayload){
    const {email,password} = data
    if(!email || !password){
        throw new Error("All field are required!")
    }
    if(password.length<8){ 
        throw new Error("Password should be minimum of 8 characters")
    }
    const isExist = await prisma.user.findUnique({where:{email:email}})
    if(!isExist){
        throw new Error("Invalid email or password")
    }
    const verifyPassword = await bcrypt.compare(password,isExist.password)
    if(!verifyPassword){
        throw new Error("Invalid email or password!")
    }
    const token = JWTService.generateToken(isExist)
    return {id:isExist.id,name:isExist.name,email:isExist.email,token:token}
}