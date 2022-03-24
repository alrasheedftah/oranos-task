<template>
    <div>
        <h1 class="subheading grey--text"> Sigin </h1>
        <v-container fluid class="my-5">
        <form>

    <v-text-field
      v-model="form.email"
      label="E-mail"
      required

    ></v-text-field>

    <v-text-field
      v-model="form.password"
      :counter="10"
      label="Password"
      type="password"
      required

    ></v-text-field>
  

    <v-btn
      class="mr-4"
      @click="submit"
    >
      submit
    </v-btn>

  </form>
        </v-container>

    </div>
</template>















<script>

  export default {

    data: () => ({
      form:new Form({
      password: '',
      email: '',
      }),
      select: null,
      checkbox: false,
    }),


    methods: {
      submit () {
          // localStorage.setItem("token", data.data.token);      
          this.form.post('http://127.0.0.1:3000/auth/login/')
          .then((data)=>{
              this.dialog = false;
              console.log(data.data)
              Toast.fire({
                  icon: 'success',
                  title: 'Created User Successfully '
              })
              localStorage.setItem("token", data.data.token);      
              localStorage.setItem("role", data.data.role);      
              this.$token=data.data.token
              this.$http.headers={
                'Autherization':'Bearer '+Vue.prototype.token
              };
              Vue.prototype.$http= this.$http
              Vue.prototype.$role= data.data.role

              Fire.$emit('Loggedin');
              this.$router.push('/')   
              this.$forceUpdate();
          })
          .catch((err)=>{
            console.log(err)
            Swal.fire('Failed','There was Somthing Wrong ','warning')

          })

      },
      clear () {
      },
    },
  }
</script>