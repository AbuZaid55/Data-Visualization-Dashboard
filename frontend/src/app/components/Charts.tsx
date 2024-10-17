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

interface Data {
  day:string,
  age:string,
  gender:string,
  a:string,
  b:string,
  c:string,
  d:string,
  e:string,
  f:string,
}

const Charts = ({ barChartData, filteredData }: { barChartData: {feature:string,total:number}[]; filteredData: Data[] }) => {
  const [selectedFeature, setSelectedFeature] = useState<keyof Data>('a');
  const [lineChartData,setLineChartData]=useState<{day:string,[key:string]:string}[]>([])
  const [showLineChart,setShowLineChart]=useState<boolean>(false)

  const handleBarClick = (feature: keyof Data | undefined) => {
    if(feature===undefined) return;
    setSelectedFeature(feature);
    setShowLineChart(true)
  };
  useEffect(()=>{
    if(!showLineChart) return;
    const date:string[] = []
    filteredData.map((item:Data)=>{
      if(!date.includes(item.day)){
        date.push(item.day)
      }
    })
    const _lineChartData = date.map((day:string)=>{
      return {
        day:day,
        [selectedFeature]:filteredData.reduce((acc:number,curr:Data)=>curr.day===day?acc+Number(curr[selectedFeature]):acc+0,0)
      }
    })
    setLineChartData(_lineChartData as {day:string,[key:string]:string}[])
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
          onClick={(data) => handleBarClick(data.activeLabel as keyof Data)}
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
      {lineChartData.length!==0 && (
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
