import { Applicant } from "@prisma/client";
import prisma from "../../../../infra/database/prisma";
import { CreateApplicantDTO } from "../../core/useCases/applicants/createApplicant/create-applicant-dto";
import { ApplicantRepository } from "./applicant-repository";

export class PrismaApplicantRepository implements ApplicantRepository {

    async createAnApplicant(applicantData: CreateApplicantDTO): Promise<Applicant> {

        const {
            curriculum,
            email,
            name,
            password,
            photo
        }= applicantData

        const applicant = await prisma.applicant.create({
            data: {
                curriculum,
                photo,
                user: {
                    create: {
                        name,
                        email,
                        password
                    }
                }
            }
        });

        return applicant;
    }

    async getApplicantBy(email: string): Promise<Applicant> {
        const applicant = await prisma.applicant.findFirst({
            where: {
                user: {
                    email
                }
            }
        });

        return applicant;
    }

    async getAllApllicants(): Promise<Applicant[]> {
        const applicants = await prisma.applicant.findMany()

        return applicants
    }

    async getApplicantByUserId(user_id: number) {
        const applicant = await prisma.applicant.findFirst({
            where: {
                user_id
            }
        });

        return applicant;
    }
}

