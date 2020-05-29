import React, { Component } from "react";
import api from '../../services/api';
import { Link } from 'react-router-dom';

export default class Product extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputproduto: '',
            produto: '',
            arrayProdutos: [],
            arrayLojas: [],
            mensagemErro: ''
        };
    }

    async componentDidMount() {

        const idProduto = this.props.match.params.id,
            responseProduto = await api.get(`/produtoDetail?idProduto=${idProduto}`);

        if (responseProduto.status === 202 && responseProduto) {
            console.log(responseProduto);
            this.setState({
                produto: responseProduto.data
            });

            const responseLoja = await api.get("/lojas?idProduto=" + this.state.produto.idProduto);

            if (responseLoja.status === 202) {
                console.log(responseLoja.data);
                if (responseLoja.data.length === 0) {
                    this.setState({
                        showAlert: true,
                        mensagemErro: "Nenhuma loja encontrada possui esse produto"
                    });
                } else {
                    this.setState({
                        arrayLojas: responseLoja.data
                    });
                }
            } else {
                console.log(responseLoja.statusText);
            }


        } else {
            console.log(responseProduto.statusText);
        }
    }

    deParaGlutenLac(param) {
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
            imagem = require('../images/produtos/' + idProduto + '.png');
        } catch (e) {
            imagem = require('../images/produtos/no-image.png');
        }
        return imagem;
    }

    render() {
        return (
            <div className="">
                <header className="jumbotron text-center">
                    <h1 className="display-4">Cadê meu produto natureba?</h1>
                    <Link to="/" id="btnPesquisarProduto" type="button" className="btn btn-light">Refazer busca</Link>
                </header>

                <div id="showDetail">
                    <div id="showDetailHeaderDiv" className="container mb-4">
                        <div id="resultDetailTitle" className="row justify-content-center">
                            <h3>Descrição do produto</h3>
                        </div>
                        <div id="resultDetailHeader" className="row justify-content-center">
                            <div className="col-sm-3">
                                <img className="img-thumbnail" src={this.loadImage(this.state.produto.idProduto)} alt={this.state.produto.nomeProduto}></img>
                            </div>
                            <div className="col-sm-3">
                                <dl>
                                    <dt>Nome</dt>
                                    <dd>{this.state.produto.nomeProduto}</dd>
                                    <dt>Marca</dt>
                                    <dd>{this.dePara(this.state.produto.marcaProduto)}</dd>
                                    <dt>Descrição</dt>
                                    <dd>{this.dePara(this.state.produto.descricaoProduto)}</dd>
                                </dl>
                            </div>
                            <div className="col-sm-3">
                                <dl>
                                    <dt>Calorias</dt>
                                    <dd>{this.dePara(this.state.produto.calorias)}</dd>
                                    <dt>Gluten Free?</dt>
                                    <dd>{this.deParaGlutenLac(this.state.produto.glutenFree)}</dd>
                                    <dt>Zero lactose?</dt>
                                    <dd>{this.deParaGlutenLac(this.state.produto.lacFree)}</dd>
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
                                                        return (
                                                            <ul className="list-group" key={idx}>
                                                                <li className="list-group-item btnProdutoDetail" >
                                                                    <p><span>Endereço:</span>  {enderecoLoja.local}</p>
                                                                    <p><span>Telefone:</span>  {enderecoLoja.telefone}</p>
                                                                </li>
                                                            </ul>
                                                        )
                                                    })
                                                }
                                                <h5 className="card-title">Redes Sociais</h5>
                                                <p className="card-text text-center">
                                                    <a className="mr-sm-2" href={loja.enderecosVirtuais.facebook} target="_blank" rel="noopener noreferrer"> <img className="i" src={require('../images/icons/facebook.png')} alt="facebook"></img> </a>
                                                    <a className="mr-sm-2" href={loja.enderecosVirtuais.instagram} target="_blank" rel="noopener noreferrer"> <img className="i" src={require('../images/icons/instagram.png')} alt="instagram"></img> </a>
                                                    <a className="mr-sm-2" href={loja.enderecosVirtuais.website} target="_blank" rel="noopener noreferrer"> <img className="i" src={require('../images/icons/browser.png')} alt="website"></img></a>
                                                </p>
                                                <div className="text-center">
                                                    <Link to={`/loja/${loja.idLoja}`}>
                                                        <button className="btn btn-success">Acessar catálogo da loja</button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}