import Swal from 'sweetalert2'
import {getDoc, doc,setDoc,db,signOut, updateProfile, signInWithPopup, getAuth, googleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '../../firebase/firebaseConfig'
import { types } from '../../types/types';


export const startGoogleLogin = () => {
    return async (dispatch) => {
        const auth = getAuth();
        signInWithPopup(auth, googleAuthProvider)
            .then(async({ user }) => {
                const refDoc = await doc(db, `users/${user.uid}`);
                await setDoc(refDoc,{email:user.email,roles:{admin:false,author:false,reader:true},displayName:user.displayName,photo:user.photoURL})

                const docuRef = doc(db, `users/${user.uid}`);
                const req = await getDoc(docuRef);
                const roles = req.data().roles;
                
                dispatch(login(user.uid, user.displayName, user.email, user.photoURL,roles))
                
            })
            .catch(e => {
                Swal.fire('Error!',e.message,'error')
            })
    }
}

export const startRegisterWithEmailPasswordName = (email, password, name) => {
    return async (dispatch) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then(async ({ user }) => {
                await updateProfile(user, {
                    'displayName': name,
                    'photoURL': 'https://m.media-amazon.com/images/I/71sAoKumLcL._AC_SY450_.jpg',
                })
                const refDoc = await doc(db, `users/${user.uid}`);
                await setDoc(refDoc,{email,roles:{admin:false,author:false,reader:true},displayName:user.displayName,photo:user.photoURL})

                const docuRef = doc(db, `users/${user.uid}`);
                const req = await getDoc(docuRef);
                const roles = req.data().roles; //es como req.json()
                
                dispatch(login(user.uid, user.displayName, user.email, user.photoURL,roles))
            })
    }
}

export const startLoginWithEmailPasswordName = (email, password) => {
    return async (dispatch) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then(async({ user }) => {
                const docuRef = doc(db, `users/${user.uid}`);
                const req = await getDoc(docuRef);
                const roles = req.data().roles; //es como req.json()
                dispatch(login(user.uid, user.displayName, user.email, user.photoURL,roles))
            })
            .catch(e => {
                Swal.fire('Error!','usuario o contrasenia incorrectos','error')
            })
    }
}

export const startLogOut = () => {
    return async (dispatch) => {
        const auth = getAuth();
        await signOut(auth)

        dispatch(logOut())
    }
}

export const login = (uid, userName, email, photo,roles) => ({
    type: types.setUserAuth,
    payload: { uid, userName, email, photo,roles },
})

export const logOut = () => {
    return {
        type: types.logout
    }
}
