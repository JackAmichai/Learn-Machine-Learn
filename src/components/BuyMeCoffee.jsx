import React from 'react';

export const BuyMeCoffee = () => {
  return (
    <>
      <a
        href="https://buymeacoffee.com/jackami"
        target="_blank"
        rel="noreferrer"
        className="bmc-button"
        aria-label="Buy me a coffee"
      >
        <span className="bmc-icon">☕️</span>
        <span className="bmc-text">Buy me a coffee</span>
      </a>
      <style>{`
        .bmc-button {
          position: fixed;
          bottom: 20px;
          right: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
          background-color: #FFDD00;
          color: #000000;
          padding: 12px 20px;
          border-radius: 50px;
          text-decoration: none;
          font-family: 'Inter', system-ui, sans-serif;
          font-weight: 600;
          font-size: 14px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          transition: transform 0.2s, box-shadow 0.2s;
          z-index: 9999;
          white-space: nowrap;
        }

        .bmc-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0,0,0,0.4);
        }

        .bmc-icon {
          font-size: 20px;
          line-height: 1;
        }

        @media (max-width: 600px) {
          .bmc-button {
            bottom: 15px;
            right: 15px;
            padding: 10px 16px;
            font-size: 13px;
          }
        }
      `}</style>
    </>
  );
};
