import React from 'react';
import { Redirect } from 'react-router';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputproduto: '',
            inputLoja: '',
            redirectProdutos: false,
            redirectLojas: false,
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
            this.setState({ redirectProdutos: true });
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
            this.setState({ redirectLojas: true });
        }

    }

    render() {
        if (this.state.redirectProdutos) {
            return <Redirect push to={`/ListProduct/${this.state.inputproduto}`} />;
        }
        else if (this.state.redirectLojas) {
            return <Redirect push to={`/ListLoja/${this.state.inputLoja}`} />;
        }

        return (
            <div className="">

                <header className="jumbotron text-white text-center">
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
                                    <h5 id="decisaoForm">Ou</h5>
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