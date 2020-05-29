import React, { Component } from "react";
import api from '../../services/api';
import { Link } from 'react-router-dom';

export default class ListProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrayProdutos: [],
            showResults: false,
            showAlert: false,
            mensagemErro: ''
        };
    }

    async componentDidMount() {

        const nomeProduto = this.props.match.params.nomeProduto,
              response = await api.get(`/produtos?nomeProduto=${nomeProduto}`);

        if (response.status === 202) {
            if (response.data.length === 0) {
                this.setState({
                    showResults: false,
                    showAlert: true,
                    mensagemErro: "Nenhum produto encontrado"
                });
            }
            else {
                this.setState({
                    arrayProdutos: response.data,
                    showResults: true,
                    showAlert: false
                });
                console.log(this.state.arrayProdutos);
            }
        } else {
            this.setState({
                showResults: false,
                showAlert: true,
                mensagemErro: "Erro comunicação com servidor"
            });
            console.log(response.statusText);
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
            imagem = require('../images/produtos/' + idProduto + '.png');
        } catch (e) {
            imagem = require('../images/produtos/no-image.png');
        }
        return imagem;
    }

    render() {
        return (
            <div className="">
                <header className="masthead text-white text-center">
                    <h1 className="mb-4">Cadê meu produto natureba?</h1>
                    <Link to="/" id="btnPesquisarProduto" type="button" className="btn btn-primary">Refazer busca</Link>
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
                                                        <button type="button" className="btn btn-primary card-link">Onde eu compro?</button>
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