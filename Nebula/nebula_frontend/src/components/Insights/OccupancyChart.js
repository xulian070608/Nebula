import React from "react";
import {
  Area,
  Line,
  XAxis,
  YAxis,
  ReferenceLine,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from "recharts";
import Modal from "@material-ui/core/Modal";
import ExampleModal from "./ExampleModal";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const data = [
  { name: "19-10", uv: 4000, occ: 45, churn: 1.3, unit: "%" },
  { name: "19-11", uv: 3000, occ: 42, churn: 1.1, unit: "%" },
  { name: "19-12", uv: 2000, occ: 67, churn: 2, unit: "%" },
  { name: "20-01", uv: 2780, occ: 82, churn: 0.7, unit: "%" },
  { name: "20-02", uv: 1890, occ: 83, churn: 1.5, unit: "%" },
  { name: "20-03", uv: 2390, occ: 72, churn: 2.3, unit: "%" },
  { name: "20-04", uv: 3490, occ: 78, churn: 0.3, unit: "%" },
];

function CustomTooltip(props) {
  const { active } = props;

  if (active) {
    const { payload } = props;
    return (
      <div className="custom-tooltip">
        <p className="tooltip-occ">{`${payload[0].name} : ${payload[0].value}%`}</p>
        <p className="tooltip-churn">{`${payload[1].name} : ${payload[1].value}%`}</p>
      </div>
    );
  }

  return null;
}

export default function OccupancyChart() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <ResponsiveContainer height={250}>
        <ComposedChart
          data={data}
          margin={{ top: 20, right: 50, left: 20, bottom: 5 }}
          onClick={() => setOpen(true)}
        >
          <defs>
            <linearGradient id="occ" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis label={{ value: "%", position: "insideLeft" }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <ReferenceLine x="20-02" stroke="red" label="Max OCC Rate" />
          <ReferenceLine y={100} label="Fully Occupied" stroke="red" />
          <Area
            type="monotone"
            dataKey="occ"
            stroke="#8884d8"
            fill="url(#occ)"
          />
          <Line type="monotone" dataKey="churn" stroke="#82ca9d" />
        </ComposedChart>
      </ResponsiveContainer>
      <Modal
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
      >
        <ExampleModal />
      </Modal>
    </>
  );
}
