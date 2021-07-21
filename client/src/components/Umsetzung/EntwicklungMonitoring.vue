<template>
  <div>
    <p v-if="entwicklung == 0" class="alert alert-danger">In der Planung der Intervention wurden noch keine Monitoring-Parameter erfasst</p>
    <div v-for="(item, indexI) in entwicklungMonitoring['table']" :key="indexI">
      <p>{{entwicklung[indexI]}}</p>
      <div v-for="(i, index) in item" :key="index">
        <InputForm
          v-model="i.datum"
          :content="{ title: 'Datum', id: 'entwicklungDatum'+indexI+index, type:'date', color:'umsetzungColor', border:'umsetzungBorder'}"
        />
        <InputForm
          v-model="i.ergebnisse"
          :content="{ title: 'Wert', id: 'ergebnisse'+indexI+index, type:'text', color:'umsetzungColor', border:'umsetzungBorder'}"
          :style="marginSmaller"
        />
      </div>
      <button class="btn btn-umsetzung mb-3 " @click.prevent="addNewRowMonitoring(indexI)"><i class="fa fa-plus-circle"></i> Datum hinzufügen</button> 
    </div>
  </div>
</template>

<script>
import InputForm from "../InputForm.vue";
import {mapGetters, mapMutations} from "vuex";
import {mapFields} from "vuex-map-fields";
  import moment from 'moment';
  export default {
    name: "entwicklungMonitoring",
    data() {
      return {
        marginSmall: {
          margin: '-2rem 0 0 0',
        },
        marginSmaller: {
          margin: '-1rem 0 0 0',
        },
        isfirst: true,
      }
    },
    props:{
      modelValue:[],
    },
    emits:["update:modelValue"],
    components:{
      InputForm,
    },
    created(){
      if(this.monitoring == undefined) {
        //wenn man vorher schon auf die Seite klickt (und noch keine Monitoring Parameter vorhanden) 
        //ist das watch "aktiviert" und dann wird zweimal eine InputForm hinzugefuegt
        this.isfirst = false;
      }
    },
    computed: {
      ...mapFields([
        "monitoring",
      ]),
      ...mapGetters({
        entwicklungMonitoring: "entwicklungMonitoring"
      }),
      entwicklung() {
        //holt die Saetze und fuellt das Array damit
        if(this.monitoring != undefined) {
          return this.monitoring.split(',');
        }
        return 0
      },
      anzahl(){
        // anzahl der Saetze mit einmaligen Aufruf zum hinzufuegen der ersten InputForm
        // dann das hinzufuegen ueber den watcher, sonst bei jedem Zeichen eine neue InputForm
         if(this.monitoring != undefined) {
           var number = this.monitoring.split(',').length;
           this.addfirst(number);
          return number 
        }
        return 0
      },
      gesamteEntwicklung() {
        // fuegt Saetze , Datum und Ergebnisse in ein Array
        var items=[];
        for(var i=0; i<this.entwicklung.length; i++){
          items.push([{title:this.entwicklung[i]}]);
          for(var j=0; j<this.entwicklungMonitoring['table'][i].length; j++){
            items[i].push({datum:this.changeDate(this.entwicklungMonitoring['table'][i][j].datum), ergebnisse:this.entwicklungMonitoring['table'][i][j].ergebnisse})
          }
        }
        return items
      },
    },
    watch:{
      anzahl:function(newValue, oldValue) {
        var min = 0;
        var max = 0;
        console.log("hallo anzahl");
        if(newValue > oldValue) {
          min = oldValue;
          max = newValue;
          //nur die differenz dazu
          for(var i = min; i < max; i++){
            this.addTableMonitoring();
          }
        } else if (newValue < oldValue) {
          min = newValue;
          max = oldValue;
          //von hinten loeschen sonst gibt es den Index nicht mehr
          for(var j = max; j > min; j--){
            this.deleteTableMonitoring(j-1);
          }
        }
      },
      // see https://v3.vuejs.org/guide/migration/watch.html#overview
      gesamteEntwicklung:{
        handler(value) {
          // aus dem Array ein String der dem v-model uebergeben wird und dann mit v-html angezeigt
          var item=[]
          for(var i=0; i < value.length; i++){
            item.push("<div>"+value[i][0].title+"</div><ul>");
            for(var j=1; j < value[i].length; j++){
              item.push("<li>"+value[i][j].datum+": "+value[i][j].ergebnisse+"</li>"); 
            }
            if(i == value.length-1){
              item.push("</ul>");
            } else{
              // das <p></p> ist nur zum besseren trennen in der Evaluation da
              item.push("</ul><p></p>");
            }          
          }
          var newValue = item.join('')
          this.$emit("update:modelValue", newValue)
        },
        deep: true
      },
    },
    methods: {
      addfirst(number) {
        // fuer das einmalige hinzufuegen, sonst fuer jedes Zeichen eine neue InputForm
        if(this.isfirst){
          for(var i=0; i<number; i++) {
            this.addTableMonitoring();
            console.log("addfirst added: " + i)
          }
          this.isfirst = false;
        }      
      },
      ...mapMutations({
        addTableMonitoring: "addTableMonitoring",
        addNewRowMonitoring: "addNewRowMonitoring",
        deleteTableMonitoring: "deleteTableMonitoring",
      }),
      changeDate(value){
        return moment(value).locale('de').format('L');
      }
    },
  }
</script>