import React, {useState} from 'react';
import {getDownloadURL, getStorage, ref} from "firebase/storage";
import {BUCKET_URL} from "@/utils/consts";
import LOAD_IMG from "../img/load.webp"
import Image from "next/image";

const LoadImage = (props) => {

    const [URL, setURL] = useState('')
    const [loading, setLoading] = useState(true)

    getDownloadURL(ref(getStorage(), BUCKET_URL + props.name)).then((url) => {
        setURL(url)
        setLoading(false)
    })

    if (loading) {
        return (
            <Image src={LOAD_IMG} alt="" className={props.className} onClick={props.onClick}/>
        )
    }

    return (
        <img src={URL} alt="" className={props.className} onClick={props.onClick}/>
    );
};

export default LoadImage;