<template>
  <section id="admin" class="text-left"> 
        <b-row align="left">
            <b-col>
                <h2 class="header">Admin</h2>
            </b-col>
        </b-row>    
        <div class="card-deck">
            <b-card>
                <h4><router-link to="admin/stores"> Manage Stores</router-link></h4>
            </b-card>
            <b-card>
                <h4 class="d-none">System Settings</h4>
            </b-card>
            <b-card>
                <h4 class="d-none">Manage Users</h4>
            </b-card>
        </div>
  </section>
</template>
