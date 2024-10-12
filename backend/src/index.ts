import dotenv from 'dotenv'
dotenv.config()
import { initServer } from "./app";

const PORT=Number(process.env.PORT) || 8000
const HOST=process.env.HOST || '0.0.0.0'

export async function init() {
    const app = await initServer()
    app.get('/health',(req,res)=>{
        res.status(200).json({seccess:true,message:"Server is healty"})
    })
    app.get('*',(req,res)=>{
        res.status(400).json({seccess:false,message:"404 page"})
    })
    app.listen(PORT,HOST,()=>{
        console.log(`Server is running on http://localhost:${PORT}`)
    })
}
init()