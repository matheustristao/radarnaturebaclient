import React from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputproduto: '',
            arrayProdutos: [],
            showResults: false,
            showAlert: false,
            mensagemErro: ''
        };

        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({ inputproduto: event.target.value });
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
            imagem = require('../images/produtos/' + idProduto + '.png');
        } catch (e) {
            imagem = require('../images/produtos/no-image.png');
        }
        return imagem;
    }
    procuraProduto = async () => {

        if (this.state.inputproduto.trim() === '') {
            this.setState({
                showAlert: true,
                showResults: false,
                mensagemErro: 'Nome do produto não pode ser vazio'
            });
        }
        else {

            const response = await api.get("/produtos?nomeProduto=" + this.state.inputproduto);

            if (response.status === 202) {
                if (response.data.length === 0) {
                    this.setState({
                        arrayProdutos: response.data,
                        showResults: false,
                        showAlert: true,
                        mensagemErro: "Nenhum produto encontrado"
                    });
                }
                else {
                    this.setState({
                        arrayProdutos: response.data,
                        showResults: true,
                        showAlert: false,
                    });
                    console.log(this.state.arrayProdutos);
                }
            } else {
                this.setState({
                    showResults: true
                });
                console.log(response.statusText);
            }
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
                            <button id="btnPesquisarProduto" onClick={this.procuraProduto} type="button" className="btn btn-success mr-sm-2">Pesquisar </button>
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
                                                    <p className="card-text">{this.dePara(d.descricaoProduto)}</p>
                                                    <Link to={`/produto/${d.idProduto}`}>
                                                        <button type="button" className="btn btn-success card-link">Encontrar lojas</button>
                                                    </Link>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                }

                {this.state.showAlert &&
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="alert alert-danger">
                                <strong>{this.state.mensagemErro}</strong>
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
};

export default Main;