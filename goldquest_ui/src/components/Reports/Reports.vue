<template>
  <section id="reports" class="text-left fade-in">    
        <b-row align="left">
            <b-col><h2 class="header text-left">Reports</h2></b-col>
        </b-row>
        <b-row>
            <b-col class="card-deck">
                <b-card align="left">
                    <b-row>
                        <b-col>
                            <h4><router-link to="reports/transactions">Transactions</router-link></h4>
                        </b-col>
                    </b-row>
                </b-card>

                <b-card align="left">
                    <b-row>
                        <b-col>
                            <h4><router-link to="reports/inventory">Inventory</router-link></h4>
                        </b-col>
                    </b-row>
                </b-card>

                <b-card align="left">
                    <b-row>
                        <b-col>
                            <h4><router-link to="reports/shipments">Sales / Shipments</router-link></h4>
                        </b-col>
                    </b-row>
                </b-card>
            </b-col>
        </b-row>
        <div class="w-100" style="height: 20px"></div>
        <b-row>
            <b-col class="card-deck">
                <b-card align="left">
                    <b-row>
                        <b-col>
                            <h4><router-link to="reports/profit-loss">Profit / Loss</router-link></h4>
                        </b-col>
                    </b-row>
                </b-card>

                <b-card align="left">
                    <b-row class="d-none">
                        <b-col>
                            <h4>Employee Performance</h4>
                        </b-col>
                    </b-row>
                </b-card>

                <b-card align="left">
                    <b-row class="d-none">
                        <b-col>
                            <h4>Store Comparisons</h4>
                        </b-col>
                    </b-row>
                </b-card>
            </b-col>
        </b-row>
  </section>
</template>
