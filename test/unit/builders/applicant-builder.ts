import { Applicants } from "../../../src/modules/users/core/entity/Applicants";
import { Users } from "../../../src/modules/users/core/entity/Users";
import { UsersBuilder } from "./users-builder";

export class ApplicantBuilder {
    private user: Users = UsersBuilder.aUser().build();
    private applicant: Applicants = {
        id: 0,
        curriculum: "curriculum url",
        photo: "photo url",
        user_id: this.user.id,
    };

    public static aApplicant() {
        return new ApplicantBuilder();
    }

    public build() {
        return this.applicant;
    }
}
