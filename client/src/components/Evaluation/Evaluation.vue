<template>
  <div>
    <p class="evaluationAspekt">Entwicklung der Monitoring- und Outcome-Parameter</p>
    <p v-if="entwicklung == 0" class="alert alert-danger">In der Umsetzung der Intervention wurden noch keine Monitoring-Parameter erfasst.</p>
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
    <p>Übergeordnetes Ziel (diätetisches Outcome)</p>
    <p v-if="getUebergeordetesZiel == ''" class="alert alert-danger">In der Planung der Intervention wurden noch kein übergeordnetes Ziel (diätetisches Outcome) erfasst.</p>
    <ol>
      <div v-for="(item, index) in getUebergeordetesZiel" :key="index">
        <li>{{item}}</li>
        <RadioForm
        :items="[
          {title:'ja', id:'jaUebergeordetesZiel'+index, name:'uebergeordetesZiel'+index},
          {title:'nein', id:'neinUebergeordetesZiel'+index, name:'uebergeordetesZiel'+index},
        ]"
        :title="'Wurde das gesetzte Ziel erreicht?'"
        :color ="'evaluationColor'"
        v-model="zielerreichungUebergeordetesZiel[index]"
        />
        <div v-if="zielerreichungUebergeordetesZiel[index] == 'nein'">
            <InputForm
              v-model="begruendungZielerreichungUebergeordetesZiel[index]"
              :content="{ title: 'Begründung', id: 'begruendungZielerreichungUebergeordetesZiel'+index, type:'text', color:'evaluationColor', border:'evaluationBorder'}"
              :style="marginSmall"
            />        
        </div>
      </div>
    </ol>
    <p>Verlaufsziele</p>
    <p v-if="getVerlaufsziel == ''" class="alert alert-danger">In der Planung der Intervention wurden noch keine Verlaufsziele erfasst.</p>
    <ol>  
      <div v-for="(item, index) in getVerlaufsziel" :key="index">
        <li>{{item}}</li>
        <RadioForm
        :items="[
          {title:'ja', id:'jaZielerreichungVerlaufsziel'+index, name:'zielerreichungVerlaufsziel'+index},
          {title:'nein', id:'neinZielerreichungVerlaufsziel'+index, name:'zielerreichungVerlaufsziel'+index},
        ]"
        :title="'Wurde das gesetzte Ziel erreicht?'"
        :color ="'evaluationColor'"
        v-model="zielerreichungVerlaufsziel[index]"
        />
        <div v-if="zielerreichungVerlaufsziel[index] == 'nein'">
            <InputForm
              v-model="begruendungZielerreichungVerlaufsziel[index]"
              :content="{ title: 'Begründung', id: 'begruendungZielerreichungVerlaufsziel'+index, type:'text', color:'evaluationColor', border:'evaluationBorder'}"
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
        "getUebergeordetesZiel",
        "getVerlaufsziel",
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
      zielerreichungUebergeordetesZiel: {
        get() {
          return this.$store.state.e.zielerreichungUebergeordetesZiel
        },
        set(value) {
          this.$store.commit("e/zielerreichungKlient", value)
        }
      },
      begruendungZielerreichungUebergeordetesZiel: {
        get() {
          return this.$store.state.e.begruendungZielerreichungUebergeordetesZiel
        },
        set(value) {
          this.$store.commit("e/begruendungZielerreichungUebergeordetesZiel", value)
        }
      },
      zielerreichungVerlaufsziel: {
        get() {
          return this.$store.state.e.zielerreichungVerlaufsziel
        },
        set(value) {
          this.$store.commit("e/zielerreichungVerlaufsziel", value)
        }
      },
      begruendungZielerreichungVerlaufsziel: {
        get() {
          return this.$store.state.e.begruendungZielerreichungVerlaufsziel
        },
        set(value) {
          this.$store.commit("e/begruendungZielerreichungVerlaufsziel", value)
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