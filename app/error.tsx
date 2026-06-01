"use client";

interface ErrorPageProps {
  error: Error;
}

export default function ErrorPage({ error }: ErrorPageProps) {
  return <div style={{ color: "red" }}>ErrorPage {error.message}</div>;
}
