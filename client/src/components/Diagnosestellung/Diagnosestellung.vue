<template>
  <div class="mb-5"> 
    <div class="form-group mb-5 position-relative" v-for="(item, indexI) in diagnosestellung" :key="indexI">
        <div class="mb-3" v-for="(i, index) in item" :key="index">
          <label :for="i.id" class="input-group-text textareaForm normal-white-space diagnosestellungColor">
            {{indexI+1}}. {{i.title }}
            <div class="tipp ml-3"> <i class="fa fa-info-circle"></i>
              <span class="tipptext">{{i.myTipp}}</span>
            </div>
            <i v-if="index == 0" class="fa fa-trash trash-right" @click.prevent="deleteProblem(indexI)"></i>
          </label>
          <textarea
            class="form-control textareaForm diagnosestellungBorder"
            :id="i.id"
            v-model="i.vmodel"
          />
        </div>
        <div v-if="error[indexI]" class="alert alert-danger">
          Es müssen folgende Felder ausgefüllt werden! 
          <ul v-for="(error, index) in errorList[indexI]" :key="index">
            <li v-if="error != ''">{{error}}</li>
          </ul>
        </div>
        <button class="btn btn-bluelight mb-3" @click.prevent="getPASR({index:indexI, ernaehrungsproblem:item[0].vmodel, ursache:item[1].vmodel, symptome:item[2].vmodel, pRessourcen:item[3].vmodel, nRessourcen:item[4].vmodel})"><i class="fa fa-check"></i> bestätigen</button>
        <div>
          PASR-Statement:
          <p v-html="pasr[indexI]"></p>
        </div>        
      </div>
      <button class="btn btn-blue mb-3" @click.prevent="addNewProblem"><i class="fa fa-plus-circle"></i> Diätetisches Problem hinzufügen</button>  
  </div>   
</template>

<script>
import {mapMutations} from "vuex";
export default {
  name: "diagnosestellung",
  computed: {
    diagnosestellung(){
      return this.$store.state.d.diagnosestellung
    },
    pasr(){
      return this.$store.state.d.pasr
    },
    error(){
      return this.$store.state.d.error
    },
    errorList(){
      return this.$store.state.d.errorList
    },
  },
  methods: {
    ...mapMutations("d",[
      "addNewProblem",
      "deleteProblem",
      "getPASR",
    ])
  }
}
</script>
