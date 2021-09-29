<template>
  <div v-for="(n, index) in anzahl" :key="index" class="mb-4">
    <p>{{n}}. 24-h-Recall</p>
    <InputForm
        v-model="recall[n-1][0].datum"
        :content="{ title: 'Datum', id: 'datumRecall'+n, type:'date', color:'assessmentColor', border:'assessmentBorder' }"
      />
    <table class="mb-3 table table-striped table-bordered">
        <thead>
            <th>Mahlzeit</th>
            <th>Uhrzeit</th>
            <th>Wo wurde gegessen?</th>
            <th>Mit wem wurde gegessen?</th>
            <th>Lebensmittel und Getränke mit Mengenangaben</th>
            <th>Löschen</th>
        </thead>
        <tbody>
            <tr v-for="(item, index) in recall[n-1]" :key="index">
                <td>
                    <input class="form-control assessmentBorder" type="text" v-model="item.mahlzeit"/>
                </td>
                <td>
                    <input class="form-control assessmentBorder" type="text" v-model="item.uhrzeit"/>
                </td>
                <td>
                    <input class="form-control assessmentBorder" type="text" v-model="item.wo"/>
                </td>
                <td>
                    <input class="form-control assessmentBorder" type="text" v-model="item.wer"/>
                </td>
                <td>
                    <textarea class="form-control assessmentBorder" v-model="item.lebensmittelGetraenke"/>
                </td>
                <td>                   
                    <i class="fa fa-trash btn btn-red ml-3" @click.prevent="deleteRow({tableIndex:n-1, rowIndex:index})"></i>
                </td>
            </tr>
        </tbody>
    </table>
    <button class="btn btn-gold mb-3" @click.prevent="addNewRow(n-1)"><i class="fa fa-plus-circle"></i> Mahlzeit hinzufügen</button>
  </div>  
</template>

<script>
import {mapState, mapMutations} from "vuex";
import InputForm from "./InputForm.vue";

  export default {
    name: "RecallTable",
    components: {
     InputForm
    },
    computed: {
      ...mapState("a2",[
        "recall",
      ])
    },
    props: {
      anzahl: Number
    },
    watch: {
      anzahl:function(newValue, oldValue) {
        var min = 0;
        var max = 0;

        if(newValue > oldValue) {
          min = oldValue;
          max = newValue;
          //nur die differenz dazu
          for(var i = min; i < max; i++){
            this.addTable();
          }
        } else if (newValue < oldValue) {
          min = newValue;
          max = oldValue;
          //von hinten loeschen sonst gibt es den Index nicht mehr
          for(var j = max; j > min; j--){
            this.deleteTable(j-1);
          }
        } else {
          min = 0;
          max = this.anzahl;
          // am Anfang ist oldValue undefined
          for(var k = min; k < max; k++){
            this.addTable();
          }
        }
      },
    },
    methods: {
      ...mapMutations("a2",{
        addTable: "addTableRecall",
        deleteTable: "deleteTableRecall",
        addNewRow: "addNewRowRecall",
        deleteRow: "deleteRowRecall",
      })
    },
  };
</script>
