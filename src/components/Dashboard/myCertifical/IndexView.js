import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { ClipLoader } from "react-spinners";
import { db, storage } from "../../../firebase";
import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import Swal from "sweetalert2";

const IndexView = () => {
    const [Cert, setCert] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentCert, setCurrentCert] = useState({id: null, name: "", image: ""});
    const [isEdit, setIsEdit] = useState(false);
    const [showModel, setShowModel] = useState(false);
    const [image, setImage] = useState(null);

    useEffect(() => {
        fetchCert();
    }, []);

    const handleClose = () => setShowModel(false);
    const handleShow = () => setShowModel(true);

    const fetchCert = async () => {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "myCert"));
        const CertData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));
        setCert(CertData);
        setLoading(false);
    }

    const addCert = async () => {
        let imageUrl = "";
        if(image){
            const storageRef = ref(storage, `cert/${image.name}`);
            const snapshot = await uploadBytes(storageRef, image);
            imageUrl = await getDownloadURL(snapshot.ref);
        }

        await addDoc(collection(db, "myCert"), {
            name: currentCert.name,
            image: imageUrl
        });

        Swal.fire({
            icon: "success",
            title: "عملية ناجحة",
            text: "تم إضافة الشهادة بنجاح"
        });

        setCurrentCert({id: null, name: "", image: ""})

        handleClose();

        fetchCert();
        
    }

    const handleDelete = async (id) => {
        if (window.confirm("هل تريد حذف الشهادة ؟")) {
           setLoading(true);
           const CertDoc = doc(db, 'myCert', id);
           await deleteDoc(CertDoc);

           setCurrentCert({id: null, name: "", image: ""})

           fetchCert();
           setLoading(false);
        }
    }

    return (
        <section className="mycertifical">
            <div className="d-flex justify-content-between">
                <h3>إدارة الشهادات</h3>
                <Button variant="success" onClick={handleShow} data-bs-toggle="modal" data-bs-target="#CreateModal"> 
                    إضافة شهادة جديدة
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
                    <td>رقم الشهادة</td>
                    <td>اسم الشهادة</td>
                    <td>الشهادة</td>
                    <td>إجراء</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        Cert.map((c, index) => {
                            return (
                                <tr>
                                <td>{index + 1}</td>
                                <td>{c.name}</td>
                                <td>
                                    <img src={c.image} alt="image.jpg" width={80} height={80}/>
                                </td>
                                <td>
                                    <Button variant="danger" onClick={() => handleDelete(c.id)}>
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

        <Modal show={showModel} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>إضافة شهادة جديدة</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input
                type="text"
                className="form-control mb-2"
                placeholder="ادخل اسم الشهادة"
                value={currentCert.name}
                onChange={(e) =>
                    setCurrentCert({ ...currentCert, name: e.target.value })
                }
                />
                <label>صورة</label>
                <input type="file" className="form-control" onChange={(e) => {
                    setImage(e.target.files[0]);
                }}/>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                إلغاء
            </Button>
            <Button variant="primary" onClick={addCert}>
                حفظ البيانات
            </Button>
            </Modal.Footer>
        </Modal>

        </section>
    )
}

export default IndexView;