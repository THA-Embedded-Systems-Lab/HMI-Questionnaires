import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilterSidebar from "./FilterSidebar";
import { Time } from "../types/Time";
import { sampleQuestionnaires } from "../test/render";

const baseFilters = {
  scales: [] as string[],
  time: "" as Time | "",
  language: "",
  scaleSearch: "",
};

function renderSidebar(overrides: Partial<Parameters<typeof FilterSidebar>[0]> = {}) {
  const handlers = {
    onSearchChange: vi.fn(),
    onFilterChange: vi.fn(),
    onScaleSearchChange: vi.fn(),
    onScaleToggle: vi.fn(),
    onClearScales: vi.fn(),
    onResetAllFilters: vi.fn(),
  };
  render(
    <FilterSidebar
      questionnaires={sampleQuestionnaires}
      search=""
      filters={baseFilters}
      {...handlers}
      {...overrides}
    />
  );
  return handlers;
}

describe("<FilterSidebar>", () => {
  it("renders a toggle button for each unique English scale", () => {
    renderSidebar();
    // Scales are collected only from English data entries.
    expect(
      screen.getByRole("button", { name: "Usability" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Mental Demand" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Physical Demand" })
    ).toBeInTheDocument();
  });

  it("calls onScaleToggle with the scale name when a scale is clicked", async () => {
    const { onScaleToggle } = renderSidebar();
    await userEvent.click(screen.getByRole("button", { name: "Usability" }));
    expect(onScaleToggle).toHaveBeenCalledWith("Usability");
  });

  it("forwards name search input to onSearchChange", async () => {
    const { onSearchChange } = renderSidebar();
    await userEvent.type(
      screen.getByPlaceholderText("Search by name"),
      "SUS"
    );
    expect(onSearchChange).toHaveBeenCalled();
  });

  it("renders an option for every Time enum value plus 'All'", () => {
    renderSidebar();
    const options = screen.getAllByRole("option");
    const labels = options.map((o) => o.textContent);
    expect(labels).toContain("All");
    for (const t of Object.values(Time)) {
      expect(labels).toContain(t);
    }
  });

  it("wires the clear and reset buttons", async () => {
    const { onClearScales, onResetAllFilters } = renderSidebar();
    await userEvent.click(
      screen.getByRole("button", { name: "Clear scales" })
    );
    expect(onClearScales).toHaveBeenCalledTimes(1);

    await userEvent.click(
      screen.getByRole("button", { name: "Reset All Filters" })
    );
    expect(onResetAllFilters).toHaveBeenCalledTimes(1);
  });
});
