import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ClipLoader } from "react-spinners";

const EditProject = () => {
    const location = useLocation();
    const project = location.state?.project;

    const [name, setName] = useState(project?.name || "");
    const [description, setDescription] = useState(project?.description || "");
    const [video, setVideo] = useState(project?.video || "");
    const [previewLink, setPreviewLink] = useState(project?.previewLink || "");
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    // Firebase Instances
    const storage = getStorage();
    const db = getFirestore();

    const handleImageChange = (event) => {
        // التحقق من وجود target والملفات
        if (event.target && event.target.files && event.target.files[0]) {
          const file = event.target.files[0]; // الحصول على الملف الأول
          setImage(file); // تعيين الصورة في حالة useState
          console.log("تم اختيار الصورة:", file.name);
        } else {
          console.error("لم يتم اختيار أي ملف");
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let imageUrl = project.image || ""; // الرابط الحالي للصورة

            // Step 1: رفع الصورة إلى Firebase Storage (إذا تم اختيار صورة جديدة)
            if (image) {
                const storageRef = ref(storage, `projects/${image.name}`);
                await uploadBytes(storageRef, image); // رفع الصورة
                imageUrl = await getDownloadURL(storageRef); // الحصول على رابط الصورة الجديدة
            }

            // Step 2: تحديث بيانات المشروع في Firestore
            const projectRef = doc(db, "projects", project.id); // مرجع المستند
            await updateDoc(projectRef, {
              name,
              description,
              video,
              previewLink,
              imageUrl, // تحديث رابط الصورة
            });

            alert("تم تحديث المشروع بنجاح!");

        }
        catch(error){
            console.error("حدث خطأ أثناء التحديث:", error);
            alert("فشل تحديث المشروع!");
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <>
        <div className="project_edit">
            <h3>تعديل المشروع</h3>
            {loading ? (
                <div style={{ marginTop: "20px" }}>
                    <ClipLoader color="#007bff" size={50} />
                    <p>جاري التنفيذ...</p>
                </div>
            ) : (
                <form onSubmit={handleUpdate}>
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
                    
                    <input
                        className="form-control mb-2"
                        type="file"
                        onChange={handleImageChange}
                        accept="image/*"
                    />

                    <Button type="submit" variant="success">حفظ البيانات</Button>

                </form>
            )}
        </div>
        </>
    )
}

export default EditProject;