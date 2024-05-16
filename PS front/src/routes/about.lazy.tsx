import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/about')({
  component: About,
});

function About() {
  return (
    <div className="bg-background text-white">
      <header className="bg-gray-800 text-white py-4">
        <h1 className="text-3xl text-center font-bold">About Us</h1>
      </header>

      {/* Contéudo Principal */}
      <main className="container mx-auto px-4 py-8">
        {/* Membros do Grupo */}
        <section
          id="equipa"
          className="mb-8 rounded-lg bg-white bg-opacity-10 p-6"
        >
          <h2 className="text-4xl font-bold mb-4">Constituição do Grupo:</h2>
          <ul className="list-none text-xl">
            <li>
              <strong>João Carneiro</strong> - Nº50938
            </li>
            <li>
              <strong>João Pinto</strong> - Nº49889
            </li>
            <li>
              <strong>Leonor Moreira</strong> - Nº50877
            </li>
            <li>
              <strong>Tiago Fonseca</strong> - Nº49760
            </li>
            <li>
              <strong>Matilde Almeida</strong> - Nº46194
            </li>
          </ul>
        </section>

        {/* Descrição do Projeto */}
        <section className="rounded-lg bg-white bg-opacity-10 p-6">
          <h2 className="text-4xl font-bold mb-4">
            Projeto de Gestão de Montagem de Drones
          </h2>
          <p className="text-xl">
            O objetivo deste trabalho é desenvolver uma aplicação web para gerir o processo de montagem de drones, permitindo que os utilizadores se registem, autentiquem e realizem operações CRUD (criação, visualização, atualização e eliminação) de informações relacionadas com a montagem de drones. A aplicação deverá implementar autenticação de utilizadores com JWT, gerir peças necessárias para a montagem e associações dessas peças às montagens, além de fornecer estatísticas detalhadas sobre o processo. Os endpoints da API serão desenvolvidos conforme as melhores práticas RESTful e documentados em OpenAPI, utilizando Node.js, Express.js, MongoDB e Mongoose.
          </p>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-4 fixed bottom-0 w-full">
        <p className="text-center text-xl font-bold">
          &copy; 2024 Projeto Programação no Servidor
        </p>
      </footer>
    </div>
  );
}
