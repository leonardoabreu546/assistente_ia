import Hero from "../components/Hero";
import AboutDetails from "../components/AboutDetails";

type AboutProps = {
  description?: string;
};

function About({ description }: AboutProps) {
  return (
    <div className="container mt-4">
      <Hero 
        title="Sobre o Projeto" 
        description={description} 
      />
      
      <AboutDetails />
    </div>
  );
}

export default About;