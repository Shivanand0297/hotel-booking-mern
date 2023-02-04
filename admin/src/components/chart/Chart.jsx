import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./chart.scss";

const data = [
  { name: "January",
    Total: 1200
  },
  { name: "February",
    Total: 2000
  },
  { name: "March",
    Total: 1500
  },
  { name: "April",
    Total: 3000
  },
  { name: "May",
    Total: 1400
  },
  { name: "June",
    Total: 3500
  },
];

const Chart = ({title, aspect}) => {
  return (
    <div className="chart">
      <h1 className="title">{title}</h1>
      <ResponsiveContainer width="100%" aspect={aspect} >
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#76b900" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#f3f9e8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="#a0a0a0" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" /> {/* will change in the dark mode */}
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#76b900"
            fillOpacity={1}
            fill="url(#total)"
            />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
