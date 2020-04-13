import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="">
      {/*  
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      */}
      
      <div className="jumbotron text-center">
        <h1>Cadê meu produto natureba?</h1>
        <p>A gente encontra pra você</p>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <h3>Procure por produto</h3>
            <div className="form-inline">
              <div className="input-group">
                <input type="text" size="30" placeholder="Ex: PASTA DE AMENDOÍM" className="form-control"
                  id="inputProduto" />
                <div className="input-group-btn">
                  <button id="btnPesquisarProduto" type="button" className="btn btn-default btnsearch">
                    Pesquisar
                        </button>
                </div>
              </div>
            </div>

          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <div id="resultList" className="list-group"></div>
          </div>
        </div>
        <div id="resultDetail" className="row">
          <div className="col-sm-6">
            <ul id="produtoDetail" className="list-group"></ul>
          </div>
        </div>

      </div>

      <footer className="text-center">
        <p>Não nos responsailizamos pelo estoque dos estabelecimentos</p>
        <p>Desenvolvido por Cesar&Tristão</p>
        <ul className="list-group">
          <li><a href="#contact"> Entre em contato <span className="glyphicon glyphicon-send"></span></a></li>
        </ul>
      </footer>
    </div>
  );
}

export default App;