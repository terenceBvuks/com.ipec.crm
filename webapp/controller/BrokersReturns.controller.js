sap.ui.define([
	"com/ipec/crm/controller/BaseController",
	"sap/m/MessageToast",
	"sap/m/MessageBox",
	"sap/ui/core/mvc/Controller"
], function(BaseController, MessageToast, MessageBox) {
	"use strict";

	return BaseController.extend("com.ipec.crm.controller.BrokersReturns", {
		// return Controller.extend("com.ipec.crm.controller.BrokersReturns", {
		onInit: function() {
			this._Page = this.getView().byId("page2");
			this._Page.setBackgroundDesign("Solid");
			this._oResourceBundle = this.getResourceBundle();
			// this.calcGrossPremiumReceivable();
			// this.calcBrokerageCommission();
			// this.calcGrossPremiumPayable();
			// this.calcNetBrokerageCommission();
			// this.calcProfitBeforeTax();
			// this.calcProfitAfterTax();
		},
		handleNav: function(evt) {
			var navCon = this.getView().byId("navConBrokers");
			var target = evt.getSource().data("target");
			if (target) {
				var animation = "slide";
				navCon.to(this.getView().byId(target), animation);
			} else {
				navCon.back();
			}
		},
		onSave: function() {

			var that = this,
				bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
			// abort if the input fields have not been changed
			if (this._noChanges()) {
				MessageBox.warning(
					that._oResourceBundle.getText("saveCancelled"), {
						title: "Warning",
						actions: [MessageBox.Action.OK],
						id: "msgBox1",
						details: that._oResourceBundle.getText("noChangesMessage"),
						styleClass: bCompact ? "sapUiSizeCompact" : ""
					});
				return;
			} else {

				MessageBox.confirm("Would you like to save?", {
					title: "Save Returns",
					initialFocus: MessageBox.Action.CANCEL,
					onClose: function(sButton) {
						if (sButton === MessageBox.Action.OK) {
							sap.ui.core.BusyIndicator.show(0);
							that._saveOrder();
						} else if (sButton === MessageBox.Action.CANCEL) {
							MessageToast.show("Saving cancelled");
						}
					}
				});
			}

		},

		//Method to send odata post request to backend server (save order)
		_saveOrder: function() {
			var that = this,
				oEntry = {},
				oModel = this.getModel(),
				bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;

			//Bind data array to form fields

			//Details of the broker
			oEntry.Business = "Brokers";
		//	oEntry.FiscalYear = this.getView().byId("input_FiscalYear").getValue();
			oEntry.Partner = this.getView().byId("input_BusinessPartnerNumber").getValue();
		//	oEntry.PeriodEnd = this.getView().byId("input_PeriodEnding").getValue();
			oEntry.Quarter = this.getView().byId("input_FinancialQuarter").getValue();

			//SUMMARY BY CLASS OF BUSINESS PLACED BY BROKER WITHIN ZIMBABWE (PERSONAL LINES) Tab 1
		/*	oEntry.PerOwnersTotIns = this.getView().byId("input_PER_OWNERS_TOT_INS").getValue();
			oEntry.PerOwnersTotPre = this.getView().byId("input_PER_OWNERS_TOT_PRE").getValue();
			oEntry.PerOwnersTotPol = this.getView().byId("input_PER_OWNERS_TOT_POL").getValue();
			oEntry.PerOwnersComRec = this.getView().byId("input_PER_OWNERS_COM_REC").getValue();
			oEntry.PerOwnersOthCos = this.getView().byId("input_PER_OWNERS_OTH_COS").getValue();
			oEntry.PerHolderTotIns = this.getView().byId("input_PER_HOLDER_TOT_INS").getValue();
			oEntry.PerHolderTotPre = this.getView().byId("input_PER_HOLDER_TOT_PRE").getValue();
			oEntry.PerHolderTotPol = this.getView().byId("input_PER_HOLDER_TOT_POL").getValue();
			oEntry.PerHolderComRec = this.getView().byId("input_PER_HOLDER_COM_REC").getValue();
			oEntry.PerHolderOthCos = this.getView().byId("input_PER_HOLDER_OTH_COS").getValue();
			oEntry.PerHealthTotIns = this.getView().byId("input_PER_HEALTH_TOT_INS").getValue();
			oEntry.PerHealthTotPre = this.getView().byId("input_PER_HEALTH_TOT_PRE").getValue();
			oEntry.PerHealthTotPol = this.getView().byId("input_PER_HEALTH_TOT_POL").getValue();
			oEntry.PerHealthComRec = this.getView().byId("input_PER_HEALTH_COM_REC").getValue();
			oEntry.PerHealthOthCos = this.getView().byId("input_PER_HEALTH_OTH_COS").getValue();
			oEntry.PerRtaTotIns = this.getView().byId("input_PER_RTA_TOT_INS").getValue();
			oEntry.PerRtaTotPre = this.getView().byId("input_PER_RTA_TOT_PRE").getValue();
			oEntry.PerRtaTotPol = this.getView().byId("input_PER_RTA_TOT_POL").getValue();
			oEntry.PerRtaComRec = this.getView().byId("input_PER_RTA_COM_REC").getValue();
			oEntry.PerRtaOthCos = this.getView().byId("input_PER_RTA_OTH_COS").getValue();
			oEntry.PerFtpTotIns = this.getView().byId("input_PER_FTP_TOT_INS").getValue();
			oEntry.PerFtpTotPre = this.getView().byId("input_PER_FTP_TOT_PRE").getValue();
			oEntry.PerFtpTotPol = this.getView().byId("input_PER_FTP_TOT_POL").getValue();
			oEntry.PerFtpComRec = this.getView().byId("input_PER_FTP_COM_REC").getValue();
			oEntry.PerFtpOthCos = this.getView().byId("input_PER_FTP_OTH_COS").getValue();
			oEntry.PerCompreTotIns = this.getView().byId("input_PER_COMPRE_TOT_INS").getValue();
			oEntry.PerCompreTotPre = this.getView().byId("input_PER_COMPRE_TOT_PRE").getValue();
			oEntry.PerCompreTotPol = this.getView().byId("input_PER_COMPRE_TOT_POL").getValue();
			oEntry.PerCompreComRec = this.getView().byId("input_PER_COMPRE_COM_REC").getValue();
			oEntry.PerCompreOthCos = this.getView().byId("input_PER_COMPRE_OTH_COS").getValue();
			oEntry.PerOtherTotIns = this.getView().byId("input_PER_OTHER_TOT_INS").getValue();
			oEntry.PerOtherTotPre = this.getView().byId("input_PER_OTHER_TOT_PRE").getValue();
			oEntry.PerOtherTotPol = this.getView().byId("input_PER_OTHER_TOT_POL").getValue();
			oEntry.PerOtherComRec = this.getView().byId("input_PER_OTHER_COM_REC").getValue();
			oEntry.PerOtherOthCos = this.getView().byId("input_PER_OTHER_OTH_COS").getValue();*/
			// oEntry.PerSubtotTotIns = this.getView().byId("input_PER_SUBTOT_TOT_INS").getValue(); This  section needs calculating function
			// oEntry.PerSubtotTotPre = this.getView().byId("input_PER_SUBTOT_TOT_PRE").getValue();
			//	oEntry.PerSubtotTotPol = this.getView().byId("input_PER_SUBTOT_TOT_POL").getValue();
			// oEntry.PerSubtotComRec = this.getView().byId("input_PER_SUBTOT_COM_REC").getValue();
			// oEntry.PerSubtotOthCos = this.getView().byId("input_PER_SUBTOT_OTH_COS").getValue();
			
			//SUMMARY BY CLASS OF BUSINESS PLACED BY BROKER WITHIN ZIMBABWE ( COMMERCIAL LINES) Tab 2
				/*oEntry.ComFireTotIns = this.getView().byId("input_COM_FIRE_TOT_INS").getValue();
				oEntry.ComFireTotPre = this.getView().byId("input_COM_FIRE_TOT_PRE").getValue();
				oEntry.ComFireTotPol = this.getView().byId("input_COM_FIRE_TOT_POL").getValue();
				oEntry.ComFireComRec = this.getView().byId("input_COM_FIRE_COM_REC").getValue();
				oEntry.ComFireOthCos = this.getView().byId("input_COM_FIRE_OTH_COS").getValue();
				oEntry.ComEngineTotIns = this.getView().byId("input_COM_ENGINE_TOT_INS").getValue();
				oEntry.ComEngineTotPre = this.getView().byId("input_COM_ENGINE_TOT_PRE").getValue();
				oEntry.ComEngineTotPol = this.getView().byId("input_COM_ENGINE_TOT_POL").getValue();
				oEntry.ComEngineComRec = this.getView().byId("input_COM_ENGINE_COM_REC").getValue();
				oEntry.ComEngineOthCos = this.getView().byId("input_COM_ENGINE_OTH_COS").getValue();
				oEntry.ComRtaTotIns = this.getView().byId("input_COM_RTA_TOT_INS").getValue();
				oEntry.ComRtaTotPre = this.getView().byId("input_COM_RTA_TOT_PRE").getValue();
				oEntry.ComRtaTotPol = this.getView().byId("input_COM_RTA_TOT_POL").getValue();
				oEntry.ComRtaComRec = this.getView().byId("input_COM_RTA_COM_REC").getValue();
				oEntry.ComRtaOthCos = this.getView().byId("input_COM_RTA_OTH_COS").getValue();
				oEntry.ComFtpTotIns = this.getView().byId("input_COM_FTP_TOT_INS").getValue();
				oEntry.ComFtpTotPre = this.getView().byId("input_COM_FTP_TOT_PRE").getValue();
				oEntry.ComFtpTotPol = this.getView().byId("input_COM_FTP_TOT_POL").getValue();
				oEntry.ComFtpComRec = this.getView().byId("input_COM_FTP_COM_REC").getValue();
				oEntry.ComFtpOthCos = this.getView().byId("input_COM_FTP_OTH_COS").getValue();
				oEntry.ComCompreTotIns = this.getView().byId("input_COM_COMPRE_TOT_INS").getValue();
				oEntry.ComCompreTotPre = this.getView().byId("input_COM_COMPRE_TOT_PRE").getValue();
				oEntry.ComCompreTotPol = this.getView().byId("input_COM_COMPRE_TOT_POL").getValue();
				oEntry.ComCompreComRec = this.getView().byId("input_COM_COMPRE_COM_REC").getValue();
				oEntry.ComCompreOthCos = this.getView().byId("input_COM_COMPRE_OTH_COS").getValue();
				oEntry.ComMarineTotIns = this.getView().byId("input_COM_MARINE_TOT_INS").getValue();
				oEntry.ComMarineTotPre = this.getView().byId("input_COM_MARINE_TOT_PRE").getValue();
				oEntry.ComMarineTotPol = this.getView().byId("input_COM_MARINE_TOT_POL").getValue();
				oEntry.ComMarineComRec = this.getView().byId("input_COM_MARINE_COM_REC").getValue();
				oEntry.ComMarineOthCos = this.getView().byId("input_COM_MARINE_OTH_COS").getValue();
				oEntry.ComAviatiTotIns = this.getView().byId("input_COM_AVIATI_TOT_INS").getValue();
				oEntry.ComAviatiTotPre = this.getView().byId("input_COM_AVIATI_TOT_PRE").getValue();
				oEntry.ComAviatiTotPol = this.getView().byId("input_COM_AVIATI_TOT_POL").getValue();
				oEntry.ComAviatiComRec = this.getView().byId("input_COM_AVIATI_COM_REC").getValue();
				oEntry.ComAviatiOthCos = this.getView().byId("input_COM_AVIATI_OTH_COS").getValue();
				oEntry.ComPAcciTotIns = this.getView().byId("input_COM_P_ACCI_TOT_INS").getValue();
				oEntry.ComPAcciTotPre = this.getView().byId("input_COM_P_ACCI_TOT_PRE").getValue();
				oEntry.ComPAcciTotPol = this.getView().byId("input_COM_P_ACCI_TOT_POL").getValue();
				oEntry.ComPAcciComRec = this.getView().byId("input_COM_P_ACCI_COM_REC").getValue();
				oEntry.ComPAcciOthCos = this.getView().byId("input_COM_P_ACCI_OTH_COS").getValue();
				oEntry.ComMAcciTotIns = this.getView().byId("input_COM_M_ACCI_TOT_INS").getValue();
				oEntry.ComMAcciTotPre = this.getView().byId("input_COM_M_ACCI_TOT_PRE").getValue();
				oEntry.ComMAcciTotPol = this.getView().byId("input_COM_M_ACCI_TOT_POL").getValue();
				oEntry.ComMAcciComRec = this.getView().byId("input_COM_M_ACCI_COM_REC").getValue();
				oEntry.ComMAcciOthCos = this.getView().byId("input_COM_M_ACCI_OTH_COS").getValue();
				oEntry.ComBondsTotIns = this.getView().byId("input_COM_BONDS_TOT_INS").getValue();
				oEntry.ComBondsTotPre = this.getView().byId("input_COM_BONDS_TOT_PRE").getValue();
				oEntry.ComBondsTotPol = this.getView().byId("input_COM_BONDS_TOT_POL").getValue();
				oEntry.ComBondsComRec = this.getView().byId("input_COM_BONDS_COM_REC").getValue();
				oEntry.ComBondsOthCos = this.getView().byId("input_COM_BONDS_OTH_COS").getValue();
				oEntry.ComFarmTotIns = this.getView().byId("input_COM_FARM_TOT_INS").getValue();
				oEntry.ComFarmTotPre = this.getView().byId("input_COM_FARM_TOT_PRE").getValue();
				oEntry.ComFarmTotPol = this.getView().byId("input_COM_FARM_TOT_POL").getValue();
				oEntry.ComFarmComRec = this.getView().byId("input_COM_FARM_COM_REC").getValue();
				oEntry.ComFarmOthCos = this.getView().byId("input_COM_FARM_OTH_COS").getValue();
				oEntry.ComHailTotIns = this.getView().byId("input_COM_HAIL_TOT_INS").getValue();
				oEntry.ComHailTotPre = this.getView().byId("input_COM_HAIL_TOT_PRE").getValue();
				oEntry.ComHailTotPol = this.getView().byId("input_COM_HAIL_TOT_POL").getValue();
				oEntry.ComHailComRec = this.getView().byId("input_COM_HAIL_COM_REC").getValue();
				oEntry.ComHailOthCos = this.getView().byId("input_COM_HAIL_OTH_COS").getValue();
				oEntry.ComHealthTotIns = this.getView().byId("input_COM_HEALTH_TOT_INS").getValue();
				oEntry.ComHealthTotPre = this.getView().byId("input_COM_HEALTH_TOT_PRE").getValue();
				oEntry.ComHealthTotPol = this.getView().byId("input_COM_HEALTH_TOT_POL").getValue();
				oEntry.ComHealthComRec = this.getView().byId("input_COM_HEALTH_COM_REC").getValue();
				oEntry.ComHealthOthCos = this.getView().byId("input_COM_HEALTH_OTH_COS").getValue();
				oEntry.ComOtherTotIns = this.getView().byId("input_COM_OTHER_TOT_INS").getValue();
				oEntry.ComOtherTotPre = this.getView().byId("input_COM_OTHER_TOT_PRE").getValue();
				oEntry.ComOtherTotPol = this.getView().byId("input_COM_OTHER_TOT_POL").getValue();
				oEntry.ComOtherComRec = this.getView().byId("input_COM_OTHER_COM_REC").getValue();
				oEntry.ComOtherOthCos = this.getView().byId("input_COM_OTHER_OTH_COS").getValue();*/
				// oEntry.ComSubtotTotIns = this.getView().byId("input_COM_SUBTOT_TOT_INS").getValue(); calculated
				// oEntry.ComSubtotTotPre = this.getView().byId("input_COM_SUBTOT_TOT_PRE").getValue(); calculated
				// oEntry.ComSubtotTotPol = this.getView().byId("input_COM_SUBTOT_TOT_POL").getValue(); calculated
				// oEntry.ComSubtotComRec = this.getView().byId("input_COM_SUBTOT_COM_REC").getValue(); calculated
				// oEntry.ComSubtotOthCos = this.getView().byId("input_COM_SUBTOT_OTH_COS").getValue(); calculated
				// oEntry.LifeInsurTotIns = this.getView().byId("input_LIFE_INSUR_TOT_INS").getValue(); calculated
				// oEntry.LifeInsurTotPre = this.getView().byId("input_LIFE_INSUR_TOT_PRE").getValue(); calculated
				// oEntry.LifeInsurTotPol = this.getView().byId("input_LIFE_INSUR_TOT_POL").getValue(); calculated
				// oEntry.LifeInsurComRec = this.getView().byId("input_LIFE_INSUR_COM_REC").getValue(); calculated
				// oEntry.LifeInsurOthCos = this.getView().byId("input_LIFE_INSUR_OTH_COS").getValue(); calculated
				// oEntry.AggregateTotIns = this.getView().byId("input_AGGREGATE_TOT_INS").getValue(); calculated
				// oEntry.AggregateTotPre = this.getView().byId("input_AGGREGATE_TOT_PRE").getValue(); calculated
				// oEntry.AggregateTotPol = this.getView().byId("input_AGGREGATE_TOT_POL").getValue(); calculated
				// oEntry.AggregateComRec = this.getView().byId("input_AGGREGATE_COM_REC").getValue(); calculated
				// oEntry.AggregateOthCos = this.getView().byId("input_AGGREGATE_OTH_COS").getValue(); calculated
				
				//SUMMARY OF BUSINESS PLACED WITH INSURERS WITHIN ZIMBABWE Tab 3
				/*	oEntry.Ins01Name = this.getView().byId("input_INS01_NAME").getValue();
						oEntry.Ins01TotPre = this.getView().byId("input_INS01_TOT_PRE").getValue();
			oEntry.Ins01TotPol = this.getView().byId("input_INS01_TOT_POL").getValue();
			oEntry.Ins01ComRec = this.getView().byId("input_INS01_COM_REC").getValue();
			oEntry.Ins01OthCos = this.getView().byId("input_INS01_OTH_COS").getValue();
			oEntry.Ins02Name = this.getView().byId("input_INS02_NAME").getValue();
			oEntry.Ins02TotPre = this.getView().byId("input_INS02_TOT_PRE").getValue();
			oEntry.Ins02TotPol = this.getView().byId("input_INS02_TOT_POL").getValue();
			oEntry.Ins02ComRec = this.getView().byId("input_INS02_COM_REC").getValue();
			oEntry.Ins02OthCos = this.getView().byId("input_INS02_OTH_COS").getValue();
			oEntry.Ins03Name = this.getView().byId("input_INS03_NAME").getValue();
			oEntry.Ins03TotPre = this.getView().byId("input_INS03_TOT_PRE").getValue();
			oEntry.Ins03TotPol = this.getView().byId("input_INS03_TOT_POL").getValue();
			oEntry.Ins03ComRec = this.getView().byId("input_INS03_COM_REC").getValue();
			oEntry.Ins03OthCos = this.getView().byId("input_INS03_OTH_COS").getValue();
			oEntry.Ins04Name = this.getView().byId("input_INS04_NAME").getValue();
			oEntry.Ins04TotPre = this.getView().byId("input_INS04_TOT_PRE").getValue();
			oEntry.Ins04TotPol = this.getView().byId("input_INS04_TOT_POL").getValue();
			oEntry.Ins04ComRec = this.getView().byId("input_INS04_COM_REC").getValue();
			oEntry.Ins04OthCos = this.getView().byId("input_INS04_OTH_COS").getValue();
			oEntry.Ins05Name = this.getView().byId("input_INS05_NAME").getValue();
			oEntry.Ins05TotPre = this.getView().byId("input_INS05_TOT_PRE").getValue();
			oEntry.Ins05TotPol = this.getView().byId("input_INS05_TOT_POL").getValue();
			oEntry.Ins05ComRec = this.getView().byId("input_INS05_COM_REC").getValue();
			oEntry.Ins05OthCos = this.getView().byId("input_INS05_OTH_COS").getValue();
			oEntry.Ins06Name  = this.getView().byId("input_INS06_NAME").getValue();
			oEntry.Ins06TotPre = this.getView().byId("input_INS06_TOT_PRE").getValue();
			oEntry.Ins06TotPol = this.getView().byId("input_INS06_TOT_POL").getValue();
			oEntry.Ins06ComRec = this.getView().byId("input_INS06_COM_REC").getValue();
			oEntry.Ins06OthCos = this.getView().byId("input_INS06_OTH_COS").getValue();
			oEntry.Ins07Name = this.getView().byId("input_INS07_NAME").getValue();
			oEntry.Ins07TotPre = this.getView().byId("input_INS07_TOT_PRE").getValue();
			oEntry.Ins07TotPol = this.getView().byId("input_INS07_TOT_POL").getValue();
			oEntry.Ins07ComRec = this.getView().byId("input_INS07_COM_REC").getValue();
			oEntry.Ins07OthCos = this.getView().byId("input_INS07_OTH_COS").getValue();
			oEntry.Ins08Name = this.getView().byId("input_INS08_NAME").getValue();
			oEntry.Ins08TotPre = this.getView().byId("input_INS08_TOT_PRE").getValue();
			oEntry.Ins08TotPol = this.getView().byId("input_INS08_TOT_POL").getValue();
			oEntry.Ins08ComRec = this.getView().byId("input_INS08_COM_REC").getValue();
			oEntry.Ins08OthCos = this.getView().byId("input_INS08_OTH_COS").getValue();
			
			//SUMMARY OF BUSINESS PLACED WITH INSURERS WITHIN ZIMBABWE Tab 4
		oEntry.Ins09Name = this.getView().byId("input_INS09_NAME").getValue();
			oEntry.Ins09TotPre = this.getView().byId("input_INS09_TOT_PRE").getValue();
			oEntry.Ins09TotPol = this.getView().byId("input_INS09_TOT_POL").getValue();
			oEntry.Ins09ComRec = this.getView().byId("input_INS09_COM_REC").getValue();
			oEntry.Ins09OthCos = this.getView().byId("input_INS09_OTH_COS").getValue();
			oEntry.Ins10Name = this.getView().byId("input_INS10_NAME").getValue();
			oEntry.Ins10TotPre = this.getView().byId("input_INS10_TOT_PRE").getValue();
			oEntry.Ins10TotPol = this.getView().byId("input_INS10_TOT_POL").getValue();
			oEntry.Ins10ComRec = this.getView().byId("input_INS10_COM_REC").getValue();
			oEntry.Ins10OthCos = this.getView().byId("input_INS10_OTH_COS").getValue();
			oEntry.Ins11Name = this.getView().byId("input_INS11_NAME").getValue();
			oEntry.Ins11TotPre = this.getView().byId("input_INS11_TOT_PRE").getValue();
			oEntry.Ins11TotPol = this.getView().byId("input_INS11_TOT_POL").getValue();
			oEntry.Ins11ComRec = this.getView().byId("input_INS11_COM_REC").getValue();
			oEntry.Ins11OthCos = this.getView().byId("input_INS11_OTH_COS").getValue();
			oEntry.Ins12Name = this.getView().byId("input_INS12_NAME").getValue();
			oEntry.Ins12TotPre = this.getView().byId("input_INS12_TOT_PRE").getValue();
			oEntry.Ins12TotPol = this.getView().byId("input_INS12_TOT_POL").getValue();
			oEntry.Ins12ComRec = this.getView().byId("input_INS12_COM_REC").getValue();
			oEntry.Ins12OthCos = this.getView().byId("input_INS12_OTH_COS").getValue();
			oEntry.Ins13Name = this.getView().byId("input_INS13_NAME").getValue();
			oEntry.Ins13TotPre = this.getView().byId("input_INS13_TOT_PRE").getValue();
			oEntry.Ins13TotPol = this.getView().byId("input_INS13_TOT_POL").getValue();
			oEntry.Ins13ComRec = this.getView().byId("input_INS13_COM_REC").getValue();
			oEntry.Ins13OthCos = this.getView().byId("input_INS13_OTH_COS").getValue();
			oEntry.Ins14Name = this.getView().byId("input_INS14_NAME").getValue();
			oEntry.Ins14TotPre = this.getView().byId("input_INS14_TOT_PRE").getValue();
			oEntry.Ins14TotPol = this.getView().byId("input_INS14_TOT_POL").getValue();
			oEntry.Ins14ComRec = this.getView().byId("input_INS14_COM_REC").getValue();
			oEntry.Ins14OthCos = this.getView().byId("input_INS14_OTH_COS").getValue();
			oEntry.Ins15Name = this.getView().byId("input_INS15_NAME").getValue();
			oEntry.Ins15TotPre = this.getView().byId("input_INS15_TOT_PRE").getValue();
			oEntry.Ins15TotPol = this.getView().byId("input_INS15_TOT_POL").getValue();
			oEntry.Ins15ComRec = this.getView().byId("input_INS15_COM_REC").getValue();
			oEntry.Ins15OthCos = this.getView().byId("input_INS15_OTH_COS").getValue();
			// oEntry.TotalTotPre = this.getView().byId("input_TOTAL_TOT_PRE").getValue(); calculated
			// oEntry.TotalTotPol = this.getView().byId("input_TOTAL_TOT_POL").getValue(); calculated
			// oEntry.TotalComRec = this.getView().byId("input_TOTAL_COM_REC").getValue(); calculated
			// oEntry.TotalOthCos = this.getView().byId("input_TOTAL_OTH_COS").getValue(); calculated
			// oEntry.DifferTotPre = this.getView().byId("input_DIFFER_TOT_PRE").getValue(); calculated

			//SUMMARY OF BUSINESS PLACED BY BROKER OUTSIDE ZIMBABWE
			oEntry.Class01Name = this.getView().byId("input_CLASS01_NAME").getValue();
			oEntry.Class01SumIns = this.getView().byId("input_CLASS01_SUM_INS").getValue();
			oEntry.Class01LocIns = this.getView().byId("input_CLASS01_LOC_INS").getValue();
			oEntry.Class01ForIns = this.getView().byId("input_CLASS01_FOR_INS").getValue();
			oEntry.Class01CedPre = this.getView().byId("input_CLASS01_CED_PRE").getValue();
			oEntry.Class01PerRis = this.getView().byId("input_CLASS01_PER_RIS").getValue();
			oEntry.Class01ComRec = this.getView().byId("input_CLASS01_COM_REC").getValue();
			oEntry.Class01OthRec = this.getView().byId("input_CLASS01_OTH_REC").getValue();
			oEntry.Class02Name = this.getView().byId("input_CLASS02_NAME").getValue();
			oEntry.Class02SumIns = this.getView().byId("input_CLASS02_SUM_INS").getValue();
			oEntry.Class02LocIns = this.getView().byId("input_CLASS02_LOC_INS").getValue();
			oEntry.Class02ForIns = this.getView().byId("input_CLASS02_FOR_INS").getValue();
			oEntry.Class02CedPre = this.getView().byId("input_CLASS02_CED_PRE").getValue();
			oEntry.Class02PerRis = this.getView().byId("input_CLASS02_PER_RIS").getValue();
			oEntry.Class02ComRec = this.getView().byId("input_CLASS02_COM_REC").getValue();
			oEntry.Class02OthRec = this.getView().byId("input_CLASS02_OTH_REC").getValue();
			oEntry.Class03Name = this.getView().byId("input_CLASS03_NAME").getValue();
			oEntry.Class02SumIns = this.getView().byId("input_CLASS03_SUM_INS").getValue();
			oEntry.Class03LocIns = this.getView().byId("input_CLASS03_LOC_INS").getValue();
			oEntry.Class03ForIns = this.getView().byId("input_CLASS03_FOR_INS").getValue();
			oEntry.Class03CedPre = this.getView().byId("input_CLASS03_CED_PRE").getValue();
			oEntry.Class03PerRis = this.getView().byId("input_CLASS03_PER_RIS").getValue();
			oEntry.Class03ComRec = this.getView().byId("input_CLASS03_COM_REC").getValue();
			oEntry.Class03OthRec = this.getView().byId("input_CLASS03_OTH_REC").getValue();
			oEntry.Class04Name = this.getView().byId("input_CLASS04_NAME").getValue();
			oEntry.Class04SumIns = this.getView().byId("input_CLASS04_SUM_INS").getValue();
			oEntry.Class04LocIns = this.getView().byId("input_CLASS04_LOC_INS").getValue();
			oEntry.Class04ForIns = this.getView().byId("input_CLASS04_FOR_INS").getValue();
			oEntry.Class04CedPre = this.getView().byId("input_CLASS04_CED_PRE").getValue();
			oEntry.Class03PerRis = this.getView().byId("input_CLASS04_PER_RIS").getValue();
			oEntry.Class04ComRec = this.getView().byId("input_CLASS04_COM_REC").getValue();
			oEntry.Class04OthRec = this.getView().byId("input_CLASS04_OTH_REC").getValue();
			oEntry.Class05Name = this.getView().byId("input_CLASS05_NAME").getValue();
			oEntry.Class05SumIns = this.getView().byId("input_CLASS05_SUM_INS").getValue();
			oEntry.Class05LocIns = this.getView().byId("input_CLASS05_LOC_INS").getValue();
			oEntry.Class05ForIns = this.getView().byId("input_CLASS05_FOR_INS").getValue();
			oEntry.Class05CedPre = this.getView().byId("input_CLASS05_CED_PRE").getValue();
			oEntry.Class05PerRis = this.getView().byId("input_CLASS05_PER_RIS").getValue();
			oEntry.Class05ComRec = this.getView().byId("input_CLASS05_COM_REC").getValue();
			oEntry.Class05OthRec = this.getView().byId("input_CLASS05_OTH_REC").getValue();*/
			/*	oEntry.CLASS06_NAME = this.getView().byId("input_CLASS06_NAME").getValue();
				oEntry.CLASS06_SUM_INS = this.getView().byId("input_CLASS06_SUM_INS").getValue();
				oEntry.CLASS06_LOC_INS = this.getView().byId("input_CLASS06_LOC_INS").getValue();
				oEntry.CLASS06_FOR_INS = this.getView().byId("input_CLASS06_FOR_INS").getValue();
				oEntry.CLASS06_CED_PRE = this.getView().byId("input_CLASS06_CED_PRE").getValue();
				oEntry.CLASS06_PER_RIS = this.getView().byId("input_CLASS06_PER_RIS").getValue();
				oEntry.CLASS06_COM_REC = this.getView().byId("input_CLASS06_COM_REC").getValue();
				oEntry.CLASS06_OTH_REC = this.getView().byId("input_CLASS06_OTH_REC").getValue();
				oEntry.CLASS07_NAME = this.getView().byId("input_CLASS07_NAME").getValue();
				oEntry.CLASS07_SUM_INS = this.getView().byId("input_CLASS07_SUM_INS").getValue();
				oEntry.CLASS07_LOC_INS = this.getView().byId("input_CLASS07_LOC_INS").getValue();
				oEntry.CLASS07_FOR_INS = this.getView().byId("input_CLASS07_FOR_INS").getValue();
				oEntry.CLASS07_CED_PRE = this.getView().byId("input_CLASS07_CED_PRE").getValue();
				oEntry.CLASS07_PER_RIS = this.getView().byId("input_CLASS07_PER_RIS").getValue();
				oEntry.CLASS07_COM_REC = this.getView().byId("input_CLASS07_COM_REC").getValue();
				oEntry.CLASS07_OTH_REC = this.getView().byId("input_CLASS07_OTH_REC").getValue();
				oEntry.CLASS08_NAME = this.getView().byId("input_CLASS08_NAME").getValue();
				oEntry.CLASS08_SUM_INS = this.getView().byId("input_CLASS08_SUM_INS").getValue();
				oEntry.CLASS08_LOC_INS = this.getView().byId("input_CLASS08_LOC_INS").getValue();
				oEntry.CLASS08_FOR_INS = this.getView().byId("input_CLASS08_FOR_INS").getValue();
				oEntry.CLASS08_CED_PRE = this.getView().byId("input_CLASS08_CED_PRE").getValue();
				oEntry.CLASS08_PER_RIS = this.getView().byId("input_CLASS08_PER_RIS").getValue();
				oEntry.CLASS08_COM_REC = this.getView().byId("input_CLASS08_COM_REC").getValue();
				oEntry.CLASS08_OTH_REC = this.getView().byId("input_CLASS08_OTH_REC").getValue();
				oEntry.CLASS09_NAME = this.getView().byId("input_CLASS09_NAME").getValue();
				oEntry.CLASS09_SUM_INS = this.getView().byId("input_CLASS09_SUM_INS").getValue();
				oEntry.CLASS09_LOC_INS = this.getView().byId("input_CLASS09_LOC_INS").getValue();
				oEntry.CLASS09_FOR_INS = this.getView().byId("input_CLASS09_FOR_INS").getValue();
				oEntry.CLASS09_CED_PRE = this.getView().byId("input_CLASS09_CED_PRE").getValue();
				oEntry.CLASS09_PER_RIS = this.getView().byId("input_CLASS09_PER_RIS").getValue();
				oEntry.CLASS09_COM_REC = this.getView().byId("input_CLASS09_COM_REC").getValue();
				oEntry.CLASS09_OTH_REC = this.getView().byId("input_CLASS09_OTH_REC").getValue();
				oEntry.CLASS10_NAME = this.getView().byId("input_CLASS10_NAME").getValue();
				oEntry.CLASS10_SUM_INS = this.getView().byId("input_CLASS10_SUM_INS").getValue();
				oEntry.CLASS10_LOC_INS = this.getView().byId("input_CLASS10_LOC_INS").getValue();
				oEntry.CLASS10_FOR_INS = this.getView().byId("input_CLASS10_FOR_INS").getValue();
				oEntry.CLASS10_CED_PRE = this.getView().byId("input_CLASS10_CED_PRE").getValue();
				oEntry.CLASS10_PER_RIS = this.getView().byId("input_CLASS10_PER_RIS").getValue();
				oEntry.CLASS10_COM_REC = this.getView().byId("input_CLASS10_COM_REC").getValue();
				oEntry.CLASS10_OTH_REC = this.getView().byId("input_CLASS10_OTH_REC").getValue();
				oEntry.CLASS11_NAME = this.getView().byId("input_CLASS11_NAME").getValue();
				oEntry.CLASS11_SUM_INS = this.getView().byId("input_CLASS11_SUM_INS").getValue();
				oEntry.CLASS11_LOC_INS = this.getView().byId("input_CLASS11_LOC_INS").getValue();
				oEntry.CLASS11_FOR_INS = this.getView().byId("input_CLASS11_FOR_INS").getValue();
				oEntry.CLASS11_CED_PRE = this.getView().byId("input_CLASS11_CED_PRE").getValue();
				oEntry.CLASS11_PER_RIS = this.getView().byId("input_CLASS11_PER_RIS").getValue();
				oEntry.CLASS11_COM_REC = this.getView().byId("input_CLASS11_COM_REC").getValue();
				oEntry.CLASS11_OTH_REC = this.getView().byId("input_CLASS11_OTH_REC").getValue();
				oEntry.CLASS12_NAME = this.getView().byId("input_CLASS12_NAME").getValue();
				oEntry.CLASS12_SUM_INS = this.getView().byId("input_CLASS12_SUM_INS").getValue();
				oEntry.CLASS12_LOC_INS = this.getView().byId("input_CLASS12_LOC_INS").getValue();
				oEntry.CLASS12_FOR_INS = this.getView().byId("input_CLASS12_FOR_INS").getValue();
				oEntry.CLASS12_CED_PRE = this.getView().byId("input_CLASS12_CED_PRE").getValue();
				oEntry.CLASS12_PER_RIS = this.getView().byId("input_CLASS12_PER_RIS").getValue();
				oEntry.CLASS12_COM_REC = this.getView().byId("input_CLASS12_COM_REC").getValue();
				oEntry.CLASS12_OTH_REC = this.getView().byId("input_CLASS12_OTH_REC").getValue();
				oEntry.CLASS13_NAME = this.getView().byId("input_CLASS13_NAME").getValue();
				oEntry.CLASS13_SUM_INS = this.getView().byId("input_CLASS13_SUM_INS").getValue();
				oEntry.CLASS13_LOC_INS = this.getView().byId("input_CLASS13_LOC_INS").getValue();
				oEntry.CLASS13_FOR_INS = this.getView().byId("input_CLASS13_FOR_INS").getValue();
				oEntry.CLASS13_CED_PRE = this.getView().byId("input_CLASS13_CED_PRE").getValue();
				oEntry.CLASS13_PER_RIS = this.getView().byId("input_CLASS13_PER_RIS").getValue();
				oEntry.CLASS13_COM_REC = this.getView().byId("input_CLASS13_COM_REC").getValue();
				oEntry.CLASS13_OTH_REC = this.getView().byId("input_CLASS13_OTH_REC").getValue();
				oEntry.CLASS14_NAME = this.getView().byId("input_CLASS14_NAME").getValue();
				oEntry.CLASS14_SUM_INS = this.getView().byId("input_CLASS14_SUM_INS").getValue();
				oEntry.CLASS14_LOC_INS = this.getView().byId("input_CLASS14_LOC_INS").getValue();
				oEntry.CLASS14_FOR_INS = this.getView().byId("input_CLASS14_FOR_INS").getValue();
				oEntry.CLASS14_CED_PRE = this.getView().byId("input_CLASS14_CED_PRE").getValue();
				oEntry.CLASS14_PER_RIS = this.getView().byId("input_CLASS14_PER_RIS").getValue();
				oEntry.CLASS14_COM_REC = this.getView().byId("input_CLASS14_COM_REC ").getValue();
				oEntry.CLASS14_OTH_REC = this.getView().byId("input_CLASS14_OTH_REC").getValue();
				oEntry.CLASS15_NAME = this.getView().byId("input_CLASS15_NAME").getValue();
				oEntry.CLASS15_SUM_INS = this.getView().byId("input_CLASS15_SUM_INS").getValue();
				oEntry.CLASS15_LOC_INS = this.getView().byId("input_CLASS15_LOC_INS").getValue();
				oEntry.CLASS15_FOR_INS = this.getView().byId("input_CLASS15_FOR_INS").getValue();
				oEntry.CLASS15_CED_PRE = this.getView().byId("input_CLASS15_CED_PRE").getValue();
				oEntry.CLASS15_PER_RIS = this.getView().byId("input_CLASS15_PER_RIS").getValue();
				oEntry.CLASS15_COM_REC = this.getView().byId("input_CLASS15_COM_REC").getValue();
				oEntry.CLASS15_OTH_REC = this.getView().byId("input_CLASS15_OTH_REC").getValue();
				oEntry.TOTAL_SUM_INS = this.getView().byId("input_TOTAL_SUM_INS1").getValue();
				oEntry.TOTAL_LOC_INS = this.getView().byId("input_TOTAL_LOC_INS1").getValue();
				oEntry.TOTAL_FOR_INS = this.getView().byId("input_TOTAL_FOR_INS1").getValue();
				oEntry.TOTAL_CED_PRE = this.getView().byId("input_TOTAL_CED_PRE1").getValue();
				oEntry.TOTAL_PER_RIS = this.getView().byId("input_TOTAL_PER_RIS1").getValue();
				oEntry.TOTAL_COM_REC = this.getView().byId("input_TOTAL_COM_REC1").getValue();
				oEntry.TOTAL_OTH_REC = this.getView().byId("input_TOTAL_OTH_REC1").getValue();*/

			//SUMMARY OF CLAIMS THROUGH BROKER* Tab 1
		/*	oEntry.Ins01NameClms = this.getView().byId("input_INS01_NAME_CR").getValue();
			oEntry.Ins01TotClm = this.getView().byId("input_INS01_TOT_CLM").getValue();
			oEntry.Ins01TotVal = this.getView().byId("input_INS01_TOT_VAL").getValue();
			oEntry.Ins01TotSet = this.getView().byId("input_INS01_TOT_SET").getValue();
			oEntry.Ins01SetVal = this.getView().byId("input_INS01_SET_VAL").getValue();
			oEntry.Ins01TotUns = this.getView().byId("input_INS01_TOT_UNS").getValue();
			oEntry.Ins01TotUns = this.getView().byId("input_INS01_OUT_VAL").getValue();
			oEntry.Ins01OutArr = this.getView().byId("input_INS01_OUT_ARR").getValue();
			oEntry.Ins02NameClms = this.getView().byId("input_INS02_NAME_CR").getValue();
			oEntry.Ins02TotClm = this.getView().byId("input_INS02_TOT_CLM").getValue();
			oEntry.Ins02TotVal = this.getView().byId("input_INS02_TOT_VAL").getValue();
			oEntry.Ins02TotVal = this.getView().byId("input_INS02_TOT_SET").getValue();
			oEntry.Ins02TotVal = this.getView().byId("input_INS02_SET_VAL").getValue();
			oEntry.Ins02TotVal = this.getView().byId("input_INS02_TOT_UNS").getValue();
			oEntry.Ins02TotVal = this.getView().byId("input_INS02_OUT_VAL").getValue();
			oEntry.Ins02OutArr = this.getView().byId("input_INS02_OUT_ARR").getValue();
			oEntry.Ins03NameClms = this.getView().byId("input_INS03_NAME_CR").getValue();
			oEntry.Ins03TotClm = this.getView().byId("input_INS03_TOT_CLM").getValue();
			oEntry.Ins03TotVal = this.getView().byId("input_INS03_TOT_VAL").getValue();
			oEntry.Ins03TotSet = this.getView().byId("input_INS03_TOT_SET").getValue();
			oEntry.Ins03SetVal = this.getView().byId("input_INS03_SET_VAL").getValue();
			oEntry.Ins03SetVal = this.getView().byId("input_INS03_TOT_UNS").getValue();
			oEntry.Ins03OutVal = this.getView().byId("input_INS03_OUT_VAL").getValue();
			oEntry.Ins03OutArr = this.getView().byId("input_INS03_OUT_ARR").getValue();
			oEntry.Ins04NameClms = this.getView().byId("input_INS04_NAME_CR").getValue();
			oEntry.Ins04TotClm = this.getView().byId("input_INS04_TOT_CLM").getValue();
			oEntry.Ins04TotVal = this.getView().byId("input_INS04_TOT_VAL").getValue();
			oEntry.Ins04TotSet = this.getView().byId("input_INS04_TOT_SET").getValue();
			oEntry.Ins04SetVal = this.getView().byId("input_INS04_SET_VAL").getValue();
			oEntry.Ins04TotUns = this.getView().byId("input_INS04_TOT_UNS").getValue();
			oEntry.Ins04OutVal = this.getView().byId("input_INS04_OUT_VAL").getValue();
			oEntry.Ins04OutArr = this.getView().byId("input_INS04_OUT_ARR").getValue();
			oEntry.Ins05NameClms = this.getView().byId("input_INS05_NAME_CR").getValue();
			oEntry.Ins05TotClm = this.getView().byId("input_INS05_TOT_CLM").getValue();
			oEntry.Ins05TotVal = this.getView().byId("input_INS05_TOT_VAL").getValue();
			oEntry.Ins05TotSet = this.getView().byId("input_INS05_TOT_SET").getValue();
			oEntry.Ins05TotSet = this.getView().byId("input_INS05_SET_VAL").getValue();
			oEntry.Ins05TotUns = this.getView().byId("input_INS05_TOT_UNS").getValue();
			oEntry.Ins05OutVal = this.getView().byId("input_INS05_OUT_VAL").getValue();
			oEntry.Ins05OutArr = this.getView().byId("input_INS05_OUT_ARR").getValue();*/

			/*	oEntry.INS06_TOT_CLM = this.getView().byId("input_INS06_TOT_CLM").getValue();
			oEntry.INS06_TOT_VAL = this.getView().byId("input_INS06_TOT_VAL").getValue();
			oEntry.INS06_TOT_SET = this.getView().byId("input_INS06_TOT_SET").getValue();
			oEntry.INS06_SET_VAL = this.getView().byId("input_INS06_SET_VAL").getValue();
			oEntry.INS06_TOT_UNS = this.getView().byId("input_INS06_TOT_UNS").getValue();
			oEntry.INS06_OUT_VAL = this.getView().byId("input_INS06_OUT_VAL").getValue();
			oEntry.INS06_OUT_ARR = this.getView().byId("input_INS06_OUT_ARR").getValue();
	
			oEntry.INS07_TOT_CLM = this.getView().byId("input_INS07_TOT_CLM").getValue();
			oEntry.INS07_TOT_VAL = this.getView().byId("input_INS07_TOT_VAL").getValue();
			oEntry.INS07_TOT_SET = this.getView().byId("input_INS07_TOT_SET").getValue();
			oEntry.INS07_SET_VAL = this.getView().byId("input_INS07_SET_VAL").getValue();
			oEntry.INS07_TOT_UNS = this.getView().byId("input_INS07_TOT_UNS").getValue();
			oEntry.INS07_OUT_VAL = this.getView().byId("input_INS07_OUT_VAL").getValue();
			oEntry.INS07_OUT_ARR = this.getView().byId("input_INS07_OUT_ARR").getValue();
		
			oEntry.INS08_TOT_CLM = this.getView().byId("input_INS08_TOT_CLM").getValue();
			oEntry.INS08_TOT_VAL = this.getView().byId("input_INS08_TOT_VAL").getValue();
			oEntry.INS08_TOT_SET = this.getView().byId("input_INS08_TOT_SET").getValue();
			oEntry.INS08_SET_VAL = this.getView().byId("input_INS08_SET_VAL").getValue();
			oEntry.INS08_TOT_UNS = this.getView().byId("input_INS08_TOT_UNS").getValue();
			oEntry.INS08_OUT_VAL = this.getView().byId("input_INS08_OUT_VAL").getValue();
			oEntry.INS08_OUT_ARR = this.getView().byId("input_INS08_OUT_ARR").getValue();

			oEntry.INS09_TOT_CLM = this.getView().byId("input_INS09_TOT_CLM").getValue();
			oEntry.INS09_TOT_VAL = this.getView().byId("input_INS09_TOT_VAL").getValue();
			oEntry.INS09_TOT_SET = this.getView().byId("input_INS09_TOT_SET").getValue();
			oEntry.INS09_SET_VAL = this.getView().byId("input_INS09_SET_VAL").getValue();
			oEntry.INS09_TOT_UNS = this.getView().byId("input_INS09_TOT_UNS").getValue();
			oEntry.INS09_OUT_VAL = this.getView().byId("input_INS09_OUT_VAL").getValue();
			oEntry.INS09_OUT_ARR = this.getView().byId("input_INS09_OUT_ARR").getValue();
			
			oEntry.INS10_TOT_CLM = this.getView().byId("input_INS10_TOT_CLM").getValue();
			oEntry.INS10_TOT_VAL = this.getView().byId("input_INS10_TOT_VAL").getValue();
			oEntry.INS10_TOT_SET = this.getView().byId("input_INS10_TOT_SET").getValue();
			oEntry.INS10_SET_VAL = this.getView().byId("input_INS10_SET_VAL").getValue();
			oEntry.INS10_TOT_UNS = this.getView().byId("input_INS10_TOT_UNS").getValue();
			oEntry.INS10_OUT_VAL = this.getView().byId("input_INS10_OUT_VAL").getValue();
			oEntry.INS10_OUT_ARR = this.getView().byId("input_INS10_OUT_ARR").getValue();
			
			oEntry.INS11_TOT_CLM = this.getView().byId("input_INS11_TOT_CLM").getValue();
			oEntry.INS11_TOT_VAL = this.getView().byId("input_INS11_TOT_VAL").getValue();
			oEntry.INS11_TOT_SET = this.getView().byId("input_INS11_TOT_SET").getValue();
			oEntry.INS11_SET_VAL = this.getView().byId("input_INS11_SET_VAL").getValue();
			oEntry.INS11_TOT_UNS = this.getView().byId("input_INS11_TOT_UNS").getValue();
			oEntry.INS11_OUT_VAL = this.getView().byId("input_INS11_OUT_VAL").getValue();
			oEntry.INS11_OUT_ARR = this.getView().byId("input_INS11_OUT_ARR").getValue();
		
			oEntry.INS12_TOT_CLM = this.getView().byId("input_INS12_TOT_CLM").getValue();
			oEntry.INS12_TOT_VAL = this.getView().byId("input_INS12_TOT_VAL").getValue();
			oEntry.INS12_TOT_SET = this.getView().byId("input_INS12_TOT_SET").getValue();
			oEntry.INS12_SET_VAL = this.getView().byId("input_INS12_SET_VAL").getValue();
			oEntry.INS12_TOT_UNS = this.getView().byId("input_INS12_TOT_UNS").getValue();
			oEntry.INS12_OUT_VAL = this.getView().byId("input_INS12_OUT_VAL").getValue();
			oEntry.INS12_OUT_ARR = this.getView().byId("input_INS12_OUT_ARR").getValue();
		
			oEntry.INS13_TOT_CLM = this.getView().byId("input_INS13_TOT_CLM").getValue();
			oEntry.INS13_TOT_VAL = this.getView().byId("input_INS13_TOT_VAL").getValue();
			oEntry.INS13_TOT_SET = this.getView().byId("input_INS13_TOT_SET").getValue();
			oEntry.INS13_SET_VAL = this.getView().byId("input_INS13_SET_VA").getValue();
			oEntry.INS13_TOT_UNS = this.getView().byId("input_INS13_TOT_UNS").getValue();
			oEntry.INS13_OUT_VAL = this.getView().byId("input_INS13_OUT_VAL").getValue();
			oEntry.INS13_OUT_ARR = this.getView().byId("input_INS13_OUT_ARR").getValue();
		
			oEntry.INS14_TOT_CLM = this.getView().byId("input_INS14_TOT_CLM").getValue();
			oEntry.INS14_TOT_VAL = this.getView().byId("input_INS14_TOT_VAL").getValue();
			oEntry.INS14_TOT_SET = this.getView().byId("input_INS14_TOT_SET").getValue();
			oEntry.INS14_SET_VAL = this.getView().byId("input_INS14_SET_VAL").getValue();
			oEntry.INS14_TOT_UNS = this.getView().byId("input_INS14_TOT_UNS").getValue();
			oEntry.INS14_OUT_VAL = this.getView().byId("input_INS14_OUT_VAL").getValue();
			oEntry.INS14_OUT_ARR = this.getView().byId("input_INS14_OUT_ARR").getValue();
		
			oEntry.INS15_TOT_CLM = this.getView().byId("input_INS15_TOT_CLM").getValue();
			oEntry.INS15_TOT_VAL = this.getView().byId("input_INS15_TOT_VAL").getValue();
			oEntry.INS15_TOT_SET = this.getView().byId("input_INS15_TOT_SET").getValue();
			oEntry.INS15_SET_VAL = this.getView().byId("input_INS15_SET_VAL").getValue();
			oEntry.INS15_TOT_UNS = this.getView().byId("input_INS15_TOT_UNS").getValue();
			oEntry.INS15_OUT_VAL = this.getView().byId("input_INS15_OUT_VAL").getValue();
			oEntry.INS15_OUT_ARR = this.getView().byId("input_INS15_OUT_ARR").getValue();
		
			oEntry.INS16_TOT_CLM = this.getView().byId("input_INS16_TOT_CLM").getValue();
			oEntry.INS16_TOT_VAL = this.getView().byId("input_INS16_TOT_VAL").getValue();
			oEntry.INS16_TOT_SET = this.getView().byId("input_INS16_TOT_SET").getValue();
			oEntry.INS16_SET_VAL = this.getView().byId("input_INS16_SET_VAL").getValue();
			oEntry.INS16_TOT_UNS = this.getView().byId("input_INS16_TOT_UNS").getValue();
			oEntry.INS16_OUT_VAL = this.getView().byId("input_INS16_OUT_VAL").getValue();
			oEntry.INS16_OUT_ARR = this.getView().byId("input_INS16_OUT_ARR").getValue();
		
			oEntry.INS17_TOT_CLM = this.getView().byId("input_INS17_TOT_CLM").getValue();
			oEntry.INS17_TOT_VAL = this.getView().byId("input_INS17_TOT_VAL").getValue();
			oEntry.INS17_TOT_SET = this.getView().byId("input_INS17_TOT_SET").getValue();
			oEntry.INS17_SET_VAL = this.getView().byId("input_INS17_SET_VAL").getValue();
			oEntry.INS17_TOT_UNS = this.getView().byId("input_INS17_TOT_UNS").getValue();
			oEntry.INS17_OUT_VAL = this.getView().byId("input_INS17_OUT_VAL").getValue();
			oEntry.INS17_OUT_ARR = this.getView().byId("input_INS17_OUT_ARR").getValue();
		
			oEntry.INS18_TOT_CLM = this.getView().byId("input_INS18_TOT_CLM").getValue();
			oEntry.INS18_TOT_VAL = this.getView().byId("input_INS18_TOT_VAL").getValue();
			oEntry.INS18_TOT_SET = this.getView().byId("input_INS18_TOT_SET").getValue();
			oEntry.INS18_SET_VAL = this.getView().byId("input_INS18_SET_VAL").getValue();
			oEntry.INS18_TOT_UNS = this.getView().byId("input_INS18_TOT_UNS").getValue();
			oEntry.INS18_OUT_VAL = this.getView().byId("input_INS18_OUT_VAL").getValue();
			oEntry.INS18_OUT_ARR = this.getView().byId("input_INS18_OUT_ARR").getValue();
		
			oEntry.INS19_TOT_CLM = this.getView().byId("input_INS19_TOT_CLM").getValue();
			oEntry.INS19_TOT_VAL = this.getView().byId("input_INS19_TOT_VAL").getValue();
			oEntry.INS19_TOT_SET = this.getView().byId("input_INS19_TOT_SET").getValue();
			oEntry.INS19_SET_VAL = this.getView().byId("input_INS19_SET_VAL").getValue();
			oEntry.INS19_TOT_UNS = this.getView().byId("input_INS19_TOT_UNS").getValue();
			oEntry.INS19_OUT_VAL = this.getView().byId("input_INS19_OUT_VAL").getValue();
			oEntry.INS19_OUT_ARR = this.getView().byId("input_INS19_OUT_ARR").getValue();
		
			oEntry.INS20_TOT_CLM = this.getView().byId("input_INS20_TOT_CLM").getValue();
			oEntry.INS20_TOT_VAL = this.getView().byId("input_INS20_TOT_VAL").getValue();
			oEntry.INS20_TOT_SET = this.getView().byId("input_INS20_TOT_SET").getValue();
			oEntry.INS20_SET_VAL = this.getView().byId("input_INS20_SET_VAL").getValue();
			oEntry.INS20_TOT_UNS = this.getView().byId("input_INS20_TOT_UNS").getValue();
			oEntry.INS20_OUT_VAL = this.getView().byId("input_INS20_OUT_VAL").getValue();
			oEntry.INS20_OUT_ARR = this.getView().byId("input_INS20_OUT_ARR").getValue();
			oEntry.TOTAL_TOT_CLM = this.getView().byId("input_TOTAL_TOT_CLM").getValue();
			oEntry.TOTAL_TOT_VAL = this.getView().byId("input_TOTAL_TOT_VAL").getValue();
			oEntry.TOTAL_TOT_SET = this.getView().byId("input_TOTAL_TOT_SET").getValue();
			oEntry.TOTAL_TOT_VAL = this.getView().byId("input_TOTAL_TOT_VAL").getValue();
			oEntry.TOTAL_SET_VAL = this.getView().byId("input_TOTAL_SET_VAL").getValue();
			oEntry.TOTAL_TOT_UNS = this.getView().byId("input_TOTAL_TOT_UNS").getValue();
			oEntry.TOTAL_OUT_VAL = this.getView().byId("input_TOTAL_OUT_VAL").getValue();
			oEntry.TOTAL_OUT_ARR = this.getView().byId("input_TOTAL_OUT_ARR").getValue();*/
			
			//SUMMARY OF REPUDIATIONS THROUGH BROKER
			/*	oEntry.Ins01RepName = this.getView().byId("input_INS01_REP_NAME").getValue();
				oEntry.Ins01NumRep = this.getView().byId("input_INS01_NUM_REP").getValue();
				oEntry.Ins01ValRep = this.getView().byId("input_INS01_VAL_REP").getValue();
				oEntry.Ins01CumRep = this.getView().byId("input_INS01_CUM_REP").getValue();
				oEntry.Ins01CumVal = this.getView().byId("input_INS01_CUM_VAL").getValue();
				oEntry.Ins02RepName = this.getView().byId("input_INS02_REP_NAME").getValue();
				oEntry.Ins02NumRep = this.getView().byId("input_INS02_NUM_REP").getValue();
				oEntry.Ins02ValRep = this.getView().byId("input_INS02_VAL_REP").getValue();
				oEntry.Ins02CumRep = this.getView().byId("input_INS02_CUM_REP").getValue();
				oEntry.Ins02CumVal = this.getView().byId("input_INS02_CUM_VAL").getValue();
				oEntry.Ins03RepName = this.getView().byId("input_INS03_REP_NAME").getValue();
				oEntry.Ins03NumRep = this.getView().byId("input_INS03_NUM_REP").getValue();
				oEntry.Ins03ValRep = this.getView().byId("input_INS03_VAL_REP").getValue();
				oEntry.Ins03CumRep = this.getView().byId("input_INS03_CUM_REP").getValue();
				oEntry.Ins03CumVal = this.getView().byId("input_INS03_CUM_VAL").getValue();
				oEntry.Ins04RepName = this.getView().byId("input_INS04_REP_NAME").getValue();
				oEntry.Ins04NumRep = this.getView().byId("input_INS04_NUM_REP").getValue();
				oEntry.Ins04ValRep = this.getView().byId("input_INS04_VAL_REP").getValue();
				oEntry.Ins04CumRep = this.getView().byId("input_INS04_CUM_REP").getValue();
				oEntry.Ins04CumVal = this.getView().byId("input_INS04_CUM_VAL").getValue();
				oEntry.Ins05RepName = this.getView().byId("input_INS05_REP_NAME").getValue();
				oEntry.Ins05NumRep = this.getView().byId("input_INS05_NUM_REP").getValue();
				oEntry.Ins05ValRep = this.getView().byId("input_INS05_VAL_REP").getValue();
				oEntry.Ins05CumRep = this.getView().byId("input_INS05_CUM_REP").getValue();
				oEntry.Ins05CumVal = this.getView().byId("input_INS05_CUM_VAL").getValue();
				// oEntry.Ins06RepName = this.getView().byId("input_INS06_REP_NAME").getValue();
				// oEntry.Ins06NumRep = this.getView().byId("input_INS06_NUM_REP").getValue();
				// oEntry.Ins06ValRep = this.getView().byId("input_INS06_VAL_REP").getValue();
				// oEntry.Ins06CumRep = this.getView().byId("input_INS06_CUM_REP").getValue();
				// oEntry.Ins06CumVal = this.getView().byId("input_INS06_CUM_VAL").getValue();
				// oEntry.Ins07RepName = this.getView().byId("input_INS07_REP_NAME").getValue();
				// oEntry.Ins07NumRep = this.getView().byId("input_INS07_NUM_REP").getValue();
				// oEntry.Ins07ValRep = this.getView().byId("input_INS07_VAL_REP").getValue();
				// oEntry.Ins07CumRep = this.getView().byId("input_INS07_CUM_REP").getValue();
				// oEntry.Ins07CumVal = this.getView().byId("input_INS07_CUM_VAL").getValue();
				oEntry.Ins08RepName = this.getView().byId("input_INS08_REP_NAME").getValue();
				oEntry.Ins08NumRep = this.getView().byId("input_INS08_NUM_REP").getValue();
				oEntry.Ins08ValRep = this.getView().byId("input_INS08_VAL_REP").getValue();
				oEntry.Ins08CumRep = this.getView().byId("input_INS08_CUM_REP").getValue();
				oEntry.Ins08CumVal = this.getView().byId("input_INS08_CUM_VAL").getValue();
				oEntry.Ins09RepName = this.getView().byId("input_INS09_REP_NAME").getValue();
				oEntry.Ins09NumRep = this.getView().byId("input_INS09_NUM_REP").getValue();
				oEntry.Ins09ValRep = this.getView().byId("input_INS09_VAL_REP").getValue();
				oEntry.Ins09CumRep = this.getView().byId("input_INS09_CUM_REP").getValue();
				oEntry.Ins09CumVal = this.getView().byId("input_INS09_CUM_VAL").getValue();
				oEntry.Ins10RepName = this.getView().byId("input_INS10_REP_NAME").getValue();
				oEntry.Ins10NumRep = this.getView().byId("input_INS10_NUM_REP").getValue();
				oEntry.Ins10ValRep = this.getView().byId("input_INS10_VAL_REP").getValue();
				oEntry.Ins10CumRep = this.getView().byId("input_INS10_CUM_REP").getValue();
				oEntry.Ins10CumVal = this.getView().byId("input_INS10_CUM_VAL").getValue();
				oEntry.Ins11RepName = this.getView().byId("input_INS11_REP_NAME").getValue();
				oEntry.Ins11NumRep = this.getView().byId("input_INS11_NUM_REP").getValue();
				oEntry.Ins11ValRep = this.getView().byId("input_INS11_VAL_REP").getValue();
				oEntry.Ins11CumRep = this.getView().byId("input_INS11_CUM_REP").getValue();
				oEntry.Ins11CumVal = this.getView().byId("input_INS11_CUM_VAL").getValue();
				oEntry.Ins12RepName = this.getView().byId("input_INS12_REP_NAME").getValue();
				oEntry.Ins12NumRep = this.getView().byId("input_INS12_NUM_REP").getValue();
				oEntry.Ins12ValRep = this.getView().byId("input_INS12_VAL_REP").getValue();
				oEntry.Ins12CumRep = this.getView().byId("input_INS12_CUM_REP").getValue();
				oEntry.Ins12CumVal = this.getView().byId("input_INS12_CUM_VAL").getValue();
				oEntry.Ins13RepName = this.getView().byId("input_INS13_REP_NAME").getValue();
				oEntry.Ins13NumRep = this.getView().byId("input_INS13_NUM_REP").getValue();
				oEntry.Ins13ValRep = this.getView().byId("input_INS13_VAL_REP").getValue();
				oEntry.Ins13CumRep = this.getView().byId("input_INS13_CUM_REP").getValue();
				oEntry.Ins13CumVal = this.getView().byId("input_INS13_CUM_VAL").getValue();
				oEntry.Ins14RepName = this.getView().byId("input_INS14_REP_NAME").getValue();
				oEntry.Ins14NumRep = this.getView().byId("input_INS14_NUM_REP").getValue();
				oEntry.Ins14ValRep = this.getView().byId("input_INS14_VAL_REP").getValue();
				oEntry.Ins14CumRep = this.getView().byId("input_INS14_CUM_REP").getValue();
				oEntry.Ins14CumVal = this.getView().byId("input_INS14_CUM_VAL").getValue();
				oEntry.Ins15RepName = this.getView().byId("input_INS15_REP_NAME").getValue();
				oEntry.Ins15NumRep = this.getView().byId("input_INS15_NUM_REP").getValue();
				oEntry.Ins15ValRep = this.getView().byId("input_INS15_VAL_REP").getValue();
				oEntry.Ins15CumRep = this.getView().byId("input_INS15_CUM_REP").getValue();
				oEntry.Ins15CumVal = this.getView().byId("input_INS15_CUM_VAL").getValue();
				oEntry.Ins16RepName = this.getView().byId("input_INS16_REP_NAME").getValue();
				oEntry.Ins16NumRep = this.getView().byId("input_INS16_NUM_REP").getValue();
				oEntry.Ins16ValRep = this.getView().byId("input_INS16_VAL_REP").getValue();
				oEntry.Ins16CumRep = this.getView().byId("input_INS16_CUM_REP").getValue();
				oEntry.Ins16CumVal = this.getView().byId("input_INS16_CUM_VAL").getValue();
				oEntry.Ins17RepName = this.getView().byId("input_INS17_REP_NAME").getValue();
				oEntry.Ins17NumRep = this.getView().byId("input_INS17_NUM_REP").getValue();
				oEntry.Ins17ValRep = this.getView().byId("input_INS17_VAL_REP").getValue();
				oEntry.Ins17CumRep = this.getView().byId("input_INS17_CUM_REP").getValue();
				oEntry.Ins17CumVal = this.getView().byId("input_INS17_CUM_VAL").getValue();
				oEntry.Ins18RepName = this.getView().byId("input_INS18_REP_NAME").getValue();
				oEntry.Ins18NumRep = this.getView().byId("input_INS18_NUM_REP").getValue();
				oEntry.Ins18ValRep = this.getView().byId("input_INS18_VAL_REP").getValue();
				oEntry.Ins18CumRep = this.getView().byId("input_INS18_CUM_REP").getValue();
				oEntry.Ins18CumVal = this.getView().byId("input_INS18_CUM_VAL").getValue();*/
				// oEntry.Ins19RepName = this.getView().byId("input_INS19_REP_NAME").getValue();
				// oEntry.Ins19NumRep = this.getView().byId("input_INS19_NUM_REP").getValue();
				// oEntry.Ins19ValRep = this.getView().byId("input_INS19_VAL_REP").getValue();
				// oEntry.Ins19CumRep = this.getView().byId("input_INS19_CUM_REP").getValue();
				// oEntry.Ins19CumVal = this.getView().byId("input_INS19_CUM_VAL").getValue();
				// oEntry.Ins20RepName = this.getView().byId("input_INS20_REP_NAME").getValue();
				// oEntry.Ins20NumRep = this.getView().byId("input_INS20_NUM_REP").getValue();
				// oEntry.Ins20ValRep = this.getView().byId("input_INS20_VAL_REP").getValue();
				// oEntry.Ins20CumRep = this.getView().byId("input_INS20_CUM_REP").getValue();
				// oEntry.Ins20CumVal = this.getView().byId("input_INS20_CUM_VAL").getValue();
				// oEntry.TotalNumRep = this.getView().byId("input_TOTAL_NUM_REP").getValue(); calculated value
				// oEntry.TotalValRep = this.getView().byId("input_TOTAL_VAL_REP").getValue(); calculated value
				// oEntry.TotalCumRep= this.getView().byId("input_TOTAL_CUM_REP").getValue(); calculated value
				// oEntry.TotalCumVal = this.getView().byId("input_TOTAL_CUM_VAL").getValue(); calculated value

			//INCOME STATEMENT
		/*	oEntry.GrossPremRec = this.getView().byId("input_GROSS_PREM_REC").getValue();
			oEntry.GrossPremPay = this.getView().byId("input_GROSS_PREM_PAY").getValue();
			//		oEntry.BrokerageComm = this.getView().byId("input_BROKERAGE_COMM").getValue(); calculated value
			oEntry.LessBrokerage = this.getView().byId("input_LESS_BROKERAGE").getValue();
			//	oEntry.NettBrokerage = this.getView().byId("input_NETT_BROKERAGE").getValue(); calculated value
			oEntry.OtherIncome = this.getView().byId("input_OTHER_INCOME").getValue();
			oEntry.LessAdminExp = this.getView().byId("input_LESS_ADMIN_EXP").getValue();
			//	oEntry.ProfitBefore = this.getView().byId("input_PROFIT_BEFORE").getValue(); calculated value
			oEntry.Taxation = this.getView().byId("input_TAXATION").getValue();
			//	oEntry.ProfitAfter = this.getView().byId("input_PROFIT_AFTER").getValue(); calculated value

			//STATEMENT OF FINANCIAL POSITION (BALANCE SHEET) Tab 1
			oEntry.Shares = this.getView().byId("input_SHARES").getValue();
			oEntry.AuthShares = this.getView().byId("input_AUTH_SHARES").getValue();
			//no field for issued and paid up capital  calculated value
			oEntry.ShareCapital = this.getView().byId("input_SHARE_CAPITAL").getValue();
			oEntry.SharePremium = this.getView().byId("input_SHARE_PREMIUM").getValue();
			oEntry.NonDistrib = this.getView().byId("input_NON_DISTRIB").getValue();
			//	oEntry.RetainIncome = this.getView().byId("input_RETAIN_INCOME").getValue();  calculated value

			//STATEMENT OF FINANCIAL POSITION (BALANCE SHEET) Tab 2
			oEntry.OwnwerEquity = this.getView().byId("input_OWNWER_EQUITY").getValue();
			oEntry.NonCurName1 = this.getView().byId("input_NON_CUR_NAME1").getValue();
			oEntry.NonCurName2 = this.getView().byId("input_NON_CUR_NAME2").getValue();
			oEntry.NonCurName3 = this.getView().byId("input_NON_CUR_NAME3").getValue();
			oEntry.NonCurName4 = this.getView().byId("input_NON_CUR_NAME4").getValue();
			oEntry.NonCurName5 = this.getView().byId("input_NON_CUR_NAME5").getValue();
			oEntry.NonCurAmnt1 = this.getView().byId("input_NON_CUR_AMNT1").getValue();
			oEntry.NonCurAmnt2 = this.getView().byId("input_NON_CUR_AMNT2").getValue();
			oEntry.NonCurAmnt3 = this.getView().byId("input_NON_CUR_AMNT3").getValue();
			oEntry.NonCurAmnt4 = this.getView().byId("input_NON_CUR_AMNT4").getValue();
			oEntry.NonCurAmnt5 = this.getView().byId("input_NON_CUR_AMNT5").getValue();
			// NO FIELD FOR current liabilities, calculated value
			oEntry.PayPremium = this.getView().byId("input_PAY_PREMIUM").getValue();
			//oEntry.OtherLiab = this.getView().byId("input_OTHER_LIAB").getValue(); calculated value
			oEntry.TaxationBs = this.getView().byId("input_TAXATION_BS").getValue();
			// oEntry.TotCurLiab = this.getView().byId("input_TOTAL_CUR_LIAB").getValue(); calculated value
			// oEntry.TotEquLiab = this.getView().byId("input_TOTAL_EQU_LIAB").getValue(); calculated value

			//STATEMENT OF FINANCIAL POSITION (BALANCE SHEET) Tab 3
			//	oEntry.PropEquip = this.getView().byId("input_PROP_EQUIP").getValue();  calculated
			oEntry.LandBuild = this.getView().byId("input_LAND_BUILD").getValue();
			oEntry.FurnishFit = this.getView().byId("input_FURNISH_FIT").getValue();
			oEntry.MotorVehicle = this.getView().byId("input_MOTOR_VEHICLE").getValue();
			oEntry.CompEquip = this.getView().byId("input_COMP_EQUIP").getValue();
			oEntry.CompSoft = this.getView().byId("input_COMP_SOFT").getValue();
			oEntry.Investments = this.getView().byId("input_INVESTMENTS").getValue();
			oEntry.OtherAssets = this.getView().byId("input_OTHER_ASSETS").getValue();
			//	oEntry.TotNonCur = this.getView().byId("input_TOT_NON_CUR").getValue();  calculated

			//STATEMENT OF FINANCIAL POSITION (BALANCE SHEET) Tab 4
			oEntry.CommReceive = this.getView().byId("input_COMM_RECEIVE").getValue();*/
			// oEntry.AccureInvest = this.getView().byId("input_ACCURE_INVEST").getValue(); calculated
			// oEntry.OtherDebt = this.getView().byId("input_OTHER_DEBT").getValue(); calculated
			// oEntry.CashEquiv = this.getView().byId("input_CASH_EQUIV").getValue(); calculated
			//	oEntry.TotCurAsset = this.getView().byId("input_TOT_CUR_ASSET").getValue(); calculated
			//	oEntry.TotAsset = this.getView().byId("input_TOT_ASSET").getValue(); calculated

//	*****************************************end of mapping**************************************************************************************************************

	
			oModel.setUseBatch(true);

			oModel.create("/ZBROKERSSet", oEntry, {
				success: function(data) {
					sap.ui.core.BusyIndicator.hide();
					MessageBox.show(
						that._oResourceBundle.getText("saveSuccess") + "" + data.ReturnNo, {
							icon: MessageBox.Icon.SUCCESS,
							title: "Success",
							actions: [MessageBox.Action.OK],
							id: "msgBox2",
							styleClass: bCompact ? "sapUiSizeCompact" : ""
						}
					);

					that._afterSave();
				},
				error: function(err) {
					sap.ui.core.BusyIndicator.hide();
					MessageBox.show(

						that._oResourceBundle.getText("saveFailed"), {
							icon: MessageBox.Icon.ERROR,
							title: "Error",
							actions: [MessageBox.Action.OK],
							id: "msgBox3",
							details: err,
							styleClass: bCompact ? "sapUiSizeCompact" : ""
						}
					);

				}
			});

		},

		//Method to check for changes in mandatory fields
		_noChanges: function() {

			var count = 0,
				inputFields = [
					/*this.getView().byId("input_"),
					this.getView().byId("__sitename"),
					this.getView().byId("__licenseename"),
					this.getView().byId("__sampletype"),
					this.getView().byId("__lab1"),
					this.getView().byId("__lab2"),
					this.getView().byId("_nameoftester"),
					this.getView().byId("_licenseerep"),
					this.getView().byId("__date3"),
					this.getView().byId("__date1"),
					this.getView().byId("__date")*/
				];

			jQuery.each(inputFields, function(i, input) {
				if (!input.getValue()) {
					input.setValueState("Error");
					count += 1;
				}
			});

			if (count > 1) {
				return true;
			} else {
				return false;
			}
		},
		
	//Method to check for blank fields and insert zero
	/*	validateEmptyFields: function() {
			jQuery.each(this.getInputFields(), function(i, input) {
				if (input.getValue() === "") {
					input.setValueState(sap.ui.core.ValueState.Error);
					input.setValue("0");
					//MessageToast.show(msg); this will show message box
					//MessageToast.show("Invalid format, text only");
					return false;
				}
				else{
					if(input.getValue() !== ""){
					// input.setValueState(sap.ui.core.ValueState.Success);
					}
					return true;
				}
			});	

		},*/
		
		//Method to check if numbers entered are positive
	/*	validateFields: function() {
			var reg = /^[0-9]*$/;
		
			jQuery.each(this.getInputFields(), function(i,input) {
				if (reg.test(input.getValue()) === false) {	
					var currentInput;
					currentInput = input.getValue().replace(/[^0-9\.]+/g, '').replace(/(\..*)\./g, '').replace(/(?!^)-/g, ''); //regex for decimal numbers only
					input.setValue(currentInput);
					// input.preventDefault();
					var msg = "Invalid format, positive numbers only.";
					sap.m.MessageToast.show(msg, {
				    duration: 3000,                  // default
				    width: "15em",                   // default
				    my: "center bottom",             // default
				    at: "center bottom",             // default
				    of: window,                      // default
				    offset: "0 0",                   // default
				    collision: "fit fit",            // default
				    onClose: null,                   // default
				    autoClose: true,                 // default
				    animationTimingFunction: "ease", // default
				    animationDuration: 1000,         // default
				    closeOnBrowserNavigation: true   // default
				});
					}
				else{
					if(input.getValue() !== ""){
					// input.setValueState(sap.ui.core.ValueState.Success);
					}
					return true;
				}
			});	

		},
		*/
		getInputFields  : function() {
			// var trial = [this.FiscalYear = this.getView().byId("input_FiscalYear")];
			var inputFields = [
				
				//Details of the broker
			// this.Business = "Brokers",
			this.FiscalYear = this.getView().byId("input_FiscalYear"),
			this.Partner = this.getView().byId("input_BusinessPartnerNumber"),
			this.PeriodEnd = this.getView().byId("input_PeriodEnding"),
			this.Quarter = this.getView().byId("input_FinancialQuarter"),

			//SUMMARY BY CLASS OF BUSINESS PLACED BY BROKER WITHIN ZIMBABWE (PERSONAL LINES) Tab 1
			this.PerOwnersTotIns = this.getView().byId("input_PER_OWNERS_TOT_INS"),
			this.PerOwnersTotPre = this.getView().byId("input_PER_OWNERS_TOT_PRE"),
			this.PerOwnersTotPol = this.getView().byId("input_PER_OWNERS_TOT_POL"),
			this.PerOwnersComRec = this.getView().byId("input_PER_OWNERS_COM_REC"),
			this.PerOwnersOthCos = this.getView().byId("input_PER_OWNERS_OTH_COS"),
			this.PerHolderTotIns = this.getView().byId("input_PER_HOLDER_TOT_INS"),
			this.PerHolderTotPre = this.getView().byId("input_PER_HOLDER_TOT_PRE"),
			this.PerHolderTotPol = this.getView().byId("input_PER_HOLDER_TOT_POL"),
			this.PerHolderComRec = this.getView().byId("input_PER_HOLDER_COM_REC"),
			this.PerHolderOthCos = this.getView().byId("input_PER_HOLDER_OTH_COS"),
			this.PerHealthTotIns = this.getView().byId("input_PER_HEALTH_TOT_INS"),
			this.PerHealthTotPre = this.getView().byId("input_PER_HEALTH_TOT_PRE"),
			this.PerHealthTotPol = this.getView().byId("input_PER_HEALTH_TOT_POL"),
			this.PerHealthComRec = this.getView().byId("input_PER_HEALTH_COM_REC"),
			this.PerHealthOthCos = this.getView().byId("input_PER_HEALTH_OTH_COS"),
			this.PerRtaTotIns = this.getView().byId("input_PER_RTA_TOT_INS"),
			this.PerRtaTotPre = this.getView().byId("input_PER_RTA_TOT_PRE"),
			this.PerRtaTotPol = this.getView().byId("input_PER_RTA_TOT_POL"),
			this.PerRtaComRec = this.getView().byId("input_PER_RTA_COM_REC"),
			this.PerRtaOthCos = this.getView().byId("input_PER_RTA_OTH_COS"),
			this.PerFtpTotIns = this.getView().byId("input_PER_FTP_TOT_INS"),
			this.PerFtpTotPre = this.getView().byId("input_PER_FTP_TOT_PRE"),
			this.PerFtpTotPol = this.getView().byId("input_PER_FTP_TOT_POL"),
			this.PerFtpComRec = this.getView().byId("input_PER_FTP_COM_REC"),
			this.PerFtpOthCos = this.getView().byId("input_PER_FTP_OTH_COS"),
			this.PerCompreTotIns = this.getView().byId("input_PER_COMPRE_TOT_INS"),
			this.PerCompreTotPre = this.getView().byId("input_PER_COMPRE_TOT_PRE"),
			this.PerCompreTotPol = this.getView().byId("input_PER_COMPRE_TOT_POL"),
			this.PerCompreComRec = this.getView().byId("input_PER_COMPRE_COM_REC"),
			this.PerCompreOthCos = this.getView().byId("input_PER_COMPRE_OTH_COS"),
			this.PerOtherTotIns = this.getView().byId("input_PER_OTHER_TOT_INS"),
			this.PerOtherTotPre = this.getView().byId("input_PER_OTHER_TOT_PRE"),
			this.PerOtherTotPol = this.getView().byId("input_PER_OTHER_TOT_POL"),
			this.PerOtherComRec = this.getView().byId("input_PER_OTHER_COM_REC"),
			this.PerOtherOthCos = this.getView().byId("input_PER_OTHER_OTH_COS"),
		
			//SUMMARY BY CLASS OF BUSINESS PLACED BY BROKER WITHIN ZIMBABWE ( COMMERCIAL LINES) Tab 2
				this.ComFireTotIns = this.getView().byId("input_COM_FIRE_TOT_INS"),
				this.ComFireTotPre = this.getView().byId("input_COM_FIRE_TOT_PRE"),
				this.ComFireTotPol = this.getView().byId("input_COM_FIRE_TOT_POL"),
				this.ComFireComRec = this.getView().byId("input_COM_FIRE_COM_REC"),
				this.ComFireOthCos = this.getView().byId("input_COM_FIRE_OTH_COS"),
				this.ComEngineTotIns = this.getView().byId("input_COM_ENGINE_TOT_INS"),
				this.ComEngineTotPre = this.getView().byId("input_COM_ENGINE_TOT_PRE"),
				this.ComEngineTotPol = this.getView().byId("input_COM_ENGINE_TOT_POL"),
				this.ComEngineComRec = this.getView().byId("input_COM_ENGINE_COM_REC"),
				this.ComEngineOthCos = this.getView().byId("input_COM_ENGINE_OTH_COS"),
				this.ComRtaTotIns = this.getView().byId("input_COM_RTA_TOT_INS"),
				this.ComRtaTotPre = this.getView().byId("input_COM_RTA_TOT_PRE"),
				this.ComRtaTotPol = this.getView().byId("input_COM_RTA_TOT_POL"),
				this.ComRtaComRec = this.getView().byId("input_COM_RTA_COM_REC"),
				this.ComRtaOthCos = this.getView().byId("input_COM_RTA_OTH_COS"),
				this.ComFtpTotIns = this.getView().byId("input_COM_FTP_TOT_INS"),
				this.ComFtpTotPre = this.getView().byId("input_COM_FTP_TOT_PRE"),
				this.ComFtpTotPol = this.getView().byId("input_COM_FTP_TOT_POL"),
				this.ComFtpComRec = this.getView().byId("input_COM_FTP_COM_REC"),
				this.ComFtpOthCos = this.getView().byId("input_COM_FTP_OTH_COS"),
				this.ComCompreTotIns = this.getView().byId("input_COM_COMPRE_TOT_INS"),
				this.ComCompreTotPre = this.getView().byId("input_COM_COMPRE_TOT_PRE"),
				this.ComCompreTotPol = this.getView().byId("input_COM_COMPRE_TOT_POL"),
				this.ComCompreComRec = this.getView().byId("input_COM_COMPRE_COM_REC"),
				this.ComCompreOthCos = this.getView().byId("input_COM_COMPRE_OTH_COS"),
				this.ComMarineTotIns = this.getView().byId("input_COM_MARINE_TOT_INS"),
				this.ComMarineTotPre = this.getView().byId("input_COM_MARINE_TOT_PRE"),
				this.ComMarineTotPol = this.getView().byId("input_COM_MARINE_TOT_POL"),
				this.ComMarineComRec = this.getView().byId("input_COM_MARINE_COM_REC"),
				this.ComMarineOthCos = this.getView().byId("input_COM_MARINE_OTH_COS"),
				this.ComAviatiTotIns = this.getView().byId("input_COM_AVIATI_TOT_INS"),
				this.ComAviatiTotPre = this.getView().byId("input_COM_AVIATI_TOT_PRE"),
				this.ComAviatiTotPol = this.getView().byId("input_COM_AVIATI_TOT_POL"),
				this.ComAviatiComRec = this.getView().byId("input_COM_AVIATI_COM_REC"),
				this.ComAviatiOthCos = this.getView().byId("input_COM_AVIATI_OTH_COS"),
				this.ComPAcciTotIns = this.getView().byId("input_COM_P_ACCI_TOT_INS"),
				this.ComPAcciTotPre = this.getView().byId("input_COM_P_ACCI_TOT_PRE"),
				this.ComPAcciTotPol = this.getView().byId("input_COM_P_ACCI_TOT_POL"),
				this.ComPAcciComRec = this.getView().byId("input_COM_P_ACCI_COM_REC"),
				this.ComPAcciOthCos = this.getView().byId("input_COM_P_ACCI_OTH_COS"),
				this.ComMAcciTotIns = this.getView().byId("input_COM_M_ACCI_TOT_INS"),
				this.ComMAcciTotPre = this.getView().byId("input_COM_M_ACCI_TOT_PRE"),
				this.ComMAcciTotPol = this.getView().byId("input_COM_M_ACCI_TOT_POL"),
				this.ComMAcciComRec = this.getView().byId("input_COM_M_ACCI_COM_REC"),
				this.ComMAcciOthCos = this.getView().byId("input_COM_M_ACCI_OTH_COS"),
				this.ComBondsTotIns = this.getView().byId("input_COM_BONDS_TOT_INS"),
				this.ComBondsTotPre = this.getView().byId("input_COM_BONDS_TOT_PRE"),
				this.ComBondsTotPol = this.getView().byId("input_COM_BONDS_TOT_POL"),
				this.ComBondsComRec = this.getView().byId("input_COM_BONDS_COM_REC"),
				this.ComBondsOthCos = this.getView().byId("input_COM_BONDS_OTH_COS"),
				this.ComFarmTotIns = this.getView().byId("input_COM_FARM_TOT_INS"),
				this.ComFarmTotPre = this.getView().byId("input_COM_FARM_TOT_PRE"),
				this.ComFarmTotPol = this.getView().byId("input_COM_FARM_TOT_POL"),
				this.ComFarmComRec = this.getView().byId("input_COM_FARM_COM_REC"),
				this.ComFarmOthCos = this.getView().byId("input_COM_FARM_OTH_COS"),
				this.ComHailTotIns = this.getView().byId("input_COM_HAIL_TOT_INS"),
				this.ComHailTotPre = this.getView().byId("input_COM_HAIL_TOT_PRE"),
				this.ComHailTotPol = this.getView().byId("input_COM_HAIL_TOT_POL"),
				this.ComHailComRec = this.getView().byId("input_COM_HAIL_COM_REC"),
				this.ComHailOthCos = this.getView().byId("input_COM_HAIL_OTH_COS"),
				this.ComHealthTotIns = this.getView().byId("input_COM_HEALTH_TOT_INS"),
				this.ComHealthTotPre = this.getView().byId("input_COM_HEALTH_TOT_PRE"),
				this.ComHealthTotPol = this.getView().byId("input_COM_HEALTH_TOT_POL"),
				this.ComHealthComRec = this.getView().byId("input_COM_HEALTH_COM_REC"),
				this.ComHealthOthCos = this.getView().byId("input_COM_HEALTH_OTH_COS"),
				this.ComOtherTotIns = this.getView().byId("input_COM_OTHER_TOT_INS"),
				this.ComOtherTotPre = this.getView().byId("input_COM_OTHER_TOT_PRE"),
				this.ComOtherTotPol = this.getView().byId("input_COM_OTHER_TOT_POL"),
				this.ComOtherComRec = this.getView().byId("input_COM_OTHER_COM_REC"),
				this.ComOtherOthCos = this.getView().byId("input_COM_OTHER_OTH_COS"),
				
				//SUMMARY OF BUSINESS PLACED WITH INSURERS WITHIN ZIMBABWE Tab 3
					this.Ins01Name = this.getView().byId("input_INS01_NAME"),
						this.Ins01TotPre = this.getView().byId("input_INS01_TOT_PRE"),
			this.Ins01TotPol = this.getView().byId("input_INS01_TOT_POL"),
			this.Ins01ComRec = this.getView().byId("input_INS01_COM_REC"),
			this.Ins01OthCos = this.getView().byId("input_INS01_OTH_COS"),
			this.Ins02Name = this.getView().byId("input_INS02_NAME"),
			this.Ins02TotPre = this.getView().byId("input_INS02_TOT_PRE"),
			this.Ins02TotPol = this.getView().byId("input_INS02_TOT_POL"),
			this.Ins02ComRec = this.getView().byId("input_INS02_COM_REC"),
			this.Ins02OthCos = this.getView().byId("input_INS02_OTH_COS"),
			this.Ins03Name = this.getView().byId("input_INS03_NAME"),
			this.Ins03TotPre = this.getView().byId("input_INS03_TOT_PRE"),
			this.Ins03TotPol = this.getView().byId("input_INS03_TOT_POL"),
			this.Ins03ComRec = this.getView().byId("input_INS03_COM_REC"),
			this.Ins03OthCos = this.getView().byId("input_INS03_OTH_COS"),
			this.Ins04Name = this.getView().byId("input_INS04_NAME"),
			this.Ins04TotPre = this.getView().byId("input_INS04_TOT_PRE"),
			this.Ins04TotPol = this.getView().byId("input_INS04_TOT_POL"),
			this.Ins04ComRec = this.getView().byId("input_INS04_COM_REC"),
			this.Ins04OthCos = this.getView().byId("input_INS04_OTH_COS"),
			this.Ins05Name = this.getView().byId("input_INS05_NAME"),
			this.Ins05TotPre = this.getView().byId("input_INS05_TOT_PRE"),
			this.Ins05TotPol = this.getView().byId("input_INS05_TOT_POL"),
			this.Ins05ComRec = this.getView().byId("input_INS05_COM_REC"),
			this.Ins05OthCos = this.getView().byId("input_INS05_OTH_COS"),
			this.Ins06Name  = this.getView().byId("input_INS06_NAME"),
			this.Ins06TotPre = this.getView().byId("input_INS06_TOT_PRE"),
			this.Ins06TotPol = this.getView().byId("input_INS06_TOT_POL"),
			this.Ins06ComRec = this.getView().byId("input_INS06_COM_REC"),
			this.Ins06OthCos = this.getView().byId("input_INS06_OTH_COS"),
			this.Ins07Name = this.getView().byId("input_INS07_NAME"),
			this.Ins07TotPre = this.getView().byId("input_INS07_TOT_PRE"),
			this.Ins07TotPol = this.getView().byId("input_INS07_TOT_POL"),
			this.Ins07ComRec = this.getView().byId("input_INS07_COM_REC"),
			this.Ins07OthCos = this.getView().byId("input_INS07_OTH_COS"),
			this.Ins08Name = this.getView().byId("input_INS08_NAME"),
			this.Ins08TotPre = this.getView().byId("input_INS08_TOT_PRE"),
			this.Ins08TotPol = this.getView().byId("input_INS08_TOT_POL"),
			this.Ins08ComRec = this.getView().byId("input_INS08_COM_REC"),
			this.Ins08OthCos = this.getView().byId("input_INS08_OTH_COS"),
			
			//SUMMARY OF BUSINESS PLACED WITH INSURERS WITHIN ZIMBABWE Tab 4
		this.Ins09Name = this.getView().byId("input_INS09_NAME"),
			this.Ins09TotPre = this.getView().byId("input_INS09_TOT_PRE"),
			this.Ins09TotPol = this.getView().byId("input_INS09_TOT_POL"),
			this.Ins09ComRec = this.getView().byId("input_INS09_COM_REC"),
			this.Ins09OthCos = this.getView().byId("input_INS09_OTH_COS"),
			this.Ins10Name = this.getView().byId("input_INS10_NAME"),
			this.Ins10TotPre = this.getView().byId("input_INS10_TOT_PRE"),
			this.Ins10TotPol = this.getView().byId("input_INS10_TOT_POL"),
			this.Ins10ComRec = this.getView().byId("input_INS10_COM_REC"),
			this.Ins10OthCos = this.getView().byId("input_INS10_OTH_COS"),
			this.Ins11Name = this.getView().byId("input_INS11_NAME"),
			this.Ins11TotPre = this.getView().byId("input_INS11_TOT_PRE"),
			this.Ins11TotPol = this.getView().byId("input_INS11_TOT_POL"),
			this.Ins11ComRec = this.getView().byId("input_INS11_COM_REC"),
			this.Ins11OthCos = this.getView().byId("input_INS11_OTH_COS"),
			this.Ins12Name = this.getView().byId("input_INS12_NAME"),
			this.Ins12TotPre = this.getView().byId("input_INS12_TOT_PRE"),
			this.Ins12TotPol = this.getView().byId("input_INS12_TOT_POL"),
			this.Ins12ComRec = this.getView().byId("input_INS12_COM_REC"),
			this.Ins12OthCos = this.getView().byId("input_INS12_OTH_COS"),
			this.Ins13Name = this.getView().byId("input_INS13_NAME"),
			this.Ins13TotPre = this.getView().byId("input_INS13_TOT_PRE"),
			this.Ins13TotPol = this.getView().byId("input_INS13_TOT_POL"),
			this.Ins13ComRec = this.getView().byId("input_INS13_COM_REC"),
			this.Ins13OthCos = this.getView().byId("input_INS13_OTH_COS"),
			this.Ins14Name = this.getView().byId("input_INS14_NAME"),
			this.Ins14TotPre = this.getView().byId("input_INS14_TOT_PRE"),
			this.Ins14TotPol = this.getView().byId("input_INS14_TOT_POL"),
			this.Ins14ComRec = this.getView().byId("input_INS14_COM_REC"),
			this.Ins14OthCos = this.getView().byId("input_INS14_OTH_COS"),
			this.Ins15Name = this.getView().byId("input_INS15_NAME"),
			this.Ins15TotPre = this.getView().byId("input_INS15_TOT_PRE"),
			this.Ins15TotPol = this.getView().byId("input_INS15_TOT_POL"),
			this.Ins15ComRec = this.getView().byId("input_INS15_COM_REC"),
			this.Ins15OthCos = this.getView().byId("input_INS15_OTH_COS"),
			
			//SUMMARY OF BUSINESS PLACED BY BROKER OUTSIDE ZIMBABWE
			this.Class01Name = this.getView().byId("input_CLASS01_NAME"),
			this.Class01SumIns = this.getView().byId("input_CLASS01_SUM_INS"),
			this.Class01LocIns = this.getView().byId("input_CLASS01_LOC_INS"),
			this.Class01ForIns = this.getView().byId("input_CLASS01_FOR_INS"),
			this.Class01CedPre = this.getView().byId("input_CLASS01_CED_PRE"),
			this.Class01PerRis = this.getView().byId("input_CLASS01_PER_RIS"),
			this.Class01ComRec = this.getView().byId("input_CLASS01_COM_REC"),
			this.Class01OthRec = this.getView().byId("input_CLASS01_OTH_REC"),
			this.Class02Name = this.getView().byId("input_CLASS02_NAME"),
			this.Class02SumIns = this.getView().byId("input_CLASS02_SUM_INS"),
			this.Class02LocIns = this.getView().byId("input_CLASS02_LOC_INS"),
			this.Class02ForIns = this.getView().byId("input_CLASS02_FOR_INS"),
			this.Class02CedPre = this.getView().byId("input_CLASS02_CED_PRE"),
			this.Class02PerRis = this.getView().byId("input_CLASS02_PER_RIS"),
			this.Class02ComRec = this.getView().byId("input_CLASS02_COM_REC"),
			this.Class02OthRec = this.getView().byId("input_CLASS02_OTH_REC"),
			this.Class03Name = this.getView().byId("input_CLASS03_NAME"),
			this.Class02SumIns = this.getView().byId("input_CLASS03_SUM_INS"),
			this.Class03LocIns = this.getView().byId("input_CLASS03_LOC_INS"),
			this.Class03ForIns = this.getView().byId("input_CLASS03_FOR_INS"),
			this.Class03CedPre = this.getView().byId("input_CLASS03_CED_PRE"),
			this.Class03PerRis = this.getView().byId("input_CLASS03_PER_RIS"),
			this.Class03ComRec = this.getView().byId("input_CLASS03_COM_REC"),
			this.Class03OthRec = this.getView().byId("input_CLASS03_OTH_REC"),
			this.Class04Name = this.getView().byId("input_CLASS04_NAME"),
			this.Class04SumIns = this.getView().byId("input_CLASS04_SUM_INS"),
			this.Class04LocIns = this.getView().byId("input_CLASS04_LOC_INS"),
			this.Class04ForIns = this.getView().byId("input_CLASS04_FOR_INS"),
			this.Class04CedPre = this.getView().byId("input_CLASS04_CED_PRE"),
			this.Class03PerRis = this.getView().byId("input_CLASS04_PER_RIS"),
			this.Class04ComRec = this.getView().byId("input_CLASS04_COM_REC"),
			this.Class04OthRec = this.getView().byId("input_CLASS04_OTH_REC"),
			this.Class05Name = this.getView().byId("input_CLASS05_NAME"),
			this.Class05SumIns = this.getView().byId("input_CLASS05_SUM_INS"),
			this.Class05LocIns = this.getView().byId("input_CLASS05_LOC_INS"),
			this.Class05ForIns = this.getView().byId("input_CLASS05_FOR_INS"),
			this.Class05CedPre = this.getView().byId("input_CLASS05_CED_PRE"),
			this.Class05PerRis = this.getView().byId("input_CLASS05_PER_RIS"),
			this.Class05ComRec = this.getView().byId("input_CLASS05_COM_REC"),
			this.Class05OthRec = this.getView().byId("input_CLASS05_OTH_REC"),
			/*	this.CLASS06_NAME = this.getView().byId("input_CLASS06_NAME"),
				this.CLASS06_SUM_INS = this.getView().byId("input_CLASS06_SUM_INS"),
				this.CLASS06_LOC_INS = this.getView().byId("input_CLASS06_LOC_INS"),
				this.CLASS06_FOR_INS = this.getView().byId("input_CLASS06_FOR_INS"),
				this.CLASS06_CED_PRE = this.getView().byId("input_CLASS06_CED_PRE"),
				this.CLASS06_PER_RIS = this.getView().byId("input_CLASS06_PER_RIS"),
				this.CLASS06_COM_REC = this.getView().byId("input_CLASS06_COM_REC"),
				this.CLASS06_OTH_REC = this.getView().byId("input_CLASS06_OTH_REC"),
				this.CLASS07_NAME = this.getView().byId("input_CLASS07_NAME"),
				this.CLASS07_SUM_INS = this.getView().byId("input_CLASS07_SUM_INS"),
				this.CLASS07_LOC_INS = this.getView().byId("input_CLASS07_LOC_INS"),
				this.CLASS07_FOR_INS = this.getView().byId("input_CLASS07_FOR_INS"),
				this.CLASS07_CED_PRE = this.getView().byId("input_CLASS07_CED_PRE"),
				this.CLASS07_PER_RIS = this.getView().byId("input_CLASS07_PER_RIS"),
				this.CLASS07_COM_REC = this.getView().byId("input_CLASS07_COM_REC"),
				this.CLASS07_OTH_REC = this.getView().byId("input_CLASS07_OTH_REC"),
				this.CLASS08_NAME = this.getView().byId("input_CLASS08_NAME"),
				this.CLASS08_SUM_INS = this.getView().byId("input_CLASS08_SUM_INS"),
				this.CLASS08_LOC_INS = this.getView().byId("input_CLASS08_LOC_INS"),
				this.CLASS08_FOR_INS = this.getView().byId("input_CLASS08_FOR_INS"),
				this.CLASS08_CED_PRE = this.getView().byId("input_CLASS08_CED_PRE"),
				this.CLASS08_PER_RIS = this.getView().byId("input_CLASS08_PER_RIS"),
				this.CLASS08_COM_REC = this.getView().byId("input_CLASS08_COM_REC"),
				this.CLASS08_OTH_REC = this.getView().byId("input_CLASS08_OTH_REC"),
				this.CLASS09_NAME = this.getView().byId("input_CLASS09_NAME"),
				this.CLASS09_SUM_INS = this.getView().byId("input_CLASS09_SUM_INS"),
				this.CLASS09_LOC_INS = this.getView().byId("input_CLASS09_LOC_INS"),
				this.CLASS09_FOR_INS = this.getView().byId("input_CLASS09_FOR_INS"),
				this.CLASS09_CED_PRE = this.getView().byId("input_CLASS09_CED_PRE"),
				this.CLASS09_PER_RIS = this.getView().byId("input_CLASS09_PER_RIS"),
				this.CLASS09_COM_REC = this.getView().byId("input_CLASS09_COM_REC"),
				this.CLASS09_OTH_REC = this.getView().byId("input_CLASS09_OTH_REC"),
				this.CLASS10_NAME = this.getView().byId("input_CLASS10_NAME"),
				this.CLASS10_SUM_INS = this.getView().byId("input_CLASS10_SUM_INS"),
				this.CLASS10_LOC_INS = this.getView().byId("input_CLASS10_LOC_INS"),
				this.CLASS10_FOR_INS = this.getView().byId("input_CLASS10_FOR_INS"),
				this.CLASS10_CED_PRE = this.getView().byId("input_CLASS10_CED_PRE"),
				this.CLASS10_PER_RIS = this.getView().byId("input_CLASS10_PER_RIS"),
				this.CLASS10_COM_REC = this.getView().byId("input_CLASS10_COM_REC"),
				this.CLASS10_OTH_REC = this.getView().byId("input_CLASS10_OTH_REC"),
				this.CLASS11_NAME = this.getView().byId("input_CLASS11_NAME"),
				this.CLASS11_SUM_INS = this.getView().byId("input_CLASS11_SUM_INS"),
				this.CLASS11_LOC_INS = this.getView().byId("input_CLASS11_LOC_INS"),
				this.CLASS11_FOR_INS = this.getView().byId("input_CLASS11_FOR_INS"),
				this.CLASS11_CED_PRE = this.getView().byId("input_CLASS11_CED_PRE"),
				this.CLASS11_PER_RIS = this.getView().byId("input_CLASS11_PER_RIS"),
				this.CLASS11_COM_REC = this.getView().byId("input_CLASS11_COM_REC"),
				this.CLASS11_OTH_REC = this.getView().byId("input_CLASS11_OTH_REC"),
				this.CLASS12_NAME = this.getView().byId("input_CLASS12_NAME"),
				this.CLASS12_SUM_INS = this.getView().byId("input_CLASS12_SUM_INS"),
				this.CLASS12_LOC_INS = this.getView().byId("input_CLASS12_LOC_INS"),
				this.CLASS12_FOR_INS = this.getView().byId("input_CLASS12_FOR_INS"),
				this.CLASS12_CED_PRE = this.getView().byId("input_CLASS12_CED_PRE"),
				this.CLASS12_PER_RIS = this.getView().byId("input_CLASS12_PER_RIS"),
				this.CLASS12_COM_REC = this.getView().byId("input_CLASS12_COM_REC"),
				this.CLASS12_OTH_REC = this.getView().byId("input_CLASS12_OTH_REC"),
				this.CLASS13_NAME = this.getView().byId("input_CLASS13_NAME"),
				this.CLASS13_SUM_INS = this.getView().byId("input_CLASS13_SUM_INS"),
				this.CLASS13_LOC_INS = this.getView().byId("input_CLASS13_LOC_INS"),
				this.CLASS13_FOR_INS = this.getView().byId("input_CLASS13_FOR_INS"),
				this.CLASS13_CED_PRE = this.getView().byId("input_CLASS13_CED_PRE"),
				this.CLASS13_PER_RIS = this.getView().byId("input_CLASS13_PER_RIS"),
				this.CLASS13_COM_REC = this.getView().byId("input_CLASS13_COM_REC"),
				this.CLASS13_OTH_REC = this.getView().byId("input_CLASS13_OTH_REC"),
				this.CLASS14_NAME = this.getView().byId("input_CLASS14_NAME"),
				this.CLASS14_SUM_INS = this.getView().byId("input_CLASS14_SUM_INS"),
				this.CLASS14_LOC_INS = this.getView().byId("input_CLASS14_LOC_INS"),
				this.CLASS14_FOR_INS = this.getView().byId("input_CLASS14_FOR_INS"),
				this.CLASS14_CED_PRE = this.getView().byId("input_CLASS14_CED_PRE"),
				this.CLASS14_PER_RIS = this.getView().byId("input_CLASS14_PER_RIS"),
				this.CLASS14_COM_REC = this.getView().byId("input_CLASS14_COM_REC "),
				this.CLASS14_OTH_REC = this.getView().byId("input_CLASS14_OTH_REC"),
				this.CLASS15_NAME = this.getView().byId("input_CLASS15_NAME"),
				this.CLASS15_SUM_INS = this.getView().byId("input_CLASS15_SUM_INS"),
				this.CLASS15_LOC_INS = this.getView().byId("input_CLASS15_LOC_INS"),
				this.CLASS15_FOR_INS = this.getView().byId("input_CLASS15_FOR_INS"),
				this.CLASS15_CED_PRE = this.getView().byId("input_CLASS15_CED_PRE"),
				this.CLASS15_PER_RIS = this.getView().byId("input_CLASS15_PER_RIS"),
				this.CLASS15_COM_REC = this.getView().byId("input_CLASS15_COM_REC"),
				this.CLASS15_OTH_REC = this.getView().byId("input_CLASS15_OTH_REC"),
				this.TOTAL_SUM_INS = this.getView().byId("input_TOTAL_SUM_INS1"),
				this.TOTAL_LOC_INS = this.getView().byId("input_TOTAL_LOC_INS1"),
				this.TOTAL_FOR_INS = this.getView().byId("input_TOTAL_FOR_INS1"),
				this.TOTAL_CED_PRE = this.getView().byId("input_TOTAL_CED_PRE1"),
				this.TOTAL_PER_RIS = this.getView().byId("input_TOTAL_PER_RIS1"),
				this.TOTAL_COM_REC = this.getView().byId("input_TOTAL_COM_REC1"),
				this.TOTAL_OTH_REC = this.getView().byId("input_TOTAL_OTH_REC1"),*/

			//SUMMARY OF CLAIMS THROUGH BROKER* Tab 1
			this.Ins01NameClms = this.getView().byId("input_INS01_NAME_CR"),
			this.Ins01TotClm = this.getView().byId("input_INS01_TOT_CLM"),
			this.Ins01TotVal = this.getView().byId("input_INS01_TOT_VAL"),
			this.Ins01TotSet = this.getView().byId("input_INS01_TOT_SET"),
			this.Ins01SetVal = this.getView().byId("input_INS01_SET_VAL"),
			this.Ins01TotUns = this.getView().byId("input_INS01_TOT_UNS"),
			this.Ins01TotUns = this.getView().byId("input_INS01_OUT_VAL"),
			this.Ins01OutArr = this.getView().byId("input_INS01_OUT_ARR"),
			this.Ins02NameClms = this.getView().byId("input_INS02_NAME_CR"),
			this.Ins02TotClm = this.getView().byId("input_INS02_TOT_CLM"),
			this.Ins02TotVal = this.getView().byId("input_INS02_TOT_VAL"),
			this.Ins02TotVal = this.getView().byId("input_INS02_TOT_SET"),
			this.Ins02TotVal = this.getView().byId("input_INS02_SET_VAL"),
			this.Ins02TotVal = this.getView().byId("input_INS02_TOT_UNS"),
			this.Ins02TotVal = this.getView().byId("input_INS02_OUT_VAL"),
			this.Ins02OutArr = this.getView().byId("input_INS02_OUT_ARR"),
			this.Ins03NameClms = this.getView().byId("input_INS03_NAME_CR"),
			this.Ins03TotClm = this.getView().byId("input_INS03_TOT_CLM"),
			this.Ins03TotVal = this.getView().byId("input_INS03_TOT_VAL"),
			this.Ins03TotSet = this.getView().byId("input_INS03_TOT_SET"),
			this.Ins03SetVal = this.getView().byId("input_INS03_SET_VAL"),
			this.Ins03SetVal = this.getView().byId("input_INS03_TOT_UNS"),
			this.Ins03OutVal = this.getView().byId("input_INS03_OUT_VAL"),
			this.Ins03OutArr = this.getView().byId("input_INS03_OUT_ARR"),
			this.Ins04NameClms = this.getView().byId("input_INS04_NAME_CR"),
			this.Ins04TotClm = this.getView().byId("input_INS04_TOT_CLM"),
			this.Ins04TotVal = this.getView().byId("input_INS04_TOT_VAL"),
			this.Ins04TotSet = this.getView().byId("input_INS04_TOT_SET"),
			this.Ins04SetVal = this.getView().byId("input_INS04_SET_VAL"),
			this.Ins04TotUns = this.getView().byId("input_INS04_TOT_UNS"),
			this.Ins04OutVal = this.getView().byId("input_INS04_OUT_VAL"),
			this.Ins04OutArr = this.getView().byId("input_INS04_OUT_ARR"),
			this.Ins05NameClms = this.getView().byId("input_INS05_NAME_CR"),
			this.Ins05TotClm = this.getView().byId("input_INS05_TOT_CLM"),
			this.Ins05TotVal = this.getView().byId("input_INS05_TOT_VAL"),
			this.Ins05TotSet = this.getView().byId("input_INS05_TOT_SET"),
			this.Ins05TotSet = this.getView().byId("input_INS05_SET_VAL"),
			this.Ins05TotUns = this.getView().byId("input_INS05_TOT_UNS"),
			this.Ins05OutVal = this.getView().byId("input_INS05_OUT_VAL"),
			this.Ins05OutArr = this.getView().byId("input_INS05_OUT_ARR"),

			/*	this.INS06_TOT_CLM = this.getView().byId("input_INS06_TOT_CLM"),
			this.INS06_TOT_VAL = this.getView().byId("input_INS06_TOT_VAL"),
			this.INS06_TOT_SET = this.getView().byId("input_INS06_TOT_SET"),
			this.INS06_SET_VAL = this.getView().byId("input_INS06_SET_VAL"),
			this.INS06_TOT_UNS = this.getView().byId("input_INS06_TOT_UNS"),
			this.INS06_OUT_VAL = this.getView().byId("input_INS06_OUT_VAL"),
			this.INS06_OUT_ARR = this.getView().byId("input_INS06_OUT_ARR"),
	
			this.INS07_TOT_CLM = this.getView().byId("input_INS07_TOT_CLM"),
			this.INS07_TOT_VAL = this.getView().byId("input_INS07_TOT_VAL"),
			this.INS07_TOT_SET = this.getView().byId("input_INS07_TOT_SET"),
			this.INS07_SET_VAL = this.getView().byId("input_INS07_SET_VAL"),
			this.INS07_TOT_UNS = this.getView().byId("input_INS07_TOT_UNS"),
			this.INS07_OUT_VAL = this.getView().byId("input_INS07_OUT_VAL"),
			this.INS07_OUT_ARR = this.getView().byId("input_INS07_OUT_ARR"),
		
			this.INS08_TOT_CLM = this.getView().byId("input_INS08_TOT_CLM"),
			this.INS08_TOT_VAL = this.getView().byId("input_INS08_TOT_VAL"),
			this.INS08_TOT_SET = this.getView().byId("input_INS08_TOT_SET"),
			this.INS08_SET_VAL = this.getView().byId("input_INS08_SET_VAL"),
			this.INS08_TOT_UNS = this.getView().byId("input_INS08_TOT_UNS"),
			this.INS08_OUT_VAL = this.getView().byId("input_INS08_OUT_VAL"),
			this.INS08_OUT_ARR = this.getView().byId("input_INS08_OUT_ARR"),

			this.INS09_TOT_CLM = this.getView().byId("input_INS09_TOT_CLM"),
			this.INS09_TOT_VAL = this.getView().byId("input_INS09_TOT_VAL"),
			this.INS09_TOT_SET = this.getView().byId("input_INS09_TOT_SET"),
			this.INS09_SET_VAL = this.getView().byId("input_INS09_SET_VAL"),
			this.INS09_TOT_UNS = this.getView().byId("input_INS09_TOT_UNS"),
			this.INS09_OUT_VAL = this.getView().byId("input_INS09_OUT_VAL"),
			this.INS09_OUT_ARR = this.getView().byId("input_INS09_OUT_ARR"),
			
			this.INS10_TOT_CLM = this.getView().byId("input_INS10_TOT_CLM"),
			this.INS10_TOT_VAL = this.getView().byId("input_INS10_TOT_VAL"),
			this.INS10_TOT_SET = this.getView().byId("input_INS10_TOT_SET"),
			this.INS10_SET_VAL = this.getView().byId("input_INS10_SET_VAL"),
			this.INS10_TOT_UNS = this.getView().byId("input_INS10_TOT_UNS"),
			this.INS10_OUT_VAL = this.getView().byId("input_INS10_OUT_VAL"),
			this.INS10_OUT_ARR = this.getView().byId("input_INS10_OUT_ARR"),
			
			this.INS11_TOT_CLM = this.getView().byId("input_INS11_TOT_CLM"),
			this.INS11_TOT_VAL = this.getView().byId("input_INS11_TOT_VAL"),
			this.INS11_TOT_SET = this.getView().byId("input_INS11_TOT_SET"),
			this.INS11_SET_VAL = this.getView().byId("input_INS11_SET_VAL"),
			this.INS11_TOT_UNS = this.getView().byId("input_INS11_TOT_UNS"),
			this.INS11_OUT_VAL = this.getView().byId("input_INS11_OUT_VAL"),
			this.INS11_OUT_ARR = this.getView().byId("input_INS11_OUT_ARR"),
		
			this.INS12_TOT_CLM = this.getView().byId("input_INS12_TOT_CLM"),
			this.INS12_TOT_VAL = this.getView().byId("input_INS12_TOT_VAL"),
			this.INS12_TOT_SET = this.getView().byId("input_INS12_TOT_SET"),
			this.INS12_SET_VAL = this.getView().byId("input_INS12_SET_VAL"),
			this.INS12_TOT_UNS = this.getView().byId("input_INS12_TOT_UNS"),
			this.INS12_OUT_VAL = this.getView().byId("input_INS12_OUT_VAL"),
			this.INS12_OUT_ARR = this.getView().byId("input_INS12_OUT_ARR"),
		
			this.INS13_TOT_CLM = this.getView().byId("input_INS13_TOT_CLM"),
			this.INS13_TOT_VAL = this.getView().byId("input_INS13_TOT_VAL"),
			this.INS13_TOT_SET = this.getView().byId("input_INS13_TOT_SET"),
			this.INS13_SET_VAL = this.getView().byId("input_INS13_SET_VA"),
			this.INS13_TOT_UNS = this.getView().byId("input_INS13_TOT_UNS"),
			this.INS13_OUT_VAL = this.getView().byId("input_INS13_OUT_VAL"),
			this.INS13_OUT_ARR = this.getView().byId("input_INS13_OUT_ARR"),
		
			this.INS14_TOT_CLM = this.getView().byId("input_INS14_TOT_CLM"),
			this.INS14_TOT_VAL = this.getView().byId("input_INS14_TOT_VAL"),
			this.INS14_TOT_SET = this.getView().byId("input_INS14_TOT_SET"),
			this.INS14_SET_VAL = this.getView().byId("input_INS14_SET_VAL"),
			this.INS14_TOT_UNS = this.getView().byId("input_INS14_TOT_UNS"),
			this.INS14_OUT_VAL = this.getView().byId("input_INS14_OUT_VAL"),
			this.INS14_OUT_ARR = this.getView().byId("input_INS14_OUT_ARR"),
		
			this.INS15_TOT_CLM = this.getView().byId("input_INS15_TOT_CLM"),
			this.INS15_TOT_VAL = this.getView().byId("input_INS15_TOT_VAL"),
			this.INS15_TOT_SET = this.getView().byId("input_INS15_TOT_SET"),
			this.INS15_SET_VAL = this.getView().byId("input_INS15_SET_VAL"),
			this.INS15_TOT_UNS = this.getView().byId("input_INS15_TOT_UNS"),
			this.INS15_OUT_VAL = this.getView().byId("input_INS15_OUT_VAL"),
			this.INS15_OUT_ARR = this.getView().byId("input_INS15_OUT_ARR"),
		
			this.INS16_TOT_CLM = this.getView().byId("input_INS16_TOT_CLM"),
			this.INS16_TOT_VAL = this.getView().byId("input_INS16_TOT_VAL"),
			this.INS16_TOT_SET = this.getView().byId("input_INS16_TOT_SET"),
			this.INS16_SET_VAL = this.getView().byId("input_INS16_SET_VAL"),
			this.INS16_TOT_UNS = this.getView().byId("input_INS16_TOT_UNS"),
			this.INS16_OUT_VAL = this.getView().byId("input_INS16_OUT_VAL"),
			this.INS16_OUT_ARR = this.getView().byId("input_INS16_OUT_ARR"),
		
			this.INS17_TOT_CLM = this.getView().byId("input_INS17_TOT_CLM"),
			this.INS17_TOT_VAL = this.getView().byId("input_INS17_TOT_VAL"),
			this.INS17_TOT_SET = this.getView().byId("input_INS17_TOT_SET"),
			this.INS17_SET_VAL = this.getView().byId("input_INS17_SET_VAL"),
			this.INS17_TOT_UNS = this.getView().byId("input_INS17_TOT_UNS"),
			this.INS17_OUT_VAL = this.getView().byId("input_INS17_OUT_VAL"),
			this.INS17_OUT_ARR = this.getView().byId("input_INS17_OUT_ARR"),
		
			this.INS18_TOT_CLM = this.getView().byId("input_INS18_TOT_CLM"),
			this.INS18_TOT_VAL = this.getView().byId("input_INS18_TOT_VAL"),
			this.INS18_TOT_SET = this.getView().byId("input_INS18_TOT_SET"),
			this.INS18_SET_VAL = this.getView().byId("input_INS18_SET_VAL"),
			this.INS18_TOT_UNS = this.getView().byId("input_INS18_TOT_UNS"),
			this.INS18_OUT_VAL = this.getView().byId("input_INS18_OUT_VAL"),
			this.INS18_OUT_ARR = this.getView().byId("input_INS18_OUT_ARR"),
		
			this.INS19_TOT_CLM = this.getView().byId("input_INS19_TOT_CLM"),
			this.INS19_TOT_VAL = this.getView().byId("input_INS19_TOT_VAL"),
			this.INS19_TOT_SET = this.getView().byId("input_INS19_TOT_SET"),
			this.INS19_SET_VAL = this.getView().byId("input_INS19_SET_VAL"),
			this.INS19_TOT_UNS = this.getView().byId("input_INS19_TOT_UNS"),
			this.INS19_OUT_VAL = this.getView().byId("input_INS19_OUT_VAL"),
			this.INS19_OUT_ARR = this.getView().byId("input_INS19_OUT_ARR"),
		
			this.INS20_TOT_CLM = this.getView().byId("input_INS20_TOT_CLM"),
			this.INS20_TOT_VAL = this.getView().byId("input_INS20_TOT_VAL"),
			this.INS20_TOT_SET = this.getView().byId("input_INS20_TOT_SET"),
			this.INS20_SET_VAL = this.getView().byId("input_INS20_SET_VAL"),
			this.INS20_TOT_UNS = this.getView().byId("input_INS20_TOT_UNS"),
			this.INS20_OUT_VAL = this.getView().byId("input_INS20_OUT_VAL"),
			this.INS20_OUT_ARR = this.getView().byId("input_INS20_OUT_ARR"),
			this.TOTAL_TOT_CLM = this.getView().byId("input_TOTAL_TOT_CLM"),
			this.TOTAL_TOT_VAL = this.getView().byId("input_TOTAL_TOT_VAL"),
			this.TOTAL_TOT_SET = this.getView().byId("input_TOTAL_TOT_SET"),
			this.TOTAL_TOT_VAL = this.getView().byId("input_TOTAL_TOT_VAL"),
			this.TOTAL_SET_VAL = this.getView().byId("input_TOTAL_SET_VAL"),
			this.TOTAL_TOT_UNS = this.getView().byId("input_TOTAL_TOT_UNS"),
			this.TOTAL_OUT_VAL = this.getView().byId("input_TOTAL_OUT_VAL"),
			this.TOTAL_OUT_ARR = this.getView().byId("input_TOTAL_OUT_ARR"),*/
			
			//SUMMARY OF REPUDIATIONS THROUGH BROKER
				this.Ins01RepName = this.getView().byId("input_INS01_REP_NAME"),
				this.Ins01NumRep = this.getView().byId("input_INS01_NUM_REP"),
				this.Ins01ValRep = this.getView().byId("input_INS01_VAL_REP"),
				this.Ins01CumRep = this.getView().byId("input_INS01_CUM_REP"),
				this.Ins01CumVal = this.getView().byId("input_INS01_CUM_VAL"),
				this.Ins02RepName = this.getView().byId("input_INS02_REP_NAME"),
				this.Ins02NumRep = this.getView().byId("input_INS02_NUM_REP"),
				this.Ins02ValRep = this.getView().byId("input_INS02_VAL_REP"),
				this.Ins02CumRep = this.getView().byId("input_INS02_CUM_REP"),
				this.Ins02CumVal = this.getView().byId("input_INS02_CUM_VAL"),
				this.Ins03RepName = this.getView().byId("input_INS03_REP_NAME"),
				this.Ins03NumRep = this.getView().byId("input_INS03_NUM_REP"),
				this.Ins03ValRep = this.getView().byId("input_INS03_VAL_REP"),
				this.Ins03CumRep = this.getView().byId("input_INS03_CUM_REP"),
				this.Ins03CumVal = this.getView().byId("input_INS03_CUM_VAL"),
				this.Ins04RepName = this.getView().byId("input_INS04_REP_NAME"),
				this.Ins04NumRep = this.getView().byId("input_INS04_NUM_REP"),
				this.Ins04ValRep = this.getView().byId("input_INS04_VAL_REP"),
				this.Ins04CumRep = this.getView().byId("input_INS04_CUM_REP"),
				this.Ins04CumVal = this.getView().byId("input_INS04_CUM_VAL"),
				this.Ins05RepName = this.getView().byId("input_INS05_REP_NAME"),
				this.Ins05NumRep = this.getView().byId("input_INS05_NUM_REP"),
				this.Ins05ValRep = this.getView().byId("input_INS05_VAL_REP"),
				this.Ins05CumRep = this.getView().byId("input_INS05_CUM_REP"),
				this.Ins05CumVal = this.getView().byId("input_INS05_CUM_VAL"),
				// this.Ins06RepName = this.getView().byId("input_INS06_REP_NAME"),
				// this.Ins06NumRep = this.getView().byId("input_INS06_NUM_REP"),
				// this.Ins06ValRep = this.getView().byId("input_INS06_VAL_REP"),
				// this.Ins06CumRep = this.getView().byId("input_INS06_CUM_REP"),
				// this.Ins06CumVal = this.getView().byId("input_INS06_CUM_VAL"),
				// this.Ins07RepName = this.getView().byId("input_INS07_REP_NAME"),
				// this.Ins07NumRep = this.getView().byId("input_INS07_NUM_REP"),
				// this.Ins07ValRep = this.getView().byId("input_INS07_VAL_REP"),
				// this.Ins07CumRep = this.getView().byId("input_INS07_CUM_REP"),
				// this.Ins07CumVal = this.getView().byId("input_INS07_CUM_VAL"),
				this.Ins08RepName = this.getView().byId("input_INS08_REP_NAME"),
				this.Ins08NumRep = this.getView().byId("input_INS08_NUM_REP"),
				this.Ins08ValRep = this.getView().byId("input_INS08_VAL_REP"),
				this.Ins08CumRep = this.getView().byId("input_INS08_CUM_REP"),
				this.Ins08CumVal = this.getView().byId("input_INS08_CUM_VAL"),
				this.Ins09RepName = this.getView().byId("input_INS09_REP_NAME"),
				this.Ins09NumRep = this.getView().byId("input_INS09_NUM_REP"),
				this.Ins09ValRep = this.getView().byId("input_INS09_VAL_REP"),
				this.Ins09CumRep = this.getView().byId("input_INS09_CUM_REP"),
				this.Ins09CumVal = this.getView().byId("input_INS09_CUM_VAL"),
				this.Ins10RepName = this.getView().byId("input_INS10_REP_NAME"),
				this.Ins10NumRep = this.getView().byId("input_INS10_NUM_REP"),
				this.Ins10ValRep = this.getView().byId("input_INS10_VAL_REP"),
				this.Ins10CumRep = this.getView().byId("input_INS10_CUM_REP"),
				this.Ins10CumVal = this.getView().byId("input_INS10_CUM_VAL"),
				this.Ins11RepName = this.getView().byId("input_INS11_REP_NAME"),
				this.Ins11NumRep = this.getView().byId("input_INS11_NUM_REP"),
				this.Ins11ValRep = this.getView().byId("input_INS11_VAL_REP"),
				this.Ins11CumRep = this.getView().byId("input_INS11_CUM_REP"),
				this.Ins11CumVal = this.getView().byId("input_INS11_CUM_VAL"),
				this.Ins12RepName = this.getView().byId("input_INS12_REP_NAME"),
				this.Ins12NumRep = this.getView().byId("input_INS12_NUM_REP"),
				this.Ins12ValRep = this.getView().byId("input_INS12_VAL_REP"),
				this.Ins12CumRep = this.getView().byId("input_INS12_CUM_REP"),
				this.Ins12CumVal = this.getView().byId("input_INS12_CUM_VAL"),
				this.Ins13RepName = this.getView().byId("input_INS13_REP_NAME"),
				this.Ins13NumRep = this.getView().byId("input_INS13_NUM_REP"),
				this.Ins13ValRep = this.getView().byId("input_INS13_VAL_REP"),
				this.Ins13CumRep = this.getView().byId("input_INS13_CUM_REP"),
				this.Ins13CumVal = this.getView().byId("input_INS13_CUM_VAL"),
				this.Ins14RepName = this.getView().byId("input_INS14_REP_NAME"),
				this.Ins14NumRep = this.getView().byId("input_INS14_NUM_REP"),
				this.Ins14ValRep = this.getView().byId("input_INS14_VAL_REP"),
				this.Ins14CumRep = this.getView().byId("input_INS14_CUM_REP"),
				this.Ins14CumVal = this.getView().byId("input_INS14_CUM_VAL"),
				this.Ins15RepName = this.getView().byId("input_INS15_REP_NAME"),
				this.Ins15NumRep = this.getView().byId("input_INS15_NUM_REP"),
				this.Ins15ValRep = this.getView().byId("input_INS15_VAL_REP"),
				this.Ins15CumRep = this.getView().byId("input_INS15_CUM_REP"),
				this.Ins15CumVal = this.getView().byId("input_INS15_CUM_VAL"),
				this.Ins16RepName = this.getView().byId("input_INS16_REP_NAME"),
				this.Ins16NumRep = this.getView().byId("input_INS16_NUM_REP"),
				this.Ins16ValRep = this.getView().byId("input_INS16_VAL_REP"),
				this.Ins16CumRep = this.getView().byId("input_INS16_CUM_REP"),
				this.Ins16CumVal = this.getView().byId("input_INS16_CUM_VAL"),
				this.Ins17RepName = this.getView().byId("input_INS17_REP_NAME"),
				this.Ins17NumRep = this.getView().byId("input_INS17_NUM_REP"),
				this.Ins17ValRep = this.getView().byId("input_INS17_VAL_REP"),
				this.Ins17CumRep = this.getView().byId("input_INS17_CUM_REP"),
				this.Ins17CumVal = this.getView().byId("input_INS17_CUM_VAL"),
				this.Ins18RepName = this.getView().byId("input_INS18_REP_NAME"),
				this.Ins18NumRep = this.getView().byId("input_INS18_NUM_REP"),
				this.Ins18ValRep = this.getView().byId("input_INS18_VAL_REP"),
				this.Ins18CumRep = this.getView().byId("input_INS18_CUM_REP"),
				this.Ins18CumVal = this.getView().byId("input_INS18_CUM_VAL"),
				// this.Ins19RepName = this.getView().byId("input_INS19_REP_NAME"),
				// this.Ins19NumRep = this.getView().byId("input_INS19_NUM_REP"),
				// this.Ins19ValRep = this.getView().byId("input_INS19_VAL_REP"),
				// this.Ins19CumRep = this.getView().byId("input_INS19_CUM_REP"),
				// this.Ins19CumVal = this.getView().byId("input_INS19_CUM_VAL"),
				// this.Ins20RepName = this.getView().byId("input_INS20_REP_NAME"),
				// this.Ins20NumRep = this.getView().byId("input_INS20_NUM_REP"),
				// this.Ins20ValRep = this.getView().byId("input_INS20_VAL_REP"),
				// this.Ins20CumRep = this.getView().byId("input_INS20_CUM_REP"),
				// this.Ins20CumVal = this.getView().byId("input_INS20_CUM_VAL"),
				
			//INCOME STATEMENT
			this.GrossPremRec = this.getView().byId("input_GROSS_PREM_REC"),
			this.GrossPremPay = this.getView().byId("input_GROSS_PREM_PAY"),
			this.LessBrokerage = this.getView().byId("input_LESS_BROKERAGE"),
			this.OtherIncome = this.getView().byId("input_OTHER_INCOME"),
			this.LessAdminExp = this.getView().byId("input_LESS_ADMIN_EXP"),
			this.Taxation = this.getView().byId("input_TAXATION"),
			
			//STATEMENT OF FINANCIAL POSITION (BALANCE SHEET) Tab 1
			this.Shares = this.getView().byId("input_SHARES"),
			this.AuthShares = this.getView().byId("input_AUTH_SHARES"),
			//no field for issued and paid up capital  calculated value
			this.ShareCapital = this.getView().byId("input_SHARE_CAPITAL"),
			this.SharePremium = this.getView().byId("input_SHARE_PREMIUM"),
			this.NonDistrib = this.getView().byId("input_NON_DISTRIB"),
			
			//STATEMENT OF FINANCIAL POSITION (BALANCE SHEET) Tab 2
			this.OwnwerEquity = this.getView().byId("input_OWNWER_EQUITY"),
			this.NonCurName1 = this.getView().byId("input_NON_CUR_NAME1"),
			this.NonCurName2 = this.getView().byId("input_NON_CUR_NAME2"),
			this.NonCurName3 = this.getView().byId("input_NON_CUR_NAME3"),
			this.NonCurName4 = this.getView().byId("input_NON_CUR_NAME4"),
			this.NonCurName5 = this.getView().byId("input_NON_CUR_NAME5"),
			this.NonCurAmnt1 = this.getView().byId("input_NON_CUR_AMNT1"),
			this.NonCurAmnt2 = this.getView().byId("input_NON_CUR_AMNT2"),
			this.NonCurAmnt3 = this.getView().byId("input_NON_CUR_AMNT3"),
			this.NonCurAmnt4 = this.getView().byId("input_NON_CUR_AMNT4"),
			this.NonCurAmnt5 = this.getView().byId("input_NON_CUR_AMNT5"),
			// NO FIELD FOR current liabilities, calculated value
			this.PayPremium = this.getView().byId("input_PAY_PREMIUM"),
			this.TaxationBs = this.getView().byId("input_TAXATION_BS"),
			
			//STATEMENT OF FINANCIAL POSITION (BALANCE SHEET) Tab 3
			this.LandBuild = this.getView().byId("input_LAND_BUILD"),
			this.FurnishFit = this.getView().byId("input_FURNISH_FIT"),
			this.MotorVehicle = this.getView().byId("input_MOTOR_VEHICLE"),
			this.CompEquip = this.getView().byId("input_COMP_EQUIP"),
			this.CompSoft = this.getView().byId("input_COMP_SOFT"),
			this.Investments = this.getView().byId("input_INVESTMENTS"),
			this.OtherAssets = this.getView().byId("input_OTHER_ASSETS"),
		
			//STATEMENT OF FINANCIAL POSITION (BALANCE SHEET) Tab 4
			this.CommReceive = this.getView().byId("input_COMM_RECEIVE"),
		
				];
		return inputFields;
		// return trial;
		},
		
		// ********************************START Formulars For Income Statement PAGE 5*********************
		
		// Method to calculate Gross Premium Receivable
		// calcGrossPremiumReceivable: function(){
		// 	// Gross Premium Receivable ='Summary of Business within Zim'->With Insurers within Zimbabwe -> Total Premium
		// this.getView().byId("input_GROSS_PREM_REC").setValue(this.getView().byId("input_TOTAL_TOT_POL").getValue());
		// },
		
		// Method to calculate Gross Premium Payable
		calcGrossPremiumPayable: function(){
			// Gross Premium Payable = Gross Premium Receivable - Brokerage Commission
			// var valueGrossPremiumPayable;
			this.getView().byId("input_GROSS_PREM_PAY").setValue(this.getView().byId("input_GROSS_PREM_REC").getValue() - this.getView().byId("input_BROKERAGE_COMM").getValue()); 
		},
		
		// Method to calculate Brokerage Commission
		calcBrokerageCommission: function(){
			// Brokerage Commission ='Summary of Business within Zim'->With Insurers within Zimbabwe -> Total Commission Recieved
			this.getView().byId("input_BROKERAGE_COMM").setValue(this.getView().byId("input_TOTAL_OTH_COS").getValue());
		},
		
		// Method to calculate Net Brokerage Commission
		calcNetBrokerageCommission: function(){
			// Net Brokerage Commission = Brokerage Commission - Commission Paid
			this.getView().byId("input_NETT_BROKERAGE").setValue(this.getView().byId("input_BROKERAGE_COMM").getValue() - this.getView().byId("input_LESS_BROKERAGE").getValue());
		},
		
		// Method to calculate Profit Before Tax
		calcProfitBeforeTax: function(){
			// Profit Before Tax = (Net Brokerage Commission + Other Income) -Administration Expense
			var netBrokerageCommission,otherIncome,netBrokerageCommissionAddOtherIncome,administrationExpense,profitBeforeTax;
			netBrokerageCommission = this.getView().byId("input_NETT_BROKERAGE").getValue();
			otherIncome = this.getView().byId("input_OTHER_INCOME").getValue();
			netBrokerageCommissionAddOtherIncome = Number(netBrokerageCommission)+Number(otherIncome);
			administrationExpense = this.getView().byId("input_LESS_ADMIN_EXP").getValue();
			profitBeforeTax = netBrokerageCommissionAddOtherIncome-administrationExpense;
			this.getView().byId("input_PROFIT_BEFORE").setValue(profitBeforeTax);
		},
		
		// Method to calculate Profit After Tax
		calcProfitAfterTax: function(){
			// Profit After Tax = Profit Before Tax - Taxation
			this.getView().byId("input_PROFIT_AFTER").setValue(this.getView().byId("input_PROFIT_BEFORE").getValue() - this.getView().byId("input_TAXATION").getValue());
		},
		
		// ********************************END Formulars For Income Statement*********************
		// ********************************START SUMMARY BY CLASS OF BUSINESS PLACED BY BROKER WITHIN ZIMBABWE (PERSONAL LINES) PAGE 1*********************
		
		// Method to calculate Total Sum Insured
		calctotalSum: function(){
			var hseowners,hseholders,health,rta,ftp,compr,othr1,totalSum;
			hseowners = this.getView().byId("input_PER_OWNERS_TOT_INS").getValue();
			hseholders = this.getView().byId("input_PER_HOLDER_TOT_INS").getValue();
			health = this.getView().byId("input_PER_HEALTH_TOT_INS").getValue();
			rta = this.getView().byId("input_PER_RTA_TOT_INS").getValue();
			ftp = this.getView().byId("input_PER_FTP_TOT_INS").getValue();
			compr = this.getView().byId("input_PER_COMPRE_TOT_INS").getValue();
			othr1 = this.getView().byId("input_PER_OTHER_TOT_INS").getValue();
			totalSum = Number(hseowners)+Number(hseholders)+Number(health)+Number(rta)+Number(ftp)+Number(compr)+Number(othr1);
			this.getView().byId("input_PER_SUBTOT_TOT_INS").setValue(totalSum);
		},
		
		// Method to calculate Total Premium
		calcBWZPTotalPremium: function(){
			var hseowners,hseholders,health,rta,ftp,compr,othr1,totalSum;
			hseowners = this.getView().byId("input_PER_OWNERS_TOT_PRE").getValue();
			hseholders = this.getView().byId("input_PER_HOLDER_TOT_PRE").getValue();
			health = this.getView().byId("input_PER_HEALTH_TOT_PRE").getValue();
			rta = this.getView().byId("input_PER_RTA_TOT_PRE").getValue();
			ftp = this.getView().byId("input_PER_FTP_TOT_PRE").getValue();
			compr = this.getView().byId("input_PER_COMPRE_TOT_PRE").getValue();
			othr1 = this.getView().byId("input_PER_OTHER_TOT_PRE").getValue();
			totalSum = Number(hseowners)+Number(hseholders)+Number(health)+Number(rta)+Number(ftp)+Number(compr)+Number(othr1);
			this.getView().byId("input_PER_SUBTOT_TOT_PRE").setValue(totalSum);
		},
		
		// Method to calculate Total Number Of Policies
		calcBWZPTotalNumberOfPolicies: function(){
			var hseowners,hseholders,health,rta,ftp,compr,othr1,totalSum;
			hseowners = this.getView().byId("input_PER_OWNERS_TOT_POL").getValue();
			hseholders = this.getView().byId("input_PER_HOLDER_TOT_POL").getValue();
			health = this.getView().byId("input_PER_HEALTH_TOT_POL").getValue();
			rta = this.getView().byId("input_PER_RTA_TOT_POL").getValue();
			ftp = this.getView().byId("input_PER_FTP_TOT_POL").getValue();
			compr = this.getView().byId("input_PER_COMPRE_TOT_POL").getValue();
			othr1 = this.getView().byId("input_PER_OTHER_TOT_POL").getValue();
			totalSum = Number(hseowners)+Number(hseholders)+Number(health)+Number(rta)+Number(ftp)+Number(compr)+Number(othr1);
			this.getView().byId("input_PER_SUBTOT_TOT_POL").setValue(totalSum);
		},
		
		// Method to calculate Total Commission Received
		calcBWZPTotalCommissionReceived: function(){
			var hseowners,hseholders,health,rta,ftp,compr,othr1,totalSum;
			hseowners = this.getView().byId("input_PER_OWNERS_COM_REC").getValue();
			hseholders = this.getView().byId("input_PER_HOLDER_COM_REC").getValue();
			health = this.getView().byId("input_PER_HEALTH_COM_REC").getValue();
			rta = this.getView().byId("input_PER_RTA_COM_REC").getValue();
			ftp = this.getView().byId("input_PER_FTP_COM_REC").getValue();
			compr = this.getView().byId("input_PER_COMPRE_COM_REC").getValue();
			othr1 = this.getView().byId("input_PER_OTHER_COM_REC").getValue();
			totalSum = Number(hseowners)+Number(hseholders)+Number(health)+Number(rta)+Number(ftp)+Number(compr)+Number(othr1);
			this.getView().byId("input_PER_SUBTOT_COM_REC").setValue(totalSum);
		},
		
		// Method to calculate Total Received Acquisition Cost
		calcBWZPTotalReceivedAcquisitionCost: function(){
			var hseowners,hseholders,health,rta,ftp,compr,othr1,totalSum;
			hseowners = this.getView().byId("input_PER_OWNERS_OTH_COS").getValue();
			hseholders = this.getView().byId("input_PER_HOLDER_OTH_COS").getValue();
			health = this.getView().byId("input_PER_HEALTH_OTH_COS").getValue();
			rta = this.getView().byId("input_PER_RTA_OTH_COS").getValue();
			ftp = this.getView().byId("input_PER_FTP_OTH_COS").getValue();
			compr = this.getView().byId("input_PER_COMPRE_OTH_COS").getValue();
			othr1 = this.getView().byId("input_PER_OTHER_OTH_COS").getValue();
			totalSum = Number(hseowners)+Number(hseholders)+Number(health)+Number(rta)+Number(ftp)+Number(compr)+Number(othr1);
			this.getView().byId("input_PER_SUBTOT_OTH_COS").setValue(totalSum);
		},
		
		// ********************************END SUMMARY BY CLASS OF BUSINESS PLACED BY BROKER WITHIN ZIMBABWE (PERSONAL LINES) PAGE 1*********************
		// ********************************START SUMMARY BY CLASS OF BUSINESS PLACED BY BROKER WITHIN ZIMBABWE (COMMERCIAL LINES) PAGE 1*********************
		
		// Method to calculate Total Sum Insured
		calctotalSum2: function(){
			var fire,engine,rta,ftp,compre,marine,aviati,p_acci,m_acci,bonds,farm,hail,health,other,totalSum2;
			fire = this.getView().byId("input_COM_FIRE_TOT_INS").getValue();
			engine = this.getView().byId("input_COM_ENGINE_TOT_INS").getValue();
			rta = this.getView().byId("input_COM_RTA_TOT_INS").getValue();
			ftp = this.getView().byId("input_COM_FTP_TOT_INS").getValue();
			compre = this.getView().byId("input_COM_COMPRE_TOT_INS").getValue();
			marine = this.getView().byId("input_COM_MARINE_TOT_INS").getValue();
			aviati = this.getView().byId("input_COM_AVIATI_TOT_INS").getValue();
			p_acci = this.getView().byId("input_COM_P_ACCI_TOT_INS").getValue();
			m_acci = this.getView().byId("input_COM_M_ACCI_TOT_INS").getValue();
			bonds = this.getView().byId("input_COM_BONDS_TOT_INS").getValue();
			farm = this.getView().byId("input_COM_FARM_TOT_INS").getValue();
			hail = this.getView().byId("input_COM_HAIL_TOT_INS").getValue();
			health = this.getView().byId("input_COM_HEALTH_TOT_INS").getValue();
			other = this.getView().byId("input_COM_OTHER_TOT_INS").getValue();
			totalSum2 = Number(fire)+Number(engine)+Number(rta)+Number(ftp)+Number(compre)+Number(marine)
			+Number(aviati)+Number(p_acci)+Number(m_acci)+Number(bonds)+Number(farm)+Number(hail)+Number(health)+Number(other);
			this.getView().byId("input_COM_SUBTOT_TOT_INS").setValue(totalSum2);
			this.getView().byId("input_AGGREGATE_TOT_INS").setValue(totalSum2+Number(this.getView().byId("input_PER_SUBTOT_TOT_INS").getValue()));
		},
		
		// Method to calculate Total Premium
		calcBWZPTotalPremium2: function(){
			var fire,engine,rta,ftp,compre,marine,aviati,p_acci,m_acci,bonds,farm,hail,health,other,totalSum2;
			fire = this.getView().byId("input_COM_FIRE_TOT_PRE").getValue();
			engine = this.getView().byId("input_COM_ENGINE_TOT_PRE").getValue();
			rta = this.getView().byId("input_COM_RTA_TOT_PRE").getValue();
			ftp = this.getView().byId("input_COM_FTP_TOT_PRE").getValue();
			compre = this.getView().byId("input_COM_COMPRE_TOT_PRE").getValue();
			marine = this.getView().byId("input_COM_MARINE_TOT_PRE").getValue();
			aviati = this.getView().byId("input_COM_AVIATI_TOT_PRE").getValue();
			p_acci = this.getView().byId("input_COM_P_ACCI_TOT_PRE").getValue();
			m_acci = this.getView().byId("input_COM_M_ACCI_TOT_PRE").getValue();
			bonds = this.getView().byId("input_COM_BONDS_TOT_PRE").getValue();
			farm = this.getView().byId("input_COM_FARM_TOT_PRE").getValue();
			hail = this.getView().byId("input_COM_HAIL_TOT_PRE").getValue();
			health = this.getView().byId("input_COM_HEALTH_TOT_PRE").getValue();
			other = this.getView().byId("input_COM_OTHER_TOT_PRE").getValue();
			totalSum2 = Number(fire)+Number(engine)+Number(rta)+Number(ftp)+Number(compre)+Number(marine)
			+Number(aviati)+Number(p_acci)+Number(m_acci)+Number(bonds)+Number(farm)+Number(hail)+Number(health)+Number(other);
			this.getView().byId("input_COM_SUBTOT_TOT_PRE").setValue(totalSum2);
			this.getView().byId("input_AGGREGATE_TOT_PRE").setValue(totalSum2+Number(this.getView().byId("input_PER_SUBTOT_TOT_PRE").getValue()));
		},
		
		// Method to calculate Total Number Of Policies
		calcBWZPTotalNumberOfPolicies2: function(){
			var fire,engine,rta,ftp,compre,marine,aviati,p_acci,m_acci,bonds,farm,hail,health,other,totalSum2;
			fire = this.getView().byId("input_COM_FIRE_TOT_POL").getValue();
			engine = this.getView().byId("input_COM_ENGINE_TOT_POL").getValue();
			rta = this.getView().byId("input_COM_RTA_TOT_POL").getValue();
			ftp = this.getView().byId("input_COM_FTP_TOT_POL").getValue();
			compre = this.getView().byId("input_COM_COMPRE_TOT_POL").getValue();
			marine = this.getView().byId("input_COM_MARINE_TOT_POL").getValue();
			aviati = this.getView().byId("input_COM_AVIATI_TOT_POL").getValue();
			p_acci = this.getView().byId("input_COM_P_ACCI_TOT_POL").getValue();
			m_acci = this.getView().byId("input_COM_M_ACCI_TOT_POL").getValue();
			bonds = this.getView().byId("input_COM_BONDS_TOT_POL").getValue();
			farm = this.getView().byId("input_COM_FARM_TOT_POL").getValue();
			hail = this.getView().byId("input_COM_HAIL_TOT_POL").getValue();
			health = this.getView().byId("input_COM_HEALTH_TOT_POL").getValue();
			other = this.getView().byId("input_COM_OTHER_TOT_POL").getValue();
			totalSum2 = Number(fire)+Number(engine)+Number(rta)+Number(ftp)+Number(compre)+Number(marine)
			+Number(aviati)+Number(p_acci)+Number(m_acci)+Number(bonds)+Number(farm)+Number(hail)+Number(health)+Number(other);
			this.getView().byId("input_COM_SUBTOT_TOT_POL").setValue(totalSum2);
			this.getView().byId("input_AGGREGATE_TOT_POL").setValue(totalSum2+Number(this.getView().byId("input_PER_SUBTOT_TOT_POL").getValue()));
		},
		
		// Method to calculate Total Commission Received
		calcBWZPTotalCommissionReceived2: function(){
			var fire,engine,rta,ftp,compre,marine,aviati,p_acci,m_acci,bonds,farm,hail,health,other,totalSum2;
			fire = this.getView().byId("input_COM_FIRE_COM_REC").getValue();
			engine = this.getView().byId("input_COM_ENGINE_COM_REC").getValue();
			rta = this.getView().byId("input_COM_RTA_COM_REC").getValue();
			ftp = this.getView().byId("input_COM_FTP_COM_REC").getValue();
			compre = this.getView().byId("input_COM_COMPRE_COM_REC").getValue();
			marine = this.getView().byId("input_COM_MARINE_COM_REC").getValue();
			aviati = this.getView().byId("input_COM_AVIATI_COM_REC").getValue();
			p_acci = this.getView().byId("input_COM_P_ACCI_COM_REC").getValue();
			m_acci = this.getView().byId("input_COM_M_ACCI_COM_REC").getValue();
			bonds = this.getView().byId("input_COM_BONDS_COM_REC").getValue();
			farm = this.getView().byId("input_COM_FARM_COM_REC").getValue();
			hail = this.getView().byId("input_COM_HAIL_COM_REC").getValue();
			health = this.getView().byId("input_COM_HEALTH_COM_REC").getValue();
			other = this.getView().byId("input_COM_OTHER_COM_REC").getValue();
			totalSum2 = Number(fire)+Number(engine)+Number(rta)+Number(ftp)+Number(compre)+Number(marine)
			+Number(aviati)+Number(p_acci)+Number(m_acci)+Number(bonds)+Number(farm)+Number(hail)+Number(health)+Number(other);
			this.getView().byId("input_COM_SUBTOT_COM_REC").setValue(totalSum2);
			this.getView().byId("input_AGGREGATE_COM_REC").setValue(totalSum2+Number(this.getView().byId("input_PER_SUBTOT_COM_REC").getValue()));
		},
		
		// Method to calculate Total Received Acquisition Cost
		calcBWZPTotalReceivedAcquisitionCost2: function(){
			var fire,engine,rta,ftp,compre,marine,aviati,p_acci,m_acci,bonds,farm,hail,health,other,totalSum2;
			fire = this.getView().byId("input_COM_FIRE_OTH_COS").getValue();
			engine = this.getView().byId("input_COM_ENGINE_OTH_COS").getValue();
			rta = this.getView().byId("input_COM_RTA_OTH_COS").getValue();
			ftp = this.getView().byId("input_COM_FTP_OTH_COS").getValue();
			compre = this.getView().byId("input_COM_COMPRE_OTH_COS").getValue();
			marine = this.getView().byId("input_COM_MARINE_OTH_COS").getValue();
			aviati = this.getView().byId("input_COM_AVIATI_OTH_COS").getValue();
			p_acci = this.getView().byId("input_COM_P_ACCI_OTH_COS").getValue();
			m_acci = this.getView().byId("input_COM_M_ACCI_OTH_COS").getValue();
			bonds = this.getView().byId("input_COM_BONDS_OTH_COS").getValue();
			farm = this.getView().byId("input_COM_FARM_OTH_COS").getValue();
			hail = this.getView().byId("input_COM_HAIL_OTH_COS").getValue();
			health = this.getView().byId("input_COM_HEALTH_OTH_COS").getValue();
			other = this.getView().byId("input_COM_OTHER_OTH_COS").getValue();
			totalSum2 = Number(fire)+Number(engine)+Number(rta)+Number(ftp)+Number(compre)+Number(marine)
			+Number(aviati)+Number(p_acci)+Number(m_acci)+Number(bonds)+Number(farm)+Number(hail)+Number(health)+Number(other);
			this.getView().byId("input_COM_SUBTOT_OTH_COS").setValue(totalSum2);
			this.getView().byId("input_AGGREGATE_OTH_COS").setValue(totalSum2+Number(this.getView().byId("input_PER_SUBTOT_OTH_COS").getValue()));
		},
		
		// ********************************END SUMMARY BY CLASS OF BUSINESS PLACED BY BROKER WITHIN ZIMBABWE (COMMERCIAL LINES) PAGE 1*********************
		// ********************************START SUMMARY OF BUSINESS PLACED WITH INSURERS WITHIN ZIMBABWE (COMMERCIAL LINES) PAGE 1*********************
		
		// Method to calculate Total Premium
		calcBWZPTotalPremium3: function(){
			var ins01,ins02,ins03,ins04,ins05,ins06,ins07,ins08,ins09,ins10,ins11,ins12,ins13,ins14,ins15,totalSum;
			ins01 = this.getView().byId("input_INS01_TOT_PRE").getValue();
			ins02 = this.getView().byId("input_INS02_TOT_PRE").getValue();
			ins03 = this.getView().byId("input_INS03_TOT_PRE").getValue();
			ins04 = this.getView().byId("input_INS04_TOT_PRE").getValue();
			ins05 = this.getView().byId("input_INS05_TOT_PRE").getValue();
			ins06 = this.getView().byId("input_INS06_TOT_PRE").getValue();
			ins07 = this.getView().byId("input_INS07_TOT_PRE").getValue();
			ins08 = this.getView().byId("input_INS08_TOT_PRE").getValue();
			ins09 = this.getView().byId("input_INS09_TOT_PRE").getValue();
			ins10 = this.getView().byId("input_INS10_TOT_PRE").getValue();
			ins11 = this.getView().byId("input_INS11_TOT_PRE").getValue();
			ins12 = this.getView().byId("input_INS12_TOT_PRE").getValue();
			ins13 = this.getView().byId("input_INS13_TOT_PRE").getValue();
			ins14 = this.getView().byId("input_INS14_TOT_PRE").getValue();
			ins15 = this.getView().byId("input_INS15_TOT_PRE").getValue();
			totalSum = Number(ins01)+Number(ins02)+Number(ins03)+Number(ins04)+Number(ins05)+Number(ins06)+Number(ins07)
			+Number(ins08)+Number(ins09)+Number(ins10)+Number(ins11)+Number(ins12)+Number(ins13)+Number(ins14)+Number(ins15);
			this.getView().byId("input_TOTAL_TOT_PRE").setValue(totalSum);
		},
		
		// Method to calculate Total Number Of Policies
		calcBWZPTotalNumberOfPolicies3: function(){
			var ins01,ins02,ins03,ins04,ins05,ins06,ins07,ins08,ins09,ins10,ins11,ins12,ins13,ins14,ins15,totalSum;
			ins01 = this.getView().byId("input_INS01_TOT_POL").getValue();
			ins02 = this.getView().byId("input_INS02_TOT_POL").getValue();
			ins03 = this.getView().byId("input_INS03_TOT_POL").getValue();
			ins04 = this.getView().byId("input_INS04_TOT_POL").getValue();
			ins05 = this.getView().byId("input_INS05_TOT_POL").getValue();
			ins06 = this.getView().byId("input_INS06_TOT_POL").getValue();
			ins07 = this.getView().byId("input_INS07_TOT_POL").getValue();
			ins08 = this.getView().byId("input_INS08_TOT_POL").getValue();
			ins09 = this.getView().byId("input_INS09_TOT_POL").getValue();
			ins10 = this.getView().byId("input_INS10_TOT_POL").getValue();
			ins11 = this.getView().byId("input_INS11_TOT_POL").getValue();
			ins12 = this.getView().byId("input_INS12_TOT_POL").getValue();
			ins13 = this.getView().byId("input_INS13_TOT_POL").getValue();
			ins14 = this.getView().byId("input_INS14_TOT_POL").getValue();
			ins15 = this.getView().byId("input_INS15_TOT_POL").getValue();
			totalSum = Number(ins01)+Number(ins02)+Number(ins03)+Number(ins04)+Number(ins05)+Number(ins06)+Number(ins07)
			+Number(ins08)+Number(ins09)+Number(ins10)+Number(ins11)+Number(ins12)+Number(ins13)+Number(ins14)+Number(ins15);
			this.getView().byId("input_TOTAL_COM_POL").setValue(totalSum);
		},
		
		// Method to calculate Total Commission Received
		calcBWZPTotalCommissionReceived3: function(){
			var ins01,ins02,ins03,ins04,ins05,ins06,ins07,ins08,ins09,ins10,ins11,ins12,ins13,ins14,ins15,totalSum;
			ins01 = this.getView().byId("input_INS01_TOT_COM_REC").getValue();
			ins02 = this.getView().byId("input_INS02_TOT_COM_REC").getValue();
			ins03 = this.getView().byId("input_INS03_TOT_COM_REC").getValue();
			ins04 = this.getView().byId("input_INS04_TOT_COM_REC").getValue();
			ins05 = this.getView().byId("input_INS05_TOT_COM_REC").getValue();
			ins06 = this.getView().byId("input_INS06_TOT_COM_REC").getValue();
			ins07 = this.getView().byId("input_INS07_TOT_COM_REC").getValue();
			ins08 = this.getView().byId("input_INS08_TOT_COM_REC").getValue();
			ins09 = this.getView().byId("input_INS09_TOT_COM_REC").getValue();
			ins10 = this.getView().byId("input_INS10_TOT_COM_REC").getValue();
			ins11 = this.getView().byId("input_INS11_TOT_COM_REC").getValue();
			ins12 = this.getView().byId("input_INS12_TOT_COM_REC").getValue();
			ins13 = this.getView().byId("input_INS13_TOT_COM_REC").getValue();
			ins14 = this.getView().byId("input_INS14_TOT_COM_REC").getValue();
			ins15 = this.getView().byId("input_INS15_TOT_COM_REC").getValue();
			totalSum = Number(ins01)+Number(ins02)+Number(ins03)+Number(ins04)+Number(ins05)+Number(ins06)+Number(ins07)
			+Number(ins08)+Number(ins09)+Number(ins10)+Number(ins11)+Number(ins12)+Number(ins13)+Number(ins14)+Number(ins15);
			this.getView().byId("input_TOTAL_COM_REC").setValue(totalSum);
		},
		
		// Method to calculate Total Received Acquisition Cost
		calcBWZPTotalReceivedAcquisitionCost3  : function(){
			var ins01,ins02,ins03,ins04,ins05,ins06,ins07,ins08,ins09,ins10,ins11,ins12,ins13,ins14,ins15,totalSum;
			ins01 = this.getView().byId("input_INS01_TOT_OTH_COS").getValue();
			ins02 = this.getView().byId("input_INS02_TOT_OTH_COS").getValue();
			ins03 = this.getView().byId("input_INS03_TOT_OTH_COS").getValue();
			ins04 = this.getView().byId("input_INS04_TOT_OTH_COS").getValue();
			ins05 = this.getView().byId("input_INS05_TOT_OTH_COS").getValue();
			ins06 = this.getView().byId("input_INS06_TOT_OTH_COS").getValue();
			ins07 = this.getView().byId("input_INS07_TOT_OTH_COS").getValue();
			ins08 = this.getView().byId("input_INS08_TOT_OTH_COS").getValue();
			ins09 = this.getView().byId("input_INS09_TOT_OTH_COS").getValue();
			ins10 = this.getView().byId("input_INS10_TOT_OTH_COS").getValue();
			ins11 = this.getView().byId("input_INS11_TOT_OTH_COS").getValue();
			ins12 = this.getView().byId("input_INS12_TOT_OTH_COS").getValue();
			ins13 = this.getView().byId("input_INS13_TOT_OTH_COS").getValue();
			ins14 = this.getView().byId("input_INS14_TOT_OTH_COS").getValue();
			ins15 = this.getView().byId("input_INS15_TOT_OTH_COS").getValue();
			totalSum = Number(ins01)+Number(ins02)+Number(ins03)+Number(ins04)+Number(ins05)+Number(ins06)+Number(ins07)
			+Number(ins08)+Number(ins09)+Number(ins10)+Number(ins11)+Number(ins12)+Number(ins13)+Number(ins14)+Number(ins15);
			this.getView().byId("input_TOTAL_OTH_COS").setValue(totalSum);
		},
		
			// ********************************END SUMMARY OF BUSINESS PLACED WITH INSURERS WITHIN ZIMBABWE (COMMERCIAL LINES) PAGE 1*********************
		// ********************************START SUMMARY OF CLAIMS THROUGH BROKER PAGE 4*********************
		
		// Method to calculate Total Number Of Claims
		calcTotalNumberOfClaims: function(){
			var ins01,ins02,ins03,ins04,ins05,ins06,ins07,ins08,ins09,ins10,ins11,ins12,ins13,ins14,ins15,totalSum;
			ins01 = this.getView().byId("input_INS08_TOT_CLM").getValue();
			ins02 = this.getView().byId("input_INS09_TOT_CLM").getValue();
			ins03 = this.getView().byId("input_INS10_TOT_CLM").getValue();
			ins04 = this.getView().byId("input_INS11_TOT_CLM").getValue();
			ins05 = this.getView().byId("input_INS12_TOT_CLM").getValue();
			ins06 = this.getView().byId("input_INS13_TOT_CLM").getValue();
			ins07 = this.getView().byId("input_INS14_TOT_CLM").getValue();
			ins08 = this.getView().byId("input_INS15_TOT_CLM").getValue();
			ins09 = this.getView().byId("input_INS16_TOT_CLM").getValue();
			ins10 = this.getView().byId("input_INS17_TOT_CLM").getValue();
			ins11 = this.getView().byId("input_INS18_TOT_CLM").getValue();
			ins12 = this.getView().byId("input_INS19_TOT_CLM").getValue();
			ins13 = this.getView().byId("input_INS20_TOT_CLM").getValue();
			// ins14 = this.getView().byId("input_INS20_TOT_CLM").getValue();
			// ins15 = this.getView().byId("input_INS20_TOT_CLM").getValue();
			totalSum = Number(ins01)+Number(ins02)+Number(ins03)+Number(ins04)+Number(ins05)+Number(ins06)+Number(ins07)
			+Number(ins08)+Number(ins09)+Number(ins10)+Number(ins11)+Number(ins12)+Number(ins13);
			this.getView().byId("input_TOTAL_TOT_CLM").setValue(totalSum);
		},
		
		// Method to calculate Total Value Of Claims
		calcTotalValueOfClaims: function(){
			var ins01,ins02,ins03,ins04,ins05,ins06,ins07,ins08,ins09,ins10,ins11,ins12,ins13,ins14,ins15,totalSum;
			ins01 = this.getView().byId("input_INS08_TOT_VAL").getValue();
			ins02 = this.getView().byId("input_INS09_TOT_VAL").getValue();
			ins03 = this.getView().byId("input_INS10_TOT_VAL").getValue();
			ins04 = this.getView().byId("input_INS11_TOT_VAL").getValue();
			ins05 = this.getView().byId("input_INS12_TOT_VAL").getValue();
			ins06 = this.getView().byId("input_INS13_TOT_VAL").getValue();
			ins07 = this.getView().byId("input_INS14_TOT_VAL").getValue();
			ins08 = this.getView().byId("input_INS15_TOT_VAL").getValue();
			ins09 = this.getView().byId("input_INS16_TOT_VAL").getValue();
			ins10 = this.getView().byId("input_INS17_TOT_VAL").getValue();
			ins11 = this.getView().byId("input_INS18_TOT_VAL").getValue();
			ins12 = this.getView().byId("input_INS19_TOT_VAL").getValue();
			ins13 = this.getView().byId("input_INS20_TOT_VAL").getValue();
			// ins14 = this.getView().byId("input_INS20_TOT_CLM").getValue();
			// ins15 = this.getView().byId("input_INS20_TOT_CLM").getValue();
			totalSum = Number(ins01)+Number(ins02)+Number(ins03)+Number(ins04)+Number(ins05)+Number(ins06)+Number(ins07)
			+Number(ins08)+Number(ins09)+Number(ins10)+Number(ins11)+Number(ins12)+Number(ins13);
			this.getView().byId("input_TOTAL_TOT_VAL").setValue(totalSum);
		},
		
		// Method to calculate Total Number Of Settled Claims
		calcTotalNumberOfSettledClaims: function(){
			var ins01,ins02,ins03,ins04,ins05,ins06,ins07,ins08,ins09,ins10,ins11,ins12,ins13,ins14,ins15,totalSum;
			ins01 = this.getView().byId("input_INS08_TOT_SET").getValue();
			ins02 = this.getView().byId("input_INS09_TOT_SET").getValue();
			ins03 = this.getView().byId("input_INS10_TOT_SET").getValue();
			ins04 = this.getView().byId("input_INS11_TOT_SET").getValue();
			ins05 = this.getView().byId("input_INS12_TOT_SET").getValue();
			ins06 = this.getView().byId("input_INS13_TOT_SET").getValue();
			ins07 = this.getView().byId("input_INS14_TOT_SET").getValue();
			ins08 = this.getView().byId("input_INS15_TOT_SET").getValue();
			ins09 = this.getView().byId("input_INS16_TOT_SET").getValue();
			ins10 = this.getView().byId("input_INS17_TOT_SET").getValue();
			ins11 = this.getView().byId("input_INS18_TOT_SET").getValue();
			ins12 = this.getView().byId("input_INS19_TOT_SET").getValue();
			ins13 = this.getView().byId("input_INS20_TOT_SET").getValue();
			// ins14 = this.getView().byId("input_INS20_TOT_CLM").getValue();
			// ins15 = this.getView().byId("input_INS20_TOT_CLM").getValue();
			totalSum = Number(ins01)+Number(ins02)+Number(ins03)+Number(ins04)+Number(ins05)+Number(ins06)+Number(ins07)
			+Number(ins08)+Number(ins09)+Number(ins10)+Number(ins11)+Number(ins12)+Number(ins13);
			this.getView().byId("input_TOTAL_TOT_SET").setValue(totalSum);
		},
		
		// Method to calculate Value Of Settled Claims (current month)
		calcValueOfSettledClaims: function(){
			var ins01,ins02,ins03,ins04,ins05,ins06,ins07,ins08,ins09,ins10,ins11,ins12,ins13,ins14,ins15,totalSum;
			ins01 = this.getView().byId("input_INS08_SET_VAL").getValue();
			ins02 = this.getView().byId("input_INS09_SET_VAL").getValue();
			ins03 = this.getView().byId("input_INS10_SET_VAL").getValue();
			ins04 = this.getView().byId("input_INS11_SET_VAL").getValue();
			ins05 = this.getView().byId("input_INS12_SET_VAL").getValue();
			ins06 = this.getView().byId("input_INS13_SET_VAL").getValue();
			ins07 = this.getView().byId("input_INS14_SET_VAL").getValue();
			ins08 = this.getView().byId("input_INS15_SET_VAL").getValue();
			ins09 = this.getView().byId("input_INS16_SET_VAL").getValue();
			ins10 = this.getView().byId("input_INS17_SET_VAL").getValue();
			ins11 = this.getView().byId("input_INS18_SET_VAL").getValue();
			ins12 = this.getView().byId("input_INS19_SET_VAL").getValue();
			ins13 = this.getView().byId("input_INS20_SET_VAL").getValue();
			// ins14 = this.getView().byId("input_INS20_TOT_CLM").getValue();
			// ins15 = this.getView().byId("input_INS20_TOT_CLM").getValue();
			totalSum = Number(ins01)+Number(ins02)+Number(ins03)+Number(ins04)+Number(ins05)+Number(ins06)+Number(ins07)
			+Number(ins08)+Number(ins09)+Number(ins10)+Number(ins11)+Number(ins12)+Number(ins13);
			this.getView().byId("input_TOTAL_SET_VAL").setValue(totalSum);
		},
		
		// Method to calculate Number Of Unsettled Claims (cummulative figure)
		calcNumberOfUnSettledClaims: function(){
			var ins01,ins02,ins03,ins04,ins05,ins06,ins07,ins08,ins09,ins10,ins11,ins12,ins13,ins14,ins15,totalSum;
			ins01 = this.getView().byId("input_INS08_TOT_UNS").getValue();
			ins02 = this.getView().byId("input_INS09_TOT_UNS").getValue();
			ins03 = this.getView().byId("input_INS10_TOT_UNS").getValue();
			ins04 = this.getView().byId("input_INS11_TOT_UNS").getValue();
			ins05 = this.getView().byId("input_INS12_TOT_UNS").getValue();
			ins06 = this.getView().byId("input_INS13_TOT_UNS").getValue();
			ins07 = this.getView().byId("input_INS14_TOT_UNS").getValue();
			ins08 = this.getView().byId("input_INS15_TOT_UNS").getValue();
			ins09 = this.getView().byId("input_INS16_TOT_UNS").getValue();
			ins10 = this.getView().byId("input_INS17_TOT_UNS").getValue();
			ins11 = this.getView().byId("input_INS18_TOT_UNS").getValue();
			ins12 = this.getView().byId("input_INS19_TOT_UNS").getValue();
			ins13 = this.getView().byId("input_INS20_TOT_UNS").getValue();
			// ins14 = this.getView().byId("input_INS20_TOT_CLM").getValue();
			// ins15 = this.getView().byId("input_INS20_TOT_CLM").getValue();
			totalSum = Number(ins01)+Number(ins02)+Number(ins03)+Number(ins04)+Number(ins05)+Number(ins06)+Number(ins07)
			+Number(ins08)+Number(ins09)+Number(ins10)+Number(ins11)+Number(ins12)+Number(ins13);
			this.getView().byId("input_TOTAL_TOT_UNS").setValue(totalSum);
		},
		
		// Method to calculate Value Of Outstanding Claims (cummulative)
		calcValueOfOutstandingClaims: function(){
			var ins01,ins02,ins03,ins04,ins05,ins06,ins07,ins08,ins09,ins10,ins11,ins12,ins13,ins14,ins15,totalSum;
			ins01 = this.getView().byId("input_INS08_OUT_VAL").getValue();
			ins02 = this.getView().byId("input_INS09_OUT_VAL").getValue();
			ins03 = this.getView().byId("input_INS10_OUT_VAL").getValue();
			ins04 = this.getView().byId("input_INS11_OUT_VAL").getValue();
			ins05 = this.getView().byId("input_INS12_OUT_VAL").getValue();
			ins06 = this.getView().byId("input_INS13_OUT_VAL").getValue();
			ins07 = this.getView().byId("input_INS14_OUT_VAL").getValue();
			ins08 = this.getView().byId("input_INS15_OUT_VAL").getValue();
			ins09 = this.getView().byId("input_INS16_OUT_VAL").getValue();
			ins10 = this.getView().byId("input_INS17_OUT_VAL").getValue();
			ins11 = this.getView().byId("input_INS18_OUT_VAL").getValue();
			ins12 = this.getView().byId("input_INS19_OUT_VAL").getValue();
			ins13 = this.getView().byId("input_INS20_OUT_VAL").getValue();
			// ins14 = this.getView().byId("input_INS20_TOT_CLM").getValue();
			// ins15 = this.getView().byId("input_INS20_TOT_CLM").getValue();
			totalSum = Number(ins01)+Number(ins02)+Number(ins03)+Number(ins04)+Number(ins05)+Number(ins06)+Number(ins07)
			+Number(ins08)+Number(ins09)+Number(ins10)+Number(ins11)+Number(ins12)+Number(ins13);
			this.getView().byId("input_TOTAL_OUT_VAL").setValue(totalSum);
		},
		
		// Method to calculate Value Of Outstanding Claims In Arrears Of 60 Days
		calcValueOfOutstandingClaimsInArrears: function(){
			var ins01,ins02,ins03,ins04,ins05,ins06,ins07,ins08,ins09,ins10,ins11,ins12,ins13,ins14,ins15,totalSum;
			ins01 = this.getView().byId("input_INS08_OUT_ARR").getValue();
			ins02 = this.getView().byId("input_INS09_OUT_ARR").getValue();
			ins03 = this.getView().byId("input_INS10_OUT_ARR").getValue();
			ins04 = this.getView().byId("input_INS11_OUT_ARR").getValue();
			ins05 = this.getView().byId("input_INS12_OUT_ARR").getValue();
			ins06 = this.getView().byId("input_INS13_OUT_ARR").getValue();
			ins07 = this.getView().byId("input_INS14_OUT_ARR").getValue();
			ins08 = this.getView().byId("input_INS15_OUT_ARR").getValue();
			ins09 = this.getView().byId("input_INS16_OUT_ARR").getValue();
			ins10 = this.getView().byId("input_INS17_OUT_ARR").getValue();
			ins11 = this.getView().byId("input_INS18_OUT_ARR").getValue();
			ins12 = this.getView().byId("input_INS19_OUT_ARR").getValue();
			ins13 = this.getView().byId("input_INS20_OUT_ARR").getValue();
			// ins14 = this.getView().byId("input_INS20_TOT_CLM").getValue();
			// ins15 = this.getView().byId("input_INS20_TOT_CLM").getValue();
			totalSum = Number(ins01)+Number(ins02)+Number(ins03)+Number(ins04)+Number(ins05)+Number(ins06)+Number(ins07)
			+Number(ins08)+Number(ins09)+Number(ins10)+Number(ins11)+Number(ins12)+Number(ins13);
			this.getView().byId("input_TOTAL_OUT_ARR").setValue(totalSum);
		},
		
		// ********************************END SUMMARY OF CLAIMS THROUGH BROKER PAGE 4*********************
		// ********************************START SUMMARY OF REPUDIATIONS THROUGH BROKER 4*********************
		
		// Method to calculate Number Of Repudations
		calcNumberOfRepudations: function(){
			var ins01,ins02,ins03,ins04,ins05,ins06,ins07,ins08,ins09,ins10,ins11,ins12,ins13,ins14,ins15,totalSum;
			ins01 = this.getView().byId("input_INS08_NUM_REP").getValue();
			ins02 = this.getView().byId("input_INS09_NUM_REP").getValue();
			ins03 = this.getView().byId("input_INS10_NUM_REP").getValue();
			ins04 = this.getView().byId("input_INS11_NUM_REP").getValue();
			ins05 = this.getView().byId("input_INS12_NUM_REP").getValue();
			ins06 = this.getView().byId("input_INS13_NUM_REP").getValue();
			ins07 = this.getView().byId("input_INS14_NUM_REP").getValue();
			ins08 = this.getView().byId("input_INS15_NUM_REP").getValue();
			ins09 = this.getView().byId("input_INS16_NUM_REP").getValue();
			ins10 = this.getView().byId("input_INS17_NUM_REP").getValue();
			ins11 = this.getView().byId("input_INS18_NUM_REP").getValue();
			ins12 = this.getView().byId("input_INS19_NUM_REP").getValue();
			ins13 = this.getView().byId("input_INS20_NUM_REP").getValue();
			// ins14 = this.getView().byId("input_INS20_TOT_CLM").getValue();
			// ins15 = this.getView().byId("input_INS20_TOT_CLM").getValue();
			totalSum = Number(ins01)+Number(ins02)+Number(ins03)+Number(ins04)+Number(ins05)+Number(ins06)+Number(ins07)
			+Number(ins08)+Number(ins09)+Number(ins10)+Number(ins11)+Number(ins12)+Number(ins13);
			this.getView().byId("input_TOTAL_NUM_REP").setValue(totalSum);
		},
		
		// Method to calculate Value Of Repudations (current month)
		calcValueOfRepudations: function(){
			var ins01,ins02,ins03,ins04,ins05,ins06,ins07,ins08,ins09,ins10,ins11,ins12,ins13,ins14,ins15,totalSum;
			ins01 = this.getView().byId("input_INS08_VAL_REP").getValue();
			ins02 = this.getView().byId("input_INS09_VAL_REP").getValue();
			ins03 = this.getView().byId("input_INS10_VAL_REP").getValue();
			ins04 = this.getView().byId("input_INS11_VAL_REP").getValue();
			ins05 = this.getView().byId("input_INS12_VAL_REP").getValue();
			ins06 = this.getView().byId("input_INS13_VAL_REP").getValue();
			ins07 = this.getView().byId("input_INS14_VAL_REP").getValue();
			ins08 = this.getView().byId("input_INS15_VAL_REP").getValue();
			ins09 = this.getView().byId("input_INS16_VAL_REP").getValue();
			ins10 = this.getView().byId("input_INS17_VAL_REP").getValue();
			ins11 = this.getView().byId("input_INS18_VAL_REP").getValue();
			ins12 = this.getView().byId("input_INS19_VAL_REP").getValue();
			ins13 = this.getView().byId("input_INS20_VAL_REP").getValue();
			// ins14 = this.getView().byId("input_INS20_TOT_CLM").getValue();
			// ins15 = this.getView().byId("input_INS20_TOT_CLM").getValue();
			totalSum = Number(ins01)+Number(ins02)+Number(ins03)+Number(ins04)+Number(ins05)+Number(ins06)+Number(ins07)
			+Number(ins08)+Number(ins09)+Number(ins10)+Number(ins11)+Number(ins12)+Number(ins13);
			this.getView().byId("input_TOTAL_VAL_REP").setValue(totalSum);
		},
		
		// Method to calculate Cummulative Number Of Repudations
		calcCummulativeNumberOfRepudations: function(){
			var ins01,ins02,ins03,ins04,ins05,ins06,ins07,ins08,ins09,ins10,ins11,ins12,ins13,ins14,ins15,totalSum;
			ins01 = this.getView().byId("input_INS08_CUM_REP").getValue();
			ins02 = this.getView().byId("input_INS09_CUM_REP").getValue();
			ins03 = this.getView().byId("input_INS10_CUM_REP").getValue();
			ins04 = this.getView().byId("input_INS11_CUM_REP").getValue();
			ins05 = this.getView().byId("input_INS12_CUM_REP").getValue();
			ins06 = this.getView().byId("input_INS13_CUM_REP").getValue();
			ins07 = this.getView().byId("input_INS14_CUM_REP").getValue();
			ins08 = this.getView().byId("input_INS15_CUM_REP").getValue();
			ins09 = this.getView().byId("input_INS16_CUM_REP").getValue();
			ins10 = this.getView().byId("input_INS17_CUM_REP").getValue();
			ins11 = this.getView().byId("input_INS18_CUM_REP").getValue();
			ins12 = this.getView().byId("input_INS19_CUM_REP").getValue();
			ins13 = this.getView().byId("input_INS20_CUM_REP").getValue();
			// ins14 = this.getView().byId("input_INS20_TOT_CLM").getValue();
			// ins15 = this.getView().byId("input_INS20_TOT_CLM").getValue();
			totalSum = Number(ins01)+Number(ins02)+Number(ins03)+Number(ins04)+Number(ins05)+Number(ins06)+Number(ins07)
			+Number(ins08)+Number(ins09)+Number(ins10)+Number(ins11)+Number(ins12)+Number(ins13);
			this.getView().byId("input_TOTAL_CUM_REP").setValue(totalSum);
		},
		
		// Method to calculate Cummulative Value Of Repudations
		calcCummulativeValueOfRepudations: function(){
			var ins01,ins02,ins03,ins04,ins05,ins06,ins07,ins08,ins09,ins10,ins11,ins12,ins13,ins14,ins15,totalSum;
			ins01 = this.getView().byId("input_INS08_CUM_VAL").getValue();
			ins02 = this.getView().byId("input_INS09_CUM_VAL").getValue();
			ins03 = this.getView().byId("input_INS10_CUM_VAL").getValue();
			ins04 = this.getView().byId("input_INS11_CUM_VAL").getValue();
			ins05 = this.getView().byId("input_INS12_CUM_VAL").getValue();
			ins06 = this.getView().byId("input_INS13_CUM_VAL").getValue();
			ins07 = this.getView().byId("input_INS14_CUM_VAL").getValue();
			ins08 = this.getView().byId("input_INS15_CUM_VAL").getValue();
			ins09 = this.getView().byId("input_INS16_CUM_VAL").getValue();
			ins10 = this.getView().byId("input_INS17_CUM_VAL").getValue();
			ins11 = this.getView().byId("input_INS18_CUM_VAL").getValue();
			ins12 = this.getView().byId("input_INS19_CUM_VAL").getValue();
			ins13 = this.getView().byId("input_INS20_CUM_VAL").getValue();
			// ins14 = this.getView().byId("input_INS20_TOT_CLM").getValue();
			// ins15 = this.getView().byId("input_INS20_TOT_CLM").getValue();
			totalSum = Number(ins01)+Number(ins02)+Number(ins03)+Number(ins04)+Number(ins05)+Number(ins06)+Number(ins07)
			+Number(ins08)+Number(ins09)+Number(ins10)+Number(ins11)+Number(ins12)+Number(ins13);
			this.getView().byId("input_TOTAL_CUM_VAL").setValue(totalSum);
		},
		// ********************************END SUMMARY OF REPUDIATIONS THROUGH BROKER 4*********************
		// ********************************START STATEMENT OF FINANCIAL POSITION (BALANCE SHEET) 6*********************
		
		// Method to calculate Current Liabilities
		calcCurrentLiabilities: function(){
			this.getView().byId("input_CUR_LIAB").setValue(this.getView().byId("input_GROSS_PREM_PAY").getValue());
		},
		
		// Method to calculate Other Liabilities
		calcOtherLiabilities: function(){
			this.getView().byId("input_OTHER_LIAB").setValue(this.getView().byId("input_TAXATION").getValue());
		},
		
		// Method to calculate Total Current Liabilities
		calcTotalCurrentLiabilities: function(){
			var ins01,ins02,ins03,ins04,ins05,ins06,totalSum;
			ins01 = this.getView().byId("input_PAY_PREMIUM").getValue();
			ins02 = this.getView().byId("input_TAXATION_BS").getValue();
			ins03 = this.getView().byId("input_provisions").getValue();
			ins04 = this.getView().byId("input_accrued_expenses").getValue();
			ins05 = this.getView().byId("input_prepayments").getValue();
			ins06 = this.getView().byId("input_OTHER_LIAB").getValue();
			totalSum = Number(ins01)+Number(ins02)+Number(ins03)+Number(ins04)+Number(ins05)+Number(ins06);
			this.getView().byId("input_TOT_CUR_ASSET").setValue(totalSum);
		},
		
		// Method to calculate Total Non-Current Liabilities
		calcTotalNonCurrentLiabilities: function(){
			var ins01,ins02,ins03,totalSum;
			ins01 = this.getView().byId("input_NON_CUR_AMOUNT2").getValue();
			ins02 = this.getView().byId("input_bank_overdraft").getValue();
			ins03 = this.getView().byId("input_shareholder_loan").getValue();
			totalSum = Number(ins01)+Number(ins02)+Number(ins03);
			this.getView().byId("input_total_non_current_liabilities").setValue(totalSum);
		},
		
		// Method to calculate Total Equity And Liabilities
		calcTotalEquityAndLiabilities: function(){
			// Total Equity And Liabilities = Total Current Liabilities + Total Non Current Liabilities + Total Owners Equity
			this.getView().byId("input_OTHER_LIAB").setValue(Number(this.getView().byId("input_TOTAL_CUR_LIAB").getValue())+
			Number(this.getView().byId("input_total_non_current_liabilities").getValue())+Number(this.getView().byId("input_OWNWER_EQUITY").getValue()));
		},
		
		// Method to calculate Total Non-Current Assets
		calcTotalNonCurrentAssets: function(){
			var ins01,ins02,ins03,ins04,ins05,ins06,ins07,ins08,totalSum;
			ins01 = this.getView().byId("input_plant_equipment").getValue();
			ins02 = this.getView().byId("input_LAND_BUILD").getValue();
			ins03 = this.getView().byId("input_FURNISH_FIT").getValue();
			ins04 = this.getView().byId("input_MOTOR_VEHICLE").getValue();
			ins05 = this.getView().byId("input_COMP_EQUIP").getValue();
			ins06 = this.getView().byId("input_COMP_SOFT").getValue();
			ins07 = this.getView().byId("input_INVESTMENTS").getValue();
			ins08 = this.getView().byId("input_OTHER_ASSETS").getValue();
			totalSum = Number(ins01)+Number(ins02)+Number(ins03)+Number(ins04)+Number(ins05)+Number(ins06)+Number(ins07)
			+Number(ins08);
			this.getView().byId("input_TOT_NON_CUR").setValue(totalSum);
		},
		
		// Method to calculate Total Current Assets
		calcTotalCurrentAssets: function(){
			var ins01,ins02,ins03,ins04,totalSum;
			ins01 = this.getView().byId("input_COMM_RECEIVE").getValue();
			ins02 = this.getView().byId("input_ACCURE_INVEST").getValue();
			ins03 = this.getView().byId("input_OTHER_DEBT").getValue();
			ins04 = this.getView().byId("input_CASH_EQUIV").getValue();
			totalSum = Number(ins01)+Number(ins02)+Number(ins03)+Number(ins04);
			this.getView().byId("input_TOT_CUR_ASSET").setValue(totalSum);
		},
		
		// Method to calculate Total Assets
		calcTotalAssets: function(){
			// Total Assets = Total Non-Current Assets + Total Current Assets
			var ins01,ins02,totalSum;
			ins01 = this.getView().byId("input_TOT_NON_CUR").getValue();
			ins02 = this.getView().byId("input_TOT_CUR_ASSET").getValue();
			totalSum = Number(ins01)+Number(ins02);
			this.getView().byId("input_TOT_ASSET").setValue(totalSum);
		},
		// ********************************END STATEMENT OF FINANCIAL POSITION (BALANCE SHEET) 6*********************
	});
});