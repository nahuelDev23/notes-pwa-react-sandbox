import React, { useEffect, useState } from 'react'
import { db, collection, getDocs } from '../firebase/firebaseConfig'

export const Home = () => {
    const [notesList, setNotesList] = useState([])
    const docs = async () => {
        const notesCol = collection(db, 'cities');
        const notesSnapshot = await getDocs(notesCol);
        const notesList = []
         notesSnapshot.docs.map(doc =>
        (
            notesList.push({
                id: doc.id,
                ...doc.data()
            })
            )

        );
        console.log(notesList);
        setNotesList(notesList)
    }
    useEffect(() => {
        docs()
    }, [])

    return (
        <div>
            <h1>Home</h1>
            {notesList.map(note =>
                (<p key={note.id}>{note.id},{note.title}</p>)
            )}
        </div>
    )
}
