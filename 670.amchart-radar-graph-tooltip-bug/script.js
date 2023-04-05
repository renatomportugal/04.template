/**
 * --------------------------------------------------------
 * This demo was created using amCharts V4 preview release.
 * 
 * V4 is the latest installement in amCharts data viz
 * library family, to be released in the first half of
 * 2018.
 *
 * For more information and documentation visit:
 * https://www.amcharts.com/docs/v4/
 * --------------------------------------------------------
 */

/* Create chart instance */
var chart = am4core.create("chartdiv", am4charts.RadarChart);

/* Add data */
chart.data = [{
  "direction": "Technological",
  "value1": 3.3,
  "value2": 4.0,
  "font_color": "green"
}, {
  "direction": "Resilient",
  "value1": 4.2,
  "value2": 4.4  ,
  "font_color": "blue"
}, {
  "direction": "Agile",
  "value1": 4.4,
  "value2": 4.8,
  "font_color": "red"
}, {
  "direction": "Analytical",
  "value1": 3.7,
  "value2": 3.3,
  "font_color": "green"
}, {
  "direction": "Innovative",
  "value1": 4.6,
  "value2": 4.0,
  "font_color": "blue"
}, {
  "direction": "Social",
  "value1": 4.3,
  "value2": 3.3,
  "font_color": "red"
}, {
  "direction": "T7",
  "value1": 4.3,
  "value2": 3.3,
  "font_color": "green"
}]

chart.svgContainer.autoResize = true;
chart.responsive.enabled = false;

/* Create axes */
var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "direction";
categoryAxis.renderer.tooltipLocation = 0.01;
var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.min = 0;
valueAxis.renderer.grid.template.opacity = 0;
valueAxis.renderer.ticks.template.strokeOpacity = 0.5;
valueAxis.renderer.ticks.template.stroke = am4core.color("#495C43");
valueAxis.renderer.ticks.template.length = 10;
valueAxis.renderer.line.strokeOpacity = 0.5;
valueAxis.renderer.baseGrid.disabled = false;
valueAxis.renderer.minGridDistance = 40;
valueAxis.cursorTooltipEnabled = true;

/* Create and configure series */
var series1 = chart.series.push(new am4charts.RadarSeries());
series1.dataFields.valueY = "value1";
series1.dataFields.categoryX = "direction";

series1.name = "Actual value";
series1.strokeWidth = 3;
series1.fillOpacity = 0.2;

series1.tooltipText = "{valueY}";
series1.tooltip.background.cornerRadius = 20;
series1.tooltip.background.strokeOpacity = 0;
series1.tooltip.pointerOrientation = "vertical";
series1.tooltip.label.minWidth = 40;
series1.tooltip.label.minHeight = 40;
series1.tooltip.label.textAlign = "middle";
series1.tooltip.label.textValign = "middle";

var series2 = chart.series.push(new am4charts.RadarSeries());
series2.dataFields.valueY = "value2";
series2.dataFields.categoryX = "direction";

series2.name = "Target value";
series2.strokeWidth = 3;
series2.fillOpacity = 0.2;

series2.tooltipText = "{valueY}";
series2.tooltip.background.cornerRadius = 20;
series2.tooltip.background.strokeOpacity = 0;
series2.tooltip.pointerOrientation = "vertical";
series2.tooltip.label.minWidth = 40;
series2.tooltip.label.minHeight = 40;
series2.tooltip.label.textAlign = "middle";
series2.tooltip.label.textValign = "middle";

chart.legend = new am4charts.Legend();
chart.cursor = new am4charts.RadarCursor();