<template>
  <div class="form-group">
    <label>{{title}}</label>
    <div class="input-group mb-4">
      <div class="input-group-prepend mr-5 mb-3" v-for="(item, index) in items" :key="index">
        <label class="input-group-text inputForm" :for="item.id">{{item.title}}</label>
        <div class="input-group-text checkbox">
          <input
            type="radio"
            :id="item.id"
            :name="item.name"           
            :value="item.title"
            v-model="value"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RadioForm",
  props: {
    items: [],
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
