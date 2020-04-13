import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      endpointServer: "http://localhost:5000",
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
          console.log(this.state.arrayProdutos);
        },
        (error) => {
          this.setState({
            isLoaded: true
          });
          console.log(error);
        }
      )
  }
  pesquisaProdutoDetail = (event) => {

    fetch(this.state.endpointServer + "/produtoDetail?idProduto=" + event.target.id)
      .then(res => res.json())
      .then(
        (result) => {
          let produto = result,
            arrayIdLojas = [],
            concatLojas;

          for (var k = 0; k < produto.lojas.length; k++) {
            var objectLoja = produto.lojas[k];
            if (arrayIdLojas.includes(objectLoja.idLoja) === false) {
              arrayIdLojas.push(objectLoja.idLoja);
            }
          }

          for (var j = 0; j < arrayIdLojas.length; j++) {
            if (j === 0) {
              concatLojas = arrayIdLojas[j] + ',';
            }
            else if (j === arrayIdLojas.length - 1) {
              concatLojas = concatLojas + arrayIdLojas[j];
            }
            else {
              concatLojas = concatLojas + arrayIdLojas[j] + ',';
            }
          }

          fetch(this.state.endpointServer + "/lojas?idLoja=" + concatLojas)
            .then(res => res.json())
            .then(
              (result) => {
                console.log(result);
              },
              (error) => {
                this.setState({
                  isLoaded: true
                });
                console.log(error);
              }
            )

        },
        (error) => {
          this.setState({
            isLoaded: true
          });
          console.log(error);
        }
      )
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
              <div id="resultList" onClick={this.pesquisaProdutoDetail} className="list-group">
                <div>
                  {this.state.arrayProdutos.map(function (d, idx) {
                    return (<a className="list-group-item list-group-item-action btnProdutoDetail"
                      id={d.idProduto}
                      href="#"
                      key={idx}>
                      {d.nomeProduto}
                    </a>)
                  })}
                </div>
              </div>
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