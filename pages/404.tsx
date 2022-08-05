import type { NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import Pic404 from '../public/img/404.png';
import Pic404Cloud from '../public/img/404_cloud.png';
import styles from "../styles/Err404.module.css";


const Err404: NextPage = () => {
    const router = useRouter();

    const handleTo = () => {
        router.replace("/")
    }

    const handleBack = () => {
        router.back()
    }
    return (
        <div className={ styles.err404 }>
            <div className={ styles.err404__content }>
                <div className={ styles.pic404 }>
                    <Image src={Pic404} alt="404" ></Image>
                    <div className={ styles.pic404__cloud }>
                        <Image src={ Pic404Cloud }  alt=""></Image>
                    </div>
                </div>
                <div className={ styles.bullshit }>
                    <div className={ styles.bullshit__title + ' ' + styles.bullshit_animation }>抱歉!</div>
                    <div className={styles.bullshit__headline + ' ' + styles.bullshit_animation}>NotFound 当前页面不存在...</div>
                    <div className={ styles.bullshit__info + ' ' + styles.bullshit_animation}>
                        <span className="block">请检查您输入的网址是否正确，</span>
                        <span>或点击下方按钮返回首页。</span>
                    </div>
                    <div className={ styles.bullshit__foot + ' ' + styles.bullshit_animation }>
                        <button className={ styles.bullshit__btn + " Mg-R20" } onClick={ handleTo }>返回首页</button>
                        <button className={ styles.bullshit__btn } onClick={ handleBack }>返回上一步</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Err404;
