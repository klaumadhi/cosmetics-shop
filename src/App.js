import "./App.css";
import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";
import { AllRoutes } from "./routes/AllRoutes";

function App() {
  return (
    <>
      <Header />
      <div className="flex flex-col min-h-screen pt-16">
        <AllRoutes />
      </div>
      <Footer />
    </>
  );
}

export default App;
