const occupancy_stats = [
  // {
  //   "Month (BoM)": "2020-06",
  //   "# of Offices": 308,
  //   "Capacity (Desks)": "4606",
  //   "Occupancy (Desks)": "4053",
  //   "Occ % (Desks)": "88.00%",
  //   "Occ % (Offices)": "67.90%",
  //   "Desk Churn %": "0.00%",
  //   "Account Churn %": "0.00%",
  //   "% Of Desks Enterprise": "57.60%",
  //   "% Accounts Enterprise": "12.60%"
  // },
  // {
  //   "Month (BoM)": "2020-05",
  //   "# of Offices": 308,
  //   "Capacity (Desks)": "4606",
  //   "Occupancy (Desks)": "4053",
  //   "Occ % (Desks)": "88.00%",
  //   "Occ % (Offices)": "67.90%",
  //   "Desk Churn %": "0.00%",
  //   "Account Churn %": "0.00%",
  //   "% Of Desks Enterprise": "57.60%",
  //   "% Accounts Enterprise": "12.60%"
  // },
  // {
  //   "Month (BoM)": "2020-04",
  //   "# of Offices": 308,
  //   "Capacity (Desks)": "4606",
  //   "Occupancy (Desks)": "4187",
  //   "Occ % (Desks)": "90.90%",
  //   "Occ % (Offices)": "69.80%",
  //   "Desk Churn %": "0.10%",
  //   "Account Churn %": "0.80%",
  //   "% Of Desks Enterprise": "58.80%",
  //   "% Accounts Enterprise": "12.50%"
  // },
  {
    "Month (BoM)": "2020-03",
    "# of Offices": 308,
    "Capacity (Desks)": "4606",
    "Occupancy (Desks)": "4222",
    "Occ % (Desks)": "91.70%",
    "Occ % (Offices)": "73.10%",
    "Desk Churn %": "0.80%",
    "Account Churn %": "4.70%",
    "% Of Desks Enterprise": "58.30%",
    "% Accounts Enterprise": "11.80%"
  },
  {
    "Month (BoM)": "2020-02",
    "# of Offices": 308,
    "Capacity (Desks)": "4606",
    "Occupancy (Desks)": "4451",
    "Occ % (Desks)": "96.60%",
    "Occ % (Offices)": "79.50%",
    "Desk Churn %": "0.40%",
    "Account Churn %": "4.40%",
    "% Of Desks Enterprise": "59.60%",
    "% Accounts Enterprise": "11.10%"
  },
  {
    "Month (BoM)": "2020-01",
    "# of Offices": 308,
    "Capacity (Desks)": "4606",
    "Occupancy (Desks)": "4434",
    "Occ % (Desks)": "96.30%",
    "Occ % (Offices)": "79.50%",
    "Desk Churn %": "0.40%",
    "Account Churn %": "2.20%",
    "% Of Desks Enterprise": "59.80%",
    "% Accounts Enterprise": "11.20%"
  },
  {
    "Month (BoM)": "2019-12",
    "# of Offices": 308,
    "Capacity (Desks)": "4606",
    "Occupancy (Desks)": "4500",
    "Occ % (Desks)": "97.70%",
    "Occ % (Offices)": "80.50%",
    "Desk Churn %": "1.20%",
    "Account Churn %": "7.90%",
    "% Of Desks Enterprise": "59.00%",
    "% Accounts Enterprise": "10.70%"
  },
  {
    "Month (BoM)": "2019-11",
    "# of Offices": 308,
    "Capacity (Desks)": "4606",
    "Occupancy (Desks)": "4529",
    "Occ % (Desks)": "98.30%",
    "Occ % (Offices)": "83.80%",
    "Desk Churn %": "1.00%",
    "Account Churn %": "6.80%",
    "% Of Desks Enterprise": "58.60%",
    "% Accounts Enterprise": "10.30%"
  },
  {
    "Month (BoM)": "2019-10",
    "# of Offices": 308,
    "Capacity (Desks)": "4606",
    "Occupancy (Desks)": "4513",
    "Occ % (Desks)": "98.00%",
    "Occ % (Offices)": "79.50%",
    "Desk Churn %": "2.10%",
    "Account Churn %": "7.20%",
    "% Of Desks Enterprise": "59.10%",
    "% Accounts Enterprise": "11.50%"
  },
  // {
  //   "Month (BoM)": "2019-09",
  //   "# of Offices": 308,
  //   "Capacity (Desks)": "4606",
  //   "Occupancy (Desks)": "4549",
  //   "Occ % (Desks)": "98.80%",
  //   "Occ % (Offices)": "86.00%",
  //   "Desk Churn %": "1.70%",
  //   "Account Churn %": "8.20%",
  //   "% Of Desks Enterprise": "59.00%",
  //   "% Accounts Enterprise": "11.60%"
  // },
  // {
  //   "Month (BoM)": "2019-08",
  //   "# of Offices": 307,
  //   "Capacity (Desks)": "4601",
  //   "Occupancy (Desks)": "4524",
  //   "Occ % (Desks)": "98.30%",
  //   "Occ % (Offices)": "84.00%",
  //   "Desk Churn %": "0.80%",
  //   "Account Churn %": "2.80%",
  //   "% Of Desks Enterprise": "58.70%",
  //   "% Accounts Enterprise": "12.50%"
  // },
  // {
  //   "Month (BoM)": "2019-07",
  //   "# of Offices": 307,
  //   "Capacity (Desks)": "4601",
  //   "Occupancy (Desks)": "4529",
  //   "Occ % (Desks)": "98.40%",
  //   "Occ % (Offices)": "82.10%",
  //   "Desk Churn %": "1.70%",
  //   "Account Churn %": "6.90%",
  //   "% Of Desks Enterprise": "59.40%",
  //   "% Accounts Enterprise": "13.20%"
  // }
]

export default occupancy_stats;