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
  dePara(param){
    switch(param){
      case undefined:
        return 'Não informado';
      default:
        return param;
    }
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
                for(let l=0;l<result.length;l++){
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

        <div className="jumbotron text-center">
          <h1>Cadê meu produto natureba?</h1>
          <p>A gente encontra pra você</p>
          <div className="form-inline formJumbo">
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

        {
          this.state.showResults &&
          <div id="showResultsDiv" className="container-fluid text-center">

            <div className="row text-center">
              <h2>Resultado da busca</h2>
              <div id="resultList" onClick={this.pesquisaProdutoDetail} className="list-group">
                {
                  this.state.arrayProdutos.map(function (d, idx) {
                    return (
                      <div className="col-sm-3 resultList" key={idx}>
                        <a className="list-group-item list-group-item-action btnProdutoDetail"
                          id={d.idProduto}
                          href="#">
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
          </div>
        }

        {
          this.state.showDetail &&
          <div id="showDetailDiv" className="container">

            <div id="resultDetailHeader" className="row headerDetail">
              <h4><strong>Nome:</strong> {this.state.produto.nomeProduto}</h4>
              <h4><strong>Marca:</strong> {this.state.produto.marcaProduto}</h4>
              <h4><strong>Gluten Free?</strong> {this.deParaGluten(this.state.produto.glutenFree)}</h4>
            </div>

            <div id="resultDetail" className="row">
              {this.state.arrayLojas.map(function (d, idx) {
                return (
                  <div className="col-sm-4 list-group resultList" key={idx}>
                    <li id={d.idLoja} className="list-group-item btnProdutoDetail">

                      <h5>{d.nomeLoja}</h5>
                      <p><span>Facebook:</span> <a href={d.enderecosVirtuais.facebook} target="_blank"> {d.enderecosVirtuais.facebook} </a></p>
                      <p><span>Instagram:</span> <a href={d.enderecosVirtuais.instagram} target="_blank"> {d.enderecosVirtuais.instagram} </a></p>
                      <p><span>WebSite:</span> <a href={d.enderecosVirtuais.website} target="_blank"> {d.enderecosVirtuais.website} </a></p>

                      {d.endereco.map(function (d, idx) {
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

                    </li>
                  </div>
                )
              })}

            </div>

          </div>
        }

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