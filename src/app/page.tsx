'use client';
import React from 'react';
import Form from "./components/Form";
import Movies from "./components/Movies"

export default function Home() {

  const handleSubmit = () => {
    console.log("Hi");
  };

  return (
    <main>
      {/* <Form onSubmit={handleSubmit} /> */}
      <Movies/>
    </main>
  );
}
