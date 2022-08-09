import type { NextPage } from "next";
import { SetStateAction, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Head from "next/head";

const Login: NextPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [code, setCode] = useState("");

    const onChangeName = (event: { target: { value: SetStateAction<string> } }) => {
        setUsername(event.target.value);
    };

    const onChangePwd = (event: { target: { value: SetStateAction<string> } }) => {
        setPassword(event.target.value);
    };

    const onChangeCode = (event: { target: { value: SetStateAction<string> } }) => {
        setCode(event.target.value);
    };

    const handleRefreshCode = (event: any) => {
        event.target.src = event.target.src + "?";
    };

    const handleSubmit = async () => {
        console.log(`admin_name=${username}&admin_pwd=${password}&code=${code}`);
        const res = await fetch(`/manage/login?admin_name=${username}&admin_pwd=${password}&code=${code}`, {
            method: "GET",
            mode: "cors",
        });
        const data = await res.json();
        if (data.code === 0) {
        } else {
            alert(data.msg);
        }
    };

    return (
        <div className="login-page">
            <Head>
                {/* 关闭苹果的自动放大 */}
                <meta content="yes" name="apple-mobile-web-app-capable" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            </Head>
            <form>
                <div>
                    <input type="text" value={username} onChange={onChangeName} placeholder="用户名" />
                </div>
                <div>
                    <input type="password" value={password} onChange={onChangePwd} placeholder="密码" />
                </div>
                <div>
                    <input type="text" value={code} onChange={onChangeCode} placeholder="验证码" />
                    <Image src="http://test.api.yunyikang.net/manage/captcha.html" width={120} height={40} className="pointer" onClick={handleRefreshCode} alt="" />
                    <Captcha width={120} height={40} />
                </div>
                <div>
                    <input type="button" onClick={handleSubmit} value="登录" />
                </div>
            </form>
        </div>
    );
};

// export async function getServerSideProps() {
//     // Fetch data from external API
//     const res = await fetch("http://test.api.yunyikang.net/manage/admin/hos_list");
//     const data = await res.json();
//     console.log(data);
//     // Pass data to the page via props
//     return { props: { data } };
// }

export default Login;


type CaptchaProps = {
    width?: number;
    height?: number;
    backgroundColorMin?: number;
    backgroundColorMax?: number;
    fontSizeMin?: number;
    fontSizeMax?: number;
    colorMin?: number;
    colorMax?: number;
    lineColorMin?: number;
    lineColorMax?: number;
}

const captchaStyle = {
    display: 'inline-block',
    cursor: 'pointer',
    '-webkit-user-select': 'none',
    'user-select': 'none',
}

const Captcha = (props: CaptchaProps) => {
    const { 
        width, 
        height, 
        backgroundColorMin,
        backgroundColorMax,
        fontSizeMin,
        fontSizeMax,
        colorMin,
        colorMax,
        lineColorMin,
        lineColorMax
    } = Object.assign({
        width: 120,
        height: 40,
        backgroundColorMin: 243,
        backgroundColorMax: 254,
        fontSizeMin: 25,
        fontSizeMax: 30,
        colorMin: 0,
        colorMax: 160,
        lineColorMin: 150,
        lineColorMax: 255
    }, props);

    const [identifyCode, setIdentifyCode] = useState("");
    const canvasRef = useRef(null);

    const verifyObj = {
        // 生成4个随机数
        createdCode () {
            const len = 4;
            const codeList = [];
            const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz0123456789';
            const charsLen = chars.length;
            for (let i = 0; i < len; i++) {
                codeList.push(chars.charAt(Math.floor(Math.random() * charsLen)))
            }
            setIdentifyCode(codeList.join(''));
        },
    
        // 生成一个随机数
        randomNum (min: number, max: number) {
            return Math.floor(Math.random() * (max - min) + min)
        },
        // 生成一个随机的颜色
        randomColor (min: number, max: number) {
            const r = this.randomNum(min, max)
            const g = this.randomNum(min, max)
            const b = this.randomNum(min, max)
            return 'rgb(' + r + ',' + g + ',' + b + ')'
        },
    
        drawPic () {
            const canvas: HTMLCanvasElement = canvasRef.current!;
            const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
            ctx.textBaseline = 'bottom'
            // 绘制背景
            ctx.fillStyle = this.randomColor(backgroundColorMin, backgroundColorMax)
            ctx.fillRect(0, 0, width, height)
            // 绘制文字
            for (let i = 0; i < identifyCode.length; i++) {
                this.drawText(ctx, identifyCode[i], i)
            }
            this.drawLine(ctx)
            this.drawDot(ctx)
        },
    
        drawText (ctx: CanvasRenderingContext2D, txt: string, i: number) {
            ctx.fillStyle = this.randomColor(colorMin, colorMax)
            ctx.font = this.randomNum(fontSizeMin, fontSizeMax) + 'px SimHei'
            const x = (i + 1) * (width / (identifyCode.length + 1))
            const y = this.randomNum(fontSizeMax, height - 5)
            var deg = this.randomNum(-45, 45)
            // 修改坐标原点和旋转角度
            ctx.translate(x, y)
            ctx.rotate(deg * Math.PI / 180)
            ctx.fillText(txt, 0, 0)
            // 恢复坐标原点和旋转角度
            ctx.rotate(-deg * Math.PI / 180)
            ctx.translate(-x, -y)
        },
    
        // 绘制干扰线
        drawLine (ctx: CanvasRenderingContext2D) {
            for (let i = 0; i < 5; i++) {
            ctx.strokeStyle = this.randomColor(lineColorMin, lineColorMax)
            ctx.beginPath()
            ctx.moveTo(this.randomNum(0, width), this.randomNum(0, height))
            ctx.lineTo(this.randomNum(0, width), this.randomNum(0, height))
            ctx.stroke()
            }
        },
    
        // 绘制干扰点
        drawDot (ctx: CanvasRenderingContext2D) {
            for (let i = 0; i < 80; i++) {
            ctx.fillStyle = this.randomColor(0, 255)
            ctx.beginPath()
            ctx.arc(this.randomNum(0, width), this.randomNum(0, height), 1, 0, 2 * Math.PI)
            ctx.fill()
            }
        }
    }

    const handleRefresh = () => {
        verifyObj.createdCode();
    }

    const load = () => {
        verifyObj.createdCode();
    }

    
    useEffect(() => {
        if (!identifyCode) {
            load();
        }
        verifyObj.drawPic();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [identifyCode])
    return (
        <div className="" style={captchaStyle} onClick={ handleRefresh }>
            <canvas width={ width } height={ height } ref={ canvasRef } ></canvas>
        </div>
    )
}
