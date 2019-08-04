// @flow
export type Transaction = {
    amount: number,
    date: string,
    type: 'DEPOSIT' | 'WITHDRAWAL'
}

export type Account = {
    listTransactions: Transaction[]
}

/******* Utils ********/
function makeTransaction(account: Account, transaction: Transaction): Account {
    account.listTransactions.push(transaction);
    return account;
}

function dateToString(date) {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

/******* API ******/
function deposit(account: Account, amount: number) {
    const transaction: Transaction = { amount, date: exportFunctions.dateToString(new Date()), type: 'DEPOSIT' };
    return exportFunctions.makeTransaction(account, transaction);
}

function withdraw(account: Account, amount: number) {
    const transaction: Transaction = { amount, date: exportFunctions.dateToString(new Date()), type: 'WITHDRAWAL' };
    return exportFunctions.makeTransaction(account, transaction);
}

function printStatement(account: Account): string[] {
    const firstLine = 'DATE       | AMOUNT  | BALANCE';
    let balance: number = 0;
    const statementLines: string[] = account.listTransactions.map((transaction: Transaction) => {
        const amount = transaction.type === 'DEPOSIT' ? transaction.amount : -transaction.amount;
        balance += amount;
        return transaction.date
            + " | "
            + amount.toFixed(2)
            + " | "
            + balance.toFixed(2)
    }).reverse();
    return [firstLine, ...statementLines];
}

/******* Export functions *******/
const exportFunctions = {
    makeTransaction,
    dateToString,
    deposit,
    withdraw,
    printStatement
};
export default exportFunctions;