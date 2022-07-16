import { ApplicantJobs, Applicants } from "../../../src/modules/users/core/entity/Applicants";

type UserData = {
    name: string;
    email: string;
    password: string;
};

export interface ApplicantInformation extends Applicants {
    user?: UserData;
    jobs?: ApplicantJobs[];
}
