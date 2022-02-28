<template>
  <div data-html2canvas-ignore class="input-group-prepend float-right" v-for="(checkbox, index) in checkboxs" :key="index">
    <label class="input-group-text inputForm" :class="color" :for="checkbox.id"><i class="fa fa-file-pdf-o"></i>  {{title}}</label>
    <div class="input-group-text checkbox" :class="color">
      <input
        type="checkbox"
        :id="checkbox.id"
        :value="checkbox.title"
        v-model="value"
      />
    </div>
  </div>     
</template>

<script>
export default {
  name: "CheckboxForm",
  props: {
    checkboxs: [],
    color: String,
    title: String,
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
