import { hash } from "bcrypt";
import { ApplicantRepository } from "../../../../infra/repositories/applicant-repository";
import { CreateApplicantDTO } from "./create-applicant-dto";

export class CreateApplicantUseCase {
    constructor(private applicantRepository: ApplicantRepository) {}

    async perform(applicantData: CreateApplicantDTO) {
        const emailIsAlreadyRegistred = await this.applicantRepository.getApplicantBy(applicantData.email);

        if (emailIsAlreadyRegistred) {
            throw new Error("Email is already been used");
        }

        const hashedPassword = await hash(applicantData.password, 10);

        const result = await this.applicantRepository.createAnApplicant({ ...applicantData, password: hashedPassword });

        return result;
    }
}
