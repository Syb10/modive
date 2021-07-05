<template>
  <div class="mb-5"> 
    <div class="form-group mb-5 position-relative" v-for="(item, indexI) in DynamicDiagnosestellung" :key="indexI">
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
        <div v-if="error" class="alert alert-danger">
          Es müssen folgende Felder ausgefüllt werden! 
          <ul v-for="(error, index) in errorList" :key="index">
            <li v-if="error != ''">{{error}}</li>
          </ul>    
        </div>
        <button class="btn btn-bluelight mb-3" @click.prevent="getDiagnosestellung(indexI, item[0].vmodel,item[1].vmodel, item[2].vmodel, item[3].vmodel)"><i class="fa fa-check"></i> bestätigen</button>
        <div>
          PASR-Statement:
          <p v-html="SatzDiagnosestellung[indexI][0].satz"></p>
        </div>        
      </div>
      <button class="btn btn-blue mb-3" @click.prevent="addNewProblem"><i class="fa fa-plus-circle"></i> Ernährungsproblem hinzufügen</button>
  </div>   
</template>

<script>
import {mapFields} from "vuex-map-fields";
export default {
  name: "diagnosestellung",
  data() {
    return {    
      DynamicDiagnosestellung:[
        [
          {title: "Ernährungsproblem", vmodel:"", id:"ernaehrungsproblem0", myTipp:"Informationen hierzu finden Sie im Assessment, insbesondere in der Kategorie Ernährungsgewohnheiten."},
          {title: "Ursache", vmodel:"", id:"ursache0", myTipp:"Informationen hierzu finden Sie im Assessment, in den Kategorien Klient*innengeschichte, Ernährungsgewohnheiten, Verhalten & Umfeld."}, 
          {title: "Symptome", vmodel:"",id:"symptome0", myTipp:"Informationen hierzu finden Sie im Assessment, insbesondere in den Kategorien Klinischer Status."},
          {title: "Ressourcen", vmodel:"", id:"ressourcen0", myTipp:"Informationen hierzu finden Sie im Assessment, insbesondere in den Kategorien Klient*innengeschichte, Verhalten & Umfeld."},
        ]
      ],
      SatzDiagnosestellung:[
        [
          {satz:""}
        ]
      ],
      counter:1,
      item:[],
      error: false,
      errorList: [],
    }
  },
  computed: {
    ...mapFields([
      "diagnosestellung"
    ])
  },
  watch: {
    SatzDiagnosestellung:{
      handler(value) {
        for(var i=0; i < value.length; i++){
           this.item[i] = value[i][0].satz;           
        }
        var newValue = this.item.join('<br><br>');
        this.diagnosestellung = newValue;
      },
      deep: true
    },
  },
  methods: {
      addNewProblem() {
        this.DynamicDiagnosestellung.push([
          {title: "Ernährungsproblem", vmodel:"", id:"ernaehrungsproblem"+this.counter, myTipp:"Informationen hierzu finden Sie im Assessment, insbesondere in der Kategorie Ernährungsgewohnheiten."},
          {title: "Ätiologie/Ursache", vmodel:"", id:"ursache"+this.counter, myTipp:"Informationen hierzu finden Sie im Assessment, in den Kategorien Klient*innengeschichte, Ernährungsgewohnheiten, Verhalten & Umfeld."}, 
          {title: "Zeichen und Symptome", vmodel:"", id:"symptome"+this.counter, myTipp:"Informationen hierzu finden Sie im Assessment, insbesondere in den Kategorien Klinischer Status."},
          {title: "Ressourcen", vmodel:"", id:"ressourcen"+this.counter, myTipp:"Informationen hierzu finden Sie im Assessment, insbesondere in den Kategorien Klient*innengeschichte, Verhalten & Umfeld."},
        ]);
        this.counter++;
        this.SatzDiagnosestellung.push([
          {satz:""}
        ]);
      },
      deleteProblem(index) {
        this.DynamicDiagnosestellung.splice(index, 1);
        this.SatzDiagnosestellung.splice(index,1);
        this.item.splice(index, 1);
      },
      getDiagnosestellung(index, ernaehrungsproblem, ursache, symptome, ressourcen) {
        if(ernaehrungsproblem != "" && ursache != "" && symptome != "" && ressourcen != ""){
          this.error = false;
          return this.SatzDiagnosestellung[index][0].satz = "Ernährungsproblem " + ernaehrungsproblem.bold() + " bedingt durch Ätiologie/Ursache "+ ursache.bold() +
          " nachgewiesen durch Zeichen und Symptomen " + symptome.bold() + ". Unterstützend wirken sich Ressourcen " + ressourcen.bold() + " aus." 
        } else {
          ernaehrungsproblem ? this.errorList[0] = "" : this.errorList[0] = "Ernährungsproblem"
          ursache ? this.errorList[1] = "" : this.errorList[1] = "Ätiologie/Ursache"
          symptome ? this.errorList[2] = "" : this.errorList[2] = "Zeichen und Symptomen"
          ressourcen ? this.errorList[3] = "" : this.errorList[3] = "Ressourcen"
          this.error = true;
        }
      }
  }
}
</script>
