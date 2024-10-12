import { GetData } from "../../api/data"
const queries = {
    getData:async()=> await GetData()
}
export const resolver = {queries}