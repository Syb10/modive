<template>
  <div>
    <p v-if="pasr == ''" class="alert alert-danger">In der Diagnosestellung wurden noch keine PASR-Statements erfasst.</p>
    <div v-if="pasr != ''">
      <div v-for="(item, indexI) in pasr" :key="indexI" class="mb-4">
        <select :id="indexI" v-model="priorisierung[indexI]">
          <option v-for="(p, index) in pasr" :key="index" :value="index+1" >{{index+1}}</option>
        </select>
        <label :for="indexI" v-html="item" class="ml-2 label-prio"></label>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  export default {
    name:"Prio",
    computed: {
      pasr() {
        return this.$store.state.d.pasr
      },
      priorisierung: {
        get() {
          return this.$store.state.p.priorisierung
        },
        set(value) {
          this.$store.commit("p/priorisierung", value)
        }
      },
      ...mapGetters("p",[
        "joinPrio"
      ])
    },
  }
</script>