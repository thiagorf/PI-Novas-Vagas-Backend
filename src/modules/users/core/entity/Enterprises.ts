import { Jobs } from "../../../jobs/core/entity/Jobs";

export interface Enterprise {
    id: number;
    cnpj: string;
    segment: string;
    cep: number;
    user_id: number;
}

export type EnterpriseJobs = Jobs & {
    enterprise: {
        name: string;
    };
};

export interface EnterpriseAllJobs {
    id: number;
    cnpj: string;
    segment: string;
    cep: number;
    user_id: number;
    jobs: EnterpriseJobs[];
}
