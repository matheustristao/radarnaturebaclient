import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      endpointServer : "http://localhost:5000",
      inputproduto: '',
      isLoaded: false,
      arrayProdutos: []
    };


    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ inputproduto: event.target.value });
  }
  procuraProduto = (event) => {
    fetch(this.state.endpointServer + "/produtos?nomeProduto=" + this.state.inputproduto)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            arrayProdutos: result
          });
          console.log(result);
        },
        (error) => {
          this.setState({
            isLoaded: true
          });
          console.log(error);
        }
      )
    /*
      jQuery.ajax({
          url: endpointServer + "/produtos?nomeProduto=" + this.state.inputproduto,
          method: "GET",
          dataType: "json",
          success: function (response) {
              arrayProdutos = response;
              console.log(response);
          },
          error: function (textStatus, errorThrown) {
              console.log(errorThrown);
          },
          complete: function () {
              atualizarListaProdutos();
          }
      });
      */

  }
  render() {
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
                  <input id="inputProduto" className="form-control" type="text" value={this.state.inputproduto} onChange={this.handleChange} size="30" placeholder="Ex: PASTA DE AMENDOÍM" />
                  <div className="input-group-btn">
                    <button id="btnPesquisarProduto" onClick={this.procuraProduto} type="button" className="btn btn-default btnsearch">
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
}

export default App;