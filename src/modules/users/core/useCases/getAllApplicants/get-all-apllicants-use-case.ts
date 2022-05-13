import { Applicant } from "@prisma/client";
import { ApplicantRepository } from "../../../infra/repositories/applicant-repository";

export class GetApllicantsUseCase {
    
    constructor(
        private applicantRepository: ApplicantRepository
    ) {}
    
    async perform() {
        const result = await this.applicantRepository.getAllApllicants();

        return result;
    }
}