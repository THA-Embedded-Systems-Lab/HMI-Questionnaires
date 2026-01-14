import React from "react";
import { Questionnaire } from "../types/Questionnaire";
import { useTheme } from "../hooks/useTheme";

interface QuestionnaireTableProps {
  questionnaires: Questionnaire[];
  getIconForLink: (linkType: string, isDarkMode?: boolean) => string | null;
  onQuestionnaireClick: (questionnaire: Questionnaire) => void;
}

const QuestionnaireTable: React.FC<QuestionnaireTableProps> = ({
  questionnaires,
  getIconForLink,
  onQuestionnaireClick,
}) => {
  const { actualTheme } = useTheme();
  return (
    <div>
      <div className="table-responsive overflow-hidden">
        <table className="table table-hover table-sm mb-0">
          <thead className="sticky-top border-0">
            <tr>
              <th>Abbr.</th>
              <th>Name</th>
              <th className="d-none d-md-table-cell">Scales</th>
              <th className="d-none d-lg-table-cell">Time</th>
              <th className="d-none d-xl-table-cell">Languages</th>
              <th className="d-none d-sm-table-cell ">Year</th>
              <th className="d-none d-md-table-cell ">Items</th>
              <th>Links</th>
            </tr>
          </thead>
          <tbody>
            {questionnaires.map((q) => (
              <tr
                key={q.short}
                onClick={() => onQuestionnaireClick(q)}
                className="table-row-clickable"
                style={{ cursor: "pointer" }}
              >
                <td className="text-wrap">
                  <span className="fw-bold text-primary">{q.short}</span>
                </td>
                <td>
                  <div>
                    <div className="fw-medium">{q.name}</div>
                    <div className="d-md-none mt-1">
                      <small className="text-muted">
                        {q.data.reduce(
                          (totalScales, dataEntry) =>
                            totalScales + dataEntry.scales.length,
                          0
                        )}{" "}
                        scale
                        {q.data.reduce(
                          (totalScales, dataEntry) =>
                            totalScales + dataEntry.scales.length,
                          0
                        ) !== 1
                          ? "s"
                          : ""}{" "}
                        • {q.metadata.items} items
                      </small>
                    </div>
                  </div>
                </td>
                <td className="d-none d-md-table-cell">
                  <div className="d-flex flex-wrap gap-1 my-1">
                    {q.data
                      .flatMap((dataEntry) => dataEntry.scales)
                      .slice(0, 3)
                      .map((scale, index) => (
                        <span
                          key={index}
                          className="badge bg-secondary-transparent text-truncate"
                          style={{ maxWidth: "120px" }}
                        >
                          {scale.name}
                        </span>
                      ))}
                    {q.data.reduce(
                      (totalScales, dataEntry) =>
                        totalScales + dataEntry.scales.length,
                      0
                    ) > 3 && (
                      <span className="badge bg-secondary-transparent">
                        +
                        {q.data.reduce(
                          (totalScales, dataEntry) =>
                            totalScales + dataEntry.scales.length,
                          0
                        ) - 3}
                      </span>
                    )}
                  </div>
                </td>
                <td className="d-none d-lg-table-cell">
                  <small className="text-muted">
                    {q.metadata.time.join(", ")}
                  </small>
                </td>
                <td className="d-none d-xl-table-cell">
                  <div style={{ wordWrap: "break-word", hyphens: "auto" }}>
                    <small className="text-muted">
                      {q.metadata.languages?.length ? (
                        q.metadata.languages.length <= 10 ? (
                          q.metadata.languages.join(", ")
                        ) : (
                          <>
                            {q.metadata.languages.slice(0, 10).join(", ")}
                            <span className="text-primary">
                              {" "}
                              +{q.metadata.languages.length - 10} more
                            </span>
                          </>
                        )
                      ) : (
                        "—"
                      )}
                    </small>
                  </div>
                </td>
                <td className="d-none d-sm-table-cell">
                  <span className="badge bg-secondary-transparent">
                    {q.metadata.year}
                  </span>
                </td>
                <td className="d-none d-md-table-cell">
                  <span className="">
                    <small>{q.metadata.items}</small>
                  </span>
                </td>
                <td>
                  <div className="d-flex gap-1">
                    {Object.entries(q.links || {})
                      .sort(([aType], [bType]) => aType.localeCompare(bType))
                      .map(([linkType, linkUrl]) => (
                        <a
                          key={linkType}
                          href={linkUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-outline-secondary p-1 d-flex align-items-center justify-content-center"
                          onClick={(e) => e.stopPropagation()}
                          style={{ width: "28px", height: "28px" }}
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
                              display: "block",
                              margin: "auto",
                            }}
                          />
                        </a>
                      ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="my-3 mx-5 text-center text-muted callout callout-info">
          <strong>Questionnaire missing? Contribute!</strong> Refer to the{" "}
          <a
            href="https://github.com/THA-Embedded-Systems-Lab/HMI-Questionnaires/blob/main/README.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            contribution section
          </a>{" "}
          of the README on GitHub. .
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireTable;
