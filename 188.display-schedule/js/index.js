((window) => {
  let now = moment()

  // JSON DATA
  let schedule = [
    {
      day: "",
      date: now,
      agenda: [
        {range: ['6:30', '08:00'], location: 'Booth B', desc: 'Good Morning London', bg:"url(http://telecoms.com/wp-content/blogs.dir/1/files/2012/05/London.jpg)"},
        
        {range: ['09:00', '09:30'], location: 'Booth A', desc: 'Navigating and Networking ISM2017', bg:"url(https://upload.wikimedia.org/wikipedia/commons/6/62/Defense.gov_News_Photo_110609-D-XH843-003_-_Secretary_of_Defense_Robert_M._Gates_attends_the_NATO_and_non-NATO_ISAF_contributing_nations_meeting_during_the_NATO_formal_Defense_Ministerial_in.jpg)"},
        
        {range: ['09:30', '10:00'], location: 'Main', desc: 'Poster gallery and exhibition open', bg:"url(http://www.renaissancesociety.org/media/files/rs_7341.jpg)"},
        
        {range: ['10:00', '12:00'], location: 'West wing', desc: 'Morning parallel sessions', bg:"url(http://c2cinspiredlab.eu/wp-content/uploads/2015/07/6-parallel-session-Remko-Zuidema.jpg)"},
        {range: ['12:00', '12:30'], location: 'Lounge', desc: 'Refreshment break', bg:"url(https://reeecillinois.files.wordpress.com/2015/05/refreshments-2.jpg)"},
        {range: ['12:30', '18:00'], location: 'East Wing', desc: 'Afternoon parallel sessions', bg:"url(https://upload.wikimedia.org/wikipedia/commons/3/34/Secretary_Kerry_Holds_Initial_Meeting_with_Interagency_Team_%289757144093%29.jpg)"},
        
        {range: ['18:00', '23:15'], location: 'Rooftop <br /><small>&amp; Gardens</small>', desc: 'After party', bg:"url(https://s-media-cache-ak0.pinimg.com/originals/c3/ce/0a/c3ce0a214166f132d96be4641560a656.jpg)"}
      ]
    }
  ]

  let timeFromNum = (num, sep, ampm) => {
    let hh = parseInt(num);
    let mm = Math.round((num-hh) * 60);
    if(mm == 60){hh +=1; mm=0;}
    sep = sep || '';
    return (hh)+sep+('00'+mm).substr(-2);
  }

  let numFromTime = (time) => {
    let set = time.split(/[.:]/)
    let hh = parseInt(set[0])
    let mm = set[1] ? parseInt(set[1]) : 0
    return parseFloat((hh + mm / 60).toFixed(1))
  }

  let app = new Vue({
    el: 'aside',
    data: {
      now: numFromTime(moment(now).format('HH:mm')),
      time: moment().format('HH:mm'),
      showTimeTraveller: false
    }
  })

  let sked = new Vue({
    el: 'main',
    filters: {
      date: function(date) {
        return date.format('ddd, MMM D');
      }
    },
    data: {
      now: numFromTime(moment(now).format('HH:mm')),
      schedule: schedule
    },
    methods: {
      checkTime: function(ts, te) {
        return (this.now >= numFromTime(ts) && this.now < numFromTime(te))
      },
    }
  }) 

  let setClockPos = () => {
    setTimeout(() => {
      let anchor = document.querySelector('.current')
      let t = '1em'
      if(anchor) {
        t = Math.round(anchor.getBoundingClientRect().top) + 'px'
      }
      document.documentElement.style.setProperty('--y', t)
          var agen = sked.schedule[0].agenda;
    for(var i =0; i< agen.length; i++){
      if(sked.checkTime(agen[i].range[0],agen[i].range[1])){
        document.documentElement.style.setProperty('--bg', agen[i].bg);
        if(agen[i+1]){
          var nxt = document.getElementById("upNext");
          nxt.style.display = "block";
          var nxtitem = agen[i+1];
          nxt.innerHTML="<h7>Next: " + nxtitem.desc + "</h7><br><small>" + nxtitem.range[0] + " @ " + nxtitem.location;
        }else{
          var nxt = document.getElementById("upNext");
          nxt.style.display = "none";
        }
      } 
    }
    }, 350)
  }
  
  let timeTraveler

  let setTime = function() {
    let now = moment()
    app.now = sked.now = numFromTime(moment(now).format('HH:mm'))
    app.time = moment(now).format('HH:mm')
  }

  let runTimer = () => {
    setClockPos()
    timeTraveler = setInterval(function() {
      setTime()
    }, 60000)
  }

  runTimer()

  var targettime = 7;
  let demoTimer = () => {
    targettime+=0.0075;
    app.time = timeFromNum(targettime, ':', true)
    sked.now = targettime
    setClockPos();
    if(targettime < 23.8){
    timeTraveler = setTimeout(function() {
      demoTimer();
    }, 25);
    }else{
      targettime= 7;
     setTime();
     timeTraveler = setTimeout(function() {
      demoTimer();
    }, 15000);
    } 
  }
  
      demoTimer()
    
  // resize capture
  let resizeTimer
  window.addEventListener('resize', (e) => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      setClockPos()
    }, 60);
  }, false)
  
})(window)