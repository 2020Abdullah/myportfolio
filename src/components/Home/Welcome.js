import { doc, getDoc } from 'firebase/firestore';
import React , { useEffect, useRef, useState } from 'react'
import { Typed } from 'react-typed'
import { db } from '../../firebase';
import { Container } from 'react-bootstrap';

const Welcome = () => {
  const typedElement = useRef(null); // إنشاء Ref للعنصر المستهدف
  let typedInstance = useRef(null);
  const [profile, setProfile] = useState([]);

  const fetchProfile = async () => {
    try {
      const docRef = doc(db, "About", "1");
      const docSnap = await getDoc(docRef);

      if(docSnap.exists()){
        setProfile(docSnap.data());
      }
      else {
        console.log("No such document!");
      }
    }
    catch(error){
      console.error("Error fetching document:", error);
    }
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if(profile?.skills && profile.skills.length > 0){
      // تهيئة مكتبة Typed.js
      typedInstance.current = new Typed(typedElement.current, {
        strings: profile.skills, // النصوص التي سيتم عرضها
        typeSpeed: 200, // سرعة الكتابة
        backSpeed: 200, // سرعة الحذف
        loop: true, // جعل التأثير متكرر
      });
    }

    // تنظيف المكتبة عند إزالة المكون
    return () => {
      if (typedInstance.current) {
        typedInstance.current.destroy(); // تحقق قبل استدعاء destroy
        typedInstance.current = null; // إعادة تعيين الكائن إلى null
      }
    };

  }, [profile]);

  return (
    <section id="home">
        <div className='home_content_wrapper'>
          <div className="container">
              <div className="row align-items-center">
                <div className="col-md-6 col-sm-12">
                  <div className="home-content">
                      <div>Hello, my name is</div>
                      <div className="text-2">{profile.name}</div> 
                      <span ref={typedElement}></span>
                      <a className="btn btn-success" href="#About">Hire me</a>
                  </div>
                </div>
                <div className="col-md-6 col-sm-12">
                  <div className="home-img">
                      <img src={profile.imageUrl} className="img-responsive" alt='img'/>
                  </div>
                </div>
              </div>
          </div>
        </div>
        <div id="About">
            <h2 className="section-title text-center">About me</h2>
            <Container>
                <div className="About-content">
                    <h2 className="About-title">I'm {profile.name} and {profile.job}</h2>
                    <p className="lead">
                        {profile.bio}
                    </p>
                    <button className="btn btn-success"><a target="_blank" download rel='noopener noreferrer' href={profile.cvUrl}>download cv</a></button>
                </div>
            </Container>
        </div>
    </section>
  )
}

export default Welcome