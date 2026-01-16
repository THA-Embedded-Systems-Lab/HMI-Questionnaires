import React from "react";

const Alternatives: React.FC = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="m-4">
            <h1>Alternative Resources</h1>
            <div className="mt-4">
              <p style={{ textAlign: "justify" }}>
                While our HMI Questionnaires database provides a comprehensive
                collection of measurement instruments for Human-Machine
                Interaction research, there are other valuable resources
                available that might complement your research needs.
              </p>
            </div>
            <div className="mt-4">
              <h2>Related Resources</h2>
              <ul className="m-3" style={{ textAlign: "justify" }}>
                <li className="mb-3">
                  <strong>German UPA:</strong> A German-only website with
                  similar content can be found at{" "}
                  <a
                    href="https://germanupa.de/wissen/fragebogenmatrix"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none"
                  >
                    German UPA.
                  </a>{" "}
                  It also offers a questionnaire matrix with filters.
                </li>
                <li className="mb-3">
                  <strong>
                    ZIS GESIS (Leibniz Institute for the Social Sciences):
                  </strong>{" "}
                  <a
                    href="https://zis.gesis.org/?lang=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none"
                  >
                    ZIS GESIS{" "}
                  </a>
                  is a free resource that documents and provides tested German,
                  English, and multilingual measurement instruments (items,
                  scales, questionnaires, tests, indexes) used or usable in
                  survey research in the social and behavioral sciences.
                </li>
                <li className="mb-3">
                  <strong>
                    Human Factors, Risk and Safety Research Unit (University of
                    Bologna):
                  </strong>{" "}
                  <a
                    href="https://site.unibo.it/hfrs/en/questionnaire-and-scales-2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none"
                  >
                    HFRS Questionnaires and Scales{" "}
                  </a>
                  provides a collection of questionnaires. Questionnaires
                  includes downloadable materials and properties information.
                </li>
              </ul>
            </div>
            <div className="mt-4">
              <h2>How These Resources Complement Our Database</h2>
              <p style={{ textAlign: "justify" }}>
                These alternative resources can be particularly useful when:
              </p>
              <ul style={{ textAlign: "justify" }}>
                <li>
                  You need questionnaires in specific languages not covered in
                  our database
                </li>
                <li>
                  You are looking for instruments from broader social science
                  research areas
                </li>
              </ul>
            </div>
            <div className="mt-4">
              <p style={{ textAlign: "justify" }}>
                We encourage researchers to explore these resources alongside
                our HMI Questionnaires database to ensure they find the most
                appropriate and validated instruments for their specific
                research contexts.
              </p>
            </div>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alternatives;
