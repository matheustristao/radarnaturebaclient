import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
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
      
      <div class="jumbotron text-center">
        <h1>Cadê meu produto natureba?</h1>
        <p>A gente encontra pra você</p>
      </div>

      <div class="container">
        <div class="row">
          <div class="col-sm-6">
            <h3>Procure por produto</h3>
            <div class="form-inline">
              <div class="input-group">
                <input type="text" size="30" placeholder="Ex: PASTA DE AMENDOÍM" class="form-control"
                  id="inputProduto" />
                <div class="input-group-btn">
                  <button id="btnPesquisarProduto" type="button" class="btn btn-default btnsearch">
                    Pesquisar
                        </button>
                </div>
              </div>
            </div>

          </div>
        </div>
        <div class="row">
          <div class="col-sm-6">
            <div id="resultList" class="list-group"></div>
          </div>
        </div>
        <div id="resultDetail" class="row">
          <div class="col-sm-6">
            <ul id="produtoDetail" class="list-group"></ul>
          </div>
        </div>

      </div>

      <footer class="text-center">
        <p>Não nos responsailizamos pelo estoque dos estabelecimentos</p>
        <p>Desenvolvido por Cesar&Tristão</p>
        <ul class="list-group">
          <li><a href="#contact"> Entre em contato <span class="glyphicon glyphicon-send"></span></a></li>
        </ul>
      </footer>
    </div>
  );
}

export default App;