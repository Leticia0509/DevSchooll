import db from './db.js';
import express from 'express'
import cors from 'cors'


const app = express();
app.use(cors())
app.use(express.json())


app.get('/matricula', async (req, resp) => {
    try{
        let r = await db.tb_matricula.findAll({order: [['id_matricula', 'desc']]})
        resp.send(r)
    }   catch (e){
        resp.send({error: "Eroo ao exibir alunos"})
    }
})


app.post('/matricula', async (req, resp) => {

    try{

        let p = req.body;
        let r = await db.tb_matricula.create({where: {nr_chamada: p.chamada, nm_turma: p.turma, } })
       

        if(r != null) {
            return resp.send({erro:"Aluno ja existe" })
        }

        let m = await db.tb_matricula.create({
            nm_aluno: p.aluno,
            nm_curso: p.curso,
            nr_chamada: p.chamada,
            nm_turma: p.turma
        })

        resp.send(m)
    }   catch (e){
        resp.send({erro: "Erro ao inserir aluno"})
    }
})


app.put('/matricula/:id', async (req, resp) => {
    
    try {
        let {aluno, turma, curso, chamada} = req.body; 

        let r = await db.tb_matricula.update({
            nm_aluno: aluno,
            nm_curso: curso,
            nr_chamada: chamada,
            nm_turma: turma
            }, 

            {where: {id_matricula: req.params.id}}
        )

        resp.sendStatus(200)
    } catch {
        resp.send({erro: "Erro ao alterar aluno"})
    }
}) 

app.delete('/matricula/:id', async (req, resp) => {
    
    try{

        let r = await db.tb_matricula.destroy({where: {id_matricula: req.params.id}})

    resp.sendStatus(200)
    } catch (e) {
        resp.send({erro: "deu pau"})
    }

})

app.listen(process.env.PORT,
    x => console.log(`A PORT ${process.env.PORT} subiu!! :)`))