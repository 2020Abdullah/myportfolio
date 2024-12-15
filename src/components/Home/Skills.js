import React from 'react'

const myskills = [
    { name: "HTML", level: "90%", color: "#e34c26" },
    { name: "CSS", level: "85%", color: "#264de4" },
    { name: "JavaScript", level: "80%", color: "#f7df1e" },
    { name: "Bootstrap", level: "85%", color: "#563d7c" },
    { name: "React", level: "75%", color: "#61dafb" },
    { name: "PHP", level: "80%", color: "#787cb5" },
    { name: "Laravel", level: "70%", color: "#ff2d20" },
    { name: "AJAX", level: "65%", color: "#00c5ff" },
    { name: "jQuery", level: "75%", color: "#0769ad" },
];

const Skills = () => {
  return (
    <section id='Skills' style={styles.skillsSection}>
    <h2 className='section-title'>myskills</h2>
    <div style={styles.skillsContainer}>
      {myskills.map((skill, index) => (
        <div key={index} style={styles.skill}>
          <h3>{skill.name}</h3>
          <div style={styles.progressBar}>
            <div
              style={{
                ...styles.progress,
                width: skill.level,
                backgroundColor: skill.color,
              }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  </section>
  )
}

const styles = {
    skillsSection: {
      backgroundColor: "#f4f4f9",
      padding: "50px 20px",
      textAlign: "center",
    },
    skillsContainer: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "20px",
    },
    skill: {
      backgroundColor: "#fff",
      borderRadius: "10px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      width: "250px",
      padding: "20px",
      textAlign: "center",
      transition: "transform 0.3s ease",
    },
    progressBar: {
      backgroundColor: "#e9ecef",
      borderRadius: "5px",
      overflow: "hidden",
      height: "10px",
      marginTop: "10px",
    },
    progress: {
      height: "100%",
      borderRadius: "5px",
      transition: "width 0.4s ease",
    },
  };
export default Skills