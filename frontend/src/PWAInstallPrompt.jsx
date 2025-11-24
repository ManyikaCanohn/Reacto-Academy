import React, { useState, useEffect } from 'react';

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile) {
      const handleBeforeInstallPrompt = (e) => {
        e.preventDefault();
        setDeferredPrompt(e);
        setShowPrompt(true);
      };

      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

      return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      };
    }
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        setDeferredPrompt(null);
        setShowPrompt(false);
      });
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        textAlign: 'center',
        maxWidth: '300px'
      }}>
        <h3>Install Reacto Academy</h3>
        <p>Get the full experience by installing our app on your device!</p>
        <button onClick={handleInstallClick} style={{
          backgroundColor: '#39FF14',
          color: '#06053d',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          marginRight: '10px',
          cursor: 'pointer'
        }}>
          Install
        </button>
        <button onClick={handleDismiss} style={{
          backgroundColor: '#ccc',
          color: '#000',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer'
        }}>
          Later
        </button>
      </div>
    </div>
  );
};

export default PWAInstallPrompt;