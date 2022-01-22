import React from 'react'
import { Layaout } from '../components/layaout/Layaout'
import {ReviewBox} from '../components/review/ReviewBox'
export const Home = () => {
   
    return (
        <Layaout>
            <h1>Home</h1>
            <ReviewBox/>
        </Layaout>
    )
}
