'use client';
import Image from "next/image";
import styles from "./page.module.css";
import React from 'react';
import Form from "./components/Form";

export default function Home() {

  const handleSubmit = () => {
    console.log("Hi");
  };

  return (
    <main>
      <Form onSubmit={handleSubmit} />
    </main>
  );
}
