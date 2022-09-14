import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Janvier",
    uv: 4000,
   
  },
  {
    name: "Fevrier",
    uv: 3000,
  
  },
  {
    name: "Mars",
    uv: 2000,
   
  },
  {
    name: "Avril",
    uv: 2780,
   
  },
  {
    name: "Mai",
    uv: 1890,
   
  },
  {
    name: "Juin",
    uv: 2390,
   
  
  },
  {
    name: "Page G",
    uv: 3490,
   
  },
];

const Chart = () => {
  return (
    <div className="chart">
      <div className="title"> dernier 6 mois</div>

      <AreaChart
        width={730}
        height={250}
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name"  stroke="gray"/>
      
        <CartesianGrid strokeDasharray="3 3"  className="chartGrid"/>
        <Tooltip />
        <Area
          type="monotone"
          dataKey="uv"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
        <Area
          type="monotone"
          dataKey="pv"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#colorPv)"
        />
        
      </AreaChart>
     
    </div>
  );
};
export default Chart;
















