<template>
  <div class="accordion">
    <div @click="active=!active" class="accordion__title purple darken-1">
      <p>{{ item.title }}</p>
    </div>
    <transition name="slide">
      <ul v-if="active" class="accordion__content">
        <li v-for="(ingredient,index) in item.ingredients" :key="index">{{ ingredient }}</li>
      </ul>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      active: false
    };
  }
};
</script>

<style>
.accordion {
}

.accordion__title {
  color: #ffff;
  font-size: 20px;
  text-transform: capitalize;
  padding-left: 20px;
  cursor: pointer;
  transition: 0.4s ease;
  border-bottom: 0.1px solid #f1f1f1;
}

.accordion__title:hover {
  opacity: 0.8;
}

.accordion__title p {
  margin: 0;
  padding: 0;
}

.accordion__content {
  border: 0.1px solid #8e24aa;
}

.accordion__content {
  transform-origin: top;
  overflow: hidden;

  margin: 0;
}

.accordion__content li {
  padding: 15px 20px;
  border-bottom: 0.1px solid #8e24aa;
}

.accordion__content ul li:last-child {
  border: none;
}

.slide-enter-active {
  -moz-transition-duration: 0.3s;
  -webkit-transition-duration: 0.3s;
  -o-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -moz-transition-timing-function: ease-in;
  -webkit-transition-timing-function: ease-in;
  -o-transition-timing-function: ease-in;
  transition-timing-function: ease-in;
}

.slide-leave-active {
  -moz-transition-duration: 0.3s;
  -webkit-transition-duration: 0.3s;
  -o-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.slide-enter-to,
.slide-leave {
  max-height: 100px;
  overflow: hidden;
}

.slide-enter,
.slide-leave-to {
  overflow: hidden;
  max-height: 0;
}
</style>