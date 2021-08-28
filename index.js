


class Account {

  constructor(username) {
    this.username = username;
    // Have the account balance start at $0 since that makes more sense.
    this.transactions = [];
  }

  get balance() {
    // Calculate the balance using the transaction objects.
    let balance = 0;
  //  console.log(this.transactions);
    for (let t of this.transactions) {
    	balance += t.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}


class Transaction {

  constructor(amount, account) {
    this.amount  = amount;
    this.account = account;
  }
  commit(){
    if (!this.isAllowed()) return false;
    this.time = new Date();
    // Add the transaction to the account
    this.account.addTransaction(this);
  }
}

class Withdrawal extends Transaction {


  get value() {
    return (-this.amount);
  }
  isAllowed() {
    // note how it has access to this.account b/c of parent
    return (this.account.balance - this.amount >= 0);
  }
}

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }
  isAllowed() {
    // deposits always allowed thanks to capitalism.
    return true;
  }

}

const myAccount = new Account("snow-patrol");
// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

t1 = new Withdrawal(50.25,myAccount);
t1.value;
t1.commit();
//t1.balance;
console.log('Starting Balance:', myAccount.balance);


t3 = new Deposit(120.00,myAccount);
t3.value;
t3.commit();
//t3.balance;
console.log('Ending Balance:', myAccount.balance);
