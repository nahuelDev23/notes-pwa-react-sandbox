import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import validator from 'validator';
import { startRegisterWithEmailPasswordName } from '../actions/auth/auth';
import { Layaout } from '../components/layaout/Layaout';
import { Box, Button, Flex, Heading, Input, Text } from '@chakra-ui/react';


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
        <Layaout>
            <Heading textAlign='center' mb='4'>Register</Heading>
            {
                error && (
                    <div className="caja_error">
                        {error}
                    </div>
                )
            }
            <Box as='form' onSubmit={handleSubmitRegister} textColor='black'>

                <Input
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    mb='4'
                    bgColor='white'
                    color='black'
                    onChange={handleInputChange}
                />

                <Input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    mb='4'
                    bgColor='white'
                    color='black'
                    onChange={handleInputChange}
                />

                <Input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    mb='4'
                    bgColor='white'
                    color='black'
                    onChange={handleInputChange}
                />

                <Input
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    className="auth__input"
                    mb='4'
                    bgColor='white'
                    color='black'
                    onChange={handleInputChange}
                />

                <Flex alignItems='center' justifyContent='center'>
                    <Button
                        type="submit"
                        className="btn btn-primary btn-block mb-5"
                        bgColor='twitter.600'
                        color='white'
                        mr='4'
                    >
                        Registrar
                    </Button>

                    <Link
                        to="/login"
                        className="link"
                    >
                        <Text color='white'>Ya estas registrado?</Text>
                    </Link>
                </Flex>


            </Box>
        </Layaout>
    )
}