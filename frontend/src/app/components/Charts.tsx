import React, { useEffect, useState } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";

const Charts = ({ barChartData, filteredData }: { barChartData: any; filteredData: any }) => {
  const [selectedFeature, setSelectedFeature] = useState('');
  const [lineChartData,setLineChartData]=useState([])

  const handleBarClick = (feature: any) => {
    setSelectedFeature(feature);
  };
  useEffect(()=>{
    const date:string[] = []
    filteredData.map((item:any)=>{
      if(!date.includes(item.day)){
        date.push(item.day)
      }
    })
    const _lineChartData = date.map((day)=>{
      return {
        day:day,
        [selectedFeature]:filteredData.reduce((acc:number,curr:any)=>curr.day===day?acc+Number(curr[selectedFeature]):acc+0,0)
      }
    })
    setLineChartData(_lineChartData as any)
  },[filteredData,barChartData,selectedFeature])

  return (
    <div>
      {/* Bar Chart */}
      <h2 className="text-center text-2xl font-semibold text-[#344563]">Total Time Spent on Features</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          layout="vertical"
          data={barChartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          onClick={(data) => handleBarClick(data.activeLabel)}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" /> 
          <YAxis dataKey="feature" type="category" /> 
            <Tooltip />
          <Legend />
          <Bar className=" cursor-pointer" dataKey="total" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

      {/* Line Chart */}
      {selectedFeature && (
        <div>
          <h2 className="text-center text-2xl font-semibold text-[#344563] mt-10">Time Trend for {selectedFeature.toUpperCase()}</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={lineChartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis dataKey={selectedFeature}/>
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey={selectedFeature}
                stroke="#82ca9d"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default Charts;
