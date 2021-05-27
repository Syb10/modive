<template>
  <tr v-if="!isInput">
    <td :style="paddingLeft" >
      {{items.title}}
    </td>
    <td>
      <div class="input-group">
        <input
          type="radio"
          :id="items.weniger.id"
          :name="items.weniger.name"           
          :value="items.weniger.value"
          v-model="value"
        />
      </div>
    </td>
    <td>
      <input
        type="radio"
        :id="items.entsprechend.id"
        :name="items.entsprechend.name"           
        :value="items.entsprechend.value"
        v-model="value"
      />
    </td>
    <td>
      <input
        type="radio"
        :id="items.mehr.id"
        :name="items.mehr.name"           
        :value="items.mehr.value"
        v-model="value"
      />
    </td>
  </tr>
</template>

<script>
  export default {
    name:"BilanzierungsTable",
    props:{
      items:[],
      modelValue:[],
      paddingLeft:String,
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
    },
  };
</script>
