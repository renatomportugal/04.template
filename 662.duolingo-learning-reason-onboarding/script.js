// Data
const data = [
{
  n: "Brain Training",
  s:
  "https://d35aaqx5ub95lt.cloudfront.net/images/user-motivation-survey/brain-training.svg" },

{
  n: "Culture",
  s:
  "https://d35aaqx5ub95lt.cloudfront.net/images/user-motivation-survey/culture.svg" },

{
  n: "Family & Friends",
  s:
  "https://d35aaqx5ub95lt.cloudfront.net/images/user-motivation-survey/family-and-friends.svg" },

{
  n: "Job Opportunities",
  s:
  "https://d35aaqx5ub95lt.cloudfront.net/images/user-motivation-survey/job-opportunities.svg" },

{
  n: "School",
  s:
  "https://d35aaqx5ub95lt.cloudfront.net/images/user-motivation-survey/school.svg" },

{
  n: "Travel",
  s:
  "https://d35aaqx5ub95lt.cloudfront.net/images/user-motivation-survey/travel.svg" },

{
  n: "Just For Fun",
  s: "https://d35aaqx5ub95lt.cloudfront.net/images/owls/spread.svg" },

{
  n: "Other",
  s:
  "https://d35aaqx5ub95lt.cloudfront.net/images/user-motivation-survey/other.svg" }];



// DOM ref handles
const content = document.querySelector(".content");

// Generate cards
data.forEach(d => {
  // HTML card template
  let html = `
		<div class="card">
			<img src="${d.s}">
			<p>${d.n}</p>
		</div>
	`;
  // Push card template to content div
  content.innerHTML += html;
});