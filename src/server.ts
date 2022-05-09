import express, { json, Request, Response } from "express";
import cors from "cors";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const server = express();

server.use(cors())
server.use(json())

server.get("/vagas", async function (request: Request, response: Response) {

    const resultado = await prisma.vagas.findMany()

    return response.json(resultado)
    
})

server.post("/vagas", async function (request: Request, response: Response) {

    const { 
        title,
        salary,
        address,
        enterprise,
        description
    } = request.body

    const vaga = await prisma.vagas.create({
        data: {
            title,
            address,
            description,
            enterprise,
            salary
        }
    });

    return response.json(vaga)

})

server.get("/vagas/:id", async function (request:Request, response: Response) {
    let vagaId = request.params.id

    let resposta = await prisma.vagas.findUnique({
        where:{
            id: Number(vagaId)
        }
    })
    return response.json(resposta)
})

server.put("/vagas/:id", async function (request: Request, response: Response) {
    let vagaId = request.params.id


    const {
        title,
        address,
        description,
        enterprise,
        salary
    } = request.body

    const vaga = await prisma.vagas.update({
        where: {
            id: Number(vagaId)
        },
        data: {
            title,
            address,
            description,
            enterprise,
            salary
        }
    })

    return response.json(vaga);

})

server.delete("/vagas/:id", async function (request:Request, response:Response) {
    let vagaId = request.params.id

    const vaga = await prisma.vagas.delete({
        where:{
            id: Number(vagaId)
        }
    })
    return response.json(vaga);
})


server.listen(8000, () => {
    console.log("Servidor rodando!")
})