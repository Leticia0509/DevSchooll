
import Cabecalho from "../../components/cabecalho/conteudo.js"
import  Menu  from "../../components/menu/Conteudo.js"
import {Container} from './conteudo-styled.js'

import Api from '../../services/api.js'

import { useEffect, useState } from "react"

import {Inputstyle} from '../../components/inputs/styled'

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import React, { useRef } from 'react'
import LoadingBar from 'react-top-loading-bar'
import styled from "styled-components"


const api = new Api();

export default function Conteudo() {

  const [alunos, setAlunos] = useState([])
  const [nome, setNome] = useState('')
  const [chamada, setCham] = useState('')
  const [curso, setCurso] = useState('')
  const [turma, setTurma] = useState('')
  const [idAlt, setId] = useState(0)

  const loading = useRef(null);

    async function listar() {
      let r = await api.listar();
      setAlunos(r)
    }

    function clear(){
      setTurma('')
      setCham('')
      setCurso('')
      setNome('')
      setId(0)
    }

    async function inserir() {
      if(idAlt === 0) {
        loading.current.continuousStart();
        if(nome.length < 4){
          return toast.error('Nome precisa ter no mínimo 4 caracteres') && loading.current.complete();
        }

        if(!curso || curso === '') {
          return toast.error('Campo curso é obrigatótio') && loading.current.complete();
        }
        if(!chamada || chamada === '') {
          return toast.error('Campo chamada é obrigatório') && loading.current.complete();
        }

        if(chamada !== parseInt(chamada))
          return toast.error('Campo chamada é somente numero') && loading.current.complete();

        if(chamada < 0)
          return toast.error('Não é possível inserir numeros negativos') && loading.current.complete()

        if(!turma || turma.replace === ''){
          return toast.error('Campo turma é obrigatótio') && loading.current.complete();
        }
          else{
            let r = await api.inserir(nome, turma, curso, chamada);
            if(r.erro){
              toast.error(`${r.erro}`)
              loading.current.complete();
            } else {
              toast.success('Aluno inserido');
              loading.current.complete();
            }
          }

      } else {
        let r = await api.alterar(idAlt, nome, turma, curso, chamada)
        toast.success('Alterado com sucesso')
        loading.current.complete();

        clear()
      }

      listar();
    }

    async function deletar(id){
      confirmAlert({
        title: "Remover aluno",
        message: `Deseja apagar o aluno ${id}?`,
        buttons: [
          {
            label: "Sim", onClick: async () => {
              let r = await api.apagar(id)
              toast.success('Aluno removido')
              listar()
            },
            
          },{
            label: "Não"
          }

        
        ]
      })








    }

    async function alterar(item) {
      setNome(item.nm_aluno);
      setTurma(item.nm_turma);
      setCurso(item.nm_curso);
      setCham(item.nr_chamada);
      setId(item.id_matricula)
    }


    useEffect(() => {
      listar();
    }, [])

    return (
      <Container>
        <Menu/>
        <ToastContainer />
        <LoadingBar color='#f11946' ref={loading} />
          <div className="pt2-home">
            <Cabecalho/>
            <div className="info-alunos"> 
            <div className="nome-aluno"> <img src="/assets/images/Line.svg" alt=""/> <div className="novo-aluno" > {idAlt == 0? "Novo aluno": `Alterando aluno ${idAlt}`} </div> </div>
              <div className="form-home"> 
                  <div className="inputs">
                    <Inputstyle>
                      <form> 
                        <div className="pt1-inputs">
                            <label> 
                                Nome:
                                <input type="text" value={nome} onChange={e => setNome(e.target.value)}/>
                            </label>

                            <label> 
                                Categoria: 
                                <input type="text" value={curso} onChange={e => setCurso(e.target.value)}/>
                            </label>

                            <label> 
                                Avaliação
                                <input type="text" value={chamada} onChange={e => setCham(e.target.value)}/>
                            </label>
                        </div>

                        <div className="pt2-inputs">
                          <label> 
                            Preço DE:
                            <input type="text" value={turma} onChange={e => setTurma(e.target.value)}/>
                          </label>

                          <label> 
                            Preço POR:
                            <input type="text" value={turma} onChange={e => setTurma(e.target.value)}/>
                          </label>

                          <label> 
                            Estoque
                            <input type="text" value={turma} onChange={e => setTurma(e.target.value)}/>
                          </label>
                          
                        </div>
                      </form>
                    </Inputstyle>
                  </div>
                  <button className="cadastrar" onClick={inserir}> {idAlt == 0? "Cadastrar": "Alterar"} </button>
              </div>
            </div>
            <div className="tabela">
              <div className="novo-aluno">
                <img src="/assets/images/Line.svg" alt=""/>
                <div className="titulo-aluno" > Alunos Matriculados </div>
              </div>
              <table className="tabela-ns">
                <thead>
                  <tr className="inicio-table">
                    <th> Id </th>
                    <th> Nome </th>
                    <th> Chamada </th>
                    <th> Turma</th>
                    <th> Curso </th>
                    <th> </th>
                    <th> </th>
                  </tr>
                </thead>
                <tbody>
                  {alunos.map((item, i) => 
                    <tr className={i% 2 == 0? "cinza": "normal"}> 
                      <td> {item.id_matricula} </td>
                      <td title={item.nm_aluno}>  {item.nm_aluno != null && item.nm_aluno.length >= 25? item.nm_aluno.substr(0,25) + "...": item.nm_aluno} </td>
                      <td> {item.nr_chamada} </td>
                      <td> {item.nm_turma}</td>
                      <td> {item.nm_curso} </td>
                      <td> <button className="bt-functions" onClick={() => alterar(item)}> <img src="/assets/images/edit.svg"/> </button> </td>
                      <td> <button className="bt-functions" onClick={() => deletar(item.id_matricula)}> <img src="/assets/images/lixo.svg"/> </button> </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
      </Container>
    )
}