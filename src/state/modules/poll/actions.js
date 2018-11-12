import { db } from "./state";

const postSubmission = ({ commit }, payload) => {
  const encode = function(data) {
    return Object.keys(data)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
      .join("&");
  };
  return fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: encode(payload)
  }).then(() => commit("SET_SUBMISSIONS", payload));
};

export default {
  postSubmission
};
