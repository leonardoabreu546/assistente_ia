import React from "react";

interface AboutProps {
  description?: string;
}

function About({ description }: AboutProps) {
  return (
    <div>
      <h1>About</h1>
      {description && <p>{description}</p>}
    </div>
  );
}

export default About;