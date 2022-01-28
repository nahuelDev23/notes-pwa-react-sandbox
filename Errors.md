# DIFICULTADES

Al guardar el valor del nuevo comment en el state de redux la propiedad
date daba error al ser leida por moment.Decia que date no es una funcion.

Esto es porque al guardarse los datos en redux no se serialzia y hace que pierda la propiedad de function, en consecuencia al ser leido ya no es una funcion.


-------------------------


onSnapshot no funcionaba arrojando `error bc` porque todos los metodos 
de firebase tienen que ser exportados de firebase y no de firebase/lite


---------------------------

const path = `reviews`
collectionReference: collection(firebase,path)
addDoc(collectionReference,values)

const path = `reviews/${currentReviewId}`
ref =  doc(firebase,path)
getDoc(ref); // respuesta.data()

path = `reviews/${currentReviewId}`
reviewRef = doc(firebase,path);
updateDoc(reviewRef, values);

path = `reviews/${currentReviewId}`
docRef = doc(firebase, path)
deleteDoc(docRef);


path= `reviews/${idReview}/comments`
collectionReference:collection(db, path)
addDoc(collectionReference, value);