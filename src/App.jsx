import React, { useEffect, useState } from "react";
import Loader from "./components/Loader.jsx";
import { imgDB,txtDB } from "./firebase.js";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, getDocs } from "firebase/firestore";

import Header from "./components/Header.jsx";
import ImageGallery from "./components/ImageGallery.jsx";

function App(){
    // const [txt, setTxt] = useState('')
    // const [img, setImg] = useState('')
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchInput, setSearchInput] = useState('')

    // const handleUpload = (e) => {
    //     console.log(e.target.files[0])
    //     const imgs = ref(imgDB,`Imgs/${v4()}`)
    //     uploadBytes(imgs, e.target.files[0]).then(data => {
    //         console.log(data, "imgs")
    //         getDownloadURL(data.ref).then(val => {
    //             setImg(val)
    //         })
    //     })
    // }

    // const handleClick = async () => {
    //         const valRef = collection(txtDB,'txtData')
    //         await addDoc(valRef,{txtVal:txt,imgUrl:img})
    //         alert("Data added successfully")
    // }

    const getData = async () =>{
        const valRef = collection(txtDB,'txtData')
        const dataDb = await getDocs(valRef)
        const allData = dataDb.docs.map(val=>({...val.data(), id:val.id}))
        setData(allData)
    }

    useEffect(()=>{
        setTimeout(() => {
          getData()
          setIsLoading(false)
        }, 5000)
}, [])

    return(
      <>
        <Header searchInput={searchInput} setSearchInput={setSearchInput} />
        {isLoading ? <Loader /> : <ImageGallery data={data} searchInput={searchInput}/>}
      </>
    )
}
export default App

{/* <input onChange={(e)=>setTxt(e.target.value)} /><br/>
<input type="file" onChange={(e)=>handleUpload(e)} /><br/><br/>
<button onClick={handleClick}>Add</button> */}