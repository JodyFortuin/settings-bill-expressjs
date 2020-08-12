function billWithSettings(){
    var theCallCost = 0;
    var theSmsCost = 0;
    var theWarnLevel = 0;
    var theCritLevel = 0;
    var callCostTotal = 0;
    var smsCostTotal = 0;

    function setCallCost(callCost){
        theCallCost = callCost;
    }
    function getCallCost(){
        return theCallCost    
    }

    function setSmsCost(smsCost){
        theSmsCost = smsCost;
    }
    function getSmsCost(){
        return theSmsCost    
    }

    function getTotal(){
        return theCallCost + theSmsCost
    }

    function setWarnLevel(warnLevel){
        theWarnLevel = warnLevel;
    }
    function getWarnLevel(){
        return theWarnLevel;
    }
    
    function setCritLevel(critLevel){
        theCritLevel = critLevel;
    }
    function getCritLevel(){
        return theCritLevel;
    }

    function makeCall(){
        if (!criticalReached()) {
        callCostTotal += theCallCost;
        }
    }

    function getTotalCost(){
        return callCostTotal + smsCostTotal;
    }

    function getTotalCallCost(){
        return callCostTotal;
    }

    function getTotalSmsCost(){
        return smsCostTotal;
    }

    function sendSms(){
        if (!criticalReached()) {
        smsCostTotal += theSmsCost;
        }
    }

    function criticalReached(){
        return getTotalCost() >= getCritLevel();
    }

    function alertColor(){
        if (criticalReached()) {
            return "critical";
            }
        if (getTotalCost() >= getWarnLevel()) {
            return "warning";
            }       
    }

    return {
        setCallCost,
        getCallCost,
        setSmsCost,
        getSmsCost,
        getTotal,
        setWarnLevel,
        getWarnLevel,
        setCritLevel,
        getCritLevel,
        makeCall,
        getTotalCost,
        getTotalCallCost,
        getTotalSmsCost,
        sendSms,
        criticalReached,
        alertColor,
    }
}
