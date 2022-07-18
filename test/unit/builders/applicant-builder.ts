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

    public withUserId(user_id: number) {
        this.applicant.user_id = user_id;

        return this;
    }

    public build() {
        return this.applicant;
    }
}
