import React, { useState } from 'react';
import './style.css';
// Importa solo la instancia de Realtime Database (rtdb) desde tu archivo de configuración
import { rtdb } from '../firebase/FirebaseConfig';

// ¡Elimina o comenta cualquier inicialización de Firebase que estuviera aquí!
/*
if (!firebase.apps.length) {
  firebase.initializeApp({...});
}
*/

const Form = () => {
  const [forms, setForms] = useState([{ id: 1 }]);

  const addForm = () => {
    setForms([...forms, { id: forms.length + 1 }]);
  };

  const removeForm = (id) => {
    setForms(forms.filter(form => form.id !== id));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const dataToSubmit = forms.map((form) => {
      const nombre = event.target[`nombre-${form.id}`].value;
      const apellido = event.target[`apellido-${form.id}`].value;
      const tel = event.target[`tel-${form.id}`].value;
      const curso = event.target[`curso-${form.id}`].value;
      const mensaje = event.target[`mensaje-${form.id}`].value;

      return {
        nombre,
        apellido,
        tel,
        curso,
        mensaje
      };
    });

    saveDataToFirebase(dataToSubmit, event.target); // Pasar event.target

    console.log("Formulario enviado", dataToSubmit);
  };

  const saveDataToFirebase = (data, formElement) => {
    // Usa la instancia de RTDB importada (rtdb) para obtener la referencia
    const dbRef = rtdb.ref('hijos'); // 'hijos' es el nodo principal

    data.forEach((hijoData) => {
      dbRef.push(hijoData) // Usamos push() para crear un ID único
        .then(() => {
          console.log('Datos del hijo guardados con éxito!');
        })
        .catch((error) => {
          console.error('Error al guardar los datos del hijo:', error);
          // Maneja el error
        });
    });

    // Limpiar el formulario principal
    if (formElement && typeof formElement.reset === 'function') {
      formElement.reset();
    }
  };

  return (
    <section className="formContainer">
      <h1 className="text-center mb-4">Indique los datos de su hijo/a</h1>
      <form onSubmit={handleSubmit}>
        {forms.map((form) => (
          <div key={form.id} className="formWrapper" style={{ marginBottom: '1rem' }}>
             <div className="form-header">
               <h2 className="form-title">Formulario Hijos {form.id}</h2>
               <button type="button" className="removeButton" onClick={() => removeForm(form.id)} aria-label="Eliminar formulario">
                 &times;
               </button>
             </div>
             <label htmlFor={`nombre-${form.id}`} className="form__label">Nombre</label>
             <input type="text" name={`nombre-${form.id}`} id={`nombre-${form.id}`} className="form__input" required />

             <label htmlFor={`apellido-${form.id}`} className="form__label">Apellido</label>
             <input type="text" name={`apellido-${form.id}`} id={`apellido-${form.id}`} className="form__input" required />

             <label htmlFor={`tel-${form.id}`} className="form__label">Teléfono</label>
             <input type="tel" name={`tel-${form.id}`} id={`tel-${form.id}`} className="form__input" required />

             <label htmlFor={`curso-${form.id}`} className="form__label">Colegio y curso</label>
             <input type="text" name={`curso-${form.id}`} id={`curso-${form.id}`} className="form__input" required />

             <label htmlFor={`mensaje-${form.id}`} className="form__label">Comentario sobre la comida</label>
             <textarea name={`mensaje-${form.id}`} id={`mensaje-${form.id}`} className="form__textarea" required></textarea>
          </div>
        ))}
        <input type="submit" className="form__input form__input--submit" value="Enviar" />
      </form>
      <button type="button" className="form__input form__input--submit" onClick={addForm}>Agregar más hijos</button>
    </section>
  );
};

export default Form;
