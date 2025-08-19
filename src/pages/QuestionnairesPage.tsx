import React, { useState } from "react";
import questionnaires from "../questionnaires";
import { Time } from "../types/Time";
import { Questionnaire } from "../types/Questionnaire";
import FilterSidebar from "../components/FilterSidebar";
import QuestionnaireTable from "../components/QuestionnaireTable";
import QuestionnaireModal from "../components/QuestionnaireModal";
import { getIconForLink } from "../utils/iconUtils";

type Filters = {
  scales: string[];
  time: Time | "";
  language: string;
  scaleSearch: string;
};

const QuestionnairesPage: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [filters, setFilters] = useState<Filters>({
    scales: [],
    time: "",
    language: "",
    scaleSearch: "",
  });
  const [selectedQuestionnaire, setSelectedQuestionnaire] =
    useState<Questionnaire | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value, selectedOptions } = e.target;
    if (name === "scales") {
      const selectedValues = Array.from(
        selectedOptions,
        (option) => option.value
      );
      setFilters({ ...filters, [name]: selectedValues });
    } else {
      setFilters({ ...filters, [name]: value });
    }
  };

  const handleScaleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    setFilters({
      ...filters,
      scaleSearch: searchValue,
    });
  };

  const handleScaleToggle = (scale: string) => {
    const newScales = filters.scales.includes(scale)
      ? filters.scales.filter((s) => s !== scale)
      : [...filters.scales, scale];
    setFilters({ ...filters, scales: newScales });
  };

  const handleClearScales = () => {
    setFilters({ ...filters, scales: [] });
  };

  const handleResetAllFilters = () => {
    setSearch("");
    setFilters({
      scales: [],
      time: "",
      language: "",
      scaleSearch: "",
    });
  };

  const handleQuestionnaireClick = (questionnaire: Questionnaire) => {
    setSelectedQuestionnaire(questionnaire);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedQuestionnaire(null);
  };

  const filteredQuestionnaires = questionnaires.filter((q) => {
    const matchesSearch = q.name.toLowerCase().includes(search.toLowerCase());
    const matchesScales = filters.scales.length
      ? filters.scales.every((factor) =>
          q.data.some((dataEntry) =>
            dataEntry.scales.some((scale) => scale.name === factor)
          )
        )
      : true;

    const matchesTime = filters.time
      ? q.metadata.time?.includes(filters.time)
      : true;

    const matchesLanguage = filters.language
      ? q.data.some((dataEntry) => dataEntry.language === filters.language)
      : true;

    return matchesSearch && matchesScales && matchesTime && matchesLanguage;
  });

  return (
    <div className="container-fluid mt-3">
      <div className="row">
        <div className="col-12 col-lg-3">
          <FilterSidebar
            questionnaires={questionnaires}
            search={search}
            filters={filters}
            onSearchChange={handleSearch}
            onFilterChange={handleFilterChange}
            onScaleSearchChange={handleScaleSearchChange}
            onScaleToggle={handleScaleToggle}
            onClearScales={handleClearScales}
            onResetAllFilters={handleResetAllFilters}
          />
        </div>
        <div className="col-12 col-lg-9">
          <QuestionnaireTable
            questionnaires={filteredQuestionnaires}
            getIconForLink={getIconForLink}
            onQuestionnaireClick={handleQuestionnaireClick}
          />
        </div>
      </div>
      <QuestionnaireModal
        questionnaire={selectedQuestionnaire}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        getIconForLink={getIconForLink}
      />
    </div>
  );
};

export default QuestionnairesPage;
