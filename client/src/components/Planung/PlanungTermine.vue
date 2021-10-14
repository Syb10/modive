<template>
  <div>
    <div v-for="(item, index) in value" :key="index" class="mb-3">
      <p @click.prevent="show(index)"> Planung {{index+1}}. {{title}} <i v-if="isShow[index]" class="fa fa-chevron-up"></i><i v-if="!isShow[index]" class="fa fa-chevron-down"></i></p>
      <div v-if="isShow[index]">
        <InputForm
          v-model="item.dauer"
          :content="{ title: 'Dauer der '+ title +' (in Minuten)', id: 'dauer'+title+index, type:'number', min:0, color:'planungColor', border:'planungBorder' }"
        />
        <TextareaForm
          v-model="item.inhalt"
          :content="{ title: 'Inhalt der '+ title, id: 'inhalt'+title+index, color:'planungColor', border:'planungBorder'}"
          :style="marginSmaller"
        />
        <TextareaForm
          v-model="item.materialien"
          :content="{ title: 'verwendete Materialien', id: 'materialien'+title+index, color:'planungColor', border:'planungBorder'}"
          :style="marginSmaller"
        />
        <TextareaForm
          v-model="item.weitereAnmerkungen"
          :content="{ title: 'weitere Anmerkungen', id: 'weitereAnmerkungen'+title+index, color:'planungColor', border:'planungBorder'}"
          :style="marginSmaller"
        />
        <button class="btn btn-darkbluelight" @click.prevent="update({value: item, index: index}), updateshowPopup(index)"><i class="fa fa-check"></i> {{index+1}}. {{title}} bestätigen</button>
        <div v-if="showPopup[index]" class="popup">
          <span class="popuptext">Die Daten wurden übertragen</span>
        </div>
        <button class=" btn btn-redlight ml-3" @click.prevent="deleteRow(index)"><i class="fa fa-trash"></i> {{index+1}}. {{title}} löschen</button>
      </div>
      <button v-if="index == value.length-1" class="btn btn-darkblue mb-5 mt-3" @click.prevent="addNewRow()"><i class="fa fa-plus-circle"></i> {{index+2}}. {{title}} planen</button>
    </div>  
    <button v-if="value.length == 0" class="btn btn-darkblue mb-5 mt-3" @click.prevent="addNewRow()"><i class="fa fa-plus-circle"></i> 1. {{title}} planen</button>
  </div>
</template>

<script>
import InputForm from "../InputForm.vue";
import TextareaForm from "../TextareaForm.vue";

  export default {
    name: "PlanungTermine",
     data() {
      return {
        marginSmall: {
          margin: '-2rem 0 0 0',
        },
        marginSmaller: {
          margin: '-1rem 0 0 0',
        },
        showPopup: [],
        isShow:[],
      }
    },
    props:{
      title: String,
      value: Object,
      addNewRow: Object,
      deleteRow: Object,
      update: Object,
    },
    components: {
      InputForm,
      TextareaForm,
    },
    methods: {
      updateshowPopup(index) {
        this.showPopup[index] = true;
      },
      show(index) {
        this.isShow[index] = !this.isShow[index];
      },
    },
    //see https://stackoverflow.com/questions/55788474/changing-the-state-to-true-when-new-item-enters-and-changing-to-false-after-5-se
    watch: {
      showPopup: {
        handler(value) {
          for (var i=0; i<value.length; i++) {
            if(this.showPopup[i]) {
              setTimeout(() => this.showPopup[i-1]=false, 3000);
            }
          }
          
        },
        deep: true
      },
    }
  }
</script>