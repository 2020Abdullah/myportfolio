import React , { useEffect, useRef } from 'react'
import { Typed } from 'react-typed'

const Welcome = () => {
  const typedElement = useRef(null); // إنشاء Ref للعنصر المستهدف
  let typed = null;

  useEffect(() => {
    // تهيئة مكتبة Typed.js
    typed = new Typed(typedElement.current, {
      strings: [
        "I'm a Full-Stack Web Developer.",
        "I specialize in Front-End Development.",
        "I create modern, responsive websites.",
        "I am also skilled in Back-End Development.",
        "I build powerful web applications.",
        "Need a custom website? I can help!",
      ], // النصوص التي سيتم عرضها
      typeSpeed: 50, // سرعة الكتابة
      backSpeed: 30, // سرعة الحذف
      loop: true, // جعل التأثير متكرر
    });

    // تنظيف المكتبة عند إزالة المكون
    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <section id="home">
        <div className='home_content'>
          <div className="container">
              <div className="row align-items-center">
                <div className="col-md-6 col-sm-12">
                  <div className="home-content">
                      <div>Hello, my name is</div>
                      <div className="text-2">Abdalla mohamad</div> 
                      <span ref={typedElement}></span>
                      <a className="btn btn-success" href="#About">Hire me</a>
                  </div>
                </div>
                <div className="col-md-6 col-sm-12">
                  <div className="home-img">
                      <img src="./images/coding.svg" className="img-fluid" alt='img'/>
                  </div>
                </div>
              </div>
          </div>
        </div>
    </section>
  )
}

export default Welcome