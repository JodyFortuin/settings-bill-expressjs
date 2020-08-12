var settingsFact = billWithSettings();
var billSettingsElem = document.querySelectorAll(".billItemTypeWithSettings");

const callTotalSetElem = document.querySelector(".callTotalSettings");
const smsTotalSetElem = document.querySelector(".smsTotalSettings");
const totalSetElem = document.querySelector(".totalSettings");

const callCostSetElem = document.querySelector(".callCostSetting");
const smsCostSetElem = document.querySelector(".smsCostSetting");

const warningSetElem = document.querySelector(".warningLevelSetting");
const criticalSetElem = document.querySelector(".criticalLevelSetting");
const updateSetElem = document.querySelector(".updateSettings");
const setAddBtnElem = document.querySelector(".addButton");

  
function update(){
 settingsFact.setCallCost(Number(callCostSetElem.value));
 settingsFact.setSmsCost(Number(smsCostSetElem.value));
 settingsFact.setWarnLevel(Number(warningSetElem.value));
 settingsFact.setCritLevel(Number(criticalSetElem.value));
 settingsFact.alertColor();
}

function setAddBtnClicked(){
   
  var checkedRadioBtnSet = document.querySelector("input[name='billItemTypeWithSettings']:checked");
  var itemType = checkedRadioBtnSet.value;
  settingsFact.settingsPhoneBill(itemType);
  callTotalSetElem.innerHTML = settingsFact.getTotalCallCost().toFixed(2);
  smsTotalSetElem.innerHTML = settingsFact.getTotalSmsCost().toFixed(2);
    
  totalSetElem.innerHTML = settingsFact.getTotalCost().toFixed(2);
  settingsFact.alertColor();
       
  }

updateSetElem.addEventListener("click", update);
setAddBtnElem.addEventListener("click", setAddBtnClicked);
