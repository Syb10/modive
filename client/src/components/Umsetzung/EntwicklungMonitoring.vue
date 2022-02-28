<template>
  <div>
    <p v-if="joinMonitoring == ''" class="alert alert-danger">In der Planung der Intervention wurden noch keine Monitoring-Parameter erfasst.</p>
    <div v-if="joinMonitoring != ''">
      <div v-for="(item, indexI) in joinMonitoring" :key="indexI">
        <p>{{joinMonitoring[indexI][0]}} / {{joinMonitoring[indexI][1]}}</p>
        <div v-for="(i, index) in entwicklungMonitoring[indexI]" :key="index">
          <InputForm
            v-model="i.datum"
            :content="{ title: 'Datum', id: 'entwicklungDatum'+indexI+index, type:'date', color:'umsetzungColor', border:'umsetzungBorder'}"
          />
          <InputForm
            v-model="i.ergebnisse"
            :content="{ title: 'Wert', id: 'ergebnisse'+indexI+index, type:'text', color:'umsetzungColor', border:'umsetzungBorder'}"
            :style="marginSmaller"
          />
          <button class="btn btn-redlight mb-3 " @click.prevent="deleteRow({indexI:indexI, index: index})"><i class="fa fa-trash"></i> Eintrag löschen</button> 
        </div>
        <button class="btn btn-umsetzung mb-5 " @click.prevent="addNewRow(indexI)"><i class="fa fa-plus-circle"></i> Eintrag hinzufügen</button> 
      </div>
    </div>  
  </div>
</template>

<script>
import InputForm from "../InputForm.vue";
import {mapGetters, mapMutations} from "vuex";

  export default {
    name: "entwicklungMonitoring",
    data() {
      return {
        marginSmall: {
          margin: '-2rem 0 0 0',
        },
        marginSmaller: {
          margin: '-1rem 0 -1rem 0',
        },
      }
    },
    components:{
      InputForm,
    },
    computed: {
      ...mapGetters("p",[
        "joinMonitoring"
      ]),
      entwicklungMonitoring() {
        return this.$store.state.p.entwicklungMonitoring
      },
    },
    methods: {
      ...mapMutations("p",{
        addNewRow: "addNewRowEntwicklungMonitoring",
        deleteRow: "deleteRowEntwicklungMonitoring",
      }),
    },
  }
</script>