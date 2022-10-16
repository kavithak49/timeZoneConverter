let zoneInfo = [
    {name:"UTC",value:0},
    {name:"GMT",value:0},
    {name:"ECT",value:1},
    {name:"EET",value:2},
    {name:"ART",value:2},
    {name:"EAT",value:3},
    {name:"MET",value:3.5},
    {name:"NET",value:4},
    {name:"PLT",value:5},
    {name:"IST",value:5.5},
    {name:"BST",value:6},
    {name:"VST",value:7},
    {name:"CTT",value:8},
    {name:"JST",value:9},
    {name:"ACT",value:9.5},
    {name:"AET",value:10},
    {name:"SST",value:11},
    {name:"MIT",value:-11},
    {name:"HST",value:-10},
    {name:"AST",value:-9},
    {name:"PST",value:-8},
    {name:"PNT",value:-7},
    {name:"MST",value:-7},
    {name:"CST",value:-6},
    {name:"EST",value:-5},
    {name:"IET",value:-5},
    {name:"PRT",value:-4},
    {name:"CNT",value:-3.5},
    {name:"AGT",value:-3},
    {name:"BET",value:-3},
    {name:"CAT",value:-1}
]
const inHourEle = document.querySelector("#inHour");

for(let i=0;i<24;i++)
{
    let optionEle = document.createElement("option");
    let hourText = i+"";
    if(i<10)
    {
        hourText = "0"+hourText;
    }
    optionEle.value = i;
    optionEle.textContent=hourText;
    inHourEle.appendChild(optionEle);
}
const inMinEle = document.querySelector("#inMin");

for(let i=0;i<60;i++)
{
    let optionEle = document.createElement("option");
    let minText = i+"";
    if(i<10)
    {
        minText = "0"+minText;
    }
    optionEle.value = i;
    optionEle.textContent=minText;
    inMinEle.appendChild(optionEle);
}
const inZoneEle = document.querySelector("#inZone");
for(let i in zoneInfo)
{
    let optionEle = document.createElement("option");
    optionEle.value = zoneInfo[i].value;
    optionEle.textContent=zoneInfo[i].name;
    inZoneEle.appendChild(optionEle);
}

const outHourEle = document.querySelector("#outHour");

for(let i=0;i<24;i++)
{
    let optionEle = document.createElement("option");
    let hourText = i+"";
    if(i<10)
    {
        hourText = "0"+hourText;
    }
    optionEle.value = i;
    optionEle.textContent=hourText;
    outHourEle.appendChild(optionEle);
}
const outMinEle = document.querySelector("#outMin");

for(let i=0;i<60;i++)
{
    let optionEle = document.createElement("option");
    let minText = i+"";
    if(i<10)
    {
        minText = "0"+minText;
    }
    optionEle.value = i;
    optionEle.textContent=minText;
    outMinEle.appendChild(optionEle);
}
const outZoneEle = document.querySelector("#outZone");
for(let i in zoneInfo)
{
    let optionEle = document.createElement("option");
    optionEle.value = zoneInfo[i].value;
    optionEle.textContent=zoneInfo[i].name;
    outZoneEle.appendChild(optionEle);
}

let GMTHr=0;
let GMTMn=0;

inHourEle.addEventListener("change",()=>{
    updateGMT(Number(inHourEle.value),Number(inMinEle.value),inZoneEle.value);
    updateTime(outHourEle,outMinEle,outZoneEle);
})
inMinEle.addEventListener("change",()=>{
    updateGMT(Number(inHourEle.value),Number(inMinEle.value),inZoneEle.value);
    updateTime(outHourEle,outMinEle,outZoneEle);
})
inZoneEle.addEventListener("change",()=>{
    updateGMT(Number(inHourEle.value),Number(inMinEle.value),inZoneEle.value);
    updateTime(outHourEle,outMinEle,outZoneEle);
})
outHourEle.addEventListener("change",()=>{
    updateGMT(Number(outHourEle.value),Number(outMinEle.value),outZoneEle.value);
    updateTime(inHourEle,inMinEle,inZoneEle);
})
outMinEle.addEventListener("change",()=>{
    updateGMT(Number(outHourEle.value),Number(outMinEle.value),outZoneEle.value);
    updateTime(inHourEle,inMinEle,inZoneEle);
})
outZoneEle.addEventListener("change",()=>{
    updateTime(outHourEle,outMinEle,outZoneEle);
})

function updateGMT(hours,minutes,offset)
{
    let offsetHr = Math.floor(offset);
    let offsetMin = (offset-offsetHr)*60;
    GMTHr = hours-offsetHr;
    GMTMn = minutes-offsetMin;
    if(GMTMn<0)
    {
        GMTHr--;
        GMTMn+=60;
    }  
    if(GMTHr<0)
    {
        GMTHr+=24;
    }
    if(GMTHr>23)
    {
        GMTHr-=24;
    }
    if(GMTMn>59)
    {
        GMTHr++;
        GMTMn-=60;
    }
}

function updateTime(hourEle,minEle,zoneEle)
{
    let Offset = zoneEle.value;
    let offsetHr = Math.floor(Offset);
    let offsetMin = (Offset-offsetHr)*60;
    let outputHr = GMTHr+offsetHr;
    let outputMin = GMTMn+offsetMin;
   if(outputHr>23)
    {
        outputHr-=24;
    }
    if(outputMin>59)
    {
        outputHr++;
        outputMin-=60;
    }
    if(outputMin<0)
    {
        outputHr--;
        outputMin+=60;
    }  
    if(outputHr<0)
    {
        outputHr+=24;
    }
    hourEle.value=outputHr;
    minEle.value=outputMin; 
}