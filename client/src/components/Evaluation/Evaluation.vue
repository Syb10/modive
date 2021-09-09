<template>
  <div>
    <p class="evaluationAspekt">Entwicklung der Monitoring- und Outcome Parameter</p>
    <p v-if="entwicklung == 0" class="alert alert-danger">In der Umsetzung der Intervention wurden noch keine Monitoring-Parameter erfasst</p>
    <div v-for="(item, index) in entwicklung" :key="index">
      <div v-html="item"></div>
      <InputForm
        v-model="entwicklungMonitoringEvaluation[index]"
        :content="{ title: 'Entwicklung', id: 'entwicklungMonitoringEvaluation'+index, type:'text', color:'evaluationColor', border:'evaluationBorder'}"
      />
    </div>
    <p class="evaluationAspekt">Zielerreichung</p>
    <p>Ziel(e) der/des Klient*in</p>
    <p v-if="klientZiel == 0" class="alert alert-danger">In der Planung der Intervention wurden noch kein(e) Ziel(e) der/des Klient*in erfasst</p>
    <ul>
    <div v-for="(item, index) in klientZiel" :key="index">
      <p>{{item}}</p>
      <RadioForm
      :items="[
        {title:'ja', id:'jaZielerreichungKlient'+index, name:'zielerreichungKlient'+index},
        {title:'nein', id:'neinZielerreichungKlient'+index, name:'zielerreichungKlient'+index},
      ]"
      :title="'Wurde das gesetzte Ziel erreicht?'"
      :color ="'evaluationColor'"
      v-model="zielerreichungKlient[index]"
      />
      <div v-if="zielerreichungKlient[index] == 'nein'">
          <InputForm
            v-model="begruendungZielerreichungKlient[index]"
            :content="{ title: 'Begründung', id: 'begruendungZielerreichungKlient'+index, type:'text', color:'evaluationColor', border:'evaluationBorder'}"
            :style="marginSmall"
          />        
      </div>
    </div>
    </ul>
    <p>Ziel(e) der Intervention</p>
    <p v-if="interventionZiel == 0" class="alert alert-danger">In der Planung der Intervention wurden noch kein(e) Ziel(e) der Intervention erfasst</p>
    <div v-for="(item, index) in interventionZiel" :key="index">
      <p>{{item}}</p>
      <RadioForm
      :items="[
        {title:'ja', id:'jaZielerreichungIntervention'+index, name:'zielerreichungIntervention'+index},
        {title:'nein', id:'neinZielerreichungIntervention'+index, name:'zielerreichungIntervention'+index},
      ]"
      :title="'Wurde das gesetzte Ziel erreicht?'"
      :color ="'evaluationColor'"
      v-model="zielerreichungIntervention[index]"
      />
      <div v-if="zielerreichungIntervention[index] == 'nein'">
          <InputForm
            v-model="begruendungZielerreichungIntervention[index]"
            :content="{ title: 'Begründung', id: 'begruendungZielerreichungIntervention'+index, type:'text', color:'evaluationColor', border:'evaluationBorder'}"
            :style="marginSmall"
          />        
      </div>
    </div>
    <TextareaForm
      v-model="evaluationWeitersVorgehen"
      :content="{ title: 'Weiters Vorgehen', id: 'evaluationWeitersVorgehen', color:'evaluationColor', border:'evaluationBorder'}"
    />   
  </div>
</template>

<script>
import InputForm from "../InputForm.vue";
import RadioForm from "../RadioForm.vue";
import TextareaForm from "../TextareaForm.vue";
import {mapFields} from "vuex-map-fields";
  export default {
    name:"evaluation",
    data () {
      return{
        entwicklungMonitoringEvaluation:[],
        zielerreichungKlient:[],
        begruendungZielerreichungKlient:[],
        gesamtZielerreichungKlient:[],
        zielerreichungIntervention:[],
        begruendungZielerreichungIntervention:[],
        gesamtZielerreichungIntervention:[],
        marginSmall: {
          margin: '-2rem 0 0 0',
        },
        marginSmaller: {
          margin: '-1rem 0 0 0',
        }
      }
    },
    components: {
      InputForm,
      RadioForm,
      TextareaForm,
    },
    computed: {
      ...mapFields([
        "entwicklungMonitoringParameter",
        "monitoring",
        "zieleKlient",
        "zieleIntervention",
        "evaluationEntwicklungMonitoringParameter",
        "evaluationZieleKlient",
        "evaluationZieleIntervention",
        "evaluationWeitersVorgehen",
      ]),
      entwicklung() {    
        if(this.entwicklungMonitoringParameter != undefined) {
          return this.entwicklungMonitoringParameter.split('<p></p>')
        }
        return 0
      },
      monitoringParameter() {
        //holt die Saetze und fuellt das Array damit
        // fuer die Speicherung nur die Parameter
        if(this.monitoring != undefined) {
          return this.monitoring.split(',');
        }
        return 0
      },
      klientZiel() {    
        if(this.zieleKlient != undefined) {
          return this.zieleKlient.split(',')
        }
        return 0
      },
      interventionZiel() {    
        if(this.zieleIntervention != undefined) {
          return this.zieleIntervention.split(',')
        }
        return 0
      },
    },
    watch:{
      entwicklungMonitoringEvaluation:{
        handler(value) {
          var item=[]
          for(var i=0; i< value.length; i++){
            item.push("<div>" + this.monitoringParameter[i] + " Entwicklung: " + value[i] + "</div>")
          }
          var newValue = item.join('')
          this.evaluationEntwicklungMonitoringParameter = newValue
        },
        deep: true
      },
      zielerreichungKlient:{
        handler(value) {
          for(var i=0; i < value.length; i++){
            if(value[i] == 'ja') {
              this.gesamtZielerreichungKlient.[i]=(
                {ziel:this.klientZiel[i], erreicht:value[i], begruendung:""}
              );
            } else if( this.begruendungZielerreichungKlient[i] == null){
              this.gesamtZielerreichungKlient.[i]=(
                {ziel:this.klientZiel[i], erreicht:value[i], begruendung:""}
              );
            }else {
              this.gesamtZielerreichungKlient.[i]=(
                {ziel:this.klientZiel[i], erreicht:value[i], begruendung: this.begruendungZielerreichungKlient[i]}
              );
            }          
          }
        },
        deep: true
      },
      begruendungZielerreichungKlient:{
        handler(value) {
          for(var i=0; i < value.length; i++){
            if(value[i] == null) {
              this.gesamtZielerreichungKlient[i].begruendung = ""
            } else {
              this.gesamtZielerreichungKlient[i].begruendung = value[i]
            }          
          }
        },
        deep: true
      },
      gesamtZielerreichungKlient:{
        handler(value) {
          // aus dem Array ein String der dem v-model uebergeben wird und dann mit v-html angezeigt
          var item=[]
          for(var i=0; i < value.length; i++){
            item.push(
              "<div>" + value[i].ziel + " <b>Ziel erreicht: " + value[i].erreicht + "</b> " + value[i].begruendung + "</div>"
            );
          }
          var newValue = item.join('')
          this.evaluationZieleKlient = newValue
        },
        deep: true
      },
      zielerreichungIntervention:{
        handler(value) {
          for(var i=0; i < value.length; i++){
            if(value[i] == 'ja') {
              this.gesamtZielerreichungIntervention.[i]=(
                {ziel:this.interventionZiel[i], erreicht:value[i], begruendung:""}
              );
            } else if( this.begruendungZielerreichungIntervention[i] == null){
              this.gesamtZielerreichungIntervention.[i]=(
                {ziel:this.interventionZiel[i], erreicht:value[i], begruendung:""}
              );
            }else {
              this.gesamtZielerreichungIntervention.[i]=(
                {ziel:this.interventionZiel[i], erreicht:value[i], begruendung: this.begruendungZielerreichungIntervention[i]}
              );
            }          
          }
        },
        deep: true
      },
      begruendungZielerreichungIntervention:{
        handler(value) {
          for(var i=0; i < value.length; i++){
            if(value[i] == null) {
              this.gesamtZielerreichungIntervention[i].begruendung = ""
            } else {
              this.gesamtZielerreichungIntervention[i].begruendung = value[i]
            }          
          }
        },
        deep: true
      },
      gesamtZielerreichungIntervention:{
        handler(value) {
          // aus dem Array ein String der dem v-model uebergeben wird und dann mit v-html angezeigt
          var item=[]
          for(var i=0; i < value.length; i++){
            item.push(
              "<div>" + value[i].ziel + " <b>Ziel erreicht: " + value[i].erreicht + "</b> " + value[i].begruendung + "</div>"
            );
          }
          var newValue = item.join('')
          this.evaluationZieleIntervention = newValue
        },
        deep: true
      },
    },
  }
</script>