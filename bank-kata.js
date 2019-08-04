// @flow
export type Transaction = {
    amount: number,
    date: string,
    type: 'DEPOSIT' | 'WITHDRAWAL'
}

export type Account = {
    listTransactions: Transaction[]
}

export function makeTransaction(account: Account, transaction: Transaction): Account {
    account.listTransactions.push(transaction);
    return account;
}

export function printStatement(account) {
    let linesToPrint: string[] = [];
    const firstLine = 'DATE       | AMOUNT  | BALANCE';

    let balance = 0;
    const lines = account.listTransactions.map((transaction: Transaction) => {
        const amount = transaction.type === 'DEPOSIT' ? transaction.amount : -transaction.amount;
        balance += amount;
        return transaction.date
            + " | "
            + amount.toFixed(2)
            + " | "
            + balance.toFixed(2)
    }).reverse();
    linesToPrint = [firstLine, ...lines];
    return linesToPrint;
}