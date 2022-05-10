import express, { json, Request, Response } from "express";
import cors from "cors";
import prisma from "./database/prisma"
import { compare, hash } from "bcrypt"
import { sign } from "jsonwebtoken"
import "dotenv/config"
import { checkAuthMiddleware } from "./middlewares/check-auth-middleware";

const app = express();


app.use(cors())
app.use(json())

app.get("/jobs", async function (request: Request, response: Response) {

    const result = await prisma.jobs.findMany()

    return response.json(result)
    
})

app.post("/jobs", checkAuthMiddleware, async function (request: Request, response: Response) {

    const { 
        title,
        salary,
        address,
        description,
        started_at,
        ends_at
    } = request.body



    const vaga = await prisma.jobs.create({
        data: {
            title,
            address,
            description,
            enterprise_id: request.user.id,
            salary,
            started_at,
            ends_at
        }
    });

    return response.json(vaga)

})

app.get("/jobs/:id", async function (request:Request, response: Response) {
    let vagaId = request.params.id

    let resposta = await prisma.jobs.findUnique({
        where:{
            id: Number(vagaId)
        }
    })

    return response.json(resposta)
})

app.put("/jobs/:id", async function (request: Request, response: Response) {
    let vagaId = request.params.id


    const {
        title,
        address,
        description,
        enterprise,
        salary,
        started_at,
        ends_at

    } = request.body

    const vaga = await prisma.jobs.update({
        where: {
            id: Number(vagaId)
        },
        data: {
            title,
            address,
            description,
            enterprise,
            salary,
            started_at,
            ends_at
        }
    })

    return response.json(vaga);

})

app.delete("/jobs/:id", async function (request:Request, response:Response) {
    let vagaId = request.params.id

    const vaga = await prisma.jobs.delete({
        where:{
            id: Number(vagaId)
        }
    })
    return response.json(vaga);
})


//ENTERPRISE

app.get("/enterprises", async (request: Request, response: Response) => {
    const result = await prisma.enterprise.findMany();

    return response.json(result)
})

app.get("/enterprises/:id", async (request: Request, response: Response) => {
    const id = Number(request.params.id);

    const result = await prisma.enterprise.findUnique({
        where: {
            id
        }
    });

    return response.json(result)
})

app.post("/enterprises", async (request: Request, response: Response) => {
    const {
        cnpj,
        segment,
        cep,
        name,
        email,
        password
    } = request.body;

    const hashPassword = await hash(password, 10);

    const result = await prisma.enterprise.create({
        data: {
            cnpj,
            segment,
            cep,
            user: {
                create: {
                    name,
                    email,
                    password: hashPassword
                }
            }
        }
    });

    return response.json(result);
})

app.put("/enterprises/:id", async (request: Request, response: Response) => {
    
    const id = request.params.id
    const enterprise_id = Number(id)
    
    const {
        cnpj,
        segment,
        cep,
        name,
        email,
        //password
    } = request.body
    //TODO


    const result = await prisma.enterprise.update({
        where: {
            id: enterprise_id
        },
        data: {
            cnpj,
            segment,
            cep,
            user: {
                update: {
                    name,
                    email,
                }
            }
        }
    });

    return response.json(result)
})

app.delete("/enterprises/:id", async (request: Request, response: Response) => {
    const id = request.params.id

    const result = await prisma.enterprise.delete({
        where: {
            id: Number(id)
        }
    });

    return response.json(result);
})
//

app.post("/enterprises/login", async (request: Request, response: Response) => {
    const {
        email,
        password
    } = request.body

    const verifyUser = await prisma.user.findFirst({
        where: {
            email,
        }
    });

    if(!verifyUser) {
        return response.status(400).json({
            msg: "Invalid email or password"
        })
    };

    const passwordMatch = compare(password, verifyUser.password)

    if(!passwordMatch) {
       return response.status(400).json({
           msg: "Invalid email or password"
       });
    }

    const token = sign({
        subject: verifyUser.id
    }, process.env.JWT_SECRET as string, 
    {
        expiresIn: "1h"
    })

    return response.json({
        token: token
    })
})

//Applicant

app.get("/applicants", async (request: Request, response: Response) => {
    const result = await prisma.applicant.findMany();

    return response.json(result)
})

app.get("/applicants/:id", async (request: Request, response: Response) => {
    const id = Number(request.params.id);

    const result = await prisma.applicant.findUnique({
        where: {
            id
        }
    });

    return response.json(result)
})

app.post("/applicants", async (request: Request, response: Response) => {
    const {
        photo,
        curriculum,
        name,
        email,
        password
    } = request.body;

    const hashPassword = await hash(password, 10);

    const result = await prisma.applicant.create({
        data: {
            photo,
            curriculum,
            user: {
                create: {
                    name,
                    email,
                    password: hashPassword
                }
            }
        }
    });

    return response.json(result);
})

app.put("/applicants/:id", async (request: Request, response: Response) => {
    
    const id = Number(request.params.id)
    
    const {
        photo,
        curriculum,
        name,
        email,
        //password
    } = request.body
    //TODO


    const result = await prisma.applicant.update({
        where: {
            id
        },
        data: {
            photo,
            curriculum,
            user: {
                update: {
                    name,
                    email,
                }
            }
        }
    });

    return response.json(result)
})

app.delete("/applicants/:id", async (request: Request, response: Response) => {
    const id = request.params.id

    const result = await prisma.applicant.delete({
        where: {
            id: Number(id)
        }
    });

    return response.json(result);
})
//

app.post("/applicants/login", async (request: Request, response: Response) => {
    const {
        email,
        password
    } = request.body

    const verifyUser = await prisma.user.findFirst({
        where: {
            email,
        }
    });

    if(!verifyUser) {
        return response.status(400).json({
            msg: "Invalid email or password"
        })
    };

    const passwordMatch = compare(password, verifyUser.password)

    if(!passwordMatch) {
       return response.status(400).json({
           msg: "Invalid email or password"
       });
    }

    const token = sign({
        subject: verifyUser.id
    }, process.env.JWT_SECRET as string, 
    {
        expiresIn: "1h"
    })

    return response.json({
        token: token
    })
})




export { app }