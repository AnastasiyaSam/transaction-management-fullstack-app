<template>
  <div>
    <div class="main-container">
      <div class="submit-transaction">
        <h1> Submit new transaction</h1>
        <form @submit.prevent="submitForm">
          <span>
            <label for="accountId">Account ID</label>
            <input data-type="account-id" name="accountId" required v-model="accountId" label="accountId" />
          </span>
          <span>
            <label for="amount">Amount</label>
            <input data-type="amount" type="number" name="amount" required v-model="amount" />
          </span>
          <input data-type="transaction-submit" type="submit" class="submit-btn" />
        </form>
      </div>
      <div class="transaction-history">
        <div class="transaction-history-wrapper">
          <h1> Transaction history 💸💸💸</h1>
          <div class="cards-scroll-wrapper">
            <div class="cards-reversed-wrapper">
              <div v-for="(item, index) in arrayOfTransactions" :key="index">
                <div data-type="transaction" :data-account-id="`${item.account_id}`" :data-amount="`${item.amount}`"
                  :data-balance="`${item.balance}`"
                  :class="item.amount >= 0 ? 'card positive-balance' : 'card negative-balance'">
                  <p v-if="item.amount >= 0"> Transferred {{ item.amount }}$ to account {{ item.account_id }}</p>
                  <p v-else> Transferred {{ -item.amount }}$ from account {{ item.account_id }}</p>
                  <p v-if="index === arrayOfTransactions.length - 1"
                    :style="item.balance >= 0 ? 'color: green' : 'color: red'">
                    The current account balance is {{ item.balance }}$
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import axios from 'axios';
import type { FrontendTransactionPayload, Transaction } from '@/types/types';
export default {

  data() {
    return {
      accountId: '' as string,
      amount: null,
      arrayOfTransactions: [] as Transaction[]
    };
  },
  async mounted() {
    try {
      const { data: transactions } = await axios.get<Transaction[]>('http://localhost:5000/transactions');
      this.arrayOfTransactions = transactions;
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  },
  methods: {
    async submitForm() {
      try {
        const payload: FrontendTransactionPayload = {
          account_id: this.accountId,
          amount: +(this.amount ?? 0)
        };
        const { data: newTransaction } = await axios.post<Transaction>('http://localhost:5000/transactions', payload);

        // Update frontend array to skip an extra fetch of the transactions GET
        this.arrayOfTransactions.push(newTransaction);

        // Reset to initial values
        this.accountId = '';
        this.amount = null;
      } catch (error) {
        console.error('Error submitting transaction:', error);
      }
    }
  }
};
</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
}

/* Left side */
.submit-transaction {
  width: 50%;
  max-width: 450px;
  margin-left: 32px;
}

.submit-transaction form {
  display: flex;
  flex-direction: column;
}

.submit-transaction input {
  margin: 10px 0px;
  height: 32px;
  border-radius: 8px;
  border: gray 1px solid;
}

.submit-btn {
  background: #2c3539;
  color: white;
}


.submit-transaction span {
  display: flex;
  flex-direction: column;
}

/* Right side */
.transaction-history {
  margin-left: 32px;
  background: #C8E7ED;
  width: 50%;
  border-radius: 8px;
}

.transaction-history-wrapper {
  margin: 10px 32px;
}

.transaction-history-wrapper h1 {
  margin-top: 15.5px;
}

.cards-reversed-wrapper {
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
}

.cards-scroll-wrapper {
  height: 83vh;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.cards-scroll-wrapper ::-webkit-scrollbar {
  display: none;
}

.card {
  padding: 10px 20px;
  margin: 12px 0px;
  border-radius: 10px;
}

.transaction-history .positive-balance {
  background: #A6CDB5;
}

.transaction-history .negative-balance {
  background: #F0C5C6;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

@media screen and (max-width: 500px) {
  .main-container {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
  }

  .submit-transaction {
    width: 90%;
    margin-bottom: 2%;
    text-align: center;
    margin-bottom: 4%;
    margin: 0 auto;
  }

  h1 {
    text-align: center;
  }

  label {
    text-align: left;
  }

  .transaction-history {
    width: 90%;
    margin: 25px auto;
  }
}
</style>

<style>
body {
  background-color: #FFEAEC;
}
</style>
