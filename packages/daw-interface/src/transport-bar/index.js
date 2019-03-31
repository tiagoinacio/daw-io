import React from "react";
import { Icon } from "@daw/ui";
import styles from "./styles.css";

export default props => (
  <div className={styles.bar}>
    <ul className={styles.group}>
      <li className={styles.item}>
        <Icon id="fast-backwards" className={styles.svg} />
      </li>
      <li className={styles.item}>
        <Icon id="backwards" className={styles.svg} />
      </li>
      <li className={styles.item}>
        <Icon id="forward" className={styles.svg} />
      </li>
      <li className={styles.item}>
        <Icon id="fast-forward" className={styles.svg} />
      </li>
    </ul>
    <ul className={styles.group}>
      <li className={styles.item}>
        <Icon id="stop" className={styles.svg} />
      </li>
      <li className={styles.item}>
        <Icon id={props.isPlaying ? "pause" : "play"} className={styles.svg} />
      </li>
    </ul>
  </div>
);
