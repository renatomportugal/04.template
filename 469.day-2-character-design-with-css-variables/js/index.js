
 let cssVariableJSON = {
    "--floor-color":"#cbdde7",  
    "--cap-bright-color":"#ed4742",
    "--cap-dark-color":"#cf3d37",
    "--purple-ribbon":"#92418e",
    "--cap-dark-yellow": "#f6a63b",
    "--cap-bright-yellow":"#fbc93c",
    "--cap-hair-color":"#05243a",
    "--skin-dark-color":"#ed927d",
    "--skin-bright-color":"#f7bf9a",
    "--eye-color":"#052438",
    "--eye-patch-color":"#ed686a",
    "--hair-color":"#05243a",
    "--shirt-bright-color":"#3a6cb5",
    "--shirt-dark-color":"#293a95",
    "--coat-dark-color":"#672c65",
    "--coat-bright-color":"#92418e",
    "--shoe-color":"#05243a",
    "--button-color":"#fff",
 };
 function loadAllCSSVariables(cssVariableJSON)
 {
    let keys = Object.keys(cssVariableJSON);
    let colorsContainer = document.querySelector('.colors');
    for(i = 0; i<keys.length;i++)
    {
        let templateContent = `<li class="color">
        <span class="color__palette"><input type="color" data-cssvar ="${keys[i]}" id="color${keys[i]}" value="${cssVariableJSON[keys[i]]}" oninput="changeColorviaInput(this,this.value)"/></span>
        <span class="color__name">${keys[i]}</span>
        <input type="text" data-cssvar ="${keys[i]}" value ="${cssVariableJSON[keys[i]]}" id="color__code" onchange="changedColor(this,this.value)" class="color${keys[i]}"/>
        </li>`;
        const template = document.createElement('template');
        template.innerHTML = templateContent;
        colorsContainer.appendChild(template.content.cloneNode(true));
    }
 }

 function changedColor(element,value)
 {
    let cssVariable = element.getAttribute('data-cssvar');
     let root =document.documentElement;
     let colorInputElement = document.querySelector('#color'+cssVariable);
   console.log(colorInputElement);
   try{
    colorInputElement.value = value;
   }
   catch(err)
   {
       alert(err);
   }
     if(root)
     {
          root.style.setProperty(cssVariable,value);
     }
 }
 function changeColorviaInput(element,value)
 {
    let cssVariable = element.getAttribute('data-cssvar');
     let root =document.documentElement;
     let colorInputElement = document.querySelector('.color'+cssVariable);
   console.log(colorInputElement);
   try{
    colorInputElement.value = value;
   }
   catch(err)
   {
       console.err(err);
   }
     if(root)
     {
          root.style.setProperty(cssVariable,value);
     }
 }
 window.onload = loadAllCSSVariables(cssVariableJSON);