<template>
  <div>
    <p class="evaluationAspekt">Entwicklung der Monitoring- und Outcome Parameter</p>
    <p v-if="entwicklung == 0" class="alert alert-danger">In der Umsetzung der Intervention wurden noch keine Monitoring-Parameter erfasst</p>
    <div v-if="entwicklung != 0">
      <div v-for="(i, indexI) in joinMonitoring" :key="indexI">
        {{i[0]}} / {{i[1]}}
        <ul>
          <div v-for="(item, index) in entwicklungMonitoring[indexI]" :key="index">
            <li v-if="item.datum != '' && item.ergebnisse != ''">{{changeDate(item.datum)}}: {{item.ergebnisse}}</li>
          </div>
        </ul>
        <InputForm
          v-model="evaluationEntwicklungMonitoring[indexI]"
          :content="{ title: 'Entwicklung', id: 'entwicklungMonitoringEvaluation'+index, type:'text', color:'evaluationColor', border:'evaluationBorder'}"
        />
      </div>
    </div>
    <p class="evaluationAspekt">Zielerreichung</p>
    <p>Ziel(e) der/des Klient*in</p>
    <p v-if="getZieleKlient == ''" class="alert alert-danger">In der Planung der Intervention wurden noch kein(e) Ziel(e) der/des Klient*in erfasst</p>
    <ol>
      <div v-for="(item, index) in getZieleKlient" :key="index">
        <li>{{item}}</li>
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
    </ol>
    <p>Ziel(e) der Intervention</p>
    <p v-if="getZieleIntervention == ''" class="alert alert-danger">In der Planung der Intervention wurden noch kein(e) Ziel(e) der Intervention erfasst</p>
    <ol>  
      <div v-for="(item, index) in getZieleIntervention" :key="index">
        <li>{{item}}</li>
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
    </ol>  
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
import {mapGetters} from "vuex";
import moment from 'moment';

  export default {
    name:"evaluation",
    data () {
      return{
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
      ...mapGetters("p",[
        "joinMonitoring",
      ]),
      ...mapGetters("e",[
        "getZieleKlient",
        "getZieleIntervention",
      ]),
      entwicklung() {
       for(var i=0; i<this.entwicklungMonitoring.length; i++) {
          for(var j=0; j<this.entwicklungMonitoring[i].length; j++) {
            if(this.entwicklungMonitoring[i][j].datum != '' && this.entwicklungMonitoring[i][j].ergebnisse != '') {
              return 1
            }
          }
        }
        return 0
      },
      entwicklungMonitoring() {
        return this.$store.state.p.entwicklungMonitoring
      },
      evaluationEntwicklungMonitoring:{
        get() {
          return this.$store.state.e.evaluationEntwicklungMonitoring
        },
        set(value) {
          this.$store.commit("e/evaluationEntwicklungMonitoring", value)
        }
      },
      zielerreichungKlient: {
        get() {
          return this.$store.state.e.zielerreichungKlient
        },
        set(value) {
          this.$store.commit("e/zielerreichungKlient", value)
        }
      },
      begruendungZielerreichungKlient: {
        get() {
          return this.$store.state.e.begruendungZielerreichungKlient
        },
        set(value) {
          this.$store.commit("e/begruendungZielerreichungKlient", value)
        }
      },
      zielerreichungIntervention: {
        get() {
          return this.$store.state.e.zielerreichungIntervention
        },
        set(value) {
          this.$store.commit("e/zielerreichungIntervention", value)
        }
      },
      begruendungZielerreichungIntervention: {
        get() {
          return this.$store.state.e.begruendungZielerreichungIntervention
        },
        set(value) {
          this.$store.commit("e/begruendungZielerreichungIntervention", value)
        }
      },
      evaluationWeitersVorgehen: {
        get() {
          return this.$store.state.e.evaluationWeitersVorgehen
        },
        set(value) {
          this.$store.commit("e/evaluationWeitersVorgehen", value)
        }
      },
    },
    methods: {
      changeDate(value){
        return moment(value).locale('de').format('L');
      },
    },
  }
</script>