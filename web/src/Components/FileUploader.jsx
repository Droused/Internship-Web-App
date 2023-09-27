import { useState } from "react";
import { ref, uploadBytes, getDownloadUrl} from 'firebase/storage';
import { storage } from '../config/firebase';

function FileUploader(){
    const [file, setFile] = useState(null)
    const [url, setUrl] = useState("")

    const handleChange = (e) => {
        setFile(e.target.files[0])
    }
    
    const handleUpload = async () => {
        const storageRef = ref(storage, 'uploads/' + file.name)
        await uploadBytes(storageRef, file).then((snapshot) => {
            console.log("Uploaded File!")
        })

        const downloadUrl = await getDownloadUrl(storageRef)
        setUrl(downloadUrl)
        console.log("File available at: " + downloadUrl)
    }

    return (
        <div>
            <input type="text" onChange={handleChange}/>
            <button onClick={handleUpload}>Upload</button>
            {url && <a href={url} target="_blank" rel="noopener noreferrer">View File</a>}
        </div>
    )
}
export default FileUploader;