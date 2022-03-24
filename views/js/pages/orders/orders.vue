<template>
    <div>
        <h1 class="subheading grey--text"> Orders To Accept </h1>
        <v-container fluid class="my-5">
            <v-card flat class="pa-3 " v-for="proect in products" :key="proect._id">
            <v-hover>    
            <v-row no-gutters :class="'pa-3 works '+proect.statusId.name" @click="showDialog(proect)"> 
                <v-col class="md-2">
                    <div class="caption grey--text"> Product Name </div>
                    <div> {{proect.name}} </div>
                </v-col>
                <v-col class="md-2">
                    <div class="caption grey--text"> Owner  </div>
                    <div> {{proect.sender!=undefined ?proect.sender.name : ""}} </div>
                </v-col>
                <v-col class="md-2">
                    <div class="caption grey--text"> Updated Time </div>
                    <div> {{proect.updatedAt}} </div>
                </v-col>
                <v-col class="md-2">
                    <div class="caption grey--text"> Status </div>
                    <div> 
                        <v-chip :class="''+proect.statusId.name+' white--text caption py-2'"> {{proect.statusId.name}} </v-chip>
                    </div>
                </v-col>                                                
            </v-row>
            </v-hover>
            </v-card>
        </v-container>




  <v-row justify="center">

    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar
          dark
          color="primary"
        >
          <v-btn
            icon
            dark
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              color="primary"
              text
              :disabled="enabled"
              :loading="loading"
              @click="dialog = false"
            >
              Save
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list
          three-line
          subheader
        >
          <v-subheader>Product Controls</v-subheader>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Product Name</v-list-item-title>
              <v-list-item-subtitle>
                  <v-text-field
                  v-model="form.name"
                  >
                  </v-text-field>
                
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Description</v-list-item-title>
              <v-list-item-subtitle> 
                  <v-text-field
                  v-model="form.description"
                  >
                  </v-text-field>

               </v-list-item-subtitle>


            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>

        <v-list
          three-line
          subheader
        >
          <v-subheader>Images</v-subheader>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Product Images</v-list-item-title>
              <!-- <v-list-item-subtitle>{{form.name}}</v-list-item-subtitle> -->
                <v-img
                :lazy-src="'http://127.0.0.1:3000/files/'+form.images"
                max-height="150"
                max-width="250"
                :src="'http://127.0.0.1:3000/'+form.images"
                ></v-img>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>

      <v-radio-group
        v-model="form.statusId._id"
        mandatory
        @change="enabled=false"
      >

        <v-list
          three-line
          subheader
        >
          <v-subheader>Status</v-subheader>
          <v-list-item>
            <v-list-item-action>
              <v-radio value="2" :disabled="$role != 'Admin'">   </v-radio>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Accept</v-list-item-title>
              <v-list-item-subtitle>  When Accept The This Order Rendering Message To Sender </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-action>
              <v-radio value="3" :disabled="$role != 'Admin'">   </v-radio>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Reject</v-list-item-title>
              <v-list-item-subtitle> When Reject This Order Rendering Message To Sender And He Can Update Again  </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-action>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Note For Sender</v-list-item-title>
              <v-list-item-subtitle>
                
                <v-textarea
                  label="Email Note "
                  v-model="form.note"
                  :disabled="$role != 'Admin'"
                ></v-textarea>

              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-action>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
              
                <v-btn elevation="2" color="primary" :disabled="enabled" :loading="loading"  @click="updateProduct()"> Save  </v-btn>                    
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
    </v-radio-group>              

      </v-card>
    </v-dialog>
  </v-row>




    </div>
</template>


<script>
export default {
    data(){
        return{
            products:[],
            dialog:false,
            loading:false,
            enabled:true,
            form:new Form({
                _id:'',
                name:'',
                description:'',
                images:[],
                statusId:'',
                note:''
            }),
            projects:[
                { title:" Create new Project ",teams:"Alrasheed , Mohammed , Mustafa",due:"1st jan 2019",status:"complete" },
                { title:" Application Flutter ",teams:"Alrasheed , Mohammed , Mustafa",due:"1st jan 2020",status:"ongoin" },
                { title:" Nefty ",teams:"Alrasheed , Mohammed , Mustafa",due:"1st jan 2020",status:"overtest" },
                { title:" Discound App ",teams:"Alrasheed , Mohammed , Mustafa",due:"1st jan 2021",status:"ongoin" },
                { title:" Makank App  ",teams:"Alrasheed , Mohammed , Mustafa",due:"1st jan 2021",status:"ongoin" }
            ]
        }
    },

    methods:{
    
    showDialog(data){
        if(this.$role != 'Admin' )
          this.enabled = false
        this.form.fill(data)
        this.dialog=true;   
        // console.log(this.)
    },

    loadProducts(){
        // if(this.$gate.isAdminOrAuther()){
        this.$http.get('api/admin/orders')
        .then(({data})=>{
            this.products=data.products.docs
            this.totalDocs = this.products.totalPages;
            this.limit=this.products.limit;
            this.chunk=data.products.totalPages
            // console.log(this.products.totalDocs)
        })
    },

      updateProduct(id){
        this.loading=true
        if(this.$role == 'Admin')
        var url = 'orders'
        else
        var url = 'products'

        this.$http.put('http://127.0.0.1:3000/api/admin/'+url+'/'+this.form._id,
        {
          name:this.form.name,
          description : this.form.description,
          statusId:this.form.statusId._id,
          note:this.form.note
        },
        )
          .then(()=>{
              this.loading=false
              this.dialog = false;
              Swal.fire('Updated!','Orders Updated','success')
              Fire.$emit('AfterCreated')
              // this.$Progress.finish()
          })
          .catch(()=>{
              Swal.fire('Failed','There was Somthing Wrong ','warning')
              // this.$Progress.finish()
          })
      },

    },

        created() {
            //this.$Progress.start();
            this.loadProducts()
            Fire.$on('AfterCreated',()=>{
                this.loadProducts()
            })
        }
}
</script>



<style >
.works.accept{
    border-left:4px solid #3cd1c2 ;
}
.works.new{
    border-left:4px solid orange ;
}
.works.updated{
    border-left:4px solid orange ;
}
.works.reject{
    border-left:4px solid tomato ;
}


.v-chip.accept{
    background: #3cd1c2 !important;
}
.v-chip.updated{
    background: orange !important;
}
.v-chip.new{
    background: orange !important;
}
.v-chip.reject{
    background: tomato!important;
}
</style>