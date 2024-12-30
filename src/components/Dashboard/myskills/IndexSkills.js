import React, { useEffect, useState } from 'react'
import { Button, Modal, Table } from 'react-bootstrap'
import { db } from '../../../firebase';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import { ClipLoader } from 'react-spinners';

const IndexSkills = () => {
  const [skills, setSkills] = useState([]);
  const [currentSkill, setCurrentSkill] = useState({id: null, name: ""});
  const [isEdit, setIsEdit] = useState(false); // لتحديد إذا كنا في وضع التعديل
  const [loading, setLoading] = useState(false); // لتفعيل التحميل أثناء العمليات
  const [show, setShow] = useState(false);

  const skillsCollection = collection(db, "skills"); // مرجع إلى مجموعة المهارات في Firestore

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchSkills = async () => {
    setLoading(true);
    const querySnapshot = await getDocs(skillsCollection);
    const skillsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
    setSkills(skillsData);
    setLoading(false);
  }

  useEffect(() => {
    fetchSkills();
  }, []);


  const addSkill = async () => {
      setLoading(true);
      await addDoc(collection(db, "skills"), {name: currentSkill.name});
      setCurrentSkill({id: null, name: ""});
      setIsEdit(false);

      Swal.fire({
          icon: "success",
          title: "عملية ناجحة",
          text: "تم إضافة المهارة بنجاح"
      });
      
      handleClose();
      fetchSkills();
  }

  const updateSkill = async () => {
      if (currentSkill.name.trim() === "") return alert("Please enter a skill name!");
      setLoading(true);
      const skillDoc = doc(db, "skills", currentSkill.id);
      await updateDoc(skillDoc, { name: currentSkill.name });
      setCurrentSkill({ id: null, name: "" });
      setIsEdit(false);
      fetchSkills();
      handleClose();
  }

  const handleDelete = async (id) => {
      setLoading(true);
      const skillDoc = doc(db, 'skills', id);
      await deleteDoc(skillDoc);
      fetchSkills();
      setLoading(false);
  }

  return (
    <section className='myskills'>
      <div className="d-flex justify-content-between">
          <h3>إدارة المهارات</h3>
          <Button variant="success" onClick={handleShow} data-bs-toggle="modal" data-bs-target="#skillModal"> 
              إضافة مهارة جديدة
          </Button>
      </div>

      {loading ? (
        <div className="loading" style={{ marginTop: "20px" }}>
            <ClipLoader color="#007bff" size={50} />
            <p>جاري التنفيذ...</p>
        </div> 
      ) : (
        <Table className='mt-3' striped bordered>
          <thead>
            <tr>
              <td>رقم المهارة</td>
              <td>المهارة</td>
              <td>إجراء</td>
            </tr>
          </thead>
          <tbody>
              {
                skills.map((s, index) => {
                  return (
                    <tr key={s.id}>
                        <td>{index + 1}</td>
                        <td>{s.name}</td>
                        <td>
                          <Button variant="success" data-bs-toggle="modal" data-bs-target="#skillModal" onClick={() => {
                            handleShow();
                            setCurrentSkill(s);
                            setIsEdit(true);
                          }}>
                              <i className="fa fa-edit"></i>
                          </Button>
                          <Button variant="danger" onClick={() => handleDelete(s.id)}>
                                <i className="fa fa-trash"></i>
                          </Button>
                        </td>
                    </tr>
                  )
                })
              }
          </tbody>
      </Table>
      )}



      {/* المودال لإضافة/تعديل المهارة */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? "تعديل المهارة" : "إضافة مهارة جديدة"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="ادخل المهارة"
              value={currentSkill.name}
              onChange={(e) =>
                setCurrentSkill({ ...currentSkill, name: e.target.value })
              }
            />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            إلغاء
          </Button>
          <Button variant="primary" onClick={isEdit ? updateSkill : addSkill}>
            حفظ البيانات
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  )
}

export default IndexSkills