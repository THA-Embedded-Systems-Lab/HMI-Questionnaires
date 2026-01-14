import React, { useState, useEffect } from "react";
import { Time } from "../types/Time";
import { Questionnaire } from "../types/Questionnaire";
import { getLanguageDisplayName } from "../utils/languageUtils";

type Filters = {
  scales: string[];
  time: Time | "";
  language: string;
  scaleSearch: string;
};

interface FilterSidebarProps {
  questionnaires: Questionnaire[];
  search: string;
  filters: Filters;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFilterChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onScaleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onScaleToggle: (scale: string) => void;
  onClearScales: () => void;
  onResetAllFilters: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  questionnaires,
  search,
  filters,
  onSearchChange,
  onFilterChange,
  onScaleSearchChange,
  onScaleToggle,
  onClearScales,
  onResetAllFilters,
}) => {
  // State to track if filters are collapsed (default to collapsed on mobile)
  const [isCollapsed, setIsCollapsed] = useState(true);

  // Check if we're on mobile screen size
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // Bootstrap's md breakpoint
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const uniqueScales = Array.from(
    new Set(
      questionnaires.flatMap((q) =>
        q.data
          .filter((dataEntry) => dataEntry.language.toLowerCase() === "en")
          .flatMap((dataEntry) => dataEntry.scales.map((scale) => scale.name))
      )
    )
  );

  // Use the predefined Time enum values
  const timeValues: Time[] = Object.values(Time);

  const uniqueLanguages = Array.from(
    new Set(questionnaires.flatMap((q) => q.metadata.languages))
  );

  // Language filter state for combo box
  const [languageInput, setLanguageInput] = useState("");
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const filteredLanguages = uniqueLanguages.filter((lang) =>
    getLanguageDisplayName(lang)
      .toLowerCase()
      .includes(languageInput.toLowerCase())
  );

  return (
    <div className="p-3 rounded filter-sidebar border">
      <div className="d-flex justify-content-between align-items-center">
        {isMobile && (
          <>
            <h2 className="">Filters</h2>
            <button
              className="btn btn-outline-secondary btn-sm d-md-none"
              type="button"
              onClick={() => setIsCollapsed(!isCollapsed)}
              aria-expanded={!isCollapsed}
              aria-controls="filterContent"
            >
              {isCollapsed ? "▼ Show" : "▲ Hide"} Filters
            </button>
          </>
        )}
      </div>

      <div
        className={`collapse ${!isMobile || !isCollapsed ? "show" : ""}`}
        id="filterContent"
      >
        <h3>Name</h3>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={search}
            onChange={onSearchChange}
          />
        </div>

        <div className="mb-3">
          <h3>Scales</h3>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Search scales"
            onChange={onScaleSearchChange}
          />
          <div className="d-flex flex-wrap">
            {uniqueScales
              .filter((scaleName) =>
                scaleName.toLowerCase().includes(filters.scaleSearch || "")
              )
              .sort((a, b) => a.localeCompare(b))
              .map((scaleName) => (
                <button
                  key={scaleName}
                  type="button"
                  className={`btn badge py-2 px-3 border-0 m-1 ${filters.scales.includes(scaleName) ? "bg-primary text-white" : "bg-secondary-transparent"}`}
                  onClick={() => onScaleToggle(scaleName)}
                  aria-pressed={filters.scales.includes(scaleName)}
                >
                  {scaleName}
                </button>
              ))}
          </div>
          <button
            className="btn btn-primary mt-2 text-white"
            onClick={onClearScales}
          >
            Clear scales
          </button>
        </div>

        <div className="mb-3">
          <h3>Time</h3>
          <select
            id="time"
            name="time"
            className="form-select"
            value={filters.time}
            onChange={onFilterChange}
          >
            <option value="">All</option>
            {timeValues.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <h3>Language</h3>
          <div style={{ position: "relative" }}>
            <input
              type="text"
              className="form-control"
              placeholder="Type or select language"
              value={
                filters.language
                  ? getLanguageDisplayName(filters.language)
                  : languageInput || ""
              }
              onChange={(e) => {
                if (filters.language) {
                  // If a language is selected, clear it and start new input
                  onFilterChange({
                    target: { name: "language", value: "" },
                  } as any);
                  setLanguageInput(e.target.value);
                } else {
                  setLanguageInput(e.target.value);
                }
                setShowLangDropdown(true);
              }}
              onKeyDown={(e) => {
                if (
                  filters.language &&
                  (e.key === "Backspace" || e.key === "Delete") &&
                  (e.target as HTMLInputElement).selectionStart ===
                    (e.target as HTMLInputElement).value.length
                ) {
                  // Clear selected language and allow typing
                  onFilterChange({
                    target: { name: "language", value: "" },
                  } as any);
                  setLanguageInput("");
                  e.preventDefault();
                }
              }}
              onFocus={() => setShowLangDropdown(true)}
              onBlur={() => setTimeout(() => setShowLangDropdown(false), 150)}
              autoComplete="off"
            />
            {showLangDropdown && (
              <ul
                className="list-group position-absolute w-100"
                style={{ zIndex: 10, maxHeight: 200, overflowY: "auto" }}
              >
                <li
                  className="list-group-item list-group-item-action"
                  style={{ cursor: "pointer" }}
                  onMouseDown={() => {
                    setLanguageInput("");
                    onFilterChange({
                      target: { name: "language", value: "" },
                    } as any);
                  }}
                >
                  All Languages
                </li>
                {filteredLanguages.map((language) => (
                  <li
                    key={language}
                    className="list-group-item list-group-item-action"
                    style={{ cursor: "pointer" }}
                    onMouseDown={() => {
                      setLanguageInput("");
                      onFilterChange({
                        target: { name: "language", value: language },
                      } as any);
                    }}
                  >
                    {getLanguageDisplayName(language)}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="mb-3">
          <button
            className="btn btn-primary w-100 text-white"
            onClick={onResetAllFilters}
          >
            Reset All Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
