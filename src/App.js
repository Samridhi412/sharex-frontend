import { useRef, useState, useEffect } from 'react';
import './App.css';
import { uploadFile } from './services/api';

function App() {
  const [file,setFile] = useState('');
  const [result, setResult] = useState('');
  const fileInputRef = useRef();
  const logo = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWcOhU4Ej0qKpZrjffn3KwbyD9quINYnlCrw&usqp=CAU";  
  useEffect(() => {
    const getImage = async () => {
      if(file){
        const data = new FormData();
        data.append("name", file.name);
        data.append("file",file);
        let response = await uploadFile(data);
        setResult(response.path);
      }
    }
    getImage();
  },[file]);
  const onUploadClick = () => {
    fileInputRef.current.click();
  }
  console.log(file)
  return (
   <div className="container">
    <img src={logo} alt="banner" />
    <div className="wrapper">
      <h1>Simple File Sharing</h1>
      <p>Upload And Share the download link</p>
      <button onClick={() => onUploadClick()}>Upload</button>
      <input type="file" 
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={(e) => setFile(e.target.files[0])}
      />
        <a href={result} target="_blank">{result}</a>
    </div>
   </div>
  );
}

export default App;



