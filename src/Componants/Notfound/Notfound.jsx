import React from 'react'
import styles from "./Notfound.module.css"
import notfoundimg from '../../Assets/images/error.svg'

export default function Notfound() {
  return (
    <section className={`${styles.Notfound} container my-5`}>
      <img src={notfoundimg} className='w-100' alt='' />
    </section>
  )
}
