function About({ description }) {
  return (
    <div>
      <h1>About</h1>
      {description && <p>{description}</p>}
    </div>
  );
}

export default About;