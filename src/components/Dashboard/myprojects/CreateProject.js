import React, { useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Button } from "react-bootstrap";
import { db, storage } from "../../../firebase";
import { addDoc, collection } from "firebase/firestore";
import Swal from "sweetalert2";

const CreateProject = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);
    const [previewLink, setPreviewLink] = useState(null);
    const [loading, setLoading] = useState(false); // حالة التحميل

    const addProject = async (e) => {
        e.preventDefault();
        setLoading(true); 
        try {

            let imageUrl = "";

            if(image){
                const storageRef = ref(storage, `projects/${image.name}`);
                const snapshot = await uploadBytes(storageRef, image);
                imageUrl = await getDownloadURL(snapshot.ref);
            }

            const projectData = {
                name,
                description,
                video,
                imageUrl,
                previewLink
            };

            // إضافة مشروع جديد
            await addDoc(collection(db, "projects"), projectData);

            Swal.fire({
                icon: "success",
                title: "عملية ناجحة",
                text: "تم إضافة المشروع بنجاح"
            });

            setName("");
            setDescription("");
            setPreviewLink("");
            setVideo("");
            setImage(null);
        }
        catch(error){
            alert(error);
        }
        setLoading(false);
    }

    return (
        <div className="project_add">
            {loading && (
            <div className="loading-overlay">
                <div className="spinner"></div>
                <p>جاري التنفيذ...</p>
            </div>
            )}
            <h3>إضافة مشروع جديد</h3>
            <form onSubmit={addProject}>
                <input 
                    className="form-control mb-2" 
                    type="text" 
                    placeholder="اسم المشروع" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                />

                <textarea className="form-control mb-2" placeholder="وصف المشروع" cols="3" rows="3" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>


                <input
                    className="form-control mb-2"
                    type="text"
                    placeholder="رابط المشروع (اختياري)"
                    value={previewLink}
                    onChange={(e) => setPreviewLink(e.target.value)}
                />

                <input
                    className="form-control mb-2"
                    type="text"
                    placeholder="رابط الفيديو (اختياري)"
                    value={video}
                    onChange={(e) => setVideo(e.target.value)}
                />

                <label>رفع صورة للمشروع</label>
                
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

export default CreateProject;