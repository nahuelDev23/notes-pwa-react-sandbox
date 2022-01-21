import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { startGoogleLogin } from '../actions/auth/auth'
import { Layaout } from '../components/layaout/Layaout'
import { startSetAllReviews } from '../actions/review/review'

export const Home = () => {
    const dispatch = useDispatch()
    const { reviews } = useSelector(state => state.review)

    const handleLoginGoogle = () => {
        dispatch(startGoogleLogin())
    }
    useEffect(() => {
        dispatch(startSetAllReviews())
    }, [dispatch])

    return (
        <Layaout>
            <h1>Home</h1>
            {reviews.map(review =>
                (<p key={review.id}>{review.id},{review.title}</p>)
            )}

            <button onClick={handleLoginGoogle}>Google login</button>
        </Layaout>
    )
}
