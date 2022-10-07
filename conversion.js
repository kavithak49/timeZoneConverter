const inputTimeEle = document.getElementById("inTime");
const inputZoneEle = document.getElementById("inZone");
const outputTimeEle = document.getElementById("outTime");
const outputZoneEle = document.getElementById("outZone");
let gmtHours = 0;
let gmtMinutes = 0;

function updateGMTFromInTime()
{
    let timeVal = inputTimeEle.value.split(":");
    let inHours = Number(timeVal[0]);
    let inMinutes = Number(timeVal[1]);

    let inputOffset = Number(inputZoneEle.value);
    let offsetHr = Math.floor(inputOffset);
    let offsetMin = (inputOffset-offsetHr)*60;
    gmtHours = inHours-offsetHr;
    gmtMinutes = inMinutes-offsetMin;
    if(gmtMinutes<0)
    {
        gmtHours--;
        gmtMinutes+=60;
    }
    console.log(gmtHours+":"+gmtMinutes);
    updateOutTime();
}
inputTimeEle.addEventListener("change",()=>
{
    updateGMTFromInTime();
})

function updateOutTime()
{
    let Offset = Number(outputZoneEle.value);
    let offsetHr = Math.floor(Offset);
    let offsetMin = (Offset-offsetHr)*60;
    let outputHr = gmtHours+offsetHr;
    let outputMin = gmtMinutes+offsetMin;
    if(outputMin>59)
    {
        outputHr++;
        outputMin-=60;
    }
    if(outputMin<10)
        {
            outputMin = "0"+outputMin;
        }
    if(outputHr<10)
    {
        outputHr = "0"+outputHr;
    }
    outputTimeEle.value=outputHr+":"+outputMin;
}

inputZoneEle.addEventListener("change",()=>
{
    updateGMTFromInTime();
})






outputZoneEle.addEventListener("change",()=>
{
    updateGMTFromInTime();
})