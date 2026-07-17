import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="text-align-center m-2">
      <hr />
      <div className="d-flex justify-content-center">
        <a
          href="https://www.tha.de/Service/Impressum.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          Imprint
        </a>
        <span className="mx-2">|</span>
        <a
          href="https://www.tha.de/Service/Datenschutz.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacy Policy
        </a>
        <span className="mx-2">|</span>
        <a
          href="https://github.com/THA-Embedded-Systems-Lab/HMI-Questionnaires"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub Repository
        </a>
        <span className="mx-2">|</span>
        <a
          href={`https://github.com/THA-Embedded-Systems-Lab/HMI-Questionnaires/tree/${
            import.meta.env.VITE_APP_VERSION
          }`}
          target="_blank"
          rel="noopener noreferrer"
        >
          v{import.meta.env.VITE_APP_VERSION} ({import.meta.env.VITE_APP_DATE})
        </a>
      </div>
      <div className="d-flex justify-content-center mt-2">
        <a
          href="https://github.com/THA-Embedded-Systems-Lab/HMI-Questionnaires/actions/workflows/check-links.yml"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://github.com/THA-Embedded-Systems-Lab/HMI-Questionnaires/actions/workflows/check-links.yml/badge.svg"
            alt="Check Links"
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
