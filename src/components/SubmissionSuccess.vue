<template>
  <div>
    <h1>Thank you for your submission!</h1>
    <div>
      <ul id="bars"
      v-for="tea in teas">
        {{ tea }}
        <li>
          <div id="poll">
            <div id="bar-text">
              <span>{{ makePercentage(submissionCounts[tea]) }}%</span>
              <span id="bar-category">{{ tea }} Fog</span>
            </div>
            <span id="bar" :style="{ width: `${makePercentage(submissionCounts[tea])}%` }"></span>
          </div>
        </li>
      </ul>
    </div>
    <router-link to="/">
      <button>Back to form</button>
    </router-link>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "SubmissionSuccess",
  computed: {
    ...mapGetters("poll", [
      "hasSubmissions",
      "submissionCounts",
      "totalSubmissionCount"
    ]),
    teas() {
      return Object.keys(this.submissionCounts);
    },
    LondonPercentage() {
      return this.makePercentage(this.submissionCounts.London);
    },
    ManchesterPercentage() {
      return this.makePercentage(this.submissionCounts.Manchester);
    },
    SeattlePercentage() {
      return this.makePercentage(this.submissionCounts.Seattle);
    },
    DublinPercentage() {
      return this.makePercentage(this.submissionCounts.Dublin);
    },
    BombayPercentage() {
      return this.makePercentage(this.submissionCounts.Bombay);
    },
    AtlanticCityPercentage() {
      return this.makePercentage(this.submissionCounts["Atlantic City"]);
    },
    TokyoPercentage() {
      return this.makePercentage(this.submissionCounts.Tokyo);
    },
    CapeTownPercentage() {
      return this.makePercentage(this.submissionCounts["Cape Town"]);
    },
    MontrealPercentage() {
      return this.makePercentage(this.submissionCounts.Montreal);
    },
    OregonMistPercentage() {
      return this.makePercentage(this.submissionCounts["Oregon Mist"]);
    }
  },
  methods: {
    makePercentage(part, whole = this.totalSubmissionCount) {
      return Math.floor((part / whole) * 100);
    }
  }
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
