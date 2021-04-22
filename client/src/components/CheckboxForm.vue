<template>
  <div class="form-group">
    <label>{{title}}</label>
    <div class="input-group mb-4">
      <div class="input-group-prepend mr-5 mb-3" v-for="(checkbox, index) in checkboxs" :key="index">
        <label class="input-group-text inputForm" :for="checkbox.id">{{checkbox.title}}</label>
        <div class="input-group-text checkbox">
          <input
            type="checkbox"
            :id="checkbox.id"
            :value="checkbox.title"
            v-model="myData"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CheckboxForm",
  data() {
    return {
      myData:[]
    }
  },
  props: {
    checkboxs: [],
    title:String,
    modelValue: []
  },
  emits: ["update:modelValue"],
  watch: {
    myData (value) {
      var newValue = value.join(', ')
      this.$emit("update:modelValue", newValue)
    }
  }
};
</script>
