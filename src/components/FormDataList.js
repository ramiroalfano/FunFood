import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebase-config';

function FormDataList() {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        setLoading(true);
        const user = auth.currentUser;
        
        if (!user) {
          setError('Usuario no autenticado');
          return;
        }

        // Referencia a la colección de formularios
        const formsRef = collection(db, 'forms');
        
        // Consulta para obtener los formularios del usuario actual
        const q = query(formsRef, where('userId', '==', user.uid));
        
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setFormData(data);
        setError(null);
      } catch (err) {
        console.error('Error al obtener los datos:', err);
        setError('Error al cargar los datos');
      } finally {
        setLoading(false);
      }
    };

    fetchFormData();
  }, []);

  if (loading) {
    return <div>Cargando datos...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Mis Formularios</h2>
      {formData.length === 0 ? (
        <p>No hay formularios registrados</p>
      ) : (
        <div style={{ display: 'grid', gap: '20px' }}>
          {formData.map((form) => (
            <div 
              key={form.id}
              style={{
                padding: '15px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                backgroundColor: '#f9f9f9'
              }}
            >
              <h3>Formulario #{form.id}</h3>
              <div style={{ display: 'grid', gap: '10px' }}>
                {Object.entries(form).map(([key, value]) => {
                  // No mostrar campos internos de Firebase
                  if (key === 'id' || key === 'userId') return null;
                  
                  return (
                    <div key={key}>
                      <strong>{key}:</strong> {value}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FormDataList; 