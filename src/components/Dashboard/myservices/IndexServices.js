import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from '../../../firebase';
import { Button, Table } from "react-bootstrap";
import { NavLink } from 'react-router-dom'
import { ClipLoader } from "react-spinners";

const IndexServices = () => {
    const [services, setServices] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchServices();
    }, [refresh])

    const fetchServices = async () => {
        setIsLoading(true); // تشغيل اللودينج
        const querySnapshot = await getDocs(collection(db, 'services'));
        const servicesData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));
        setServices(servicesData);
        setIsLoading(false);
    }

    // حذف المشروع
    const handleDelete = async (id) => {
        if (window.confirm("هل تريد حذف هذه الخدمة ؟")) {
        await deleteDoc(doc(db, "services", id));
        setRefresh((prev) => !prev);
        }
    };

    return (
        <>
            <div className="myprojects">
                {isLoading ? (
                    <div className="loading" style={{ marginTop: "20px" }}>
                        <ClipLoader color="#007bff" size={50} />
                        <p>جاري التنفيذ...</p>
                    </div>   
                ) : (
                    <div className="project_container">

                        <div className="project_manager_header">
                            <h3>إدارة الخدمات</h3>
                            <Button variant="success">
                                <NavLink to="/control/servies/add" className="text-white">
                                    إضافة خدمة جديدة
                                </NavLink>
                            </Button>
                        </div>
                        <div className="ServicesView">
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>ايقونة الخدمة</th>
                                        <th>عنوان الخدمة</th>
                                        <th>وصف الخدمة</th>
                                        <th>الإجراءات</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        services.map((s) => (
                                            <tr key={s.id}>
                                                <td>
                                                    {s.imageUrl ? (
                                                        <img src={s.imageUrl} alt={s.title} width="100" height="80" />
                                                    ) : (
                                                        "لا توجد صورة"
                                                    )}
                                                </td>
                                                <td>{s.title}</td>
                                                <td>{s.description}</td>
                                                <td>
                                                    <NavLink
                                                        to="/control/servies/edit"
                                                        state={{ service: s }}
                                                        className="btn btn-success"
                                                    >
                                                        <i className="fa fa-edit"></i>
                                                    </NavLink>
                                                    <Button variant="danger" onClick={() => handleDelete(s.id)}>
                                                        <i className="fa fa-trash"></i>
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default IndexServices;