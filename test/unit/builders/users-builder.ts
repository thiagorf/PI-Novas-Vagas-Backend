import { Users } from "../../../src/modules/users/core/entity/Users";

export class UsersBuilder {
    private users: Users = {
        id: 0,
        name: "John Doe",
        email: "john@gmail.com",
        password: "1234",
        type: "applicant",
    };

    public static aUser() {
        return new UsersBuilder();
    }

    public withEnterpriseInfo() {
        this.users = {
            id: 0,
            name: "EnterpriseX",
            email: "xenterprise@gmail.com",
            password: "1234",
            type: "enterprise",
        };

        return this;
    }

    public withAnotherEmail() {
        this.users.email = "doe@gmail.com";

        return this;
    }

    public withHashedPassword() {
        this.users.password += "Hash";

        return this;
    }

    public build() {
        return this.users;
    }
}
