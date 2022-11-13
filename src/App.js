import NotesList from "./components/NotesList";
import {nanoid} from "nanoid";
import {useEffect, useState} from "react";
import Calendar from 'react-calendar';


const App = () => {
    // const [calendar] = useState( [
    //     id: calendar(),
    //
    // ])



    const [date, setDate] = useState(new Date());

    //storing notes in an array
    const [notes, setNotes] = useState([
        // {
        //      id: nanoid(),
        //    text: "This is my third note",
        //      date: "5/11/2022",
        //  },
    ]);




    useEffect(() =>{
        const savedNotes = JSON.parse(localStorage.getItem("react-notes-app-data"));

        if(savedNotes) {
            setNotes(savedNotes);
        }
    }, []);


    useEffect(() => {
        if (notes.length > 1){
             localStorage.setItem("react-notes-app-data", JSON.stringify(notes));
        }
    }, [notes]);

    const addNote = (text) => {
        const date = new Date();
        const newNote = {
            id:nanoid(),
            text: text,
            date: date.toLocaleDateString()
        }
        const newNotes = [...notes, newNote];
        setNotes(newNotes);
    };

    const deleteNote = (id) => {
        const newNotes = notes.filter((note) => note.id !== id);
        setNotes(newNotes);
    }
    
//notes ktore som vytvoril vyssie
  return (
      <div className= 'container'>

          <Calendar/>
        <NotesList
            notes = {notes}
            handleAddNote = {addNote}
            handleDeleteNote = {deleteNote}
        />
      </div>
  );

    return (
        <div className="app">
            <div className="calendar-container">
                <Calendar onChange={setDate} value={date}/>
            </div>
            <div className="text-center">
                {date.toDateString()}
            </div>
        </div>
    )
};



export default App;