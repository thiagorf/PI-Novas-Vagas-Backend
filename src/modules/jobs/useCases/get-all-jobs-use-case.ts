import prisma from "../../../infra/database/prisma";


export class GetAllJobsUseCase {
    async perform() {
        const result = await prisma.jobs.findMany()

        return result
    }
}