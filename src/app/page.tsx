"use client";
import React from "react";
import Form from "./components/Form";
import Movies from "./components/Movies";
import styles from "./page.module.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Home() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <main className={styles.main}>
        <Movies />
      </main>
    </QueryClientProvider>
  );
}
