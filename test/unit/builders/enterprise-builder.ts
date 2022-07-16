import { Enterprise } from "../../../src/modules/users/core/entity/Enterprises";
import { Users } from "../../../src/modules/users/core/entity/Users";
import { UsersBuilder } from "./users-builder";

export class EnterpriseBuilder {
    private user: Users = UsersBuilder.aUser().withEnterpriseInfo().build();
    private enterprises: Enterprise = {
        id: 0,
        cep: 11111111,
        cnpj: "11111",
        segment: "credit card",
        user_id: this.user.id,
    };

    public static aEnterprise() {
        return new EnterpriseBuilder();
    }

    public withUserId(user_id: number) {
        this.enterprises.user_id = user_id;

        return this;
    }

    public build() {
        return this.enterprises;
    }
}
