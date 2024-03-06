import React from 'react'
import styles from "./Home.module.css"
import MainSlider from '../MainSlider/MainSlider'
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider'
import { Helmet } from 'react-helmet'
import FeatureProducts from '../FeatureProducts/FeatureProducts'


export default function Home() {
  return (
    <div className={`${styles.Home}`}>
         <Helmet>
                <title>Home Page</title>
            </Helmet>
      <MainSlider />
      <CategoriesSlider />
      <FeatureProducts />
    </div>
  )
}
