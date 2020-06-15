import ms_stats from "./ms_stats";
export const logisticData = {
  datasets: [
    {
      data: [
        ms_stats.filter((item) => item["PO Status"] === "PO Issued").length,
        ms_stats.filter((item) => item["PO Status"] === "Ordered").length,
        ms_stats.filter((item) => item["PO Status"] === "Shipped").length,
        ms_stats.filter((item) => item["PO Status"] === "Order Cancelled")
          .length,
        ms_stats.filter((item) => item["PO Status"] === "Requires Respec")
          .length,
      ],
      backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360"],
      hoverBackgroundColor: [
        "#FF5A5E",
        "#5AD3D1",
        "#FFC870",
        "#A8B3C5",
        "#616774",
      ],
    },
  ],

  // These labels appear in the legend and in the tooltips when hovering different arcs
  labels: [
    "PO Issued",
    "Ordered",
    "Shipped",
    "Order Cancelled",
    "Requires Respec",
  ],
};
