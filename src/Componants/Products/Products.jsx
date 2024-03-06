import React from 'react'
import styles from "./Products.module.css"
import FeatureProducts from '../FeatureProducts/FeatureProducts'
import { Helmet } from 'react-helmet'

export default function Products() {
  return (
    <div className={`${styles.Products}`}>
          <Helmet>
                <title>products Page</title>
            </Helmet>
      <FeatureProducts />
    </div>
  )
}
