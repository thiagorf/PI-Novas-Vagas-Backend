import { Jobs } from "../../../src/modules/jobs/core/entity/Jobs";
import { ApplicantJobs, Applicants } from "../../../src/modules/users/core/entity/Applicants";
import { Enterprise } from "../../../src/modules/users/core/entity/Enterprises";

type UserData = {
    id?: number;
    name?: string;
    email?: string;
    password?: string;
    type?: "applicant" | "enterprise";
};

export interface ApplicantInformation extends Applicants {
    user?: UserData;
    jobs?: ApplicantJobs[];
}

export interface EnterpriseInformation extends Enterprise {
    user?: UserData;
    jobs?: ApplicantJobs[];
}

export interface JobsApplicants extends Jobs {
    applicants: {
        curriculum: string;
        photo: string;
        user: UserData;
    }[];
}
