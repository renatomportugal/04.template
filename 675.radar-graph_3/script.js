function hexToRgbA(hex, opacity){
        var c;
        if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
            c= hex.substring(1).split('');
            if(c.length== 3){
                c= [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c= '0x'+c.join('');
            return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+','+ opacity +')';
        }
        throw new Error('Bad Hex');
    }
    
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");

    var mainPoint = 200;
    var isInvited = true;
    var chartData = [];
    chartData = [10, 20, 0, 0];
    if(isInvited){
      // chartData = [youPeerScore, youScore, inviteeScore, inviteePeerScore];
      chartData = [10, 20, 40, 50];
    }

    var maxValue = Math.max(...chartData);
    var chartTopPadding = 30;
    var chartLeftPadding = 30;

    var yourScore = (chartData[0]* 200)/ maxValue,
        yourPeerScore = (chartData[1] * 200)/ maxValue;

    var yourInvitedScore = 0,
        yourInvitedPeerScore = 0;

    if(isInvited){
        yourInvitedScore = (chartData[2]* 200)/ maxValue,
        yourInvitedPeerScore = (chartData[3]* 200)/ maxValue;
    }

    if(chartData.length > 3){
      yourInvitedScore = (chartData[2]* 200)/ maxValue;
      yourInvitedPeerScore = (chartData[3] * 200)/ maxValue;
    }

    ctx.setLineDash([0]);

    //CENTER Y AXIS LINE
    ctx.beginPath();
    ctx.moveTo(mainPoint+ chartLeftPadding, chartTopPadding - 20);
    ctx.lineTo(mainPoint + chartLeftPadding, mainPoint + chartTopPadding);
    ctx.stroke();

    //BOTTOM X AXIS LINE
    ctx.beginPath();
    ctx.moveTo(chartLeftPadding - 20, mainPoint + chartTopPadding);
    ctx.lineTo(mainPoint*2 + chartLeftPadding + 20, mainPoint + chartTopPadding);
    ctx.stroke();

    if(!isInvited){
      var p1 = {x: mainPoint+ chartLeftPadding, y:  mainPoint+ chartTopPadding},
        p2 = {x: mainPoint + chartTopPadding - yourScore , y: mainPoint + chartTopPadding },
        p3 = {x: mainPoint + chartLeftPadding , y: mainPoint + chartTopPadding - yourScore },
        p4 = {x: mainPoint + chartTopPadding   , y: mainPoint + chartTopPadding - yourPeerScore },
        p5 = {x: mainPoint + chartLeftPadding + yourPeerScore   , y: mainPoint + chartTopPadding };

        ctx.fillStyle = hexToRgbA("#CCC", 1);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p3.x, p3.y);
        ctx.arcTo(p2.x, p3.y, p2.x, p1.x, yourScore)
        ctx.lineTo(p1.x, p1.y);
        ctx.fill();

        ctx.fillStyle = hexToRgbA("#CCC", 0.4);
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p4.x, p4.y);
        ctx.arcTo(p5.x, p4.y, p5.x, p1.x, yourPeerScore)
        ctx.lineTo(p1.x, p1.y);
        ctx.fill();
    }
    if(isInvited){
      var p1 = {x: mainPoint+ chartLeftPadding, y:  mainPoint+ chartTopPadding},
          p2 = {x: mainPoint + chartLeftPadding - yourScore  , y: mainPoint + chartLeftPadding },
          p3 = {x: p1.x + Math.cos(Math.PI * 225 / 180) * yourScore , y: p1.y + Math.sin(Math.PI * 225 / 180) * yourScore},
          p4 = {x: p1.x + Math.cos(Math.PI * 225 / 180) * yourPeerScore , y: p1.y + Math.sin(Math.PI * 225 / 180) * yourPeerScore},
          p5 = {x: mainPoint + chartTopPadding   , y: mainPoint + chartTopPadding - yourPeerScore },
          p6 = {x: mainPoint + chartLeftPadding , y: mainPoint + chartTopPadding - yourInvitedScore},
          p7 = {x: p1.x + Math.cos(Math.PI * 315 / 180) * yourInvitedScore , y: p1.y + Math.sin(Math.PI * 315 / 180) * yourInvitedScore},
          p8 = {x: p1.x + Math.cos(Math.PI * 315 / 180) * yourInvitedPeerScore , y: p1.y + Math.sin(Math.PI * 315 / 180) * yourInvitedPeerScore},
          p9 = {x: mainPoint + chartLeftPadding + yourInvitedPeerScore, y: mainPoint + chartTopPadding };
      
      ctx.beginPath();
      ctx.fillStyle = hexToRgbA("#CCC", 0.4);
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p3.x , p3.y);
      var angle = 225-45/2;
      var x1  =  p1.x + Math.cos(Math.PI * angle / 180) * parseInt((chartData[0]*1.1 * 200)/ maxValue),
          y1  =  p1.y + Math.sin(Math.PI * angle / 180) * parseInt((chartData[0]*1.1 * 200)/ maxValue);
      ctx.arcTo(x1 , y1 , p2.x, p2.y , yourScore/1.1);
      ctx.lineTo(p1.x, p1.y);
      ctx.fill();
      
      ctx.beginPath();
      ctx.fillStyle = hexToRgbA("#CCC", 1);
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p4.x , p4.y);
      var angle1 = 225+45/2;
      var x1  =  p1.x + Math.cos(Math.PI * angle1 / 180) * parseInt((chartData[1]*1.1 * 200)/ maxValue),
          y1  =  p1.y + Math.sin(Math.PI * angle1 / 180) * parseInt((chartData[1]*1.1 * 200)/ maxValue);
      ctx.arcTo(x1 , y1 , p5.x, p5.y , yourPeerScore/1.1);
      ctx.lineTo(p1.x, p1.y);
      ctx.fill();
      
      ctx.beginPath();
      ctx.fillStyle = hexToRgbA("#CCC", 1);
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p7.x , p7.y);
      var angle1 = -90 + 45/2;
      var x1  =  p1.x + Math.cos(Math.PI * angle1 / 180) * parseInt((chartData[2]*1.1 * 200)/ maxValue),
          y1  =  p1.y + Math.sin(Math.PI * angle1 / 180) * parseInt((chartData[2]*1.1 * 200)/ maxValue);
      ctx.arcTo(x1 , y1 , p6.x, p6.y , yourInvitedScore/1.1);
      // ctx.lineTo(x1 ,y1);
      ctx.lineTo(p1.x, p1.y);
      // ctx.stroke();
      ctx.fill();
      
      ctx.beginPath();
      ctx.fillStyle = hexToRgbA("#CCC", 0.4);
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p8.x , p8.y);
      var angle1 = -45/2;
      var x1  =  p1.x + Math.cos(Math.PI * angle1 / 180) * parseInt((chartData[3]*1.1 * 200)/ maxValue),
          y1  =  p1.y + Math.sin(Math.PI * angle1 / 180) * parseInt((chartData[3]*1.1 * 200)/ maxValue);
      ctx.arcTo(x1 , y1 , p9.x, p9.y , yourInvitedPeerScore/1.1);
      ctx.lineTo(p1.x, p1.y);
      ctx.fill();
      
    }

    ctx.fillStyle = "#000";
    ctx.font = "16px Open Sans";
    // 0 POINT DRAW
    ctx.fillText(`${0}`, mainPoint + chartLeftPadding - 4, mainPoint + chartTopPadding + 15);
    // FOR LEFT SIDE Y AXIS POINTS && CENTER POINTS && ARCH DRAW
    var counter = maxValue/5;
    ctx.font = "14px Open Sans";
    ctx.setLineDash([5, 4]);
    for(var i = mainPoint; i> 0; i--){
      ctx.beginPath();
      ctx.strokeStyle = "#777777";
      ctx.arc(mainPoint + chartLeftPadding, mainPoint+chartTopPadding, i+1, 1*Math.PI, 0);
      ctx.stroke();
      i = i-(mainPoint/5);
      var tempCounter = 0;
      if(counter){
        tempCounter = (counter % 1 === 0) ? counter : counter.toFixed(1) 
      }
      ctx.fillStyle = "#000";
      ctx.fillText(`${tempCounter}`, mainPoint + chartLeftPadding + 6, i + chartTopPadding);
      ctx.fillText(`${tempCounter}`, i + chartLeftPadding - 2, mainPoint + chartTopPadding + 15);
      counter = counter + maxValue / 5;
    }
    // FOR RIGHT SIDE Y AXIS POINTS
    var counter = maxValue/5;
    for(var k = 1; k < mainPoint; k++){
      k = k+ mainPoint/5;
      var tempCounter = 0;
      if(counter){
        tempCounter = (counter % 1 === 0) ? counter : counter.toFixed(1) 
      }
      ctx.fillText(`${tempCounter}`, k + mainPoint + chartLeftPadding/2, mainPoint + chartTopPadding + 15);
      counter = counter + maxValue / 5;
    }