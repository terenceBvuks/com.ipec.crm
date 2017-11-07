sap.ui.define([
	"com/ipec/crm/controller/BaseController",
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/m/MessageBox"
], function(BaseController,Controller, MessageToast, MessageBox) {
	"use strict";

	return BaseController.extend("com.ipec.crm.controller.NoneLife", {
		onInit: function () {
			this._Page = this.getView().byId("p1");
			this._oResourceBundle = this.getResourceBundle();
		},

		onCollapseExpandPress: function () {
			var oNavigationList = this.getView().byId('navigationList');
			var bExpanded = oNavigationList.getExpanded();

			oNavigationList.setExpanded(!bExpanded);
		},
		
		handleItemPress: function(oEvent) {
			// MessageToast.show(oEvent.getParameter("item").getText()+" has been clicked");
			var text = oEvent.getParameter("item").getText();

			switch (text) {
				case "Gross Premiums written":
					this.handleNav("p1");
					break;
				case "Reinsurance Premiums":
					this.handleNav("p2");
					break;
				case "Unearned Premium Reserve (UPR) brought forward (net of reinsurance)":
					this.handleNav("p3");
					break;
				case "Unearned Premium Reserve (UPR) carried forward (net of reinsurance)":
					this.handleNav("p4");
					break;
				case "Gross claims paid":
					this.handleNav("p5");
					break;
				case "Reinsurance Claims and other recoveries":
					this.handleNav("p6");
					break;
				case "O/S Claims Reserves brought forward (net of reinsurance) for Reported/Known Claims":
					this.handleNav("p7");
					break;
				case "O/S Claims Reserves carried forward (net of reinsurance) for Reported/Known Claims":
					this.handleNav("p8");
					break;
				case "IBNR Provisions brought forward (net of reinsurance)":
					this.handleNav("p9");
					break;
				case "IBNR Provisions carried forward (net of reinsurance)":
					this.handleNav("p10");
					break;
				case "Gross commission paid":
					this.handleNav("p11");
					break;
				case "Reinsurance commission received":
					this.handleNav("p12");
					break;
				case "Unearned commission reserve (UCR) or DAC brought forward (net of reinsurance)":
					this.handleNav("p13");
					break;
				case "Unearned commission reserve (UCR) or DAC carried forward (net of reinsurance)":
					this.handleNav("p14");
					break;
				default:
					this.notFound();

			}
		},
		
		handleNav: function(target) {
			// MessageToast.show("Handle Nav "+target);
			var navCon = this.getView().byId("navCon");
			// var target = evt.getSource().data("target");
			if (target) {
				var animation = "slide";//this.getView().byId("slide").getSelectedKey();
				navCon.to(this.getView().byId(target), animation);
			} else {
				navCon.back();
			}
		},
		
		handleFlowNav: function(evt) {
			var navCon = this.getView().byId("navNoneLife");
			var target = evt.getSource().data("target");
			if (target) {
				var animation = "slide";//this.getView().byId("slide").getSelectedKey();
				navCon.to(this.getView().byId(target), animation);
			} else {
				navCon.back();
			}
		},
		
		//Method to send odata post request to backend server (save order)
		onSave : function (evt) {
			
				var that=this;
                var oController = this;
				var oModel = oController.oModel;
				
				var oEntry = {};
				var obusyDialog = new sap.m.BusyDialog();
				
							var brokername = this.getView().byId("brokername").getValue();
							var officialname = this.getView().byId("officialname").getValue();
							var date_of_submission = this.getView().byId("date_of_submission").getDateValue();
							var check = this.getView().byId("declaration").getSelected();
							
							var Declaration = "";
							
							if(check === true)
							{
								Declaration = "X";
							}
							
							oEntry.brokername = brokername;
							oEntry.officialname = officialname;
							oEntry.date_of_submission = date_of_submission;
							oEntry.declaration = Declaration;
							
							
							
						//Class and liabilities
							
							//Gross Premiums written
							
							var Fire1 = this.getView().byId("fire1pT2").getValue();
							var Fire2 = this.getView().byId("fire2pT2").getValue();
							
							oEntry.Fire1 = Fire1;
							oEntry.Fire2 = Fire2;
							
							var Motor1 = this.getView().byId("Motor1pT2").getValue();
							var Motor2 = this.getView().byId("Motor2pT2").getValue();
							
							oEntry.Motor1 = Motor1;
							oEntry.Motor2 = Motor2;
							
							var Engineering1  = this.getView().byId("Engineering1pT2").getValue();
							var Engineering2 = this.getView().byId("Engineering2pT2").getValue();
							
							oEntry.Engineering1 = Engineering1 ;
							oEntry.Engineering2 = Engineering2;
							
							var  Marine1= this.getView().byId("Marine1pT2").getValue();
							var  Marine2= this.getView().byId("Marine2pT2").getValue();
							
							oEntry.Marine1 = Marine1;
							oEntry.Marine2 = Marine2;
							
							var Aviation1 = this.getView().byId("Aviation1pT2").getValue();
							var Aviation2 = this.getView().byId("Aviation2pT2").getValue();
							
							oEntry.Aviation1 = Aviation1 ;
							oEntry.Aviation2 = Aviation2 ;
							
							var P_Accident1 = this.getView().byId("P_Accident1pT2").getValue();
							var P_Accident2 = this.getView().byId("P_Accident2pT2").getValue();
							
							oEntry.P_Accident1 = P_Accident1;
							oEntry.P_Accident2= P_Accident2;
							
							var Bonds_Guarantee1 = this.getView().byId("Bonds_Guarantee1pT2").getValue();
							var Bonds_Guarantee2 = this.getView().byId("Bonds_Guarantee2pT2").getValue();
							
							oEntry.Bonds_Guarantee1 = Bonds_Guarantee1;
							oEntry.Bonds_Guarantee2 = Bonds_Guarantee2;
							
							var Credit1 = this.getView().byId("Credit1pT2").getValue();
							var Credit2 = this.getView().byId("Credit2pT2").getValue();
							
							oEntry.Credit1 = Credit1 ;
							oEntry.Credit2 = Credit2 ;
							
							var  Farming1 = this.getView().byId("Farming1pT2").getValue();
							var Farming2 = this.getView().byId("Farming2pT2").getValue();
							
							oEntry.Farming1 = Farming1;
							oEntry.Farming2 = Farming2;
							
							var Current_Totals1 = this.getView().byId("CurrentTotals1pT2").getValue();
							var Current_Totals2 = this.getView().byId("CurrentTotals2pT2").getValue();
							
							oEntry.Current_Totals1 = Current_Totals1;
							oEntry.Current_Totals2 = Current_Totals2;
							
							var Previous_Totals1 = this.getView().byId("PreviousTotals1pT2").getValue();
							var Previous_Totals2 = this.getView().byId("PreviousTotals2pT2").getValue();
							
							oEntry.Previous_Totals1 = Previous_Totals1;
							oEntry.Previous_Totals2 = Previous_Totals2;
							
							var Change1 = this.getView().byId("change1pT2").getValue();
							var Change2 = this.getView().byId("change2pT2").getValue();
							
							oEntry.Change1 = Change1;
							oEntry.Change2 = Change2;
							
							var _Change1 = this.getView().byId("pT2Change1pT2").getValue();
							var _Change2  = this.getView().byId("pT2Change2pT2").getValue();
							
							oEntry._Change1 = _Change1;
							oEntry._Change2 = _Change2;
							
							var U11_1 = this.getView().byId("U111pT2").getValue();
							var U11_2 = this.getView().byId("U112pT2").getValue();
							
							oEntry.U11_1 = U11_1;
							oEntry.U11_2 = U11_2;
							
							//Reinsurance Premiums 
							
							
							var  Fire11= this.getView().byId("Fire11").getValue();
							var  Motor11= this.getView().byId("Motor11").getValue();
							var  Engineering11= this.getView().byId("Engineering11").getValue();
							var  Marine11= this.getView().byId("Marine11").getValue();
							var  Aviation11= this.getView().byId("Aviation11").getValue();
							var PAccident11 = this.getView().byId("PAccident11").getValue();
							var  BondsGuarantee11= this.getView().byId("BondsGuarantee11").getValue();
							var Credit_11 = this.getView().byId("Credit_11").getValue();
							var Farming_11 = this.getView().byId("Farming_11").getValue();
							var CurrentTotals_11 = this.getView().byId("CurrentTotals_11").getValue();
							var PreviousTotals_11 = this.getView().byId("PreviousTotals_11").getValue();
							var Change_11 = this.getView().byId("Change_11").getValue();
							var _Change_11 = this.getView().byId("_Change_11").getValue();
							var  U131= this.getView().byId("U131").getValue();
							var V131 = this.getView().byId("V131").getValue();
							
							oEntry.Fire11 = Fire11;
							oEntry.Motor11 = Motor11;
							oEntry.Engineering11 = Engineering11;
							oEntry.Marine11 = Marine11;
							oEntry.Aviation11 = Aviation11;
							oEntry.PAccident11 = PAccident11;
							oEntry.BondsGuarantee11 = BondsGuarantee11 ;
							oEntry.Credit_11 = Credit_11 ;
							oEntry.Farming_11 = Farming_11;
							oEntry.CurrentTotals_11 = CurrentTotals_11;
							oEntry.PreviousTotals_11 = PreviousTotals_11;
							oEntry.Change_11 = Change_11;
							oEntry._Change_11 = _Change_11;
							oEntry. U131= U131;
							oEntry. V131= V131;
							
							//Unearned Premium Reserve (UPR) brought forward
							
							var _Fire = this.getView().byId("_Fire").getValue();
							var _Motor = this.getView().byId("_Motor").getValue();
							var  _Engineering = this.getView().byId("_Engineering").getValue();
							var _Marine = this.getView().byId("_Marine").getValue();
							var _Aviation = this.getView().byId("_Aviation").getValue();
							var _P_Accident = this.getView().byId("_P_Accident").getValue();
							var _Bonds_Guarantee = this.getView().byId("_Bonds_Guarantee").getValue();
							var _Credit = this.getView().byId("_Credit").getValue();
							var _Farming = this.getView().byId("_Farming").getValue();
							var _Current_Totals = this.getView().byId("_Current_Totals").getValue();
							var _Previous_Totals = this.getView().byId("_Previous_Totals").getValue();
							var _Change = this.getView().byId("_Change").getValue();
							var _Change_ = this.getView().byId("_Change_").getValue();
							
							oEntry._Fire = _Fire ;
							oEntry._Motor = _Motor;
							oEntry._Engineering = _Engineering;
							oEntry._Marine = _Marine ;
							oEntry._Aviation = _Aviation;
							oEntry._P_Accident = _P_Accident;
							oEntry._Bonds_Guarantee = _Bonds_Guarantee;
							oEntry._Credit = _Credit;
							oEntry._Farming = _Farming;
							oEntry._Current_Totals = _Current_Totals;
							oEntry._Previous_Totals = _Previous_Totals;
							oEntry._Change = _Change;
							oEntry._Change_ = _Change_;
							
							//Unearned Premium Reserve (UPR) carried forward
							
							var one_Fire = this.getView().byId("1_Fire").getValue();
							var one_Motor = this.getView().byId("1_Motor").getValue();
							var one_Engineering = this.getView().byId("1_Engineering").getValue();
							var one_Marine = this.getView().byId("1_Marine").getValue();
							var one_Aviation = this.getView().byId("1_Aviation").getValue();
							var one_P_Accident = this.getView().byId("1_P_Accident").getValue();
							var one_Bonds_Guarantee = this.getView().byId("1_Bonds_Guarantee").getValue();
							var one_Credit = this.getView().byId("1_Credit").getValue();
							var one_Farming = this.getView().byId("1_Farming").getValue();
							var one_Current_Totals = this.getView().byId("1_Current_Totals").getValue();
							var one_Previous_Totals = this.getView().byId("1_Previous_Totals").getValue();
							var one_1Change = this.getView().byId("1_1Change").getValue();
							var one_Change_1 = this.getView().byId("1_Change_1").getValue();
							var one_U15 = this.getView().byId("1_U15").getValue();
							var one_Z15 = this.getView().byId("1_Z15").getValue();
							
							oEntry.one_Fire = one_Fire;
							oEntry.one_Motor = one_Motor;
							oEntry.one_Engineering = one_Engineering;
							oEntry.one_Marine = one_Marine;
							oEntry.one_Aviation = one_Aviation;
							oEntry.one_P_Accident = one_P_Accident;
							oEntry.one_Bonds_Guarantee = one_Bonds_Guarantee;
							oEntry.one_Credit = one_Credit;
							oEntry.one_Farming = one_Farming;
							oEntry.one_Current_Totals = one_Current_Totals;
							oEntry.one_Previous_Totals = one_Previous_Totals;
							oEntry.one_1Change = one_1Change;
							oEntry.one_Change_1 = one_Change_1;
							oEntry.one_U15 = one_U15;
							oEntry.one_Z15 = one_Z15;
							
							//Gross claims paid
							
							var two_Fire = this.getView().byId("2_Fire").getValue();
							var two_Motor = this.getView().byId("2_Motor").getValue();
							var two_Engineering = this.getView().byId("2_Engineering").getValue();
							var two_Marine = this.getView().byId("2_Marine").getValue();
							var two_Aviation = this.getView().byId("2_Aviation").getValue();
							var two_PAccident = this.getView().byId("2_PAccident").getValue();
							var two_BondsGuarantee = this.getView().byId("2_BondsGuarantee").getValue();
							var two_Credit = this.getView().byId("2_Credit").getValue();
							var two_Farming = this.getView().byId("2_Farming").getValue();
							var two_Current_Totals = this.getView().byId("2_Current_Totals").getValue();
							var two_Previous_Totals = this.getView().byId("2_Previous_Totals").getValue();
							var two_Change = this.getView().byId("2_Change").getValue();
							var Change_2 = this.getView().byId("Change_2").getValue();
							
							
							oEntry.two_Fire = two_Fire;
							oEntry.two_Motor = two_Motor;
							oEntry.two_Engineering = two_Engineering;
							oEntry.two_Marine = two_Marine;
							oEntry.two_Aviation = two_Aviation;
							oEntry.two_PAccident = two_PAccident;
							oEntry.two_BondsGuarantee = two_BondsGuarantee;
							oEntry.two_Credit = two_Credit;
							oEntry.two_Farming = two_Farming;
							oEntry.two_Current_Totals = two_Current_Totals;
							oEntry.two_Previous_Totals = two_Previous_Totals;
							oEntry.two_Change = two_Change;
							oEntry.Change_2 = Change_2;
							
							//Reinsurance Claims and other recoveries
							
							var three_Fire = this.getView().byId("2_Fire").getValue();
							var three_Motor = this.getView().byId("2_Motor").getValue();
							var three_Engineering = this.getView().byId("2_Engineering").getValue();
							var three_Marine = this.getView().byId("2_Marine").getValue();
							var three_Aviation = this.getView().byId("2_Aviation").getValue();
							var three_PAccident = this.getView().byId("2_PAccident").getValue();
							var three_BondsGuarantee = this.getView().byId("2_BondsGuarantee").getValue();
							var three_Credit = this.getView().byId("2_Credit").getValue();
							var three_Farming = this.getView().byId("2_Farming").getValue();
							var three_Current_Totals = this.getView().byId("2_Current_Totals").getValue();
							var three_Previous_Totals = this.getView().byId("2_Previous_Totals").getValue();
							var three_Change = this.getView().byId("2_Change").getValue();
							var three_Change_3 = this.getView().byId("3_Change_3").getValue();
							
							
							oEntry.three_Fire = three_Fire;
							oEntry.three_Motor = three_Motor;
							oEntry.three_Engineering = three_Engineering;
							oEntry.three_Marine = three_Marine;
							oEntry.three_Aviation = three_Aviation;
							oEntry.three_PAccident = three_PAccident;
							oEntry.three_BondsGuarantee = three_BondsGuarantee;
							oEntry.three_Credit = three_Credit;
							oEntry.three_Farming = three_Farming;
							oEntry.three_Current_Totals = three_Current_Totals;
							oEntry.three_Previous_Totals = three_Previous_Totals;
							oEntry.three_Change = three_Change;
							oEntry.three_Change_3 = three_Change_3;
							
							
							
							//O/S Claims Reserves brought forward
							
							var four_Fire = this.getView().byId("4_Fire").getValue();
							var four_Motor = this.getView().byId("4_Motor").getValue();
							var four_Engineering = this.getView().byId("4_Engineering").getValue();
							var four_Marine = this.getView().byId("4_Marine").getValue();
							var four_Aviation = this.getView().byId("4_Aviation").getValue();
							var four_PAccident = this.getView().byId("4_PAccident").getValue();
							var four_BondsGuarantee = this.getView().byId("4_BondsGuarantee").getValue();
							var four_Credit = this.getView().byId("4_Credit").getValue();
							var four_Farming = this.getView().byId("4_Farming").getValue();
							var four_Current_Totals = this.getView().byId("4_Current_Totals").getValue();
							var four_Previous_Totals = this.getView().byId("4_Previous_Totals").getValue();
							var four_Change = this.getView().byId("4_Change").getValue();
							var four_Change_4 = this.getView().byId("4_Change_4").getValue();
							
							
							oEntry.four_Fire = four_Fire;
							oEntry.four_Motor = four_Motor;
							oEntry.four_Engineering = four_Engineering;
							oEntry.four_Marine = four_Marine;
							oEntry.four_Aviation = four_Aviation;
							oEntry.four_PAccident = four_PAccident;
							oEntry.four_BondsGuarantee = four_BondsGuarantee;
							oEntry.four_Credit = four_Credit;
							oEntry.four_Farming = four_Farming;
							oEntry.four_Current_Totals = four_Current_Totals;
							oEntry.four_Previous_Totals = four_Previous_Totals;
							oEntry.four_Change = four_Change;
							oEntry.four_Change_4 = four_Change_4;
							
							//O/S Claims Reserves carried  forward
							
							var five_Fire = this.getView().byId("5_Fire").getValue();
							var five_Motor = this.getView().byId("5_Motor").getValue();
							var five_Engineering = this.getView().byId("5_Engineering").getValue();
							var five_Marine = this.getView().byId("5_Marine").getValue();
							var five_Aviation = this.getView().byId("5_Aviation").getValue();
							var five_PAccident = this.getView().byId("5_PAccident").getValue();
							var five_BondsGuarantee = this.getView().byId("5_BondsGuarantee").getValue();
							var five_Credit = this.getView().byId("5_Credit").getValue();
							var five_Farming = this.getView().byId("5_Farming").getValue();
							var five_Current_Totals = this.getView().byId("5_Current_Totals").getValue();
							var five_Previous_Totals = this.getView().byId("5_Previous_Totals").getValue();
							var five_Change = this.getView().byId("5_Change").getValue();
							var five_Change_5 = this.getView().byId("5_Change_5").getValue();
							var Z19 = this.getView().byId("Z19").getValue();
							
							
							oEntry.five_Fire = five_Fire;
							oEntry.five_Motor = five_Motor;
							oEntry.five_Engineering = five_Engineering;
							oEntry.five_Marine = five_Marine;
							oEntry.five_Aviation = five_Aviation;
							oEntry.five_PAccident = five_PAccident;
							oEntry.five_BondsGuarantee = five_BondsGuarantee;
							oEntry.five_Credit = five_Credit;
							oEntry.five_Farming = five_Farming;
							oEntry.five_Current_Totals = five_Current_Totals;
							oEntry.five_Previous_Totals = five_Previous_Totals;
							oEntry.five_Change = five_Change;
							oEntry.five_Change_5 = five_Change_5;
							oEntry.Z19 = Z19;
							
							//IBNR Provisions brought forward
							
							var six_Fire = this.getView().byId("6_Fire").getValue();
							var six_Motor = this.getView().byId("6_Motor").getValue();
							var six_Engineering = this.getView().byId("6_Engineering").getValue();
							var six_Marine = this.getView().byId("6_Marine").getValue();
							var six_Aviation = this.getView().byId("6_Aviation").getValue();
							var six_PAccident = this.getView().byId("6_PAccident").getValue();
							var six_BondsGuarantee = this.getView().byId("6_BondsGuarantee").getValue();
							var six_Credit = this.getView().byId("6_Credit").getValue();
							var six_Farming = this.getView().byId("6_Farming").getValue();
							var six_Current_Totals = this.getView().byId("6_Current_Totals").getValue();
							var six_Previous_Totals = this.getView().byId("6_Previous_Totals").getValue();
							var six_Change = this.getView().byId("6_Change").getValue();
							var six_Change_6 = this.getView().byId("6_Change_6").getValue();
							
							
							oEntry.six_Fire = six_Fire;
							oEntry.six_Motor = six_Motor;
							oEntry.six_Engineering = six_Engineering;
							oEntry.six_Marine = six_Marine;
							oEntry.six_Aviation = six_Aviation;
							oEntry.six_PAccident = six_PAccident;
							oEntry.six_BondsGuarantee = six_BondsGuarantee;
							oEntry.six_Credit = six_Credit;
							oEntry.six_Farming = six_Farming;
							oEntry.six_Current_Totals = six_Current_Totals;
							oEntry.six_Previous_Totals = six_Previous_Totals;
							oEntry.six_Change = six_Change;
							oEntry.six_Change_6 = six_Change_6;
							
							//IBNR Provisions carried  forward
							
							var seven_Fire = this.getView().byId("7_Fire").getValue();
							var seven_Motor = this.getView().byId("7_Motor").getValue();
							var seven_Engineering = this.getView().byId("7_Engineering").getValue();
							var seven_Marine = this.getView().byId("7_Marine").getValue();
							var seven_Aviation = this.getView().byId("7_Aviation").getValue();
							var seven_PAccident = this.getView().byId("7_PAccident").getValue();
							var seven_BondsGuarantee = this.getView().byId("7_BondsGuarantee").getValue();
							var seven_Credit = this.getView().byId("7_Credit").getValue();
							var seven_Farming = this.getView().byId("7_Farming").getValue();
							var seven_Current_Totals = this.getView().byId("7_Current_Totals").getValue();
							var seven_Previous_Totals = this.getView().byId("7_Previous_Totals").getValue();
							var seven_Change = this.getView().byId("7_Change").getValue();
							var U21 = this.getView().byId("U21").getValue();
							var Z21 = this.getView().byId("Z21").getValue();
							var AA21 = this.getView().byId("AA21").getValue();
							var AB21 = this.getView().byId("AB21").getValue();
							
							
							oEntry.seven_Fire = seven_Fire;
							oEntry.seven_Motor = seven_Motor;
							oEntry.seven_Engineering = seven_Engineering;
							oEntry.seven_Marine = seven_Marine;
							oEntry.seven_Aviation = seven_Aviation;
							oEntry.seven_PAccident = seven_PAccident;
							oEntry.seven_BondsGuarantee = seven_BondsGuarantee;
							oEntry.seven_Credit = seven_Credit;
							oEntry.seven_Farming = seven_Farming;
							oEntry.seven_Current_Totals = seven_Current_Totals;
							oEntry.seven_Previous_Totals = seven_Previous_Totals;
							oEntry.seven_Change = seven_Change;
							oEntry.U21 = U21;
							oEntry.Z21 = Z21;
							oEntry.AA21 = AA21;
							oEntry.AB21 = AB21;
							
							//Gross commission paid
							
							var eight_Fire = this.getView().byId("8_Fire").getValue();
							var eight_Motor = this.getView().byId("8_Motor").getValue();
							var eight_Engineering = this.getView().byId("8_Engineering").getValue();
							var eight_Marine = this.getView().byId("8_Marine").getValue();
							var eight_Aviation = this.getView().byId("8_Aviation").getValue();
							var eight_PAccident = this.getView().byId("8_PAccident").getValue();
							var eight_BondsGuarantee = this.getView().byId("8_BondsGuarantee").getValue();
							var eight_Credit = this.getView().byId("8_Credit").getValue();
							var eight_Farming = this.getView().byId("8_Farming").getValue();
							var eight_Current_Totals = this.getView().byId("8_Current_Totals").getValue();
							var eight_Previous_Totals = this.getView().byId("8_Previous_Totals").getValue();
							var eight_Change = this.getView().byId("8_Change").getValue();
							var eight_Change_8 = this.getView().byId("8_Change_8").getValue();
							
							
							oEntry.eight_Fire = eight_Fire;
							oEntry.eight_Motor = eight_Motor;
							oEntry.eight_Engineering = eight_Engineering;
							oEntry.eight_Marine = eight_Marine;
							oEntry.eight_Aviation = eight_Aviation;
							oEntry.eight_PAccident = eight_PAccident;
							oEntry.eight_BondsGuarantee = eight_BondsGuarantee;
							oEntry.eight_Credit = eight_Credit;
							oEntry.eight_Farming = eight_Farming;
							oEntry.eight_Current_Totals = eight_Current_Totals;
							oEntry.eight_Previous_Totals = eight_Previous_Totals;
							oEntry.eight_Change = eight_Change;
							oEntry.eight_Change_8 = eight_Change_8;
							
							//Reinsurance commission received
							
							var nine_Fire = this.getView().byId("9_Fire").getValue();
							var nine_Motor = this.getView().byId("9_Motor").getValue();
							var nine_Engineering = this.getView().byId("9_Engineering").getValue();
							var nine_Marine = this.getView().byId("9_Marine").getValue();
							var nine_Aviation = this.getView().byId("9_Aviation").getValue();
							var nine_PAccident = this.getView().byId("9_PAccident").getValue();
							var nine_BondsGuarantee = this.getView().byId("9_BondsGuarantee").getValue();
							var nine_Credit = this.getView().byId("9_Credit").getValue();
							var nine_Farming = this.getView().byId("9_Farming").getValue();
							var nine_Current_Totals = this.getView().byId("9_Current_Totals").getValue();
							var nine_Previous_Totals = this.getView().byId("9_Previous_Totals").getValue();
							var nine_Change = this.getView().byId("9_Change").getValue();
							var nine_Change_9 = this.getView().byId("9_Change_9").getValue();
							var U23 = this.getView().byId("U23").getValue();
							var V23 = this.getView().byId("V23").getValue();
							
							
							oEntry.nine_Fire = nine_Fire;
							oEntry.nine_Motor = nine_Motor;
							oEntry.nine_Engineering = nine_Engineering;
							oEntry.nine_Marine = nine_Marine;
							oEntry.nine_Aviation = nine_Aviation;
							oEntry.nine_PAccident = nine_PAccident;
							oEntry.nine_BondsGuarantee = nine_BondsGuarantee;
							oEntry.nine_Credit = nine_Credit;
							oEntry.nine_Farming = nine_Farming;
							oEntry.nine_Current_Totals = nine_Current_Totals;
							oEntry.nine_Previous_Totals = nine_Previous_Totals;
							oEntry.nine_Change = nine_Change;
							oEntry.nine_Change_9 = nine_Change_9;
							oEntry.U23 = U23;
							oEntry.V23 = V23;
							
							//Unearned commission reserve (UCR)
							
							var ten_Fire = this.getView().byId("10_Fire").getValue();
							var ten_Motor = this.getView().byId("10_Motor").getValue();
							var ten_Engineering = this.getView().byId("10_Engineering").getValue();
							var ten_Marine = this.getView().byId("10_Marine").getValue();
							var ten_Aviation = this.getView().byId("10_Aviation").getValue();
							var ten_PAccident = this.getView().byId("10_PAccident").getValue();
							var ten_BondsGuarantee = this.getView().byId("10_BondsGuarantee").getValue();
							var ten_Credit = this.getView().byId("10_Credit").getValue();
							var ten_Farming = this.getView().byId("10_Farming").getValue();
							var ten_Current_Totals = this.getView().byId("10_Current_Totals").getValue();
							var ten_Previous_Totals = this.getView().byId("10_Previous_Totals").getValue();
							var ten_Change = this.getView().byId("10_Change").getValue();
							var ten_Change_10 = this.getView().byId("10_Change_10").getValue();
							
							
							oEntry.ten_Fire = ten_Fire;
							oEntry.ten_Motor = ten_Motor;
							oEntry.ten_Engineering = ten_Engineering;
							oEntry.ten_Marine = ten_Marine;
							oEntry.ten_Aviation = ten_Aviation;
							oEntry.ten_PAccident = ten_PAccident;
							oEntry.ten_BondsGuarantee = ten_BondsGuarantee;
							oEntry.ten_Credit = ten_Credit;
							oEntry.ten_Farming = ten_Farming;
							oEntry.ten_Current_Totals = ten_Current_Totals;
							oEntry.ten_Previous_Totals = ten_Previous_Totals;
							oEntry.ten_Change = ten_Change;
							oEntry.ten_Change_10 = ten_Change_10;
							
							//Unearned commission reserve (UCR) or DAC carried forward (net of reinsurance)
							
							var eleven_Fire = this.getView().byId("11_Fire").getValue();
							var eleven_Motor = this.getView().byId("11_Motor").getValue();
							var eleven_Engineering = this.getView().byId("11_Engineering").getValue();
							var eleven_Marine = this.getView().byId("11_Marine").getValue();
							var eleven_Aviation = this.getView().byId("11_Aviation").getValue();
							var eleven_PAccident = this.getView().byId("11_PAccident").getValue();
							var eleven_BondsGuarantee = this.getView().byId("11_BondsGuarantee").getValue();
							var eleven_Credit = this.getView().byId("11_Credit").getValue();
							var eleven_Farming = this.getView().byId("11_Farming").getValue();
							var eleven_Current_Totals = this.getView().byId("11_Current_Totals").getValue();
							var eleven_Previous_Totals = this.getView().byId("11_Previous_Totals").getValue();
							var eleven_Change = this.getView().byId("11_Change").getValue();
							var eleven_Change_11 = this.getView().byId("11_Change_11").getValue();
							var Z25_1 = this.getView().byId("Z25_1").getValue();
							
							
							oEntry.eleven_Fire = eleven_Fire;
							oEntry.eleven_Motor = eleven_Motor;
							oEntry.eleven_Engineering = eleven_Engineering;
							oEntry.eleven_Marine = eleven_Marine;
							oEntry.eleven_Aviation = eleven_Aviation;
							oEntry.eleven_PAccident = eleven_PAccident;
							oEntry.eleven_BondsGuarantee = eleven_BondsGuarantee;
							oEntry.eleven_Credit = eleven_Credit;
							oEntry.eleven_Farming = eleven_Farming;
							oEntry.eleven_Current_Totals = eleven_Current_Totals;
							oEntry.eleven_Previous_Totals = eleven_Previous_Totals;
							oEntry.eleven_Change = eleven_Change;
							oEntry.eleven_Change_11 = eleven_Change_11;
							oEntry.Z25_1 = Z25_1;
							
						
						//Equity and liabilities
						
							//Tab One
							var Shareholders_Equity1 = this.getView().byId("Shareholders_Equity1").getValue();
							var Shareholders_Equity2 = this.getView().byId("Shareholders_Equity2").getValue();
							var Share_Capital1 = this.getView().byId("Share_Capital1").getValue();
							var Share_Capital2 = this.getView().byId("Share_Capital2").getValue();
							var Share_Premium1 = this.getView().byId("Share_Premium1").getValue();
							var Share_Premium2 = this.getView().byId("Share_Premium2").getValue();
							var Revaluation_and_other_Reserves1 = this.getView().byId("Revaluation_and_other_Reserves1").getValue();
							var Revaluation_and_other_Reserves2 = this.getView().byId("Revaluation_and_other_Reserves2").getValue();
							var Retained_Income1 = this.getView().byId("Retained_Income1").getValue();
							var Retained_Income2 = this.getView().byId("Retained_Income2").getValue();
							var Minority_Interest1 = this.getView().byId("Minority_Interest1").getValue();
							var Minority_Interest2 = this.getView().byId("Minority_Interest2").getValue();
							var Shareholder_Equity_Total1 = this.getView().byId("Shareholder_Equity_Total1").getValue();
							var Shareholder_Equity_Total2 = this.getView().byId("Shareholder_Equity_Total2").getValue();
							
							
							oEntry.Shareholders_Equity1 = Shareholders_Equity1;
							oEntry.Shareholders_Equity2 = Shareholders_Equity2;
							oEntry.Share_Capital1 = Share_Capital1;
							oEntry.Share_Capital2 = Share_Capital2;
							oEntry.Share_Premium1 = Share_Premium1;
							oEntry.Share_Premium2 = Share_Premium2;
							oEntry.Revaluation_and_other_Reserves1 = Revaluation_and_other_Reserves1;
							oEntry.Revaluation_and_other_Reserves2 = Revaluation_and_other_Reserves2;
							oEntry.Retained_Income1 = Retained_Income1;
							oEntry.Retained_Income2 = Retained_Income2;
							oEntry.Minority_Interest1 = Minority_Interest1;
							oEntry.Minority_Interest2 = Minority_Interest2;
							oEntry.Shareholder_Equity_Total1 = Shareholder_Equity_Total1;
							oEntry.Shareholder_Equity_Total2 = Shareholder_Equity_Total2;
							
							
							//Tab Two 
							var Non_current_liabilities1 = this.getView().byId("Non_current_liabilities1").getValue();
							var Deferred_Taxation1 = this.getView().byId("Deferred_Taxation1").getValue();
							var Long_term_Loan1 = this.getView().byId("Long_term_Loan1").getValue();
							var Total_Non_Current_Liabilities1 = this.getView().byId("Total_Non_Current_Liabilities1").getValue();
							var Current_liabilitie1 = this.getView().byId("Current_liabilitie1").getValue();
							var Provision_for_Taxation1 = this.getView().byId("Provision_for_Taxation1").getValue();
							var Current_Provisions1 = this.getView().byId("Current_Provisions1").getValue();
							
							var Non_current_liabilities2 = this.getView().byId("Non_current_liabilities2").getValue();
							var Deferred_Taxation2 = this.getView().byId("Deferred_Taxation2").getValue();
							var Long_term_Loan2 = this.getView().byId("Long_term_Loan2").getValue();
							var Total_Non_Current_Liabilities2 = this.getView().byId("Total_Non_Current_Liabilities2").getValue();
							var Current_liabilitie2 = this.getView().byId("Current_liabilitie2").getValue();
							var Provision_for_Taxation2 = this.getView().byId("Provision_for_Taxation2").getValue();
							var Current_Provisions2 = this.getView().byId("Current_Provisions2").getValue();
							
							oEntry.Non_current_liabilities1 = Non_current_liabilities1;
							oEntry.Deferred_Taxation1 = Deferred_Taxation1;
							oEntry.Long_term_Loan1 = Long_term_Loan1;
							oEntry.Total_Non_Current_Liabilities1 = Total_Non_Current_Liabilities1;
							oEntry.Current_liabilitie1 = Current_liabilitie1;
							oEntry.Provision_for_Taxation1 = Provision_for_Taxation1;
							oEntry.Current_Provisions1 = Current_Provisions1;
							
							oEntry.Non_current_liabilities2 = Non_current_liabilities2;
							oEntry.Deferred_Taxation2 = Deferred_Taxation2;
							oEntry.Long_term_Loan2 = Long_term_Loan2;
							oEntry.Total_Non_Current_Liabilities2 = Total_Non_Current_Liabilities2;
							oEntry.Current_liabilitie2 = Current_liabilitie2;
							oEntry.Provision_for_Taxation2 = Provision_for_Taxation2;
							oEntry.Current_Provisions2 = Current_Provisions2;
							
							//Tab Three
							var Bank_Overdrafts1 = this.getView().byId("Bank_Overdrafts1").getValue();
							var Bank_Overdrafts2 = this.getView().byId("Bank_Overdrafts2").getValue();
							var Share_Based_Payment_Reserve1 = this.getView().byId("Share_Based_Payment_Reserve1").getValue();
							var  Share_Based_Payment_Reserve2 = this.getView().byId("Share_Based_Payment_Reserve2").getValue();
							var  Other_payables1 = this.getView().byId("Other_payables1").getValue();
							var  Other_payables2 = this.getView().byId("Other_payables2").getValue();
							var  Total_Current_Liabilities1 = this.getView().byId("Total_Current_Liabilities1").getValue();
							var  Total_Current_Liabilities2 = this.getView().byId("Total_Current_Liabilities2").getValue();
							var  Technical_Liabilities1 = this.getView().byId("Technical_Liabilities1").getValue();
							var  Technical_Liabilities2 = this.getView().byId("Technical_Liabilities2").getValue();
							var  Gross_Reported_Outstanding_Claims1 = this.getView().byId("Gross_Reported_Outstanding_Claims1").getValue();
							var  Gross_Reported_Outstanding_Claims2 = this.getView().byId("Gross_Reported_Outstanding_Claims1").getValue();
							var  Reinsurance_creditors1 = this.getView().byId("Reinsurance_creditors1").getValue();
							var  Reinsurance_creditors2 = this.getView().byId("Reinsurance_creditors2").getValue();
							
							oEntry.Bank_Overdrafts1 = Bank_Overdrafts1;
							oEntry.Bank_Overdrafts2 = Bank_Overdrafts2 ;
							oEntry.Share_Based_Payment_Reserve1 = Share_Based_Payment_Reserve1;
							oEntry.Share_Based_Payment_Reserve2 = Share_Based_Payment_Reserve2;
							oEntry.Other_payables1= Other_payables1;
							oEntry.Other_payables2 = Other_payables2;
							oEntry.Total_Current_Liabilities1 = Total_Current_Liabilities1;
							oEntry.Total_Current_Liabilities2 = Total_Current_Liabilities2;
							oEntry.Technical_Liabilities1 = Technical_Liabilities1;
							oEntry.Technical_Liabilities2 = Technical_Liabilities2;
							oEntry.Gross_Reported_Outstanding_Claims1 = Gross_Reported_Outstanding_Claims1 ;
							oEntry.Gross_Reported_Outstanding_Claims2 = Gross_Reported_Outstanding_Claims2;
							oEntry.Reinsurance_creditors1 = Reinsurance_creditors1;
							oEntry.Reinsurance_creditors2 = Reinsurance_creditors2;
							
							//Tab Four
							
							var Incurred_But_Not_Reported_Claims1 = this.getView().byId("Incurred_But_Not_Reported_Claims1").getValue();
							var Incurred_But_Not_Reported_Claims2 = this.getView().byId("Incurred_But_Not_Reported_Claims2").getValue();
							var Unearned_Premium_Reserves1 = this.getView().byId("Unearned_Premium_Reserves1").getValue();
							var Unearned_Premium_Reserves2 = this.getView().byId("Unearned_Premium_Reserves2").getValue();
							var Total_Technical_Liabilities1 = this.getView().byId("Total_Technical_Liabilities1").getValue();
							var Total_Technical_Liabilities2 = this.getView().byId("Total_Technical_Liabilities2").getValue();
							var TOTAL_EQUITY_AND_LIBILITIES1 = this.getView().byId("TOTAL_EQUITY_AND_LIBILITIES1").getValue();
							var TOTAL_EQUITY_AND_LIBILITIES2 = this.getView().byId("TOTAL_EQUITY_AND_LIBILITIES2").getValue();
							
							oEntry.Incurred_But_Not_Reported_Claims1 = Incurred_But_Not_Reported_Claims1;
							oEntry.Incurred_But_Not_Reported_Claims2 = Incurred_But_Not_Reported_Claims2;
							oEntry.Unearned_Premium_Reserves1 = Unearned_Premium_Reserves1;
							oEntry.Unearned_Premium_Reserves2 = Unearned_Premium_Reserves2;
							oEntry.Total_Technical_Liabilities1 = Total_Technical_Liabilities1;
							oEntry.Total_Technical_Liabilities2 = Total_Technical_Liabilities2;
							oEntry.TOTAL_EQUITY_AND_LIBILITIES1 = TOTAL_EQUITY_AND_LIBILITIES1;
							oEntry.TOTAL_EQUITY_AND_LIBILITIES2 = TOTAL_EQUITY_AND_LIBILITIES2;
						
						//Asserts
						
							//Tab One
							var Non_Current_Assets1 = this.getView().byId("Non_Current_Assets1").getValue();
							var Non_Current_Assets2 = this.getView().byId("Non_Current_Assets2").getValue();
							var Investments_In_Properties_and_Equipment1 = this.getView().byId("Investments_In_Properties_and_Equipment1").getValue();
							var Investments_In_Properties_and_Equipment2 = this.getView().byId("Investments_In_Properties_and_Equipment2").getValue();
							var Investment_Property1 = this.getView().byId("Investment_Property1").getValue();
							var Investment_Property2 = this.getView().byId("Investment_Property2").getValue();
							var Investments_in_Quoted_Equities1 = this.getView().byId("Investments_in_Quoted_Equities1").getValue();
							var Investments_in_Quoted_Equities2 = this.getView().byId("Investments_in_Quoted_Equities2").getValue();
							var Investments_in_Unquoted_Equities1 = this.getView().byId("Investments_in_Unquoted_Equities1").getValue();
							var Investments_in_Unquoted_Equities2 = this.getView().byId("Investments_in_Unquoted_Equities2").getValue();
							var Long_term_Fixed_Deposits1 = this.getView().byId("Long_term_Fixed_Deposits1").getValue();
							var Long_term_Fixed_Deposits2 = this.getView().byId("Long_term_Fixed_Deposits2").getValue();
							var Investment_in_Associated_Companies1 = this.getView().byId("Investment_in_Associated_Companies1").getValue();
							var Investment_in_Associated_Companies2 = this.getView().byId("Investment_in_Associated_Companies2").getValue();
							
							oEntry.Non_Current_Assets1 = Non_Current_Assets1;
							oEntry.Non_Current_Assets2 = Non_Current_Assets2 ;
							oEntry.Investments_In_Properties_and_Equipment1 = Investments_In_Properties_and_Equipment1 ;
							oEntry.Investments_In_Properties_and_Equipment2 = Investments_In_Properties_and_Equipment2;
							oEntry.Investment_Property1 = Investment_Property1;
							oEntry.Investment_Property2 = Investment_Property2 ;
							oEntry.Investments_in_Quoted_Equities1 = Investments_in_Quoted_Equities1 ;
							oEntry.Investments_in_Quoted_Equities2 = Investments_in_Quoted_Equities2 ;
							oEntry.Investments_in_Unquoted_Equities1 = Investments_in_Unquoted_Equities1 ;
							oEntry.Investments_in_Unquoted_Equities2 = Investments_in_Unquoted_Equities2 ;
							oEntry.Long_term_Fixed_Deposits1 = Long_term_Fixed_Deposits1 ;
							oEntry.Long_term_Fixed_Deposits2 = Long_term_Fixed_Deposits2 ;
							oEntry.Investment_in_Associated_Companies1 = Investment_in_Associated_Companies1 ;
							oEntry.Investment_in_Associated_Companies2 = Investment_in_Associated_Companies2 ;
							
							//Tab Two
							
							var Intangible_Assets1  = this.getView().byId("Intangible_Assets1").getValue();
							var Intangible_Assets2 = this.getView().byId("Intangible_Assets2	").getValue();
							var Total_Non_Current_Assets1 = this.getView().byId("Total_Non_Current_Assets1").getValue();
							var Total_Non_Current_Assets2 = this.getView().byId("Total_Non_Current_Assets2").getValue();
							var Technical_Assets1 = this.getView().byId("Technical_Assets1").getValue();
							var Technical_Assets2 = this.getView().byId("Technical_Assets2").getValue();
							var Reinsurers_Share_of_Outstanding_Claims1 = this.getView().byId("Reinsurers_Share_of_Outstanding_Claims1").getValue();
							var Reinsurers_Share_of_Outstanding_Claims2 = this.getView().byId("Reinsurers_Share_of_Outstanding_Claims2").getValue();
							var DAC_or_UCR1 = this.getView().byId("DAC_or_UCR1").getValue();
							var DAC_or_UCR2 = this.getView().byId("DAC_or_UCR2").getValue();
							var Total_Technical_Assets1 = this.getView().byId("Total_Technical_Assets1").getValue();
							var Total_Technical_Assets2 = this.getView().byId("Total_Technical_Assets2").getValue();
							var Current_Assets1 = this.getView().byId("Current_Assets1").getValue();
							var Current_Assets2 = this.getView().byId("Current_Assets2").getValue();
							
							
							oEntry.Intangible_Assets1 = Intangible_Assets1 ;
							oEntry.Intangible_Assets2 = Intangible_Assets2 ;
							oEntry.Total_Non_Current_Assets1 = Total_Non_Current_Assets1 ;
							oEntry.Total_Non_Current_Assets2 =  Total_Non_Current_Assets2;
							oEntry.Technical_Assets1 = Technical_Assets1 ;
							oEntry.Technical_Assets2 = Technical_Assets2 ;
							oEntry.Reinsurers_Share_of_Outstanding_Claims1 = Reinsurers_Share_of_Outstanding_Claims1 ;
							oEntry.Reinsurers_Share_of_Outstanding_Claims2 = Reinsurers_Share_of_Outstanding_Claims2;
							oEntry.DAC_or_UCR1 = DAC_or_UCR1;
							oEntry.DAC_or_UCR2 = DAC_or_UCR2 ;
							oEntry.Total_Technical_Assets1 = Total_Technical_Assets1 ;
							oEntry.Total_Technical_Assets2 = Total_Technical_Assets2;
							oEntry.Current_Assets1 = Current_Assets1;
							oEntry.Current_Assets2 = Current_Assets2;
							
							//Tab Three
							
							var Investments_in_the_Money_Market1  = this.getView().byId("Investments_in_the_Money_Market1").getValue();
							var Investments_in_the_Money_Market2 = this.getView().byId("Investments_in_the_Money_Market2").getValue();
							var Cash_And_Cash_Equivalents1  = this.getView().byId("Cash_And_Cash_Equivalents1").getValue();
							var Cash_And_Cash_Equivalents2 = this.getView().byId("Cash_And_Cash_Equivalents2").getValue();
							var Premium_Receivable_Debtors1 = this.getView().byId("Premium_Receivable_Debtors1").getValue();
							var Premium_Receivable_Debtors2  = this.getView().byId("Premium_Receivable_Debtors2").getValue();
							var Investments_in_Prescribed_Assets1 = this.getView().byId("Investments_in_Prescribed_Assets1").getValue();
							var Investments_in_Prescribed_Assets2 = this.getView().byId("Investments_in_Prescribed_Assets2").getValue();
							var Accured_Investment_Income1 = this.getView().byId("Accured_Investment_Income1").getValue();
							var Accured_Investment_Income2 = this.getView().byId("Accured_Investment_Income2").getValue();
							var Other_current_assets1 = this.getView().byId("Other_current_assets1").getValue();
							var Other_current_assets2 = this.getView().byId("Other_current_assets2").getValue();
							var Current_Tax_Asset1 = this.getView().byId("Current_Tax_Asset1").getValue();
							var Current_Tax_Asset2 = this.getView().byId("Current_Tax_Asset2").getValue();
							var Total_Current_Assets1 = this.getView().byId("Total_Current_Assets1").getValue();
							var Total_Current_Assets2 = this.getView().byId("Total_Current_Assets2").getValue();
							var TOTAL_ASSETS1 = this.getView().byId("TOTAL_ASSETS1").getValue();
							var TOTAL_ASSETS2 = this.getView().byId("TOTAL_ASSETS2").getValue();
							
							oEntry.Investments_in_the_Money_Market1 = Investments_in_the_Money_Market1 ;
							oEntry.Investments_in_the_Money_Market2 = Investments_in_the_Money_Market2 ;
							oEntry.Cash_And_Cash_Equivalents1 = Cash_And_Cash_Equivalents1;
							oEntry.Cash_And_Cash_Equivalents2 = Cash_And_Cash_Equivalents2;
							oEntry.Premium_Receivable_Debtors1 = Premium_Receivable_Debtors1;
							oEntry.Premium_Receivable_Debtors2 = Premium_Receivable_Debtors2;
							oEntry.Investments_in_Prescribed_Assets1 = Investments_in_Prescribed_Assets1;
							oEntry.Investments_in_Prescribed_Assets2 = Investments_in_Prescribed_Assets2;
							oEntry.Accured_Investment_Income1 = Accured_Investment_Income1 ;
							oEntry.Accured_Investment_Income2 = Accured_Investment_Income2;
							oEntry.Other_current_assets1 = Other_current_assets1;
							oEntry.Other_current_assets2 = Other_current_assets2;
							oEntry.Current_Tax_Asset1 = Current_Tax_Asset1;
							oEntry.Current_Tax_Asset2 = Current_Tax_Asset2;
							oEntry.Total_Current_Assets1 = Total_Current_Assets1 ;
							oEntry.Total_Current_Assets2 = Total_Current_Assets2 ;
							oEntry.TOTAL_ASSETS1 = TOTAL_ASSETS1 ;
							oEntry.TOTAL_ASSETS2 = TOTAL_ASSETS2;
						
						//Income
						
							//Tab One
							
							var Gross_premiums1 = this.getView().byId("Gross_premiums1").getValue();
							var Gross_premiums2 = this.getView().byId("Gross_premiums2").getValue();
							var Gross_premiums3 = this.getView().byId("Gross_premiums3").getValue();
							var Gross_premiums4 = this.getView().byId("Gross_premiums4").getValue();
							var Gross_premiums5 = this.getView().byId("Gross_premiums5").getValue();
							var Gross_premiums6 = this.getView().byId("Gross_premiums6").getValue();
							
							var Reinsurance1 = this.getView().byId("Reinsurance1").getValue();
							var Reinsurance2 = this.getView().byId("Reinsurance2").getValue();
							var Reinsurance3 = this.getView().byId("Reinsurance3").getValue();
							var Reinsurance4 = this.getView().byId("Reinsurance4").getValue();
							var Reinsurance5 = this.getView().byId("Reinsurance5").getValue();
							var Reinsurance6 = this.getView().byId("Reinsurance6").getValue();
							
							var Premiums_written_less_reinsurance1 = this.getView().byId("Premiums_written_less_reinsurance1").getValue();
							var Premiums_written_less_reinsurance2 = this.getView().byId("Premiums_written_less_reinsurance1").getValue();
							var Premiums_written_less_reinsurance3 = this.getView().byId("Premiums_written_less_reinsurance1").getValue();
							var Premiums_written_less_reinsurance4 = this.getView().byId("Premiums_written_less_reinsurance1").getValue();
							var Premiums_written_less_reinsurance5 = this.getView().byId("Premiums_written_less_reinsurance1").getValue();
							var Premiums_written_less_reinsurance6 = this.getView().byId("Premiums_written_less_reinsurance1").getValue();
							
							oEntry.Gross_premiums1 = Gross_premiums1;
							oEntry.Gross_premiums2 = Gross_premiums2;
							oEntry.Gross_premiums3 = Gross_premiums3;
							oEntry.Gross_premiums4 = Gross_premiums4;
							oEntry.Gross_premiums5 = Gross_premiums5;
							oEntry.Gross_premiums6 = Gross_premiums6;
							
							oEntry.Reinsurance1 = Reinsurance1;
							oEntry.Reinsurance2 = Reinsurance2;
							oEntry.Reinsurance3 = Reinsurance3;
							oEntry.Reinsurance4 = Reinsurance4;
							oEntry.Reinsurance5 = Reinsurance5;
							oEntry.Reinsurance6 = Reinsurance6;
							
							oEntry.Premiums_written_less_reinsurance1 = Premiums_written_less_reinsurance1;
							oEntry.Premiums_written_less_reinsurance2 = Premiums_written_less_reinsurance2;
							oEntry.Premiums_written_less_reinsurance3 = Premiums_written_less_reinsurance3;
							oEntry.Premiums_written_less_reinsurance4 = Premiums_written_less_reinsurance4;
							oEntry.Premiums_written_less_reinsurance5 = Premiums_written_less_reinsurance5;
							oEntry.Premiums_written_less_reinsurance6 = Premiums_written_less_reinsurance6;
							
							
							var Transfer_to_from_unearned_premiums1 = this.getView().byId("Transfer_to_from_unearned_premiums1").getValue();
							var Transfer_to_from_unearned_premiums2 = this.getView().byId("Transfer_to_from_unearned_premiums2").getValue();
							var Transfer_to_from_unearned_premiums3 = this.getView().byId("Transfer_to_from_unearned_premiums3").getValue();
							var Transfer_to_from_unearned_premiums4 = this.getView().byId("Transfer_to_from_unearned_premiums4").getValue();
							var Transfer_to_from_unearned_premiums5 = this.getView().byId("Transfer_to_from_unearned_premiums5").getValue();
							var Transfer_to_from_unearned_premiums6 = this.getView().byId("Transfer_to_from_unearned_premiums6").getValue();
							
							
							oEntry.Transfer_to_from_unearned_premiums1 = Transfer_to_from_unearned_premiums1;
							oEntry.Transfer_to_from_unearned_premiums2 = Transfer_to_from_unearned_premiums2;
							oEntry.Transfer_to_from_unearned_premiums3 = Transfer_to_from_unearned_premiums3;
							oEntry.Transfer_to_from_unearned_premiums4 = Transfer_to_from_unearned_premiums4;
							oEntry.Transfer_to_from_unearned_premiums5 = Transfer_to_from_unearned_premiums5;
							oEntry.Transfer_to_from_unearned_premiums6 = Transfer_to_from_unearned_premiums6;
							
							var Earned_premiums1 = this.getView().byId("Earned_premiums1").getValue();
							var Earned_premiums2 = this.getView().byId("Earned_premiums2").getValue();
							var Earned_premiums3 = this.getView().byId("Earned_premiums3").getValue();
							var Earned_premiums4 = this.getView().byId("Earned_premiums4").getValue();
							var Earned_premiums5 = this.getView().byId("Earned_premiums5").getValue();
							var Earned_premiums6 = this.getView().byId("Earned_premiums6").getValue();
							
							oEntry.Earned_premiums1 = Earned_premiums1;
							oEntry.Earned_premiums2 = Earned_premiums2;
							oEntry.Earned_premiums3 = Earned_premiums3;
							oEntry.Earned_premiums4 = Earned_premiums4;
							oEntry.Earned_premiums5 = Earned_premiums5;
							oEntry.Earned_premiums6 = Earned_premiums6;
						
						//Expenditure
						
							//Tab One
							
							var Claims_paid_And_outstanding_claims_mvt1  = this.getView().byId("Claims_paid_And_outstanding_claims_mvt1").getValue();
							var Claims_paid_And_outstanding_claims_mvt2 = this.getView().byId("Claims_paid_And_outstanding_claims_mvt2").getValue();
							var Claims_paid_And_outstanding_claims_mvt3 = this.getView().byId("Claims_paid_And_outstanding_claims_mvt3").getValue();
							var Claims_paid_And_outstanding_claims_mvt4 = this.getView().byId("Claims_paid_And_outstanding_claims_mvt4").getValue();
							var Claims_paid_And_outstanding_claims_mvt5 = this.getView().byId("Claims_paid_And_outstanding_claims_mvt5").getValue();
							var Claims_paid_And_outstanding_claims_mvt6 = this.getView().byId("Claims_paid_And_outstanding_claims_mvt6").getValue();
							
							oEntry.Claims_paid_And_outstanding_claims_mvt1 = Claims_paid_And_outstanding_claims_mvt1;
							oEntry.Claims_paid_And_outstanding_claims_mvt2 = Claims_paid_And_outstanding_claims_mvt2;
							oEntry.Claims_paid_And_outstanding_claims_mvt3 = Claims_paid_And_outstanding_claims_mvt3;
							oEntry.Claims_paid_And_outstanding_claims_mvt4 = Claims_paid_And_outstanding_claims_mvt4;
							oEntry.Claims_paid_And_outstanding_claims_mvt5 = Claims_paid_And_outstanding_claims_mvt5 ;
							oEntry.Claims_paid_And_outstanding_claims_mvt6 = Claims_paid_And_outstanding_claims_mvt6;
							
							var Incurred_but_not_reported_claims_mvt_IBNR1 = this.getView().byId("Incurred_but_not_reported_claims_mvt_IBNR1").getValue();
							var Incurred_but_not_reported_claims_mvt_IBNR2 = this.getView().byId("Incurred_but_not_reported_claims_mvt_IBNR2").getValue();
							var Incurred_but_not_reported_claims_mvt_IBNR3 = this.getView().byId("Incurred_but_not_reported_claims_mvt_IBNR3").getValue();
							var Incurred_but_not_reported_claims_mvt_IBNR4 = this.getView().byId("Incurred_but_not_reported_claims_mvt_IBNR4").getValue();
							var Incurred_but_not_reported_claims_mvt_IBNR5 = this.getView().byId("Incurred_but_not_reported_claims_mvt_IBNR5").getValue();
							var Incurred_but_not_reported_claims_mvt_IBNR6 = this.getView().byId("Incurred_but_not_reported_claims_mvt_IBNR6").getValue();
	
							oEntry.Incurred_but_not_reported_claims_mvt_IBNR1 = Incurred_but_not_reported_claims_mvt_IBNR1 ;
							oEntry.Incurred_but_not_reported_claims_mvt_IBNR2 = Incurred_but_not_reported_claims_mvt_IBNR2;
							oEntry.Incurred_but_not_reported_claims_mvt_IBNR3 = Incurred_but_not_reported_claims_mvt_IBNR3;
							oEntry.Incurred_but_not_reported_claims_mvt_IBNR4 = Incurred_but_not_reported_claims_mvt_IBNR4;
							oEntry.Incurred_but_not_reported_claims_mvt_IBNR5 = Incurred_but_not_reported_claims_mvt_IBNR5;
							oEntry.Incurred_but_not_reported_claims_mvt_IBNR6 = Incurred_but_not_reported_claims_mvt_IBNR6;
							
							var Unearned_premium_reserve_mvt_DA1 = this.getView().byId("Unearned_premium_reserve_mvt_DA1").getValue();
							var Unearned_premium_reserve_mvt_DA2 = this.getView().byId("Unearned_premium_reserve_mvt_DA2").getValue();
							var Unearned_premium_reserve_mvt_DA3  = this.getView().byId("Unearned_premium_reserve_mvt_DA3").getValue();
							var Unearned_premium_reserve_mvt_DA4 = this.getView().byId("Unearned_premium_reserve_mvt_DA4").getValue();
							var Unearned_premium_reserve_mvt_DA5 = this.getView().byId("Unearned_premium_reserve_mvt_DA5").getValue();
							var Unearned_premium_reserve_mvt_DA6 = this.getView().byId("Unearned_premium_reserve_mvt_DA6").getValue();
							
							oEntry.Unearned_premium_reserve_mvt_DA1 = Unearned_premium_reserve_mvt_DA1;
							oEntry.Unearned_premium_reserve_mvt_DA2 = Unearned_premium_reserve_mvt_DA2;
							oEntry.Unearned_premium_reserve_mvt_DA3 = Unearned_premium_reserve_mvt_DA3;
							oEntry.Unearned_premium_reserve_mvt_DA4 = Unearned_premium_reserve_mvt_DA4;
							oEntry.Unearned_premium_reserve_mvt_DA5 = Unearned_premium_reserve_mvt_DA5;
							oEntry.Unearned_premium_reserve_mvt_DA6 = Unearned_premium_reserve_mvt_DA6;
							
							
							var Commissions1 = this.getView().byId("Commissions1").getValue();
							var Commissions2  = this.getView().byId("Commissions2").getValue();
							var Commissions3  = this.getView().byId("Commissions3").getValue();
							var Commissions4= this.getView().byId("Commissions4").getValue();
							var Commissions5  = this.getView().byId("Commissions5").getValue();
							var Commissions6 = this.getView().byId("Commissions6").getValue();
							
							oEntry.Commissions1 = Commissions1;
							oEntry.Commissions2 = Commissions2;
							oEntry.Commissions3 = Commissions3 ;
							oEntry.Commissions4 = Commissions4;
							oEntry.Commissions5 = Commissions5;
							oEntry.Commissions6 = Commissions6;
							
							
							var Expenses1 = this.getView().byId("Expenses1").getValue();
							var Expenses2 = this.getView().byId("Expenses2").getValue();
							var Expenses3 = this.getView().byId("Expenses3").getValue();
							var Expenses4 = this.getView().byId("Expenses4").getValue();
							var Expenses5 = this.getView().byId("Expenses5").getValue();
							var Expenses6 = this.getView().byId("Expenses6").getValue();
							
							oEntry.Expenses1 = Expenses1;
							oEntry.Expenses2 = Expenses2;
							oEntry.Expenses3 = Expenses3;
							oEntry.Expenses4 = Expenses4;
							oEntry.Expenses5 = Expenses5;
							oEntry.Expenses6 = Expenses6;
							
							
							var Total_Expenses1 = this.getView().byId("Total_Expenses1").getValue();
							var Total_Expenses2 = this.getView().byId("Total_Expenses2").getValue();
							var Total_Expenses3 = this.getView().byId("Total_Expenses3").getValue();
							var Total_Expenses4 = this.getView().byId("Total_Expenses4").getValue();
							var Total_Expenses5 = this.getView().byId("Total_Expenses5").getValue();
							var Total_Expenses6 = this.getView().byId("Total_Expenses6").getValue();
							
							oEntry.Total_Expenses1 = Total_Expenses1;
							oEntry.Total_Expenses2 = Total_Expenses2;
							oEntry.Total_Expenses3 =Total_Expenses3;
							oEntry.Total_Expenses4 = Total_Expenses4;
							oEntry.Total_Expenses5 = Total_Expenses5;
							oEntry.Total_Expenses6 = Total_Expenses6;
							
							
							var Operating_results1 = this.getView().byId("Operating_results1").getValue();
							var Operating_results2 = this.getView().byId("Operating_results2").getValue();
							var Operating_results3 = this.getView().byId("Operating_results3").getValue();
							var Operating_results4 = this.getView().byId("Operating_results4").getValue();
							var Operating_results5 = this.getView().byId("Operating_results5").getValue();
							var Operating_results6 = this.getView().byId("Operating_results6").getValue();
							
							oEntry.Operating_results1 = Operating_results1;
							oEntry.Operating_results2 = Operating_results2;
							oEntry.Operating_results3 = Operating_results3;
							oEntry.Operating_results4= Operating_results4;
							oEntry.Operating_results5 = Operating_results5;
							oEntry.Operating_results6 = Operating_results6;
							
							
						
						
						//Investment income and other income
						
							//Tab One
							var Sundry_income_expenses1 = this.getView().byId("Sundry_income_expenses1").getValue();
							var Sundry_income_expenses2 = this.getView().byId("Sundry_income_expenses2").getValue();
							var Sundry_income_expenses3  = this.getView().byId("Sundry_income_expenses3").getValue();
							var Sundry_income_expenses4 = this.getView().byId("Sundry_income_expenses4").getValue();
							var Sundry_income_expenses5 = this.getView().byId("Sundry_income_expenses5").getValue();
							var Sundry_income_expenses6 = this.getView().byId("Sundry_income_expenses6").getValue();
							
							oEntry.Sundry_income_expenses1 = Sundry_income_expenses1;
							oEntry.Sundry_income_expenses2 = Sundry_income_expenses2;
							oEntry.Sundry_income_expenses3 = Sundry_income_expenses3;
							oEntry.Sundry_income_expenses4 = Sundry_income_expenses4;
							oEntry.Sundry_income_expenses5 = Sundry_income_expenses5;
							oEntry.Sundry_income_expenses6 = Sundry_income_expenses6;
							
							var Investment_income1 = this.getView().byId("Investment_income1").getValue();
							var Investment_income2 = this.getView().byId("Investment_income2").getValue();
							var Investment_income3 = this.getView().byId("Investment_income3").getValue();
							var Investment_income4 = this.getView().byId("Investment_income4").getValue();
							var Investment_income5 = this.getView().byId("Investment_income5").getValue();
							var Investment_income6 = this.getView().byId("Investment_income6").getValue();
							
							oEntry.Investment_income1 = Investment_income1;
							oEntry.Investment_income2 = Investment_income2;
							oEntry.Investment_income3 = Investment_income3;
							oEntry.Investment_income4 = Investment_income4;
							oEntry.Investment_income5 = Investment_income5;
							oEntry.Investment_income6 = Investment_income6;
							
							var Unrealised_movement_equity1 = this.getView().byId("Unrealised_movement_equity1").getValue();
							var Unrealised_movement_equity2 = this.getView().byId("Unrealised_movement_equity2").getValue();
							var Unrealised_movement_equity3 = this.getView().byId("Unrealised_movement_equity3").getValue();
							var Unrealised_movement_equity4 = this.getView().byId("Unrealised_movement_equity4").getValue();
							var Unrealised_movement_equity5 = this.getView().byId("Unrealised_movement_equity5").getValue();
							var Unrealised_movement_equity6 = this.getView().byId("Unrealised_movement_equity6").getValue();
							
							oEntry.Unrealised_movement_equity1 = Unrealised_movement_equity1;
							oEntry.Unrealised_movement_equity2 = Unrealised_movement_equity2;
							oEntry.Unrealised_movement_equity3 = Unrealised_movement_equity3;
							oEntry.Unrealised_movement_equity4 = Unrealised_movement_equity4;
							oEntry.Unrealised_movement_equity5 = Unrealised_movement_equity5;
							oEntry.Unrealised_movement_equity6 = Unrealised_movement_equity6;
							
							var Unrealised_movement_property1  = this.getView().byId("Unrealised_movement_property1").getValue();
							var Unrealised_movement_property2 = this.getView().byId("Unrealised_movement_property2").getValue();
							var Unrealised_movement_property3 = this.getView().byId("Unrealised_movement_property3").getValue();
							var Unrealised_movement_property4 = this.getView().byId("Unrealised_movement_property4").getValue();
							var Unrealised_movement_property5 = this.getView().byId("Unrealised_movement_property5").getValue();
							var Unrealised_movement_property6 = this.getView().byId("Unrealised_movement_property6").getValue();
							
							oEntry.Unrealised_movement_property1 = Unrealised_movement_property1;
							oEntry.Unrealised_movement_property2 = Unrealised_movement_property2;
							oEntry.Unrealised_movement_property3 = Unrealised_movement_property3;
							oEntry.Unrealised_movement_property4 = Unrealised_movement_property4;
							oEntry.Unrealised_movement_property5 = Unrealised_movement_property5;
							oEntry.Unrealised_movement_property6 = Unrealised_movement_property6;
							
							var Foreign_exchange_financial_assets1  = this.getView().byId("Foreign_exchange_financial_assets1").getValue();
							var Foreign_exchange_financial_assets2  = this.getView().byId("Foreign_exchange_financial_assets2").getValue();
							var Foreign_exchange_financial_assets3 = this.getView().byId("Foreign_exchange_financial_assets13").getValue();
							var Foreign_exchange_financial_assets4 = this.getView().byId("Foreign_exchange_financial_assets4").getValue();
							var Foreign_exchange_financial_assets5  = this.getView().byId("Foreign_exchange_financial_assets5").getValue();
							var Foreign_exchange_financial_assets6 = this.getView().byId("Foreign_exchange_financial_assets6").getValue();
							
							oEntry.Foreign_exchange_financial_assets1 = Foreign_exchange_financial_assets1;
							oEntry.Foreign_exchange_financial_assets2 = Foreign_exchange_financial_assets2;
							oEntry.Foreign_exchange_financial_assets3 = Foreign_exchange_financial_assets3;
							oEntry.Foreign_exchange_financial_assets4 = Foreign_exchange_financial_assets4;
							oEntry.Foreign_exchange_financial_assets5 = Foreign_exchange_financial_assets5;
							oEntry.Foreign_exchange_financial_assets6 = Foreign_exchange_financial_assets6;
							
							var Monetary_adjustment_IAS1 = this.getView().byId("Monetary_adjustment_IAS1").getValue();
							var Monetary_adjustment_IAS2  = this.getView().byId("Monetary_adjustment_IAS2").getValue();
							var Monetary_adjustment_IAS3 = this.getView().byId("Monetary_adjustment_IAS13").getValue();
							var Monetary_adjustment_IAS4 = this.getView().byId("Monetary_adjustment_IAS14").getValue();
							var Monetary_adjustment_IAS5 = this.getView().byId("Monetary_adjustment_IAS15").getValue();
							var Monetary_adjustment_IAS6  = this.getView().byId("Monetary_adjustment_IAS6").getValue();
							
							oEntry.Monetary_adjustment_IAS1 = Monetary_adjustment_IAS1;
							oEntry.Monetary_adjustment_IAS2 = Monetary_adjustment_IAS2;
							oEntry.Monetary_adjustment_IAS3 = Monetary_adjustment_IAS3;
							oEntry.Monetary_adjustment_IAS4 = Monetary_adjustment_IAS4;
							oEntry.Monetary_adjustment_IAS5 = Monetary_adjustment_IAS5;
							oEntry.Monetary_adjustment_IAS6 = Monetary_adjustment_IAS6;
							
							
							var Total_Investment_and_Other_Income1 = this.getView().byId("Total_Investment_and_Other_Income1").getValue();
							var Total_Investment_and_Other_Income2 = this.getView().byId("Total_Investment_and_Other_Income2").getValue();
							var Total_Investment_and_Other_Income3 = this.getView().byId("Total_Investment_and_Other_Income3").getValue();
							var Total_Investment_and_Other_Income4 = this.getView().byId("Total_Investment_and_Other_Income4").getValue();
							var Total_Investment_and_Other_Income5 = this.getView().byId("Total_Investment_and_Other_Income5").getValue();
							var Total_Investment_and_Other_Income6 = this.getView().byId("Total_Investment_and_Other_Income6").getValue();
							
							oEntry.Total_Investment_and_Other_Income1 = Total_Investment_and_Other_Income1;
							oEntry.Total_Investment_and_Other_Income2 = Total_Investment_and_Other_Income2;
							oEntry.Total_Investment_and_Other_Income3 = Total_Investment_and_Other_Income3 ;
							oEntry.Total_Investment_and_Other_Income4 = Total_Investment_and_Other_Income4;
							oEntry.Total_Investment_and_Other_Income5 = Total_Investment_and_Other_Income5;
							oEntry.Total_Investment_and_Other_Income6 = Total_Investment_and_Other_Income6;
							
							
							//Tab Two
							var Profit_before_taxation1 = this.getView().byId("Profit_before_taxation1").getValue();
							var Profit_before_taxation2 = this.getView().byId("Profit_before_taxation2").getValue();
							var Profit_before_taxation3 = this.getView().byId("Profit_before_taxation3").getValue();
							var Profit_before_taxation4 = this.getView().byId("Profit_before_taxation4").getValue();
							var Profit_before_taxation5 = this.getView().byId("Profit_before_taxation5").getValue();
							var Profit_before_taxation6 = this.getView().byId("Profit_before_taxation6").getValue();
							
							oEntry.Profit_before_taxation1 = Profit_before_taxation1; 
							oEntry.Profit_before_taxation2 = Profit_before_taxation2;
							oEntry.Profit_before_taxation3 = Profit_before_taxation3;
							oEntry.Profit_before_taxation4 = Profit_before_taxation4;
							oEntry.Profit_before_taxation5 = Profit_before_taxation5;
							oEntry.Profit_before_taxation6 = Profit_before_taxation6;
							
							var Taxation1 = this.getView().byId("Taxation1").getValue();
							var Taxation2 = this.getView().byId("Taxation2").getValue();
							var Taxation3 = this.getView().byId("Taxation3").getValue();
							var Taxation4 = this.getView().byId("Taxation4").getValue();
							var Taxation5 = this.getView().byId("Taxation5").getValue();
							var Taxation6 = this.getView().byId("Taxation6").getValue();
							
							oEntry.Taxation1 = Taxation1; 
							oEntry.Taxation2 = Taxation2;
							oEntry.Taxation3 = Taxation3;
							oEntry.Taxation4 = Taxation4;
							oEntry.Taxation5 = Taxation5;
							oEntry.Taxation6 = Taxation6;
							
							var Profit_after_tax1 = this.getView().byId("Profit_after_tax1").getValue();
							var Profit_after_tax2 = this.getView().byId("Profit_after_tax2").getValue();
							var Profit_after_tax3 = this.getView().byId("Profit_after_tax3").getValue();
							var Profit_after_tax4 = this.getView().byId("Profit_after_tax4").getValue();
							var Profit_after_tax5 = this.getView().byId("Profit_after_tax5").getValue();
							var Profit_after_tax6 = this.getView().byId("Profit_after_tax6").getValue();
							
							oEntry.Profit_after_tax1 = Profit_after_tax1; 
							oEntry.Profit_after_tax2 = Profit_after_tax2;
							oEntry.Profit_after_tax3 = Profit_after_tax3;
							oEntry.Profit_after_tax4 = Profit_after_tax4;
							oEntry.Profit_after_tax5 = Profit_after_tax5;
							oEntry.Profit_after_tax6 = Profit_after_tax6;
							
							var Dividends1 = this.getView().byId("Dividends1").getValue();
							var Dividends2 = this.getView().byId("Dividends2").getValue();
							var Dividends3 = this.getView().byId("Dividends3").getValue();
							var Dividends4 = this.getView().byId("Dividends4").getValue();
							var Dividends5 = this.getView().byId("Dividends5").getValue();
							var Dividends6 = this.getView().byId("Dividends6").getValue();
							
							oEntry.Dividends1 = Dividends1; 
							oEntry.Dividends2 = Dividends2;
							oEntry.Dividends3 = Dividends3;
							oEntry.Dividends4 = Dividends4;
							oEntry.Dividends5 = Dividends5;
							oEntry.Dividends6 = Dividends6;
							
							var Retained_profit_quarte1 = this.getView().byId("Retained_profit_quarte1").getValue();
							var Retained_profit_quarte2 = this.getView().byId("Retained_profit_quarte2").getValue();
							var Retained_profit_quarte3 = this.getView().byId("Retained_profit_quarte3").getValue();
							var Retained_profit_quarte4 = this.getView().byId("Retained_profit_quarte4").getValue();
							var Retained_profit_quarte5 = this.getView().byId("Retained_profit_quarte5").getValue();
							var Retained_profit_quarte6 = this.getView().byId("Retained_profit_quarte6").getValue();
							
							oEntry.Retained_profit_quarte1 = Retained_profit_quarte1; 
							oEntry.Retained_profit_quarte2 = Retained_profit_quarte2;
							oEntry.Retained_profit_quarte3 = Retained_profit_quarte3;
							oEntry.Retained_profit_quarte4 = Retained_profit_quarte4;
							oEntry.Retained_profit_quarte5 = Retained_profit_quarte5;
							oEntry.Retained_profit_quarte6 = Retained_profit_quarte6;
							
							var Retained_income_BF1 = this.getView().byId("Retained_income_BF1").getValue();
							var Retained_income_BF2 = this.getView().byId("Retained_income_BF2").getValue();
							var Retained_income_BF3 = this.getView().byId("Retained_income_BF3").getValue();
							var Retained_income_BF4 = this.getView().byId("Retained_income_BF4").getValue();
							var Retained_income_BF5 = this.getView().byId("Retained_income_BF5").getValue();
							var Retained_income_BF6 = this.getView().byId("Retained_income_BF6").getValue();
							
							oEntry.Retained_income_BF1 = Retained_income_BF1; 
							oEntry.Retained_income_BF2 = Retained_income_BF2;
							oEntry.Retained_income_BF3 = Retained_income_BF3;
							oEntry.Retained_income_BF4 = Retained_income_BF4;
							oEntry.Retained_income_BF5 = Retained_income_BF5;
							oEntry.Retained_income_BF6 = Retained_income_BF6;
							
							
							var Retained_Income_CF1 = this.getView().byId("Retained_Income_CF1").getValue();
							var Retained_Income_CF2 = this.getView().byId("Retained_Income_CF2").getValue();
							var Retained_Income_CF3 = this.getView().byId("Retained_Income_CF3").getValue();
							var Retained_Income_CF4 = this.getView().byId("Retained_Income_CF4").getValue();
							var Retained_Income_CF5 = this.getView().byId("Retained_Income_CF5").getValue();
							var Retained_Income_CF6 = this.getView().byId("Retained_Income_CF6").getValue();
							
							oEntry.Retained_Income_CF1 = Retained_Income_CF1; 
							oEntry.Retained_Income_CF2 = Retained_Income_CF2;
							oEntry.Retained_Income_CF3 = Retained_Income_CF3;
							oEntry.Retained_Income_CF4 = Retained_Income_CF4;
							oEntry.Retained_Income_CF5 = Retained_Income_CF5;
							oEntry.Retained_Income_CF6 = Retained_Income_CF6;
				
				
				
				sap.m.MessageBox.confirm("Are you sure you want to save?", 
				function (oAction) { 
					if (sap.m.MessageBox.Action.OK === oAction) { 
						
						
						oModel.create("/ZPENSION_FUNDSet", oEntry, {
							success: function(data){
								
								oModel.obusyDialog.open();
								                                       
								var SavedMsg = "Pension Fund Saved !"; 
								sap.m.MessageToast.show(SavedMsg);
								
								oModel.obusyDialog.close();
								
							},
							error: function(err){
								
								sap.m.MessageToast.show("Something went wrong!");
			
							}
						});
						
					} 
					else  { 
						// Display a message for a Canceled Action 
						var CancelMsg = ("Cancelled"); 
						sap.m.MessageToast.show(CancelMsg); 

					} 
				}
				 
			);
		
		},
	});
});