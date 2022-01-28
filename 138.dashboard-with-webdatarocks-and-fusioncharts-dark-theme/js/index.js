var pivot = new WebDataRocks({
    container: "#wdr-component",
    toolbar: true,
    report: {
    dataSource: {
       "dataSourceType": "csv",
        "filename": "https://cdn.webdatarocks.com/data/data.csv"
    },
    slice: {
				rows: [
					{ uniqueName: "Country" }
				],
				columns: [
					{ uniqueName: "Business Type" },
					{ uniqueName: "[Measures]" }
				],
				measures: [
					{ uniqueName: "Price" }
				]
    }
  },
  height: 380,
  width: "100%",
  toolbar: true,
  reportcomplete: function() {
    pivot.off("reportcomplete");
    createFusionChart();
  }
});

function createFusionChart() {
	var chart = new FusionCharts({
		"type": "radar",
		"renderAt": "fusionchartContainer",
     "width": "100%",
    "height":350
	});

	pivot.fusioncharts.getData({
    	type: chart.chartType()
	}, function(data) {
		chart.setJSONData(data);
    chart.setChartAttribute("theme", "candy"); // apply the FusionCharts theme
		chart.render();
	}, function(data) {
		chart.setJSONData(data);
    chart.setChartAttribute("theme", "candy"); // apply the FusionCharts theme
	});
}