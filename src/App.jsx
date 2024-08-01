import Footer from "./components/Footer";
import Manager from "./components/Manager";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <div className="min-h-[90vh]">
      <Manager />
      </div>
      <Footer />
    </>
  );
}

export default App;
