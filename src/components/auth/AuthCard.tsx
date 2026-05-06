interface AuthCardProps {
  title: string;
  children: React.ReactNode;
}

export default function AuthCard({ title, children }: AuthCardProps) {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <div className="shadow-sm p-4 p-md-5 bg-white rounded">
            <h2 className="mb-4 fw-bold">{title}</h2>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}