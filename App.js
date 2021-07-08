//******************* */
//App.js
//******************* */

import React from 'react'
//import 'bootstrap/dist/css/bootstrap.min.css'

//importar componentes
import Tabela from './Tabela';

/**
 * Função que lê os dados 'albuns' da API
 */
async function getAlbuns(){
  
  //lê os dados API
  let resposta=await fetch("https://localhost:44398/api/AlbunsAPI");

  if(!resposta.ok){
    //Não recebeu o código 200 do HTTP
    console.error("Não conseguimos ler os dados da API. Código:"+ resposta.status)

  }
return await resposta.json();
}

/**
 * 
 * Componente principal do meu projeto
 */

class App extends React.Component{

  constructor(props){
    super(props); // <--Sempre a primeira instrução no uso de um construtor 

    this.state = {

      /* 
       * array que contem os dados dos albuns
      */
      albuns:[]
    
    }
}
        

/*
 * Quando o objeto é criado, executa o código aqui escrito 
e faz com que sejam carregados os dados da API
 */
componentDidMount(){
this.loadAlbuns();
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
  let albunsVindosDaAPI = await getAlbuns();

  this.setState({
  albuns:albunsVindosDaAPI
  });


} catch (erro) {
  console.error("Erro na leitura dos Albuns da API", erro);
}

}

  render() {
    return (
      <div className="container">
        {/*este componente - tabela - irá apresentar os dados dos 'albuns' no ecrã, os 'albuns' devem ser lidos dna API */}
        <Tabela inDadosAlbuns={albuns}/>
      </div>
    )
  }
}
export default App;
