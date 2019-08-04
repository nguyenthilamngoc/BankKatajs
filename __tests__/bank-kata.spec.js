// @flow

import type { Transaction, Account } from '../bank-kata';
import { makeTransaction, printStatement } from '../bank-kata';

describe('Bank kata', () => {
    it('should make a deposit on the account', () => {
        //given
        const depositTr: Transaction = { amount: 1000, date: '03/08/2019', type: 'DEPOSIT' }
        const account: Account = { listTransactions: [] };

        //when
        const updatedAccount = makeTransaction(account, depositTr);

        //then
        expect(updatedAccount.listTransactions).toHaveLength(1);
        expect(updatedAccount.listTransactions[0]).toEqual(depositTr);
    });

    it('should make a withdrawal from the account', () => {
        //given
        const withdrawalTr: Transaction = { amount: 100, date: '03/08/2019', type: 'WITHDRAWAL' }
        const depositTr: Transaction = { amount: 1000, date: '03/08/2019', type: 'DEPOSIT' }
        const account: Account = { listTransactions: [depositTr] };

        //when
        const updatedAccount = makeTransaction(account, withdrawalTr);

        //then
        expect(updatedAccount.listTransactions).toHaveLength(2);
        expect(updatedAccount.listTransactions[1]).toEqual(withdrawalTr);
    });

    it('should print the history of account', () => {
        //given
        const withdrawalTr3: Transaction = { amount: 200, date: '04/08/2019', type: 'WITHDRAWAL' }
        const withdrawalTr2: Transaction = { amount: 100, date: '03/08/2019', type: 'WITHDRAWAL' }
        const depositTr1: Transaction = { amount: 1000, date: '01/08/2019', type: 'DEPOSIT' }
        const account: Account = { listTransactions: [depositTr1, withdrawalTr2, withdrawalTr3] };

        //when
        const linesToPrint = printStatement(account);

        //then
        expect(linesToPrint[0]).toEqual('DATE       | AMOUNT  | BALANCE');
        expect(linesToPrint[1]).toEqual('04/08/2019 | -200.00 | 700.00');
        expect(linesToPrint[2]).toEqual('03/08/2019 | -100.00 | 900.00');
        expect(linesToPrint[3]).toEqual('01/08/2019 | 1000.00 | 1000.00');

    });
});


