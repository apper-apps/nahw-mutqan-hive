export const confetti = () => {
  // Create confetti elements
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F'];
  const confettiCount = 50;
  
  for (let i = 0; i < confettiCount; i++) {
    createConfettiPiece(colors[Math.floor(Math.random() * colors.length)]);
  }
};

const createConfettiPiece = (color) => {
  const confetti = document.createElement('div');
  confetti.style.position = 'fixed';
  confetti.style.left = Math.random() * 100 + 'vw';
  confetti.style.top = '-10px';
  confetti.style.width = Math.random() * 10 + 5 + 'px';
  confetti.style.height = Math.random() * 10 + 5 + 'px';
  confetti.style.backgroundColor = color;
  confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
  confetti.style.zIndex = '10000';
  confetti.style.pointerEvents = 'none';
  confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
  
  document.body.appendChild(confetti);
  
  // Animate the confetti
  let rotation = 0;
  let fall = 0;
  const speed = Math.random() * 3 + 2;
  const rotationSpeed = Math.random() * 10 + 5;
  
  const animate = () => {
    fall += speed;
    rotation += rotationSpeed;
    confetti.style.top = fall + 'px';
    confetti.style.transform = `rotate(${rotation}deg)`;
    
    if (fall < window.innerHeight + 50) {
      requestAnimationFrame(animate);
    } else {
      document.body.removeChild(confetti);
    }
  };
  
  requestAnimationFrame(animate);
};