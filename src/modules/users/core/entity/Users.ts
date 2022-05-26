export interface Users {
    id: number;
    name: string;
    email: string;
    password: string;
    type: "applicant" | "enterprise";
}
