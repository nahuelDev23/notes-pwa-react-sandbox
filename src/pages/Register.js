import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import validator from 'validator';
import { startRegisterWithEmailPasswordName } from '../actions/auth/auth';


export const Register = () => {

    const [error, setError] = useState(null)
    const dispatch = useDispatch()
    const [formValues, handleInputChange] = useForm({
        name: '',
        email: '',
        password: '',
        pasword2: '',
    })

    const { name, email, password, password2 } = formValues

    const isValid = () => {

        if (name.trim().length === 0) {

            setError('nombre incorrecto')
            return false
        }

        if (!validator.isEmail(email)) {
            setError('email incorrecto')
            return false
        }

        if (password !== password2 && password.length < 5) {
            dispatch(setError('password incorrecto'))
            return false
        }
        setError(null)

        return true
    }
    const handleSubmitRegister = (e) => {
        e.preventDefault()
        isValid() && dispatch(startRegisterWithEmailPasswordName(email, password, name))
    }

    return (
        <>
            <h3 className="auth__title">Register</h3>
            {
                error && (
                    <div className="caja_error">
                        {error}
                    </div>
                )
            }
            <form onSubmit={handleSubmitRegister}>

                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    onChange={handleInputChange}
                />

                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    onChange={handleInputChange}
                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    onChange={handleInputChange}
                />

                <input
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    className="auth__input"
                    onChange={handleInputChange}
                />


                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                >
                    Register
                </button>



                <Link
                    to="/auth/login"
                    className="link"
                >
                    Already registered?
                </Link>

            </form>
        </>
    )
}