<template>
  <nav>
    <v-app-bar elevation="0" app> 
      <v-app-bar-nav-icon class="grey--text" @click.stop="drawer=!drawer"></v-app-bar-nav-icon>
      <v-app-bar-title class="text-upercase grey--text"> 
        <span class="">CV</span>
        <span class="font-weight-bold">Alrasheed</span>
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn class="" depressed> 
        <span> GitHub </span>
        <!-- <v-icon>mdi-go</v-icon> -->
      </v-btn>

    <v-btn class="" depressed v-if="isLoggin" @click="logout"> 
        <span> Logout </span>
        <!-- <v-icon>mdi-go</v-icon> -->
      </v-btn>
      <v-btn class="" depressed v-if="!isLoggin"  @click="loging"> 
        <span> Loging </span>
        <!-- <v-icon>mdi-go</v-icon> -->
      </v-btn>

    </v-app-bar>

  <v-navigation-drawer absolute
      expand-on-hover
      temporary
      floating
      class="blue darken-4"
      v-model="drawer">
    <v-list shaped nav class="mt-2">
      <v-list-item-group
        v-model="selectedItem"
        active-class="primary"
      >
      <v-list-item v-for="item in items" :key="item.title" router :to="item.path">
         <v-list-item-icon>
           <v-icon class="white--text">{{item.icon}}</v-icon>
         </v-list-item-icon> 
         <v-list-item-title class="white--text"> {{item.title}} </v-list-item-title>
      </v-list-item>

        <!-- </v-list-item-content> -->
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>


  </nav>
</template>



<script>
  export default {
    data () {
      return {
        selectedItem:0,
        isLoggin:false,
        drawer:false,
        items: [
          { title: 'home', icon: 'mdi-gavel' ,path:"/"},
          { title: 'Contact', icon: 'mdi-gavel' ,path:"/contact"},
        ],
      }
    },

    methods:{
      logout(){
       localStorage.removeItem("token"); 
       localStorage.removeItem("role"); 
          this.isLoggin=false   
          this.$token=null;
          this.$role=null;
              this.$http.headers={
                'Autherization':'Bearer '
              };          
          this.$router.push('/login');
      },

      loging(){
          this.$router.push('/login');
      },
      isLogginUser(){
          if(localStorage.getItem("token") == null){
            this.isLoggin=false;
          }else
            this.isLoggin=true;

      },

      createSideBar(){
        if(this.$role  == 'Admin')
        this.items = [
          { title: 'home', icon: 'mdi-gavel' ,path:"/"},
          { title: 'Users', icon: 'mdi-view-dashboard',path:"/users" },
          { title: 'Products history ', icon: 'mdi-account-box' ,path:"/products"},
          { title: 'Orders ', icon: 'mdi-gavel' ,path:"/orders"},
          { title: 'Contact', icon: 'mdi-gavel' ,path:"/contact"},

        ]

        else if( this.$role == 'Sender'){
        this.items = [
          { title: 'home', icon: 'mdi-gavel' ,path:"/"},
          { title: 'Products history ', icon: 'mdi-account-box' ,path:"/products"},
          { title: 'Orders ', icon: 'mdi-gavel' ,path:"/orders"},
          { title: 'Contact', icon: 'mdi-gavel' ,path:"/contact"},
        ]
        }
      }

    },

    created(){
      console.log(this.$role)
        Fire.$on('Loggedin',()=>{
          this.createSideBar()
        })      
          this.createSideBar()
       this.isLogginUser() 
    }
  }
</script>