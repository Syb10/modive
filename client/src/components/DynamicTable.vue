<template>
    <table class="mb-3 table table-striped table-bordered">
        <thead>
            <th>Mahlzeit</th>
            <th>Uhrzeit</th>
            <th>Wo wurde gegessen</th>
            <th>Mit wem wurde gegessen</th>
            <th>Lebensmittel und Getänke</th>
            <th>Menge</th>
            <th>Löschen</th>
        </thead>
        <tbody>
            <tr v-for="(recallMahlzeit, index) in recallMahlzeiten" :key="index">
                <td>
                    <input class="form-control" type="text" v-model="recallMahlzeit.mahlzeit"/>
                </td>
                <td>
                    <input class="form-control" type="text" v-model="recallMahlzeit.uhrzeit"/>
                </td>
                <td>
                    <input class="form-control" type="text" v-model="recallMahlzeit.wo"/>
                </td>
                <td>
                    <input class="form-control" type="text" v-model="recallMahlzeit.wer"/>
                </td>
                <td>
                    <input class="form-control" type="text" v-model="recallMahlzeit.lebensmittelGetraenke"/>
                </td>
                <td>
                    <input class="form-control" type="text" v-model="recallMahlzeit.menge"/>
                </td>
                <td>                   
                    <i class="fa fa-trash btn btn-red ml-3" @click.prevent="deleteRow(recallMahlzeit)"></i>
                </td>
            </tr>
        </tbody>
    </table>
    <button class="btn btn-gold mb-3" @click.prevent="addNewRow"><i class="fa fa-plus-circle"></i> Mahlzeit hinzufügen</button>
</template>

<script>
  export default {
    name: "DynamicTable",
    data() {
      return {
        recallMahlzeiten: [{
          mahlzeit:"",
          uhrzeit:"",
          wo:"",
          wer:"",
          lebensmittelGetraenke:"",
          menge:"",
        }]
      }
    },
    props: {
      modelValue: []
    },
    methods: {
      addNewRow() {
        this.recallMahlzeiten.push({
          mahlzeit:"",
          uhrzeit:"",
          wo:"",
          wer:"",
          lebensmittelGetraenke:"",
          menge:"", 
        });
      },
      deleteRow(recallMahlzeit) {
          var index = this.recallMahlzeiten.indexOf(recallMahlzeit);
          this.recallMahlzeiten.splice(index, 1);
      }
    },
    emits: ["update:modelValue"],
    watch: {
      recallMahlzeiten: {
        handle(value) {
          console.log("hallo" + value.mahlzeit)
          var newValue = value.join(', ')
          this.$emit("update:modelValue", newValue)
        },
        deep: true
      } 
    }
  };
</script>

<style scoped>
.btn-gold{
    background-color: #9a884f !important;
    border: 1px solid #9a884f !important;
    color: white !important;
}
.btn-red{
    background-color: #B75757 !important;
    border: 1px solid #B75757 !important;
    color: white !important;
}
</style>