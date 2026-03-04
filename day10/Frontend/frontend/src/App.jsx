import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);

function fetchNotes(){
  axios
    .get("https://backend-cohort-2-0-cvet.onrender.com/api/notes")
    .then((res) => {

      setNotes(res.data.notes); 
    })
    .catch((err) => {
      console.error("Error fetching:", err);
    });
}
 useEffect(() => {
  axios
    .get("https://backend-cohort-2-0-cvet.onrender.com/api/notes")
    .then((res) => {
      console.log("Data:", res.data);
      setNotes(res.data.notes); 
    })
    .catch((err) => {
      console.error("Error fetching:", err);
    });
}, []);

function handleSubmit(e){
  e.preventDefault();
  const {title,description} = e.target.elements;
  console.log(title.value,description.value);
  axios.post("https://backend-cohort-2-0-cvet.onrender.com/api/notes",{
    title:title.value,
    description:description.value,
  })
  .then(res=>{
    console.log(res.data);
    fetchNotes();
  })
}

function handleDelete(noteId){
  console.log(noteId);
  axios.delete(`https://backend-cohort-2-0-cvet.onrender.com/api/notes/${noteId}`)
    .then(res => {
      console.log(res.data);
      fetchNotes();
    })
    .catch(err => {
      console.error("Error deleting note:", err);
    });
}
function handleEdit(noteId){
  const newDescription = prompt("Enter new Description: ");
  if(newDescription){
    axios.patch(`https://backend-cohort-2-0-cvet.onrender.com/api/notes/${noteId}`,{
      description:newDescription
    })
    .then(res =>{
      console.log(res.data);
      fetchNotes();
    })
  }

}
  return (
    <>

    <form  className="note-create-form" onSubmit={handleSubmit}>
      <input name="title"type="text" placeholder="Enter Title" />       
      <input name="description"type="text" placeholder="Enter Description" />
      <button>Create Note</button>
    </form>


    <div className="notes">
      {notes.map((note, index) => (
        <div key={index} className="note">
          <h2>{note.title}</h2>
          <p>{note.description}</p>
          <button onClick={() => handleDelete(note._id)}>Delete Note</button>
          <button onClick={()=>handleEdit(note._id)}>Edit Note</button>
        </div>
      ))}
    </div>
    </>
    
  );
}

export default App;