import React from 'react';  
import Button from 'react-bootstrap/Button';  
import Card from 'react-bootstrap/Card';  
import './Style.css'; // Asegúrate de que la ruta sea correcta  

const CreditsCard = ({ credits, daysRemaining, onRemove }) => {  
    return (  
        <Card className="credits-card text-center mb-3">  
            <Card.Header className="text-center mb-4">Créditos Comprados</Card.Header>  
            <Card.Body>  
                <Card.Title>{credits} Créditos</Card.Title>  
                <Card.Text>  
                    Tienes <strong>{daysRemaining}</strong> días para usarlos.  
                </Card.Text>  
                <Button variant="danger" onClick={onRemove}>Eliminar</Button>  
            </Card.Body>  
        </Card>  
    );  
};  

const CreditsList = ({ creditsData, onRemove }) => {  
    return (  
        <div>  
            {creditsData.map((item, index) => (  
                <CreditsCard   
                    key={index}   
                    credits={item.credits}   
                    daysRemaining={item.daysRemaining}   
                    onRemove={() => onRemove(index)} // Llama a la función para eliminar  
                />  
            ))}  
        </div>  
    );  
};  

export default CreditsList;  