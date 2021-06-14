<template>
  <tr>
    <td  v-for="(item, index) in items" :key="`item-${index}`" :class="item.class">
      {{item.title}}
      <div v-if="item.value" class="input-group">
        <input
          type="radio"
          :id="item.id"
          :name="item.name"           
          :value="item.value"
          v-model="value"
        />
      </div>
    </td>
  </tr>   
</template>

<script>
  export default {
    name:"RadioTable",
    props:{
      items:[],
      modelValue:[],
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
      },       
    },
  };
</script>

<style scoped>
.paddingLeft{
  padding: .75rem .75rem .75rem 2.25rem;
}
</style>