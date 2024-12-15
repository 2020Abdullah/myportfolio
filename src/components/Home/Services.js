import React from 'react'

const Services = () => {
  return (
    <section id='Services' className="services-section">
    <h2 className='section-title'>my services</h2>
    <div className="services-container">
        <div className="service">
        <i className="fab fa-html5"></i>
        <h3>تصميم صفحات ويب</h3>
        <p>
            تصميم صفحات ويب احترافية باستخدام HTML و CSS لتقديم تجربة مستخدم مميزة وسريعة.
        </p>
        </div>
        <div className="service">
        <i className="fab fa-js-square"></i>
        <h3>تطوير واجهات المستخدم</h3>
        <p>
            إنشاء واجهات تفاعلية باستخدام JavaScript و React لتوفير تجربة سلسة.
        </p>
        </div>
        <div className="service">
        <i className="fas fa-laptop-code"></i>
        <h3>تطوير مواقع متكاملة</h3>
        <p>
            بناء مواقع ويب ديناميكية باستخدام PHP و Laravel مع قواعد بيانات فعالة.
        </p>
        </div>
        <div className="service">
        <i className="fas fa-cogs"></i>
        <h3>تحسين أداء المواقع</h3>
        <p>
            تحسين سرعة وأداء المواقع باستخدام تقنيات مثل AJAX و jQuery.
        </p>
        </div>
        <div className="service">
        <i className="fab fa-bootstrap"></i>
        <h3>تصميم سريع الاستجابة</h3>
        <p>
            تصميم واجهات مرنة ومتجاوبة باستخدام Bootstrap لجميع الأجهزة.
        </p>
        </div>
        <div className="service">
        <i className="fas fa-database"></i>
        <h3>إدارة قواعد البيانات</h3>
        <p>
            إنشاء قواعد بيانات فعالة وربطها بالتطبيقات لإدارة البيانات بسهولة.
        </p>
        </div>
    </div>
    </section>
  )
}

export default Services