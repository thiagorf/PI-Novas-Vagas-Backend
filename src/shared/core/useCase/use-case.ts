
export interface UseCase<IRequest, IResponse> {
    perform(data?: IRequest): Promise<IResponse>
}