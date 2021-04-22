<template>
  <div class="form-group">
    <label>Wohnsituation</label>
    <div class="input-group mb-4">
      <div class="input-group-prepend mr-5 mb-3" v-for="(checkbox, index) in checkboxs" :key="index">
        <label class="input-group-text inputForm" :for="checkbox.id">{{checkbox.title}}</label>
        <div class="input-group-text checkbox">
          <input
            type="checkbox"
            :id="checkbox.id"
            :name="checkbox.name"
            :value="checkbox.value"
            v-model="wohnsituation"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WohnsituationForm",
  props: {
    checkboxs: []
  },
  computed: {
    wohnsituation: {
      get() {
        return this.$store.state.form.wohnsituation
      },
      set(value) {
        this.$store.dispatch("changeWohnsituation", value)
      }
    }
  }
};
</script>
