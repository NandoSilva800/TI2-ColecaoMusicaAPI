// Formulario.js
// este ficheiro irá conter o código para
// representar o formulário no ecrã
// ***************************************************

import React from 'react'


/**
 * Mostra uma lista com os artistas existentes,
 * para o utilizador escolher um
 */
const EscolheArtista = (props) => {
    // vamos recuperar os dados do parâmetro de entrada: inListaArtistas
    // o 'map' funciona como um 'foreach' que irá iterar todos os items dos dados lidos
    const opcoes = props.inListaArtistas.map((artista) => {
        return (
            <option key={artista.IdArtista}
                required
                value={artista.IdArtista}>{artista.nomeArtista}
            </option>
        );
    }
    )
    return (
        <select required className="form-select" onChange={props.outIdArtistaEscolhido}>
            <option value="">Escolha um artista</option>
            {opcoes}
        </select>
    );
    }

    const EscolheGenero = (props) => {
        // vamos recuperar os dados do parâmetro de entrada: inListaArtistas
        // o 'map' funciona como um 'foreach' que irá iterar todos os items dos dados lidos
        const opcoes = props.inListaGeneros.map((genero) => {
            return (
                <option key={genero.IdGenero}
                    required
                    value={genero.IdGenero}>{genero.designacao.genero}
                </option>
            );
        }
        )

    return (
        <select required className="form-select" onChange={props.outIdGeneroEscolhido}>
            <option value="">Escolha um genero</option>
            {opcoes}
        </select>
    );

    }

    /**
     * Formulário para adicionar (fazer upload) um album
     */
    class Formulario extends React.Component {

    constructor(props) {
        super(props);

        // variáveis para guardar os dados introduzidos pelo utilizador, no Formulário
        this.state = {
            tituloDoAlbum:"" ,
            duracaoDoAlbum: "",
            nrfaixasDoAlbum: "",
            anoDoAlbum: "",
            editoraDoAlbum:"",
            fichCover:null,
            idDoGenero:"",
            idDoArtista:""
        }
        }

        /**
         * processar os dados fornecidos pelo utilizador sobre o título do album
         * @param {*} evento - dados adicionados pelo utilizador
         */
        handlerTituloChange = (evento) => {
        // guardar os dados recolhidos sobre a título do album
        this.setState({
            tituloDoAlbum: evento.target.value
        });
        }

        /**
         * processar os dados fornecidos pelo utilizador sobre a duração total do album
         * @param {*} evento - dados adicionados pelo utilizador
         */
        handlerDuracaoChange = (evento) => {
        // guardar os dados recolhidos sobre a duração total do album
        this.setState({
            duracaoDoAlbum: evento.target.value
        });
        }

        /**
         * processar os dados fornecidos pelo utilizador sobre a duração total do album
         * @param {*} evento - dados adicionados pelo utilizador
         */
        handlerNrFaixasChange = (evento) => {
        // guardar os dados recolhidos sobre a duração total do album
        this.setState({
            nrFaixasDoAlbum: evento.target.value
        });
        }
        
        /**
         * processar os dados fornecidos pelo utilizador sobre o ano do album
         * @param {*} evento - dados adicionados pelo utilizador
         */
        handlerAnoChange = (evento) => {
        // guardar os dados recolhidos sobre o ano do album
        this.setState({
            anoDoAlbum: evento.target.value
        });
        }

        /**
         * processar os dados fornecidos pelo utilizador no nome da editora do album
         * @param {*} evento - dados adicionados pelo utilizador
         */
        handlerEditoraChange = (evento) => {
            // validar os valores introduzidos na TextBox
            if (/\d/.test(evento.target.value)) {
                evento.target.setCustomValidity("Não são permitidos números aqui.");
                return;
            } else {
                evento.target.setCustomValidity("");
            }

            // guardar os dados recolhidos sobre a editora do album
            this.setState({
                editoraDoalbum: evento.target.value
            });
        }
    
        /**
         * processar os dados fornecidos pelo utilizador no upload do cover do album
         * @param {*} evento - dados adicionados pelo utilizador
         */
            handlerCoverChange = (evento) => {

            // guardar os dados recolhidos pelo <select></select>
            this.setState({
                fichCover: evento.target.files[0]
            });
        }

        /**
         * processar os dados fornecidos pelo utilizador na escolha de um artista
         * @param {*} evento - id do artista que o utilizador seleciona
         */
        handlerGeneroChange = (evento) => {
            
            // guardar os dados recolhidos pelo <select></select>
            this.setState({
                idDoGenero: evento.target.value
            });
        }

        /**
         * processar os dados fornecidos pelo utilizador na escolha de um artista
         * @param {*} evento - id do artista que o utilizador seleciona
         */
        handlerArtistaChange = (evento) => {
            
            // guardar os dados recolhidos pelo <select></select>
            this.setState({
                idDoArtista: evento.target.value
            });
        }

   

   
        /**
         * handler para processar os dados fornecidos pelo Formulário
         * @param {*} evento - dados recolhido pelo <form></form>
         */
        handlerSubmitForm = (evento) => {
        // impedir o formulário de autoenviar os dados para o servidor
        // essa tarefa cabe, neste projeto, ao componente <App/>
        evento.preventDefault();

        // preparar os dados para serem enviados para a <App/>
        // posso já enviar os dados prontos para serem adicionados à API
        let dadosForm = {
            TituloAlbum: this.state.tituloDoAlbum,
            Duracao: this.state.duracaoDoAlbum,
            NrFaixas: this.state.nrfaixasDoAlbum,
            Ano: this.state.anoDoAlbum,
            Editora: this.state.editoraDoAlbum,
            UploadCover: this.state.fichCover,
            GeneroFK: this.state.idDoGenero,
            ArtistaFK: this.state.idDoArtista
        };

        // concretizar a exportação de dados para a <App/>
        this.props.outDadosAlbuns(dadosForm);
        }

    render() {
        // ler os dados que foram/são fornecidos à Tabela,
        // como parâmetro de entrada/saída
        const { inDadosArtistas } = this.props;
        const { inDadosGeneros } = this.props;

        return (
            // o 'return' só consegue devolver UM objeto
            <form onSubmit={this.handlerSubmitForm} encType="multipart/form-data">
                <div className="row">
                <div className="col-md-4">
                    Título do album:  <input
                            type="text"
                            required
                            onChange={this.handlerLocalChange}
                            className="form-control" /><br />     
                    Duração:  <input
                            type="text"
                            required
                            onChange={this.handlerLocalChange}
                            className="form-control" /><br />               
                    </div>
                    <div className="col-md-4">
                    Numero de faixas:  <input
                            type="text"
                            required
                            onChange={this.handlerLocalChange}
                            className="form-control" /><br />     
                    Ano:  <input
                            type="text"
                            required
                            onChange={this.handlerLocalChange}
                            className="form-control" /><br />               
                    </div>
                    <div className="col-md-4">
                    Editora:  <input
                            type="text"
                            required
                            onChange={this.handlerLocalChange}
                            className="form-control" /><br />
                      Cover  : <input
                            type="file"
                            required
                            accept=".jpg,.png"
                            onChange={this.handlerCoverChange}
                            className="form-control" /><br />
                    </div>
                    <div className="col-md-4">
                       Género : <EscolheGenero inListaGeneros={inDadosGeneros}
                            outIdGeneroEscolhido={this.handlerGeneroChange}/><br />
                        Artista: <EscolheArtista inListaArtistas={inDadosArtistas}
                            outIdArtistaEscolhido={this.handlerArtistaChange}
                        />
                        <br />
                    </div>
                </div>
                <input type="submit" value="Adicionar Album" className="btn btn-outline-primary" />
            </form>
        )
    }
}
export default Formulario;
