// Flag sprites courtesy of https://github.com/lafeber/world-flags-sprite
var flagsURL = "https://raw.githubusercontent.com/willgriffiths/world-flags-sprite/d90664bb8ef27b6b1221e335d730e99db1f11ed0/images/flags16.png"

var flagHeights = {ad:-352,ae:-368,af:-384,ag:-400,ai:-416,al:-432,am:-448,ao:-464,aq:-480,ar:-496,as:-512,at:-528,au:-544,aw:-560,ax:-576,az:-592,ba:-608,bb:-624,bd:-640,be:-656,bf:-672,bg:-688,bh:-704,bi:-720,bj:-736,bm:-752,bn:-768,bo:-784,br:-800,bs:-816,bt:-832,bw:-848,by:-864,bz:-880,ca:-896,cg:-912,cf:-928,cd:-944,ch:-960,ci:-976,ck:-992,cl:-1008,cm:-1024,cn:-1040,co:-1056,cr:-1072,cu:-1088,cv:-1104,cy:-1120,cz:-1136,de:-1152,dj:-1168,dk:-1184,dm:-1200,do:-1216,dz:-1232,ec:-1248,ee:-1264,eg:-1280,eh:-1296,er:-1312,es:-1328,et:-1344,fi:-1360,fj:-1376,fm:-1392,fo:-1408,fr:-1424,yt:-1424,bl:-1424,cp:-1424,mf:-1424,ga:-1440,gb:-1456,sh:-1456,gd:-1472,ge:-1488,gg:-1504,gh:-1520,gi:-1536,gl:-1552,gm:-1568,gn:-1584,gp:-1600,gq:-1616,gr:-1632,gt:-1648,gu:-1664,gw:-1680,gy:-1696,hk:-1712,hn:-1728,hr:-1744,ht:-1760,hu:-1776,id:-1792,mc:-1792,ie:-1808,il:-1824,im:-1840,in:-1856,iq:-1872,ir:-1888,is:-1904,it:-1920,je:-1936,jm:-1952,jo:-1968,jp:-1984,ke:-2000,kg:-2016,kh:-2032,ki:-2048,km:-2064,kn:-2080,kp:-2096,kr:-2112,kw:-2128,ky:-2144,kz:-2160,la:-2176,lb:-2192,lc:-2208,li:-2224,lk:-2240,lr:-2256,ls:-2272,lt:-2288,lu:-2304,lv:-2320,ly:-2336,ma:-2352,md:-2368,me:-2384,mg:-2400,mh:-2416,mk:-2432,ml:-2448,mm:-2464,mn:-2480,mo:-2496,mq:-2512,mr:-2528,ms:-2544,mt:-2560,mu:-2576,mv:-2592,mw:-2608,mx:-2624,my:-2640,mz:-2656,na:-2672,nc:-2688,ne:-2704,ng:-2720,ni:-2736,nl:-2752,bq:-2752,no:-2768,bv:-2768,nq:-2768,sj:-2768,np:-2784,nr:-2800,nz:-2816,om:-2832,pa:-2848,pe:-2864,pf:-2880,pg:-2896,ph:-2912,pk:-2928,pl:-2944,pr:-2960,ps:-2976,pt:-2992,pw:-3008,py:-3024,qa:-3040,re:-3056,ro:-3072,rs:-3088,ru:-3104,rw:-3120,sa:-3136,sb:-3152,sc:-3168,sd:-3184,se:-3200,sg:-3216,si:-3232,sk:-3248,sl:-3264,sm:-3280,sn:-3296,so:-3312,sr:-3328,st:-3344,sv:-3360,sy:-3376,sz:-3392,tc:-3408,td:-3424,tg:-3440,th:-3456,tj:-3472,tl:-3488,tm:-3504,tn:-3520,to:-3536,tr:-3552,tt:-3568,tv:-3584,tw:-3600,tz:-3616,ua:-3632,ug:-3648,us:-3664,uy:-3680,uz:-3696,va:-3712,vc:-3728,ve:-3744,vg:-3760,vi:-3776,vn:-3792,vu:-3808,ws:-3824,xk:-160,ye:-3840,za:-3856,zm:-3872,zw:-3888,sx:-3904,cw:-3920,ss:-3936,nu:-3952}

var margin = {top: 0, right: 0, bottom: 0, left: 0},
		width = 960 - margin.left - margin.right,
		height = 680 - margin.top - margin.bottom;

var chart = d3.selectAll(".chart")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.attr("translate", "transform(" + margin.left + "," + margin.top + ")");

var tip = d3.tip().attr("class", "d3-tip")
.html(function(d) {
	return '<p>' + d.country + '</p>';
})

chart.call(tip);

var simulation = d3.forceSimulation()
		.force("link", d3.forceLink().id(function(d,i){return i;}))
		.force("center", d3.forceCenter(width/2, height/2))
		.force("charge", d3.forceManyBody().strength(function() {
			return -10;
		}).distanceMax([width/5]))

d3.json("https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json", function(data) {
	var nodes = data.nodes,
			links = data.links;
	
	var link = chart.selectAll('.link')
			.data(links)
			.enter().append('line')
			.attr('class', 'link');
	
	var node = chart.selectAll('.node')
			.data(nodes)
			.enter().append('rect')
			.attr('class', 'node')
			.attr('width', 16)
			.attr("height", 16)
			.attr('fill', function(d) {return fetchPattern(chart,d.code)})
			.on('mouseover', tip.show)
			.on('mouseout', tip.hide)
			.call(d3.drag()
					.on('start', dragstarted)
					.on('drag', dragged)
					.on('end', dragended)
			);
	
	
	simulation.nodes(nodes)
			.on('tick', ticked);
	
	simulation.force("link")
			.links(links);
	
	function ticked() {
				node.attr('x', function(d) {return d.x - 8} )
				.attr('y', function(d) {return d.y - 8});

				link.attr('x1', function(d) {return d.source.x})
				.attr('y1', function(d) {return d.source.y})
				.attr('x2', function(d) {return d.target.x})
				.attr('y2', function(d) {return d.target.y})
	};
	
	
});

function dragstarted() {
	if (!d3.event.active) simulation.alphaTarget(0.3).restart();
	d3.event.subject.fx = d3.event.subject.x; 
	d3.event.subject.fy = d3.event.subject.y; 
}

function dragged() {
	d3.event.subject.fx = d3.event.x; 
	d3.event.subject.fy = d3.event.y; 
}

function dragended() {
	if (!d3.event.active) simulation.alphaTarget(0);
	d3.event.subject.fx = null;
	d3.event.subject.fy = null;
}

function fetchPattern(chartNode, countryCode) {
	console.log(flagHeights[countryCode] || countryCode);
	chartNode.append("defs")
			.append("pattern")				
		.attr("patternUnits","objectBoundingBox")
		.attr("id", countryCode)
		.attr("width", 16)
		.attr("height", 16)
	.append("image")
		.attr("xlink:href", "https://raw.githubusercontent.com/willgriffiths/world-flags-sprite/d90664bb8ef27b6b1221e335d730e99db1f11ed0/images/flags16.png")
		.attr("width", 16)
	.attr("height", 3968)
	.attr("y", flagHeights[countryCode]);
	return 'url(#' + countryCode +')';
}