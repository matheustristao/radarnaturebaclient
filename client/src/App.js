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
      regio: 'estado',
      showResults: false,
      showDetail: false,
      showAlert: false,
      produto: '',
      arrayProdutos: [],
      arrayLojas: []
    };

    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ inputproduto: event.target.value });
  }
  handleChangeRegio = (event) =>{
    this.setState({regio:event.target.value});
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
      imagem = require('./images/' + idProduto + '.png');
    } catch (e) {
      imagem = require('./images/no-image.png');
    }
    return imagem;
  }
  procuraProduto = () => {

    if (this.state.regio === 'estado') {
      this.setState({
        showAlert: true,
        showResults: false,
        showDetail: false
      });
    }
    else if (this.state.inputproduto.trim() === '') {
      this.setState({
        showAlert: true,
        showResults: false,
        showDetail: false
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
              showAlert: false
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
  pesquisaProdutoDetail = (event) => {
    fetch(this.state.endpointServer + "/produtoDetail?idProduto=" + event.target.id)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            showResults: false,
            showAlert: false,
            showDetail: true,
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

          fetch(this.state.endpointServer + "/lojas?idLoja=" + concatLojas)
            .then(res => res.json())
            .then(
              (result) => {
                console.log(result);
                for (let l = 0; l < result.length; l++) {
                  result[l].enderecosVirtuais.facebook = this.dePara(result[l].enderecosVirtuais.facebook);
                  result[l].enderecosVirtuais.website = this.dePara(result[l].enderecosVirtuais.website);
                  result[l].enderecosVirtuais.instagram = this.dePara(result[l].enderecosVirtuais.instagram);
                }
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
        <header className="jumbotron text-center">
          <h1 className="display-4">Cadê meu produto natureba?</h1>
          <h5 className="my-4">A gente encontra pra você</h5>
          <div className="form-inline justify-content-center">
            <form className="form-inline">
              <div className="form-group mr-sm-2">
                <select className="form-control" value={this.state.regio} onChange={this.handleChangeRegio} >
                  <option>Estado</option>
                  <option>São Paulo</option>
                </select>
              </div>
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
          this.state.showAlert &&
          <div className="container">
            <div className="row justify-content-center">
              <div className="alert alert-danger">
                <strong>Nome do produto não pode ser vazio!</strong>
              </div>
            </div>
          </div>
        }
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
                        <img className="card-img-top" src={this.loadImage(d.idProduto)} alt={this.nomeProduto}></img>
                        <div className="card-body">
                          <h5 className="card-title">{d.nomeProduto}</h5>
                          <h6 className="card-subtitle mb-2 text-muted">{this.dePara(d.marcaProduto)}</h6>
                          <p className="card-text">Lorem Ipsum</p>
                          <button id={d.idProduto} type="button" onClick={this.pesquisaProdutoDetail} className="btn btn-success card-link">Acessar produto</button>
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
          this.state.showDetail &&
          <div id="showDetailDiv" className="container">

            <div id="resultDetailHeader" className="row">
              <dl>
                <dt>Nome:</dt>
                <dd>{this.state.produto.nomeProduto}</dd>
                <dt>Marca:</dt>
                <dd>{this.dePara(this.state.produto.marcaProduto)}</dd>
                <dt>Gluten Free?</dt>
                <dd>{this.deParaGluten(this.state.produto.glutenFree)}</dd>
              </dl>
            </div>

            <div id="resultDetail" className="row justify-content-center">
              <div className="card-deck">
                {this.state.arrayLojas.map((d, idx) => {
                  return (
                    <div key={idx} className="card detailCards">
                      <div id="cardStoreHeader" className="card-header text-center"><h4>{d.nomeLoja}</h4></div>
                      <div id={d.idLoja} className="card-body">
                        <p className="card-text"><span>Facebook:</span> <a href={d.enderecosVirtuais.facebook} target="_blank" rel="noopener noreferrer"> {d.enderecosVirtuais.facebook} </a></p>
                        <p className="card-text"><span>Instagram:</span> <a href={d.enderecosVirtuais.instagram} target="_blank" rel="noopener noreferrer"> {d.enderecosVirtuais.instagram} </a></p>
                        <p className="card-text"><span>WebSite:</span> <a href={d.enderecosVirtuais.website} target="_blank" rel="noopener noreferrer"> {d.enderecosVirtuais.website} </a></p>
                        <h5 className="card-title">Endereços</h5>
                        {d.endereco.map((d, idx) => {
                          return (
                            <ul className="list-group" key={idx}>
                              <li className="list-group-item btnProdutoDetail" >
                                <p><span>Endereço {idx + 1}:</span>  {d.local}</p>
                                <p><span>Telefone:</span>  {d.telefone}</p>
                              </li>
                            </ul>
                          )
                        })
                        }
                      </div>
                    </div>
                  )
                })}
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