<template>
  <div class="form-group">
    <label>Geschlecht</label>
    <div class="input-group mb-4">
      <div class="input-group-prepend mr-5 mb-3" v-for="(checkbox, index) in checkboxs" :key="index">
        <label class="input-group-text" :for="checkbox.id">{{checkbox.title}}</label>
        <div class="input-group-text checkbox">
          <input
            type="checkbox"
            :id="checkbox.id"           
            :value="checkbox.title"
            v-model="geschlecht"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {createHelpers} from "vuex-map-fields";

const {mapFields} = createHelpers({
  mutationType: "updateCheckbox"
});

export default {
  name: "CheckboxForm",
  props: {
    checkboxs: [],
    modelValue: []
  },
  emits: ["update:modelValue"],
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$store.state.form.geschlecht = value
      }
    },
    test: {
      get() {
        return this.$store.state.geschlecht
      },
      set(val) {
        this.$store.state.geschlecht = val
      }
    },
    ...mapFields([
      "geschlecht"
    ])
  },
  methods: {
    changeBox() {
      this.$store.commit("changeBox", this.value);
    }
  }
};
</script>
