function Home({ description }) {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <h1>Assistente IA</h1>
          {description && <p>{description}</p>}
          <div className="mt-4">
            <a href="/chat" className="btn btn-primary btn-lg">Começar a Conversar</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;