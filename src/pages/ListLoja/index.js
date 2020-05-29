import React, { Component } from "react";
import api from '../../services/api';
import { Link } from 'react-router-dom';

export default class ListLoja extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrayLojas: [],
            showResultsLoja: false,
            showAlert: false,
            mensagemErro: ''
        };
    }

    async componentDidMount() {

        const nomeLoja = this.props.match.params.nomeLoja,
              response = await api.get("/listalojas?nomeLoja=" + nomeLoja);

        if (response.status === 202) {
            if (response.data.length === 0) {
                this.setState({
                    showResultsLoja: false,
                    showAlert: true,
                    mensagemErro: "Nenhuma loja encontrada"
                });
            }
            else {
                this.setState({
                    arrayLojas: response.data,
                    showResultsLoja: true,
                    showAlert: false
                });
                console.log(this.state.arrayLojas);
            }
        } else {
            this.setState({
                showResultsLoja: false,
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
    loadImage = (idLoja) => {
        let imagem;
        try {
            imagem = require('../images/lojas/' + idLoja + '.png');
        } catch (e) {
            imagem = require('../images/lojas/no-image.png');
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
                    this.state.showResultsLoja &&
                    <div id="showResultsLojaDiv" className="container-fluid text-center">
                        <div className="row justify-content-center">
                            <h2>Resultado da busca</h2>
                        </div>
                        <div id="resultList" className="row justify-content-center">
                            <div className="card-deck">
                                {
                                    this.state.arrayLojas.map((d, idx) => {
                                        return (
                                            <div key={idx} className="card">
                                                <div className="card-body">
                                                <img className="card-img-top" src={this.loadImage(d.idLoja)} alt={d.nomeLoja}></img>
                                              <h5 className="card-title">{d.nomeLoja}</h5>
                                                    <Link to={`/loja/${d.idLoja}`}>
                                                        <button type="button" className="btn btn-primary card-link">Acessar catálogo</button>
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