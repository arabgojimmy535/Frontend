<template>
    <body>
      <main class="container mt-3">
        <div class="row"><br /><br /><br /><br /><br /><br /></div>
        <div class="row my-5">
          <div class="col-md-4 offset-md-4">
            <section class="bg-transparent bg-gradient rounded">
              <form
                class="card card-body bg-transparent bg-gradient rounded"
                v-on:submit.prevent="ingresar();"
              >
                <h1 class="text-center">INGRESAR</h1>
                <br />
                <!-- username -->
                <div class="mb-3">
                  <label for="username">Usuario:</label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    class="form-control bg-transparent bg-gradient"
                    placeholder="Username"
                    v-model="ingreso.username"
                  />
                </div>
                <!-- contraseñas -->
                <div class="mb-3">
                  <label for="contraseña1">Contraseña:</label>
                  <input
                    type="password"
                    name="contraseña"
                    id="password"
                    class="form-control bg-transparent bg-gradient"
                    placeholder="Contraseña"
                    v-model="ingreso.password"
                  />
                </div>
                <div class="mb-3">
                  <p>Si no tienes una cuenta,<router-link to="/Registrarse">Registrate</router-link></p>
                </div>

                <input type="submit" value="INGRESAR" class="btn btn-primary">
                
              </form>
            </section>
          </div>
        </div>
      </main>
    </body>
  </template>
  <script>
  export default {
    name: "ingresar",
    data() {
      return {
        ingreso: {
          username:'',
          password: ''
        },
      };
    },
    methods: {
      ingresar() {
        let url = "https://apirest-mxbk.onrender.com/api/login/";
        let ingreso = this.ingreso;
        let post = {
          method: "POST",
          body: JSON.stringify(ingreso),
          headers: {
            "content-Type": "application/json",
          },
        }
        fetch(url,post)
        .then((response) => {
                    if(response.status==400){
                      location.reload();
                    }
                    else{
                    console.log(response.status)
                    console.log(response.data)
                    localStorage.setItem('usernamelocal',this.ingreso.username);
                    // location.reload();
                    
                    
                    }
        })
        
        // this.$router.push('/');
      },
    },
  };
  </script>