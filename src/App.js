//******************* */
//App.js
//******************* */

import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

//importar componentes
import Tabela from './Tabela';
//importa o formulario para o utilizador inserir os dados
import Formulario from './Formulario';

/**
 * Função que lê os dados 'albuns' da API
 */
async function getAlbuns(){
  
  //lê os dados API
  let resposta=await fetch("api/FotografiasAPI/");

  if(!resposta.ok){
    //Não recebeu o código 200 do HTTP
    console.error("Não conseguimos ler os dados da API. Código:"+ resposta.status)

  }
// devolver os dados a serem usados na componente   
return await resposta.json();
}

async function getArtistas(){

  let resposta = await fetch("api/ArtistasAPI/");
  
  if(!resposta.ok){
    //Não recebeu o código 200 do HTTP
    console.error("Não conseguimos ler os dados dos Artistas. Código:"+ resposta.status)
  }
  // devolver os dados a serem usados na componente 
  return await resposta.json();
}

async function getGeneros(){

  let resposta = await fetch("api/GenerosAPI/");
  
  if(!resposta.ok){
    //Não recebeu o código 200 do HTTP
    console.error("Não conseguimos ler os dados dos Géneros. Código:"+ resposta.status)
  }
  // devolver os dados a serem usados na componente 
  return await resposta.json();
}

/**
 * invoca a API e envia os dados do novo Album
 * @param {*} dadosNovoAlbum 
 */
 async function adicionaAlbum(dadosNovoAlbum) {
  // https://developer.mozilla.org/pt-BR/docs/Web/API/FormData
  // https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects
  let formData = new FormData();
  
  formData.append("TituloAlbum", dadosNovoAlbum.TituloAlbum);
  formData.append("UploadCover", dadosNovoAlbum.UploadCover);
  formData.append("Duracao", dadosNovoAlbum.Duracao);
  formData.append("NrFaixas", dadosNovoAlbum.NrFaixas);
  formData.append("Ano", dadosNovoAlbum.Ano);
  formData.append("Editora", dadosNovoAlbum.Editora);
  formData.append("ArtistasFK", dadosNovoAlbum.ArtistasFK);
  formData.append("GeneroFK", dadosNovoAlbum.GeneroFK);

  let resposta = await fetch("api/AlbunsAPI", {
    method: "POST",
    body: formData
  });


  if (!resposta.ok) {
    // não obtivemos o 'código de erro' HTTP 200
    console.error(resposta);
    throw new Error('não foi possível enviar os dados do novo album. Código= ' + resposta.status);
  }

  // devolver os dados a serem usados na componente 
  return await resposta.json();
}

/**
 * Componente 'principal' do meu projeto
 */

class App extends React.Component{

  //Construtor
  constructor(props){
    super(props); // <--Sempre a primeira instrução no uso de um construtor 

    this.state = {

      /* 
       * array que contem os dados dos albuns
      */
      /**
       * irá guardar a lista de albuns vindas da API
       */
       albuns:[],

      
      /**
       * irá guardar a lista dos artistas vindas da API
       */
       artistas:[],
      
       /**
       * irá guardar a lista de géneros vindas da API
       */
      generos:[],
      
      /**
       * estados do projeto, durante a leitura de dados na API
       * @type {"carregando dados" | "erro" | "sucesso"}
       */
       loadState: "A carregar dados",
       /**
        * se algo correr mal, irá aqui ser colocado a mensagem de erro
        */
       errorMessage: null,

    
    }
}
        

/*
 * Quando o objeto é criado, executa o código aqui escrito 
e faz com que sejam carregados os dados da API
 */
componentDidMount(){
 // ler os dados dos albuns, e adicioná-los à state 'albuns' 
this.loadAlbuns();

// ler os dados dos artistas, e adicioná-los à state 'artistas'
this.loadArtistas();

// ler os dados dos artistas, e adicioná-los à state 'artistas'
this.loadGeneros();
}


/**
 * Carrega os albuns da API e adiciona ao array 'albuns'
 */
async loadAlbuns(){
/**
 * lê os dados da API(fetch)
 * e atualiza os dados na var. state
 */

try {
  //lê os dados
  //Adiciona ao state (setState())
  this.setState({
    loadState:"A carregar dados"
  });
  let albunsDaAPI = await getAlbuns();

  this.setState({
    albuns: albunsDaAPI,
    loadState: "sucesso"
  });

}  catch (erro) {
  this.setState({
    loadState: "erro",
    errorMessage: erro.toString()
  });
  console.error("Erro na leitura dos Albuns da API", erro)
}
}


/**
 * Carrega os Artistas da API e adiciona ao array 'artistas'
 */
async loadArtistas() {
  /**
   * lê os dados da API(fetch)
   * e atualiza os dados na var. state
   */
  try {
    //lê os dados
    //Adiciona ao state (setState())
    this.setState({
      loadState:"A carregar dados"
    });
    let artistasDaAPI = await getArtistas();

    this.setState({
      artistas: artistasDaAPI,
      loadState: "sucesso"
    });

  }  catch (erro) {
    this.setState({
      loadState: "erro",
      errorMessage: erro.toString()
    });
    console.error("Erro na leitura dos artistas da API", erro);
  }
 
}

/**
 * Carrega os Generos da API e adiciona ao array 'generos'
 */
 async loadGeneros() {
  /**
   * lê os dados da API(fetch)
   * e atualiza os dados na var. state
   */
  try {
    //lê os dados
    //Adiciona ao state (setState())
    this.setState({
      loadState:"A carregar dados"
    });
    let generosDaAPI = await getGeneros();

    this.setState({
      generos: generosDaAPI,
      loadState: "sucesso"
    });

  }  catch (erro) {
    this.setState({
      loadState: "erro",
      errorMessage: erro.toString()
    });
    console.error("Erro na leitura dos generos da API", erro);
  }
}
/**
   * processar os dados recolhidos pelo Formulário
   * @param {*} dadosDoFormulario 
   */
 handlerDadosForm = async (dadosDoFormulario) => {
  /**
   * TAREFAS:
   * 1. preparar os dados para serem enviados para a API
   * 2. enviar os dados para a API
   * 3. efetuar o reload da tabela
   */

  // 1.
  // já está feito.
  // o parâmetro de entrada -dadosDoFormulario- já contém os dados formatados
  try {
    // 2.
    await adicionaAlbum(dadosDoFormulario);

    // 3.
    await this.loadAlbuns();

  } catch (erro) {
    this.setState({
      errorMessage: erro.toString()
    });
    console.error("Erro ao submeter os dados do novo album: ", erro)
  }
}



  render() {
    //lê os dados nos arrays
    const{albuns, artistas} = this.state;
    switch (this.state.loadState) {
      case "A carregar dados":
        return <p>A carregar dados. Aguarde, por favor...</p>
      case "erro":
        return <p>Ocorreu um erro: {this.state.errorMessage}.</p>
      case "sucesso":
    return (
      <div className="container">
        <h1>Albuns</h1>
        {/*este componente - tabela - irá apresentar os dados dos 'albuns' no ecrã, os 'albuns' devem ser lidos dna API */}
        <h4>Carregar novo Album</h4>
            <Formulario inDadosAlbuns={artistas}
              outDadosAlbuns={this.handlerDadosForm}
            />
            <div className="row">
              <div className="col-md-8">
                <hr />
                <h4>Tabela com os Albuns</h4>
                {/* Tabela tem um 'parâmetro de entrada', chamado 'inDadosAlbuns'.
                Neste caso, está a receber o array JSON com os dados dos covers dos albuns,
                lidos da API */}
        <Tabela inDadosAlbuns={albuns}/>
      </div>
    </div>
  </div> 
    );
    default:
      return null;
    }
  }
}
export default App;
