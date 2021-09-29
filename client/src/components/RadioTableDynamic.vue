<template>
  <p v-if="subtitle" class="marginRadioTableDynamic">
    {{subtitle}}
  </p> 
  <!--for dynamic Andere-->
  <tr v-show="isAndere" v-for="(item, indexI) in wichtigkeitAndere" :key="indexI">
    <td v-for="(i, index) in item" :key="index">
      <input v-if="i.input" class="form-control btnAndere assessmentBorder" type="text" v-model="i.title"/>
      <i v-if="i.button" class="fa fa-trash btn btn-red ml-3" @click.prevent="deleteRowAndere(indexI)"></i>
      <div v-if="i.value" class="input-group">
        <input
          type="radio"
          :id="i.id"
          :name="i.name"           
          :value="i.value"
          v-model="item[0].vmodel"
        />
      </div>
    </td>
  </tr>
  <button v-if="isAndere" class="btn btn-gold mb-3 marginRadioTableDynamic" @click.prevent="addNewRowAndere"><i class="fa fa-plus-circle"></i> Zeile hinzufügen</button> 
  <!--for dynamic Monitoring-->
  <tr v-show="isMonitoring" v-for="(item, indexI) in monitoring" :key="indexI">
    <td v-for="(i, index) in item" :key="index">
      <input v-if="i.input" class="form-control planungBorder" type="text" v-model="i.title"/>
      <i v-if="i.button" class="fa fa-trash btn btn-red ml-3" @click.prevent="deleteRowMonitoring(indexI)"></i>
    </td>
  </tr>
  <button v-if="isMonitoring" class="btn btn-darkblue mb-3 marginRadioTableDynamic" @click.prevent="addNewRowMonitoring"><i class="fa fa-plus-circle"></i> Zeile hinzufügen</button> 
</template>

<script>
import {mapMutations} from "vuex";
  export default {
    name:"RadioTable",
    props:{
      subtitle:String,
      isAndere:Boolean,
      isMonitoring: Boolean,
    },
    computed: {
      monitoring() {
        return this.$store.state.p.monitoring
      },
      wichtigkeitAndere() {
        return this.$store.state.a3.wichtigkeitAndere
      },
    },
    methods: {
      ...mapMutations("p", [
        "addNewRowMonitoring",
        "deleteRowMonitoring"
      ]),
      ...mapMutations("a3", [
        "addNewRowAndere",
        "deleteRowAndere"
      ]),
    }
  };
</script>
