const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/api', (req, res) => {
  const { slack_name, track } = req.query;
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDay = daysOfWeek[new Date().getDay()];

  const now = new Date();
  const utcTime = new Date(now.getTime() + (now.getTimezoneOffset() * 60000)).toISOString().replace(/\.\d+/, "");
  const githubFileUrl = `https://github.com/sticklo/profile-api/blob/main/index.js`;
  const githubRepoUrl = `https://github.com/sticklo/profile-api`;

  const response = {
    slack_name,
    current_day: currentDay,
    utc_time: utcTime,
    track,
    github_file_url: githubFileUrl,
    github_repo_url: githubRepoUrl,
    status_code: 200
  };

  res.json(response);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
