const prop = {
  start: ".start",
  end: ".end",
  center: ".center",
  between: ".between",
  around: ".around",
  evenly: ".evenly",
  all: ".property" };


const timeline = gsap.timeline({});

timeline
// flex-start
.set(prop.all, { className: "property" }, prop.start).
to(prop.start, { className: "property--active" }, prop.start).
add("start")

// flex-end
.to(prop.all, { className: "property" }, prop.end).
to(prop.end, { className: "property--active" }, prop.end).
to(
".box--a",
{
  duration: 1,
  marginLeft: "46%",
  ease: "expo.out" },

prop.end).

add("end")
// center
.to(prop.all, { className: "property" }, prop.center).
to(prop.center, { className: "property--active" }, prop.center).
to(
".box--a",
{
  duration: 1,
  marginLeft: "23%",
  ease: "expo.out" },

prop.center).

add("center")
// space-around
.to(prop.all, { className: "property" }, prop.around).
to(prop.around, { className: "property--active" }, prop.around).
to(
".box--a",
{
  marginLeft: "7.7%",
  duration: 1,
  marginRight: "0",
  ease: "expo.out" },

prop.around).

to(
".box--b",
{
  duration: 1,
  marginRight: "15.25%",
  marginLeft: "15.25%",
  ease: "expo.out" },

prop.around).

add("around")
// space-between
.to(prop.all, { className: "property" }, prop.between).
to(prop.between, { className: "property--active" }, prop.between).
to(
".box--a",
{
  duration: 1,
  marginLeft: "0",
  marginRight: "23%",
  ease: "expo.out" },

prop.between).

to(
".box--b",
{
  duration: 1,
  marginLeft: "0",
  marginRight: "23%",
  ease: "expo.out" },

prop.between).

add("between")
// space-evenly
.to(prop.all, { className: "property" }, prop.evenly).
to(prop.evenly, { className: "property--active" }, prop.evenly).
to(
".box--a",
{
  marginLeft: "11.5%",
  duration: 1,
  marginRight: "0",
  ease: "expo.out" },

prop.evenly).

to(
".box--b",
{
  duration: 1,
  marginRight: "11.5%",
  marginLeft: "11.5%",
  ease: "expo.out" },

prop.evenly).

add("evenly");

const propNodes = document.querySelectorAll(".property");

propNodes.forEach(p => {
  p.addEventListener("click", e => {
    const type = e.target.getAttribute("data-type");
    timeline.pause(type);
  });
});