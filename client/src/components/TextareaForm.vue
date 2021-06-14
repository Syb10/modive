<template>
  <div class="form-group">
    <div class="mb-4">
      <div class="mr-5 mb-3">
        <label :for="content.id" class="input-group-text textareaForm normal-white-space">
          {{ content.title }}
          <div v-if="isTipp" class="tipp ml-3"> <i class="fa fa-info-circle"></i>
            <span class="tipptext">{{myTipp}}</span>
          </div>
        </label>
        <textarea
          class="form-control textareaForm"
          :id="content.id"
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TextareaForm",
  props: {
    content: {
      title: String,
      id: String,
    },    
    isTipp: Boolean,
    myTipp: String,
    modelValue: String
  }
};
</script>
