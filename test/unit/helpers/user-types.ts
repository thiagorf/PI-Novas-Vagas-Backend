import { Jobs } from "../../../src/modules/jobs/core/entity/Jobs";
import { Applicants } from "../../../src/modules/users/core/entity/Applicants";

type UserData = {
    name: string;
    email: string;
    password: string;
};

type ApplicantJobs = Jobs & {
    enterprise: {
        name: string;
    };
};

export interface ApplicantInformation extends Applicants {
    user?: UserData;
    jobs?: ApplicantJobs[];
}
