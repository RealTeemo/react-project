'use client'
import classes from "./image-picker.module.css"
import { useRef, useState } from "react"
import Image from "next/image"

export default function ImagePicker({label, name}) {
    const [pickedImage, setPickedImage] = useState()
    const filePickerRef = useRef()

    function pickImageHandler() {
        filePickerRef.current.click()
    }
    function handleImageChange(event) {
        const file = event.target.files[0]
        if(!file) {
            setPickedImage(null)
            return
        }
        const fileReader = new FileReader()
        fileReader.onload = () => {
            setPickedImage(fileReader.result)
        }
        fileReader.readAsDataURL(file)
    }
    
    return(
        <div className={classes.picker}>
            <label htmlFor={name}>{label}</label>
           
            <div className={classes.controls}>
            <div className={classes.preview}>
                {pickedImage && <Image src={pickedImage} alt="picked" fill />}
                {!pickedImage && <p>Please pick an image.</p>}
            </div>
                <input className={classes.input} type="file" accept="image/png, image/jpeg" id={name} name={name} ref={filePickerRef} onChange={handleImageChange} required />
                <button className={classes.button} type="button" onClick={pickImageHandler}>Pick Image</button>
            </div>
        </div>
    )
}