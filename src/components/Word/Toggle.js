import React from 'react'
import { FaChevronCircleDown, FaChevronCircleUp } from "react-icons/fa"

import styles from "./styles.module.css"

export default function Toggle({ compact, onClick }) {
  return (
      <div
          className={styles.toggle}
          onClick={() => onClick(!compact)}
          title={`切换到${compact ? '更多' : '当前'}释义`}
      >
        {compact ? <FaChevronCircleDown /> : <FaChevronCircleUp />}
      </div>
  )
}
