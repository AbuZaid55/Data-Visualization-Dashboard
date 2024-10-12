import { LogIn, SignUp } from "../../api/user"
import { prisma } from "../../db"
import { LogInPayload, SignUpPayload,GraphqlContext } from "../../interfaces"

const queries = {
    logIn:async(_:any,data:LogInPayload)=>await LogIn(data),
    getUser:async(_:any,args:any,ctx:GraphqlContext)=>{
        if(!ctx.user || !ctx.user?.id) throw new Error("You are not authenticated!")
        const result = await prisma.user.findUnique({where:{id:ctx.user.id}})
        if(!result) throw new Error("User not found!")
        return {...result,token:ctx.user.token};
    }
}
const mutations = {
    signUp:async(_:any,data:SignUpPayload)=>await SignUp(data)
}
export const resolvers = {queries,mutations}