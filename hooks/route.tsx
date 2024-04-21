import { useRouter } from "next/navigation"
import { useUser } from "./get-user-data"

export const  useRoute = ()=>{
    const router = useRouter()
    const {userData, loading} = useUser();

    if(loading){
        return <></>
    }
    if(!userData){
        router.push("/login")
    }
    return <></>
}