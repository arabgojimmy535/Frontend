<template>
  <body>
    <main>
      <div class="row d-flex justify-content-center mt-5">
        <div
          class="card bg-transparent bg-opacity-10 mt-5 mb-2 tarjeta text-center align-self-center"
          style="width: 25rem; height: 28rem"
        >
          <img v-bind:src="vehiculo.imagen" class="card-img-top mt-4 rounded" />
          <div class="card-body bg-opacity-10">
            <h3 class="card-title bg-opacity-10">
              {{ vehiculo.marca }} {{ vehiculo.modelo }} <br />
              {{ vehiculo.año }}
            </h3>
            <h4 class="mt-4 mb-2 precio">COP {{ vehiculo.precio.toLocaleString(es-CO) }}</h4>
          </div>
        </div>
        <!-- SECCION DE FACTURACION -->
        <div class="col-md-5 mt-2 align-self-center">
          <section class="bg-transparent bg-gradient rounded">
            <form
              v-on:submit.prevent="facturar()"
              class="card card-body bg-transparent bg-gradient rounded"
              enctype="multipart/form-data"
            >
              <h1 class="text-center">FACTURACION</h1>
              <h2 class="text-center">COMPRA VEHICULO</h2>
              <br />
              <h5 class="text-center">
                Rellena la siguiente informacion personal <br />
                para completar la compra
              </h5>
              <!-- Nombre -->
              <div class="w-80 mx-5 mb-3">
                <label>Nombres:</label>
                <br />
                <input
                  type="text"
                  class="form-control bg-transparent bg-gradient"
                  placeholder="Nombre"
                  v-model="cliente.nombre"
                />
              </div>

              <!-- Apellido -->
              <div class="w-80 mx-5 mb-3">
                <label>Apellidos:</label>
                <input
                  type="text"
                  class="form-control bg-transparent bg-gradient"
                  placeholder="Apellidos"
                  v-model="cliente.apellido"
                />
              </div>

              <!-- Cedula -->
              <div class="w-80 mx-5 mb-3">
                <label>Cedula:</label>
                <input
                  type="number"
                  class="form-control bg-transparent bg-gradient"
                  v-model="cliente.cedula"
                />
              </div>

              <!-- Direccion -->
              <div class="w-80 mx-5 mb-3">
                <label>Direccion:</label>
                <br />
                <input
                  type="text"
                  class="form-control bg-transparent bg-gradient"
                  placeholder="Direccion"
                  v-model="cliente.direccion"
                />
              </div>
              <!-- Telefono -->
              <div class="w-80 mx-5 mb-3">
                <label>Telefono:</label>
                <br />
                <input
                  type="number"
                  class="form-control bg-transparent bg-gradient"
                  placeholder="Telefono"
                  v-model="cliente.telefono"
                />
              </div>
              <input
                type="submit"
                class="w-80 mx-5 mt-2 btn btn-primary"
                value="COMPRAR"
              />
            </form>
          </section>
        </div>
      </div>
    </main>
  </body>
</template>
<script>
export default {
  name: "vehiculo_comprar",
  data() {
    return {
      vehiculo: [],
      cliente: {
        cedula: 0,
        nombre: "",
        apellido: "",
        direccion: "",
        telefono: 0,
        username: 4,
      },
      id: this.$route.params.id,
      clienteCreado:[],
      idCliente: 0,
    };
  },
  created() {
    if(localStorage.getItem('usernamelocal')==''){
      this.$route.push('/')
    }
    console.log(this.id);
    let url = "https://apirest-mxbk.onrender.com/api/vehiculos/" + this.id;
    fetch(url)
      .then((respuesta) => respuesta.json())
      .then((data) => (this.vehiculo = data))
      .catch((error) => {
        console.log("no se pudo " + error);
      });
  },
  methods: {
    facturar() {
      let url = "https://apirest-mxbk.onrender.com/api/clientes/";
      let cliente = this.cliente;

      let post = {
        method: "POST",
        body: JSON.stringify(cliente),
        headers: {
          "content-Type": "application/json",
        },
      };
      console.log(cliente);
      fetch(url, post)
        .then((respuesta) => respuesta.json())
        .then((data) => this.clienteCreado= data);

      this.crearFactura();
    },
    crearFactura(){
      
      console.log(this.vehiculo)
    }
  },
};
</script>
