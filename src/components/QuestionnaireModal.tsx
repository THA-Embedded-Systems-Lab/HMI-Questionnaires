import React, { useState, useEffect, useCallback } from "react";
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
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");

  // Get all available languages from data entries
  const getAvailableLanguages = useCallback((): string[] => {
    if (!questionnaire) return [];

    const languages = new Set<string>();
    questionnaire.data.forEach((dataEntry) => {
      languages.add(dataEntry.language);
    });
    return Array.from(languages).sort();
  }, [questionnaire]);

  // Get Cronbach's alpha for a specific scale and language
  const getCronbachsAlphaForLanguage = (
    scaleName: string,
    language: string
  ): string => {
    if (!questionnaire) return "N/A";

    const dataEntry = questionnaire.data.find((d) => d.language === language);
    if (!dataEntry) return "N/A";

    const scale = dataEntry.scales.find((s) => s.name === scaleName);
    return scale?.cronbachsAlpha?.toString() || "—";
  };

  // Reset selected language when questionnaire changes
  useEffect(() => {
    if (questionnaire) {
      const availableLanguages = getAvailableLanguages();
      setSelectedLanguage(
        availableLanguages.length > 0 ? availableLanguages[0] : ""
      );
    }
  }, [questionnaire, getAvailableLanguages]);

  const availableLanguages = getAvailableLanguages();

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
                      <strong>Languages:</strong>
                    </td>
                    <td>
                      {questionnaire.metadata.languages?.length
                        ? questionnaire.metadata.languages.join(", ")
                        : "N/A"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Links section moved outside the table for valid JSX */}
            {questionnaire.links &&
              Object.keys(questionnaire.links).length > 0 && (
                <div className="row mt-3 p-3">
                  <div className="col-12">
                    <h4>Links & Resources</h4>
                    <ul className="list-unstyled">
                      {Object.entries(questionnaire.links).map(
                        ([linkType, linkArr]) => (
                          <li key={linkType} className="mb-2">
                            <strong>
                              {linkType.charAt(0).toUpperCase() +
                                linkType.slice(1)}
                            </strong>
                            <ul className="list-unstyled ms-3 mt-1">
                              {Array.isArray(linkArr) &&
                                linkArr.map((link, idx) => (
                                  <li
                                    key={linkType + idx}
                                    className="mb-1 d-flex align-items-center"
                                  >
                                    <img
                                      src={
                                        getIconForLink(
                                          linkType,
                                          actualTheme === "dark"
                                        ) || ""
                                      }
                                      alt={linkType}
                                      style={{
                                        width: "16px",
                                        height: "16px",
                                        marginRight: 8,
                                        verticalAlign: "middle",
                                      }}
                                    />
                                    <a
                                      href={link.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="me-2"
                                    >
                                      {link.title}
                                    </a>
                                  </li>
                                ))}
                            </ul>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              )}

            <div className="row mt-3 p-3">
              <div className="col-12">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="">Quality Information</h4>
                  {availableLanguages.length > 0 && (
                    <div className="d-flex align-items-center">
                      <select
                        id="language-select"
                        className="form-select form-select-sm"
                        style={{ width: "auto" }}
                        value={selectedLanguage}
                        onChange={(e) => setSelectedLanguage(e.target.value)}
                      >
                        {availableLanguages.map((language) => (
                          <option key={language} value={language}>
                            {language}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
                <h5>Scales</h5>
                <table className="table table-sm table-hover">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Cronbach&apos;s α</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from(
                      new Set(
                        questionnaire.data.flatMap((dataEntry) =>
                          dataEntry.scales.map((scale) => scale.name)
                        )
                      )
                    ).map((scaleName, index) => (
                      <tr key={index}>
                        <td>{scaleName}</td>
                        <td>
                          {availableLanguages.length > 0 && selectedLanguage
                            ? getCronbachsAlphaForLanguage(
                                scaleName,
                                selectedLanguage
                              )
                            : "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {selectedLanguage &&
                  (() => {
                    const dataEntry = questionnaire.data.find(
                      (d) => d.language === selectedLanguage
                    );
                    const participantDetails = dataEntry?.participantDetails;

                    if (participantDetails) {
                      return (
                        <div className="mt-4">
                          <h5>Participant Details</h5>
                          <table className="table table-sm">
                            <tbody>
                              <tr>
                                <td>
                                  <strong>Sample Size (N):</strong>
                                </td>
                                <td>{participantDetails.n}</td>
                              </tr>
                              {participantDetails.type &&
                                participantDetails.type.length > 0 && (
                                  <tr>
                                    <td>
                                      <strong>Participant Type(s):</strong>
                                    </td>
                                    <td>
                                      {participantDetails.type.join(", ")}
                                    </td>
                                  </tr>
                                )}
                            </tbody>
                          </table>
                        </div>
                      );
                    }
                    return null;
                  })()}
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
