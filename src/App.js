import React from 'react';  
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';  
import NavBar from './components/NavBar/index';  
import Footer from './components/footer';  
import Card from './components/card';  
import Menu from './components/menu/Menu';
import ShoppingCart from './components/PayCred/ShoppingCart'; 
import Form from './components/form';
import CreditsCard from './components/Creditos/CreditsCard';
import Calendar from './components/Calendario/Calendar';
import Contact from './components/Contact'; 
import ProtectedView from './components/ProtectedView';
import AuthPanel from './components/AuthPanel';
import AdminPanel from './components/AdminPanel';
import AdminMenu from './components/AdminMenu';
// import Contact from './components/Contact'; // Componente para la vista de contacto  

const App = () => {  
    return (  
        <Router>  
            <div>  
                <NavBar />  
                <Routes>  
                    <Route path="/" element={<Card />} />  
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/ShoppingCart" element={<ShoppingCart/>} />
                    <Route path="/Form" element={<Form />} />    
                    <Route path="/CreditsCard" element={<CreditsCard />} /> 
                    <Route path="/Calendar" element={<Calendar />} /> 
                    <Route path="/Contact" element={<Contact />} /> 
                    <Route path="/protected" element={<ProtectedView />} />
                    <Route path="/auth" element={<AuthPanel />} />
                    <Route path="/admin" element={<AdminPanel />} />
                    <Route path="/admin-menu" element={<AdminMenu />} />
                </Routes>  
                <Footer />  
            </div>  
        </Router>  
    );  
};  

export default App;  
