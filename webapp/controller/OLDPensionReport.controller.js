sap.ui.define([
		"jquery.sap.global",
		"sap/ui/core/mvc/Controller",
		"sap/ui/model/json/JSONModel",
		"sap/m/MessageToast"
	], function(jQuery, Controller, JSONModel, MessageToast) {
	"use strict";

	return Controller.extend("com.ipec.crm.controller.OLDPensionReport", {
		onInit : function () {
			// set mock model
			// var sPath = jQuery.sap.getModulePath("com.ipec.crm.model", "pensionReportMenu.json");
			// var oModel = new JSONModel(sPath);
			// this.getView().setModel(oModel);
			// this.getView().setModel(new JSONModel("pensionsModel"));
		},
		
		handleNav: function(evt) {
			var navCon = this.getView().byId("navCon");
			var target = evt.getSource().data("target");
			if (target) {
				var animation = "slide";
				navCon.to(this.getView().byId(target), animation);
			} else {
				navCon.back();
			}
		},
		
		handleNavHome: function(evt) {
			var navCon = this.getView().byId("navCon");
			var target = "page1";
			if (target) {
				var animation = "slide";
				navCon.to(this.getView().byId(target), animation);
			} else {
				navCon.back();
			}
		},

		handleEditPress : function (evt) {
			var oTileContainer = this.getView().byId("container");
			var newValue = !oTileContainer.getEditable();
			oTileContainer.setEditable(newValue);
			evt.getSource().setText(newValue ? "Done" : "Edit");
		},

		handleBusyPress : function (evt) {
			var oTileContainer = this.getView().byId("container");
			var newValue = !oTileContainer.getBusy();
			oTileContainer.setBusy(newValue);
			evt.getSource().setText(newValue ? "Done" : "Busy state");
		},

		handleTileDelete : function (evt) {
			var tile = evt.getParameter("tile");
			evt.getSource().removeTile(tile);
		},
		press : function(evt) {
			MessageToast.show("The GenericTile is pressed.");
		},
		showFooter: function() {
			this.getView().byId("mySemanticPage").setShowFooter(true);
		}
	});
});