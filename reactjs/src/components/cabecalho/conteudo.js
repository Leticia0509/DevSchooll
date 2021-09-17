import { Cabecalho } from './styled.js'
import Api from '../../services/api'
import Conteudo from '../../pages/home/conteudo.js'

const api = new Api()
export default function Cabe(cont){

    

    return (
        <Cabecalho>
            <div className="cb-usuario"> 
                <img className='img-user' src="/assets/images/Ellipse.svg" alt=""/>
                <div className="nick"> Olá, <span> Bruno Oliveira </span> </div>
            </div>
            <div className="botoes-cabecalho"> 
                <button> <img src="/assets/images/log-out.svg" alt=""></img> </button>
                <button> <img src="/assets/images/Refresh.svg" alt=""></img> </button>
            </div>
        </Cabecalho>
    )
}