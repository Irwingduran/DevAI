// logo.tsx
import React from 'react';

const AIBlockchainLabsLogo: React.FC = () => {
  return (
    <div className="flex items-center">
      <div className="logo-icon">
        <span className="logo-icon-text">AI</span>
      </div>
      <div className="logo-text">
        <span className="text-gradient">AI</span>Blockchain
        <span className="text-gradient">Labs</span>
      </div>

      <style jsx>{`
        .logo-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 10px;
          box-shadow: 0 0 15px rgba(124, 58, 237, 0.5);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .logo-icon::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            to bottom right,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          transform: rotate(45deg);
          transition: all 0.6s ease;
        }

        .logo-icon:hover::before {
          transform: rotate(45deg) translate(50%, 50%);
        }

        .logo-icon-text {
          font-size: 14px;
          font-weight: 700;
          color: white;
          z-index: 1;
        }

        .logo-text {
          font-size: 18px;
          font-weight: 700;
          letter-spacing: 0.5px;
          background: linear-gradient(90deg, #fff, #e2e8f0, #fff);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          background-size: 200% auto;
          animation: shine 4s linear infinite;
        }

        .text-gradient {
          background: linear-gradient(90deg, #8b5cf6, #3b82f6);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        @keyframes shine {
          to {
            background-position: 200% center;
          }
        }

        @media (max-width: 768px) {
          .logo-icon {
            width: 32px;
            height: 32px;
          }
          .logo-text {
            font-size: 16px;
          }
        }

        @media (max-width: 480px) {
          .logo-text {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default AIBlockchainLabsLogo;