<template>
    <div>
      <div>
        <button
          v-for="tab in tabs"
          :key="tab.id"
          class="btn mb-5"
          :class="['tab-button tab-button-assessment', {active:currentTab === tab.id}]"
          @click.prevent="currentTab = tab.id"
        >
          <span v-show="currentTab === tab.id">{{tab.namelang}}</span>
          <span v-show="currentTab !== tab.id">{{tab.namekurz}}</span>
        </button>
      </div>
      <keep-alive>
        <component :is="currentTab"></component>
      </keep-alive>
    </div>
</template>

<script>
import assessment1 from "./Assessment1.vue";
import assessment2 from "./Assessment2.vue";
import assessment3 from "./Assessment3.vue";
import assessment4 from "./Assessment4.vue";

export default {
  name: 'assessment',
  data() {
    return {
      currentTab: "assessment1",
      tabs: [
        {id:"assessment1", namelang:"1. Patient*innenhistorie/Krankengeschichte", namekurz:"1."},
        {id:"assessment2", namelang:"2. Ernährungsgewohnheiten", namekurz:"2."},
        {id:"assessment3", namelang:"3. Verhalten und Umfeld", namekurz:"3."},
        {id:"assessment4", namelang:"4. Klinischer Status", namekurz:"4."}
      ]
    }
  },
  components: {
    assessment1,
    assessment2,
    assessment3,
    assessment4
  },
};
</script>
