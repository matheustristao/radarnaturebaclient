import React from 'react';
import Routes from './routes';
import Footer from './components/footer';
import './App.css';

class App extends React.Component {
  
  render() {
    return (
      <div>
        <Routes />
        <Footer />
      </div>
    );
  }
}

export default App;