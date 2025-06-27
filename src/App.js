import React, { useEffect } from 'react';  
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';  
import NavBar from './components/NavBar/index';  
import Footer from './components/footer';  
import Card from './components/card';  
import Menu from './components/menu/Menu';
import ShoppingCart from './components/PayCred/ShoppingCart'; 
import SporadicPurchases from './components/PayCred/SporadicPurchases';
import Form from './components/form';
import CreditsCard from './components/Creditos/CreditsCard';
import Calendar from './components/Calendario/Calendar';
import Contact from './components/Contact'; 
import ProtectedView from './components/ProtectedView';
import AuthPanel from './components/AuthPanel';
import AdminPanel from './components/AdminPanel';
import AdminMenu from './components/AdminMenu';
import MenuPayment from './components/PayCred/MenuPayment';
import PaymentSuccess from './components/PayCred/PaymentSuccess';
import PaymentFailure from './components/PayCred/PaymentFailure';
import PaymentPending from './components/PayCred/PaymentPending';
// import Contact from './components/Contact'; // Componente para la vista de contacto  

// Import Firebase auth
import { auth, database, firestoreDb } from './components/firebase/FirebaseConfig';
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';

const App = () => {  
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in (could be anonymous or signed up)
                console.log("User authenticated:", user.uid);
            } else {
                // No user is signed in, sign in anonymously
                console.log("No user authenticated, signing in anonymously...");
                signInAnonymously(auth)
                    .then(() => {
                        console.log("Anonymous user signed in.");
                    })
                    .catch((error) => {
                        console.error("Error signing in anonymously:", error);
                    });
            }
        });

        // Clean up subscription on unmount
        return () => unsubscribe();
    }, []);

    return (  
        <Router>  
            <div>  
                <NavBar />  
                <Routes>  
                    <Route path="/" element={<Card />} />  
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/ShoppingCart" element={<ShoppingCart/>} />
                    <Route path="/sporadic-purchases" element={<SporadicPurchases/>} />
                    <Route path="/Form" element={<Form />} />    
                    <Route path="/CreditsCard" element={<CreditsCard />} /> 
                    <Route path="/Calendar" element={<Calendar />} /> 
                    <Route path="/Contact" element={<Contact />} /> 
                    <Route path="/protected" element={<ProtectedView />} />
                    <Route path="/auth" element={<AuthPanel />} />
                    <Route path="/admin" element={<AdminPanel />} />
                    <Route path="/admin-menu" element={<AdminMenu />} />
                    <Route path="/menu-payment" element={<MenuPayment />} />
                    <Route path="/success" element={<PaymentSuccess />} />
                    <Route path="/failure" element={<PaymentFailure />} />
                    <Route path="/pending" element={<PaymentPending />} />
                </Routes>  
                <Footer />  
            </div>  
        </Router>  
    );  
};  

export default App;  
