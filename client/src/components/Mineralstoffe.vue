<template>
    <p class="marginRadioTableDynamic">Mineralstoffe</p> 
    <tr v-for="(item, indexI) in mineralstoffe" :key="indexI">
        <td v-for="(i, index) in item" :key="index">
        <input v-if="i.input" class="form-control btnAndere assessmentBorder" type="text" v-model="i.title"/>
        <i v-if="i.button" class="fa fa-trash btn btn-red ml-3" @click.prevent="deleteRowMineralstoffe(indexI)"></i>
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
    <button class="btn btn-gold mb-3 marginRadioTableDynamic" @click.prevent="addNewRowMineralstoffe"><i class="fa fa-plus-circle"></i> Zeile hinzufügen</button> 
</template>
<script>
import {mapMutations} from "vuex";
  export default {
    name:"Mineralstoffe",
    computed: {
      mineralstoffe() {
        return this.$store.state.a2.mineralstoffe
      },
    },
    methods: {
      ...mapMutations("a2", [
        "addNewRowMineralstoffe",
        "deleteRowMineralstoffe",
      ]),
    }
  };
</script>