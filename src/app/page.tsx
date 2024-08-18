"use client";
import React from "react";
import Form from "./components/Form";
import Movies from "./components/Movies";
import styles from "./page.module.css";
export default function Home() {
  return (
    <main className={styles.main}>
      {/* <Form onSubmit={handleSubmit} /> */}
      <Movies />
    </main>
  );
}
