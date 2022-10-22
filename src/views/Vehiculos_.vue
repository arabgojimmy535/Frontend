<template>
  <body>
    <main>
      <div class="container d-flex justify-content-center">
        <select @change="categorizar($event)" class="p-2 botom col-md-6 w-45 mt-5 rounded">
          <option value="0" class="text-center">Todos</option>
          <option value="1" class="text-center">Ligeros</option>
          <option value="2" class="text-center">Pesados</option>
          <option value="3" class="text-center">Especiales</option>
          <option value="4" class="text-center">Agricolas</option>
        </select>
      </div>

      <div class="ms-auto">
        <div class="row mx-5 mt-5 text-center" style="width: auto">
          <div
            class="card col-md-4 bg-transparent bg-opacity-10 my-4 mx-3 tarjeta"
            style="width: 25rem"
            v-for="vehiculo in vehiculos"
            :key="vehiculo.id"
          >
            <img
              v-bind:src="vehiculo.imagen"
              class="card-img-top mt-2 rounde"
            />
            <div class="card-body bg-opacity-10">
              <h3 class="card-title bg-opacity-10">
                {{ vehiculo.marca }} {{ vehiculo.modelo }} <br />{{
                  vehiculo.año
                }}
              </h3>
              <h4 class="mt-4 precio">COP {{ vehiculo.precio }}</h4>
              <router-link
                :to="{ name: 'DetalleVehiculo', params: { id: vehiculo.id } }"
                class="col-6 mx-5 px-5 btn btn-primary"
                >Comprar</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </main>
  </body>
</template>
<script>
export default {
  name: "vehiculo",
  data() {
    return {
      categoria: 0,
      vehiculos: [],
      vehiculos_categoria: [],
      vehiculos_sincategorizar: [],
      vehiculos_categorizados: [],
    };
  },
  mounted() {
    fetch("https://apirest-mxbk.onrender.com/api/vehiculos/")
      .then((respuesta) => respuesta.json())
      .then((data) => (this.vehiculos = data))
      .catch((error) => {
        console.log("no se pudo " + error);
      });
  },
  methods: {
    categorizar(event) {
      this.categoria = event.target.value;
      this.vehiculosCategorizados();
    },
    vehiculosCategorizados() {
      if (this.categoria == 0) {
        fetch("https://apirest-mxbk.onrender.com/api/vehiculos/")
          .then((respuesta) => respuesta.json())
          .then((data) => (this.vehiculos = data))
          .catch((error) => {
            console.log("no se pudo " + error);
          });
      } else if (this.categoria == 1) {
        this.vehiculos = [];
        fetch("https://apirest-mxbk.onrender.com/api/categoria_vehiculo/")
          .then((response) => response.json())
          .then((data) => {
            this.vehiculos_sincategorizar = data;
            console.log(this.vehiculos_sincategorizar);
            for (let v in this.vehiculos_sincategorizar) {
              if (this.vehiculos_sincategorizar[v].categoria == 1) {
                let idvehiculo = this.vehiculos_sincategorizar[v].vehiculos;
                let url = "https://apirest-mxbk.onrender.com/api/vehiculos/" + idvehiculo;
                fetch(url)
                  .then((respuesta) => respuesta.json())
                  .then((data) => {
                    this.vehiculos.push(data);
                  })
                  .catch((error) => {
                    console.log("no se pudo " + error);
                  });
              }
            }
          });
      }
      else if (this.categoria == 2) {
        this.vehiculos = [];
        fetch("https://apirest-mxbk.onrender.com/api/categoria_vehiculo/")
          .then((response) => response.json())
          .then((data) => {
            this.vehiculos_sincategorizar = data;
            console.log(this.vehiculos_sincategorizar);
            for (let v in this.vehiculos_sincategorizar) {
              if (this.vehiculos_sincategorizar[v].categoria == 2) {
                let idvehiculo = this.vehiculos_sincategorizar[v].vehiculos;
                let url = "https://apirest-mxbk.onrender.com/api/vehiculos/" + idvehiculo;
                fetch(url)
                  .then((respuesta) => respuesta.json())
                  .then((data) => {
                    this.vehiculos.push(data);
                  })
                  .catch((error) => {
                    console.log("no se pudo " + error);
                  });
              }
            }
          });
      }else if (this.categoria == 3) {
        this.vehiculos = [];
        fetch("https://apirest-mxbk.onrender.com/api/categoria_vehiculo/")
          .then((response) => response.json())
          .then((data) => {
            this.vehiculos_sincategorizar = data;
            console.log(this.vehiculos_sincategorizar);
            for (let v in this.vehiculos_sincategorizar) {
              if (this.vehiculos_sincategorizar[v].categoria == 3) {
                let idvehiculo = this.vehiculos_sincategorizar[v].vehiculos;
                let url = "https://apirest-mxbk.onrender.com/api/vehiculos/" + idvehiculo;
                fetch(url)
                  .then((respuesta) => respuesta.json())
                  .then((data) => {
                    this.vehiculos.push(data);
                  })
                  .catch((error) => {
                    console.log("no se pudo " + error);
                  });
              }
            }
          });
      }else if (this.categoria == 4) {
        this.vehiculos = [];
        fetch("https://apirest-mxbk.onrender.com/api/categoria_vehiculo/")
          .then((response) => response.json())
          .then((data) => {
            this.vehiculos_sincategorizar = data;
            console.log(this.vehiculos_sincategorizar);
            for (let v in this.vehiculos_sincategorizar) {
              if (this.vehiculos_sincategorizar[v].categoria == 4) {
                let idvehiculo = this.vehiculos_sincategorizar[v].vehiculos;
                let url = "https://apirest-mxbk.onrender.com/api/vehiculos/" + idvehiculo;
                fetch(url)
                  .then((respuesta) => respuesta.json())
                  .then((data) => {
                    this.vehiculos.push(data);
                  })
                  .catch((error) => {
                    console.log("no se pudo " + error);
                  });
              }
            }
          });
      }
    },
  },
};
</script>
