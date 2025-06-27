import React from 'react';  
import logo from './LogoFun-Photoroom.png'; // Asegúrate de que la ruta sea correcta para tu proyecto  

const Footer = () => {  
    const footerStyle = {  
        backgroundColor: '#f8f9fa',  
        padding: '20px 0',  
        marginTop: '30px',  
    };  

    const socialIconStyle = {  
        color: '#6c757d',  
        fontSize: '1.5rem',  
        margin: '0 10px',  
        transition: 'color 0.3s ease',  
    };  

    const socialIconHoverStyle = {  
        color: '#007bff',  
    };  

    return (  
        <footer style={footerStyle}>  
            <div className="container">  
                <div className="row align-items-center">  
                    <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">  
                        <a href="/" aria-label="Inicio" style={{ marginRight: '10px' }}>  
                            <img   
                                src={logo}   
                                alt="Inicio"   
                                style={{ width: '150px', height: '150px', verticalAlign: 'middle' }} // Ajusta el tamaño según necesites  
                            />  
                        </a>  
                    </div>  
                    <div className="col-md-6 text-center text-md-end">  
                        <div className="social-icons">   
                            <a href="#" aria-label="Instagram"   
                            style={socialIconStyle}   
                            onMouseOver={e => e.currentTarget.style.color = socialIconHoverStyle.color}   
                            onMouseOut={e => e.currentTarget.style.color = socialIconStyle.color}>  
                                <i className="fab fa-instagram"></i>  
                            </a>  
                            <a href="https://web.whatsapp.com/" aria-label="WhatsApp"   
                            style={socialIconStyle}   
                            onMouseOver={e => e.currentTarget.style.color = socialIconHoverStyle.color}   
                            onMouseOut={e => e.currentTarget.style.color = socialIconStyle.color}>  
                                <i className="fab fa-whatsapp"></i>  
                            </a>  
                        </div>  
                    </div>  
                </div>  
            </div>  
        </footer>  
    );  
};  

export default Footer;  