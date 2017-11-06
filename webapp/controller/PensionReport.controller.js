sap.ui.define([
		"jquery.sap.global",
		"sap/ui/core/mvc/Controller",
		"sap/ui/model/json/JSONModel",
			"sap/m/MessageBox",
		"sap/m/MessageToast"
	], function(jQuery, Controller, JSONModel, MessageToast,MessageBox) {
	"use strict";

	return Controller.extend("com.ipec.crm.controller.PensionReport", {
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
			var target = "page2";
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

				MessageBox.confirm("Would you like to save this information??", {
					title: "Save application",
					initialFocus: MessageBox.Action.CANCEL,
					onClose: function(sButton) {
						if (sButton === MessageBox.Action.OK) {
							sap.ui.core.BusyIndicator.show(0);
							that._saveOrder();
						} else if (sButton === MessageBox.Action.CANCEL) {
							MessageToast.show("Saving application cancelled");
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
			oEntry.Licenseno = this.getView().byId("__licenseno").getValue();
			oEntry.Dateoftest = this.getView().byId("__date").getValue();
			oEntry.Sitename = this.getView().byId("__sitename").getValue();
			oEntry.Sampletype = this.getView().byId("__sampletype").getValue();
			oEntry.Laboratoryrn = this.getView().byId("__lab1").getValue();
			oEntry.Laboratorysn = this.getView().byId("__lab2").getValue();

			//Results
			oEntry.Densityresult = this.getView().byId("_result2").getValue();
			oEntry.Ethanolresult = this.getView().byId("_result17").getValue();
			oEntry.Fbpresult = this.getView().byId("_result14").getValue();
			oEntry.Distilresult = this.getView().byId("_result3").getValue();
			oEntry.Ibpresult = this.getView().byId("_result4").getValue();
			oEntry.Recoveryresult = this.getView().byId("_result15").getValue();
			oEntry.Residueresult = this.getView().byId("_result16").getValue();
			oEntry.Rvpresult = this.getView().byId("_result19").getValue();
			oEntry.Waterresult = this.getView().byId("_result18").getValue();
			oEntry.A10result = this.getView().byId("_result5").getValue();
			oEntry.A20result = this.getView().byId("_result6").getValue();
			oEntry.A30result = this.getView().byId("_result7").getValue();
			oEntry.A40result = this.getView().byId("_result8").getValue();
			oEntry.A50result = this.getView().byId("_result9").getValue();
			oEntry.A60result = this.getView().byId("_result10").getValue();
			oEntry.A70result = this.getView().byId("_result11").getValue();
			oEntry.A80result = this.getView().byId("_result12").getValue();
			oEntry.A90result = this.getView().byId("_result13").getValue();
			oEntry.Appresult = this.getView().byId("_result1").getValue();

			//Comments
			oEntry.Densitycomment = this.getView().byId("_comment2").getValue();
			oEntry.Distilcomment = this.getView().byId("_comment3").getValue();
			oEntry.Ethanolcomment = this.getView().byId("_comment17").getValue();
			oEntry.Fbpcomment = this.getView().byId("_comment14").getValue();
			oEntry.Ibpcomment = this.getView().byId("_comment4").getValue();
			oEntry.Recoverycomment = this.getView().byId("_comment15").getValue();
			oEntry.Residuecomment = this.getView().byId("_comment16").getValue();
			oEntry.Rvpcomment = this.getView().byId("_comment19").getValue();
			oEntry.Watercomment = this.getView().byId("_comment18").getValue();
			oEntry.A10comment = this.getView().byId("_comment5").getValue();
			oEntry.A20comment = this.getView().byId("_comment6").getValue();
			oEntry.A30comment = this.getView().byId("_comment7").getValue();
			oEntry.A40comment = this.getView().byId("_comment8").getValue();
			oEntry.A50comment = this.getView().byId("_comment9").getValue();
			oEntry.A60comment = this.getView().byId("_comment10").getValue();
			oEntry.A70comment = this.getView().byId("_comment11").getValue();
			oEntry.A80comment = this.getView().byId("_comment12").getValue();
			oEntry.A90comment = this.getView().byId("_comment13").getValue();
			oEntry.Appcomment = this.getView().byId("_comment1").getValue();

			//Remarks
			oEntry.Comments = this.getView().byId("_comments").getValue();
			oEntry.Comments1 = this.getView().byId("_comments1").getValue();
			oEntry.Testedby = this.getView().byId("_nameoftester").getValue();
			oEntry.Date1 = this.getView().byId("__date1").getValue();
			oEntry.Date2 = this.getView().byId("__date2").getValue();
			oEntry.Licenseerep = this.getView().byId("_licenseerep").getValue();

			oModel.setUseBatch(true);

			oModel.create("/ZPENSION_FUNDSet", oEntry, {
				success: function(data) {
					sap.ui.core.BusyIndicator.hide();
					MessageBox.show(
						that._oResourceBundle.getText("saveSuccess"), {
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

		//Method to reset controls after save
		_afterSave: function() {
			var inputFields = [
			
			];

			jQuery.each(inputFields, function(i, input) {

				input.setValue("");
				input.setDescription("");

			});
		}
		
// 		//Method to send odata post request to backend server (save order) for ODATA ZIPEC_APP_SRV
// 		_saveOrder: function() {
// 			var that = this,
// 				oEntry = {},
// 				oModel = this.getModel(),
// 				bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;

// 			//Bind data array to form fields

			
// 			oEntry.PensionId = "PensionId";
// 			oEntry.InsuranceComp = this.getView().byId("InsuranceComp").getValue();
// 			oEntry.ContactPerson = this.getView().byId("ContactPerson").getValue();
// 			oEntry.Address = this.getView().byId("Address").getValue();
// 			oEntry.LandlinesCell = this.getView().byId("LandlinesCell").getValue();

// 			oEntry.EmailAddress = this.getView().byId("EmailAddress").getValue();
// 			oEntry.BranchesAddress = this.getView().byId("BranchesAddress").getValue();
// 			oEntry.NameOfOfficial = this.getView().byId("NameOfOfficial").getValue();
// 			oEntry.Designation = this.getView().byId("Designation").getValue();
// 			oEntry.ReportingDate = this.getView().byId("ReportingDate").getValue();
// 			oEntry.Declaration = this.getView().byId("Declaration").getValue();
// 			oEntry.Officeofadminname = this.getView().byId("Officeofadminname").getValue();
// 			oEntry.Officeofadmingender = this.getView().byId("Officeofadmingender").getValue();
// 			oEntry.Officeofadmindesignation = this.getView().byId("Officeofadmindesignation").getValue();
// 			oEntry.Officeofadmindesignationwithin = this.getView().byId("Officeofadmindesignationwithin").getValue();
// 			oEntry.Officeofadmindesignationatcomp = this.getView().byId("Officeofadmindesignationatcomp").getValue();
// 			oEntry.Officeofadminnumberofyearsasbo = this.getView().byId("Officeofadminnumberofyearsasbo").getValue();
// 			oEntry.Officeofadminboardcommitteemem = this.getView().byId("Officeofadminboardcommitteemem").getValue();
// 			oEntry.Officeofadminname2 = this.getView().byId("Officeofadminname2").getValue();
// 			oEntry.Officeofadmingende2 = this.getView().byId("Officeofadmingende2").getValue();
// 			oEntry.Officeofadmindesignation2 = this.getView().byId("Officeofadmindesignation2").getValue();
// 			oEntry.Officeofadmindesignationwithi2 = this.getView().byId("Officeofadmindesignationwithi2").getValue();
// 			oEntry.Officeofadmindesignationatcom2 = this.getView().byId("Officeofadmindesignationatcom2").getValue();
// 			oEntry.Officeofadminnumberofyearsasb2 = this.getView().byId("Officeofadminnumberofyearsasb2").getValue();
// 			oEntry.Officeofadminboardcommitteeme2 = this.getView().byId("Officeofadminboardcommitteeme2").getValue();
			
// 			oEntry.Officeofadminname3 = this.getView().byId("Officeofadminname3").getValue();
// 			oEntry.Officeofadmingende3 = this.getView().byId("Officeofadmingende3").getValue();
// 			oEntry.Officeofadmindesignation3 = this.getView().byId("Officeofadmindesignation3").getValue();
// 			oEntry.Officeofadmindesignationwithi3 = this.getView().byId("Officeofadmindesignationwithi3").getValue();
// 			oEntry.Officeofadmindesignationatcom3 = this.getView().byId("Officeofadmindesignationatcom3").getValue();
// 			oEntry.Officeofadminnumberofyearsasb3 = this.getView().byId("Officeofadminnumberofyearsasb3").getValue();
// 			oEntry.Officeofadminboardcommitteeme3 = this.getView().byId("Officeofadminboardcommitteeme3").getValue();
			
// 			oEntry.Officeofadminname4 = this.getView().byId("Officeofadminname4").getValue();
// 			oEntry.Officeofadmingende4 = this.getView().byId("Officeofadmingende4").getValue();
// 			oEntry.Officeofadmindesignation4 = this.getView().byId("Officeofadmindesignation4").getValue();
// 			oEntry.Officeofadmindesignationwithi4 = this.getView().byId("Officeofadmindesignationwithi4").getValue();
// 			oEntry.Officeofadmindesignationatcom4 = this.getView().byId("Officeofadmindesignationatcom4").getValue();
// 			oEntry.Officeofadminnumberofyearsasb4 = this.getView().byId("Officeofadminnumberofyearsasb4").getValue();
// 			oEntry.Officeofadminboardcommitteeme4 = this.getView().byId("Officeofadminboardcommitteeme4").getValue();
			
// 			oEntry.Officeofadminname5 = this.getView().byId("Officeofadminname2").getValue();
// 			oEntry.Officeofadmingende5 = this.getView().byId("Officeofadmingende2").getValue();
// 			oEntry.Officeofadmindesignation5 = this.getView().byId("Officeofadmindesignation2").getValue();
// 			oEntry.Officeofadmindesignationwithi5 = this.getView().byId("Officeofadmindesignationwithi2").getValue();
// 			oEntry.Officeofadmindesignationatcom5 = this.getView().byId("Officeofadmindesignationatcom2").getValue();
// 			oEntry.Officeofadminnumberofyearsasb5 = this.getView().byId("Officeofadminnumberofyearsasb2").getValue();
// 			oEntry.Officeofadminboardcommitteeme5 = this.getView().byId("Officeofadminboardcommitteeme2").getValue();
			
// 			oEntry.Chiefriskofficername = this.getView().byId("input_PER_FTP_TOT_INS").getValue();
// 			oEntry.Chiefriskofficercontactnumbers = this.getView().byId("input_PER_FTP_TOT_PRE").getValue();
// 			oEntry.Chiefriskofficerphysicaladdres = this.getView().byId("input_PER_FTP_TOT_POL").getValue();
// 			oEntry.Financedirectorname = this.getView().byId("input_PER_FTP_COM_REC").getValue();
// 			oEntry.Financedirectorcontactnumbers = this.getView().byId("input_PER_FTP_OTH_COS").getValue();
// 			oEntry.Financedirectorphysicaladdres = this.getView().byId("input_PER_COMPRE_TOT_INS").getValue();
// 			oEntry.Internalauditorname = this.getView().byId("input_PER_COMPRE_TOT_PRE").getValue();
// 			oEntry.Internalauditorcontactnumbers = this.getView().byId("input_PER_COMPRE_TOT_POL").getValue();
// 			oEntry.Internalauditorphysicaladdress = this.getView().byId("input_PER_COMPRE_COM_REC").getValue();
// 			oEntry.Externalauditorsname = this.getView().byId("input_PER_COMPRE_OTH_COS").getValue();
// 			oEntry.Externalauditorscontactnumbers = this.getView().byId("input_PER_OTHER_TOT_INS").getValue();
// 			oEntry.Externalauditorsphysicaladdres = this.getView().byId("input_PER_OTHER_TOT_PRE").getValue();
// 			oEntry.Complianceofficername = this.getView().byId("input_PER_OTHER_TOT_POL").getValue();
// 			oEntry.Complianceofficercontactnumber = this.getView().byId("input_PER_OTHER_COM_REC").getValue();
// 			oEntry.Complianceofficerphysicaladdre = this.getView().byId("input_PER_OTHER_OTH_COS").getValue();
// 			oEntry.Bankersname = this.getView().byId("input_PER_SUBTOT_TOT_INS").getValue();
// 			oEntry.Bankerscontactnumbers = this.getView().byId("input_PER_SUBTOT_TOT_PRE").getValue();
// 			oEntry.Bankersphysicaladdress = this.getView().byId("input_PER_SUBTOT_TOT_POL").getValue();
// 			oEntry.Actuaryname = this.getView().byId("input_PER_SUBTOT_COM_REC").getValue();
// 			oEntry.Actuarycontactnumbers = this.getView().byId("input_PER_SUBTOT_OTH_COS").getValue();
			
// 				oEntry.Actuaryphysicaladdress = this.getView().byId("input_COM_FIRE_TOT_INS").getValue();
// 				oEntry.Lawyersname = this.getView().byId("input_COM_FIRE_TOT_PRE").getValue();
// 				oEntry.Lawyerscontactnumbers = this.getView().byId("input_COM_FIRE_TOT_POL").getValue();
// 				oEntry.Lawyersphysicaladdress = this.getView().byId("input_COM_FIRE_COM_REC").getValue();
// 				oEntry.Nameoffund = this.getView().byId("input_COM_FIRE_OTH_COS").getValue();
// 				oEntry.Typeoffund = this.getView().byId("input_COM_ENGINE_TOT_INS").getValue();
// 				oEntry.Sselfadministeredinsured = this.getView().byId("input_COM_ENGINE_TOT_PRE").getValue();
// 				oEntry.Contributionstatus = this.getView().byId("input_COM_ENGINE_TOT_POL").getValue();
// 				oEntry.Fundstatus = this.getView().byId("input_COM_ENGINE_COM_REC").getValue();
// 				oEntry.Averagecontributionrateemplyer = this.getView().byId("input_COM_ENGINE_OTH_COS").getValue();
// 				oEntry.Averagecontributionrateemplyee = this.getView().byId("input_COM_RTA_TOT_INS").getValue();
// 				oEntry.Normalretirementage = this.getView().byId("input_COM_RTA_TOT_PRE").getValue();
// 				oEntry.Glacovermultiplier = this.getView().byId("input_COM_RTA_TOT_POL").getValue();
// 				oEntry.Pensionfund = this.getView().byId("input_COM_RTA_COM_REC").getValue();
// 				oEntry.Newentrants = this.getView().byId("input_COM_RTA_OTH_COS").getValue();
// 				oEntry.Activemembersexcludingnewentra = this.getView().byId("input_COM_FTP_TOT_INS").getValue();
// 				oEntry.Pensioners = this.getView().byId("input_COM_FTP_TOT_PRE").getValue();
// 				oEntry.Defferedpensioners = this.getView().byId("input_COM_FTP_TOT_POL").getValue();
// 				oEntry.Suspendedpensioners = this.getView().byId("input_COM_FTP_COM_REC").getValue();
// 				oEntry.Unclaimedbenefitsnumber = this.getView().byId("input_COM_FTP_OTH_COS").getValue();
// 				oEntry.Numberofexitsfomfund = this.getView().byId("input_COM_COMPRE_TOT_INS").getValue();
// 				oEntry.Numberofexitsoutsidefund = this.getView().byId("input_COM_COMPRE_TOT_PRE").getValue();
// 				oEntry.Numberofmemberswithannuitybene = this.getView().byId("input_COM_COMPRE_TOT_POL").getValue();
// 				oEntry.Yeartodateamountofannuitiesben = this.getView().byId("input_COM_COMPRE_COM_REC").getValue();
// 				oEntry.Numberofwidowschildrensupporte = this.getView().byId("input_COM_COMPRE_OTH_COS").getValue();
// 				oEntry.Openingaccumulatedcreditforthe = this.getView().byId("input_COM_MARINE_TOT_INS").getValue();
// 				oEntry.Averagemonthlypensionablesalar = this.getView().byId("input_COM_MARINE_TOT_PRE").getValue();
// 				oEntry.Yeartodatetotalcontributionsin = this.getView().byId("input_COM_MARINE_TOT_POL").getValue();
// 				oEntry.Closingaccumulatedcredit = this.getView().byId("input_COM_MARINE_COM_REC").getValue();
// 				oEntry.Totalfundcontribution = this.getView().byId("input_COM_MARINE_OTH_COS").getValue();
// 				oEntry.Yeartodatecontributions = this.getView().byId("input_COM_AVIATI_TOT_INS").getValue();
// 				oEntry.Transferfromotherfunds = this.getView().byId("input_COM_AVIATI_TOT_PRE").getValue();
// 				oEntry.Reantalincome = this.getView().byId("input_COM_AVIATI_TOT_POL").getValue();
// 				oEntry.Interestfrominvestments = this.getView().byId("input_COM_AVIATI_COM_REC").getValue();
// 				oEntry.Dividentfrominvestments = this.getView().byId("input_COM_AVIATI_OTH_COS").getValue();
// 				oEntry.Glapremiumsreceived = this.getView().byId("input_COM_P_ACCI_TOT_INS").getValue();
// 				oEntry.Otherincome = this.getView().byId("input_COM_P_ACCI_TOT_PRE").getValue();
// 				oEntry.Totalincome = this.getView().byId("input_COM_P_ACCI_TOT_POL").getValue();
// 				oEntry.Yeartodatemonthly = this.getView().byId("input_COM_P_ACCI_COM_REC").getValue();
// 				oEntry.Commutationspaid = this.getView().byId("input_COM_P_ACCI_OTH_COS").getValue();
// 				oEntry.Fullcommutationspaid = this.getView().byId("input_COM_M_ACCI_TOT_INS").getValue();
// 				oEntry.Staffcosts = this.getView().byId("input_COM_M_ACCI_TOT_PRE").getValue();
// 				oEntry.Adminexpenses = this.getView().byId("input_COM_M_ACCI_TOT_POL").getValue();
// 				oEntry.Investmentmanagementexpenses = this.getView().byId("input_COM_M_ACCI_COM_REC").getValue();
// 				oEntry.Investmentadvisoryservices = this.getView().byId("input_COM_M_ACCI_OTH_COS").getValue();
// 				oEntry.Actuarialfees = this.getView().byId("input_COM_BONDS_TOT_INS").getValue();
// 				oEntry.Auditfees = this.getView().byId("input_COM_BONDS_TOT_PRE").getValue();
// 				oEntry.Legalfees = this.getView().byId("input_COM_BONDS_TOT_POL").getValue();
// 				oEntry.Boardfees = this.getView().byId("input_COM_BONDS_COM_REC").getValue();
// 				oEntry.Grouplifeassurancebenefitspaid = this.getView().byId("input_COM_BONDS_OTH_COS").getValue();
// 				oEntry.Ipeclevies = this.getView().byId("input_COM_FARM_TOT_INS").getValue();
// 				oEntry.Bankcharges = this.getView().byId("input_COM_FARM_TOT_PRE").getValue();
// 				oEntry.Sundryexpenses = this.getView().byId("input_COM_FARM_TOT_POL").getValue();
// 				oEntry.Subscriptionszapf = this.getView().byId("input_COM_FARM_COM_REC").getValue();
// 				oEntry.Propertyexpenses = this.getView().byId("input_COM_FARM_OTH_COS").getValue();
// 				oEntry.Revaluationexpenses = this.getView().byId("input_COM_HAIL_TOT_INS").getValue();
// 				oEntry.Transfertoreserves = this.getView().byId("input_COM_HAIL_TOT_PRE").getValue();
// 				oEntry.Lossprofitondisposalofassets = this.getView().byId("input_COM_HAIL_TOT_POL").getValue();
// 				oEntry.Othersspecifytrusteescopregfee = this.getView().byId("input_COM_HAIL_COM_REC").getValue();
// 				oEntry.Totalexpenditure = this.getView().byId("input_COM_HAIL_OTH_COS").getValue();
// 				oEntry.Surplusdeficit = this.getView().byId("input_COM_HEALTH_TOT_INS").getValue();
// 				oEntry.Property = this.getView().byId("input_COM_HEALTH_TOT_PRE").getValue();
// 				oEntry.Motorvehicles = this.getView().byId("input_COM_HEALTH_TOT_POL").getValue();
// 				oEntry.Computersystems = this.getView().byId("input_COM_HEALTH_COM_REC").getValue();
// 				oEntry.Assetsotherspecify = this.getView().byId("input_COM_HEALTH_OTH_COS").getValue();
// 				oEntry.Totaloperatingassets = this.getView().byId("input_COM_OTHER_TOT_INS").getValue();
// 				oEntry.Investmentproperty = this.getView().byId("input_COM_OTHER_TOT_PRE").getValue();
// 				oEntry.Equitiesquoted = this.getView().byId("input_COM_OTHER_TOT_POL").getValue();
// 				oEntry.Equitiesunquoted = this.getView().byId("input_COM_OTHER_COM_REC").getValue();
// 				oEntry.Prescribedassetsgovernmentstoc = this.getView().byId("input_COM_OTHER_OTH_COS").getValue();
				
// 				//SUMMARY OF BUSINESS PLACED WITH INSURERS WITHIN ZIMBABWE Tab 3
// 					oEntry.Prescribedassetsother = this.getView().byId("input_INS01_NAME").getValue();
// 						oEntry.Fixedinterestsecurities = this.getView().byId("input_INS01_TOT_PRE").getValue();
// 			oEntry.Loansandmortaggesonpropertyex = this.getView().byId("input_INS01_TOT_POL").getValue();
// 			oEntry.Staffloansandmortgages = this.getView().byId("input_INS01_COM_REC").getValue();
// 			oEntry.Longtermdeposits = this.getView().byId("input_INS01_OTH_COS").getValue();
// 			oEntry.Noncurrentotherspecify = this.getView().byId("input_INS02_NAME").getValue();
// 			oEntry.Totalnoncurrentinvestmentasset = this.getView().byId("input_INS02_TOT_PRE").getValue();
// 			oEntry.Contributionarrears = this.getView().byId("input_INS02_TOT_POL").getValue();
// 			oEntry.Rentalarrears = this.getView().byId("input_INS02_COM_REC").getValue();
// 			oEntry.Totalassets = this.getView().byId("input_INS02_OTH_COS").getValue();
// 			oEntry.Reserves = this.getView().byId("input_INS03_NAME").getValue();
// 			oEntry.Provisions = this.getView().byId("input_INS03_TOT_PRE").getValue();
// 			oEntry.Defferedpensionbenefits = this.getView().byId("input_INS03_TOT_POL").getValue();
// 			oEntry.Arrearpensionsionbenefits = this.getView().byId("input_INS03_COM_REC").getValue();
// 			oEntry.Sundrycreditors = this.getView().byId("input_INS03_OTH_COS").getValue();
// 			oEntry.Withdrawals = this.getView().byId("input_INS04_NAME").getValue();
// 			oEntry.Othercreditorsspecify = this.getView().byId("input_INS04_TOT_PRE").getValue();
// 			oEntry.Totalliabilities = this.getView().byId("input_INS04_TOT_POL").getValue();
// 			oEntry.Netassetsavailableforbenefits = this.getView().byId("input_INS04_COM_REC").getValue();
// 			oEntry.Cashreceivedfromcontributions = this.getView().byId("input_INS04_OTH_COS").getValue();
// 			oEntry.Cashtransferredfromtootherfund = this.getView().byId("input_INS05_NAME").getValue();
// 			oEntry.Cashcommutationspaid = this.getView().byId("input_INS05_TOT_PRE").getValue();
// 			oEntry.Withdrawalspaid = this.getView().byId("input_INS05_TOT_POL").getValue();
// 			oEntry.Interestreceived = this.getView().byId("input_INS05_COM_REC").getValue();
// 			oEntry.Dividenreceived = this.getView().byId("input_INS05_OTH_COS").getValue();
// 			oEntry.Taxpaid  = this.getView().byId("input_INS06_NAME").getValue();
// 			oEntry.Cashflowopotherspecify = this.getView().byId("input_INS06_TOT_PRE").getValue();
// 			oEntry.Totalcashfromoperatingactiviti = this.getView().byId("input_INS06_TOT_POL").getValue();
// 			oEntry.Purchaseofinvestmentpropety = this.getView().byId("input_INS06_COM_REC").getValue();
// 			oEntry.Purchaseoperationalassets = this.getView().byId("input_INS06_OTH_COS").getValue();
// 			oEntry.Purchaseofintagibleassets = this.getView().byId("input_INS07_NAME").getValue();
// 			oEntry.Proceedsfromsaleandrealisation = this.getView().byId("input_INS07_TOT_PRE").getValue();
// 			oEntry.Acquisationofsubsidiariesandeq = this.getView().byId("input_INS07_TOT_POL").getValue();
// 			oEntry.Investmentsinloansmortgagesand = this.getView().byId("input_INS07_COM_REC").getValue();
// 			oEntry.Cashfrominvestingotherspecify = this.getView().byId("input_INS07_OTH_COS").getValue();
			
// //	*****************************************end of mapping**************************************************************************************************************

	
// 			oModel.setUseBatch(true);

// 			oModel.create("/ZPENSION_FUNDSet", oEntry, {
// 				success: function(data) {
// 					sap.ui.core.BusyIndicator.hide();
// 					MessageBox.show(
// 						that._oResourceBundle.getText("saveSuccess") + "" + data.ReturnNo, {
// 							icon: MessageBox.Icon.SUCCESS,
// 							title: "Success",
// 							actions: [MessageBox.Action.OK],
// 							id: "msgBox2",
// 							styleClass: bCompact ? "sapUiSizeCompact" : ""
// 						}
// 					);

// 					that._afterSave();
// 				},
// 				error: function(err) {
// 					sap.ui.core.BusyIndicator.hide();
// 					MessageBox.show(

// 						that._oResourceBundle.getText("saveFailed"), {
// 							icon: MessageBox.Icon.ERROR,
// 							title: "Error",
// 							actions: [MessageBox.Action.OK],
// 							id: "msgBox3",
// 							details: err,
// 							styleClass: bCompact ? "sapUiSizeCompact" : ""
// 						}
// 					);

// 				}
// 			});

// 		},
	});
});