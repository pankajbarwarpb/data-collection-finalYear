import { usePathname, useRouter } from "next/navigation"
import { useUser } from "./get-user-data"

export const  useRoute = ()=>{
    const router = useRouter();

    const pathname = usePathname();
    const {userData, loading} = useUser();
    if(pathname==="/signup" && !userData){
        return <></>
    }
    if(loading){
        return <></>
    }
    if(!userData){
        router.push("/login")
    }
    return <></>
}