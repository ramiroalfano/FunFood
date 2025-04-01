import React, { useState } from 'react';  
import CreditsList from './CreditsList';  
import { Link } from 'react-router-dom'; // Importar Link de react-router-dom  
import Button from 'react-bootstrap/Button';  

const CreditsCard = () => {  
    // Datos de ejemplo para los créditos  
    const [creditsData, setCreditsData] = useState([  
        { credits: 10, daysRemaining: 5 },  
        { credits: 15, daysRemaining: 10 },  
        { credits: 20, daysRemaining: 2 },  
        { credits: 30, daysRemaining: 15 },  
    ]);  

    const handleRemoveCredit = (index) => {  
        setCreditsData(creditsData.filter((_, i) => i !== index));  
    };  

    return (  
        <div>  
            <h1>Mis Créditos</h1>  
            <CreditsList creditsData={creditsData} onRemove={handleRemoveCredit} />  

            <div className="button-container mt-4">  
                <Link to="/menu">  
                    <Button variant="success" className="button">  
                        Ver el menu 
                    </Button>  
                </Link>  
                <Link to="/ShoppingCart">  
                    <Button variant="info" className="button">  
                    Comprar Créditos 
                    </Button>  
                </Link>  
            </div>  
        </div>  
    );  
};  

export default CreditsCard;  