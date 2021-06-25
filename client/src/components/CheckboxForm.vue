<template>
  <div class="form-group">
    <label>
      {{title}}
      <div v-if="isTipp" class="tipp ml-3"> <i class="fa fa-info-circle"></i>
        <span class="tipptext">{{myTipp}}</span>
      </div>
    </label>   
    <div class="input-group mb-4">
      <div class="input-group-prepend mr-5 mb-3" v-for="(checkbox, index) in checkboxs" :key="index">
        <label class="input-group-text inputForm" :class="color" :for="checkbox.id">{{checkbox.title}}</label>
        <div class="input-group-text checkbox" :class="color">
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
    isTipp: Boolean,
    myTipp: String,
    color: String,
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
