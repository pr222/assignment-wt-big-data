import Head from 'next/head'
import { useState } from 'react'
import CoffeeDiagram from './../components/coffee_diagram'
import styles from '../styles/Home.module.css'

/**
 * Homepage view.
 * 
 * @param {*} props - deconstructed data-object
 * @returns 
 */
export default function Home({ data }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Taste Data</title>
        <meta name="description" content="Big data assignment with coffee data." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Coffee Tastes</h1>
        <CoffeeDiagram data={data} />
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