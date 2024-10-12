import { LogIn, SignUp } from "../../api/user"
import { LogInPayload, SignUpPayload } from "../../interfaces"

const queries = {
    logIn:async(_:any,data:LogInPayload)=>await LogIn(data)
}
const mutations = {
    signUp:async(_:any,data:SignUpPayload)=>await SignUp(data)
}
export const resolvers = {queries,mutations}