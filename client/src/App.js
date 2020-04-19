import React from 'react';
//import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      endpointServer: "http://192.168.1.16:5000",
      inputproduto: '',
      showResults: false,
      showDetail: false,
      produto: '',
      arrayProdutos: [],
      arrayLojas: []
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
            arrayProdutos: result,
            showResults: true,
            showDetail: false
          });
          console.log(this.state.arrayProdutos);
        },
        (error) => {
          this.setState({
            showResults: true,
            showDetail: false
          });
          console.log(error);
        }
      )
  }
  pesquisaProdutoDetail = (event) => {

    console.log(event.target);

    fetch(this.state.endpointServer + "/produtoDetail?idProduto=" + event.target.id)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            showResults: false,
            showDetail: true,
            produto: result
          });
          let arrayIdLojas = [],
            concatLojas;

          for (var k = 0; k < this.state.produto.lojas.length; k++) {
            var objectLoja = this.state.produto.lojas[k];
            if (arrayIdLojas.includes(objectLoja.idLoja) === false) {
              arrayIdLojas.push(objectLoja.idLoja);
            }
          }

          for (var j = 0; j < arrayIdLojas.length; j++) {
            if (j === 0) {
              concatLojas = arrayIdLojas[j] + ',';
            } else if (j === arrayIdLojas.length - 1) {
              concatLojas = concatLojas + arrayIdLojas[j];
            } else {
              concatLojas = concatLojas + arrayIdLojas[j] + ',';
            }
          }

          fetch(this.state.endpointServer + "/lojas?idLoja=" + concatLojas)
            .then(res => res.json())
            .then(
              (result) => {
                console.log(result);
                this.setState({
                  arrayLojas: result
                });
              },
              (error) => {
                console.log(error);
              }
            )
        },
        (error) => {
          this.setState({
            showResults: true
          });
          console.log(error);
        }
      )
  }
  render() {
    return (
      <div className="">

        <div className="jumbotron text-center">
          <h1>Cadê meu produto natureba?</h1>
          <p>A gente encontra pra você</p>
          <div className="form-inline">
            <div className="input-group">
              <input id="inputProduto" className="form-control" size="40" type="text" value={this.state.inputproduto} onChange={this.handleChange} placeholder="Ex: PASTA DE AMENDOÍM" />
              <div className="input-group-btn">
                <button id="btnPesquisarProduto" onClick={this.procuraProduto} type="button" className="btn btn-default">
                  Pesquisar
                    </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid text-center">
          {
            this.state.showResults &&
            <div className="row text-center">
              <h2>Resultado da busca</h2>
              <div id="resultList" onClick={this.pesquisaProdutoDetail} className="list-group">
                {
                  this.state.arrayProdutos.map(function (d, idx) {
                    return (
                      <div className="col-sm-3 resultList">
                        <a className="list-group-item list-group-item-action btnProdutoDetail"
                          id={d.idProduto}
                          href="#"
                          key={idx}>
                          Nome: {d.nomeProduto}
                          <br></br>
                          Marca: {d.marcaProduto}
                        </a>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          }
        </div>

        <div className="container-fluid">

          <div id="resultDetail" className="row">
            {
              this.state.showDetail &&
              <div className="col-sm-6">

                <p>Nome: {this.state.produto.nomeProduto}</p>
                <p>Marca: {this.state.produto.marcaProduto}</p>
                <p>Gluten Free? {this.state.produto.glutenFree}</p>

                {this.state.arrayLojas.map(function (d, idx) {
                  return (
                    <ul id="produtoDetail" className="list-group">
                      <li id={d.idLoja} className="list-group-item btnProdutoDetail" key={idx}>
                        <p>{d.nomeLoja}</p>
                        <p><span>Facebook:</span> <a href={d.enderecosVirtuais.facebook} target="_blank"> {d.enderecosVirtuais.facebook} </a></p>
                        <p><span>Instagram:</span> <a href={d.enderecosVirtuais.instagram} target="_blank"> {d.enderecosVirtuais.instagram} </a></p>
                        <p><span>WebSite:</span> <a href={d.enderecosVirtuais.website} target="_blank"> {d.enderecosVirtuais.website} </a></p>

                        {d.endereco.map(function (d, idx) {
                          return (
                            <ul>
                              <li className="list-group-item btnProdutoDetail" key={idx}>
                                <p><span>Endereço {idx + 1}:</span>  {d.local}</p>
                                <p><span>Telefone:</span>  {d.telefone}</p>
                              </li>
                            </ul>
                          )
                        })
                        }
                      </li>
                    </ul>
                  )
                })
                }
              </div>
            }
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