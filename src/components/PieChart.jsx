import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6F61', '#6B5B95', '#88B04B'];

function PieChartComponent({ data, onLegendClick }) {
  return (
    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
      <PieChart width={1000} height={500}> {/* Increased width and height */}
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={180} 
          fill="#8884d8"
          dataKey="value"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill || COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }} 
          cursor={{ fill: 'transparent' }} 
          formatter={(value, name) => [`${name}: ${value}`, 'Count']} // Custom formatter for clearer counts
        />
        <Legend
          onClick={onLegendClick}
          formatter={(value, entry) => (
            <span style={{
              textDecoration: entry.payload.fill === '#E0E0E0' ? 'line-through' : 'none',
              color: entry.payload.fill === '#E0E0E0' ? 'gray' : 'black',
              fontSize: '16px', // Increased font size for legend
            }}>
              {value}
            </span>
          )}
        />
      </PieChart>
    </div>
  );
}

export default PieChartComponent;
