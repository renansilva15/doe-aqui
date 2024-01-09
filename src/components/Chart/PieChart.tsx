'use client'

import { use, useEffect, useState } from 'react'
import Chart from 'react-google-charts'
import { set } from 'zod'

interface PieChartProps {
  goal: number
  raised: number
}

export const PieChart = ({ goal, raised }: PieChartProps) => {
  const [dataRaised, setDataRaised] = useState(raised)
  const [dataGoal, setDataGoal] = useState(goal - raised)

  useEffect(() => {
    if (goal <= 0 || percent() === 100) {
      setDataRaised(100)
      setDataGoal(0)
    }
  }, [])

  function percent() {
    if (goal === 0) return 100
    if (raised === goal) return 100

    const result = ((raised / goal) * 100).toFixed(0)

    if (parseInt(result) >= 100) {
      return 100
    } else {
      return parseInt(result)
    }
  }

  return (
    <div className="flex flex-1 relative items-center justify-center">
      <Chart
        chartType="PieChart"
        width="100%"
        height="100%"
        data={[
          ['Meta', 'Arrecadado'],
          ['', dataRaised],
          ['', dataGoal],
        ]}
        options={{
          pieHole: 0.8,
          is3D: false,
          backgroundColor: 'transparent',
          colors: ['#23b4e7', 'red'],
          legend: 'none',
        }}
      />

      <h2 className="text-xl text-primary-500 absolute text-center mt-1 ml-1">
        {percent()}%
      </h2>
    </div>
  )
}
