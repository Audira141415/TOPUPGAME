import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GameDetail from './pages/GameDetail';
import OrderTracking from './pages/OrderTracking';
import UserDashboard from './pages/UserDashboard';
import GamerTools from './pages/GamerTools';
import FlashSale from './pages/FlashSale';
import MysteryBox from './pages/MysteryBox';
import TournamentHub from './pages/TournamentHub';
import LoyaltyShop from './pages/LoyaltyShop';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import AccountStore from './pages/AccountStore';
import AccountDetail from './pages/AccountDetail';
import WhatsAppWidget from './components/WhatsAppWidget';
import LiveSocialProof from './components/LiveSocialProof';
import AIAssistant from './components/AIAssistant';
import Footer from './components/Footer';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3, ease: "circOut" }}>
              <Home />
            </motion.div>
          } />
          <Route path="/game/:slug" element={
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3, ease: "circOut" }}>
              <GameDetail />
            </motion.div>
          } />
          <Route path="/track" element={
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.3, ease: "circOut" }}>
              <OrderTracking />
            </motion.div>
          } />
          <Route path="/dashboard" element={
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3, ease: "circOut" }}>
              <UserDashboard />
            </motion.div>
          } />
          <Route path="/tools" element={
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }} transition={{ duration: 0.3, ease: "circOut" }}>
              <GamerTools />
            </motion.div>
          } />
          <Route path="/flash-sale" element={
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} transition={{ duration: 0.3, ease: "circOut" }}>
              <FlashSale />
            </motion.div>
          } />
          <Route path="/mystery-box" element={
            <motion.div initial={{ opacity: 0, rotate: -10 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 10 }} transition={{ duration: 0.3, ease: "circOut" }}>
              <MysteryBox />
            </motion.div>
          } />
          <Route path="/tournaments" element={
            <motion.div initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 100 }} transition={{ duration: 0.3, ease: "circOut" }}>
              <TournamentHub />
            </motion.div>
          } />
          <Route path="/loyalty-shop" element={
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.2 }} transition={{ duration: 0.3, ease: "circOut" }}>
              <LoyaltyShop />
            </motion.div>
          } />
          <Route path="/login" element={
            <motion.div initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} transition={{ duration: 0.3, ease: "circOut" }}>
              <Login />
            </motion.div>
          } />
          <Route path="/signup" element={
            <motion.div initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 100 }} transition={{ duration: 0.3, ease: "circOut" }}>
              <Signup />
            </motion.div>
          } />
          <Route path="/forgot-password" element={
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.3, ease: "circOut" }}>
              <ForgotPassword />
            </motion.div>
          } />
          <Route path="/reset-password" element={
            <motion.div initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3, ease: "circOut" }}>
              <ResetPassword />
            </motion.div>
          } />
          <Route path="/account-store" element={
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }} transition={{ duration: 0.3, ease: "circOut" }}>
              <AccountStore />
            </motion.div>
          } />
          <Route path="/account/:id" element={
            <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -100 }} transition={{ duration: 0.3, ease: "circOut" }}>
              <AccountDetail />
            </motion.div>
          } />
        </Routes>
      </AnimatePresence>
      <Footer />
      <WhatsAppWidget />
      <AIAssistant />
      <LiveSocialProof />
    </Router>
  );
}

export default App;
