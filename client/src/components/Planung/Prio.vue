<template>
  <div>
    <p v-if="priorisierung == 0" class="alert alert-danger">In der Diagnosestellung wurden noch keine PASR-Statements erfasst</p>
    <div v-if="priorisierung != 0">
      <div v-for="(prio, indexI) in priorisierung" :key="indexI" class="mb-4">
        <select :id="indexI" v-model="myPrio[indexI]">
          <option v-for="(p, index) in priorisierung" :key="index" :value="index+1" >{{index+1}}</option>
        </select>
        <label :for="indexI" v-html="prio" class="ml-2 label-prio"></label>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapFields} from "vuex-map-fields";
  export default {
    name:"Prio",
    props:{
      modelValue:[],
    },
    emits:["update:modelValue"],
    data() {
      return {
        myPrio:[],
      }
    },
    computed: {
      ...mapFields([
        "diagnosestellung",
      ]),
      priorisierung() {
        if(this.diagnosestellung != undefined) {
          return this.diagnosestellung.split('<br><br>')
        }
        return 0
      },
    },
    watch: {
      // see https://v3.vuejs.org/guide/migration/watch.html#overview
      myPrio:{
        handler(value) {
          var item=[]
          for(var i=0; i < value.length; i++){
            item.push("<p>"+value[i]+". "+this.priorisierung[i]+"</p>");
            item.sort();     
          }
          var newValue = item.join('')
          this.$emit("update:modelValue", newValue)
        },
        deep: true
      },
    },   

  }
</script>