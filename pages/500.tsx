import type { NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import Pic500 from "../public/img/500.svg";
import styles from "../styles/Err404.module.css";

const Err500: NextPage = () => {
    const router = useRouter();
    const handleBack = () => {
        router.back()
    }

    const handleTo = () => {
        router.replace("/")
    }

    return (
        <div className={ styles.err404 }>
            <div className='text-center'>
                <div><Image src={ Pic500 } alt="500" /></div>
                <p>抱歉，服务器出错了</p>
                <div className="Mg-T20">
                    <button className={ styles.bullshit__btn + ' Mg-R20' } onClick={ handleTo }>返回首页</button>
                    <button className={ styles.bullshit__btn } onClick={ handleBack }>返回上一步</button>
                </div>
            </div>
        </div>
    )
}

export default Err500;
