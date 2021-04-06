<template>
  <div class="input-group-prepend mr-5 mb-3" v-for="(item, index) in items" :key="index">
    <div class="input-group">
      <input
        type="radio"
        :id="item.id"
        :name="item.name"           
        :value="item.value"
        v-model="value"
      />
    </div>
  </div>
</template>

<script>
  export default {
    name:"TableForm",
    props:{
      items:[],
      modelValue:[]
    },
    emits:["update:modelValue"],
    computed: {
      value:{
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
