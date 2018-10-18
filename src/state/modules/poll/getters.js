const hasSubmissions = state => {
  if (state.submissions === null) {
    return false;
  }
  return Object.keys(state.submissions).length > 0;
};

const submissionCounts = state => {
  const teaCounts = {
    London: 0,
    Manchester: 0,
    Seattle: 0,
    Dublin: 0,
    Bombay: 0,
    "Atlantic City": 0,
    Tokyo: 0,
    "Cape Town": 0,
    Montreal: 0,
    "Oregon Mist": 0
  };
  for (const submissionId in state.submissions) {
    const teaMap = {
      London: "London Fog",
      Manchester: "Manchester Fog",
      Seattle: "Seattle Fog",
      Dublin: "Dublin Fog",
      Bombay: "Chai Fog",
      "Atlantic City": "Atlantic City Fog",
      Tokyo: "Tokyo Fog",
      "Cape Town": "Cape Town Fog",
      Montreal: "Montreal Fog",
      "Oregon Mist": "Oregon Mist Fog"
    };
    teaCounts[
      teaMap[state.submissions[submissionId].body.human_fields.Tea]
    ] += 1;
  }
  return teaCounts;
};

const totalSubmissionCount = state => {
  if (state.submissions === null) {
    return 0;
  }
  return Object.keys(state.submissions).length;
};

export default {
  hasSubmissions,
  submissionCounts,
  totalSubmissionCount
};
