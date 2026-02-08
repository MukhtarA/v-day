/* eslint-disable react-hooks/purity */
import { useState, useEffect } from 'react';
import { Heart, Sparkles, Smile, HeartCrack, HandHeart, MessageCircleHeart, Angry } from 'lucide-react';
import './App.css';
import img1 from './assets/img1.jpeg'
import img2 from './assets/img2.jpeg'
import img3 from './assets/img3.jpeg'
import face from './assets/face.jpeg'

function App() {
  const [yesPressed, setYesPressed] = useState(false);
  const [noPressed, setNoPressed] = useState(false);
  const [showPointing, setShowPointing] = useState(false);
  const [noButtonTransform, setNoButtonTransform] = useState({ x: 0, y: 0 });
  const [hearts, setHearts] = useState<{ id: number; left: number; delay: number; duration: number }[]>([]);

  const handleNoHover = () => {
    // Generate random movement within a limited range (-100px to 100px)
    // This keeps it close enough to be annoying but not unreachable
    // Using transform ensures no layout shift ("squashing")
    const x = (Math.random() - 0.5) * 300; 
    const y = (Math.random() - 0.5) * 300;

    setNoButtonTransform({ x, y });
  };

  const handleNoClick = () => {
    setNoPressed(true);
  };

  const handleYesClick = async () => {
    setYesPressed(true);

    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_FORM_TOKEN, // ПОЛУЧИ КЛЮЧ НА WEB3FORMS.COM
          subject: "❤️ ОНА СКАЗАЛА ДА! ❤️",
          from_name: "Твоя Валентинка",
          message: `Ура! Пользователь нажал "Yes, I will!" на твоей странице. Почта получателя: m.abulmansur32@gmail.com`,
        }),
      });
      console.log("Email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

useEffect(() => {
    if (yesPressed) {
      const maxDelay = 2; // в секундах
      const maxDuration = 4; // 3 + 1
      
      const newHearts = Array.from({ length: 500 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * maxDelay, 
        duration: 3 + Math.random() * 1 
      }));
      setHearts(newHearts);

      // Ждем, пока самое последнее сердечко завершит полет (2с задержки + 4с полета)
      // Добавляем небольшой запас (например, 500мс), чтобы всё точно улетело за экран
      const totalWaitTime = (maxDelay + maxDuration) * 1000 + 500;

      const timer = setTimeout(() => {
        setHearts([]);
      }, totalWaitTime);

      return () => clearTimeout(timer);
    }
  }, [yesPressed]);

  useEffect(() => {
    if (noPressed) {
      const timer = setTimeout(() => {
        setShowPointing(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [noPressed]);

  if (yesPressed) {
     return (
      <div className="app-container">
        <div className="floater" style={{ top: '10%', left: '10%', animationDelay: '0s' }}>
          <div className="floating-icon-container">
            <Heart size={24} color="#fb7185" />
          </div>
        </div>

        <div className="floater" style={{ top: '20%', right: '15%', animationDelay: '2s' }}>
          <div className="floating-icon-container">
            <Sparkles size={20} color="#fbbf24" />
          </div>
        </div>

        <div className="floater" style={{ bottom: '15%', left: '20%', animationDelay: '4s' }}>
          <div className="floating-icon-container">
            <MessageCircleHeart size={28} color="#f472b6" />
          </div>
        </div>

        <div className="floater" style={{ bottom: '30%', right: '8%', animationDelay: '1.5s' }}>
          <div className="floating-icon-container">
            <HandHeart size={26} color="#a78bfa" />
          </div>
        </div>    
        {/* Bursting Hearts */}
        {hearts.map((heart) => (
            <div
                key={heart.id}
                className="burst-heart"
                style={{
                    left: `${heart.left}%`,
                    animationDelay: `${heart.delay}s`,
                    animationDuration: `${heart.duration}s`
                }}
            >
                <Heart size={Math.random() * 20 + 20} fill="#e11d48" color="#e11d48" />
            </div>
        ))}
        
        <div className="card" style={{ maxWidth: '100%', width: 'auto', background: 'transparent', border: 'none', boxShadow: 'none' }}>
           <div className="typography-group" style={{ marginBottom: '32px' }}>
            <h1 className="title">ДААААААААА! <br/><span>Очень очень очень тебя люблю!</span></h1>
          </div>

          <div className="photo-gallery">
            <div className="photo-card">
                <img src={img1} alt="Couple sunset" />
                <div className="photo-card-caption">Самая красивая</div>
            </div>
            <div className="photo-card">
                <img src={img2} alt="Holding hands" />
                 <div className="photo-card-caption">Самая родная</div>
            </div>
            <div className="photo-card">
                <img src={img3} alt="Smiling girl" />
                <div className="photo-card-caption">И самая милая :)</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (noPressed) {
    if (!showPointing) {
        // Crying State
        return (
            <div className="app-container">
              <div className="floater" style={{ top: '10%', left: '10%', animationDelay: '0s' }}>
                <div className="floating-icon-container">
                  <HeartCrack size={24} color="#fb7185" />
                </div>
              </div>

              <div className="floater" style={{ top: '20%', right: '15%', animationDelay: '2s' }}>
                <div className="floating-icon-container">
                  <HeartCrack size={20} color="#fbbf24" />
                </div>
              </div>

              <div className="floater" style={{ bottom: '15%', left: '20%', animationDelay: '4s' }}>
                <div className="floating-icon-container">
                  <HeartCrack size={28} color="#f472b6" />
                </div>
              </div>

              <div className="floater" style={{ bottom: '30%', right: '8%', animationDelay: '1.5s' }}>
                <div className="floating-icon-container">
                  <HeartCrack size={26} color="#a78bfa" />
                </div>
              </div>
              <div className="card">
                  <div style={{ margin: '20px 0' }}>
                      <HeartCrack size={100} color="#9d8c8c" />
                  </div>
                  <div className="typography-group">
                      <h1 className="title">Why? 😭</h1>
                      <div className="subtitle">That hurts...</div>
                  </div>
              </div>
            </div>
        );
    } else {
        // Laughing/Pointing State
        return (
            <div className="app-container">
              <div className="floater" style={{ top: '10%', left: '10%', animationDelay: '0s' }}>
                <div className="floating-icon-container">
                  <Heart size={24} color="#fb7185" />
                </div>
              </div>

              <div className="floater" style={{ top: '20%', right: '15%', animationDelay: '2s' }}>
                <div className="floating-icon-container">
                  <Sparkles size={20} color="#fbbf24" />
                </div>
              </div>

              <div className="floater" style={{ bottom: '15%', left: '20%', animationDelay: '4s' }}>
                <div className="floating-icon-container">
                  <MessageCircleHeart size={28} color="#f472b6" />
                </div>
              </div>

              <div className="floater" style={{ bottom: '30%', right: '8%', animationDelay: '1.5s' }}>
                <div className="floating-icon-container">
                  <HandHeart size={26} color="#a78bfa" />
                </div>
              </div>              
              <div className="card">
                     <div style={{ margin: '20px 0' }}>
                        <Smile size={100} color="#fb7185" />
                    </div>
                    <div className="typography-group">
                        <h1 className="title">Just Kidding!</h1>
                        <div className="subtitle">You know what to do 😉</div>
                    </div>
                    
                    <div className="actions">
                        <button className="btn btn-yes" onClick={handleYesClick}>
                            Yes, I will!
                            <div style={{ width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Heart size={18} fill="currentColor" />
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
  }

  return (
    <div className="app-container">
      {/* Background Elements */}
      <div className="floater" style={{ top: '10%', left: '10%', animationDelay: '0s' }}>
        <div className="floating-icon-container">
          <Heart size={24} color="#fb7185" />
        </div>
      </div>

      <div className="floater" style={{ top: '20%', right: '15%', animationDelay: '2s' }}>
        <div className="floating-icon-container">
          <Sparkles size={20} color="#fbbf24" />
        </div>
      </div>

      <div className="floater" style={{ bottom: '15%', left: '20%', animationDelay: '4s' }}>
        <div className="floating-icon-container">
          <MessageCircleHeart size={28} color="#f472b6" />
        </div>
      </div>

      <div className="floater" style={{ bottom: '30%', right: '8%', animationDelay: '1.5s' }}>
        <div className="floating-icon-container">
          <HandHeart size={26} color="#a78bfa" />
        </div>
      </div>
      <div className="card">
        {/* Decorative stickers on card */}
        <div className="sticker" style={{ top: '-20px', right: '-15px', transform: 'rotate(15deg)' }}>
            <Heart size={48} color="#fda4af" className="icon-pulse" />
        </div>

        <img
          src={face}
          alt="Cute romantic couple art"
          className="hero-image"
        />

        <div className="typography-group">
          <div className="subtitle">Привет малышка</div>
          <h1 className="title">
            Будешь моей<br /><span>Валентинкой? 🌹</span>
          </h1>
        </div>

        <div className="actions">
          <button className="btn btn-yes" onClick={handleYesClick}>

              Да, конечно буду!
              <div style={{ width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Heart size={18} fill="currentColor" />
              </div>
            </button>

          <button
            className="btn btn-no"
            onMouseEnter={handleNoHover}
            onClick={handleNoClick}
            style={{
                transform: `translate(${noButtonTransform.x}px, ${noButtonTransform.y}px)`,
                zIndex: 50 
            }}
          >
            Нет   
            <div style={{ width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Angry size={18} fill="#FF5263" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
