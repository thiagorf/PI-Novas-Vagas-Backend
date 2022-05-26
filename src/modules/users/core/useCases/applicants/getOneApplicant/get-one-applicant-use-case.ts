import { ApplicantRepository } from "../../../../infra/repositories/applicant-repository";

export class GetOneApplicantUseCase {
    constructor(private applicantRepository: ApplicantRepository) {}
    async perform(applicant_id: number) {
        const applicant = await this.applicantRepository.getAllApplicantInfo(applicant_id);

        if (!applicant) {
            throw new Error("Invalid or inexisting applicant");
        }

        return applicant;
    }
}
