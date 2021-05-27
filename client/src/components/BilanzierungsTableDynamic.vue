<template>
  <p class="margin">
    {{title}}
  </p>  
  <tr v-for="(item, index) in DynamicData" :key="index">
      <td>
        <input class="form-control" type="text" v-model="item.title"/>
      </td>
      <td>
        <div class="input-group">
          <input
            type="radio"
            :id="item.weniger.id"
            :name="item.weniger.name"           
            :value="item.weniger.value"
            v-model="item.vmodel"
          />
        </div>
      </td>
      <td>
        <input
          type="radio"
          :id="item.entsprechend.id"
          :name="item.entsprechend.name"           
          :value="item.entsprechend.value"
          v-model="item.vmodel"
        />
      </td>
      <td>
        <input
          type="radio"
          :id="item.mehr.id"
          :name="item.mehr.name"           
          :value="item.mehr.value"
          v-model="item.vmodel"
        />
      </td>
      <td>                   
        <i class="fa fa-trash btn btn-red ml-3" @click.prevent="deleteRow(index)"></i>
      </td>
  </tr>
  <button class="btn btn-gold mb-3 margin" @click.prevent="addNewRow"><i class="fa fa-plus-circle"></i> Zeile hinzufügen</button>
</template>

<script>
  export default {
    name:"BilanzierungsTableDynamic",
    data() {
      return {
        DynamicData: [
          {
            title: "",
            vmodel:"",
            weniger:{value: "weniger",id:this.title+"0Weniger",name:this.title+"0"},
            entsprechend:{value: "entsprechend der Ernährungsempfehlung",id:this.title+"0Weniger",name:this.title+"0"},
            mehr:{value: "mehr",id:this.title+"0Mehr",name:this.title+"0"}
          },
        ],
        counter:1
      }
    },
    props:{
      modelValue:[],
      title: String
    },
    emits:["update:modelValue"],
    watch: {
      // see https://v3.vuejs.org/guide/migration/watch.html#overview
      DynamicData:{
        handler(value) {
          var item=[]
          //titel und v-model(wert) aus DynamicData an das v-model uebergeben aus assesment2
          for(var i=0; i < value.length; i++){
            if(i== value.length-1) {
              //wenn es das letzte Paar ist kein Komma hinten
              item.push(value[i].title,":", value[i].vmodel);
            } else{
              item.push(value[i].title,":", value[i].vmodel,", ");
            }           
          }
          var newValue = item.join('')
          this.$emit("update:modelValue", newValue)
        },
        deep: true
      } 
    },
    methods: {
      addNewRow() {
        this.DynamicData.push({
          title: "",
          vmodel:"",
          weniger:{value: "weniger",id:this.title+this.counter+"Weniger",name:this.title+this.counter},
          entsprechend:{value: "entsprechend der Ernährungsempfehlung",id:this.title+this.counter+"Weniger",name:this.title+this.counter},
          mehr:{value: "mehr",id:this.title+this.counter+"Mehr",name:this.title+this.counter}
        })
        this.counter++;
      },
      deleteRow(index) {
        this.DynamicData.splice(index, 1);
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
.margin{
  margin: 0.75rem;
}
</style>
