<style scoped>
.min-h-100 {
  min-height: 100vh;
}
</style>

<template>
  <body class="container-fluid bg-dark min-h-100">
    <form class="p-5 mx-5 row">
      <h1 class="text-light display-4">Cadastro de usuário</h1>
      <div class="form-floating mb-3 col-md-5">
        <input
          type="text"
          class="form-control bg-light"
          id="personName"
          placeholder="Nome do destinatário"
          v-model="person.name"
          @input="validarNome()"
        />
        <label class="mx-2" for="personName">Nome do destinatário*</label>
      </div>
      <div class="form-floating mb-3 col-md-4">
        <input
          type="tel"
          class="form-control bg-light"
          id="personNumber"
          placeholder="Telefone celular"
          v-model="person.numberPhone"
          @input="validarTelefone()"
        />
        <label class="mx-2" for="personNumber">Telefone celular*</label>
      </div>
      <div class="mb-3 col-md-3">
        <label for="race-select" class="text-light">Escolha sua raça:</label>
        <select
          class="form-select bg-light"
          id="race-select"
          v-model="person.race"
        >
          <option v-for="race in races" :key="race">{{ race }}</option>
        </select>
      </div>
      <div class="form-floating mb-3 col-md-3">
        <input
          mask="#####-###"
          v-model="cep"
          type="text"
          class="form-control bg-light"
          id="cep"
          placeholder="CEP"
          @blur="findAdress()"
          required
        />
        <label for="cep" class="mx-2">CEP*</label>
      </div>
      <div class="form-floating mb-3 col-md-6">
        <input
          type="text"
          class="form-control bg-light"
          id="addressAddress"
          placeholder="Endereço"
          v-model="address.address"
          name="input"
          @input="validarEndereco()"
        />
        <label class="mx-2" for="addressAddress">Endereço*</label>
      </div>
      <div class="form-floating mb-3 col-sm-3">
        <input
          type="text"
          class="form-control bg-light"
          id="addressNumber"
          placeholder="Número"
          v-model="address.number"
          @input="validarNumero()"
        />
        <label class="mx-2" for="addressNumber">Número*</label>
      </div>
      <div class="form-floating mb-3 col-sm-6">
        <input
          type="text"
          class="form-control bg-light"
          id="addressNeighborhood"
          placeholder="Bairro"
          v-model="address.neighborhood"
          name="input"
          @input="validarBairro()"
        />
        <label class="mx-2" for="addressNeighborhood">Bairro*</label>
      </div>
      <div class="form-floating mb-3 col-sm-3">
        <input
          type="text"
          class="form-control bg-light"
          id="addressCity"
          placeholder="Cidade"
          v-model="address.city"
          name="input"
        />
        <label class="mx-2" for="addressCity">Cidade*</label>
      </div>
      <div class="form-floating mb-3 col-sm-3">
        <input
          type="text"
          class="form-control bg-light"
          id="addressState"
          placeholder="Estado"
          v-model="address.state"
          name="input"
        />
        <label class="mx-2" for="addressState">Estado*</label>
      </div>
      <div class="form-floating mb-3 col-md-4">
        <input
          type="text"
          class="form-control bg-light"
          id="addressComplement"
          placeholder="Complemento"
          v-model="address.complement"
        />
        <label class="mx-2" for="addressComplement">Complemento</label>
      </div>
      <div class="form-floating mb-3 col-md-8">
        <input
          type="text"
          class="form-control bg-light"
          id="addressReference"
          placeholder="Ponto de referência"
          v-model="address.referencePoint"
          name="input"
        />
        <label class="mx-2" for="addressReference">Ponto de referência</label>
      </div>
      <div class="d-grid gap-2 col-4 mx-auto mt-5">
        <button
          type="button"
          class="btn btn-success"
          id="liveAlertBtn"
          @click="save()"
        >
          Salvar
        </button>
      </div>
    </form>
    <div
      class="alert alert-success alert-dismissible d-none"
      role="alert"
      id="success"
    >
      <div>Cadastrado com sucesso!</div>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
    <div
      class="alert alert-danger alert-dismissible d-none"
      role="alert"
      id="fail"
    >
      <div>Erro ao cadastrar</div>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
  </body>
</template>

<script setup>
import { ref, reactive } from "vue";
import apiConf from "@/api-conf.json";
import axios from "axios";

//pegar inputs com o nome input
const inputs = document.getElementsByName("input");

// url para acessar
const baseURL = apiConf.baseURL;

//referenciar o cep para alterações
const cep = ref("");

//variavel para verificar se todos estão verdadeiros
let validation = false;

//objeto pessoa, para pegar nome e número
const person = reactive({
  name: "",
  numberPhone: "+55",
  race: "",
});

//objeto endereço
const address = reactive({
  address: "",
  number: "",
  complement: "",
  neighborhood: "",
  city: "",
  state: "",
  referencePoint: "",
  cep: "",
});

const maskCEP = (value) => {
  console.log("Entrou");
  if (value.length <= 9) {
    console.log(true);
    console.log(
      value.replace(/\D/g, "").replace(/^(\d{5})(\d{3})+?$/, "$1-$2")
    );
    return (cep.value = value
      .replace(/\D/g, "")
      .replace(/^(\d{5})(\d{3})+?$/, "$1-$2"));
  }
  return cep.value;
};

const races = ["Branca", "Preta", "Amarela", "Parda", "Indígena"];

//buscar endereço pelo axios
const findAdress = () => {
  console.log(cep.value);
  axios
    .get(baseURL + cep.value + "/json/")
    .then((response) => {
      let obj = response.data;
      address.city = obj.localidade;
      address.address = obj.logradouro;
      address.cep = maskCEP(obj.cep);
      address.neighborhood = obj.bairro;
      address.state = obj.uf;
      setReeadOnly();
      validarCEP();
      validarCidade();
      validarEstado();
      validarBairro();
      validarEndereco();
    })
    .catch((error) => {
      console.log("Erro: " + JSON.stringify(error));
      address.city = "";
      address.address = "";
      address.cep = "";
      address.neighborhood = "";
      address.state = "";
      validarCEP();
      validarCidade();
      validarEstado();
      validarBairro();
      validarEndereco();
    });
};

function setReeadOnly() {
  for (let i = 0; i < inputs.length; i++) {
    switch (i) {
      case 0:
        if (address.address != "") {
          inputs[0].setAttribute("readonly", "readonly");
        } else {
          inputs[0].removeAttribute("readonly", "readonly");
        }
        break;
      case 1:
        if (address.neighborhood != "") {
          inputs[1].setAttribute("readonly", "readonly");
        } else {
          inputs[1].removeAttribute("readonly", "readonly");
        }
        break;
      case 2:
        if (address.city != "") {
          inputs[2].setAttribute("readonly", "readonly");
        } else {
          inputs[2].removeAttribute("readonly", "readonly");
        }
        break;
      case 3:
        if (address.state != "") {
          inputs[3].setAttribute("readonly", "readonly");
        } else {
          inputs[3].removeAttribute("readonly", "readonly");
        }
        break;
      default:
        console.log("Erro setAttribute");
    }
  }
}

function validarCEP() {
  if (address.cep == "") {
    document.getElementById("cep").classList.remove("is-valid");
    document.getElementById("cep").classList.add("is-invalid");
    return false;
  } else {
    document.getElementById("cep").classList.remove("is-invalid");
    document.getElementById("cep").classList.add("is-valid");
    return true;
  }
}

function validarNome() {
  if (
    person.name == "" ||
    person.name.length < 4 ||
    person.name.trim().indexOf(" ") == -1
  ) {
    document.getElementById("personName").classList.remove("is-valid");
    document.getElementById("personName").classList.add("is-invalid");
    return false;
  } else {
    document.getElementById("personName").classList.remove("is-invalid");
    document.getElementById("personName").classList.add("is-valid");
    return true;
  }
}

function validarEndereco() {
  if (
    address.address == "" ||
    address.address.length < 5 ||
    address.address.trim().indexOf(" ") == -1
  ) {
    document.getElementById("addressAddress").classList.remove("is-valid");
    document.getElementById("addressAddress").classList.add("is-invalid");
    return false;
  } else {
    document.getElementById("addressAddress").classList.remove("is-invalid");
    document.getElementById("addressAddress").classList.add("is-valid");
    return true;
  }
}

function validarNumero() {
  if (address.number == "") {
    document.getElementById("addressNumber").classList.remove("is-valid");
    document.getElementById("addressNumber").classList.add("is-invalid");
    return false;
  } else {
    document.getElementById("addressNumber").classList.remove("is-invalid");
    document.getElementById("addressNumber").classList.add("is-valid");
    return true;
  }
}

function validarBairro() {
  if (address.neighborhood == "" || address.neighborhood.length < 4) {
    document.getElementById("addressNeighborhood").classList.remove("is-valid");
    document.getElementById("addressNeighborhood").classList.add("is-invalid");
    return false;
  } else {
    document
      .getElementById("addressNeighborhood")
      .classList.remove("is-invalid");
    document.getElementById("addressNeighborhood").classList.add("is-valid");
    return true;
  }
}

function validarCidade() {
  if (address.city == "") {
    document.getElementById("addressCity").classList.remove("is-valid");
    document.getElementById("addressCity").classList.add("is-invalid");
    return false;
  } else {
    document.getElementById("addressCity").classList.remove("is-invalid");
    document.getElementById("addressCity").classList.add("is-valid");
    return true;
  }
}

function validarEstado() {
  if (address.state == "") {
    document.getElementById("addressState").classList.remove("is-valid");
    document.getElementById("addressState").classList.add("is-invalid");
    return false;
  } else {
    document.getElementById("addressState").classList.remove("is-invalid");
    document.getElementById("addressState").classList.add("is-valid");
    return true;
  }
}

function validarTelefone() {
  if (person.numberPhone == "+55" || person.numberPhone.length < 14) {
    document.getElementById("personNumber").classList.remove("is-valid");
    document.getElementById("personNumber").classList.add("is-invalid");
    return false;
  } else {
    document.getElementById("personNumber").classList.remove("is-invalid");
    document.getElementById("personNumber").classList.add("is-valid");
    return true;
  }
}

function save() {
  if (
    validarCEP() &&
    validarBairro() &&
    validarCidade() &&
    validarEndereco() &&
    validarEstado() &&
    validarNome() &&
    validarNumero() &&
    validarTelefone()
  ) {
    document.getElementById("success").classList.remove("d-none");
    document.getElementById("fail").classList.add("d-none");
  } else {
    validarCEP().valueOf;
    validarBairro().valueOf;
    validarCidade().valueOf;
    validarEndereco().valueOf;
    validarEstado().valueOf;
    validarNome().valueOf;
    validarNumero().valueOf;
    validarTelefone().valueOf;
    document.getElementById("success").classList.add("d-none");
    document.getElementById("fail").classList.remove("d-none");
  }
}
</script>
