import React from "react";
import { Questionnaire } from "../types/Questionnaire";
import { useTheme } from "../hooks/useTheme";

interface QuestionnaireModalProps {
  questionnaire: Questionnaire | null;
  isOpen: boolean;
  onClose: () => void;
  getIconForLink: (linkType: string, isDarkMode?: boolean) => string | null;
}

const QuestionnaireModal: React.FC<QuestionnaireModalProps> = ({
  questionnaire,
  isOpen,
  onClose,
  getIconForLink,
}) => {
  const { actualTheme } = useTheme();

  if (!isOpen || !questionnaire) {
    return null;
  }

  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
      tabIndex={-1}
      onClick={onClose}
    >
      <div
        className="modal-dialog modal-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="rounded modal-content shadow p-3">
          <div className="border-bottom p-3 d-flex align-items-center justify-content-between">
            <h3 className="modal-title mb-0">
              {questionnaire.short} - {questionnaire.name}
            </h3>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div>
            <div className="p-3">
              <h4>Basic Information</h4>
              <table className="table table-sm">
                <tbody>
                  <tr>
                    <td>
                      <strong>Abbreviation:</strong>
                    </td>
                    <td>{questionnaire.short}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Full Name:</strong>
                    </td>
                    <td>{questionnaire.name}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Year:</strong>
                    </td>
                    <td>{questionnaire.metadata.year || "N/A"}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Items:</strong>
                    </td>
                    <td>{questionnaire.metadata.items || "N/A"}</td>
                  </tr>
                  {questionnaire.metadata.responseFormat && (
                    <tr>
                      <td>
                        <strong>Scale Type:</strong>
                      </td>
                      <td>{questionnaire.metadata.responseFormat}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="p-3">
              <h4>Assessment Details</h4>
              <table className="table table-sm">
                <tbody>
                  <tr>
                    <td>
                      <strong>Time:</strong>
                    </td>
                    <td>{questionnaire.metadata.time.join(", ")}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Language(s):</strong>
                    </td>
                    <td>
                      {questionnaire.metadata.language?.length
                        ? questionnaire.metadata.language.join(", ")
                        : "N/A"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* </div> */}

            <div className="row mt-3 p-3">
              <div className="col-12">
                <h4>Scales</h4>
                <table className="table table-sm table-hover">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Cronbach&apos;s α</th>
                    </tr>
                  </thead>
                  <tbody>
                    {questionnaire.metadata.scales.map((scale, index) => (
                      <tr key={index}>
                        <td>{scale.name}</td>
                        <td>{scale.cronbachsAlpha || "N/A"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {questionnaire.domain && questionnaire.domain.length > 0 && (
              <div className="row mt-3 p-3">
                <div className="col-12">
                  <h4>Domains</h4>
                  <div className="d-flex flex-wrap gap-2">
                    {questionnaire.domain.map((domain, index) => (
                      <span key={index} className="badge bg-secondary p-2">
                        {domain}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {questionnaire.links &&
              Object.keys(questionnaire.links).length > 0 && (
                <div className="row mt-3 p-3">
                  <div className="col-12">
                    <h4>Links & Resources</h4>
                    <div className="d-flex flex-wrap gap-2">
                      {Object.entries(questionnaire.links).map(
                        ([linkType, linkUrl]) => (
                          <a
                            key={linkType}
                            href={linkUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary text-white btn-sm d-flex align-items-center"
                          >
                            <img
                              src={
                                getIconForLink(
                                  linkType,
                                  actualTheme === "light"
                                ) || ""
                              }
                              alt={linkType}
                              style={{
                                width: "16px",
                                height: "16px",
                                marginRight: "4px",
                              }}
                            />
                            {linkType.charAt(0).toUpperCase() +
                              linkType.slice(1)}
                          </a>
                        )
                      )}
                    </div>
                  </div>
                </div>
              )}

            {questionnaire.notes && questionnaire.notes.length > 0 && (
              <div className="row mt-3 p-3">
                <div className="col-12">
                  <h4>Notes</h4>
                  <ul className="list-unstyled">
                    {questionnaire.notes.map((note, index) => (
                      <li key={index} className="mb-2">
                        <div className="callout callout-info py-2 px-3 mb-0">
                          {note}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
          <div className="border-top p-3">
            <button
              type="button"
              className="btn btn-secondary text-white"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireModal;
