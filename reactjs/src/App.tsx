import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Header from "./components/header";
import Content from './components/content';
import Container from 'react-bootstrap/Container';
import Footer from './components/footer';


function App() {
  return (
    <>
      <Header />
      <Container>
        <Content />
      </Container>
      <Footer />
    </>
  );
}

export default App;
