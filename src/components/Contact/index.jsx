import React, { useState } from "react";

const Contact = () => {
  // Lista de preguntas y respuestas
  const faqs = [
    { question: "¿Cuál es el horario de atención?", answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Fusce vel nunc vel libero ultricies cursus. Integer ut magna eu lorem fermentum tempus. Sed dictum, nulla nec tempor suscipit, orci ligula aliquet erat, sit amet rhoncus enim odio nec lorem. Cras ut nunc id nunc vulputate scelerisque. Vestibulum auctor velit vel felis fermentum, in feugiat purus hendrerit." },
    { question: "¿Como comprar?", answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Fusce vel nunc vel libero ultricies cursus. Integer ut magna eu lorem fermentum tempus. Sed dictum, nulla nec tempor suscipit, orci ligula aliquet erat, sit amet rhoncus enim odio nec lorem. Cras ut nunc id nunc vulputate scelerisque. Vestibulum auctor velit vel felis fermentum, in feugiat purus hendrerit." },
    { question: "Contactanos", answer: "Nuestro numero es 123456 o hacer click en el boton de What app de abajo" }
  ];

  // Estado para manejar qué pregunta está abierta
  const [openIndex, setOpenIndex] = useState(null);

  // Función para alternar la visibilidad de la respuesta
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div style={styles.container}>
      <h2>Preguntas Frecuentes</h2>
      {faqs.map((faq, index) => (
        <div key={index} style={styles.faqItem}>
          <button onClick={() => toggleFAQ(index)} style={styles.question}>
            {faq.question} {openIndex === index ? "▲" : "▼"}
          </button>
          {openIndex === index && <p style={styles.answer}>{faq.answer}</p>}
        </div>
      ))}
    </div>
  );
};

const styles = {
    container: { width: "100%", margin: "auto", padding: "20px", fontFamily: "Arial, sans-serif" },
    faqItem: { marginBottom: "10px", borderBottom: "1px solid #ddd", paddingBottom: "5px" },
    question: { 
      width: "100%", 
      textAlign: "left", 
      background: "none", 
      color: "#000000", // Cambiado a azul
      border: "none", 
      cursor: "pointer", 
      fontSize: "18px", 
      fontWeight: "bold" 
    },
    answer: { marginTop: "5px", fontSize: "16px", color: "#555" }
  };

export default Contact;
