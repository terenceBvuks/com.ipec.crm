sap.ui.define([
	"com/ipec/crm/controller/BaseController",
	"sap/m/MessageToast"
], function(BaseController, MessageToast) {
	"use strict";

	return BaseController.extend("com.ipec.crm.controller.App", {

		onInit: function() {

		},

		onAfterRendering: function() {

		},

		notFound: function() {
			this.getRouter().getTargets().display("notFound", {
				fromTarget: "home"
			});
		},

		handlePressConfiguration: function(oEvent) {

			var oItem = oEvent.getSource();
			var oShell = this.getView().byId("myShell");
			var bState = oShell.getShowPane();
			oShell.setShowPane(!bState);
			oItem.setShowMarker(!bState);
			oItem.setSelected(!bState);

		},

		handleSearchPressed: function() {

			MessageToast.show("Search is currently unavailable. Please try later");

		},

		handleItemPress: function(oEvent) {
			var text = oEvent.getParameter("item").getText();

			switch (text) {
				case "Individual Agent Account":
					this.getRouter().navTo("A1");
					break;
				case "Corporate Account":
					this.getRouter().navTo("A2");
					break;
				case "":
					break;
				case "Complaints Submission":
					this.getRouter().navTo("D1");
					break;
				case "Funeral Returns":
					this.getRouter().navTo("Funeral Returns");
					break;
				case "Brokers Returns":
					this.getRouter().navTo("Brokers Returns");
					break;
				case "None Life Returns":
					this.getRouter().navTo("None Life Returns");
					break;
				case "Life Returns":
					this.getRouter().navTo("Life Returns");
					break;
				case "Pension Report":
					this.getRouter().navTo("Pension Report");
					break;
				// case "OLD Pension Report":
				// 	this.getRouter().navTo("OLD Pension Report");
				// 	break;
				
				default:
					this.notFound();

			}
		}

	});
});