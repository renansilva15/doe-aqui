'use client'

import Chart from 'react-google-charts'

interface PieChartProps {
  goal: number
  raised: number
}

export const PieChart = ({ goal, raised }: PieChartProps) => {
  function percent() {
    return ((raised / goal) * 100).toFixed(0)
  }

  return (
    <div className="flex flex-1 relative items-center justify-center">
      <Chart
        chartType="PieChart"
        width="100%"
        height="100%"
        data={[
          ['Meta', 'Arrecadado'],
          ['', raised],
          ['', goal - raised],
        ]}
        options={{
          pieHole: 0.8,
          is3D: false,
          backgroundColor: 'transparent',
          colors: ['#23b4e7', 'red'],
          legend: 'none',
        }}
      />

      <h2 className="text-2xl text-primary-500 absolute text-center ">
        {percent()}%
      </h2>
    </div>
  )
}
