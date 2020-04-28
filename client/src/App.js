import React from 'react';
//import logo from './logo.svg';
import './App.css';
import config from './config/default.json';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      endpointServer: config.api.server + ":" + config.api.port,
      inputproduto: '',
      selectedProduto: '',
      regio: '',
      showResults: false,
      showDetail: false,
      showAlert: false,
      showInputRegio: false,
      mensagemErro: '',
      produto: '',
      arrayProdutos: [],
      arrayLojas: []
    };

    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ inputproduto: event.target.value });
  }
  handleChangeRegio = (event) => {
    this.setState({ regio: event.target.value });
  }
  deParaGluten(param) {
    switch (param) {
      case 'N':
        return 'Não';
      case 'S':
        return 'Sim';
      default:
        return 'Não informado';
    }
  }
  dePara(param) {
    switch (param) {
      case undefined:
        return 'Não informado';
      case '':
        return 'Não informado';
      default:
        return param;
    }
  }
  loadImage = (idProduto) => {
    let imagem;
    try {
      imagem = require('./images/produtos/' + idProduto + '.png');
    } catch (e) {
      imagem = require('./images/produtos/no-image.png');
    }
    return imagem;
  }
  procuraProduto = () => {

    if (this.state.inputproduto.trim() === '') {
      this.setState({
        showAlert: true,
        showResults: false,
        showDetail: false,
        mensagemErro: 'Nome do produto não pode ser vazio'
      });
    }
    else {
      fetch(this.state.endpointServer + "/produtos?nomeProduto=" + this.state.inputproduto)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              arrayProdutos: result,
              showResults: true,
              showDetail: false,
              showAlert: false,
              showInputRegio: false
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
  }
  perguntaRegio = (event) => {
    this.setState({
      selectedProduto: event.target.id,
      showResults: false,
      showAlert: false,
      showDetail: false,
      showInputRegio: true
    });

  }
  pesquisaProdutoDetail = () => {
    if (this.state.regio === '') {
      this.setState({
        showAlert: true,
        showResults: false,
        showDetail: false,
        mensagemErro: 'Você deve escolher um estado antes!'
      });
    } else {
      fetch(this.state.endpointServer + "/produtoDetail?idProduto=" + this.state.selectedProduto)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              produto: result
            });
            let arrayIdLojas = [],
              concatLojas;

            for (let k = 0; k < this.state.produto.lojas.length; k++) {
              let objectLoja = this.state.produto.lojas[k];
              if (arrayIdLojas.includes(objectLoja.idLoja) === false) {
                arrayIdLojas.push(objectLoja.idLoja);
              }
            }

            for (let j = 0; j < arrayIdLojas.length; j++) {
              if (j === 0) {
                concatLojas = arrayIdLojas[j] + ',';
              } else if (j === arrayIdLojas.length - 1) {
                concatLojas = concatLojas + arrayIdLojas[j];
              } else {
                concatLojas = concatLojas + arrayIdLojas[j] + ',';
              }
            }

            fetch(this.state.endpointServer + "/lojas?idLoja=" + concatLojas + "&regio=" + this.state.regio)
              .then(res => res.json())
              .then(
                (result) => {
                  console.log(result);
                  if (result.length === 0) {
                    this.setState({
                      showAlert: true,
                      mensagemErro: "Nenhuma loja encontrada no seu estado possui esse produto"
                    });
                  } else {
                    this.setState({
                      arrayLojas: result,
                      showResults: false,
                      showAlert: false,
                      showDetail: true,
                      showInputRegio: false

                    });
                  }
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
  }
  render() {
    return (
      <div className="">
        <header className="jumbotron text-center">
          <h1 className="display-4">Cadê meu produto natureba?</h1>
          <h5 className="my-4">A gente encontra pra você</h5>
          <div className="form-inline justify-content-center">
            <form className="form-inline">
              <div className="form-group">
                <input id="inputProduto" className="form-control mr-sm-2" size="40" type="text" value={this.state.inputproduto} onChange={this.handleChange} placeholder="Ex: PASTA DE AMENDOÍM" />
              </div>
              <button id="btnPesquisarProduto" onClick={this.procuraProduto} type="button" className="btn btn-success mr-sm-2">
                Pesquisar
              </button>
            </form>
          </div>
        </header>

        {
          this.state.showResults &&
          <div id="showResultsDiv" className="container-fluid text-center">
            <div className="row justify-content-center">
              <h2>Resultado da busca</h2>
            </div>
            <div id="resultList" className="row justify-content-center">
              <div className="card-deck">
                {
                  this.state.arrayProdutos.map((d, idx) => {
                    return (
                      <div key={idx} className="card">
                        <img className="card-img-top" src={this.loadImage(d.idProduto)} alt={d.nomeProduto}></img>
                        <div className="card-body">
                          <h5 className="card-title">{d.nomeProduto}</h5>
                          <h6 className="card-subtitle mb-2 text-muted">{this.dePara(d.marcaProduto)}</h6>
                          <p className="card-text">Lorem Ipsum</p>
                          <button id={d.idProduto} type="button" onClick={this.perguntaRegio} className="btn btn-success card-link">Encontrar lojas</button>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        }

        {
          this.state.showInputRegio &&
          <div id="showInputRegio">
            <div className="container mb-2">
              <div className="row justify-content-center">
                <h4>Em qual estado você mora?</h4>
              </div>
              <div className="row justify-content-center">
                <div className="col-sm-4 input-group">
                  <select className="form-control" value={this.state.regio} onChange={this.handleChangeRegio}>
                    <option value=''>Estado</option>
                    <option value="SP">São Paulo</option>
                    <option value="DF">Distrito Federal</option>
                  </select>
                  <button type="button" onClick={this.pesquisaProdutoDetail} className="btn btn-success">Encontrar!</button>
                </div>
              </div>
            </div>
            <div className="row justify-content-center ">
              <img src={this.loadImage(this.state.selectedProduto)} alt={this.nomeProduto}></img>
            </div>
          </div>

        }

        {
          this.state.showAlert &&
          <div className="container">
            <div className="row justify-content-center">
              <div className="alert alert-danger">
                <strong>{this.state.mensagemErro}</strong>
              </div>
            </div>
          </div>
        }

        {
          this.state.showDetail &&
          <div id="showDetail">

            <div id="showDetailHeaderDiv" className="container mb-4">
              <div id="resultDetailTitle" className="row justify-content-center">
                <h3>Descrição do produto</h3>
              </div>
              <div id="resultDetailHeader" className="row justify-content-center">
                <div className="col-sm-3">
                  <img className="img-thumbnail" src={this.loadImage(this.state.selectedProduto)} alt={this.nomeProduto}></img>
                </div>
                <div className="col-sm-3">
                  <dl>
                    <dt>Nome:</dt>
                    <dd>{this.state.produto.nomeProduto}</dd>
                    <dt>Marca:</dt>
                    <dd>{this.dePara(this.state.produto.marcaProduto)}</dd>
                    <dt>Gluten Free?</dt>
                    <dd>{this.deParaGluten(this.state.produto.glutenFree)}</dd>
                  </dl>
                </div>
                <div className="col-sm-3">
                  <dl>
                    <dt>Nome:</dt>
                    <dd>{this.state.produto.nomeProduto}</dd>
                    <dt>Marca:</dt>
                    <dd>{this.dePara(this.state.produto.marcaProduto)}</dd>
                    <dt>Gluten Free?</dt>
                    <dd>{this.deParaGluten(this.state.produto.glutenFree)}</dd>
                  </dl>
                </div>
              </div>
            </div>
            <div id="showDetailDiv" className="container">
              <div id="resultDetailTitle" className="row justify-content-center">
                <h3>Lojas encontradas</h3>
              </div>
              <div id="resultDetail" className="row justify-content-center">
                <div className="card-deck">
                  {this.state.arrayLojas.map((loja, idx) => {
                    return (
                      <div key={idx} className="card detailCards">
                        <div id="cardStoreHeader" className="card-header text-center"><h4>{loja.nomeLoja}</h4></div>
                        <div id={loja.idLoja} className="card-body">
                          <h5 className="card-title">Endereços</h5>
                          {
                            loja.endereco.map((enderecoLoja, idx) => {
                              if (enderecoLoja.regio === this.state.regio) {
                                return (
                                  <ul className="list-group" key={idx}>
                                    <li className="list-group-item btnProdutoDetail" >
                                      <p><span>Endereço {idx + 1}:</span>  {enderecoLoja.local}</p>
                                      <p><span>Telefone:</span>  {enderecoLoja.telefone}</p>
                                    </li>
                                  </ul>
                                )
                              }
                            })
                          }
                          <h5 className="card-title">Redes Sociais</h5>
                          <p className="card-text">
                            <a className="mr-sm-2" href={loja.enderecosVirtuais.facebook} target="_blank" rel="noopener noreferrer"> <img className="i" src={require('./images/icons/facebook.png')} alt="facebook"></img> </a>
                            <a className="mr-sm-2" href={loja.enderecosVirtuais.instagram} target="_blank" rel="noopener noreferrer"> <img className="i" src={require('./images/icons/instagram.png')} alt="instagram"></img> </a>
                            <a className="mr-sm-2" href={loja.enderecosVirtuais.website} target="_blank" rel="noopener noreferrer"> <img className="i" src={require('./images/icons/browser.png')} alt="website"></img></a>
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

            </div>
          </div>
        }

        <footer className="text-center">
          <p>Não nos responsabilizamos pelo estoque dos estabelecimentos</p>
          <p>Desenvolvido por Cesar&Tristão</p>
          <ul className="list-group">
            <li><a href="#"> Entre em contato</a></li>
          </ul>
        </footer>

      </div>
    );
  }
}

export default App;