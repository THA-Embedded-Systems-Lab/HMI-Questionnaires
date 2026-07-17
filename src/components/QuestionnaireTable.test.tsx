import { describe, it, expect, vi } from "vitest";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import QuestionnaireTable from "./QuestionnaireTable";
import { getIconForLink } from "../utils/iconUtils";
import { renderWithTheme, sampleQuestionnaires } from "../test/render";

describe("<QuestionnaireTable>", () => {
  it("renders one row per questionnaire with its short code and name", () => {
    renderWithTheme(
      <QuestionnaireTable
        questionnaires={sampleQuestionnaires}
        getIconForLink={getIconForLink}
        onQuestionnaireClick={vi.fn()}
      />
    );

    const rows = screen.getAllByRole("row");
    // header row + one row per questionnaire
    expect(rows).toHaveLength(sampleQuestionnaires.length + 1);
    expect(screen.getByText("SUS")).toBeInTheDocument();
    expect(screen.getByText("System Usability Scale")).toBeInTheDocument();
    expect(screen.getByText("NASA-TLX")).toBeInTheDocument();
  });

  it("calls onQuestionnaireClick with the clicked questionnaire", async () => {
    const onClick = vi.fn();
    renderWithTheme(
      <QuestionnaireTable
        questionnaires={sampleQuestionnaires}
        getIconForLink={getIconForLink}
        onQuestionnaireClick={onClick}
      />
    );

    await userEvent.click(screen.getByText("System Usability Scale"));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith(sampleQuestionnaires[0]);
  });

  it("renders link buttons but does not trigger the row click when a link is clicked", async () => {
    const onClick = vi.fn();
    renderWithTheme(
      <QuestionnaireTable
        questionnaires={sampleQuestionnaires}
        getIconForLink={getIconForLink}
        onQuestionnaireClick={onClick}
      />
    );

    const susRow = screen.getByText("SUS").closest("tr")!;
    const link = within(susRow).getByRole("link");
    expect(link).toHaveAttribute("href", "https://doi.org/10.0/sus");

    await userEvent.click(link);
    // stopPropagation in the component prevents the row handler from firing
    expect(onClick).not.toHaveBeenCalled();
  });
});
