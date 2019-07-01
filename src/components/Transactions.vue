<template>
    <div>
        <div class="handler">
            <h3 class="text-center">Add a transaction</h3>
            <form @submit.prevent="addTransaction">
                <label><input v-model="amount" placeholder="amount"></label>
                <button type="submit">Add</button>
            </form>
            <button type="submit" @click="showAllTransactions()">Show All Transactions</button>
        </div>
        <h3 class="text-center">Transactions</h3>
        <table class="blueTable">
            <tbody>
            <tr>
                <td>Transaction Id</td>
                <td>Customer Id</td>
                <td>Amount</td>
                <td>Date</td>
            </tr>
            <tr v-for="result in transactions">
                <td>
                    <a class="clickable" @click="filterTransaction(result.transactionId, result.customerId)"><p>{{
                        result.transactionId
                        }}</p></a>
                </td>
                <td>
                    {{ result.customerId }}
                </td>
                <td>
                    {{ result.amount }}
                </td>
                <td>
                    {{ result.date }}
                </td>
                <td>
                    <button @click="deleteTransaction(result.transactionId)">Delete</button>
                </td>
            </tr>
            </tbody>
        </table>
        <div v-if="!transactions.length">Oops! You don't have any transaction yet!</div>
    </div>
</template>

<script>
    import axios from 'axios'


    export default {
        name: 'transaction',
        data() {
            return {
                transactions: [],
            }
        },
        methods: {
            fetchTransactions() {
                axios.get("http://localhost:8000/api/transaction", {
                    headers: {
                        "Accept": 'application/json',
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + this.$store.state.token
                    }
                }).then(response => {
                    this.transactions = response.data.data;
                });
            },
            addTransaction() {
                axios.post("http://localhost:8000/api/transaction/create", {'amount': this.amount}, {
                    headers: {
                        "Accept": 'application/json',
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + this.$store.state.token
                    }
                }).then(response => {
                    this.fetchTransactions();
                });
            },
            deleteTransaction(transactionId) {
                var url = 'http://localhost:8000/api/transaction/' + transactionId + '/delete'
                axios.delete(url, {
                    headers: {
                        "Accept": 'application/json',
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + this.$store.state.token
                    }
                }).then(response => {
                    this.fetchTransactions();
                });
            },
            filterTransaction(transactionId, customerId) {
                var url = 'http://localhost:8000/api/transaction/' + transactionId + '/' + customerId;
                axios.get(url, {
                    headers: {
                        "Accept": 'application/json',
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + this.$store.state.token
                    }
                }).then(response => {
                    this.transactions = [response.data.data];
                });
            },
            showAllTransactions() {
                this.fetchTransactions();
            }
        },
        created() {
            this.fetchTransactions(); //preferably need to wait here wait for response
        }
    }
</script>

<style>
    .clickable{
        color: red;
        text-decoration: none;
        text-transform: uppercase;
    }
    .clickable:hover{
        cursor: pointer;
    }
    .handler{
        width: 500px;
        margin: 100px auto;
    }
    .error {
        color: red;
    }

    table.blueTable {
        border: 1px solid #1C6EA4;
        background-color: #EEEEEE;
        width: 75%;
        margin: auto;
        text-align: left;
        border-collapse: collapse;
    }

    table.blueTable td, table.blueTable th {
        border: 1px solid #AAAAAA;
        padding: 3px 2px;
    }

    table.blueTable tbody td {
        font-size: 13px;
    }

    table.blueTable tr:nth-child(even) {
        background: #D0E4F5;
    }

    table.blueTable thead {
        background: #1C6EA4;
        background: -moz-linear-gradient(top, #5592bb 0%, #327cad 66%, #1C6EA4 100%);
        background: -webkit-linear-gradient(top, #5592bb 0%, #327cad 66%, #1C6EA4 100%);
        background: linear-gradient(to bottom, #5592bb 0%, #327cad 66%, #1C6EA4 100%);
        border-bottom: 2px solid #444444;
    }

    table.blueTable thead th {
        font-size: 15px;
        font-weight: bold;
        color: #FFFFFF;
        border-left: 2px solid #D0E4F5;
    }

    table.blueTable thead th:first-child {
        border-left: none;
    }

    table.blueTable tfoot {
        font-size: 14px;
        font-weight: bold;
        color: #FFFFFF;
        background: #D0E4F5;
        background: -moz-linear-gradient(top, #dcebf7 0%, #d4e6f6 66%, #D0E4F5 100%);
        background: -webkit-linear-gradient(top, #dcebf7 0%, #d4e6f6 66%, #D0E4F5 100%);
        background: linear-gradient(to bottom, #dcebf7 0%, #d4e6f6 66%, #D0E4F5 100%);
        border-top: 2px solid #444444;
    }

    table.blueTable tfoot td {
        font-size: 14px;
    }

    table.blueTable tfoot .links {
        text-align: right;
    }

    table.blueTable tfoot .links a {
        display: inline-block;
        background: #1C6EA4;
        color: #FFFFFF;
        padding: 2px 8px;
        border-radius: 5px;
    }
</style>
