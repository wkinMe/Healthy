
import { FormEvent, useState } from "react"
import { useLazyAuthUserQuery, userAPI } from "src/store/userAPI"
import { useDispatch, useSelector } from "react-redux"

import { Navigate, redirect } from "react-router-dom"

import styles from "./Login.module.scss"
import logo from "assets/Logo_big.svg"
import woman from "assets/Woman.svg"
import docs from "assets/Docs.svg"
import doctor from "assets/Doctor.svg"

import { setUserAuth } from "src/store/appSlice"
import { RootState } from "src/store/store"

function Login() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);

    const [auth, { data }] = useLazyAuthUserQuery();
    const dispatch = useDispatch();

    const isUserAuth = useSelector((state: RootState) => state.appReducer.isUserAuth);
    console.log(isUserAuth);
    if (isUserAuth) {
        return <Navigate to={"/"} />
    }

    return (
        <div className={styles.loginContainer}>
            <header>
                <img src={logo} alt="" className={styles.logotype} />
                <div className={styles.previewImages}>
                    <img src={woman} alt="" />
                    <img src={docs} alt="" />
                    <img src={doctor} alt="" />
                </div>
            </header>
            <form onSubmit={async (e: FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                const response = await auth({ login, password });
                if (response.data) {
                    dispatch(setUserAuth({ isAuth: true, userId: Number(response.data[0].id) }));
                }
            }}>
                <input
                    type="text"
                    name="login"
                    placeholder="Login"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label>
                    <input
                        type="checkbox"
                        name="remember"
                        checked={remember}
                        onChange={() => setRemember(!remember)}
                    />
                    <span></span>
                    Remember me
                </label>
                <div className="checkmark"></div>
                <button type="submit">Login</button>
                <a href="#" className={styles.passwordRecoveryLink}>Forgot password</a>
            </form>
        </div>
    )
}

export default Login;