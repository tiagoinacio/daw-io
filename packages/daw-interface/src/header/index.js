import React from "react";
import MainNavigation from "../main-navigation";
import TransportBar from "../transport-bar";
import styles from "./styles.css";

export default () => (
  <header>
    <MainNavigation />
    <TransportBar className={styles.transportBar} isPlaying={false} />
  </header>
);
