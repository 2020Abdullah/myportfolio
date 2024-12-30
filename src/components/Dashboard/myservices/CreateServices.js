import React, { useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Button } from "react-bootstrap";
import { db, storage } from "../../../firebase";
import { addDoc, collection } from "firebase/firestore";
import Swal from "sweetalert2";

const CreateServices = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);

    const addServices = async (e) => {
        e.preventDefault();

        try {

            let imageUrl = "";

            if(image){
                const storageRef = ref(storage, `services/${image.name}`);
                const snapshot = await uploadBytes(storageRef, image);
                imageUrl = await getDownloadURL(snapshot.ref);
            }

            const ServicesData = {
                title,
                description,
                imageUrl,
            };

            // إضافة خدمة جديدة
            await addDoc(collection(db, "services"), ServicesData);

            Swal.fire({
                icon: "success",
                title: "عملية ناجحة",
                text: "تم إضافة الخدمة بنجاح"
            });

            setTitle("");
            setDescription("");
            setImage(null);
        }
        catch(error){
            alert(error);
        }
    }

    return (
        <div className="service_add">
            <h3>إضافة خدمة جديدة</h3>
            <form onSubmit={addServices}>
                <input 
                    className="form-control mb-2" 
                    type="text" 
                    placeholder="عنوان الخدمة" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                />

                <textarea className="form-control mb-2" placeholder="وصف الخدمة" cols="3" rows="3" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>

                <label>رفع صورة للخدمة</label>
                
                <input
                    className="form-control mb-2"
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    accept="image/*"
                />

                <Button type="submit" variant="success">حفظ البيانات</Button>

            </form>
        </div>
    )
}

export default CreateServices;