import Hero from "../components/layout/Hero";
import AboutDetails from "../components/ui/AboutDetails";

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