var options = {
          colors: ['#0010F7','#FF0022', '#00F7BF'],
          series: [{
            name: 'SEO Visits',
            data: [20, 100, 40, 30, 50, 80],
            },
           {
             name: 'Organic',
             data: [62, 35, 51, 76, 63, 50],
           },
           {
             name: 'Sponsored',
             data: [86, 53, 11, 53, 93, 62],
           }
          ],
          chart: {
            toolbar:{
              show: false
            },
            height: 560,
            type: 'radar',
        },
        legend:{
          fontFamily: 'Kulim park',
          fontSize: '24px',
          fontWeight: 'bold',
          show: true,
          position: 'bottom',
          offsetY: -20,
          itemMargin: {
            horizontal: 30
          },
          markers:{
            width: 8,
            height: 8,
            offsetX: '-10px',
            offsetY: 0,
          }
        },
        dataLabels: {
          enabled: true
        },
        stroke: {
          
        },
        plotOptions: {
          radar: {
            size: 140,
            polygons: {
              strokeColors: '#F0F3F5',
              fill: {
                colors: ['#fff']
              }
            }
          }
        },
        title: {
          text: 'Site Traffic',
          offsetX: 20,
          offsetY: 20,
          style: {
            fontFamily:'Kulim Park',
            color: '#2D3436',
            fontSize: '28px'
          }
        },
        dataLabels:{
          show: false
        },
        markers: {
          size: 4,
          colors: ['transparent'],
          strokeColor: 'transparent',
          strokeWidth: 2,
        },
        tooltip: {
          y: {
            formatter: function(val) {
              return val
            }
          }
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          labels:{
            style:{
              fontfamily:'Kulim park',
              fontSize: '12px',
              colors: ['#B2BEC3','#B2BEC3','#B2BEC3','#B2BEC3','#B2BEC3','#B2BEC3',]
            }
          }
        },
        yaxis: {
          tickAmount: 6,
          show: false,
          
        }
        };

        var chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();