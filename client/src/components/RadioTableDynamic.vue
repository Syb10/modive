<template>
  <p v-if="subtitle" class="marginRadioTableDynamic">
    {{subtitle}}
  </p> 
  <!--for dynamic Bilanzierung-->
  <tr v-show="isBilanzierung" v-for="(item, indexI) in DynamicBilanzierung" :key="`item-${indexI}`">
    <td v-for="(i, index) in item" :key="`item-${index}`">
      <input v-if="i.input" class="form-control btnAndere assessmentBorder" type="text" v-model="i.title"/>
       <i v-if="i.button" class="fa fa-trash btn btn-red ml-3" @click.prevent="deleteRowBilanzierung(indexI)"></i>
      <div v-if="i.value" class="input-group">
        <input
          type="radio"
          :id="i.id"
          :name="i.name"           
          :value="i.value"
          v-model="item[0].vmodel"
        />
      </div>
    </td>
  </tr>
  <button v-if="isBilanzierung" class="btn btn-gold mb-3 marginRadioTableDynamic" @click.prevent="addNewRowBilanzierung"><i class="fa fa-plus-circle"></i> Zeile hinzufügen</button> 
  <!--for dynamic Andere-->
  <tr v-show="isAndere" v-for="(item, indexI) in DynamicAndere" :key="`item-${indexI}`">
    <td v-for="(i, index) in item" :key="`i-${index}`">
      <input v-if="i.input" class="form-control btnAndere assessmentBorder" type="text" v-model="i.title"/>
      <i v-if="i.button" class="fa fa-trash btn btn-red ml-3" @click.prevent="deleteRowAndere(indexI)"></i>
      <div v-if="i.value" class="input-group">
        <input
          type="radio"
          :id="i.id"
          :name="i.name"           
          :value="i.value"
          v-model="item[0].vmodel"
        />
      </div>
    </td>
  </tr>
  <button v-if="isAndere" class="btn btn-gold mb-3 marginRadioTableDynamic" @click.prevent="addNewRowAndere"><i class="fa fa-plus-circle"></i> Zeile hinzufügen</button> 
  <!--for dynamic Monitoring-->
  <tr v-show="isMonitoring" v-for="(item, indexI) in DynamicMonitoring" :key="`item-${indexI}`">
    <td v-for="(i, index) in item" :key="`i-${index}`">
      <input v-if="i.input" class="form-control planungBorder" type="text" v-model="i.title"/>
      <i v-if="i.button" class="fa fa-trash btn btn-red ml-3" @click.prevent="deleteRowMonitoring(indexI)"></i>
    </td>
  </tr>
  <button v-if="isMonitoring" class="btn btn-darkblue mb-3 marginRadioTableDynamic" @click.prevent="addNewRowMonitoring"><i class="fa fa-plus-circle"></i> Zeile hinzufügen</button> 
</template>

<script>
  export default {
    name:"RadioTable",
    data() {
      return {    
        DynamicBilanzierung:[
          [
            {title: "", vmodel:"", input:true, button:true},
            {value: "weniger",id:this.subtitle+"0Weniger",name:this.subtitle+"0"},
            {value: "entsprechend der Ernährungsempfehlung",id:this.subtitle+"0Weniger",name:this.subtitle+"0"},
            {value: "mehr",id:this.subtitle+"0Mehr",name:this.subtitle+"0"}, 
          ]               
        ],
        DynamicAndere:[
          [
            {title:"", vmodel:"", input:true, button:true},
            {value:"sehr wichtig", id:this.subtitle+"0sehrWichtig", name:this.subtitle+"0"},
            {value:"wichtig", id:this.subtitle+"0wichtig", name:this.subtitle+"0"},
            {value:"eher wichtig", id:this.subtitle+"0eherWichtig", name:this.subtitle+"0"},
            {value:"eher unwichtig", id:this.subtitle+"0eherUnwichtig", name:this.subtitle+"0"},
            {value:"unwichtig", id:this.subtitle+"0unwichtig", name:this.subtitle+"0"},
            {value:"sehr unwichtig", id:this.subtitle+"0sehrUnwichtig", name:this.subtitle+"0"},
          ]
        ],
        DynamicMonitoring:[
          [
            {title:"", input:true},
            {title:"", input:true},
            {button:true}
          ]
        ],
        counter:1
      }
    },
    props:{
      subtitle:String,
      modelValue:[],
      isBilanzierung:Boolean,
      isAndere:Boolean,
      isMonitoring: Boolean,
    },
    emits:["update:modelValue"],
    watch: {
      // see https://v3.vuejs.org/guide/migration/watch.html#overview
      DynamicBilanzierung:{
        handler(value) {
          var item=[]
          //titel und v-model(wert) aus DynamicData an das v-model uebergeben aus assesment2
          for(var i=0; i < value.length; i++){
            if(i== value.length-1) {
              //wenn es das letzte Paar ist kein Komma hinten
              item.push(value[i][0].title,":", value[i][0].vmodel);
            } else{
              item.push(value[i][0].title,":", value[i][0].vmodel,", ");
            }           
          }
          var newValue = item.join('')
          this.$emit("update:modelValue", newValue)
        },
        deep: true
      },
      DynamicAndere:{
        handler(value) {
          var item=[]
          //titel und v-model(wert) aus DynamicAndere an das v-model uebergeben aus assesment3
          for(var i=0; i < value.length; i++){
            if(i== value.length-1) {
              //wenn es das letzte Paar ist kein Komma hinten
              item.push(value[i][0].title,":", value[i][0].vmodel);
            } else{
              item.push(value[i][0].title,":", value[i][0].vmodel,", ");
            }           
          }
          var newValue = item.join('')
          this.$emit("update:modelValue", newValue)
        },
        deep: true
      },
      DynamicMonitoring:{
        handler(value) {
          var item=[]
          //titel und v-model(wert) aus DynamicMonitoring an das v-model uebergeben aus Planung der Intervention
          for(var i=0; i < value.length; i++){
            if(i== value.length-1) {
              //wenn es das letzte Paar ist kein Komma hinten
              item.push(value[i][0].title,"/", value[i][1].title);
            } else{
              item.push(value[i][0].title,"/", value[i][1].title,", ");
            }           
          }
          var newValue = item.join('')
          this.$emit("update:modelValue", newValue)
        },
        deep: true
      }, 
    },
    methods: {
      addNewRowBilanzierung() {
        this.DynamicBilanzierung.push([
          {title: "", vmodel:"", input:true, button:true},
          {value: "weniger",id:this.subtitle+this.counter+"Weniger",name:this.subtitle+this.counter},
          {value: "entsprechend der Ernährungsempfehlung",id:this.subtitle+this.counter+"Weniger",name:this.subtitle+this.counter},
          {value: "mehr",id:this.subtitle+this.counter+"Mehr",name:this.subtitle+this.counter},
        ]);
        this.counter++;
      },
      addNewRowAndere() {
        this.DynamicAndere.push([
          {title: "", vmodel:"", input:true, button:true},
          {value:"sehr wichtig", id:this.subtitle+this.counter+"sehrWichtig", name:this.subtitle+this.counter},
          {value:"wichtig", id:this.subtitle+this.counter+"wichtig", name:this.subtitle+this.counter},
          {value:"eher wichtig", id:this.subtitle+this.counter+"eherWichtig", name:this.subtitle+this.counter},
          {value:"eher unwichtig", id:this.subtitle+this.counter+"eherUnwichtig", name:this.subtitle+this.counter},
          {value:"unwichtig", id:this.subtitle+this.counter+"unwichtig", name:this.subtitle+this.counter},
          {value:"sehr unwichtig", id:this.subtitle+this.counter+"sehrUnwichtig", name:this.subtitle+this.counter},
        ]);
        this.counter++;
      },
      addNewRowMonitoring() {
        this.DynamicMonitoring.push([
          {title: "", input:true},
          {title: "", input:true},
          {button:true}
        ]);
        this.counter++;
      },
      deleteRowBilanzierung(index) {
        this.DynamicBilanzierung.splice(index, 1);
      },
      deleteRowAndere(index) {
        this.DynamicAndere.splice(index, 1);
      },
      deleteRowMonitoring(index) {
        this.DynamicMonitoring.splice(index, 1);
      },
    }
  };
</script>
