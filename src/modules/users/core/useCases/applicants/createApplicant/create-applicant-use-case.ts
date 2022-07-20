import { ApplicantRepository } from "../../../../infra/repositories/applicant-repository";
import { CryptoService } from "../../../../infra/service/crypto/crypto-service";
import { CreateApplicantDTO } from "./create-applicant-dto";

export class CreateApplicantUseCase {
    constructor(private applicantRepository: ApplicantRepository, private crypto: CryptoService) {}

    async perform(applicantData: CreateApplicantDTO) {
        const emailIsAlreadyRegistred = await this.applicantRepository.getApplicantBy(applicantData.email);

        if (emailIsAlreadyRegistred) {
            throw new Error("Email invalid or is already been used");
        }

        const hashedPassword = await this.crypto.hashPassword(applicantData.password);

        const result = await this.applicantRepository.createAnApplicant({ ...applicantData, password: hashedPassword });

        return result;
    }
}
