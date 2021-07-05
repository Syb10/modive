<template>
  <div class="form-group">
    <div class="mb-4">
      <div class="input-group-prepend mb-3">
        <label :for="content.id" class="input-group-text inputForm" :class="content.color">
          {{ content.title }}
          <div v-if="isTipp" class="tipp ml-3"> <i class="fa fa-info-circle"></i>
            <span class="tipptext">{{myTipp}}</span>
          </div>
        </label>
        <input
          :type="content.type"
          :step="content.step"
          :min="content.min"
          class="form-control inputForm"
          :class="content.border"
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
  name: "inputForm",
  props: {
    content: {
      title: String,
      id: String,
      type: String,
      step: String,
      min: String,
      color: String,
      border: String,
    },
    isTipp: Boolean,
    myTipp: String,
    modelValue: String
  }
};
</script>
