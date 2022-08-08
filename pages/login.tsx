import type { NextPage } from "next";
import { SetStateAction, useState } from "react";
// import Image from "next/image";
const Login: NextPage = () => {
    

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [code, setCode] = useState("");

    const onChangeName = (event: { target: { value: SetStateAction<string>; }; }) => {
        setUsername(event.target.value)
    }

    const onChangePwd = (event: { target: { value: SetStateAction<string>; }; }) => {
        setPassword(event.target.value)
    }

    const onChangeCode = (event: { target: { value: SetStateAction<string>; }; }) => {
        setCode(event.target.value)
    }

    const handleRefreshCode = (event: any) => {
        event.target.src = event.target.src + "?"
    }
    

    const handleSubmit = async () => {
        console.log(`admin_name=${username}&admin_pwd=${password}&code=${code}`)
        const res = await fetch(`/manage/login?admin_name=${username}&admin_pwd=${password}&code=${code}`, {
            method: 'GET',
            mode: 'cors'
        });
        const data = await res.json();
        if (data.code === 0) {

        } else {
            alert(data.msg)
        }
    }

    return (
        <div className="login-page">
            <form>
                <div>
                    <input type="text" value={ username } onChange={ onChangeName } placeholder="用户名" />
                </div>
                <div>
                    <input type="password" value={ password } onChange={ onChangePwd } placeholder="密码" />
                </div>
                <div>
                    <input type="text" value={ code } onChange={ onChangeCode } placeholder="验证码" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="http://test.api.yunyikang.net/manage/captcha.html" className="pointer" onClick={ handleRefreshCode } alt="" />
                </div>
                <div>
                    <input type="button" onClick={ handleSubmit } value="登录" />
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
