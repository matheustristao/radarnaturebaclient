import React from 'react';
import Main from './pages/Main';
import Footer from './components/footer';
//import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  
  render() {
    return (
      <div>
        <Main />
        <Footer />
      </div>
    );
  }
}

export default App;