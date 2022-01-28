import { Box, Button, Flex, Heading, Image, Input, Text } from '@chakra-ui/react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { startGoogleLogin, startLoginWithEmailPasswordName } from '../actions/auth/auth';
import { Layaout } from '../components/layaout/Layaout';
import { useForm } from '../hooks/useForm';

export const Login = () => {
    const dispatch = useDispatch()
    const [formValues, handleInputChange] = useForm({
        email: 'admin@gmail.com',
        password: '123123'
    })
    const { email, password } = formValues

    const handleLogin = async (e) => {
        e.preventDefault()

        dispatch(startLoginWithEmailPasswordName(email, password))

    }

    const handleGoogleLogin = async () => {

        dispatch(startGoogleLogin())
    }

    return (
        <Layaout>
            <Box className="auth__box-container " >
                <Heading mb='4' textAlign='center'>Login</Heading>

                <Box as='form' onSubmit={handleLogin} textColor='black' >

                    <Input
                        type="text"
                        placeholder="Email"
                        name="email"
                        className="auth__input"
                        autoComplete="off"
                        value={email}
                        onChange={handleInputChange}
                        bgColor='white'
                        mb='4'
                    />

                    <Input
                        type="password"
                        placeholder="Password"
                        name="password"
                        className="auth__input"
                        value={password}
                        onChange={handleInputChange}
                        bgColor='white'
                        mb='4'
                    />


                    <Button
                        type="submit"
                        bgColor='twitter.300'
                        mb='8'
                        w='full'
                    >

                        Login

                    </Button>


                    <Flex flexDirection='column' >

                        <Flex
                            className="google-btn"
                            onClick={handleGoogleLogin}
                            bgColor='white'
                            p='4'
                            mb='4'
                            borderRadius='4'
                            justifyContent='center'
                        >
                            <Flex >
                                <Image mr='4' className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                            </Flex>
                            <Box >
                                <Text fontWeight='bold'>Sign in with google</Text>
                            </Box>
                        </Flex>
                    </Flex>
                    <Box
                        bgColor='white'
                        p='4'
                        borderRadius='4'
                        textAlign='center'
                        fontWeight='bold'
                        >
                        <Link
                            to="/register"
                            className="link"
                        >
                            Crear una cuenta
                        </Link>
                    </Box>


                </Box>
            </Box>
        </Layaout>

    )
}