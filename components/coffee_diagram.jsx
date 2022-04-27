import dynamic from 'next/dynamic';
import { useState } from 'react'
import styles from '../styles/Home.module.css'

// Dynamic import for chart module to fix window-undefined, according to:
// https://github.com/apexcharts/vue-apexcharts/issues/307
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });


/**
 * Coffee diagram component.
 * 
 * @param {*} props - all coffee data to display.
 * @returns 
 */
export default function CoffeeDiagram({ data }) {
  const countries = []
  const body_avg = []
  const acidity_avg = []
  const aftertaste_avg = []
  const cupperPoints_avg = []

  data.data.forEach(element => {
    countries.push(element.key)
    body_avg.push(element.body_avg.value.toFixed(2))
    acidity_avg.push(element.acidity_avg.value.toFixed(2))
    aftertaste_avg.push(element.aftertaste_avg.value.toFixed(2))
    cupperPoints_avg.push(element.cupperPoints_avg.value.toFixed(2))
  });

  // Set base options with countries for diagram.
  const [options, setOptions] = useState({
    chart: {
      id: 'coffee-taste',
      type: 'bar'
    },
    plotOptions: {
      bar: {
        horizontal: true
      }
    },
    xaxis: {
      categories: countries
    }
  })

  // Set first diagram to cupper points to be displayed.
  const [selection, setSelection] = useState({
    series : [{
      name: 'cupper_points',
      data: cupperPoints_avg
    }
  ]})

  // Change diagram to show body data.
  const showCupperPoints = () => {
    setSelection({
      series : [{
        name: 'cupper_points',
        data: cupperPoints_avg
      }
    ]})
  }

  // Change diagram to show body data.
  const showBody = () => {
    setSelection({
      series : [{
        name: 'body_avg', 
        data: body_avg
      }
    ]})
  }

  // Change diagram to show acidity data.
  const showAcidity = () => {
    setSelection({
      series : [{
        name: 'acidity_avg', 
        data: acidity_avg
      }
    ]})
  }

  // Change diagram to show aftertaste data.
  const showAftertaste = () => {
    setSelection({
      series : [{
        name: 'aftertaste_avg', 
        data: aftertaste_avg
      }
    ]})
  }

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <button className={styles.card} onClick={showCupperPoints}>Cupper Points</button>
        <button className={styles.card} onClick={showBody}>Body</button>
        <button className={styles.card} onClick={showAcidity}>Acidity</button>
        <button className={styles.card} onClick={showAftertaste}>Aftertaste</button>

        <ApexCharts
          options={options}
          series={selection.series}
          type="bar"
          width={800}
          height={620}
        />
      </div>
    </div>
  )
}