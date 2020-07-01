export const initialData = {
  cards: {
    "card-1": { id: "card-1", title: "CapEx", width: 6, size: "small" },
    "card-2": { id: "card-2", title: "Logistic", width: 6, size: "small" },
    "card-3": {
      id: "card-3",
      title: "Loose Furniture (by SKU)",
      width: 12,
      size: "big",
    },
    "card-4": { id: "card-4", title: "Occupancy", width: 12, size: "small" },
    "card-5": {
      id: "card-5",
      title: "Occupancy Chart",
      width: 12,
      size: "big",
    },
    "card-6": {
      id: "card-6",
      title: "Occupancy Metrics",
      width: 12,
      size: "big",
    },
    "card-7": {
      id: "card-7",
      title: "Events Insights",
      width: 12,
      size: "big",
    },
    "card-8": {
      id: "card-8",
      title: "Revenue Insights",
      width: 12,
      size: "big",
    },
  },
  workspaces: {
    "workspace-1": {
      id: "workspace-1",
      title: "development",
      cardIds: ["card-1", "card-2", "card-3", "card-4"],
    },
    "workspace-2": {
      id: "workspace-2",
      title: "development",
      cardIds: ["card-5", "card-6", "card-7", "card-8"],
    },
  },
};
