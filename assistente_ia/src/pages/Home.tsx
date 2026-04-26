import React from "react";

interface HomeProps {
  description?: string;
}

function Home ({ description }: HomeProps) {
  return (
    <div>
      <h1>Home</h1>
      {description && <p>{description}</p>}
    </div>
  );
}

export default Home;