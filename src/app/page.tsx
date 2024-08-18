'use client';
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
