import { signOut,updateProfile,signInWithPopup, getAuth, googleAuthProvider, signInWithEmailAndPassword,createUserWithEmailAndPassword } from '../../firebase/firebaseConfig'
import { types } from '../../types/types';

export const startGoogleLogin = () => {
    return async (dispatch) => {
        const auth = getAuth();
        signInWithPopup(auth, googleAuthProvider)
            .then(({ user }) => {
                console.log(user);
                dispatch(login(user.uid, user.displayName, user.email,user.photoURL))

            })
            .catch(e => {
                console.log(e)
            })
    }
}

export const startRegisterWithEmailPasswordName = (email, password, name) => {
    return async (dispatch) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then(async ({user}) => {
                await updateProfile(user,{
                    'displayName':name,
                    'photoURL':'https://m.media-amazon.com/images/I/71sAoKumLcL._AC_SY450_.jpg'
                })
                
                dispatch(login(user.uid, user.displayName, user.email,user.photoURL))
            })
    }
}

export const startLoginWithEmailPasswordName = (email, password, name) => {
    return async (dispatch) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                dispatch(login(user.uid, user.displayName, user.email,user.photoURL))
            })
            .catch(e =>{
                console.log(e)
            })
    }
}

export const startLogOut = () => {
    return async(dispatch) => {
        const auth = getAuth();
        await signOut(auth)
        
        dispatch(logOut())
    }
}

export const login = (uid, userName, email,photo) => ({
    type: types.setUserAuth,
    payload: { uid, userName, email ,photo},
})

export const logOut = () => {
    return {
        type: types.logout
    }
}
