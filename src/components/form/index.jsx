import React, { useState } from 'react';
import { ref, push, set } from 'firebase/database';
import { db } from '../../firebase-config';
import { auth, database, firestoreDb } from '../firebase/FirebaseConfig';
import './style.css';

const Form = () => {
  const [forms, setForms] = useState([{ id: 1 }]);
  const [submitStatus, setSubmitStatus] = useState({ loading: false, error: null, success: false });

  const addForm = () => {
    setForms([...forms, { id: forms.length + 1 }]);
  };

  const removeForm = (id) => {
    setForms(forms.filter(form => form.id !== id));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitStatus({ loading: true, error: null, success: false });

    try {
      console.log("Iniciando envío de formulario...");
      
      const user = auth.currentUser; // Get the current authenticated user
      if (!user) {
        throw new Error("No user authenticated. Please refresh the page.");
      }

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
          mensaje,
          createdAt: new Date().toISOString(),
          userId: user.uid // Add the user's UID
        };
      });

      console.log("Datos a enviar:", dataToSubmit);

      // Guardar cada formulario en Realtime Database
      const formsRef = ref(db, 'forms');
      for (const formData of dataToSubmit) {
        console.log("Enviando datos:", formData);
        const newFormRef = push(formsRef);
        await set(newFormRef, formData);
        console.log("Datos guardados con ID:", newFormRef.key);
      }

      // Limpiar el formulario
      event.target.reset();
      setForms([{ id: 1 }]);
      setSubmitStatus({ loading: false, error: null, success: true });
      
      // Mostrar mensaje de éxito por 3 segundos
      setTimeout(() => {
        setSubmitStatus(prev => ({ ...prev, success: false }));
      }, 3000);

    } catch (error) {
      console.error('Error al guardar los datos:', error);
      setSubmitStatus({ 
        loading: false, 
        error: `Error al guardar los datos: ${error.message}`, 
        success: false 
      });
    }
  };

  return (
    <section className="formContainer">
      <h1 className="text-center mb-4">Indique los datos de su hijo/a</h1>
      
      {submitStatus.error && (
        <div className="alert alert-danger" role="alert">
          {submitStatus.error}
        </div>
      )}
      
      {submitStatus.success && (
        <div className="alert alert-success" role="alert">
          ¡Formulario enviado con éxito!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {forms.map((form) => (
          <div key={form.id} className="formWrapper" style={{ marginBottom: '1rem' }}>
            <div className="form-header">
              <h2 className="form-title">Formulario Hijos {form.id}</h2>
              {forms.length > 1 && (
                <button 
                  type="button" 
                  className="removeButton" 
                  onClick={() => removeForm(form.id)} 
                  aria-label="Eliminar formulario"
                >
                  &times;
                </button>
              )}
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
            <textarea name={`mensaje-${form.id}`} id={`mensaje-${form.id}`} className="form__textarea"></textarea>
          </div>
        ))}
        <input 
          type="submit" 
          className="form__input form__input--submit" 
          value={submitStatus.loading ? "Enviando..." : "Enviar"} 
          disabled={submitStatus.loading}
        />
      </form>
      <button 
        type="button" 
        className="form__input form__input--submit" 
        onClick={addForm}
        disabled={submitStatus.loading}
      >
        Agregar más hijos
      </button>
    </section>
  );
};

export default Form;
