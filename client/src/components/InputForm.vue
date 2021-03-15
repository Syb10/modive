<template>
  <div class="form-group">
    <div class="mb-4">
      <div class="input-group-prepend mr-5 mb-3">
        <label :for="content.id" class="input-group-text">
          {{ content.title }}
        </label>
        <input
          :type="content.type"
          class="form-control"
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
      type: String
    },
    modelValue: String
  }
};
</script>
