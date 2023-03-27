import "./App.css"
import Header from './containers/Header';
import Footer from './containers/Footer';
import Body from './containers/Body';

function App() {
  return (
    <div id="Parent" style={{width:"100vw",height:"100vh",overflow:"scroll"}}>
      <Header/>
      <Body/>
      <Footer/>
    </div>
  );
}

export default App;
