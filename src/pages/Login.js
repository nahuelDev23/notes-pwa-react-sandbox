import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { startGoogleLogin, startLoginWithEmailPasswordName } from '../actions/auth/auth';
import { Layaout } from '../components/layaout/Layaout';
import { useForm } from '../hooks/useForm';

export const Login = () => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [formValues, handleInputChange] = useForm({
        email: 'asdasd@gmail.com',
        password: '123456'
    })
    const { email, password } = formValues

    const handleLogin = async (e) => {
        e.preventDefault()

        await dispatch(startLoginWithEmailPasswordName(email, password))

    }

    const handleGoogleLogin = () => {
        dispatch(startGoogleLogin())
    }

    return (
        <Layaout>
            <div className="auth__box-container">
                <h3 className="auth__title">Login</h3>

                <form onSubmit={handleLogin}>

                    <input
                        type="text"
                        placeholder="Email"
                        name="email"
                        className="auth__input"
                        autoComplete="off"
                        value={email}
                        onChange={handleInputChange}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        className="auth__input"
                        value={password}
                        onChange={handleInputChange}
                    />


                    <button
                        type="submit"
                        className={`${loading && "disabled"} btn btn-primary btn-block `}
                        disabled={loading}
                    >

                        {loading ? ('cargando') : ('Login')}


                    </button>


                    <div className="auth__social-networks">
                        <p>Login with social networks</p>

                        <div
                            className="google-btn"
                            onClick={handleGoogleLogin}
                        >
                            <div className="google-icon-wrapper">
                                <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                            </div>
                            <p className="btn-text">
                                <b>Sign in with google</b>
                            </p>
                        </div>
                    </div>

                    <Link
                        to="/auth/register"
                        className="link"
                    >
                        Create new account
                    </Link>

                </form>
            </div>
        </Layaout>

    )
}