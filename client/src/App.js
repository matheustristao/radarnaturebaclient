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
  procuraProduto = () => {
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
            <div className="input-group">
              <input id="inputProduto" className="form-control" size="40" type="text" value={this.state.inputproduto} onChange={this.handleChange} placeholder="Ex: PASTA DE AMENDOÍM" />
              <div className="input-group-append">
                <button id="btnPesquisarProduto" onClick={this.procuraProduto} type="button" className="btn btn-success">
                  Pesquisar
                 </button>
              </div>
            </div>
          </div>
        </header>

        {
          this.state.showResults &&
          <div id="showResultsDiv" className="container-fluid text-center">
            <div className="row justify-content-center">
              <h2>Resultado da busca</h2>
            </div>
            <div id="resultList" className="row justify-content-center">
              {
                this.state.arrayProdutos.map((d, idx) => {
                  return (
                    <div key={idx} className="card containerCards">
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
        }

        {
          this.state.showDetail &&
          <div id="showDetailDiv" className="container">

            <div id="resultDetailHeader" className="row">
              <ul className="list-group list-group-flush">
              <li className="list-group-item"><strong>Nome:</strong> {this.state.produto.nomeProduto}</li>
              <li className="list-group-item"><strong>Marca:</strong> {this.dePara(this.state.produto.marcaProduto)}</li>
              <li className="list-group-item"><strong>Gluten Free?</strong> {this.deParaGluten(this.state.produto.glutenFree)}</li>
              </ul>
            </div>

            <div id="resultDetail" className="row">
              {this.state.arrayLojas.map((d, idx) => {
                return (
                  <div key={idx} className="card detailCards">
                  <div id={d.idLoja} className="card-body">
                    <h5 className="card-title">{d.nomeLoja}</h5>
                    <p className="card-text"><span>Facebook:</span> <a href={d.enderecosVirtuais.facebook} target="_blank"> {d.enderecosVirtuais.facebook} </a></p>
                      <p className="card-text"><span>Instagram:</span> <a href={d.enderecosVirtuais.instagram} target="_blank"> {d.enderecosVirtuais.instagram} </a></p>
                      <p className="card-text"><span>WebSite:</span> <a href={d.enderecosVirtuais.website} target="_blank"> {d.enderecosVirtuais.website} </a></p>
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
        }

        <footer className="text-center">
          <p>Não nos responsabilizamos pelo estoque dos estabelecimentos</p>
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