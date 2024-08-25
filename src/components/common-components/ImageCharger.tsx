import React, {useState} from 'react'
import { postImage } from '../../utils/common/react-query/images';
import { useGlobalData } from '../../ThemeContext';
import { ImageObject } from '../../utils/types/commonTypes';

export const ImageCharger = () => {

    const globalData = useGlobalData();
    const [image, setImage] = useState<ImageObject | any>({ preview: '', data: '' });
    const [status, setStatus] = useState('');

    const handleSubmit = async (e: any) => {
      e.preventDefault();
      let formData = new FormData();
      formData.append('image', image);
      if (image.data instanceof File) {
        const response = await postImage(globalData.jwt, formData);
        if (response) setStatus(response.statusText)
      }
    }
  
    const handleFileChange = (e: any) => {
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0],
        }
        setImage(img)
    }
  return (
    <div>
        <h1>Upload to server</h1>
        {image.preview && <img src={image.preview} width='100' height='100' alt='Uploading'/>}
        <hr></hr>
        <form onSubmit={handleSubmit}>
            <input type='file' name='file' onChange={handleFileChange}></input>
            <button type='submit'>Submit</button>
        </form>
        {status && <h4>{status}</h4>}
    </div>
  )
}
