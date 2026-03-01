import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);

 useEffect(() => {
  axios
    .get("http://localhost:3000/api/notes")
    .then((res) => {
      console.log("Data:", res.data);
      setNotes(res.data.notes); 
    })
    .catch((err) => {
      console.error("Error fetching:", err);
    });
}, []);

  return (
    <div>
      {notes.map((note, index) => (
        <div key={index}>
          <h2>{note.title}</h2>
          <p>{note.description}</p>
        </div>
      ))}
    </div>
  );
}

export default App;