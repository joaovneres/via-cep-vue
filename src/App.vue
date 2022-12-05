<style scoped></style>

<template>
  <div>
    <b-form>
      <input type="text" placeholder="Número" v-model.number="address.number" />
      <input type="text" placeholder="Complemento" v-model="address.complement" />
      <input type="text" placeholder="Bairro" v-model="address.neighborhood" />
      <input type="text" placeholder="Cidade" v-model="address.city" />
      <input type="text" placeholder="Estado" v-model="address.state" />
      <input
        type="text"
        placeholder="Ponto de referência"
        v-model="address.referencePoint"
      />
      <input type="text" placeholder="Telefone celular" v-model="person.numberPhone" />
      <div class="input-field col s6">
        <input id="last_name" type="text" class="validate" />
        <label for="last_name">Last Name</label>
      </div>
      <b-form-group id="cep" label="CEP:" label-for="cep">
        <b-form-input
          id="cep"
          v-model="cep"
          type="text"
          placeholder="Insira seu CEP"
          required
          @focusout="findAdress()"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-name" label="Nome:" label-for="name">
        <b-form-input
          id="name"
          v-model="person.name"
          placeholder="Nome completo"
          required
        ></b-form-input>
      </b-form-group>

      <input type="text" placeholder="Endereço" v-model="address.address" />

      <b-form-group id="input-group-address" label="Endereço:" label-for="address">
        <b-form-input
          id="address"
          v-model="address.address"
          required
          outlined
        ></b-form-input>
      </b-form-group>
    </b-form>
  </div>
  <div>{{ address.city }}</div>
</template>

<script setup>
import { ref, reactive } from "vue";
import apiConf from "@/api-conf.json";
import axios from "axios";

const baseURL = apiConf.baseURL;
const cep = ref("");
const person = reactive({
  name: "",
  numberPhone: 0,
});

const address = reactive({
  address: "",
  number: 0,
  complement: "",
  neighborhood: "",
  city: "",
  state: "",
  referencePoint: "",
});

const findAdress = () => {
  console.log(cep.value);
  axios
    .get(baseURL + cep.value + "/json/")
    .then((response) => {
      let obj = response.data;
      address.city = obj.localidade;
      address.cep = obj.cep;
      address.neighborhood = obj.bairro;
      address.state = obj.uf;
    })
    .catch((error) => {
      console.log("Erro: " + JSON.stringify(error));
    });
};
</script>
