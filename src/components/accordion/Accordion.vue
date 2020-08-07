<template>
  <div class="accordion">
    <div class="accordion__title purple darken-1">
      <p>Title</p>
    </div>
    <div class="accordion__content">
      <ul>
        <li>1</li>
        <li>1</li>
        <li>1</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.accordion {
}

.accordion__title {
  color: #ffff;
  font-size: 20px;
  text-transform: capitalize;
  padding-left: 20px;
}

.accordion__title p {
  margin: 0;
  padding: 0;
}

.accordion__content {
  border: 0.1px solid #8e24aa;
}

.accordion__content ul {
  margin: 0;
}

.accordion__content ul li {
  padding: 15px 20px;
  border-bottom: 0.1px solid #8e24aa;
}

.accordion__content ul li:last-child {
  border: none;
}
</style>