import type { NextPage } from "next";
import { useRouter } from "next/router"

const Err500: NextPage = () => {
    const router = useRouter();
    const handleBack = () => {
        router.back()
    }

    const handleTo = () => {
        router.replace("/")
    }

    return (
        <div className="err500-page">
            500
            
            <button onClick={ handleTo }>返回首页</button>
            <button onClick={ handleBack }>返回上一步</button>
        </div>
    )
}

export default Err500;
