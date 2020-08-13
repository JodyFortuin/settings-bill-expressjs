let assert = require("assert");
let billWithSettings = require("../settings-bill.factory");

describe("Bill with settings factory function", function() {

   describe("Set actions", function() {
    it("should return a call action", function() {
        var settingsBill = billWithSettings();

        settingsBill.recordAction('call');
        assert.equal(1, settingsBill.actionsFor('call').length)
    });

   it("should return multiple call actions", function() {
        var settingsBill = billWithSettings();

        settingsBill.recordAction('call');
        settingsBill.recordAction('call');
        settingsBill.recordAction('call');
        assert.equal(3, settingsBill.actionsFor('call').length)
    });

   it("should return an sms action", function() {
        var settingsBill = billWithSettings();

        settingsBill.recordAction('sms');
        assert.equal(1, settingsBill.actionsFor('sms').length)
    });

   it("should return multiple sms actions", function() {
        var settingsBill = billWithSettings();

        settingsBill.recordAction('sms');
        settingsBill.recordAction('sms');
        settingsBill.recordAction('sms');
        settingsBill.recordAction('sms');
        settingsBill.recordAction('sms');

        assert.equal(5, settingsBill.actionsFor('sms').length)
    });

   it("should return sms and call actions", function() {
        var settingsBill = billWithSettings();

        settingsBill.recordAction('sms');
        settingsBill.recordAction('call');
        settingsBill.recordAction('call');
        settingsBill.recordAction('sms');

        assert.equal(2, settingsBill.actionsFor('call').length)
        assert.equal(2, settingsBill.actionsFor('sms').length)

    });


    it("should return totals", function() {
        var settingsBill = billWithSettings();

        settingsBill.setSettings({
        callCost: 2.70,
        smsCost: 1.50,
        warningLevel: 20,
        criticalLevel:40
        });

        settingsBill.recordAction('call');
        settingsBill.recordAction('sms');
        settingsBill.recordAction('call');
        settingsBill.recordAction('sms'); 
        assert.equal(5.40, settingsBill.totals().callTotal);
        assert.equal(3.00, settingsBill.totals().smsTotal);
        assert.equal(8.40, settingsBill.totals().grandTotal);

        var settingsBill2 = billWithSettings();

        settingsBill2.setSettings({
        callCost: 2.00,
        smsCost: 1.20,
        warningLevel: 30,
        criticalLevel:45
        });

        settingsBill2.recordAction('call');
        settingsBill2.recordAction('sms');
        assert.equal(2.00, settingsBill2.totals().callTotal);
        assert.equal(1.20, settingsBill2.totals().smsTotal);
        assert.equal(3.20, settingsBill2.totals().grandTotal);
  
  });

    it("should return true if warning level has been reached", function() {
        var settingsBill = billWithSettings();
        
        settingsBill.setSettings({
        callCost: 3.20,
        smsCost: 1.50,
        warningLevel: 15,
        criticalLevel:25
        });

        settingsBill.recordAction('call');
        settingsBill.recordAction('call');
        settingsBill.recordAction('sms');
        settingsBill.recordAction('sms');
        settingsBill.recordAction('call');
        settingsBill.recordAction('sms');
        settingsBill.recordAction('call');
    
        assert.equal(true, settingsBill.hasReachedWarningLevel())

    });

    it("should return true if critical level has been reached", function() {
        var settingsBill = billWithSettings();
       
        settingsBill.setSettings({
        callCost: 3.50,
        smsCost: 2.00,
        warningLevel: 10,
        criticalLevel:15
        });
        
        settingsBill.recordAction('call');
        settingsBill.recordAction('call');
        settingsBill.recordAction('call');
        settingsBill.recordAction('sms'); 
        settingsBill.recordAction('call');
        settingsBill.recordAction('sms'); 
    
        assert.equal(true, settingsBill.hasReachedCriticalLevel())

    });

});    
});

