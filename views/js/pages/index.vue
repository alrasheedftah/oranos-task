<template>
<div>
    <v-container>
    <v-row>
    <v-col v-for="(item , index) in products" :key="index" 
    cols="12"
    sm="4"
    >    
      <v-hover v-slot="{ hover }">
    <v-card
      class="mx-auto"
      color="grey lighten-4"
      max-width="600"
      
    >
      <v-img
        :aspect-ratio="16/9"
        :src="'http://127.0.0.1:3000/files/'+item.images"
      >
        <v-expand-transition>
          <div
          v-if="hover"
            class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal text-h2 white--text"
            style="height: 100%;"
          >
            $14.99 
          </div>
        </v-expand-transition>
      </v-img>
      <v-card-text
        class="pt-6"
        style="position: relative;"
      >
        <v-btn
          absolute
          color="orange"
          class="white--text"
          fab
          large
          right
          top
        >
          <v-icon>mdi-cart</v-icon>
        </v-btn>
        <div class="font-weight-light grey--text text-h6 mb-2">
          {{ item.name }}
        </div>
        <h3 class="text-h4 font-weight-light orange--text mb-2">
          {{ item.statusId.name }}
        </h3>
        <div class="font-weight-light text-h6 mb-2">
          {{ item.description }}
        </div>
      </v-card-text>
    </v-card>
      </v-hover>
    </v-col>
    </v-row>
    </v-container>
</div>
</template>

<script>
export default {
    

    data () {
      return {
        loading:true,  
        products:[],
      }
    },

    methods:{
    loadProducts(){
        // if(this.$gate.isAdminOrAuther()){
        this.$http.get('api/front/products')
        .then(({data})=>{
            this.products=data.products.docs
            this.totalDocs = this.products.totalPages;
            this.limit=this.products.limit;
            this.chunk=data.products.totalPages
            this.loading=false
            console.log(this.products)
        })
    },
    },
            created() {
            //this.$Progress.start();
            this.loadProducts()

    }



}
</script>




<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .5;
  position: absolute;
  width: 100%;
}
</style>