<template>
  <div>
    <h1>Thank you for your submission!</h1>
    <router-link to="/">
      <button>Back to form</button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "SubmissionSuccess"
};
</script>

<style scoped lang="scss">
#bars {
  margin: 0 auto;
  max-width: 500px;
}
#poll {
  position: relative;
  text-align: left;
}
li {
  &:not(:first-child) {
    margin-top: 0.5em;
  }
}
#bar {
  position: absolute;
  height: 30px;
  width: 0;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 0;
  background-color: #3c6da752;
  transition: all 0.3s cubic-bezier(0.5, 1.2, 0.5, 1.2);
  -webkit-transition: all 0.3s cubic-bezier(0.5, 1.2, 0.5, 1.2);
}
#bar-text,
span {
  display: inline-block;
  margin: 0 10px;
  padding: 5px 0;
  font-size: 1em;
}
#bar-category {
  margin: 0 15px;
}
button {
  margin-top: 1em;
}
</style>
