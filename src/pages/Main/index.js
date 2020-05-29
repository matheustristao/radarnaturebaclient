import React from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputproduto: '',
            inputLoja: '',
            arrayProdutos: [],
            arrayLojas: [],
            showResults: false,
            showResultsLoja: false,
            showAlert: false,
            mensagemErro: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeLoja = this.handleChangeLoja.bind(this);
    }
    handleChange(event) {
        this.setState({ inputproduto: event.target.value });
    }

    handleChangeLoja(event) {
        this.setState({ inputLoja: event.target.value });
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
                showResultsLoja: false,
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
                        showAlert: false
                    });
                    console.log(this.state.arrayProdutos);
                }
            } else {
                this.setState({
                    showResults: true,
                    showResultsLoja: false
                });
                console.log(response.statusText);
            }
        }
    }

    procuraLoja = async () => {

        if (this.state.inputLoja.trim() === '') {
            this.setState({
                showAlert: true,
                showResults: false,
                showResultsLoja: false,
                mensagemErro: 'Nome da loja não pode ser vazio'
            });
        }
        else {

            const response = await api.get("/listalojas?nomeLoja=" + this.state.inputLoja);

            if (response.status === 202) {
                if (response.data.length === 0) {
                    console.log(response.data);
                    this.setState({
                        arrayLojas: response.data,
                        showResults: false,
                        showResultsLoja: false,
                        showAlert: true,
                        mensagemErro: "Nenhuma loja encontrado"
                    });
                }
                else {
                    this.setState({
                        arrayLojas: response.data,
                        showResults: false,
                        showResultsLoja: true,
                        showAlert: false,
                    });
                    console.log(this.state.arrayLojas);
                }
            } else {
                this.setState({
                    showResults: false,
                    showResultsLoja: false
                });
                console.log(response.statusText);
            }
        }
    }

    render() {
        return (
            <div className="">

                <header className="masthead text-white text-center">
                    <div className="overlay"></div>
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-9 mx-auto">
                                <h1 className="mb-5">Cadê meu produto natureba?</h1>
                            </div>
                            <div className="col-md-10 col-lg-8 col-xl-7 mx-auto">
                                <form>
                                    <div className="form-row">
                                        <div className="col-12 col-md-9 mb-2 mb-md-0">
                                            <input type="text" className="form-control form-control-lg" value={this.state.inputproduto} onChange={this.handleChange} placeholder="Pesquisar por produto"></input>
                                        </div>
                                        <div className="col-12 col-md-3">
                                            <button id="btnPesquisarProduto" onClick={this.procuraProduto} type="button" className="btn btn-block btn-lg btn-primary">Encontrar</button>
                                        </div>
                                    </div>
                                    <h5>Ou</h5>
                                    <div className="form-row">
                                        <div className="col-12 col-md-9 mb-2 mb-md-0">
                                            <input type="text" className="form-control form-control-lg" value={this.state.inputLoja} onChange={this.handleChangeLoja} placeholder="Pesquisar por loja"></input>
                                        </div>
                                        <div className="col-12 col-md-3">
                                            <button id="btnPesquisarLoja" onClick={this.procuraLoja} type="button" className="btn btn-block btn-lg btn-primary">Encontrar</button>
                                        </div>
                                    </div>
                                </form>
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
                                                    <h5 className="card-title">{d.nomeLoja}</h5>
                                                    <Link to={`/loja/${d.idLoja}`}>
                                                        <button type="button" className="btn btn-success card-link">Acessar catálogo</button>
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