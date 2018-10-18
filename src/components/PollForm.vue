<template>
  <div id="vue">
    <h2>What would you like for tea?</h2>
    <form name="vue-tea-form" method="post" data-netlify="true" data-netlify-honeypot="bot-field" @submit.prevent="handleSubmit">
      <input type="hidden" name="form-name" value="vue-tea-form" />
      <div class="tea">
        <h2>Tea</h2>
        <label
          :class="{'tea-label': true, 'checked': tea === chosenTea}"
          v-for="tea in teaNames"
          :key="tea">
          <input
          id="tea"
          name="tea"
          type="radio"
          :value="tea"
          v-model="chosenTea">
          <span>{{ tea }}</span>
        </label>
    </div>
    <div class="milk">
      <h2>Milk</h2>
      <label
        v-for="milk in milkNames"
        :key="milk"
        :class="{
          'tea-label': true,
          'checked': milk === chosenMilk,
          'disabled': isMilkDisabled(milk)
        }"
        >
        <input
        id="milk"
        name="milk"
        type="radio"
        :disabled="isMilkDisabled(milk)"
        :value="milk"
        v-model="chosenMilk">
        <span>{{milk}}</span>
      </label>
  </div>
  <div class="phone"></div>
  <button type="submit" class="submit-button">Order Up!</button>  
</form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "PollForm",
  data() {
    return {
      chosenTea: "Earl Grey",
      chosenMilk: "Whole Milk",
      teaTypes: {
        "Earl Grey": ["London", "Manchester", "Seattle"],
        "Irish Breakfast": ["Dublin"],
        Chai: ["Bombay"],
        Rose: ["Atlantic City"],
        Matcha: ["Tokyo"],
        Rooibos: ["Cape Town"],
        "Yerba Mate": ["Montreal"],
        Green: ["Oregon Mist"]
      },
      milkTypes: {
        "Whole Milk": [
          "London",
          "Oregon Mist",
          "Dublin",
          "Bombay",
          "Atlantic City",
          "Tokyo",
          "Cape Town",
          "Montreal"
        ],
        "Soy Milk": ["Manchester", "Seattle"]
      }
    };
  },
  methods: {
    ...mapActions("poll", ["fetchSubmissions", "postSubmission"]),
    isMilkDisabled(milk) {
      //blargh//
      const tea = this.teaTypes[this.chosenTea].filter(element =>
        this.milkTypes[milk].includes(element)
      );
      //pick other milk//
      if (this.chosenMilk === milk && tea.length === 0) {
        var idx = Object.keys(this.milkTypes).indexOf(milk);
        if (idx === 0) {
          this.chosenMilk = Object.keys(this.milkTypes)[1];
        } else {
          this.chosenMilk = Object.keys(this.milkTypes)[0];
        }
      }
      return tea.length === 0;
    },
    handleSubmit() {
      debugger;
      this.postSubmission({
        "form-name": "vue-tea-form",
        tea: this.name
      })
        .then(() => {
          this.$router.push("thanks");
        })
        .catch(() => {
          this.$router.push("404");
        });
    }
  },
  created() {
    this.fetchSubmissions();
  },
  computed: {
    teaNames() {
      return Object.keys(this.teaTypes);
    },
    milkNames() {
      return Object.keys(this.milkTypes);
    },
    name() {
      const tea = this.teaTypes[this.chosenTea].filter(element =>
        this.milkTypes[this.chosenMilk].includes(element)
      );
      return tea;
    }
  }
};
</script>

<style lang="scss">
button {
  text-align: center;
}
li {
  list-style: none;
  max-width: 100px;
  margin: 0 auto;
  text-align: left;
}
ul {
  text-align: center;
  padding: 0;
}
span {
  font-size: 1.35em;
  font-weight: 300;
}

body {
  background-color: #3bb881;
}
#vue {
  h2 {
    font-size: 2em;
  }
  & .submit-button {
    width: 100%;
    padding: 20px 60px;
    outline: none;
    background-color: #282c34;
    border: none;
    border-radius: 5px;
    box-shadow: 0 9px #95a5a6;
    font-size: 1.2em;
    color: white;

    &:hover {
      cursor: pointer;
    }
  }
}

#vue {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  & > * {
    flex: 1 100%;
  }
}

.tea {
  width: 300px;
}

li {
  margin-bottom: 1em;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

h1 {
  text-align: center;
}

p,
label {
  color: #64b587;
  font-weight: bold;
}
.tea-label {
  display: block;
  position: relative;
  color: rgba(14, 30, 37, 0.54);
  font-weight: 300;
  font-size: 1.35em;
  padding: 10px 10px 10px 30px;
  margin: 10px auto;
  height: 30px;
  z-index: 9;
  cursor: pointer;
  -webkit-transition: all 0.25s linear;
  &.disabled {
    opacity: 0.5;
  }
  &:before {
    content: "";
    display: inline-block;
    border: 5px solid #282c34;
    border-radius: 100%;
    height: 25px;
    width: 25px;
    top: 30px;
    left: 20px;
    z-index: 5;
    transition: border 0.25s linear;
    -webkit-transition: border 0.25s linear;
    + .checked {
      background: red;
    }
  }
  & span {
    position: absolute;
    top: 15px;
    margin-left: 15px;
  }
}
.checked {
  &:before {
    //background: white;
  }
  &:after {
    content: "";
    display: block;
    background: #282c34;
    border-radius: 100%;
    height: 15px;
    width: 15px;
    top: 20px;
    left: 40px;
    z-index: 5;
    transition: border 0.25s linear;
    -webkit-transition: border 0.25s linear;
    position: absolute;
  }
}

input[type="radio"] {
  position: absolute;
  opacity: 0;
}

.notification {
  position: fixed;
  z-index: 5;
  box-sizing: border-box;
  top: 10px;
  right: 10px;
  width: 179px;
  padding: 20px;
  box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.3);
  overflow: hidden;
  border-radius: 3px;
  background: white;
  color: #64b587;
  border-bottom: 5px solid #64b587;

  &--remove {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 15px;

    &:hover {
      cursor: pointer;
    }
  }
}

.fa {
  position: relative;
  width: 100%;
  text-align: center;
}

.fa-check {
  color: #64b587;
}

.fa-exclamation {
  color: #e74e50;
}

button {
  border: none;
}
</style>
