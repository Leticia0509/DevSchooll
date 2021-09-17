import axios from 'axios'

const api = new axios.create({
    baseURL: 'http://localhost:3030'
})

export default class Api {
    async listar(){
        let r = await api.get('/matricula');
        return r.data;
    }

    async inserir(aluno, turma, curso, chamada) {
        let r = await api.post('/matricula', {aluno, turma, curso, chamada})
        return r.data;
    }

    async apagar(id) {
        let r = await api.delete(`/matricula/ ${id}`)
        return r.data;
    }

    async alterar(id, aluno, turma, curso, chamada){
        let r = await api.put(`/matricula/ ${id}`, {aluno, turma, curso, chamada})
    }
}