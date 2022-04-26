import Head from 'next/head'
import dynamic from 'next/dynamic';
import { useState } from 'react'
import styles from '../styles/Home.module.css'

// Dynamic import for chart module to fix window-undefined, according to:
// https://github.com/apexcharts/vue-apexcharts/issues/307
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });


/**
 * Homepage view.
 * 
 * @param {*} props - deconstructed data-object
 * @returns 
 */
export default function Home({ data }) {
  console.log(data) // TODO: Remove!
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

  console.log(countries)
  console.log(body_avg)
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

  const [selection, setSelection] = useState({
    series : [{
      name: 'cupper_points',
      data: cupperPoints_avg
    }
  ]})

  const showBody = () => {
    setSelection({
      series : [{
        name: 'body_avg', 
        data: body_avg
      }
    ]})
  }

  const showAcidity = () => {
    setSelection({
      series : [{
        name: 'acidity_avg', 
        data: acidity_avg
      }
    ]})
  }

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
      <Head>
        <title>Coffee Taste Data</title>
        <meta name="description" content="Big data assignment with coffee data." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Coffee Tastes</h1>

        <div className={styles.grid}>

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
      </main>

      <footer className={styles.footer}>
        <a
            href="https://www.kaggle.com/datasets/volpatto/coffee-quality-database-from-cqi"
            target="_blank"
            rel="noopener noreferrer"
        >
          <p className={styles.card}>
            Data gathered from:
            Coffee Quality Database from CQI
          </p>
        </a>
        <a
            href="https://opendatacommons.org/licenses/dbcl/1-0/"
            target="_blank"
            rel="noopener noreferrer"
        >
          <p className={styles.card}>
            Database License: (DbCL) v1.0
          </p>
        </a>
      </footer>
    </div>
  )
}

export async function getServerSideProps(context) {
  const res = await fetch(`${process.env.BASE_URL}/api/coffee`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}