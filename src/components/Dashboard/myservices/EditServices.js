import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ClipLoader } from "react-spinners";
import Swal from "sweetalert2";

const EditServices = () => {
    const location = useLocation();
    const service = location.state?.service;

    const [title, setTitle] = useState(service?.title || "");
    const [description, setDescription] = useState(service?.description || "");
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
            let imageUrl = service.image || ""; // الرابط الحالي للصورة

            // Step 1: رفع الصورة إلى Firebase Storage (إذا تم اختيار صورة جديدة)
            if (image) {
                const storageRef = ref(storage, `services/${image.name}`);
                await uploadBytes(storageRef, image); // رفع الصورة
                imageUrl = await getDownloadURL(storageRef); // الحصول على رابط الصورة الجديدة
            }

            // Step 2: تحديث بيانات المشروع في Firestore
            const servicesRef = doc(db, "services", service.id); // مرجع المستند
            await updateDoc(servicesRef, {
              title,
              description,
              imageUrl, // تحديث رابط الصورة
            });

            Swal.fire({
                icon: "success",
                title: "عملية ناجحة",
                text: "تم تحديث الخدمة بنجاح"
            });
        }
        catch(error){
            console.error("حدث خطأ أثناء التحديث:", error);
            alert("فشل تحديث الخدمة!");
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <>
        <div className="project_edit">
            <h3>تعديل الخدمة</h3>
            {loading ? (
                <div className="loading" style={{ marginTop: "20px" }}>
                    <ClipLoader color="#007bff" size={50} />
                    <p>جاري التنفيذ...</p>
                </div>
            ) : (
                <form onSubmit={handleUpdate}>
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

export default EditServices;