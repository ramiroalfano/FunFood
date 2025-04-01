import React from 'react';  
import { Link } from 'react-router-dom'; // Importa Link para la navegación  
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de tener Bootstrap instalado  
import './style.css'; // Importa tu archivo CSS  

// Importar imágenes  
import food1 from '../../img/food1.jpg';  
import smallImage1 from '../../img/food2.jpg';  
import smallImage2 from '../../img/food3.jpg';  
import mediumImage1 from '../../img/food4.jpg';  
import mediumImage2 from '../../img/food5.jpg';  
import mediumImage3 from '../../img/food6.jpg';  

const Card = () => {  
    return (  
        <div className="container my-5">  
            <h1 className="text-center mb-4">Bienvenido a FunFood</h1>  
            <div className="row g-4">  
                {/* Large item */}  
                <div className="col-md-8">  
                    <Link to="/menu"> {/* Enlace a la vista del menú */}  
                        <div className="bento-item bento-tall" style={{ backgroundImage: `url(${food1})` }}>   
                            <h2>Nuestro Menú Semanal</h2>  
                        </div>  
                    </Link>  
                </div>  
                {/* Two small items */}  
                <div className="col-md-4">  
                    <div className="row g-4">  
                        <div className="col-12">  
                            <Link to="/ShoppingCart"> {/* Enlace a la vista de créditos */}  
                                <div className="bento-item" style={{ backgroundImage: `url(${smallImage1})` }}>   
                                    <h2>Compras</h2>  
                                </div>  
                            </Link>  
                        </div>  
                        <div className="col-12">  
                            <Link to="/Form"> {/* Enlace a la vista de datos personales */}  
                                <div className="bento-item" style={{ backgroundImage: `url(${smallImage2})` }}>   
                                    <h2>Mis Datos</h2>  
                                </div>  
                            </Link>  
                        </div>  
                    </div>  
                </div>  
                {/* Medium items */}  
                <div className="col-md-4">  
                    <Link to="/CreditsCard"> {/* Enlace a la vista de compras */}  
                        <div className="bento-item" style={{ backgroundImage: `url(${mediumImage1})` }}>   
                            <h2>Mis Créditos</h2>  
                        </div>  
                    </Link>  
                </div>  
                <div className="col-md-4">  
                    <Link to="/Calendar"> {/* Enlace a la vista de mis créditos */}  
                        <div className="bento-item" style={{ backgroundImage: `url(${mediumImage2})` }}>   
                            <h2>Elegir Menu</h2>  
                        </div>  
                    </Link>  
                </div>  
                <div className="col-md-4">  
                    <Link to="/Contact"> {/* Enlace a la vista de contacto */}  
                        <div className="bento-item" style={{ backgroundImage: `url(${mediumImage3})` }}>   
                            <h2>Contacto</h2>  
                        </div>  
                    </Link>  
                </div>  
            </div>  
        </div>  
    );  
};  

export default Card;  