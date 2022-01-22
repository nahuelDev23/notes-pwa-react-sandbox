import { Box } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { Layaout } from '../components/layaout/Layaout'
import { useForm } from '../hooks/useForm'

export const Dashboard = () => {
    const {  uid } = useSelector(state => state.auth)
    const [values,handleInputChange] = useForm({
        title:'',
        content:'',
        roles:{
            [uid]:"owner"
        }
    })
    const handleSubmit = (e) => {
        e.preventDefault()
    }
    
    return (
        <Layaout>
            <h1>Panel admin</h1>
            <Box as='form' onSubmi={handleSubmit}></Box>
        </Layaout>
    )
}
