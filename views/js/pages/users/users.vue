<template>
    <div>
        <v-row justify="space-around">
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                  <h1 class="subheading grey--text"> All Users  </h1>
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
                    @click="showDialogInsert()"
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
                    :items="users"
                    class="elevation-1"
                    :loading="loading"
                    loading-text="Loading... Please wait"
                >
                <template v-slot:[`item.role`] ="{ item }">
                <v-chip
                    :color="getColor(item.role)"
                    dark
                >
                    {{ item.role }}
                </v-chip>
                </template>
                

                <template v-slot:[`item.control`] ="{ item }">

    <v-btn
      class="mx-2"
      fab
      dark
      small
      color="indigo"
      @click="showDialog( item )"
    >
      <v-icon dark>
        mdi-pencil
      </v-icon>
    </v-btn>

                </template>                
                
                </v-data-table>


        </v-container>

  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >

      <v-card>
        <v-card-title>
          <span class="text-h5">User Data</span>
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
                  label="Legal first name*"
                  required
                  v-model="form.fname"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Legal middle name"
                  hint="example of helper text only on focus"
                  v-model="form.mname"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Legal last name*"
                  hint="example of persistent helper text"
                  v-model="form.lname"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Email*"
                  required
                  v-model="form.email"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Password*"
                  type="password"
                  required
                  v-model="form.password"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-select
                  :items="['0-17', '18-29', '30-54', '54+']"
                  label="Age*"
                  required
                  v-model="form.age"
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-autocomplete
                  :items="['Admin', 'Sender', 'User']"
                  label="Select Role "
                  v-model="form.role"
                ></v-autocomplete>
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
            @click="createUser()"
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
        dialog:false,  
        editeMode:false,
        chunk:10,
        totalDocs:0,
        page:1,
        limit:0,
        form :new Form({
            _id:'',
            fname:'',
            mname:'',
            lname:'',
            email:'',
            password:'',
            role:'',
            age:'',
            // photo:''
        }),        
        headers: [
          {
            text: 'User Name ',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Email', value: 'email' },
          { text: 'Role', value: 'role' },
          { text: 'Create AT', value: 'createdAt' },
          { text: 'Last Update ', value: 'updatedAt' },
          { text: 'Control ', value: 'control' },
        ],

        users: [],        
      }
    },

    methods: {
      getColor (role) {
        if (role ==  'Admin') return 'red'
        else if (role ==  'Sender' ) return 'orange'
        else return 'green'
      },

          createUser(){
            this.loadingSave=true
            console.log(this.form)
              this.$http.post('http://127.0.0.1:3000/api/admin/users/',
              {
                name:this.form.fname+" "+this.form.mname+" "+this.form.lname,
                phone : this.form.phone,
                password:this.form.password,
                age:this.form.age,
                email:this.form.email,
                role:this.form.role
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

    loadUsers(){
        // if(this.$gate.isAdminOrAuther()){
        this.$http.get('api/admin/users')
        .then(({data})=>{
            this.users=data.users.docs
            this.totalDocs = this.users.totalPages;
            this.limit=this.users.limit;
            this.chunk=data.users.totalPages
            this.loading=false
            // console.log(this.users.totalDocs)
        })
    },
    showDialogInsert(){
        this.form.reset()
        this.dialog = true;
    },
    showDialog(data){
        this.form.reset()
        this.form.fill(data)
        this.form.fname = data.name.split(' ')[0] 
        this.form.mname = data.name.split(' ')[1] 
        this.form.lname = data.name.split(' ')[2] 
        this.dialog = true;
        console.log(this.form._id)
    }      
    },

        created() {
            //this.$Progress.start();
            this.loadUsers()
    }



}
</script>