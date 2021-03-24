<template>
  <div class="form-group">
    <label>{{title}}</label>
    <div class="input-group mb-4">
      <div class="input-group-prepend mr-5 mb-3" v-for="(checkbox, index) in checkboxs" :key="index">
        <label class="input-group-text" :for="checkbox.id">{{checkbox.value}}</label>
        <div class="input-group-text checkbox">
          <input
            type="radio"
            :id="checkbox.id"
            :name="checkbox.name"           
            :value="checkbox.value"
            v-model="value"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CheckboxForm",
  props: {
    checkboxs: [],
    title:String,
    modelValue: []
  },
  emits: ["update:modelValue"],
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit("update:modelValue", value)
      }
    }
  }
};
</script>
