import './App.css';
import ButtonAppBar from './components/Appbar';
import Products from './components/Products';
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <ButtonAppBar></ButtonAppBar>
      <Products></Products>
      <Footer />
    </div>
  );
}

export default App;
