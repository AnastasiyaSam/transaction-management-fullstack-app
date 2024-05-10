export interface Transaction{
    account_id: string
    amount: number
    transaction_id: string
    balance: number
}

export interface FrontendTransactionPayload{
    account_id: string
    amount: number
}