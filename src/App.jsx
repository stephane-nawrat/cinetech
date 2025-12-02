import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-4xl font-bold text-center">
          Cinétech
        </h1>
        <p className="text-center mt-4">
          Contenu principal ici (sera remplacé par les pages)
        </p>
      </main>

      <Footer />
    </div>
  )
}

export default App