import React, { Component } from "react";
import api from '../../services/api';
import { Link } from 'react-router-dom';

export default class Loja extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loja: '',
            enderecos: [],
            arrayProdutos: []
        };
    }

    async componentDidMount() {

        const idLoja = this.props.match.params.id,
            responseLoja = await api.get(`/lojaDetail?idLoja=${idLoja}`);

        if (responseLoja.status === 202 && responseLoja) {
            console.log(responseLoja);
            this.setState({
                loja: responseLoja.data,
                enderecos: responseLoja.data.endereco
            });

            const responseProdutos = await api.get(`/produtosLoja?idLoja=${idLoja}`);

            if (responseProdutos.status === 202 && responseProdutos) {
                console.log(responseProdutos);
                this.setState({
                    arrayProdutos: responseProdutos.data
                });

            } else {
                console.log(responseProdutos.statusText);
            }
        } else {
            console.log(responseLoja.statusText);
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
        const loja = this.state.loja,
            enderecos = this.state.enderecos;

        return (
            <div className="">
                <header className="jumbotron text-center">
                    <h1 className="display-4">Cadê meu produto natureba?</h1>
                    <Link to="/" id="btnPesquisarProduto" type="button" className="btn btn-light">Refazer busca</Link>
                </header>
                <div id="showLojaDetail" className="container mb-4">
                    <div id="resultDetailTitle" className="row justify-content-center">
                        <h3>{loja.nomeLoja}</h3>
                    </div>

                    <div id="resultList" className="row justify-content-center">
                        <div className="card-deck">
                            {this.state.arrayProdutos.map((produto, idx) => {
                                return (
                                    <div key={idx} className="card">
                                        <img className="card-img-top" src={this.loadImage(produto.idProduto)} alt={produto.nomeProduto}></img>
                                        <div className="card-body">
                                            <h5 className="card-title">{produto.nomeProduto}</h5>
                                            <h6 className="card-subtitle mb-2 text-muted">{this.dePara(produto.marcaProduto)}</h6>
                                            <p className="card-text">{this.dePara(produto.descricaoProduto)}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

                <div id="resultDetailTitle" className="row justify-content-center">
                    {enderecos.map((endereco, idx) => {
                        return (
                            <ul className="list-group" key={idx}>
                                <li className="list-group-item" >
                                    <p><span>Endereço:</span>  {endereco.local}</p>
                                    <p><span>Telefone:</span>  {endereco.telefone}</p>
                                </li>
                            </ul>
                        )
                    })}
                </div>

            </div>
        )
    };

}