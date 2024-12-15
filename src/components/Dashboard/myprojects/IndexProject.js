import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from '../../../firebase';
import { Button, Table } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const IndexProject = () => {
    const [projects, setProjects] = useState([]);
    const [editProject, setEditProject] = useState(null);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        fetchProjects();
    }, [refresh])

    const fetchProjects = async () => {
        const querySnapshot = await getDocs(collection(db, 'projects'));
        const projectsData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));
        setProjects(projectsData);
    }

    // حذف المشروع
    const handleDelete = async (id) => {
        if (window.confirm("هل تريد حذف المشروع؟")) {
        await deleteDoc(doc(db, "projects", id));
        setRefresh((prev) => !prev);
        }
    };

    return (
        <div className="myprojects">
            <div className="project_manager_header">
                <h3>إدارة المشاريع</h3>
                <Button variant="success">
                    <NavLink to="/control/project/add" className="text-white">
                        إضافة مشروع جديد
                    </NavLink>
                </Button>
            </div>
            <div className="projectView">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>صورة المشروع</th>
                            <th>اسم المشروع</th>
                            <th>وصف المشروع</th>
                            <th>فيديو المشروع</th>
                            <th>رابط المشروع</th>
                            <th>الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                             projects.map((p) => (
                                <tr key={p.id}>
                                    <td>
                                        {p.imageUrl ? (
                                            <img src={p.imageUrl} alt={p.title} width="100" height="80" />
                                        ) : (
                                            "لا توجد صورة"
                                        )}
                                    </td>
                                    <td>{p.name}</td>
                                    <td>{p.description}</td>
                                    <td>
                                        {p.video ? (
                                            <a href={p.video} target="_blank" rel="noopener noreferrer">
                                                عرض الفيديو
                                            </a>
                                        ) : (
                                            "لا يوجد فيديو"
                                        )}
                                    </td>
                                    <td>
                                        {p.previewLink ? (
                                            <a href={p.previewLink} target="_blank" rel="noopener noreferrer">
                                                زيارة المشروع
                                            </a>
                                        ) : (
                                            "لا يوجد رابط"
                                        )}
                                    </td>
                                    <td>
                                        <Button variant="success" onClick={() => setEditProject(p)}>تعديل</Button>
                                        <Button variant="danger" onClick={() => handleDelete(p.id)}>حذف</Button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default IndexProject;