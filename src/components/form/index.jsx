import React, { useState } from 'react';  
import './style.css';  

const Form = () => {  
    const [forms, setForms] = useState([{ id: 1 }]);  

    const handleSubmit = (event) => {  
        event.preventDefault();  
        console.log("Formulario enviado");  
    };  

    const addForm = () => {  
        setForms([...forms, { id: forms.length + 1 }]);  
    };  

    const removeForm = (id) => {  
        setForms(forms.filter(form => form.id !== id));  
    };  

    return (   
        <section className="formContainer">   
            <h1 className="text-center mb-4">Indique los datos de su hijo/a</h1>  
            {forms.map((form) => (  
                <div key={form.id} className="formWrapper" style={{ marginBottom: '1rem' }}>  
                    <form className="form" onSubmit={handleSubmit}>  
                        <div className="form-header">  
                            <h2 className="form-title">Formulario Hijos {form.id}</h2>  
                            <button className="removeButton" onClick={() => removeForm(form.id)} aria-label="Eliminar formulario">  
                                &times; {/* Símbolo de la cruz */}  
                            </button>  
                        </div>  
                        <label htmlFor={`nombre-${form.id}`} className="form__label">Nombre</label>  
                        <input type="text" name={`nombre-${form.id}`} id={`nombre-${form.id}`} className="form__input" />  

                        <label htmlFor={`apellido-${form.id}`} className="form__label">Apellido</label>  
                        <input type="text" name={`apellido-${form.id}`} id={`apellido-${form.id}`} className="form__input" />  

                        <label htmlFor={`tel-${form.id}`} className="form__label">Teléfono</label>  
                        <input type="tel" name={`tel-${form.id}`} id={`tel-${form.id}`} className="form__input" />  

                        <label htmlFor={`curso-${form.id}`} className="form__label">Colegio y curso</label>  
                        <input type="text" name={`curso-${form.id}`} id={`curso-${form.id}`} className="form__input" />  

                        <label htmlFor={`mensaje-${form.id}`} className="form__label">Comentario sobre la comida</label>  
                        <textarea name={`mensaje-${form.id}`} id={`mensaje-${form.id}`} className="form__textarea"></textarea>  
                    </form>  
                </div>  
            ))}  
            <button type="button" className="form__input form__input--submit" onClick={addForm}>Agregar más hijos</button>  
            <input type="submit" className="form__input form__input--submit" value="Enviar" />  
        </section>  
    );  
};  

export default Form;  