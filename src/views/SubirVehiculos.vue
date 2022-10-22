<template>
  <body>
    <main class="container">
      <div class="row mt-3">
        <div class="col-md-4 offset-md-4 mt-5">
          <section class="bg-transparent bg-gradient rounded">
            <form
              v-on:submit.prevent="publicar"
              class="card card-body bg-transparent bg-gradient rounded"
              enctype="multipart/form-data"
            >
              <h1 class="text-center">SUBIR VEHICULO</h1>
              
              <br />
              <!-- Marca -->
              <div class="mb-3">
                <label for="marca">Marca:</label>
                <input
                  type="text"
                  name="marca"
                  class="form-control bg-transparent bg-gradient"
                  placeholder="Marca"
                  v-model="vehiculo.marca"
                />
              </div>
              <!-- Modelo -->
              <div class="mb-3">
                <label for="modelo">Modelo:</label>
                <input
                  type="text"
                  name="modelo"
                  class="form-control bg-transparent bg-gradient"
                  placeholder="Modelo"
                  v-model="vehiculo.modelo"
                />
              </div>
              <!-- Año -->
              <div class="mb-3">
                <label for="Año">Año:</label>
                <input
                  type="number"
                  name="Año"
                  class="form-control bg-transparent bg-gradient"
                  placeholder="Año"
                  v-model="vehiculo.año"
                />
              </div>
              <!-- precio -->
              <div class="mb-3">
                <label for="precio">Precio:</label>
                <input
                  type="number"
                  name="Precio"
                  class="form-control bg-transparent bg-gradient"
                  placeholder="Precio"
                  v-model="vehiculo.precio"
                />
              </div>
              <!-- Usado -->
              <div class="mb-3">
                <label for="Usado">Usado:</label>
                <input
                  type="checkbox"
                  class="form-check-input mx-2"
                  v-model="vehiculo.usado"
                />
              </div>
              <!-- Imagen -->
              <div class="custom-file mb-4">
                <input
                  type="file"
                  class="form-control bg-transparent bg-gradient"
                  @change="obtenerimagen"
                />
              </div>
              <!-- Categoria -->
              <div class="mb-3">
                <label>Categoria</label>
                <select  class="form-control bg-transparent bg-gradient" v-model="categorizacion.categoria">
                  <option disabled-value="">Seleccionar Categoria</option>
                  <option :value="1">Liviano</option>
                  <option :value="2">Pesado</option>
                  <option :value="3">Especiales</option>
                  <option :value="4">Agricolas</option>
                </select>
              </div>

              <input type="submit"  class="btn btn-primary" value="PUBLICAR" />
            </form>
          </section>
        </div>
      </div>
    </main>
  </body>
</template>
<script>
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
export default {
  name: "vehiculoPost",
  data() {
    return {
      categorizacion:{
        categoria:0,
        vehiculos:'',
      },
      vehiculo: {
        marca: "",
        modelo: "",
        año: 0,
        precio: 0,
        usado: true,
        imagen: "",
        vendido: false,
        creadopor: 23,
      },
    };
  },
  methods: {
    obtenerimagen(e) {
      var file = e.target.files[0];
      const storage = getStorage();
      const metadata = {
        contentType: "image/jpeg",
      };
      const storageRef = ref(storage, "imagenes/" + file.name);
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          switch (error.code) {
            case "storage/unauthorized":
              break;
            case "storage/canceled":
              break;
            case "storage/unknown":
              break;
          }
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            this.vehiculo.imagen = downloadURL;
          });
        }
      );
    },publicar() {
      let url = "https://apirest-mxbk.onrender.com/api/vehiculos/";
      let vehiculo = this.vehiculo;
      let post = {
        method: "POST",
        body: JSON.stringify(vehiculo),
        headers: {
          "content-Type": "application/json",
        },
      };
      fetch(url, post)
        .then((response)=>response.json())
        .then((response) => {
          this.categorizacion.vehiculos= response.id;
          this.categorizar();
        }
        )
    },categorizar(){
      let url = "https://apirest-mxbk.onrender.com/api/categoria_vehiculo/";
      let datos= this.categorizacion
      console.log(datos)
      let post = {
        method: "POST",
        body: JSON.stringify(datos),
        headers: {
          "content-Type": "application/json",
        },
      };
      fetch(url, post)
        .then((response)=>response.json())
        .then((response)=>{
          if(response.status!=400){
            this.$router.push("/");};
        })
    }
  },
};
</script>
