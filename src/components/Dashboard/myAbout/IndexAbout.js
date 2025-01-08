import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import Swal from 'sweetalert2';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, setDoc } from 'firebase/firestore';
import { db, storage } from '../../../firebase';

const IndexAbout = () => {

  const [formData, setFormData] = useState({
    id: "1",
    name: "",
    job: "",
    bio: "",
    cv: null,
    image: null,
    skills: []
  });

  const [skillInput, setSkillInput] = useState(""); // حقل مؤقت لإدخال المهارة الجديدة
  const [loading, setLoading] = useState(false); // حالة التحميل


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); // تفعيل حالة التحميل

    const { id, name, job, bio, image, cv, skills } = formData;
    try {
        // رفع الصور والملفات إلى Firebase Storage
        const imageRef = ref(storage, `images/${image.name}`);
        const cvRef = ref(storage, `cv/${cv.name}`);
        await uploadBytes(imageRef, image);
        await uploadBytes(cvRef, cv);
  
        const imageUrl = await getDownloadURL(imageRef);
        const cvUrl = await getDownloadURL(cvRef);
  
        // إضافة البيانات أو تحديثها في Firestore
        await setDoc(doc(db, "About", id), {
          id,
          name,
          job,
          bio,
          imageUrl,
          cvUrl,
          skills
        });
  
        Swal.fire({
            icon: "success",
            title: "عملية ناجحة",
            text: "تم تحديث البيانات بنجاح"
        });

      } catch (error) {
        console.error("خطأ أثناء الحفظ:", error);
        alert("حدث خطأ أثناء الحفظ.");
      }
      finally {
        setFormData({
          name: "",
          job: "",
          bio: "",
          cv: null,
          image: null,
          skills: []
        });

        setLoading(false); // تعطيل حالة التحميل
      }
  };

  const handleSkillAdd = () => {
      if( skillInput.trim() !== ""){
        setFormData((prevData) => ({
          ...prevData,
          skills: [...prevData.skills, skillInput], // إضافة المهارة إلى المصفوفة
        }));
        setSkillInput(""); // تفريغ الحقل بعد الإضافة
        
        Swal.fire({
          icon: "success",
          title: "عملية ناجحة",
          text: `تم إضافة المهارة ${skillInput}`
        });

      }
  }

  const handleSkillRemove = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      skills: prevData.skills.filter((_, i) => i !== index), // حذف المهارة بناءً على الفهرس
    }));
  }
  
    
  return (
    <section className='myabout'>
        {loading && (
          <div className="loading-overlay">
            <div className="spinner"></div>
            <p>جاري التنفيذ...</p>
          </div>
        )}
        <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-2'>
                <Form.Label>اسمي</Form.Label>
                <input
                className='form-control'
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="اسمك بالكامل..."
                />            
            </Form.Group>
            <Form.Group className='mb-2'>
                <Form.Label>الوظيفة</Form.Label>
                <input
                className='form-control'
                type="text"
                name="job"
                value={formData.job}
                onChange={handleChange}
                placeholder="وظيفتك..."
                />
            </Form.Group>
            <Form.Group className='mb-2'>
                <Form.Label>نبذة مختصرة عني</Form.Label>
                <textarea
                className='form-control'
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="نبذة مختصرة عنك..."
                ></textarea>

            </Form.Group>

            <Form.Group className='mb-2'>
              <Form.Label>المهارات</Form.Label>
              <div className='skillInput'>
                <input
                  className='form-control'
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  placeholder="أدخل مهارة..."
                />
                <Button type="button" variant='success' onClick={handleSkillAdd}>
                  إضافة
                </Button>
              </div>
 
                <ul className='list-group mt-2'>
                  {formData.skills.map((skill, index) => (
                      <li className='list-group-item d-flex justify-content-between' key={index}>
                        <p>{skill}{" "}</p>
                        <Button type="button" variant='danger' onClick={() => handleSkillRemove(index)}>
                          حذف
                        </Button>
                      </li>
                    ))}
                </ul>
            </Form.Group>

            <Form.Group className='mb-2'>
                <Form.Label>رفع صورة</Form.Label>
                <Form.Control type='file' name='image' onChange={handleChange} />
            </Form.Group>
            <Form.Group className='mb-2'>
                <Form.Label>رفع ملف السيرة الذاتية</Form.Label>
                <Form.Control type='file' name='cv' onChange={handleChange} />
            </Form.Group>
            <Button type='submit' variant='success'>حفظ البيانات</Button>
        </Form>
    </section>
  )
}

export default IndexAbout