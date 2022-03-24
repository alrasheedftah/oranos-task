<template>
    <div>
        <v-row justify="space-around">
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                  <h1 class="subheading grey--text"> All Products  </h1>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                  <v-btn
                    tile
                    class="grey--text"
                    color="indigo"
                    @click="showDialog(false,{_id:0})"
                  >
                    <v-icon left>
                      mdi-plus-thick
                    </v-icon>
                    Add Product
                  </v-btn>


              </v-col>
        </v-row>
        <v-container>
                <v-data-table
                    :headers="headers"
                    :items="products"
                    class="elevation-1"
                    :loading="loading"
                    loading-text="Loading... Please wait"
                >
                <template v-slot:[`item.statusId`] ="{ item }">
                <v-chip
                    :color="getColor(item.statusId._id)"
                    dark
                >
                    {{ item.statusId.name }}
                </v-chip>
                </template>
                

                <template v-slot:[`item.control`] ="{ item }">

          <v-chip
          v-if="item.statusId._id == 2 "
          close
          close-icon="mdi-close-outline"
          color="green"
          >
          Already Accepted
          </v-chip>
                  
    <v-btn
      class="mx-2"
      :disabled="item.statusId._id == 2 "
      fab
      dark
      small
      color="indigo"
      @click="item.statusId._id != 2 ? showDialog(true, item ) : null"
    >
      <v-icon dark>
        mdi-pencil
      </v-icon>
    </v-btn>

                </template>                
                
                </v-data-table>


        </v-container>
        <!-- <v-container fluid class="my-5" v-for="k in 3" :key="k">
            <v-row no-gutters :align="k==0?'start':k==1?'center':'end'"> 
                <v-col v-for="n in 3" :key="n">
                    <v-card class="pa-2"> One of Three Column </v-card>
                </v-col> 
            </v-row>
        </v-container> -->


  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >

      <v-card>
        <v-card-title>
          <span class="text-h5">Produuct Data</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row> 
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Product Name *"
                  required
                  v-model="form.name"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  label="Product Text Descriptions *"
                  required
                  v-model="form.description"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-file-input
                    @change="handleFile"
                    multiple
                    label="Plese SElect Files"
                  ></v-file-input>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="editeMode ? uploadFiles() :uploadFiles()"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>

    </div>

</template>




<script>
export default {

    data () {
      return {
        loading:true,  
        loadingSave:false,  
        dialog:false,  
        editeMode:false,
        chunk:10,
        totalDocs:0,
        page:1,
        limit:0,
        files:'',
        data:{},
        form :new Form({
            // _id:'',
            name:'',
            description:'',
            images:'',
            // photo:''
        }),        
        headers: [
          {
            text: 'Product Name ',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Description', value: 'description' },
          { text: 'Status ', value: 'statusId' },
          { text: 'Last pdate', value: 'udatedAt' },
          { text: 'Control ', value: 'control' },
        ],

        products: [],        
      }
    },

    methods: {
      getColor (role) {
        if (role ==  3) return 'red'
        else if (role ==  1 || role == 4) return 'orange'
        else return 'green'
      },


      uploadFiles(){
              var formData = new FormData();        
              formData.append("files", this.files);              
              this.$http.post('http://127.0.0.1:3000/api/admin/uploads',
              formData,{
              headers: {
                'Content-Type': 'multipart/form-data'
              }}              
              )
              .then(({data})=>{
                console.log(data)
                this.form.images=data.data.name
                if(!this.editeMode)
                this.createProduct();
                else
                this.updateProduct();
                  // this.users=data.users
              })
      },

    handleFile (event) {
      console.log(event)
      // We'll grab just the first file...
      // You can also do some client side validation here.
      const files = event[0]//.target.files[0]

      // Set the file object onto the form...
      this.files = files  
    },

      updateProduct(id){
          // this.$Progress.start()
          this.loadingSave=true
        this.$http.put('http://127.0.0.1:3000/api/admin/products/'+this.form._id,
        {
          name:this.form.name,
          description : this.form.description,
          images:this.form.images
        },
        )
          .then(()=>{
              // uploadFiles()            
              this.loadingSave=false
              this.dialog = false;
              Swal.fire('Updated!','Updated User Successfully ','success')
              Fire.$emit('AfterCreated')
              // this.$Progress.finish()
          })
          .catch(()=>{
              Swal.fire('Failed','There was Somthing Wrong ','warning')
              // this.$Progress.finish()
          })
      },

          createProduct(){
            this.loadingSave=true
            console.log(this.form)
              this.$http.post('http://127.0.0.1:3000/api/admin/products/',
              {
                name:this.form.name,
                description : this.form.description,
                images:this.form.images
              },              
              )
              .then(()=>{
                  this.loadingSave=false
                  this.dialog = false;

                  Toast.fire({
                      icon: 'success',
                      title: 'Created User Successfully '
                  })
                  Fire.$emit('AfterCreated');
              })
              .catch(()=>{
                Swal.fire('Failed','There was Somthing Wrong ','warning')

              })

          },




    loadProducts(){
        // if(this.$gate.isAdminOrAuther()){
        this.$http.get('api/admin/products')
        .then(({data})=>{
            this.products=data.products.docs
            this.totalDocs = this.products.totalPages;
            this.limit=this.products.limit;
            this.chunk=data.products.totalPages
            this.loading=false
            // console.log(this.products.totalDocs)
        })
    },

    showDialog(mode,data){
      this.editeMode = mode
        console.log(data)
        this.form.reset()
        if(mode){
        this.form.fill(data)
        this.form.name = data.name
        this.form._id = data._id;
        } 
        this.dialog = true;
    }      
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