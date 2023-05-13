import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db, auth, storage } from './config/firebase';
import { Auth } from './components/Auth';
import './App.css';
import { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from 'firebase/firestore';
import { ref, uploadBytes } from "firebase/storage";

function App() {
  const [movieList, setMovieList] = useState([]);

  // New Movies states
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setnewReleaseDate] = useState(0);
  const [hasOscar, setHasOscar] = useState(false);

  // Updqate Title State

  const [updatedTitle, setUpdatedTitle] = useState("");

  // File Upload State
  const [fileUpLoad, setFileUpLoad] = useState(null);

  const colRef = collection(db, "movies")


  const getMovieList = async () => {
    try {
      const data = await getDocs(colRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filteredData);
    } catch (error) {
      console.error(error)
    }
  };


  useEffect(() => {
    getMovieList();
  }, [])


  const onSubmitMovie = async () => {
    try {
      await addDoc(colRef, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        receivedAnOscar: hasOscar,
        userId: auth?.currentUser?.uid
      });
      getMovieList();
      //window.location.reload();
    } catch (error) {
      toast.error('Insufficient permissions to create a new field.')
    }
  }

  const deleteMovie = async (id) => {
    try {
      const movieDoc = doc(db, "movies", id);
      await deleteDoc(movieDoc);
      getMovieList();
      //window.location.reload();
    } catch (error) {
      toast.error('Insufficient permissions to delete.')
    }
  };

  const updateMovieTitle = async (id) => {
    try {
      const movieDoc = doc(db, "movies", id);
      await updateDoc(movieDoc, { title: updatedTitle });
      //window.location.reload();
      getMovieList();
    } catch (error) {
      toast.error('Insufficient permissions to update.')
    }
  };


  const uploadFile = async () => {
    try {
      if (!fileUpLoad) return;
      const filesFolderRef = ref(storage, `projectFiles/${fileUpLoad.name}`);
      await uploadBytes(filesFolderRef, fileUpLoad);
      toast.success('Success by upLoad the File');
    } catch (err) {
      toast.error('Error by file upload')
    }
  }
  return (
    <div className="App">
      <Auth getMovieList={getMovieList} />
      <div>
        <form action="">
          <input type="text" placeholder='Movie title...' onChange={(e) => setNewMovieTitle(e.target.value)} />

          <input type="number" placeholder='Release Dta...' onChange={(e) => setnewReleaseDate(Number(e.target.value))} />

          <input type="checkbox" checked={hasOscar} onChange={(e) => setHasOscar(e.target.checked)} />
          <label htmlFor="">Received an Oscar</label>
        </form>
        <button onClick={onSubmitMovie}>Submit Movie</button>
      </div>

      <div>
        {movieList.map((movie) => (
          <div key={movie.id}>
            <h1 style={{ color: movie.receivedAnOscar ? "green" : "red" }}>{movie.title}</h1>
            <p>Date: {movie.releaseDate}</p>

            <button className='delete' onClick={() => deleteMovie(movie.id)}>Delete</button>

            <input onChange={(e) => setUpdatedTitle(e.target.value)} placeholder='New Title...' />
            <button onClick={() => updateMovieTitle(movie.id)}>Update Title</button>
          </div>
        ))}
      </div>
      <div>
        <input type="file" onChange={(e) => setFileUpLoad(e.target.files[0])} />
        <button onClick={uploadFile}>UpLoad File</button>
      </div>
    </div>
  );
}

export default App;
