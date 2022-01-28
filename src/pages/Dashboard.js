import React from 'react'
import { Button, useDisclosure } from '@chakra-ui/react'
import { serverTimestamp } from 'firebase/firestore'
import { useSelector } from 'react-redux'
import { Form } from '../components/dashboard/review/Form'
import { Layaout } from '../components/layaout/Layaout'
import { ReviewsListTable } from './review/ReviewsListTable'

export const Dashboard = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const { uid } = useSelector(state => state.auth)

    const initData = {
        title: '',
        stars: 1,
        owner: uid,
        date: serverTimestamp(),
    }

    return (
        <Layaout>
            <Button onClick={onOpen} bgColor='twitter.400' _hover={{
                background: "blue.400",
                color: "none",
            }}>Agregar review</Button>
            <ReviewsListTable />

            <Form isOpen={isOpen} onClose={onClose} initData={initData} />

        </Layaout>
    )
}
