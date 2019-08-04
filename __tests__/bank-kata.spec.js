// @flow

import type { Transaction, Account } from '../bank-kata';
// import * as BankKata from '../bank-kata';
import BankKata from '../bank-kata';

describe('Bank kata', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should make a deposit transaction on the account', () => {
        //given
        const depositTr: Transaction = { amount: 1000, date: '03/08/2019', type: 'DEPOSIT' }
        const account: Account = { listTransactions: [] };

        //when
        const updatedAccount = BankKata.makeTransaction(account, depositTr);

        //then
        expect(updatedAccount.listTransactions).toHaveLength(1);
        expect(updatedAccount.listTransactions[0]).toEqual(depositTr);
    });

    it('should make a deposit on the account', () => {
        //given
        const depositAmount = 1000;
        const today = '03/08/2019';
        jest.spyOn(BankKata, 'dateToString').mockReturnValue(today);
        const account: Account = { listTransactions: [] };

        //when
        const updatedAccount = BankKata.deposit(account, depositAmount);

        //then
        expect(updatedAccount.listTransactions).toHaveLength(1);
        expect(updatedAccount.listTransactions[0].amount).toEqual(depositAmount);
        expect(updatedAccount.listTransactions[0].date).toEqual(today);
        expect(updatedAccount.listTransactions[0].type).toEqual('DEPOSIT');
    });

    it('should make a withdrawal transaction from the account', () => {
        //given
        const withdrawalTr: Transaction = { amount: 100, date: '03/08/2019', type: 'WITHDRAWAL' }
        const depositTr: Transaction = { amount: 1000, date: '03/08/2019', type: 'DEPOSIT' }
        const account: Account = { listTransactions: [depositTr] };

        //when
        const updatedAccount = BankKata.makeTransaction(account, withdrawalTr);

        //then
        expect(updatedAccount.listTransactions).toHaveLength(2);
        expect(updatedAccount.listTransactions[1]).toEqual(withdrawalTr);
    });

    it('should make a withdrawal from the account', () => {
        //given
        const withdrawalAmount = 100;
        const today = '03/08/2019';

        jest.spyOn(BankKata, 'dateToString').mockReturnValue(today);
        const depositTr: Transaction = { amount: 1000, date: today, type: 'DEPOSIT' }
        const account: Account = { listTransactions: [depositTr] };

        //when
        const updatedAccount = BankKata.withdraw(account, withdrawalAmount);

        //then
        expect(updatedAccount.listTransactions).toHaveLength(2);
        expect(updatedAccount.listTransactions[1].amount).toEqual(withdrawalAmount);
        expect(updatedAccount.listTransactions[1].date).toEqual(today);
        expect(updatedAccount.listTransactions[1].type).toEqual('WITHDRAWAL');

    });

    it('should return date format dd/MM/yyy', () => {
        //given
        const today = new Date('2019-08-03T03:24:00');
        //when
        const todayStr = BankKata.dateToString(today);
        //then
        expect(todayStr).toEqual('03/08/2019');
    });

    it('should return the history of account', () => {
        //given
        const withdrawalTr3: Transaction = { amount: 200, date: '04/08/2019', type: 'WITHDRAWAL' }
        const withdrawalTr2: Transaction = { amount: 100, date: '03/08/2019', type: 'WITHDRAWAL' }
        const depositTr1: Transaction = { amount: 1000, date: '01/08/2019', type: 'DEPOSIT' }
        const account: Account = { listTransactions: [depositTr1, withdrawalTr2, withdrawalTr3] };

        //when
        const linesToPrint = BankKata.printStatement(account);

        //then
        expect(linesToPrint[0]).toEqual('DATE       | AMOUNT  | BALANCE');
        expect(linesToPrint[1]).toEqual('04/08/2019 | -200.00 | 700.00');
        expect(linesToPrint[2]).toEqual('03/08/2019 | -100.00 | 900.00');
        expect(linesToPrint[3]).toEqual('01/08/2019 | 1000.00 | 1000.00');

    });
});


