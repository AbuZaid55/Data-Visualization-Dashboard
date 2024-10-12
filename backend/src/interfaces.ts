export interface SignUpPayload{
    name:string
    email:string
    password:string
    confirm_pass:string
}
export interface LogInPayload{
    email:string
    password:string
}
export interface JWTUser {
    id: string
    name: string
    email: string
}
export interface GrapqlContext {
    user?:JWTUser
}