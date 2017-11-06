sap.ui.define([
	"com/ipec/crm/controller/BaseController",
	"sap/ui/model/json/JSONModel"
	], function(BaseController, JSONModel){
	"use strict";
	
	return BaseController.extend("com.ipec.crm.controller.A1", {
		
		onInit: function() {
			var oModel = new JSONModel();
			oModel.setData({
				dateValue1: new Date(),
				dateValue2: new Date()
			});
			this.getView().setModel(oModel);
			
			var oRouter, oTarget;
			oRouter = this.getRouter();
			oTarget = oRouter.getTarget("A1");
			oTarget.attachDisplay(function(oEvent) {
				this._oData = oEvent.getParameter("data"); //store the data
			}, this);
		},

		onNavBack: function(oEvent) {
			// in some cases we could display a certain target when the back button is pressed
			if (this._oData && this._oData.fromTarget) {
				this.getRouter().getTargets().display(this._oData.fromTarget);
				delete this._oData.fromTarget;
				return;
			}
			// call the parent's onNavBack
			BaseController.prototype.onNavBack.apply(this, arguments);
		}

		
	});
});