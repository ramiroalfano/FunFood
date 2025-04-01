import React from 'react';  
import './style.css';

const MenuCard = ({ day, meal, selected, onSelect }) => {  
    return (  
        <div   
            className={`menu-card ${selected ? 'selected' : ''}`}   
            onClick={onSelect}  
        >  
            <h3>{day}</h3>  
            <p>{meal}</p>  
        </div>  
    );  
};  

export default MenuCard;  