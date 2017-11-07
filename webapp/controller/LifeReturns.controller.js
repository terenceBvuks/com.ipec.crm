sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/m/MessageBox",
	"jquery.sap.global",
	"sap/ui/model/json/JSONModel"
], function(Controller,MessageToast,MessageBox) {
	"use strict";

	return Controller.extend("com.ipec.crm.controller.LifeReturns", {
		onInit : function () {
			// var sUrl2 = "#" + this.getOwnerComponent().getRouter().getURL("page2");
			// this.byId("link2").setHref(sUrl2);
			// oModel = this.getView().getModel("ZIPEC_APP_SRV");
		},

		// onToPage2 : function () {
		// 	this.getOwnerComponent().getRouter().navTo("page2");
		// },
		
		// onToPage3 : function () {
		// 	this.getOwnerComponent().getRouter().navTo("page3");
		// },
		
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
	// 	_saveOrder: function() {
	// 		var that = this;
	// 		var 	oEntry = {};
	// ///		var 	oModel = this.getView().getModel("ZIPEC_APP_SRV");
	// 		var 	bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;

	// 	//Bind data array to form fields
	// 		//Identifying details
	// 		oEntry.Institutionname = this.getView().byId("input_Institutionname").getValue();
	// 		oEntry.Periodended = this.getView().byId("input_Periodended").getValue();
	// //		oEntry.Principalname = this.getView().byId("input_Principalname").getValue();
	// 		oEntry.Compliancemanager = this.getView().byId("input_Compliancemanager").getValue();
	// 		oEntry.Financemanager = this.getView().byId("input_Financemanager").getValue();

	// 	/*	//Bind data array to form fields
	// 		// BREAKDOWNTOTALASSETS Entity Fields
	// 		// naming convention is input_OdataAttributeName
	// 		oEntry.ReturnNo = this.getView().byId("input_ReturnNo").getValue();
	// 		oEntry.Zimgovsecurities = this.getView().byId("input_Zimgovsecurities").getValue();
	// 		oEntry.Municipal = this.getView().byId("input_Municipal").getValue();
	// 		oEntry.Amabonds = this.getView().byId("input_Amabonds").getValue();
	// 		oEntry.Nathousing = this.getView().byId("input_Nathousing").getValue();
	// 		oEntry.Otherprescribed = this.getView().byId("input_Otherprescribed").getValue();
	// 		oEntry.Mortage = this.getView().byId("input_Mortage").getValue();
	// 		oEntry.Loanpolicies = this.getView().byId("input_Loanpolicies").getValue();
	// 		oEntry.Fixedproperty = this.getView().byId("input_Fixedproperty").getValue();
	// 		oEntry.Equities = this.getView().byId("input_Equities").getValue();
	// 		oEntry.Moneymarket = this.getView().byId("input_Moneymarket").getValue();
	// 		oEntry.Cashbankmarket = this.getView().byId("input_Cashbankmarket").getValue();
	// 		oEntry.Otherinvestment = this.getView().byId("input_Otherinvestment").getValue();
	// 		oEntry.Subtotal= this.getView().byId("input_Subtotal").getValue();
	// 		oEntry.Totalassets = this.getView().byId("input_Totalassets").getValue();
	// 		oEntry.Prescribedassets= this.getView().byId("input_Prescribedassets").getValue();
	// 		oEntry.Minassetsratio = this.getView().byId("input_Minassetsratio").getValue();
	// 		oEntry.Requiredinvest = this.getView().byId("input_Requiredinvest").getValue();
			
			
			
	// 		// Bind data array to form fields
	// 		// SUMMARY OF TOTAL BUSINESS PLACED BY BROKER INSIDE ZIMBABWE
	// 		oEntry.Grosspremium = this.getView().byId("input_Grosspremium").getValue();
	// 		oEntry.Outwardpremium = this.getView().byId("input_Outwardpremium").getValue();
	// 		oEntry.Unearnedpremium = this.getView().byId("input_Unearnedpremium").getValue();
	// 		oEntry.Netpremium = this.getView().byId("input_Netpremium").getValue();
	// 		oEntry.Claimspaid = this.getView().byId("input_Claimspaid").getValue();
	// 		oEntry.Claimsoutstanding = this.getView().byId("input_Claimsoutstanding").getValue();
	// 		oEntry.Claimsincurred = this.getView().byId("input_Claimsincurred").getValue();
	// 		oEntry.Unexpiredprovision = this.getView().byId("input_Unexpiredprovision").getValue();
	// 		oEntry.Netclaims = this.getView().byId("input_Netclaims").getValue();
	// 		oEntry.AdminExpenses = this.getView().byId("input_AdminExpenses").getValue();
	// 		oEntry.Netfeescommission = this.getView().byId("input_Netfeescommission").getValue();
	// 		oEntry.Underwritingpl = this.getView().byId("input_Underwritingpl").getValue();
	// 		oEntry.Investincome = this.getView().byId("input_Investincome").getValue();
	// 		oEntry.Otherincome1 = this.getView().byId("input_Otherincome1").getValue();
	// 		oEntry.Otherincome2 = this.getView().byId("input_Otherincome2").getValue();
	// 		oEntry.Otherincome3 = this.getView().byId("input_Otherincome3").getValue();
	// 		oEntry.Managementexpense = this.getView().byId("input_Managementexpense").getValue();
	// 		oEntry.Otherexpense = this.getView().byId("input_Otherexpense").getValue();
	// 		oEntry.Ebinteresttaxation = this.getView().byId("input_Ebinteresttaxation").getValue();
	// 		oEntry.Interest = this.getView().byId("input_Interest").getValue();
	// 		oEntry.Ebeforextax = this.getView().byId("input_Ebeforextax").getValue();
	// 		oEntry.Taxation = this.getView().byId("input_Taxation").getValue();
	// 		oEntry.Eaftertax = this.getView().byId("input_Eaftertax").getValue();
	// 		oEntry.Ocincome = this.getView().byId("input_Ocincome").getValue();
	// 		oEntry.Tcplforperiod = this.getView().byId("input_Tcplforperiod").getValue();
	// 		oEntry.Tpolicyfunds = this.getView().byId("input_Tpolicyfunds").getValue();
	// 		oEntry.Tcplshareholders = this.getView().byId("input_Tcplshareholders").getValue();
	// 		oEntry.Ncassets = this.getView().byId("input_Ncassets").getValue();
	// 		oEntry.Intangibleassets = this.getView().byId("input_Intangibleassets").getValue();
			
	// 		// Bind data array to form fields
	// 		// STATEMENT OF FINANCIAL POSITION
	// 		oEntry.Propertequip = this.getView().byId("input_Propertequip").getValue();
	// 		oEntry.Investmentproperty = this.getView().byId("input_Investmentproperty").getValue();
	// 		oEntry.Investmentsecurities = this.getView().byId("input_Payablesafraecurities").getValue();
	// 		oEntry.Investmentassets = this.getView().byId("input_Investmentassets").getValue();
	// 		oEntry.Otherncassets1 = this.getView().byId("input_Otherncassets1").getValue();
	// 		oEntry.Otherncassets2 = this.getView().byId("input_Otherncassets2").getValue();
	// 		oEntry.Otherncassets3 = this.getView().byId("input_Otherncassets3").getValue();
	// 		oEntry.Totalncassets = this.getView().byId("input_Totalncassets").getValue();
	// 		oEntry.Accreceivable = this.getView().byId("input_Accreceivable").getValue();
	// 		oEntry.Stinvestments = this.getView().byId("input_Stinvestments").getValue();
	// 		oEntry.Cbbalances = this.getView().byId("input_Cbbalances").getValue();
	// 		oEntry.Othercassets1 = this.getView().byId("input_Othercassets1").getValue();
	// 		oEntry.Othercassets2 = this.getView().byId("input_Othercassets2").getValue();
	// 		oEntry.Othercassets3 = this.getView().byId("input_Othercassets3").getValue();
	// 		oEntry.Totalcassets = this.getView().byId("input_Totalcassets").getValue();
	// 		oEntry.Longtermloans = this.getView().byId("input_Longtermloans").getValue();
	// 		oEntry.Outstandingclaims = this.getView().byId("input_Outstandingclaims").getValue();
	// 		oEntry.Claimsibnr = this.getView().byId("input_Claimsibnr").getValue();
	// 		oEntry.Futurepd = this.getView().byId("input_Futurepd").getValue();
	// 		oEntry.Unearnedpr = this.getView().byId("input_Unearnedpr").getValue();
	// 		oEntry.Amountsdtr = this.getView().byId("input_Amountsdtr").getValue();
	// 		oEntry.Payablesafra = this.getView().byId("input_Payablesafra").getValue();
	// 		oEntry.Deferredtaxation = this.getView().byId("input_Deferredtaxation").getValue();
	// 		oEntry.Otherliabilities1 = this.getView().byId("input_Otherliabilities1").getValue();
	// 		oEntry.Otherliabilities2 = this.getView().byId("input_Otherliabilities2").getValue();
	// 		oEntry.Otherliabilities3 = this.getView().byId("input_Otherliabilities3").getValue();
	// 		oEntry.Totalliabilities = this.getView().byId("input_Totalliabilities").getValue();
	// 		oEntry.Sharecapital = this.getView().byId("input_Sharecapital").getValue();
	// 		oEntry.Sharepremium = this.getView().byId("input_Sharepremium").getValue();
	// 		oEntry.Investmentreserve = this.getView().byId("input_Investmentreserve").getValue();
	// 		oEntry.Revaluationreserve = this.getView().byId("input_Revaluationreserve").getValue();
	// 		oEntry.Nondistreserve = this.getView().byId("input_Nondistreserve").getValue();
	// 		oEntry.Retainedepy = this.getView().byId("input_Retainedepy").getValue();
	// 		oEntry.Retainedcp = this.getView().byId("input_Retainedcp").getValue();
	// 		oEntry.Minorityinterest = this.getView().byId("input_Minorityinterest").getValue();
	// 		oEntry.Othercapitalreserves1 = this.getView().byId("input_Othercapitalreserves1").getValue();
	// 		oEntry.Otothercapitalreserves2 = this.getView().byId("input_Otothercapitalreserves2").getValue();
	// 		oEntry.Othercapitalreserves3 = this.getView().byId("input_Othercapitalreserves3").getValue();
	// 		oEntry.Shareholderequity = this.getView().byId("input_Shareholderequity").getValue();
	// 		oEntry.Totalequityliabilities = this.getView().byId("input_Totalequityliabilities").getValue();
			
	// 		//Bind data array to form fields
	// 		// SOLVENCY REPORT
	// 		oEntry.Totalassets = this.getView().byId("input_Totalassets").getValue();
	// 		oEntry.Lessiassets = this.getView().byId("input_Lessiassets").getValue();
	// 		oEntry.Lesseassets = this.getView().byId("input_Lesseassets").getValue();
	// 		oEntry.Othernonpassets = this.getView().byId("input_Othernonpassets").getValue();
	// 		oEntry.Netadjustedassets = this.getView().byId("input_Netadjustedassets").getValue();
	// 		oEntry.Totalliabilities1 = this.getView().byId("input_Totalliabilities1").getValue();
	// 		oEntry.Excessaoliabilities = this.getView().byId("input_Excessaoliabilities").getValue();
	// 		oEntry.Grosspw = this.getView().byId("input_Grosspw").getValue();
	// 		oEntry.Reassurance = this.getView().byId("input_Reassurance").getValue();
	// 		oEntry.Netpincome = this.getView().byId("input_Netpincome").getValue();
	// 		oEntry.Shareholderfund = this.getView().byId("input_Shareholderfund").getValue();
	// 		oEntry.Safetymargin = this.getView().byId("input_Safetymargin").getValue();
	// 		oEntry.Solvencymargin = this.getView().byId("input_Solvencymargin").getValue();
			
	// 		// Bind data array to form fields
	// 		// Breakdown by Class of Business (Individual Life)
	// 		oEntry.Iindividualbnp = this.getView().byId("input_Iindividualbnp").getValue();
	// 		oEntry.Iindividualbgp = this.getView().byId("input_Iindividualbgp").getValue();
	// 		oEntry.Iindividualanp = this.getView().byId("input_Iindividualanp").getValue();
	// 		oEntry.Iindividualagp = this.getView().byId("input_Iindividualagp").getValue();
	// 		oEntry.Iindividualdcnp = this.getView().byId("input_Iindividualdcnp").getValue();
	// 		oEntry.Iindividualdcgp = this.getView().byId("input_Iindividualdcgp").getValue();
	// 		oEntry.Iindividualtnp = this.getView().byId("input_Iindividualtnp").getValue();
	// 		oEntry.Iindividualtgp = this.getView().byId("input_Iindividualtgp").getValue();
	// 		// binded variables are the ones below
	// 		oEntry.Inewbusinessbnp = this.getView().byId("input_Inewbusinessbnp").getValue();
	// 		oEntry.Inewbusinessbgp = this.getView().byId("input_Inewbusinessbgp").getValue();
	// 		oEntry.Inewbusinessanp = this.getView().byId("input_Inewbusinessanp").getValue();
	// 		oEntry.Inewbusinessagp = this.getView().byId("input_Inewbusinessagp").getValue();
	// 		oEntry.Inewbusinessdcnp = this.getView().byId("input_Inewbusinessdcnp").getValue();
	// 		oEntry.Inewbusinessdcgp = this.getView().byId("input_Inewbusinessdcgp").getValue();
	// 		oEntry.Inewbusinesstnp = this.getView().byId("input_Inewbusinesstnp").getValue();
	// 		oEntry.Inewbusinesstgp = this.getView().byId("input_Inewbusinesstgp").getValue();
	// 		oEntry.Ireccuringbnp = this.getView().byId("input_Ireccuringbnp").getValue();
	// 		oEntry.Ireccuringbgp = this.getView().byId("input_Ireccuringbgp").getValue();
	// 		oEntry.Ireccuringanp = this.getView().byId("input_Ireccuringanp").getValue();
	// 		oEntry.Ireccuringagp = this.getView().byId("input_Ireccuringagp").getValue();
	// 		oEntry.Ireccuringdcnp = this.getView().byId("input_Ireccuringdcnp").getValue();
	// 		oEntry.Ireccuringdcgp = this.getView().byId("input_Ireccuringdcgp").getValue();
	// 		oEntry.Ireccuringtnp = this.getView().byId("input_Ireccuringtnp").getValue();
	// 		oEntry.Ireccuringtgp = this.getView().byId("input_Ireccuringtgp").getValue();
	// 		oEntry.Isubtotalbnp = this.getView().byId("input_Isubtotalbnp").getValue();
	// 		oEntry.Isubtotalbgp = this.getView().byId("input_Isubtotalbgp").getValue();
	// 		oEntry.Isubtotalanp = this.getView().byId("input_Isubtotalanp").getValue();
	// 		oEntry.Isubtotalagp = this.getView().byId("input_Isubtotalagp").getValue();
	// 		oEntry.Isubtotaldcnp = this.getView().byId("input_Isubtotaldcnp").getValue();
	// 		oEntry.Isubtotaldcgp = this.getView().byId("input_Isubtotaldcgp").getValue();
	// 		oEntry.Isubtotaltnp = this.getView().byId("input_Isubtotaltnp").getValue();
	// 		oEntry.Isubtotaltgp = this.getView().byId("input_Isubtotaltgp").getValue();
			
	// 		// Bind data array to form fields
	// 		// Breakdown by Class of Business (Employee Benefits/Corporates/Group Life Assurance)
	// 		oEntry.Enewbusinessbnp = this.getView().byId("input_Enewbusinessbnp").getValue();
	// 		oEntry.Enewbusinessbgp = this.getView().byId("input_Enewbusinessbgp").getValue();
	// 		oEntry.Enewbusinessanp = this.getView().byId("input_Enewbusinessanp").getValue();
	// 		oEntry.Enewbusinessagp = this.getView().byId("input_Enewbusinessagp").getValue();
	// 		oEntry.Enewbusinessdcnp = this.getView().byId("input_Enewbusinessdcnp").getValue();
	// 		oEntry.Enewbusinessdcgp = this.getView().byId("input_Enewbusinessdcgp").getValue();
	// 		oEntry.Enewbusinesstnp = this.getView().byId("input_Enewbusinesstnp").getValue();
	// 		oEntry.Enewbusinesstgp = this.getView().byId("input_Enewbusinesstgp").getValue();
	// 		oEntry.Ereccuringbnp = this.getView().byId("input_Ereccuringbnp").getValue();
	// 		oEntry.Ereccuringbgp = this.getView().byId("input_Ereccuringbgp").getValue();
	// 		oEntry.Ereccuringanp = this.getView().byId("input_Ereccuringanp").getValue();
	// 		oEntry.Ereccuringagp = this.getView().byId("input_Ereccuringagp").getValue();
	// 		oEntry.Ereccuringdcnp = this.getView().byId("input_Ereccuringdcnp").getValue();
	// 		oEntry.Ereccuringdcgp = this.getView().byId("input_Ereccuringdcgp").getValue();
	// 		oEntry.Ereccuringtnp = this.getView().byId("input_Ereccuringtnp").getValue();
	// 		oEntry.Ereccuringtgp = this.getView().byId("input_Ereccuringtgp").getValue();
	// 		oEntry.Esubtotalbnp = this.getView().byId("input_Esubtotalbnp").getValue();
	// 		oEntry.Esubtotalbgp = this.getView().byId("input_Esubtotalbgp").getValue();
	// 		oEntry.Esubtotalanp = this.getView().byId("input_Esubtotalanp").getValue();
	// 		oEntry.Esubtotalagp = this.getView().byId("input_Esubtotalagp").getValue();
	// 		oEntry.Esubtotaldcnp = this.getView().byId("input_Esubtotaldcnp").getValue();
	// 		oEntry.Esubtotaldcgp = this.getView().byId("input_Esubtotaldcgp").getValue();
	// 		oEntry.Esubtotaltnp = this.getView().byId("input_Esubtotaltnp").getValue();
	// 		oEntry.Esubtotaltgp = this.getView().byId("input_Esubtotaltgp").getValue();
			
	// 		// Bind data array to form fields
	// 		// Breakdown by Class of Business (Breakdown by Insurance Type)
	// 		oEntry.Bannuitiesbnp = this.getView().byId("input_Bannuitiesbnp").getValue();
	// 		oEntry.Bannuitiesbgp = this.getView().byId("input_Bannuitiesbgp").getValue();
	// 		oEntry.Bannuitiesanp = this.getView().byId("input_Bannuitiesanp").getValue();
	// 		oEntry.Bannuitiesagp = this.getView().byId("input_Bannuitiesagp").getValue();
	// 		oEntry.Bannuitiesdcnp = this.getView().byId("input_Bannuitiesdcnp").getValue();
	// 		oEntry.Bannuitiesdcgp = this.getView().byId("input_Bannuitiesdcgp").getValue();
	// 		oEntry.Bannuitiestnp = this.getView().byId("input_Bannuitiestnp").getValue();
	// 		oEntry.Bannuitiestgp = this.getView().byId("input_Bannuitiestgp").getValue();
	// 		oEntry.Bterminsurancebnp = this.getView().byId("input_Bterminsurancebnp").getValue();
	// 		oEntry.Bterminsurancebgp = this.getView().byId("input_Bterminsurancebgp").getValue();
	// 		oEntry.Bterminsuranceanp = this.getView().byId("input_Bterminsuranceanp").getValue();
	// 		oEntry.Bterminsuranceagp = this.getView().byId("input_Bterminsuranceagp").getValue();
	// 		oEntry.Bterminsurancedcnp = this.getView().byId("input_Bterminsurancedcnp").getValue();
	// 		oEntry.Bterminsurancedcgp = this.getView().byId("input_Bterminsurancedcgp").getValue();
	// 		oEntry.Bterminsurancetnp = this.getView().byId("input_Bterminsurancetnp").getValue();
	// 		oEntry.Bterminsurancetgp = this.getView().byId("input_Bterminsurancetgp").getValue();
	// 		oEntry.Bendowementbnp = this.getView().byId("input_Bendowementbnp").getValue();
	// 		oEntry.Bendowementbgp = this.getView().byId("input_Bendowementbgp").getValue();
	// 		oEntry.Bendowementanp = this.getView().byId("input_Bendowementanp").getValue();
	// 		oEntry.Bendowementagp = this.getView().byId("input_Bendowementagp").getValue();
	// 		oEntry.Bendowementdcnp = this.getView().byId("input_Bendowementdcnp").getValue();
	// 		oEntry.Bendowementdcgp = this.getView().byId("input_Bendowementdcgp").getValue();
	// 		oEntry.Bendowementtnp = this.getView().byId("input_Bendowementtnp").getValue();
	// 		oEntry.Bendowementtgp = this.getView().byId("input_Bendowementtgp").getValue();
	// 		oEntry.Bpureendowementbnp = this.getView().byId("input_Bpureendowementbnp").getValue();
	// 		oEntry.Bpureendowementbgp = this.getView().byId("input_Bpureendowementbgp").getValue();
	// 		oEntry.Bpureendowementanp = this.getView().byId("input_Bpureendowementanp").getValue();
	// 		oEntry.Bpureendowementagp = this.getView().byId("input_Bpureendowementagp").getValue();
	// 		oEntry.Bpureendowementdcnp = this.getView().byId("input_Bpureendowementdcnp").getValue();
	// 		oEntry.Bpureendowementdcgp = this.getView().byId("input_Bpureendowementdcgp").getValue();
	// 		oEntry.Bpureendowementtnp = this.getView().byId("input_Bpureendowementtnp").getValue();
	// 		oEntry.Bpureendowementtgp = this.getView().byId("input_Bpureendowementtgp").getValue();
	// 		oEntry.Bwholebnp = this.getView().byId("input_Bwholebnp").getValue();
	// 		oEntry.Bwholebgp = this.getView().byId("input_Bwholebgp").getValue();
	// 		oEntry.Bwholeanp = this.getView().byId("input_Bwholeanp").getValue();
	// 		oEntry.Bwholeagp = this.getView().byId("input_Bwholeagp").getValue();
	// 		oEntry.Bwholedcnp = this.getView().byId("input_Bwholedcnp").getValue();
	// 		oEntry.Bwholedcgp = this.getView().byId("input_Bwholedcgp").getValue();
	// 		oEntry.Bwholetnp = this.getView().byId("input_Bwholetnp").getValue();
	// 		oEntry.Bwholetgp = this.getView().byId("input_Bwholetgp").getValue();
	// 		oEntry.Bfuneralbnp = this.getView().byId("input_Bfuneralbnp").getValue();
	// 		oEntry.Bfuneralbgp = this.getView().byId("input_Bfuneralbgp").getValue();
	// 		oEntry.Bfuneralanp = this.getView().byId("input_Bfuneralanp").getValue();
	// 		oEntry.Bfuneralagp = this.getView().byId("input_Bfuneralagp").getValue();
	// 		oEntry.Bfuneraldcnp = this.getView().byId("input_Bfuneraldcnp").getValue();
	// 		oEntry.Bfuneraldcgp = this.getView().byId("input_Bfuneraldcgp").getValue();
	// 		oEntry.Bfuneraltnp = this.getView().byId("input_Bfuneraltnp").getValue();
	// 		oEntry.Bfuneraltgp = this.getView().byId("input_Bfuneraltgp").getValue();
	// 		oEntry.Btotalbnp = this.getView().byId("input_Btotalbnp").getValue();
	// 		oEntry.Btotalbgp = this.getView().byId("input_Btotalbgp").getValue();
	// 		oEntry.Btotalanp = this.getView().byId("input_Btotalanp").getValue();
	// 		oEntry.Btotalagp = this.getView().byId("input_Btotalagp").getValue();
	// 		oEntry.Btotaldcnp = this.getView().byId("input_Btotaldcnp").getValue();
	// 		oEntry.Btotaldcgp = this.getView().byId("input_Btotaldcgp").getValue();
	// 		oEntry.Btotaltnp = this.getView().byId("input_Btotaltnp").getValue();
	// 		oEntry.Btotaltgp = this.getView().byId("input_Btotaltgp").getValue();
			
	// 		// Bind data array to form fields
	// 		// BREAKDOWN OF TOTAL ASSETS
	// 		oEntry.Nameinstizgd = this.getView().byId("input_Nameinstizgd").getValue();
	// 		oEntry.Nameinstimos = this.getView().byId("input_Nameinstimos").getValue();
	// 		oEntry.Nameinstiamabonds = this.getView().byId("input_Nameinstiamabonds").getValue();
	// 		oEntry.Nameinstinhf = this.getView().byId("input_Nameinstinhf").getValue();
	// 		oEntry.Nameinstiopa = this.getView().byId("input_Nameinstiopa").getValue();
	// 		oEntry.Nameinstitpa = this.getView().byId("input_Nameinstitpa").getValue();
	// 		oEntry.Nameinstimop = this.getView().byId("input_Nameinstimop").getValue();
	// 		oEntry.Nameinstilop = this.getView().byId("input_Nameinstilop").getValue();
	// 		oEntry.Nameinstifp = this.getView().byId("input_Nameinstifp").getValue();
	// 		oEntry.Nameinstiequities = this.getView().byId("input_Nameinstiequities").getValue();
	// 		oEntry.Nameinstimoneym = this.getView().byId("input_Nameinstimoneym").getValue();
	// 		oEntry.Nameinsticbbalances = this.getView().byId("input_Nameinsticbbalances").getValue();
	// 		oEntry.Nameinstiotherinvest = this.getView().byId("input_Nameinstiotherinvest").getValue();
	// 		oEntry.Nameinstisubtotal = this.getView().byId("input_Nameinstisubtotal").getValue();
	// 		oEntry.Nameinstitotalassets = this.getView().byId("input_Nameinstitotalassets").getValue();
	// 		oEntry.Nameinstipata = this.getView().byId("input_Nameinstipata").getValue();
	// 		oEntry.Nameinstimrpar = this.getView().byId("input_Nameinstimrpar").getValue();
	// 		oEntry.Nameinstiripa = this.getView().byId("input_Nameinstiripa").getValue();
	// 		oEntry.Nameinstizgd1 = this.getView().byId("input_Nameinstizgd1").getValue();
	// 		oEntry.Nameinstimos1 = this.getView().byId("input_Nameinstimos1").getValue();
	// 		oEntry.Nameinstiamabonds1 = this.getView().byId("input_Nameinstiamabonds1").getValue();
	// 		oEntry.Nameinstinhf1 = this.getView().byId("input_Nameinstinhf1").getValue();
	// 		oEntry.Nameinstiopa1 = this.getView().byId("input_Nameinstiopa1").getValue();
	// 		oEntry.Nameinstitpa1 = this.getView().byId("input_Nameinstitpa1").getValue();
	// 		oEntry.Nameinstimop1 = this.getView().byId("input_Nameinstimop1").getValue();
	// 		oEntry.Nameinstilop1 = this.getView().byId("input_Nameinstilop1").getValue();
	// 		oEntry.Nameinstifp1 = this.getView().byId("input_Nameinstifp1").getValue();
	// 		oEntry.Nameinstiequities1 = this.getView().byId("input_Nameinstiequities1").getValue();
	// 		oEntry.Nameinstimoneym1 = this.getView().byId("input_Nameinstimoneym1").getValue();
	// 		oEntry.Nameinsticbbalances1 = this.getView().byId("input_Nameinsticbbalances1").getValue();
	// 		oEntry.Nameinstiotherinvest1 = this.getView().byId("input_Nameinstiotherinvest1").getValue();
	// 		oEntry.Nameinstisubtotal1 = this.getView().byId("input_Nameinstisubtotal1").getValue();
	// 		oEntry.Nameinstitotalassets1 = this.getView().byId("input_Nameinstitotalassets1").getValue();
	// 		oEntry.Nameinstipata1 = this.getView().byId("input_Nameinstipata1").getValue();
	// 		oEntry.Nameinstimrpar1 = this.getView().byId("input_Nameinstimrpar1").getValue();
	// 		oEntry.Nameinstiripa11 = this.getView().byId("input_Nameinstiripa11").getValue();
			
	// 		//Bind data array to form fields
	// 		//Claims Report
	// 		oEntry.Claimsbydeathindiv = this.getView().byId("input_Claimsbydeathindiv").getValue();
	// 		oEntry.Claimsbydeathgroup = this.getView().byId("input_Claimsbydeathgroup").getValue();
	// 		oEntry.Claimsbymaturityindiv = this.getView().byId("input_Claimsbymaturityindiv").getValue();
	// 		oEntry.Claimsbymaturitygroup = this.getView().byId("input_Claimsbymaturitygroup").getValue();
	// 		oEntry.Claimssurrenderindiv = this.getView().byId("input_Claimssurrenderindiv").getValue();
	// 		oEntry.Claimssurrendergroup = this.getView().byId("input_Claimssurrendergroup").getValue();
	// 		oEntry.Claimscashbonusindiv = this.getView().byId("input_Claimscashbonusindiv").getValue();
	// 		oEntry.Claimscashbonusgroup = this.getView().byId("input_Claimscashbonusgroup").getValue();
	// 		oEntry.Claimsgrossindiv = this.getView().byId("input_Claimsgrossindiv").getValue();
	// 		oEntry.Claimsgrossgroup = this.getView().byId("input_Claimsgrossgroup").getValue();
	// 		oEntry.Claimsnetreinsuranceindiv = this.getView().byId("input_Claimsnetreinsuranceindiv").getValue();
	// 		oEntry.Claimsnetreinsurancegroup = this.getView().byId("input_Claimsnetreinsurancegroup").getValue();
	// 		oEntry.Netclaimsindiv = this.getView().byId("input_Netclaimsindiv").getValue();
	// 		oEntry.Netclaimsgroup = this.getView().byId("input_Netclaimsgroup").getValue();
	// 		oEntry.Toptenclaimsindiv = this.getView().byId("input_Toptenclaimsindiv").getValue();
	// 		oEntry.Toptenclaimsgroup = this.getView().byId("input_Toptenclaimsgroup").getValue();
	// 		oEntry.Nameinsured = this.getView().byId("input_Nameinsured").getValue();
	// 		oEntry.Amountclaim = this.getView().byId("input_Amountclaim").getValue();
	// 		oEntry.Typepolicy = this.getView().byId("input_Typepolicy").getValue();
	// 		oEntry.Settledrepudiated = this.getView().byId("input_Settledrepudiated").getValue();
	// 		oEntry.Nameinsured1 = this.getView().byId("input_Nameinsured1").getValue();
	// 		oEntry.Amountclaim1 = this.getView().byId("input_Amountclaim1").getValue();
	// 		oEntry.Typepolicy1 = this.getView().byId("input_Typepolicy1").getValue();
	// 		oEntry.Settledrepudiated1 = this.getView().byId("input_Settledrepudiated1").getValue();
	// 		oEntry.Nameinsured2 = this.getView().byId("input_Nameinsured2").getValue();
	// 		oEntry.Amountclaim2 = this.getView().byId("input_Amountclaim2").getValue();
	// 		oEntry.Typepolicy2 = this.getView().byId("input_Typepolicy2").getValue();
	// 		oEntry.Settledrepudiated2 = this.getView().byId("input_Settledrepudiated2").getValue();
	// 		oEntry.Claimage30ip = this.getView().byId("input_Claimage30ip").getValue();
	// 		oEntry.Claimage30group = this.getView().byId("input_Claimage30group").getValue();
	// 		oEntry.Claimage30total = this.getView().byId("input_Claimage30total").getValue();
	// 		oEntry.Claimage60ip = this.getView().byId("input_Claimage60ip").getValue();
	// 		oEntry.Claimage60group = this.getView().byId("input_Claimage60group").getValue();
	// 		oEntry.Claimage60total = this.getView().byId("input_Claimage60total").getValue();
	// 		oEntry.Claimage90ip = this.getView().byId("input_Claimage90ip").getValue();
	// 		oEntry.Claimage90group = this.getView().byId("input_Claimage90group").getValue();
	// 		oEntry.Claimage90total = this.getView().byId("input_Claimage90total").getValue();
	// 		oEntry.Claimage120ip = this.getView().byId("input_Claimage120ip").getValue();
	// 		oEntry.Claimage120group = this.getView().byId("input_Claimage120group").getValue();
	// 		oEntry.Claimage120total = this.getView().byId("input_Claimage120total").getValue();
	// 		oEntry.Claimage121ip = this.getView().byId("input_Claimage121ip").getValue();
	// 		oEntry.Claimage121group = this.getView().byId("input_Claimage121group").getValue();
	// 		oEntry.Claimage121total = this.getView().byId("input_Claimage121total").getValue();
	// 		oEntry.Claimagetotalip = this.getView().byId("input_Claimagetotalip").getValue();
	// 		oEntry.Claimagetotalgroup = this.getView().byId("input_Claimagetotalgroup").getValue();
	// 		oEntry.Claimagetotalt = this.getView().byId("input_Claimagetotalt").getValue();
			
	// 		//Bind data array to form fields
	// 		// CORPORATE STRUCTURE AND GOVERNANCE : Shareholder Structure
	// 		oEntry.Nameofshareholder = this.getView().byId("input_Nameofshareholder").getValue();
	// 		oEntry.Beneficiaries = this.getView().byId("input_Beneficiaries").getValue();
	// 		oEntry.Percentageshare = this.getView().byId("input_Percentageshare").getValue();*/
			
	// 		this.oModel.setUseBatch(true);

	// 		this.oModel.create("/ZLFO_RETURNSSet", oEntry, {
	// 			success: function(data) {
	// 				sap.ui.core.BusyIndicator.hide();
	// 				MessageBox.show(
	// 					that._oResourceBundle.getText("saveSuccess") + "" + data.ReturnNo, {
	// 						icon: MessageBox.Icon.SUCCESS,
	// 						title: "Success",
	// 						actions: [MessageBox.Action.OK],
	// 						id: "msgBox2",
	// 						styleClass: bCompact ? "sapUiSizeCompact" : ""
	// 					}
	// 				);

	// 				that._afterSave();
	// 			},
	// 			error: function(err) {
	// 				sap.ui.core.BusyIndicator.hide();
	// 				MessageBox.show(

	// 					that._oResourceBundle.getText("saveFailed"), {
	// 						icon: MessageBox.Icon.ERROR,
	// 						title: "Error",
	// 						actions: [MessageBox.Action.OK],
	// 						id: "msgBox3",
	// 						details: err,
	// 						styleClass: bCompact ? "sapUiSizeCompact" : ""
	// 					}
	// 				);

	// 			}
	// 		});

	// 	},
		
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
		//**********************************************************calculated values*********************************************************************************
		_calNetWrittenPremium: function(){
			// set Net Written Premium
			//Gross Premium Written + Outward Reassurance Premium = Net Written Premium
			var orp,gpw,nwp;
			gpw = this.getView().byId("input_Grosspremium").getValue();
			orp = this.getView().byId("input_Outwardpremium").getValue();
			gpw = parseFloat(gpw) ? parseFloat(gpw) : 0;
	    	orp = parseFloat(orp) ? parseFloat(orp) : 0;
			nwp = gpw+orp;
			this.getView().byId("input_Netpremium").setValue(nwp);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calNetEarnedPremium: function(){
			// set Net Earned Premium
			//Net Written Premium + Unearned Premium = Net Earned Premium
			var nwp,up,nep;
			nwp = this.getView().byId("input_Netpremium").getValue();
			up = this.getView().byId("input_Unearnedpremium").getValue();
			nwp = parseFloat(nwp) ? parseFloat(up) : 0;
	    	up = parseFloat(up) ? parseFloat(up) : 0;
			nep = nwp+up;
			this.getView().byId("__inputNEP").setValue(nep);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calNetClaims: function(){
			// set Net Claims
			//Claims Paid + Claims Outstanding +  Claims Incurred But Not Reported + Unexpired Provision = Net Claims
			var cp,co,cibnt,uxp,nc;
			cp = this.getView().byId("input_Claimspaid").getValue();
			co = this.getView().byId("input_Claimsoutstanding").getValue();
			cibnt = this.getView().byId("input_Claimsincurred").getValue();
			uxp = this.getView().byId("input_Unexpiredprovision").getValue();
			cp = parseFloat(cp) ? parseFloat(cp) : 0;
	    	co = parseFloat(co) ? parseFloat(co) : 0;
	    	cibnt = parseFloat(cibnt) ? parseFloat(cibnt) : 0;
	    	uxp = parseFloat(uxp) ? parseFloat(uxp) : 0;
			nc = cp+co+cibnt+uxp;
			this.getView().byId("input_Netclaims").setValue(nc);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calUnderwritingProfitLoss: function(){
			// set Underwriting Profit/(Loss)
			//Net Earned Premium  - Net Claims – Administrative Expenses - Net Fees and Commission Paid = Underwriting Profit/(Loss)
			var nep,nc,ae,nfcp,upl;
			nep = this.getView().byId("__inputNEP").getValue();
			nc = this.getView().byId("input_Netclaims").getValue();
			ae = this.getView().byId("input_AdminExpenses").getValue();
			nfcp = this.getView().byId("input_Netfeescommission").getValue();
			nep = parseFloat(nep) ? parseFloat(nep) : 0;
	    	nc = parseFloat(nc) ? parseFloat(nc) : 0;
	    	ae = parseFloat(ae) ? parseFloat(ae) : 0;
	    	nfcp = parseFloat(nfcp) ? parseFloat(nfcp) : 0;
			upl = nep-nc-ae-nfcp;
			this.getView().byId("input_Underwritingpl").setValue(upl);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calEarningsBeforeInterestAndTaxation: function(){
			// TO VERIFY IF FORMULAR IS CORRECT
			// set Earnings Before Interest and Taxation
			//Underwriting Profit/(Loss) + Investment Income + Other Income (Specify) - Management Expenses - Other Expenses (Specify) = Earnings Before Interest and Taxation 
			var upl,ii,oi,me,oe,ebit;
			upl = this.getView().byId("input_Underwritingpl").getValue();
			ii = this.getView().byId("input_Investincome").getValue();
			oi = this.getView().byId("input_Otherincome1").getValue();
			me = this.getView().byId("input_Managementexpense").getValue();
			oe = this.getView().byId("input_Otherexpense").getValue();
			upl = parseFloat(upl) ? parseFloat(upl) : 0;
	    	ii = parseFloat(ii) ? parseFloat(ii) : 0;
	    	oi = parseFloat(oi) ? parseFloat(oi) : 0;
	    	me = parseFloat(me) ? parseFloat(me) : 0;
	    	oe = parseFloat(oe) ? parseFloat(oe) : 0;
			ebit = upl+ii+oi-me-oe;
			this.getView().byId("input_Ebinteresttaxation").setValue(ebit);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calEarningsBeforeTaxation: function(){
			// TO VERIFY IF FORMULAR IS CORRECT
			// set Earnings Before Tax
			//Earnings Before Interest and Taxation - Interest = Earnings Before Tax
			var ebit,i,ebt;
			ebit = this.getView().byId("input_Ebinteresttaxation").getValue();
			i = this.getView().byId("input_Interest").getValue();
			ebit = parseFloat(ebit) ? parseFloat(ebit) : 0;
	    	i = parseFloat(i) ? parseFloat(i) : 0;
			ebt = ebit-i;
			this.getView().byId("input_Ebeforextax").setValue(ebt);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calEarningsAfterTaxation: function(){
			// set Earnings After Tax
			//Earnings Before Tax – Taxation = Earnings After Tax
			var ebt,t,eat;
			ebt = this.getView().byId("input_Ebeforextax").getValue();
			t = this.getView().byId("__inputT").getValue();
			ebt = parseFloat(ebt) ? parseFloat(ebt) : 0;
	    	t = parseFloat(t) ? parseFloat(t) : 0;
			eat = ebt-t;
			this.getView().byId("input_Eaftertax").setValue(eat);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calTotalComprehensiveProfitLossForPeriod: function(){
			// set Total Comprehensive Profit/(Loss) for the Period
			//Earnings After Tax + Other Comprehensive Income = Total Comprehensive Profit/(Loss) for the Period
			var eat,oci,tcplp;
			eat = this.getView().byId("input_Eaftertax").getValue();
			oci = this.getView().byId("input_Ocincome").getValue();
			eat = parseFloat(eat) ? parseFloat(eat) : 0;
	    	oci = parseFloat(oci) ? parseFloat(oci) : 0;
			tcplp = eat+oci;
			this.getView().byId("__inputTCPIP").setValue(eat);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calTotalComprehensiveProfitLossAttributableToShareholders: function(){
			// TO VERIFY IF FORMULAR IS CORRECT
			// set Total Comprehensive Profit/(Loss) Attributable to Shareholders
			//Total Comprehensive Profit/(Loss) for the Period - Transfer to Policyholder Funds = Total Comprehensive Profit/(Loss) Attributable to Shareholders
			var tcplp,tpf,tcplas;
			tcplp = this.getView().byId("__inputTCPIP").getValue();
			tpf = this.getView().byId("__inputTPF").getValue();
			tcplp = parseFloat(tcplp) ? parseFloat(tcplp) : 0;
	    	tpf = parseFloat(tpf) ? parseFloat(tpf) : 0;
			tcplas = tcplp-tpf;
			this.getView().byId("__inputTCPIAS").setValue(tcplas);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calTotalAssetsFinancialPosition: function(){
			// TODO Confirm with functional spec on Financial Position requirements
			// set Total (Assets)
			//Intangible Assets + Property and Equipment + Investments and Securities + Investment Assets + Any Other Non-Current Assets = Total (Assets)
			var ia,pe,is,inva,aonca,ta;
			ia = this.getView().byId("input_InterestA").getValue();
			pe = this.getView().byId("__inputPE").getValue();
			is = this.getView().byId("input_InterestS").getValue();
			inva = this.getView().byId("input_InterestNVA").getValue();
			aonca = this.getView().byId("__inputAONCA").getValue();
			ia = parseFloat(ia) ? parseFloat(ia) : 0;
	    	pe = parseFloat(pe) ? parseFloat(pe) : 0;
	    	is = parseFloat(is) ? parseFloat(is) : 0;
	    	inva = parseFloat(inva) ? parseFloat(inva) : 0;
	    	aonca = parseFloat(aonca) ? parseFloat(aonca) : 0;
			ta = ia+pe+is+inva+aonca;
			this.getView().byId("input_Totalassets").setValue(ta);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calExcessOfAssetsOverLiabilities: function(){
			// set Excess of Assets over Liabilities
			//Total Assets – Total Liabilities = Excess of Assets over Liabilities 
			var ta,tl,eoaol;
			ta = this.getView().byId("input_Totalassets").getValue();
			tl = this.getView().byId("input_Totalliabilities1").getValue();
			ta = parseFloat(ta) ? parseFloat(ta) : 0;
	    	tl = parseFloat(tl) ? parseFloat(tl) : 0;
			eoaol = ta-tl;
			this.getView().byId("input_Excessaoliabilities").setValue(eoaol);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calNetPremiumIncome: function(){
			// set Net Premium Income
			//Net Premium Income = Gross Premium Written – Reassurance
			var gpws,r,npi;
			gpws = this.getView().byId("input_Grosspw").getValue();
			r = this.getView().byId("input_Reassurance").getValue();
			gpws = parseFloat(gpws) ? parseFloat(gpws) : 0;
	    	r = parseFloat(r) ? parseFloat(r) : 0;
			npi = gpws-r;
			this.getView().byId("input_Netpincome").setValue(npi);
			this._cal025NetPremiumIncome();
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_cal025NetPremiumIncome: function(){
			// set 25% of Net Premium 
			//25% of Net Premium = 0.25 * Net Premium Income 
			var npi,npi025;
			npi = this.getView().byId("input_Netpincome").getValue();
	    	npi = parseFloat(npi) ? parseFloat(npi) : 0;
			npi025 = 0.25*npi;
			this.getView().byId("__inputNPI025").setValue(npi025);
			this._calSolvencyMargin();
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calShareholdersFunds: function(){
			//TODO VERIFY FORMULA it is inconsistent
			// set Shareholders Funds
			//Shareholder Funds + Excess of Assets over Liabilities = Shareholders Funds
			var sfs,eoaol,sf;
			eoaol = this.getView().byId("input_Excessaoliabilities").getValue();
	    	eoaol = parseFloat(eoaol) ? parseFloat(eoaol) : 0;
			sf = eoaol;
			this.getView().byId("input_Shareholderfund").setValue(sf);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calSafetyMargin: function(){
			//TODO VERIFY FORMULA it is inconsistent
			// set Safety Margin
			//Safety Margin  + Shareholder Funds – 25% of Net Premium = Safety Margin 
			var sf,npi025,sm;
			npi025 = this.getView().byId("__inputNPI025").getValue();
			sf = this.getView().byId("input_Shareholderfund").getValue();
	    	npi025 = parseFloat(npi025) ? parseFloat(npi025) : 0;
	    	sf = parseFloat(sf) ? parseFloat(sf) : 0;
			sm = sf-npi025;
			this.getView().byId("input_Safetymargin").setValue(sm);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calSolvencyMargin: function(){
			//TODO VERIFY FORMULA it is inconsistent since % is division by 100
			// set % Solvency Margin
			//% Solvency Margin = Excess of Assets Over Liabilities / Net Premium Income
			var eoaol,npi,psm;
			eoaol = this.getView().byId("input_Excessaoliabilities").getValue();
			npi = this.getView().byId("input_Netpincome").getValue();
	    	eoaol = parseFloat(eoaol) ? parseFloat(eoaol) : 0;
	    	npi = parseFloat(npi) ? parseFloat(npi) : 0;
			psm = (eoaol/npi);
			this.getView().byId("input_Solvencymargin").setValue(psm);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		
		// -------Breakdown by Class of Business (Individual Life) CODE BELOW-------------
		
		_calBrokersTotalPolicies: function(){
			// set Brokers Total Policies(Individual Life)
			//Brokers-> Number of Policies for new Business + Number of policies for recurring premium = Sub Total
			var npnb,nprp,st;
			npnb = this.getView().byId("input_Inewbusinessbnp").getValue();
			nprp = this.getView().byId("__inputNPRP").getValue();
	    	npnb = parseFloat(npnb) ? parseFloat(npnb) : 0;
	    	nprp = parseFloat(nprp) ? parseFloat(nprp) : 0;
			st = npnb+nprp;
			this.getView().byId("input_Isubtotalbnp").setValue(st);
			this._calTotalsIndividual();
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calBrokersTotalGrossPremium: function(){
			// set Brokers Total Gross Premium (Individual Life)
			//Brokers -> Gross Premium for new business + Gross Premium for recurring premium = Sub Total
			var gpnb,gprp,st;
			gpnb = this.getView().byId("input_Inewbusinessbgp").getValue();
			gprp = this.getView().byId("input_Ireccuringbgp").getValue();
	    	gpnb = parseFloat(gpnb) ? parseFloat(gpnb) : 0;
	    	gprp = parseFloat(gprp) ? parseFloat(gprp) : 0;
			st = gpnb+gprp;
			this.getView().byId("input_Isubtotalbgp").setValue(st);
			this._calTotalsIndividual();
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calAgentsTotalPolicies: function(){
			// set Agents Total Policies(Individual Life)
			//Agents = Number of Policies for new Business + Number of policies for recurring premium = Sub Total
			var npnba,nprpa,sta;
			npnba = this.getView().byId("input_Inewbusinessanp").getValue();
			nprpa = this.getView().byId("input_Ireccuringanp").getValue();
	    	npnba = parseFloat(npnba) ? parseFloat(npnba) : 0;
	    	nprpa = parseFloat(nprpa) ? parseFloat(nprpa) : 0;
			sta = npnba+nprpa;
			this.getView().byId("input_Isubtotalanp").setValue(sta);
			this._calTotalsIndividual();
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calAgentsTotalGrossPremium: function(){
			// set Agents Total Gross Premium (Individual Life)
			//Agents -> Gross Premium for new business + Gross Premium for recurring premium = Sub Total
			var gpnb,gprp,st;
			gpnb = this.getView().byId("input_Inewbusinessagp").getValue();
			gprp = this.getView().byId("input_Ireccuringagp").getValue();
	    	gpnb = parseFloat(gpnb) ? parseFloat(gpnb) : 0;
	    	gprp = parseFloat(gprp) ? parseFloat(gprp) : 0;
			st = gpnb+gprp;
			this.getView().byId("input_Isubtotalagp").setValue(st);
			this._calTotalsIndividual();
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calDirectClientsTotalPolicies: function(){
			// set Direct Clients Total Policies(Individual Life)
			//Direct Clients = Number of Policies for new Business + Number of policies for recurring premium = Sub Total
			var npnba,nprpa,sta;
			npnba = this.getView().byId("input_Inewbusinessdcnp").getValue();
			nprpa = this.getView().byId("input_Ireccuringdcnp").getValue();
	    	npnba = parseFloat(npnba) ? parseFloat(npnba) : 0;
	    	nprpa = parseFloat(nprpa) ? parseFloat(nprpa) : 0;
			sta = npnba+nprpa;
			this.getView().byId("input_Isubtotaldcnp").setValue(sta);
			this._calTotalsIndividual();
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calDirectClientsTotalGrossPremium: function(){
			// set Direct Clients Total Gross Premium (Individual Life)
			//Direct Clients -> Gross Premium for new business + Gross Premium for recurring premium = Sub Total
			var gpnb,gprp,st;
			gpnb = this.getView().byId("input_Inewbusinessdcgp").getValue();
			gprp = this.getView().byId("input_Ireccuringdcgp").getValue();
	    	gpnb = parseFloat(gpnb) ? parseFloat(gpnb) : 0;
	    	gprp = parseFloat(gprp) ? parseFloat(gprp) : 0;
			st = gpnb+gprp;
			this.getView().byId("input_Isubtotaldcgp").setValue(st);
			this._calTotalsIndividual();
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calNewBusinessTotalPolicies: function(){
			// set New Business Total Policies(Individual Life)
			//Brokers Number of Policies for new Business + Agents Number of Policies for new Business + Direct Clients Number of Policies for new Business = Sub Total
			var npnbb,npnba,npndc,st;
			npnbb = this.getView().byId("input_Inewbusinessbnp").getValue();
			npnba = this.getView().byId("input_Inewbusinessanp").getValue();
			npndc = this.getView().byId("input_Inewbusinessdcnp").getValue();
	    	npnbb = parseFloat(npnbb) ? parseFloat(npnbb) : 0;
	    	npnba = parseFloat(npnba) ? parseFloat(npnba) : 0;
	    	npndc = parseFloat(npndc) ? parseFloat(npndc) : 0;
			st = npnbb+npnba+npndc;
			this.getView().byId("input_Inewbusinesstnp").setValue(st);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calNewBusinessTotalGrossPremium: function(){
			// set New Business Total Gross Premium(Individual Life)
			//Brokers Number of Gross Premium for new Business + Agents Number of Gross Premium for new Business + Direct Clients Number of Gross Premium for new Business = Sub Total
			var gpnbb,gpnba,gpndc,st;
			gpnbb = this.getView().byId("input_Inewbusinessbgp").getValue();
			gpnba = this.getView().byId("input_Inewbusinessagp").getValue();
			gpndc = this.getView().byId("input_Inewbusinessdcgp").getValue();
	    	gpnbb = parseFloat(gpnbb) ? parseFloat(gpnbb) : 0;
	    	gpnba = parseFloat(gpnba) ? parseFloat(gpnba) : 0;
	    	gpndc = parseFloat(gpndc) ? parseFloat(gpndc) : 0;
			st = gpnbb+gpnba+gpndc;
			this.getView().byId("input_Inewbusinesstgp").setValue(st);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calRecurringPremiumsTotalPolicies: function(){
			// set Recurring Premiums Total Policies(Individual Life)
			//Brokers Number of Policies for Recurring Premiums + Agents Number of Policies for Recurring Premiums + Direct Clients Number of Policies for Recurring Premiums = Sub Total
			var npnbb,npnba,npndc,st;
			npnbb = this.getView().byId("__inputNPRP").getValue();
			npnba = this.getView().byId("input_Ireccuringanp").getValue();
			npndc = this.getView().byId("input_Ireccuringdcnp").getValue();
	    	npnbb = parseFloat(npnbb) ? parseFloat(npnbb) : 0;
	    	npnba = parseFloat(npnba) ? parseFloat(npnba) : 0;
	    	npndc = parseFloat(npndc) ? parseFloat(npndc) : 0;
			st = npnbb+npnba+npndc;
			this.getView().byId("input_Ireccuringtnp").setValue(st);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calRecurringPremiumsTotalGrossPremium: function(){
			// set Recurring Premiums Total Gross Premium(Individual Life)
			//Brokers Number of Gross Premium for Recurring Premiums + Agents Number of Gross Premium for Recurring Premiums + Direct Clients Number of Gross Premium for Recurring Premiums = Sub Total
			var gpnbb,gpnba,gpndc,st;
			gpnbb = this.getView().byId("input_Ireccuringbgp").getValue();
			gpnba = this.getView().byId("input_Ireccuringagp").getValue();
			gpndc = this.getView().byId("input_Ireccuringdcgp").getValue();
	    	gpnbb = parseFloat(gpnbb) ? parseFloat(gpnbb) : 0;
	    	gpnba = parseFloat(gpnba) ? parseFloat(gpnba) : 0;
	    	gpndc = parseFloat(gpndc) ? parseFloat(gpndc) : 0;
			st = gpnbb+gpnba+gpndc;
			this.getView().byId("input_Ireccuringtgp").setValue(st);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calGrossTotalPoliciesIndividual: function(){
			// set Gross Total Policies(Individual Life)
			//Total Policies for New Business + Total Policies for Recurring Premiums = Gross Total Policies
			var npnbb,npnba,st;
			npnbb = this.getView().byId("input_Inewbusinesstnp").getValue();
			npnba = this.getView().byId("input_Ireccuringtnp").getValue();
	    	npnbb = parseFloat(npnbb) ? parseFloat(npnbb) : 0;
	    	npnba = parseFloat(npnba) ? parseFloat(npnba) : 0;
			st = npnbb+npnba;
			this.getView().byId("input_Isubtotaltnp").setValue(st);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calGrossTotalGrossPremiumIndividual: function(){
			// set Gross Total Gross Premium(Individual Life)
			//Total Gross Premium for New Business + Total Gross Premium for Recurring Premiums = Gross Total Gross Premium
			var gpnbb,gpnba,st;
			gpnbb = this.getView().byId("input_Inewbusinesstgp").getValue();
			gpnba = this.getView().byId("input_Ireccuringtgp").getValue();
	    	gpnbb = parseFloat(gpnbb) ? parseFloat(gpnbb) : 0;
	    	gpnba = parseFloat(gpnba) ? parseFloat(gpnba) : 0;
			st = gpnbb+gpnba;
			this.getView().byId("input_Isubtotaltgp").setValue(st);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calTotalsIndividual: function(){
			this._calNewBusinessTotalPolicies();
			this._calNewBusinessTotalGrossPremium();
			this._calRecurringPremiumsTotalPolicies();
			this._calRecurringPremiumsTotalGrossPremium();
			this._calGrossTotalPoliciesIndividual();
			this._calGrossTotalGrossPremiumIndividual();
		}
		// ------Employee Benefits/Corporates/Group Life Assurance CODE BELOW-------
		
		,
		_calBrokersTotalPoliciesEmployee: function(){
			// set Brokers Total Policies(Individual Life)
			//Brokers-> Number of Policies for new Business + Number of policies for recurring premium = Sub Total
			var npnb,nprp,st;
			npnb = this.getView().byId("input_Enewbusinessbnp").getValue();
			nprp = this.getView().byId("__inputNPRPE").getValue();
	    	npnb = parseFloat(npnb) ? parseFloat(npnb) : 0;
	    	nprp = parseFloat(nprp) ? parseFloat(nprp) : 0;
			st = npnb+nprp;
			this.getView().byId("input_Esubtotalbnp").setValue(st);
			this._calTotalsEmployee();
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calBrokersTotalGrossPremiumEmployee: function(){
			// set Brokers Total Gross Premium (Individual Life)
			//Brokers -> Gross Premium for new business + Gross Premium for recurring premium = Sub Total
			var gpnb,gprp,st;
			gpnb = this.getView().byId("input_Enewbusinessbgp").getValue();
			gprp = this.getView().byId("input_Ereccuringbgp").getValue();
	    	gpnb = parseFloat(gpnb) ? parseFloat(gpnb) : 0;
	    	gprp = parseFloat(gprp) ? parseFloat(gprp) : 0;
			st = gpnb+gprp;
			this.getView().byId("input_Esubtotalbgp").setValue(st);
			this._calTotalsEmployee();
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calAgentsTotalPoliciesEmployee: function(){
			// set Agents Total Policies(Individual Life)
			//Agents = Number of Policies for new Business + Number of policies for recurring premium = Sub Total
			var npnba,nprpa,sta;
			npnba = this.getView().byId("input_Enewbusinessanp").getValue();
			nprpa = this.getView().byId("input_Ereccuringanp").getValue();
	    	npnba = parseFloat(npnba) ? parseFloat(npnba) : 0;
	    	nprpa = parseFloat(nprpa) ? parseFloat(nprpa) : 0;
			sta = npnba+nprpa;
			this.getView().byId("input_Esubtotalanp").setValue(sta);
			this._calTotalsEmployee();
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calAgentsTotalGrossPremiumEmployee: function(){
			// set Agents Total Gross Premium (Individual Life)
			//Agents -> Gross Premium for new business + Gross Premium for recurring premium = Sub Total
			var gpnb,gprp,st;
			gpnb = this.getView().byId("input_Enewbusinessagp").getValue();
			gprp = this.getView().byId("input_Ereccuringagp").getValue();
	    	gpnb = parseFloat(gpnb) ? parseFloat(gpnb) : 0;
	    	gprp = parseFloat(gprp) ? parseFloat(gprp) : 0;
			st = gpnb+gprp;
			this.getView().byId("input_Esubtotalagp").setValue(st);
			this._calTotalsEmployee();
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calDirectClientsTotalPoliciesEmployee: function(){
			// set Direct Clients Total Policies(Individual Life)
			//Direct Clients = Number of Policies for new Business + Number of policies for recurring premium = Sub Total
			var npnba,nprpa,sta;
			npnba = this.getView().byId("input_Enewbusinessdcnp").getValue();
			nprpa = this.getView().byId("input_Ereccuringdcnp").getValue();
	    	npnba = parseFloat(npnba) ? parseFloat(npnba) : 0;
	    	nprpa = parseFloat(nprpa) ? parseFloat(nprpa) : 0;
			sta = npnba+nprpa;
			this.getView().byId("input_Esubtotaldcnp").setValue(sta);
			this._calTotalsEmployee();
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calDirectClientsTotalGrossPremiumEmployee: function(){
			// set Direct Clients Total Gross Premium (Individual Life)
			//Direct Clients -> Gross Premium for new business + Gross Premium for recurring premium = Sub Total
			var gpnb,gprp,st;
			gpnb = this.getView().byId("input_Enewbusinessdcgp").getValue();
			gprp = this.getView().byId("input_Ereccuringdcgp").getValue();
	    	gpnb = parseFloat(gpnb) ? parseFloat(gpnb) : 0;
	    	gprp = parseFloat(gprp) ? parseFloat(gprp) : 0;
			st = gpnb+gprp;
			this.getView().byId("input_Esubtotaldcgp").setValue(st);
			this._calTotalsEmployee();
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calNewBusinessTotalPoliciesEmployee: function(){
			// set New Business Total Policies(Individual Life)
			//Brokers Number of Policies for new Business + Agents Number of Policies for new Business + Direct Clients Number of Policies for new Business = Sub Total
			var npnbb,npnba,npndc,st;
			npnbb = this.getView().byId("input_Enewbusinessbnp").getValue();
			npnba = this.getView().byId("input_Enewbusinessanp").getValue();
			npndc = this.getView().byId("input_Enewbusinessdcnp").getValue();
	    	npnbb = parseFloat(npnbb) ? parseFloat(npnbb) : 0;
	    	npnba = parseFloat(npnba) ? parseFloat(npnba) : 0;
	    	npndc = parseFloat(npndc) ? parseFloat(npndc) : 0;
			st = npnbb+npnba+npndc;
			this.getView().byId("input_Enewbusinesstnp").setValue(st);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calNewBusinessTotalGrossPremiumEmployee: function(){
			// set New Business Total Gross Premium(Individual Life)
			//Brokers Number of Gross Premium for new Business + Agents Number of Gross Premium for new Business + Direct Clients Number of Gross Premium for new Business = Sub Total
			var gpnbb,gpnba,gpndc,st;
			gpnbb = this.getView().byId("input_Enewbusinessbgp").getValue();
			gpnba = this.getView().byId("input_Enewbusinessagp").getValue();
			gpndc = this.getView().byId("input_Enewbusinessdcgp").getValue();
	    	gpnbb = parseFloat(gpnbb) ? parseFloat(gpnbb) : 0;
	    	gpnba = parseFloat(gpnba) ? parseFloat(gpnba) : 0;
	    	gpndc = parseFloat(gpndc) ? parseFloat(gpndc) : 0;
			st = gpnbb+gpnba+gpndc;
			this.getView().byId("input_Enewbusinesstgp").setValue(st);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calRecurringPremiumsTotalPoliciesEmployee: function(){
			// set Recurring Premiums Total Policies(Individual Life)
			//Brokers Number of Policies for Recurring Premiums + Agents Number of Policies for Recurring Premiums + Direct Clients Number of Policies for Recurring Premiums = Sub Total
			var npnbb,npnba,npndc,st;
			npnbb = this.getView().byId("__inputNPRPE").getValue();
			npnba = this.getView().byId("input_Ereccuringanp").getValue();
			npndc = this.getView().byId("input_Ereccuringdcnp").getValue();
	    	npnbb = parseFloat(npnbb) ? parseFloat(npnbb) : 0;
	    	npnba = parseFloat(npnba) ? parseFloat(npnba) : 0;
	    	npndc = parseFloat(npndc) ? parseFloat(npndc) : 0;
			st = npnbb+npnba+npndc;
			this.getView().byId("input_Ereccuringtnp").setValue(st);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calRecurringPremiumsTotalGrossPremiumEmployee: function(){
			// set Recurring Premiums Total Gross Premium(Individual Life)
			//Brokers Number of Gross Premium for Recurring Premiums + Agents Number of Gross Premium for Recurring Premiums + Direct Clients Number of Gross Premium for Recurring Premiums = Sub Total
			var gpnbb,gpnba,gpndc,st;
			gpnbb = this.getView().byId("input_Ereccuringbgp").getValue();
			gpnba = this.getView().byId("input_Ereccuringagp").getValue();
			gpndc = this.getView().byId("input_Ereccuringdcgp").getValue();
	    	gpnbb = parseFloat(gpnbb) ? parseFloat(gpnbb) : 0;
	    	gpnba = parseFloat(gpnba) ? parseFloat(gpnba) : 0;
	    	gpndc = parseFloat(gpndc) ? parseFloat(gpndc) : 0;
			st = gpnbb+gpnba+gpndc;
			this.getView().byId("input_IreccuringtgpE").setValue(st);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calGrossTotalPoliciesEmployee: function(){
			// set Gross Total Policies(Individual Life)
			//Total Policies for New Business + Total Policies for Recurring Premiums = Gross Total Policies
			var npnbb,npnba,st;
			npnbb = this.getView().byId("input_Enewbusinesstnp").getValue();
			npnba = this.getView().byId("input_Ereccuringtnp").getValue();
	    	npnbb = parseFloat(npnbb) ? parseFloat(npnbb) : 0;
	    	npnba = parseFloat(npnba) ? parseFloat(npnba) : 0;
			st = npnbb+npnba;
			this.getView().byId("input_Esubtotaltnp").setValue(st);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calGrossTotalGrossPremiumEmployee: function(){
			// set Gross Total Gross Premium(Individual Life)
			//Total Gross Premium for New Business + Total Gross Premium for Recurring Premiums = Gross Total Gross Premium
			var gpnbb,gpnba,st;
			gpnbb = this.getView().byId("input_Enewbusinesstgp").getValue();
			gpnba = this.getView().byId("input_IreccuringtgpE").getValue();
	    	gpnbb = parseFloat(gpnbb) ? parseFloat(gpnbb) : 0;
	    	gpnba = parseFloat(gpnba) ? parseFloat(gpnba) : 0;
			st = gpnbb+gpnba;
			this.getView().byId("input_Esubtotaltgp").setValue(st);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calTotalGrossPremiumWrittenEmployee: function(){
			// Brokers Policies
			// input_Isubtotalbnp + input_Esubtotalbnp = __inputTGPWPBE
			
			var stp,stpe,TGPWPBE;
			stp = this.getView().byId("input_Isubtotalbnp").getValue();
			stpe = this.getView().byId("input_Esubtotalbnp").getValue();
	    	stp = parseFloat(stp) ? parseFloat(stp) : 0;
	    	stpe = parseFloat(stpe) ? parseFloat(stpe) : 0;
			TGPWPBE = stp+stpe;
			this.getView().byId("__inputTGPWPBE").setValue(TGPWPBE);
			
			// Brokers GrossPremium
			// input_Isubtotalbgp + input_Esubtotalbgp = __inputTGPWGPBE
			
			var STGP,STGPE,TGPWGPBE;
			STGP = this.getView().byId("input_Isubtotalbgp").getValue();
			STGPE = this.getView().byId("input_Esubtotalbgp").getValue();
	    	STGP = parseFloat(STGP) ? parseFloat(STGP) : 0;
	    	STGPE = parseFloat(STGPE) ? parseFloat(STGPE) : 0;
			TGPWGPBE = STGP+STGPE;
			this.getView().byId("__inputTGPWGPBE").setValue(TGPWGPBE);
			
			// Agents Policies
			// input_Isubtotalanp + input_Esubtotalanp = __inputTGPWPAE
			
			var STPA,STPAE,TGPWPAE;
			STPA = this.getView().byId("input_Isubtotalanp").getValue();
			STPAE = this.getView().byId("input_Esubtotalanp").getValue();
	    	STPA = parseFloat(STPA) ? parseFloat(STPA) : 0;
	    	STPAE = parseFloat(STPAE) ? parseFloat(STPAE) : 0;
			TGPWPAE = STPA+STPAE;
			this.getView().byId("__inputTGPWPAE").setValue(TGPWPAE);
			
			// Agents GrossPremium
			// input_Isubtotalagp + input_Esubtotalagp = __inputTGPWGPAE
			
			var STGPA,STGPAE,TGPWGPAE;
			STGPA = this.getView().byId("input_Isubtotalagp").getValue();
			STGPAE = this.getView().byId("input_Esubtotalagp").getValue();
	    	STGPA = parseFloat(STGPA) ? parseFloat(STGPA) : 0;
	    	STGPAE = parseFloat(STGPAE) ? parseFloat(STGPAE) : 0;
			TGPWGPAE = STGPA+STGPAE;
			this.getView().byId("__inputTGPWGPAE").setValue(TGPWGPAE);
			
			// Direct Clients Policies
			// input_Isubtotaldcnp + input_Esubtotaldcnp = __inputTGPWPDCE
			
			var STPDC,STPDCE,TGPWPDCE;
			STPDC = this.getView().byId("input_Isubtotaldcnp").getValue();
			STPDCE = this.getView().byId("input_Esubtotaldcnp").getValue();
	    	STPDC = parseFloat(STPDC) ? parseFloat(STPDC) : 0;
	    	STPDCE = parseFloat(STPDCE) ? parseFloat(STPDCE) : 0;
			TGPWPDCE = STPDC+STPDCE;
			this.getView().byId("__inputTGPWPDCE").setValue(TGPWPDCE);
			
			// Direct Clients GrossPremium
			// input_Isubtotaldcgp + input_Esubtotaldcgp = __inputTGPWGPDCE
			
			var STGPDC,STGPDCE,TGPWGPDCE;
			STGPDC = this.getView().byId("input_Isubtotaldcgp").getValue();
			STGPDCE = this.getView().byId("input_Esubtotaldcgp").getValue();
	    	STGPDC = parseFloat(STGPDC) ? parseFloat(STGPDC) : 0;
	    	STGPDCE = parseFloat(STGPDCE) ? parseFloat(STGPDCE) : 0;
			TGPWGPDCE = STGPDC+STGPDCE;
			this.getView().byId("__inputTGPWGPDCE").setValue(TGPWGPDCE);
			
			// Total Policies
			// input_Isubtotaltnp + input_Esubtotaltnp = __inputTGPWPTE
			
			var GTP,GTPE,TGPWPTE;
			GTP = this.getView().byId("input_Isubtotaltnp").getValue();
			GTPE = this.getView().byId("input_Esubtotaltnp").getValue();
	    	GTP = parseFloat(GTP) ? parseFloat(GTP) : 0;
	    	GTPE = parseFloat(GTPE) ? parseFloat(GTPE) : 0;
			TGPWPTE = GTP+GTPE;
			this.getView().byId("__inputTGPWPTE").setValue(TGPWPTE);
			
			// Total GrossPremium
			// input_Isubtotaltgp + input_Esubtotaltgp = __inputTGPWGPTE
			
			var GTGP,GTGPE,TGPWGPTE;
			GTGP = this.getView().byId("input_Isubtotaltgp").getValue();
			GTGPE = this.getView().byId("input_Esubtotaltgp").getValue();
	    	GTGP = parseFloat(GTGP) ? parseFloat(GTGP) : 0;
	    	GTGPE = parseFloat(GTGPE) ? parseFloat(GTGPE) : 0;
			TGPWGPTE = GTGP+GTGPE;
			this.getView().byId("__inputTGPWGPTE").setValue(TGPWGPTE);
			
		},
		_calTotalsEmployee: function(){
			this._calNewBusinessTotalPoliciesEmployee();
			this._calNewBusinessTotalGrossPremiumEmployee();
			this._calRecurringPremiumsTotalPoliciesEmployee();
			this._calRecurringPremiumsTotalGrossPremiumEmployee();
			this._calGrossTotalPoliciesEmployee();
			this._calGrossTotalGrossPremiumEmployee();
			this._calTotalGrossPremiumWrittenEmployee();
		},
		// ------------------------Breakdown of Not Taken Up Policies During the Quarter CODE BELOW--------------------------------
		
		_calBrokersTotalPoliciesNot: function(){
			// set Brokers Total Policies(Individual Life)
			//Brokers-> Number of Policies for new Business + Number of policies for recurring premium = Sub Total
			var npnb,nprp,st;
			npnb = this.getView().byId("input_InewbusinessbnpN").getValue();
			nprp = this.getView().byId("__inputNPRPN").getValue();
	    	npnb = parseFloat(npnb) ? parseFloat(npnb) : 0;
	    	nprp = parseFloat(nprp) ? parseFloat(nprp) : 0;
			st = npnb+nprp;
			this.getView().byId("input_IsubtotalbnpN").setValue(st);
			this._calTotalsNot();
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calBrokersTotalGrossPremiumNot: function(){
			// set Brokers Total Gross Premium (Individual Life)
			//Brokers -> Gross Premium for new business + Gross Premium for recurring premium = Sub Total
			var gpnb,gprp,st;
			gpnb = this.getView().byId("input_InewbusinessbgpN").getValue();
			gprp = this.getView().byId("input_IreccuringbgpN").getValue();
	    	gpnb = parseFloat(gpnb) ? parseFloat(gpnb) : 0;
	    	gprp = parseFloat(gprp) ? parseFloat(gprp) : 0;
			st = gpnb+gprp;
			this.getView().byId("input_IsubtotalbgpN").setValue(st);
			this._calTotalsNot();
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calAgentsTotalPoliciesNot: function(){
			// set Agents Total Policies(Individual Life)
			//Agents = Number of Policies for new Business + Number of policies for recurring premium = Sub Total
			var npnba,nprpa,sta;
			npnba = this.getView().byId("input_InewbusinessanpN").getValue();
			nprpa = this.getView().byId("input_IreccuringanpN").getValue();
	    	npnba = parseFloat(npnba) ? parseFloat(npnba) : 0;
	    	nprpa = parseFloat(nprpa) ? parseFloat(nprpa) : 0;
			sta = npnba+nprpa;
			this.getView().byId("input_IsubtotalanpN").setValue(sta);
			this._calTotalsNot();
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calAgentsTotalGrossPremiumNot: function(){
			// set Agents Total Gross Premium (Individual Life)
			//Agents -> Gross Premium for new business + Gross Premium for recurring premium = Sub Total
			var gpnb,gprp,st;
			gpnb = this.getView().byId("input_InewbusinessagpN").getValue();
			gprp = this.getView().byId("input_IreccuringagpN").getValue();
	    	gpnb = parseFloat(gpnb) ? parseFloat(gpnb) : 0;
	    	gprp = parseFloat(gprp) ? parseFloat(gprp) : 0;
			st = gpnb+gprp;
			this.getView().byId("input_IsubtotalagpN2").setValue(st);
			this._calTotalsNot();
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calDirectClientsTotalPoliciesNot: function(){
			// set Direct Clients Total Policies(Individual Life)
			//Direct Clients = Number of Policies for new Business + Number of policies for recurring premium = Sub Total
			var npnba,nprpa,sta;
			npnba = this.getView().byId("input_InewbusinessdcnpN").getValue();
			nprpa = this.getView().byId("input_IreccuringdcnpN").getValue();
	    	npnba = parseFloat(npnba) ? parseFloat(npnba) : 0;
	    	nprpa = parseFloat(nprpa) ? parseFloat(nprpa) : 0;
			sta = npnba+nprpa;
			this.getView().byId("input_IsubtotaldcnpN").setValue(sta);
			this._calTotalsNot();
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calDirectClientsTotalGrossPremiumNot: function(){
			// set Direct Clients Total Gross Premium (Individual Life)
			//Direct Clients -> Gross Premium for new business + Gross Premium for recurring premium = Sub Total
			var gpnb,gprp,st;
			gpnb = this.getView().byId("input_InewbusinessdcgpN").getValue();
			gprp = this.getView().byId("input_IreccuringdcgpN").getValue();
	    	gpnb = parseFloat(gpnb) ? parseFloat(gpnb) : 0;
	    	gprp = parseFloat(gprp) ? parseFloat(gprp) : 0;
			st = gpnb+gprp;
			this.getView().byId("input_IsubtotaldcgpN").setValue(st);
			this._calTotalsNot();
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calNewBusinessTotalPoliciesNot: function(){
			// set New Business Total Policies(Individual Life)
			//Brokers Number of Policies for new Business + Agents Number of Policies for new Business + Direct Clients Number of Policies for new Business = Sub Total
			var npnbb,npnba,npndc,st;
			npnbb = this.getView().byId("input_InewbusinessbnpN").getValue();
			npnba = this.getView().byId("input_InewbusinessanpN").getValue();
			npndc = this.getView().byId("input_InewbusinessdcnpN").getValue();
	    	npnbb = parseFloat(npnbb) ? parseFloat(npnbb) : 0;
	    	npnba = parseFloat(npnba) ? parseFloat(npnba) : 0;
	    	npndc = parseFloat(npndc) ? parseFloat(npndc) : 0;
			st = npnbb+npnba+npndc;
			this.getView().byId("input_InewbusinesstnpN").setValue(st);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calNewBusinessTotalGrossPremiumNot: function(){
			// set New Business Total Gross Premium(Individual Life)
			//Brokers Number of Gross Premium for new Business + Agents Number of Gross Premium for new Business + Direct Clients Number of Gross Premium for new Business = Sub Total
			var gpnbb,gpnba,gpndc,st;
			gpnbb = this.getView().byId("input_InewbusinessbgpN").getValue();
			gpnba = this.getView().byId("input_InewbusinessagpN").getValue();
			gpndc = this.getView().byId("input_InewbusinessdcgpN").getValue();
	    	gpnbb = parseFloat(gpnbb) ? parseFloat(gpnbb) : 0;
	    	gpnba = parseFloat(gpnba) ? parseFloat(gpnba) : 0;
	    	gpndc = parseFloat(gpndc) ? parseFloat(gpndc) : 0;
			st = gpnbb+gpnba+gpndc;
			this.getView().byId("input_InewbusinesstgpN").setValue(st);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calRecurringPremiumsTotalPoliciesNot: function(){
			// set Recurring Premiums Total Policies(Individual Life)
			//Brokers Number of Policies for Recurring Premiums + Agents Number of Policies for Recurring Premiums + Direct Clients Number of Policies for Recurring Premiums = Sub Total
			var npnbb,npnba,npndc,st;
			npnbb = this.getView().byId("__inputNPRPN").getValue();
			npnba = this.getView().byId("input_IreccuringanpN").getValue();
			npndc = this.getView().byId("input_IreccuringdcnpN").getValue();
	    	npnbb = parseFloat(npnbb) ? parseFloat(npnbb) : 0;
	    	npnba = parseFloat(npnba) ? parseFloat(npnba) : 0;
	    	npndc = parseFloat(npndc) ? parseFloat(npndc) : 0;
			st = npnbb+npnba+npndc;
			this.getView().byId("input_IreccuringtnpN").setValue(st);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calRecurringPremiumsTotalGrossPremiumNot: function(){
			// set Recurring Premiums Total Gross Premium(Individual Life)
			//Brokers Number of Gross Premium for Recurring Premiums + Agents Number of Gross Premium for Recurring Premiums + Direct Clients Number of Gross Premium for Recurring Premiums = Sub Total
			var gpnbb,gpnba,gpndc,st;
			gpnbb = this.getView().byId("input_IreccuringbgpN").getValue();
			gpnba = this.getView().byId("input_IreccuringagpN").getValue();
			gpndc = this.getView().byId("input_IreccuringdcgpN").getValue();
	    	gpnbb = parseFloat(gpnbb) ? parseFloat(gpnbb) : 0;
	    	gpnba = parseFloat(gpnba) ? parseFloat(gpnba) : 0;
	    	gpndc = parseFloat(gpndc) ? parseFloat(gpndc) : 0;
			st = gpnbb+gpnba+gpndc;
			this.getView().byId("input_IreccuringtgpN").setValue(st);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calGrossTotalPoliciesNot: function(){
			// set Gross Total Policies(Individual Life)
			//Total Policies for New Business + Total Policies for Recurring Premiums = Gross Total Policies
			var npnbb,npnba,st;
			npnbb = this.getView().byId("input_InewbusinesstnpN").getValue();
			npnba = this.getView().byId("input_IreccuringtnpN").getValue();
	    	npnbb = parseFloat(npnbb) ? parseFloat(npnbb) : 0;
	    	npnba = parseFloat(npnba) ? parseFloat(npnba) : 0;
			st = npnbb+npnba;
			this.getView().byId("input_IsubtotaltnpN").setValue(st);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calGrossTotalGrossPremiumNot: function(){
			// set Gross Total Gross Premium(Individual Life)
			//Total Gross Premium for New Business + Total Gross Premium for Recurring Premiums = Gross Total Gross Premium
			var gpnbb,gpnba,st;
			gpnbb = this.getView().byId("input_InewbusinesstgpN").getValue();
			gpnba = this.getView().byId("input_IreccuringtgpN").getValue();
	    	gpnbb = parseFloat(gpnbb) ? parseFloat(gpnbb) : 0;
	    	gpnba = parseFloat(gpnba) ? parseFloat(gpnba) : 0;
			st = gpnbb+gpnba;
			this.getView().byId("input_IsubtotaltgpN").setValue(st);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calTotalsNot: function(){
			this._calNewBusinessTotalPoliciesNot();
			this._calNewBusinessTotalGrossPremiumNot();
			this._calRecurringPremiumsTotalPoliciesNot();
			this._calRecurringPremiumsTotalGrossPremiumNot();
			this._calGrossTotalPoliciesNot();
			this._calGrossTotalGrossPremiumNot();
		},
		
		// --------------------------------------Lapsed Policies During the Quarter CODE BELOW-----------------------------------------
		
		_calLapsePoliciesBegin: function(){
			// No. of Lapsable Policies at the Beginning of the Quarter
			var npnba,nprpa,sta;
			npnba = this.getView().byId("__inputLPBQI").getValue();
			nprpa = this.getView().byId("__inputLPBQE").getValue();
	    	npnba = parseFloat(npnba) ? parseFloat(npnba) : 0;
	    	nprpa = parseFloat(nprpa) ? parseFloat(nprpa) : 0;
			sta = npnba+nprpa;
			this.getView().byId("__inputLPBQT").setValue(sta);
			this._calTotalsLapse();
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calLapsePolicies: function(){
			// No. of Lapsed Policies
			var gpnb,gprp,st;
			gpnb = this.getView().byId("__inputLPI").getValue();
			gprp = this.getView().byId("__inputLPE").getValue();
	    	gpnb = parseFloat(gpnb) ? parseFloat(gpnb) : 0;
	    	gprp = parseFloat(gprp) ? parseFloat(gprp) : 0;
			st = gpnb+gprp;
			this.getView().byId("__inputLPT").setValue(st);
			this._calTotalsLapse();
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calIndividualLapseRatio: function(){
			// Lapse Ratio
			// Individual Life -> No. of Lapsable Policies at the Beginning of the Quarter / No. of Lapsed Policies = Lapsed Ratio for Individual Life
			var npnba,nprpa,sta;
			npnba = this.getView().byId("__inputLPBQI").getValue();
			nprpa = this.getView().byId("__inputLPI").getValue();
	    	npnba = parseFloat(npnba) ? parseFloat(npnba) : 0;
	    	nprpa = parseFloat(nprpa) ? parseFloat(nprpa) : 0;
			sta = (npnba/nprpa);
			this.getView().byId("__inputLRI").setValue(sta);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calEmployeeLapseRatio: function(){
			// Employee Benefits/Corporates/Group Life Assurance -> No. of Lapsable Policies at the Beginning of the Quarter / No. of Lapsed Policies = Lapsed Ratio for Employee Benefits/Corporates/Group Life Assurance
			var gpnb,gprp,st;
			gpnb = this.getView().byId("__inputLPBQE").getValue();
			gprp = this.getView().byId("__inputLPE").getValue();
	    	gpnb = parseFloat(gpnb) ? parseFloat(gpnb) : 0;
	    	gprp = parseFloat(gprp) ? parseFloat(gprp) : 0;
			st = (gpnb/gprp);
			this.getView().byId("__inputLRE").setValue(st);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calGrossTotalLapseRatio: function(){
			// Total = Lapse Ratio for Individual Life / Lapsed Ratio for Employee Benefits/Corporates/Group Life Assurance
			var gpnb,gprp,st;
			gpnb = this.getView().byId("__inputLRI").getValue();
			gprp = this.getView().byId("__inputLRE").getValue();
	    	gpnb = parseFloat(gpnb) ? parseFloat(gpnb) : 0;
	    	gprp = parseFloat(gprp) ? parseFloat(gprp) : 0;
			st = (gpnb/gprp);
			this.getView().byId("__inputGLRT").setValue(st);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calTotalsLapse: function(){
			this._calIndividualLapseRatio();
			this._calEmployeeLapseRatio();
			this._calGrossTotalLapseRatio();
		},
		
		// --------------------------------------------Lapsed Policies by Product CODE BELOW----------------------------------------------
		
		_calAnnuitiesLapseRatio: function(){
			// Lapse Ratio
			// Annuities -> No. of Lapsable Policies at the Beginning of the Quarter / No. of Lapsed Policies = Lapsed Ratio for Individual Life
			var npnba,nprpa,sta;
			npnba = this.getView().byId("__inputLPBQA").getValue();
			nprpa = this.getView().byId("__inputLPA").getValue();
	    	npnba = parseFloat(npnba) ? parseFloat(npnba) : 0;
	    	nprpa = parseFloat(nprpa) ? parseFloat(nprpa) : 0;
			sta = (npnba/nprpa);
			this.getView().byId("__inputLRA").setValue(sta);
			this._calTotalsLapsedPoliciesByProduct();
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calTermInsuranceLapseRatio: function(){
			// Lapse Ratio
			// Term Insurance -> No. of Lapsable Policies at the Beginning of the Quarter / No. of Lapsed Policies = Lapsed Ratio for Individual Life
			var npnba,nprpa,sta;
			npnba = this.getView().byId("__inputLPBQTI").getValue();
			nprpa = this.getView().byId("__inputLPTI").getValue();
	    	npnba = parseFloat(npnba) ? parseFloat(npnba) : 0;
	    	nprpa = parseFloat(nprpa) ? parseFloat(nprpa) : 0;
			sta = (npnba/nprpa);
			this.getView().byId("__inputLRTI").setValue(sta);
			this._calTotalsLapsedPoliciesByProduct();
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calEndowementLapseRatio: function(){
			// Lapse Ratio
			// Endowement -> No. of Lapsable Policies at the Beginning of the Quarter / No. of Lapsed Policies = Lapsed Ratio for Individual Life
			var npnba,nprpa,sta;
			npnba = this.getView().byId("__inputLPBQEN").getValue();
			nprpa = this.getView().byId("__inputLPEN").getValue();
	    	npnba = parseFloat(npnba) ? parseFloat(npnba) : 0;
	    	nprpa = parseFloat(nprpa) ? parseFloat(nprpa) : 0;
			sta = (npnba/nprpa);
			this.getView().byId("__inputLREN").setValue(sta);
			this._calTotalsLapsedPoliciesByProduct();
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calPureEndowmentLapseRatio: function(){
			// Lapse Ratio
			// Pure Endowment-> No. of Lapsable Policies at the Beginning of the Quarter / No. of Lapsed Policies = Lapsed Ratio for Individual Life
			var npnba,nprpa,sta;
			npnba = this.getView().byId("__inputLPBQPE").getValue();
			nprpa = this.getView().byId("__inputLPPE").getValue();
	    	npnba = parseFloat(npnba) ? parseFloat(npnba) : 0;
	    	nprpa = parseFloat(nprpa) ? parseFloat(nprpa) : 0;
			sta = (npnba/nprpa);
			this.getView().byId("__inputLRPE").setValue(sta);
			this._calTotalsLapsedPoliciesByProduct();
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calWholeLifeLapseRatio: function(){
			// Lapse Ratio
			// Whole Life -> No. of Lapsable Policies at the Beginning of the Quarter / No. of Lapsed Policies = Lapsed Ratio for Individual Life
			var npnba,nprpa,sta;
			npnba = this.getView().byId("__inputLPBQWL").getValue();
			nprpa = this.getView().byId("__inputLPWL").getValue();
	    	npnba = parseFloat(npnba) ? parseFloat(npnba) : 0;
	    	nprpa = parseFloat(nprpa) ? parseFloat(nprpa) : 0;
			sta = (npnba/nprpa);
			this.getView().byId("__inputLRWL").setValue(sta);
			this._calTotalsLapsedPoliciesByProduct();
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calFuneralLapseRatio: function(){
			// Lapse Ratio
			// Funeral -> No. of Lapsable Policies at the Beginning of the Quarter / No. of Lapsed Policies = Lapsed Ratio for Individual Life
			var npnba,nprpa,sta;
			npnba = this.getView().byId("__inputLPBQF").getValue();
			nprpa = this.getView().byId("__inputLPF").getValue();
	    	npnba = parseFloat(npnba) ? parseFloat(npnba) : 0;
	    	nprpa = parseFloat(nprpa) ? parseFloat(nprpa) : 0;
			sta = (npnba/nprpa);
			this.getView().byId("__inputLRF").setValue(sta);
			this._calTotalsLapsedPoliciesByProduct();
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calOtherLapseRatio: function(){
			// Lapse Ratio
			// Other -> No. of Lapsable Policies at the Beginning of the Quarter / No. of Lapsed Policies = Lapsed Ratio for Individual Life
			var npnba,nprpa,sta;
			npnba = this.getView().byId("__inputLPBQO").getValue();
			nprpa = this.getView().byId("__inputLPO").getValue();
	    	npnba = parseFloat(npnba) ? parseFloat(npnba) : 0;
	    	nprpa = parseFloat(nprpa) ? parseFloat(nprpa) : 0;
			sta = (npnba/nprpa);
			this.getView().byId("__inputLRO").setValue(sta);
			this._calTotalsLapsedPoliciesByProduct();
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calTotalLapsablePoliciesBeginningQuarter: function(){
			// Lapse Ratio
			// Annuities -> No. of Lapsable Policies at the Beginning of the Quarter / No. of Lapsed Policies = Lapsed Ratio for Individual Life
			var LPBQA,LPBQTI,LPBQEN,LPBQPE,LPBQWL,LPBQF,LPBQO,sta;
			LPBQA = this.getView().byId("__inputLPBQA").getValue();
			LPBQTI = this.getView().byId("__inputLPBQTI").getValue();
			LPBQEN = this.getView().byId("__inputLPBQEN").getValue();
			LPBQPE = this.getView().byId("__inputLPBQPE").getValue();
			LPBQWL = this.getView().byId("__inputLPBQWL").getValue();
			LPBQF = this.getView().byId("__inputLPBQF").getValue();
			LPBQO = this.getView().byId("__inputLPBQO").getValue();
	    	LPBQA = parseFloat(LPBQA) ? parseFloat(LPBQA) : 0;
	    	LPBQTI = parseFloat(LPBQTI) ? parseFloat(LPBQTI) : 0;
	    	LPBQEN = parseFloat(LPBQEN) ? parseFloat(LPBQEN) : 0;
	    	LPBQPE = parseFloat(LPBQPE) ? parseFloat(LPBQPE) : 0;
	    	LPBQWL = parseFloat(LPBQWL) ? parseFloat(LPBQWL) : 0;
	    	LPBQF = parseFloat(LPBQF) ? parseFloat(LPBQF) : 0;
	    	LPBQO = parseFloat(LPBQO) ? parseFloat(LPBQO) : 0;
			sta = LPBQA+LPBQTI+LPBQEN+LPBQPE+LPBQWL+LPBQF+LPBQO;
			this.getView().byId("__inputLPBQTOTAL").setValue(sta);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calTotalLapsedPolicies: function(){
			// Lapse Ratio
			// Annuities -> No. of Lapsable Policies at the Beginning of the Quarter / No. of Lapsed Policies = Lapsed Ratio for Individual Life
			var LPA,LPTI,LPEN,LPPE,LPWL,LPF,LPO,sta;
			LPA = this.getView().byId("__inputLPA").getValue();
			LPTI = this.getView().byId("__inputLPTI").getValue();
			LPEN = this.getView().byId("__inputLPEN").getValue();
			LPPE = this.getView().byId("__inputLPPE").getValue();
			LPWL = this.getView().byId("__inputLPWL").getValue();
			LPF = this.getView().byId("__inputLPF").getValue();
			LPO = this.getView().byId("__inputLPO").getValue();
	    	LPA = parseFloat(LPA) ? parseFloat(LPA) : 0;
	    	LPTI = parseFloat(LPTI) ? parseFloat(LPTI) : 0;
	    	LPEN = parseFloat(LPEN) ? parseFloat(LPEN) : 0;
	    	LPPE = parseFloat(LPPE) ? parseFloat(LPPE) : 0;
	    	LPWL = parseFloat(LPWL) ? parseFloat(LPWL) : 0;
	    	LPF = parseFloat(LPF) ? parseFloat(LPF) : 0;
	    	LPO = parseFloat(LPO) ? parseFloat(LPO) : 0;
			sta = LPA+LPTI+LPEN+LPPE+LPWL+LPF+LPO;
			this.getView().byId("__inputLPTOTAL").setValue(sta);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calTotalLapseRatio: function(){
			// Lapse Ratio
			// Annuities -> No. of Lapsable Policies at the Beginning of the Quarter / No. of Lapsed Policies = Lapsed Ratio for Individual Life
			var npnba,nprpa,sta;
			npnba = this.getView().byId("__inputLPBQTOTAL").getValue();
			nprpa = this.getView().byId("__inputLPTOTAL").getValue();
	    	npnba = parseFloat(npnba) ? parseFloat(npnba) : 0;
	    	nprpa = parseFloat(nprpa) ? parseFloat(nprpa) : 0;
			sta = (npnba/nprpa);
			this.getView().byId("__inputLRTOTAL").setValue(sta);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calTotalsLapsedPoliciesByProduct: function(){
			this._calTotalLapsablePoliciesBeginningQuarter();
			this._calTotalLapsedPolicies();
			this._calTotalLapseRatio();
		},
		
		// ---------------------------------Breakdown by Insurance Type CODE BELOW------------------------------------------------
		
		_calBrokersTotalPoliciesInsuranceType: function(){
			// set Brokers Total Policies(Individual Life)
			//Brokers-> Number of Policies for new Business + Number of policies for recurring premium = Sub Total
			var NPBA,NPBTI,NPBEN,NPBPE,NPBWL,NPBF,NPBO,sta;
			NPBA = this.getView().byId("__inputNPBAN").getValue();
			NPBTI = this.getView().byId("input_Bterminsurancebnp").getValue();
			NPBEN = this.getView().byId("input_Bendowementbnp").getValue();
			NPBPE = this.getView().byId("input_Bpureendowementbnp").getValue();
			NPBWL = this.getView().byId("input_Bwholebnp").getValue();
			NPBF = this.getView().byId("input_Bfuneralbnp").getValue();
			NPBO = this.getView().byId("__inputNPBO").getValue();
	    	NPBA = parseFloat(NPBA) ? parseFloat(NPBA) : 0;
	    	NPBTI = parseFloat(NPBTI) ? parseFloat(NPBTI) : 0;
	    	NPBEN = parseFloat(NPBEN) ? parseFloat(NPBEN) : 0;
	    	NPBPE = parseFloat(NPBPE) ? parseFloat(NPBPE) : 0;
	    	NPBWL = parseFloat(NPBWL) ? parseFloat(NPBWL) : 0;
	    	NPBF = parseFloat(NPBF) ? parseFloat(NPBF) : 0;
	    	NPBO = parseFloat(NPBO) ? parseFloat(NPBO) : 0;
			sta = NPBA+NPBTI+NPBEN+NPBPE+NPBWL+NPBF+NPBO;
			this.getView().byId("input_Btotalbnp").setValue(sta);
			this._calTotalsInsuranceType();
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calBrokersTotalGrossPremiumInsuranceType: function(){
			// set Brokers Total Gross Premium (Individual Life)
			//Brokers -> Gross Premium for new business + Gross Premium for recurring premium = Sub Total
			var GPBA,GPBTI,GPBEN,GPBPE,GPBWL,GPBF,GPBO,sta;
			GPBA = this.getView().byId("input_Bannuitiesbgp").getValue();
			GPBTI = this.getView().byId("input_Bterminsurancebgp").getValue();
			GPBEN = this.getView().byId("input_Bendowementbgp").getValue();
			GPBPE = this.getView().byId("input_Bpureendowementbgp").getValue();
			GPBWL = this.getView().byId("input_Bwholebgp").getValue();
			GPBF = this.getView().byId("input_Bfuneralbgp").getValue();
			GPBO = this.getView().byId("__inputGPBO").getValue();
	    	GPBA = parseFloat(GPBA) ? parseFloat(GPBA) : 0;
	    	GPBTI = parseFloat(GPBTI) ? parseFloat(GPBTI) : 0;
	    	GPBEN = parseFloat(GPBEN) ? parseFloat(GPBEN) : 0;
	    	GPBPE = parseFloat(GPBPE) ? parseFloat(GPBPE) : 0;
	    	GPBWL = parseFloat(GPBWL) ? parseFloat(GPBWL) : 0;
	    	GPBF = parseFloat(GPBF) ? parseFloat(GPBF) : 0;
	    	GPBO = parseFloat(GPBO) ? parseFloat(GPBO) : 0;
			sta = GPBA+GPBTI+GPBEN+GPBPE+GPBWL+GPBF+GPBO;
			this.getView().byId("input_Btotalbgp").setValue(sta);
			this._calTotalsInsuranceType();
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calAgentsTotalPoliciesInsuranceType: function(){
			// set Agents Total Policies(Individual Life)
			//Agents = Number of Policies for new Business + Number of policies for recurring premium = Sub Total
			var NPAA,NPATI,NPAEN,NPAPE,NPAWL,NPAF,NPAO,sta;
			NPAA = this.getView().byId("input_Bannuitiesanp").getValue();
			NPATI = this.getView().byId("input_Bterminsuranceanp").getValue();
			NPAEN = this.getView().byId("input_Bendowementanp").getValue();
			NPAPE = this.getView().byId("input_Bpureendowementanp").getValue();
			NPAWL = this.getView().byId("input_Bwholeanp").getValue();
			NPAF = this.getView().byId("input_Bfuneralanp").getValue();
			NPAO = this.getView().byId("__inputNPAO").getValue();
	    	NPAA = parseFloat(NPAA) ? parseFloat(NPAA) : 0;
	    	NPATI = parseFloat(NPATI) ? parseFloat(NPATI) : 0;
	    	NPAEN = parseFloat(NPAEN) ? parseFloat(NPAEN) : 0;
	    	NPAPE = parseFloat(NPAPE) ? parseFloat(NPAPE) : 0;
	    	NPAWL = parseFloat(NPAWL) ? parseFloat(NPAWL) : 0;
	    	NPAF = parseFloat(NPAF) ? parseFloat(NPAF) : 0;
	    	NPAO = parseFloat(NPAO) ? parseFloat(NPAO) : 0;
			sta = NPAA+NPATI+NPAEN+NPAPE+NPAWL+NPAF+NPAO;
			this.getView().byId("input_Btotalanp").setValue(sta);
			this._calTotalsInsuranceType();
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calAgentsTotalGrossPremiumInsuranceType: function(){
			// set Agents Total Gross Premium (Individual Life)
			//Agents -> Gross Premium for new business + Gross Premium for recurring premium = Sub Total
			var GPAA,GPATI,GPAEN,GPAPE,GPAWL,GPAF,GPAO,sta;
			GPAA = this.getView().byId("input_Bannuitiesagp").getValue();
			GPATI = this.getView().byId("input_Bterminsuranceagp").getValue();
			GPAEN = this.getView().byId("input_Bendowementagp").getValue();
			GPAPE = this.getView().byId("input_Bpureendowementagp").getValue();
			GPAWL = this.getView().byId("input_Bwholeagp").getValue();
			GPAF = this.getView().byId("input_Bfuneralagp").getValue();
			GPAO = this.getView().byId("__inputGPAO").getValue();
	    	GPAA = parseFloat(GPAA) ? parseFloat(GPAA) : 0;
	    	GPATI = parseFloat(GPATI) ? parseFloat(GPATI) : 0;
	    	GPAEN = parseFloat(GPAEN) ? parseFloat(GPAEN) : 0;
	    	GPAPE = parseFloat(GPAPE) ? parseFloat(GPAPE) : 0;
	    	GPAWL = parseFloat(GPAWL) ? parseFloat(GPAWL) : 0;
	    	GPAF = parseFloat(GPAF) ? parseFloat(GPAF) : 0;
	    	GPAO = parseFloat(GPAO) ? parseFloat(GPAO) : 0;
			sta = GPAA+GPATI+GPAEN+GPAPE+GPAWL+GPAF+GPAO;
			this.getView().byId("input_Btotalagp").setValue(sta);
			this._calTotalsInsuranceType();
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calDirectClientsTotalPoliciesInsuranceType: function(){
			// set Direct Clients Total Policies(Individual Life)
			//Direct Clients = Number of Policies for new Business + Number of policies for recurring premium = Sub Total
			var NPDCA,NPDCTI,NPDCEN,NPDCPE,NPDCWL,NPDCF,NPDCO,sta;
			NPDCA = this.getView().byId("input_Bannuitiesdcnp").getValue();
			NPDCTI = this.getView().byId("input_Bterminsurancedcnp").getValue();
			NPDCEN = this.getView().byId("input_Bendowementdcnp").getValue();
			NPDCPE = this.getView().byId("input_Bpureendowementdcnp").getValue();
			NPDCWL = this.getView().byId("input_Bwholedcnp").getValue();
			NPDCF = this.getView().byId("input_Bfuneraldcnp").getValue();
			NPDCO = this.getView().byId("__inputNPDCO").getValue();
	    	NPDCA = parseFloat(NPDCA) ? parseFloat(NPDCA) : 0;
	    	NPDCTI = parseFloat(NPDCTI) ? parseFloat(NPDCTI) : 0;
	    	NPDCEN = parseFloat(NPDCEN) ? parseFloat(NPDCEN) : 0;
	    	NPDCPE = parseFloat(NPDCPE) ? parseFloat(NPDCPE) : 0;
	    	NPDCWL = parseFloat(NPDCWL) ? parseFloat(NPDCWL) : 0;
	    	NPDCF = parseFloat(NPDCF) ? parseFloat(NPDCF) : 0;
	    	NPDCO = parseFloat(NPDCO) ? parseFloat(NPDCO) : 0;
			sta = NPDCA+NPDCTI+NPDCEN+NPDCPE+NPDCWL+NPDCF+NPDCO;
			this.getView().byId("__inputNPDCTOTAL").setValue(sta);
			this._calTotalsInsuranceType();
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calDirectClientsTotalGrossPremiumInsuranceType: function(){
			// set Direct Clients Total Gross Premium (Individual Life)
			//Direct Clients -> Gross Premium for new business + Gross Premium for recurring premium = Sub Total
			var GPDCA,GPDCTI,GPDCEN,GPDCPE,GPDCWL,GPDCF,GPDCO,sta;
			GPDCA = this.getView().byId("input_Bannuitiesdcgp").getValue();
			GPDCTI = this.getView().byId("__inputGPDCTI").getValue();
			GPDCEN = this.getView().byId("__inputGPDCEN").getValue();
			GPDCPE = this.getView().byId("input_Bpureendowementdcgp").getValue();
			GPDCWL = this.getView().byId("input_Bwholedcgp").getValue();
			GPDCF = this.getView().byId("__inputGPDCF").getValue();
			GPDCO = this.getView().byId("__inputGPDCO").getValue();
	    	GPDCA = parseFloat(GPDCA) ? parseFloat(GPDCA) : 0;
	    	GPDCTI = parseFloat(GPDCTI) ? parseFloat(GPDCTI) : 0;
	    	GPDCEN = parseFloat(GPDCEN) ? parseFloat(GPDCEN) : 0;
	    	GPDCPE = parseFloat(GPDCPE) ? parseFloat(GPDCPE) : 0;
	    	GPDCWL = parseFloat(GPDCWL) ? parseFloat(GPDCWL) : 0;
	    	GPDCF = parseFloat(GPDCF) ? parseFloat(GPDCF) : 0;
	    	GPDCO = parseFloat(GPDCO) ? parseFloat(GPDCO) : 0;
			sta = GPDCA+GPDCTI+GPDCEN+GPDCPE+GPDCWL+GPDCF+GPDCO;
			this.getView().byId("input_Btotaldcgp").setValue(sta);
			this._calTotalsInsuranceType();
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calAnnuitiesTotalPoliciesInsuranceType: function(){
			// set Annuities Total Policies(Individual Life)
			//Brokers Number of Policies for new Business + Agents Number of Policies for new Business + Direct Clients Number of Policies for new Business = Sub Total
			var npnbb,npnba,npndc,st;
			npnbb = this.getView().byId("__inputNPBAN").getValue();
			npnba = this.getView().byId("input_Bannuitiesanp").getValue();
			npndc = this.getView().byId("input_Bannuitiesdcnp").getValue();
	    	npnbb = parseFloat(npnbb) ? parseFloat(npnbb) : 0;
	    	npnba = parseFloat(npnba) ? parseFloat(npnba) : 0;
	    	npndc = parseFloat(npndc) ? parseFloat(npndc) : 0;
			st = npnbb+npnba+npndc;
			this.getView().byId("__inputSTNPAN").setValue(st);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calAnnuitiesTotalGrossPremiumInsuranceType: function(){
			// set Annuities Total Gross Premium(Individual Life)
			//Brokers Number of Gross Premium for new Business + Agents Number of Gross Premium for new Business + Direct Clients Number of Gross Premium for new Business = Sub Total
			var gpnbb,gpnba,gpndc,st;
			gpnbb = this.getView().byId("input_Bannuitiesbgp").getValue();
			gpnba = this.getView().byId("input_Bannuitiesagp").getValue();
			gpndc = this.getView().byId("input_Bannuitiesdcgp").getValue();
	    	gpnbb = parseFloat(gpnbb) ? parseFloat(gpnbb) : 0;
	    	gpnba = parseFloat(gpnba) ? parseFloat(gpnba) : 0;
	    	gpndc = parseFloat(gpndc) ? parseFloat(gpndc) : 0;
			st = gpnbb+gpnba+gpndc;
			this.getView().byId("input_IsubtotalagpN2").setValue(st);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calTermInsuranceTotalPoliciesInsuranceType: function(){
			// set Term Insurance Total Policies(Individual Life)
			//Brokers Number of Policies for Recurring Premiums + Agents Number of Policies for Recurring Premiums + Direct Clients Number of Policies for Recurring Premiums = Sub Total
			var npnbb,npnba,npndc,st;
			npnbb = this.getView().byId("input_Bterminsurancebnp").getValue();
			npnba = this.getView().byId("input_Bterminsuranceanp").getValue();
			npndc = this.getView().byId("input_Bterminsurancedcnp").getValue();
	    	npnbb = parseFloat(npnbb) ? parseFloat(npnbb) : 0;
	    	npnba = parseFloat(npnba) ? parseFloat(npnba) : 0;
	    	npndc = parseFloat(npndc) ? parseFloat(npndc) : 0;
			st = npnbb+npnba+npndc;
			this.getView().byId("input_Bterminsurancetnp").setValue(st);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calTermInsuranceTotalGrossPremiumInsuranceType: function(){
			// set Term Insurance Total Gross Premium(Individual Life)
			//Brokers Number of Gross Premium for Recurring Premiums + Agents Number of Gross Premium for Recurring Premiums + Direct Clients Number of Gross Premium for Recurring Premiums = Sub Total
			var gpnbb,gpnba,gpndc,st;
			gpnbb = this.getView().byId("input_Bterminsurancebgp").getValue();
			gpnba = this.getView().byId("input_Bterminsuranceagp").getValue();
			gpndc = this.getView().byId("__inputGPDCTI").getValue();
	    	gpnbb = parseFloat(gpnbb) ? parseFloat(gpnbb) : 0;
	    	gpnba = parseFloat(gpnba) ? parseFloat(gpnba) : 0;
	    	gpndc = parseFloat(gpndc) ? parseFloat(gpndc) : 0;
			st = gpnbb+gpnba+gpndc;
			this.getView().byId("input_Bterminsurancetgp").setValue(st);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calEndowementTotalPoliciesInsuranceType: function(){
			// set Endowement Total Policies(Individual Life)
			//Brokers Number of Policies for Recurring Premiums + Agents Number of Policies for Recurring Premiums + Direct Clients Number of Policies for Recurring Premiums = Sub Total
			var npnbb,npnba,npndc,st;
			npnbb = this.getView().byId("input_Bendowementbnp").getValue();
			npnba = this.getView().byId("input_Bendowementanp").getValue();
			npndc = this.getView().byId("input_Bendowementdcnp").getValue();
	    	npnbb = parseFloat(npnbb) ? parseFloat(npnbb) : 0;
	    	npnba = parseFloat(npnba) ? parseFloat(npnba) : 0;
	    	npndc = parseFloat(npndc) ? parseFloat(npndc) : 0;
			st = npnbb+npnba+npndc;
			this.getView().byId("input_Bendowementtnp").setValue(st);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calEndowementTotalGrossPremiumInsuranceType: function(){
			// set Endowement Total Gross Premium(Individual Life)
			//Brokers Number of Gross Premium for Recurring Premiums + Agents Number of Gross Premium for Recurring Premiums + Direct Clients Number of Gross Premium for Recurring Premiums = Sub Total
			var gpnbb,gpnba,gpndc,st;
			gpnbb = this.getView().byId("input_Bendowementbgp").getValue();
			gpnba = this.getView().byId("input_Bendowementagp").getValue();
			gpndc = this.getView().byId("__inputGPDCEN").getValue();
	    	gpnbb = parseFloat(gpnbb) ? parseFloat(gpnbb) : 0;
	    	gpnba = parseFloat(gpnba) ? parseFloat(gpnba) : 0;
	    	gpndc = parseFloat(gpndc) ? parseFloat(gpndc) : 0;
			st = gpnbb+gpnba+gpndc;
			this.getView().byId("input_Bendowementtgp").setValue(st);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calPureEndowmentTotalPoliciesInsuranceType: function(){
			// set Pure Endowment Total Policies(Individual Life)
			//Brokers Number of Policies for Recurring Premiums + Agents Number of Policies for Recurring Premiums + Direct Clients Number of Policies for Recurring Premiums = Sub Total
			var npnbb,npnba,npndc,st;
			npnbb = this.getView().byId("input_Bpureendowementbnp").getValue();
			npnba = this.getView().byId("input_Bpureendowementanp").getValue();
			npndc = this.getView().byId("input_Bpureendowementdcnp").getValue();
	    	npnbb = parseFloat(npnbb) ? parseFloat(npnbb) : 0;
	    	npnba = parseFloat(npnba) ? parseFloat(npnba) : 0;
	    	npndc = parseFloat(npndc) ? parseFloat(npndc) : 0;
			st = npnbb+npnba+npndc;
			this.getView().byId("input_Bpureendowementtnp").setValue(st);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calPureEndowmentTotalGrossPremiumInsuranceType: function(){
			// set Pure Endowment Total Gross Premium(Individual Life)
			//Brokers Number of Gross Premium for Recurring Premiums + Agents Number of Gross Premium for Recurring Premiums + Direct Clients Number of Gross Premium for Recurring Premiums = Sub Total
			var gpnbb,gpnba,gpndc,st;
			gpnbb = this.getView().byId("input_Bpureendowementbgp").getValue();
			gpnba = this.getView().byId("input_Bpureendowementagp").getValue();
			gpndc = this.getView().byId("input_Bpureendowementdcgp").getValue();
	    	gpnbb = parseFloat(gpnbb) ? parseFloat(gpnbb) : 0;
	    	gpnba = parseFloat(gpnba) ? parseFloat(gpnba) : 0;
	    	gpndc = parseFloat(gpndc) ? parseFloat(gpndc) : 0;
			st = gpnbb+gpnba+gpndc;
			this.getView().byId("input_Bpureendowementtgp").setValue(st);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calWholeLifeTotalPoliciesInsuranceType: function(){
			// set Whole Life Total Policies(Individual Life)
			//Brokers Number of Policies for Recurring Premiums + Agents Number of Policies for Recurring Premiums + Direct Clients Number of Policies for Recurring Premiums = Sub Total
			var npnbb,npnba,npndc,st;
			npnbb = this.getView().byId("input_Bwholebnp").getValue();
			npnba = this.getView().byId("input_Bwholeanp").getValue();
			npndc = this.getView().byId("input_Bwholedcnp").getValue();
	    	npnbb = parseFloat(npnbb) ? parseFloat(npnbb) : 0;
	    	npnba = parseFloat(npnba) ? parseFloat(npnba) : 0;
	    	npndc = parseFloat(npndc) ? parseFloat(npndc) : 0;
			st = npnbb+npnba+npndc;
			this.getView().byId("input_Bwholetnp").setValue(st);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calWholeLifeTotalGrossPremiumInsuranceType: function(){
			// set Whole Life Total Gross Premium(Individual Life)
			//Brokers Number of Gross Premium for Recurring Premiums + Agents Number of Gross Premium for Recurring Premiums + Direct Clients Number of Gross Premium for Recurring Premiums = Sub Total
			var gpnbb,gpnba,gpndc,st;
			gpnbb = this.getView().byId("input_Bwholebgp").getValue();
			gpnba = this.getView().byId("input_Bwholeagp").getValue();
			gpndc = this.getView().byId("input_Bwholedcgp").getValue();
	    	gpnbb = parseFloat(gpnbb) ? parseFloat(gpnbb) : 0;
	    	gpnba = parseFloat(gpnba) ? parseFloat(gpnba) : 0;
	    	gpndc = parseFloat(gpndc) ? parseFloat(gpndc) : 0;
			st = gpnbb+gpnba+gpndc;
			this.getView().byId("input_Bwholetgp").setValue(st);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calFuneralTotalPoliciesInsuranceType: function(){
			// set Funeral Total Policies(Individual Life)
			//Brokers Number of Policies for Recurring Premiums + Agents Number of Policies for Recurring Premiums + Direct Clients Number of Policies for Recurring Premiums = Sub Total
			var npnbb,npnba,npndc,st;
			npnbb = this.getView().byId("input_Bfuneralbnp").getValue();
			npnba = this.getView().byId("input_Bfuneralanp").getValue();
			npndc = this.getView().byId("input_Bfuneraldcnp").getValue();
	    	npnbb = parseFloat(npnbb) ? parseFloat(npnbb) : 0;
	    	npnba = parseFloat(npnba) ? parseFloat(npnba) : 0;
	    	npndc = parseFloat(npndc) ? parseFloat(npndc) : 0;
			st = npnbb+npnba+npndc;
			this.getView().byId("input_Bfuneraltnp").setValue(st);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calFuneralTotalGrossPremiumInsuranceType: function(){
			// set Funeral Total Gross Premium(Individual Life)
			//Brokers Number of Gross Premium for Recurring Premiums + Agents Number of Gross Premium for Recurring Premiums + Direct Clients Number of Gross Premium for Recurring Premiums = Sub Total
			var gpnbb,gpnba,gpndc,st;
			gpnbb = this.getView().byId("input_Bfuneralbgp").getValue();
			gpnba = this.getView().byId("input_Bfuneralagp").getValue();
			gpndc = this.getView().byId("__inputGPDCF").getValue();
	    	gpnbb = parseFloat(gpnbb) ? parseFloat(gpnbb) : 0;
	    	gpnba = parseFloat(gpnba) ? parseFloat(gpnba) : 0;
	    	gpndc = parseFloat(gpndc) ? parseFloat(gpndc) : 0;
			st = gpnbb+gpnba+gpndc;
			this.getView().byId("input_IsubtotalbgpF").setValue(st);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calOtherTotalPoliciesInsuranceType: function(){
			// set Other Total Policies(Individual Life)
			//Brokers Number of Policies for Recurring Premiums + Agents Number of Policies for Recurring Premiums + Direct Clients Number of Policies for Recurring Premiums = Sub Total
			var npnbb,npnba,npndc,st;
			npnbb = this.getView().byId("__inputNPBO").getValue();
			npnba = this.getView().byId("__inputNPAO").getValue();
			npndc = this.getView().byId("__inputNPDCO").getValue();
	    	npnbb = parseFloat(npnbb) ? parseFloat(npnbb) : 0;
	    	npnba = parseFloat(npnba) ? parseFloat(npnba) : 0;
	    	npndc = parseFloat(npndc) ? parseFloat(npndc) : 0;
			st = npnbb+npnba+npndc;
			this.getView().byId("__inputSTNPO").setValue(st);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calOtherTotalGrossPremiumInsuranceType: function(){
			// set Other Total Gross Premium(Individual Life)
			//Brokers Number of Gross Premium for Recurring Premiums + Agents Number of Gross Premium for Recurring Premiums + Direct Clients Number of Gross Premium for Recurring Premiums = Sub Total
			var gpnbb,gpnba,gpndc,st;
			gpnbb = this.getView().byId("__inputGPBO").getValue();
			gpnba = this.getView().byId("__inputGPAO").getValue();
			gpndc = this.getView().byId("__inputGPDCO").getValue();
	    	gpnbb = parseFloat(gpnbb) ? parseFloat(gpnbb) : 0;
	    	gpnba = parseFloat(gpnba) ? parseFloat(gpnba) : 0;
	    	gpndc = parseFloat(gpndc) ? parseFloat(gpndc) : 0;
			st = gpnbb+gpnba+gpndc;
			this.getView().byId("input_IsubtotalbgpO").setValue(st);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calGrossTotalPoliciesInsuranceType: function(){
			// set Gross Total Policies(Individual Life)
			//Total Policies for New Business + Total Policies for Recurring Premiums = Gross Total Policies
			var STNPA,STNPTI,STNPEN,STNPPE,STNPWL,STNPF,STNPO,sta;
			STNPA = this.getView().byId("__inputSTNPAN").getValue();
			STNPTI = this.getView().byId("input_Bterminsurancetnp").getValue();
			STNPEN = this.getView().byId("input_Bendowementtnp").getValue();
			STNPPE = this.getView().byId("input_Bpureendowementtnp").getValue();
			STNPWL = this.getView().byId("input_Bwholetnp").getValue();
			STNPF = this.getView().byId("input_Bfuneraltnp").getValue();
			STNPO = this.getView().byId("__inputSTNPO").getValue();
	    	STNPA = parseFloat(STNPA) ? parseFloat(STNPA) : 0;
	    	STNPTI = parseFloat(STNPTI) ? parseFloat(STNPTI) : 0;
	    	STNPEN = parseFloat(STNPEN) ? parseFloat(STNPEN) : 0;
	    	STNPPE = parseFloat(STNPPE) ? parseFloat(STNPPE) : 0;
	    	STNPWL = parseFloat(STNPWL) ? parseFloat(STNPWL) : 0;
	    	STNPF = parseFloat(STNPF) ? parseFloat(STNPF) : 0;
	    	STNPO = parseFloat(STNPO) ? parseFloat(STNPO) : 0;
			sta = STNPA+STNPTI+STNPEN+STNPPE+STNPWL+STNPF+STNPO;
			this.getView().byId("input_Btotaltnp").setValue(sta);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calGrossTotalGrossPremiumInsuranceType: function(){
			// set Gross Total Gross Premium(Individual Life)
			//Total Gross Premium for New Business + Total Gross Premium for Recurring Premiums = Gross Total Gross Premium
			var STGPA,STGPTI,STGPEN,STGPPE,STGPWL,STGPF,STGPO,sta;
			STGPA = this.getView().byId("input_IsubtotalagpN2").getValue();
			STGPTI = this.getView().byId("input_Bterminsurancetgp").getValue();
			STGPEN = this.getView().byId("input_Bendowementtgp").getValue();
			STGPPE = this.getView().byId("input_Bpureendowementtgp").getValue();
			STGPWL = this.getView().byId("input_Bwholetgp").getValue();
			STGPF = this.getView().byId("input_IsubtotalbgpF").getValue();
			STGPO = this.getView().byId("input_IsubtotalbgpO").getValue();
	    	STGPA = parseFloat(STGPA) ? parseFloat(STGPA) : 0;
	    	STGPTI = parseFloat(STGPTI) ? parseFloat(STGPTI) : 0;
	    	STGPEN = parseFloat(STGPEN) ? parseFloat(STGPEN) : 0;
	    	STGPPE = parseFloat(STGPPE) ? parseFloat(STGPPE) : 0;
	    	STGPWL = parseFloat(STGPWL) ? parseFloat(STGPWL) : 0;
	    	STGPF = parseFloat(STGPF) ? parseFloat(STGPF) : 0;
	    	STGPO = parseFloat(STGPO) ? parseFloat(STGPO) : 0;
			sta = STGPA+STGPTI+STGPEN+STGPPE+STGPWL+STGPF+STGPO;
			this.getView().byId("input_Btotaltgp").setValue(sta);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calTotalsInsuranceType: function(){
			this._calAnnuitiesTotalPoliciesInsuranceType();
			this._calAnnuitiesTotalGrossPremiumInsuranceType();
			this._calTermInsuranceTotalPoliciesInsuranceType();
			this._calTermInsuranceTotalGrossPremiumInsuranceType();
			this._calEndowementTotalPoliciesInsuranceType();
			this._calEndowementTotalGrossPremiumInsuranceType();
			this._calPureEndowmentTotalPoliciesInsuranceType();
			this._calPureEndowmentTotalGrossPremiumInsuranceType();
			this._calWholeLifeTotalPoliciesInsuranceType();
			this._calWholeLifeTotalGrossPremiumInsuranceType();
			this._calFuneralTotalPoliciesInsuranceType();
			this._calFuneralTotalGrossPremiumInsuranceType();
			this._calOtherTotalPoliciesInsuranceType();
			this._calOtherTotalGrossPremiumInsuranceType();			
			this._calGrossTotalPoliciesInsuranceType();
			this._calGrossTotalGrossPremiumInsuranceType();
		},
		
		//*****************************************************calculations end*******************************************************************************************
	
	// *******************************************************Dynamic input*************************************************
		addInput: function(){
			var oLabel = new sap.m.Label({text:"2"});
		    var oInput1 = new sap.m.Input();
		    var oInput2 = new sap.m.Input();
		    var oInput3 = new sap.m.Input();
		     var delIcon = new sap.ui.core.Icon({
		      src:"sap-icon://delete",
		      press:this.onDeleteCcMail
		     });
		    var _oCcLayout = new sap.m.FlexBox({
		    			alignItems:"Center",
							justifyContent:"Start",
		          items:[oLabel,oInput1,oInput2,oInput3,delIcon]
		    });
		     this._oPnl.addContent(_oCcLayout);
		    },
		// getValue: function(){
		//      debugger;
		//      var values = "";
		//      var pnlDom = this._oPnl.getDomRef()
		//       $(pnlDom).find('input').each(function(index, elem) {
		//           debugger;
		//           values += ", " + $(elem)[0].value;          
		//       });
		//       alert(values);
		//     },
		onDeleteCcMail: function(oEvent){
		    	var rowItemContainer = oEvent.getSource().getParent();
		      rowItemContainer.destroy();
		    },
		
		onButton2pressed: function () {

        // some composite ui -> 
        // can be put into some (xml) fragment for better separation
        // here use layoutdata aggregation to span the 12 columns always
        var oUIBlock = new sap.ui.layout.HorizontalLayout({
            content: [
            new sap.m.Label({
                text: "Some Label"
            }), new sap.m.ComboBox({}), new sap.m.Input()]
        }).setLayoutData(new sap.ui.layout.GridData({
            span: "L12 M12 S12"
        })).addStyleClass("myHLayout");
        // end some composite ui

        // this.oGrid.addContent(oUIBlock);
		this._oPnl.addContent(oUIBlock);
    	},
    	
    	onButton2pressed2: function () {

        // some composite ui -> 
        // can be put into some (xml) fragment for better separation
        // here use layoutdata aggregation to span the 12 columns always
        var oUIBlock = new sap.ui.layout.HorizontalLayout({
            content: [
            new sap.m.Label({
                text: "2"
            }), new sap.m.Input().setLayoutData(new sap.ui.layout.GridData({
            span: "XL2 L3 M3 S4"
        })), new sap.m.Input(), new sap.m.Input().setLayoutData(new sap.ui.layout.GridData({
            span: "XL2 L3 M3 S4"
        }))]
        });
        // end some composite ui

        // this.oGrid.addContent(oUIBlock);
		this._oPnl.addContent(oUIBlock);
    	},
    	
    	// Method to send odata post request to backend server (save order)
    	_saveOrder: function() {
			var that = this;
			var 	oEntry = {};
	///		var 	oModel = this.getView().getModel("ZIPEC_APP_SRV");
			var 	bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;

		//Bind data array to form fields
			//Identifying details
			oEntry.ReturnNo = this.getView().byId("input_Institutionname").getValue();
			oEntry.Nameinstitution = this.getView().byId("input_Periodended").getValue();
			oEntry.Periodended = this.getView().byId("input_Principalname").getValue();
			oEntry.Nameprincipal = this.getView().byId("input_Compliancemanager").getValue();
			oEntry.Namecompliance = this.getView().byId("input_Financemanager").getValue();

		//Bind data array to form fields
			// BREAKDOWNTOTALASSETS Entity Fields
			// naming convention is input_OdataAttributeName
			oEntry.Namedirector = this.getView().byId("input_ReturnNo").getValue();
			oEntry.Grosspremium = this.getView().byId("input_Zimgovsecurities").getValue();
			oEntry.Reassurancepremu = this.getView().byId("input_Municipal").getValue();
			oEntry.Netpremium = this.getView().byId("input_Amabonds").getValue();
			oEntry.Unearnedpremium1 = this.getView().byId("input_Nathousing").getValue();
			oEntry.Netearnedpremium = this.getView().byId("input_Otherprescribed").getValue();
			oEntry.Claimspaid = this.getView().byId("input_Mortage").getValue();
			oEntry.Claimsoutstandin = this.getView().byId("input_Loanpolicies").getValue();
			oEntry.Unexpiredprovisi = this.getView().byId("input_Fixedproperty").getValue();
			oEntry.Newclaims = this.getView().byId("input_Equities").getValue();
			oEntry.Adminexpenses = this.getView().byId("input_Moneymarket").getValue();
			oEntry.Netfeespaid = this.getView().byId("input_Cashbankmarket").getValue();
			oEntry.Investincome = this.getView().byId("input_Otherinvestment").getValue();
			oEntry.Otherincome1= this.getView().byId("input_Subtotal").getValue();
			oEntry.Otherincome2 = this.getView().byId("input_Totalassets").getValue();
			oEntry.Otherincome3= this.getView().byId("input_Prescribedassets").getValue();
			oEntry.Manageexpense = this.getView().byId("input_Minassetsratio").getValue();
			oEntry.Otherexpenses = this.getView().byId("input_Requiredinvest").getValue();
			
			// Bind data array to form fields
			oEntry.Ebtinterest = this.getView().byId("input_Grosspremium").getValue();
			oEntry.Ebt = this.getView().byId("input_Outwardpremium").getValue();
			oEntry.Taxation = this.getView().byId("input_Unearnedpremium").getValue();
			oEntry.Eatincome = this.getView().byId("input_Netpremium").getValue();
			oEntry.Eatprofitloss = this.getView().byId("input_Claimspaid").getValue();
			oEntry.Eatpolicyholder = this.getView().byId("input_Claimsoutstanding").getValue();
			oEntry.Ncintagibleasset = this.getView().byId("input_Claimsincurred").getValue();
			oEntry.Ncpropertyequip = this.getView().byId("input_Unexpiredprovision").getValue();
			oEntry.Ncinvestproperty = this.getView().byId("input_Netclaims").getValue();
			oEntry.Ncinvestsecurity = this.getView().byId("input_AdminExpenses").getValue();
			oEntry.Ncinvestassets = this.getView().byId("input_Netfeescommission").getValue();
			oEntry.Ncassets1 = this.getView().byId("input_Underwritingpl").getValue();
			oEntry.Ncassets2 = this.getView().byId("input_Investincome").getValue();
			oEntry.Ncassets3 = this.getView().byId("input_Otherincome1").getValue();
			oEntry.Totalnc = this.getView().byId("input_Otherincome2").getValue();
			oEntry.Caccountsreceiva = this.getView().byId("input_Otherincome3").getValue();
			oEntry.Castinvestment = this.getView().byId("input_Managementexpense").getValue();
			oEntry.Cacashbank = this.getView().byId("input_Otherexpense").getValue();
			oEntry.Caassets1 = this.getView().byId("input_Ebinteresttaxation").getValue();
			oEntry.Caassets2 = this.getView().byId("input_Interest").getValue();
			oEntry.Caassets3 = this.getView().byId("input_Ebeforextax").getValue();
			oEntry.Totalca = this.getView().byId("input_Taxation").getValue();
			oEntry.Totalassets = this.getView().byId("input_Eaftertax").getValue();
			oEntry.Longtermloans = this.getView().byId("input_Ocincome").getValue();
			oEntry.Outstandclaims = this.getView().byId("input_Tcplforperiod").getValue();
			oEntry.Futurepolicyhold = this.getView().byId("input_Tpolicyfunds").getValue();
			oEntry.Unearnedpremium = this.getView().byId("input_Tcplshareholders").getValue();
			oEntry.Amountsdue = this.getView().byId("input_Ncassets").getValue();
			oEntry.Payablesarising = this.getView().byId("input_Intangibleassets").getValue();
			
			// Bind data array to form fields
			oEntry.Deferedtaxation = this.getView().byId("input_Propertequip").getValue();
			oEntry.Otherliability1 = this.getView().byId("input_Investmentproperty").getValue();
			oEntry.Otherliability2 = this.getView().byId("input_Payablesafraecurities").getValue();
			oEntry.Otherliability3 = this.getView().byId("input_Investmentassets").getValue();
			oEntry.Sharecapital = this.getView().byId("input_Otherncassets1").getValue();
			oEntry.Sharepremium = this.getView().byId("input_Otherncassets2").getValue();
			oEntry.Investreserve = this.getView().byId("input_Otherncassets3").getValue();
			oEntry.Revaluationreser = this.getView().byId("input_Totalncassets").getValue();
			oEntry.Nondistributable = this.getView().byId("input_Accreceivable").getValue();
			oEntry.Returnearningpy = this.getView().byId("input_Stinvestments").getValue();
			oEntry.Returnearningcp = this.getView().byId("input_Cbbalances").getValue();
			oEntry.Minorityinterest = this.getView().byId("input_Othercassets1").getValue();
			oEntry.Other1 = this.getView().byId("input_Othercassets2").getValue();
			oEntry.Other2 = this.getView().byId("input_Othercassets3").getValue();
			oEntry.Other3 = this.getView().byId("input_Totalcassets").getValue();
			oEntry.Shareholderequit = this.getView().byId("input_Longtermloans").getValue();
			oEntry.Totalassets1 = this.getView().byId("input_Outstandingclaims").getValue();
			oEntry.Intangibleassets = this.getView().byId("input_Claimsibnr").getValue();
			oEntry.Encumburedassets = this.getView().byId("input_Futurepd").getValue();
			oEntry.Nonpermissable = this.getView().byId("input_Unearnedpr").getValue();
			oEntry.Netadjustedasset = this.getView().byId("input_Amountsdtr").getValue();
			oEntry.Totalliabilities = this.getView().byId("input_Payablesafra").getValue();
			oEntry.Excessassets = this.getView().byId("input_Deferredtaxation").getValue();
			oEntry.Grosspremium1 = this.getView().byId("input_Otherliabilities1").getValue();
			oEntry.Reassurance = this.getView().byId("input_Otherliabilities2").getValue();
			oEntry.Netpremium1 = this.getView().byId("input_Otherliabilities3").getValue();
			oEntry.Netpremium25 = this.getView().byId("input_Totalliabilities").getValue();
			oEntry.Shareholderfund = this.getView().byId("input_Sharecapital").getValue();
			oEntry.Safetymargin = this.getView().byId("input_Sharepremium").getValue();
			oEntry.Solvencymargin = this.getView().byId("input_Investmentreserve").getValue();
			oEntry.Nonpermisassets = this.getView().byId("input_Revaluationreserve").getValue();
			oEntry.Inewbusinessbnp = this.getView().byId("input_Nondistreserve").getValue();
			oEntry.Inewbusinessbgp = this.getView().byId("input_Retainedepy").getValue();
			oEntry.Inewbusinessanp = this.getView().byId("input_Retainedcp").getValue();
			oEntry.Inewbusinessagp = this.getView().byId("input_Minorityinterest").getValue();
			oEntry.Inewbusinessdcnp = this.getView().byId("input_Othercapitalreserves1").getValue();
			oEntry.Inewbusinessdcgp = this.getView().byId("input_Otothercapitalreserves2").getValue();
			oEntry.Inewbusinesstnp = this.getView().byId("input_Othercapitalreserves3").getValue();
			oEntry.Inewbusinesstgp = this.getView().byId("input_Shareholderequity").getValue();
			oEntry.Irecurringbnp = this.getView().byId("input_Totalequityliabilities").getValue();
			
			//Bind data array to form fields
			oEntry.Irecurringbgp = this.getView().byId("input_Totalassets").getValue();
			oEntry.Irecurringanp = this.getView().byId("input_Lessiassets").getValue();
			oEntry.Irecurringagp = this.getView().byId("input_Lesseassets").getValue();
			oEntry.Irecurringdcnp = this.getView().byId("input_Othernonpassets").getValue();
			oEntry.Irecurringdcgp = this.getView().byId("input_Netadjustedassets").getValue();
			oEntry.Irecurringtnp = this.getView().byId("input_Totalliabilities1").getValue();
			oEntry.Irecurringtgp = this.getView().byId("input_Excessaoliabilities").getValue();
			oEntry.Isubtotalbnp = this.getView().byId("input_Grosspw").getValue();
			oEntry.Isubtotalbgp = this.getView().byId("input_Reassurance").getValue();
			oEntry.Isubtotalanp = this.getView().byId("input_Netpincome").getValue();
			oEntry.Isubtotalagp = this.getView().byId("input_Shareholderfund").getValue();
			oEntry.Isubtotaldcnp = this.getView().byId("input_Safetymargin").getValue();
			oEntry.Isubtotaldcgp = this.getView().byId("input_Solvencymargin").getValue();
			
			// Bind data array to form fields
			oEntry.Isubtotaltnp = this.getView().byId("input_Iindividualbnp").getValue();
			oEntry.Isubtotaltgp = this.getView().byId("input_Iindividualbgp").getValue();
			
			// Bind data array to form fields
			// Breakdown by Class of Business (Employee Benefits/Corporates/Group Life Assurance)
			oEntry.Enewbusinessbnp = this.getView().byId("input_Enewbusinessbnp").getValue();
			oEntry.Enewbusinessbgp = this.getView().byId("input_Enewbusinessbgp").getValue();
			oEntry.Enewbusinessanp = this.getView().byId("input_Enewbusinessanp").getValue();
			oEntry.Enewbusinessagp = this.getView().byId("input_Enewbusinessagp").getValue();
			oEntry.Enewbusinessdcnp = this.getView().byId("input_Enewbusinessdcnp").getValue();
			oEntry.Enewbusinessdcgp = this.getView().byId("input_Enewbusinessdcgp").getValue();
			oEntry.Enewbusinesstnp = this.getView().byId("input_Enewbusinesstnp").getValue();
			oEntry.Enewbusinesstgp = this.getView().byId("input_Enewbusinesstgp").getValue();
			oEntry.Ereccuringbnp = this.getView().byId("input_Ereccuringbnp").getValue();
			oEntry.Ereccuringbgp = this.getView().byId("input_Ereccuringbgp").getValue();
			oEntry.Ereccuringanp = this.getView().byId("input_Ereccuringanp").getValue();
			oEntry.Ereccuringagp = this.getView().byId("input_Ereccuringagp").getValue();
			oEntry.Ereccuringdcnp = this.getView().byId("input_Ereccuringdcnp").getValue();
			oEntry.Ereccuringdcgp = this.getView().byId("input_Ereccuringdcgp").getValue();
			oEntry.Ereccuringtnp = this.getView().byId("input_Ereccuringtnp").getValue();
			oEntry.Ereccuringtgp = this.getView().byId("input_Ereccuringtgp").getValue();
			oEntry.Esubtotalbnp = this.getView().byId("input_Esubtotalbnp").getValue();
			oEntry.Esubtotalbgp = this.getView().byId("input_Esubtotalbgp").getValue();
			oEntry.Esubtotalanp = this.getView().byId("input_Esubtotalanp").getValue();
			oEntry.Esubtotalagp = this.getView().byId("input_Esubtotalagp").getValue();
			oEntry.Esubtotaldcnp = this.getView().byId("input_Esubtotaldcnp").getValue();
			oEntry.Esubtotaldcgp = this.getView().byId("input_Esubtotaldcgp").getValue();
			oEntry.Esubtotaltnp = this.getView().byId("input_Esubtotaltnp").getValue();
			oEntry.Esubtotaltgp = this.getView().byId("input_Esubtotaltgp").getValue();
			
			// Bind data array to form fields
			// Breakdown by Class of Business (Breakdown by Insurance Type)
			oEntry.Annuitiesbnp = this.getView().byId("input_Bannuitiesbnp").getValue();
			oEntry.Annuitiesbgp = this.getView().byId("input_Bannuitiesbgp").getValue();
			oEntry.Annuitiesanp = this.getView().byId("input_Bannuitiesanp").getValue();
			oEntry.Annuitiesagp = this.getView().byId("input_Bannuitiesagp").getValue();
			oEntry.Annuitiesdcnp = this.getView().byId("input_Bannuitiesdcnp").getValue();
			oEntry.Annuitiesdcgp = this.getView().byId("input_Bannuitiesdcgp").getValue();
			oEntry.Annuitiestnp = this.getView().byId("input_Bannuitiestnp").getValue();
			oEntry.Annuitiestgp = this.getView().byId("input_Bannuitiestgp").getValue();
			oEntry.Terminsurancebnp = this.getView().byId("input_Bterminsurancebnp").getValue();
			oEntry.Terminsurancebgp = this.getView().byId("input_Bterminsurancebgp").getValue();
			oEntry.Terminsuranceanp = this.getView().byId("input_Bterminsuranceanp").getValue();
			oEntry.Terminsuranceagp = this.getView().byId("input_Bterminsuranceagp").getValue();
			oEntry.Terminsurancedcnp = this.getView().byId("input_Bterminsurancedcnp").getValue();
			oEntry.Terminsurancedcgp = this.getView().byId("input_Bterminsurancedcgp").getValue();
			oEntry.Terminsurancetnp = this.getView().byId("input_Bterminsurancetnp").getValue();
			oEntry.Terminsurancetgp = this.getView().byId("input_Bterminsurancetgp").getValue();
			oEntry.Endowementbnp = this.getView().byId("input_Bendowementbnp").getValue();
			oEntry.Endowementbgp = this.getView().byId("input_Bendowementbgp").getValue();
			oEntry.Endowementanp = this.getView().byId("input_Bendowementanp").getValue();
			oEntry.Endowementagp = this.getView().byId("input_Bendowementagp").getValue();
			oEntry.Endowementdcnp = this.getView().byId("input_Bendowementdcnp").getValue();
			oEntry.Endowementdcgp = this.getView().byId("input_Bendowementdcgp").getValue();
			oEntry.Endowementtnp = this.getView().byId("input_Bendowementtnp").getValue();
			oEntry.Endowementtgp = this.getView().byId("input_Bendowementtgp").getValue();
			oEntry.Pendowementbnp = this.getView().byId("input_Bpureendowementbnp").getValue();
			oEntry.Pendowementbgp = this.getView().byId("input_Bpureendowementbgp").getValue();
			oEntry.Pendowementanp = this.getView().byId("input_Bpureendowementanp").getValue();
			oEntry.Pendowementagp = this.getView().byId("input_Bpureendowementagp").getValue();
			oEntry.Pendowementdcnp = this.getView().byId("input_Bpureendowementdcnp").getValue();
			oEntry.Pendowementdcgp = this.getView().byId("input_Bpureendowementdcgp").getValue();
			oEntry.Pendowementtnp = this.getView().byId("input_Bpureendowementtnp").getValue();
			oEntry.Pendowementtgp = this.getView().byId("input_Bpureendowementtgp").getValue();
			oEntry.Wholebnp = this.getView().byId("input_Bwholebnp").getValue();
			oEntry.Wholebgp = this.getView().byId("input_Bwholebgp").getValue();
			oEntry.Wholeanp = this.getView().byId("input_Bwholeanp").getValue();
			oEntry.Wholeagp = this.getView().byId("input_Bwholeagp").getValue();
			oEntry.Wholedcnp = this.getView().byId("input_Bwholedcnp").getValue();
			oEntry.Wholedcgp = this.getView().byId("input_Bwholedcgp").getValue();
			oEntry.Wholetnp = this.getView().byId("input_Bwholetnp").getValue();
			oEntry.Wholetgp = this.getView().byId("input_Bwholetgp").getValue();
			oEntry.Funeralbnp = this.getView().byId("input_Bfuneralbnp").getValue();
			oEntry.Funeralbgp = this.getView().byId("input_Bfuneralbgp").getValue();
			oEntry.Funeralanp = this.getView().byId("input_Bfuneralanp").getValue();
			oEntry.Funeralagp = this.getView().byId("input_Bfuneralagp").getValue();
			oEntry.Funeraldcnp = this.getView().byId("input_Bfuneraldcnp").getValue();
			oEntry.Funeraldcgp = this.getView().byId("input_Bfuneraldcgp").getValue();
			oEntry.Funeraltnp = this.getView().byId("input_Bfuneraltnp").getValue();
			oEntry.Funeraltgp = this.getView().byId("input_Bfuneraltgp").getValue();
			oEntry.Otherbnp = this.getView().byId("input_Btotalbnp").getValue();
			oEntry.Otherbgp = this.getView().byId("input_Btotalbgp").getValue();
			oEntry.Otheranp = this.getView().byId("input_Btotalanp").getValue();
			oEntry.Otheragp = this.getView().byId("input_Btotalagp").getValue();
			oEntry.Otherdcnp = this.getView().byId("input_Btotaldcnp").getValue();
			oEntry.Otherdcgp = this.getView().byId("input_Btotaldcgp").getValue();
			oEntry.Othertnp = this.getView().byId("input_Btotaltnp").getValue();
			oEntry.Othertgp = this.getView().byId("input_Btotaltgp").getValue();
			
			// Bind data array to form fields
			oEntry.Zimgovsecurities = this.getView().byId("input_Nameinstizgd").getValue();
			oEntry.Municipal = this.getView().byId("input_Nameinstimos").getValue();
			oEntry.Amabonds = this.getView().byId("input_Nameinstiamabonds").getValue();
			oEntry.Nationalhousing = this.getView().byId("input_Nameinstinhf").getValue();
			oEntry.Otherprescribed = this.getView().byId("input_Nameinstiopa").getValue();
			oEntry.Totalassets = this.getView().byId("input_Nameinstitpa").getValue();
			oEntry.Mortgages = this.getView().byId("input_Nameinstimop").getValue();
			oEntry.Loanonpolicies = this.getView().byId("input_Nameinstilop").getValue();
			oEntry.Fixedproperty = this.getView().byId("input_Nameinstifp").getValue();
			oEntry.Moneymarket = this.getView().byId("input_Nameinstiequities").getValue();
			oEntry.Cashbank = this.getView().byId("input_Nameinstimoneym").getValue();
			oEntry.Otherinvestments = this.getView().byId("input_Nameinsticbbalances").getValue();
			oEntry.Subtotal = this.getView().byId("input_Nameinstiotherinvest").getValue();
			oEntry.Totalassets111 = this.getView().byId("input_Nameinstisubtotal").getValue();
			oEntry.Prescribed = this.getView().byId("input_Nameinstitotalassets").getValue();
			oEntry.Minratio = this.getView().byId("input_Nameinstipata").getValue();
			oEntry.Requiredinvest = this.getView().byId("input_Nameinstimrpar").getValue();
			oEntry.Bydeathi = this.getView().byId("input_Nameinstiripa").getValue();
			oEntry.Bydeathg = this.getView().byId("input_Nameinstizgd1").getValue();
			oEntry.Bymaturityi = this.getView().byId("input_Nameinstimos1").getValue();
			oEntry.Bymaturityg = this.getView().byId("input_Nameinstiamabonds1").getValue();
			oEntry.Bydisabilityi = this.getView().byId("input_Nameinstinhf1").getValue();
			oEntry.Bydisabilityg = this.getView().byId("input_Nameinstiopa1").getValue();
			oEntry.Surrendersg = this.getView().byId("input_Nameinstitpa1").getValue();
			oEntry.Cashbonusi = this.getView().byId("input_Nameinstimop1").getValue();
			oEntry.Cashbonusg = this.getView().byId("input_Nameinstilop1").getValue();
			oEntry.Totalgrossclaimi = this.getView().byId("input_Nameinstifp1").getValue();
			oEntry.Totalgrossclaimg = this.getView().byId("input_Nameinstiequities1").getValue();
			oEntry.Netrclaimsi = this.getView().byId("input_Nameinstimoneym1").getValue();
			oEntry.Netrclaimsg = this.getView().byId("input_Nameinsticbbalances1").getValue();
			oEntry.Netclaimsi = this.getView().byId("input_Nameinstiotherinvest1").getValue();
			oEntry.Netclaimsg = this.getView().byId("input_Nameinstisubtotal1").getValue();
			oEntry.Toptenclaimsi = this.getView().byId("input_Nameinstitotalassets1").getValue();
			oEntry.Toptenclaimsg = this.getView().byId("input_Nameinstipata1").getValue();
			oEntry.Nameofinnsured = this.getView().byId("input_Nameinstimrpar1").getValue();
			oEntry.Amountofclaim = this.getView().byId("input_Nameinstiripa11").getValue();
			
			//Bind data array to form fields
			oEntry.Typeofpolicy = this.getView().byId("input_Claimsbydeathindiv").getValue();
			oEntry.Settledrepulated = this.getView().byId("input_Claimsbydeathgroup").getValue();
			oEntry.Totalamountclaim = this.getView().byId("input_Claimsbymaturityindiv").getValue();
			oEntry.Totalypepolicy = this.getView().byId("input_Claimsbymaturitygroup").getValue();
			oEntry.Totalsettled = this.getView().byId("input_Claimssurrenderindiv").getValue();
			oEntry.Caindividual30 = this.getView().byId("input_Claimssurrendergroup").getValue();
			oEntry.Caindividual60 = this.getView().byId("input_Claimscashbonusindiv").getValue();
			oEntry.Caindividual90 = this.getView().byId("input_Claimscashbonusgroup").getValue();
			oEntry.Caindividual120 = this.getView().byId("input_Claimsgrossindiv").getValue();
			oEntry.Caindividual121 = this.getView().byId("input_Claimsgrossgroup").getValue();
			oEntry.Cagroup30 = this.getView().byId("input_Claimsnetreinsuranceindiv").getValue();
			oEntry.Cagroup60 = this.getView().byId("input_Claimsnetreinsurancegroup").getValue();
			oEntry.Cagroup90 = this.getView().byId("input_Netclaimsindiv").getValue();
			oEntry.Cagroup120 = this.getView().byId("input_Netclaimsgroup").getValue();
			oEntry.Cagroup121 = this.getView().byId("input_Toptenclaimsindiv").getValue();
			oEntry.Catotal30 = this.getView().byId("input_Toptenclaimsgroup").getValue();
			oEntry.Catotal60 = this.getView().byId("input_Nameinsured").getValue();
			oEntry.Catotal90 = this.getView().byId("input_Amountclaim").getValue();
			oEntry.Catotal120 = this.getView().byId("input_Typepolicy").getValue();
			oEntry.Catotal121 = this.getView().byId("input_Settledrepudiated").getValue();
			oEntry.Totalindividual = this.getView().byId("input_Nameinsured1").getValue();
			oEntry.Totalgroup = this.getView().byId("input_Amountclaim1").getValue();
			oEntry.Total = this.getView().byId("input_Typepolicy1").getValue();
			oEntry.Nameshareholder = this.getView().byId("input_Settledrepudiated1").getValue();
			oEntry.Beneficiaries = this.getView().byId("input_Nameinsured2").getValue();
			oEntry.Percshareholding = this.getView().byId("input_Amountclaim2").getValue();
			oEntry.Name = this.getView().byId("input_Typepolicy2").getValue();
			oEntry.Executive = this.getView().byId("input_Settledrepudiated2").getValue();
			oEntry.Qualifications = this.getView().byId("input_Claimage30ip").getValue();
			oEntry.Experience = this.getView().byId("input_Claimage30group").getValue();
			oEntry.Directorships = this.getView().byId("input_Claimage30total").getValue();
			oEntry.Nameofboard = this.getView().byId("input_Claimage60ip").getValue();
			oEntry.Nameofmembers = this.getView().byId("input_Claimage60group").getValue();
			oEntry.Numberofbranches = this.getView().byId("input_Claimage60total").getValue();
			oEntry.Numberofsubbranch = this.getView().byId("input_Claimage90ip").getValue();
			oEntry.Staffmanagement = this.getView().byId("input_Claimage90group").getValue();
			oEntry.Staffnonmanagerial = this.getView().byId("input_Claimage90total").getValue();
			oEntry.Individual = this.getView().byId("input_Claimage120ip").getValue();
			oEntry.Corpotate = this.getView().byId("input_Claimage120group").getValue();
			oEntry.Total123 = this.getView().byId("input_Claimage120total").getValue();
			oEntry.Individualnp = this.getView().byId("input_Claimage121ip").getValue();
			oEntry.Individualsa = this.getView().byId("input_Claimage121group").getValue();
			oEntry.Individualp = this.getView().byId("input_Claimage121total").getValue();
			oEntry.Groupnp = this.getView().byId("input_Claimagetotalip").getValue();
			oEntry.Groupsa = this.getView().byId("input_Claimagetotalgroup").getValue();
			oEntry.Groupp = this.getView().byId("input_Claimagetotalt").getValue();
			oEntry.Totalnp = this.getView().byId("input_Claimage30total").getValue();
			oEntry.Totalsa = this.getView().byId("input_Claimage60ip").getValue();
			oEntry.Totalp = this.getView().byId("input_Claimage60group").getValue();
			
			oEntry.Namepolicy = this.getView().byId("input_Claimage60total").getValue();
			oEntry.Sumassured = this.getView().byId("input_Claimage90ip").getValue();
			oEntry.Typeproduct = this.getView().byId("input_Claimage90group").getValue();
			oEntry.Premiumpaid = this.getView().byId("input_Claimage90total").getValue();
			oEntry.Namepolicy1 = this.getView().byId("input_Claimage120ip").getValue();
			oEntry.Sumassured1 = this.getView().byId("input_Claimage90ip").getValue();
			oEntry.Typeproduct1 = this.getView().byId("input_Claimage90group").getValue();
			oEntry.Premiumpaid1 = this.getView().byId("input_Claimage90total").getValue();
			oEntry.Namepolicy2 = this.getView().byId("input_Claimage60total").getValue();
			oEntry.Sumassured2 = this.getView().byId("input_Claimage90ip").getValue();
			oEntry.Typeproduct2 = this.getView().byId("input_Claimage90group").getValue();
			oEntry.Premiumpaid2 = this.getView().byId("input_Claimage90total").getValue();
			oEntry.Namepolicy3 = this.getView().byId("input_Claimage60total").getValue();
			oEntry.Sumassured3 = this.getView().byId("input_Claimage90ip").getValue();
			oEntry.Typeproduct3 = this.getView().byId("input_Claimage90group").getValue();
			oEntry.Premiumpaid3 = this.getView().byId("input_Claimage90total").getValue();
			
			oEntry.Debtage30ip = this.getView().byId("input_Claimage121group").getValue();
			oEntry.Debtage30group = this.getView().byId("input_Claimage121total").getValue();
			oEntry.Debtage30total = this.getView().byId("input_Claimagetotalip").getValue();
			oEntry.Debtage60ip = this.getView().byId("input_Claimage121group").getValue();
			oEntry.Debtage60group = this.getView().byId("input_Claimage121total").getValue();
			oEntry.Debtage60total = this.getView().byId("input_Claimagetotalip").getValue();
			oEntry.Debtage90ip = this.getView().byId("input_Claimage121group").getValue();
			oEntry.Debtage90group = this.getView().byId("input_Claimage121total").getValue();
			oEntry.Debtage90total = this.getView().byId("input_Claimagetotalip").getValue();
			oEntry.Debtage120ip = this.getView().byId("input_Claimage121group").getValue();
			oEntry.Debtage120group = this.getView().byId("input_Claimage121total").getValue();
			oEntry.Debtage120total = this.getView().byId("input_Claimagetotalip").getValue();
			oEntry.Debtage121ip = this.getView().byId("input_Claimage121group").getValue();
			oEntry.Debtage121group = this.getView().byId("input_Claimage121total").getValue();
			oEntry.Debtage121total = this.getView().byId("input_Claimagetotalip").getValue();
			
			oEntry.Totalip = this.getView().byId("input_Claimagetotalgroup").getValue();
			oEntry.Totalgroup1 = this.getView().byId("input_Claimagetotalt").getValue();
			oEntry.Total1234 = this.getView().byId("input_Nameofshareholder").getValue();
			
			this.oModel.setUseBatch(true);

			this.oModel.create("/ZLFO_RETURNSSet", oEntry, {
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
	});
},true);