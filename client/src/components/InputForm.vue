<template>
  <div class="form-group">
    <div class="mb-4">
      <div class="input-group-prepend mr-5 mb-3">
        <label :for="content.id" class="input-group-text inputForm">
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
      min: String
    },
    isTipp: Boolean,
    myTipp: String,
    modelValue: String
  }
};
</script>
