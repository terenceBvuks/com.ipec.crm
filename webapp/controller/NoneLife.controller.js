sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/m/MessageBox"
], function(Controller, MessageToast, MessageBox) {
	"use strict";

	return Controller.extend("com.ipec.crm.controller.NoneLife", {
		onInit: function () {
			this._Page = this.getView().byId("p1");
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
		_saveOrder: function() {
			var that = this,
				oEntry = {},
				oModel = this.getModel(),
				bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;

			//Bind data array to form fields

			
			oEntry.NonlifereturnsId = "Brokers";
			oEntry.Brokername = this.getView().byId("input_FiscalYear").getValue();
			oEntry.Officialname = this.getView().byId("input_BusinessPartnerNumber").getValue();
			oEntry.DateofSubmission = this.getView().byId("input_PeriodEnding").getValue();
			oEntry.Declaration = this.getView().byId("input_FinancialQuarter").getValue();

			//SUMMARY BY CLASS OF BUSINESS PLACED BY BROKER WITHIN ZIMBABWE (PERSONAL LINES) Tab 1
			oEntry.ShareholdersEquity1 = this.getView().byId("input_PER_OWNERS_TOT_INS").getValue();
			oEntry.ShareholdersEquity2 = this.getView().byId("input_PER_OWNERS_TOT_PRE").getValue();
			oEntry.ShareCapital = this.getView().byId("input_PER_OWNERS_TOT_POL").getValue();
			oEntry.ShareCapital2 = this.getView().byId("input_PER_OWNERS_COM_REC").getValue();
			oEntry.SharePremium1 = this.getView().byId("input_PER_OWNERS_OTH_COS").getValue();
			oEntry.SharePremium2 = this.getView().byId("input_PER_HOLDER_TOT_INS").getValue();
			oEntry.RevaluationAndOtherReserve1 = this.getView().byId("input_PER_HOLDER_TOT_PRE").getValue();
			oEntry.RevaluationAndOtherReserve2 = this.getView().byId("input_PER_HOLDER_TOT_POL").getValue();
			oEntry.RetainedIncome1 = this.getView().byId("input_PER_HOLDER_COM_REC").getValue();
			oEntry.RetainedIncome2 = this.getView().byId("input_PER_HOLDER_OTH_COS").getValue();
			oEntry.MinorityInterest1 = this.getView().byId("input_PER_HEALTH_TOT_INS").getValue();
			oEntry.MinorityInterest2 = this.getView().byId("input_PER_HEALTH_TOT_PRE").getValue();
			oEntry.ShareholderEquityTotal1 = this.getView().byId("input_PER_HEALTH_TOT_POL").getValue();
			oEntry.ShareholderEquityTotal2 = this.getView().byId("input_PER_HEALTH_COM_REC").getValue();
			oEntry.NoncurrentLiabilities1 = this.getView().byId("input_PER_HEALTH_OTH_COS").getValue();
			oEntry.DeferredTaxation1 = this.getView().byId("input_PER_RTA_TOT_INS").getValue();
			oEntry.LongTermLoan1 = this.getView().byId("input_PER_RTA_TOT_PRE").getValue();
			oEntry.TotalNonCurrentLiabilities1 = this.getView().byId("input_PER_RTA_TOT_POL").getValue();
			oEntry.CurrentLiabilitie1 = this.getView().byId("input_PER_RTA_COM_REC").getValue();
			oEntry.ProvisionForTaxation1 = this.getView().byId("input_PER_RTA_OTH_COS").getValue();
			oEntry.CurrentProvisions1 = this.getView().byId("input_PER_FTP_TOT_INS").getValue();
			oEntry.NonCurrentLiabilities2 = this.getView().byId("input_PER_FTP_TOT_PRE").getValue();
			oEntry.DeferredTaxation2 = this.getView().byId("input_PER_RTA_TOT_INS").getValue();
			oEntry.LongTermLoan2 = this.getView().byId("input_PER_RTA_TOT_PRE").getValue();
			oEntry.TotalNonCurrentLiabilities2 = this.getView().byId("input_PER_RTA_TOT_POL").getValue();
			oEntry.CurrentLiabilitie2 = this.getView().byId("input_PER_RTA_COM_REC").getValue();
			oEntry.ProvisionForTaxation2 = this.getView().byId("input_PER_RTA_OTH_COS").getValue();
			oEntry.CurrentProvisions2 = this.getView().byId("input_PER_FTP_TOT_INS").getValue();
		
			oEntry.BankOverdrafts1 = this.getView().byId("input_PER_FTP_TOT_POL").getValue();
			oEntry.BankOverdrafts2 = this.getView().byId("input_PER_FTP_COM_REC").getValue();
			oEntry.ShareBasedPaymentReserve1 = this.getView().byId("input_PER_FTP_OTH_COS").getValue();
			oEntry.ShareBasedPaymentReserve2 = this.getView().byId("input_PER_COMPRE_TOT_INS").getValue();
			oEntry.OtherPayables1 = this.getView().byId("input_PER_COMPRE_TOT_PRE").getValue();
			oEntry.OtherPayables2 = this.getView().byId("input_PER_COMPRE_TOT_POL").getValue();
			oEntry.TotalCurrentLiabilities1 = this.getView().byId("input_PER_COMPRE_COM_REC").getValue();
			oEntry.TotalCurrentLiabilities2 = this.getView().byId("input_PER_COMPRE_OTH_COS").getValue();
			oEntry.TechnicalLiabilities1 = this.getView().byId("input_PER_OTHER_TOT_INS").getValue();
			oEntry.TechnicalLiabilities2 = this.getView().byId("input_PER_OTHER_TOT_PRE").getValue();
			oEntry.GrossReportedOutstandingCl1 = this.getView().byId("input_PER_OTHER_TOT_POL").getValue();
			oEntry.GrossReportedOutstandingCl2 = this.getView().byId("input_PER_OTHER_COM_REC").getValue();
			oEntry.ReinsuranceCreditors1 = this.getView().byId("input_PER_OTHER_OTH_COS").getValue();
			oEntry.ReinsuranceCreditors2 = this.getView().byId("input_PER_SUBTOT_TOT_INS").getValue();
			oEntry.IncurredButNotReportedCla1 = this.getView().byId("input_PER_SUBTOT_TOT_PRE").getValue();
			oEntry.IncurredButNotReportedCla2 = this.getView().byId("input_PER_SUBTOT_TOT_POL").getValue();
			oEntry.UnearnedPremiumReserves1 = this.getView().byId("input_PER_SUBTOT_COM_REC").getValue();
			oEntry.UnearnedPremiumReserves2 = this.getView().byId("input_PER_SUBTOT_OTH_COS").getValue();
			
			//SUMMARY BY CLASS OF BUSINESS PLACED BY BROKER WITHIN ZIMBABWE ( COMMERCIAL LINES) Tab 2
				oEntry.TotalTechnicalLiabilities1 = this.getView().byId("input_COM_FIRE_TOT_INS").getValue();
				oEntry.TotalTechnicalLiabilities2 = this.getView().byId("input_COM_FIRE_TOT_PRE").getValue();
				oEntry.TotalEquityAndLiabilities11 = this.getView().byId("input_COM_FIRE_TOT_POL").getValue();
				oEntry.TotalEquityAndLiabilities22 = this.getView().byId("input_COM_FIRE_COM_REC").getValue();
				oEntry.NonCurrentAsset11 = this.getView().byId("input_COM_FIRE_OTH_COS").getValue();
				oEntry.NonCurrentAsset22 = this.getView().byId("input_COM_ENGINE_TOT_INS").getValue();
				oEntry.InvestmentsInPropertiesAn11 = this.getView().byId("input_COM_ENGINE_TOT_PRE").getValue();
				oEntry.InvestmentsInPropertiesAn22 = this.getView().byId("input_COM_ENGINE_TOT_POL").getValue();
				oEntry.InvestmentPropert11 = this.getView().byId("input_COM_ENGINE_COM_REC").getValue();
				oEntry.InvestmentPropert22 = this.getView().byId("input_COM_ENGINE_OTH_COS").getValue();
				oEntry.InvestmentsInquotedEquitie1 = this.getView().byId("input_COM_RTA_TOT_INS").getValue();
				oEntry.InvestmentsInquotedEquitie2 = this.getView().byId("input_COM_RTA_TOT_PRE").getValue();
				oEntry.TotalEquityAndLibilities1 = this.getView().byId("input_COM_RTA_TOT_POL").getValue();
				oEntry.TotalEquityAndLibilities2 = this.getView().byId("input_COM_RTA_COM_REC").getValue();
				oEntry.NonCurrentAssets1 = this.getView().byId("input_COM_RTA_OTH_COS").getValue();
				oEntry.NonCurrentAssets2 = this.getView().byId("input_COM_FTP_TOT_INS").getValue();
				oEntry.InvestmentsInPropertiesAnd1 = this.getView().byId("input_COM_FTP_TOT_PRE").getValue();
				oEntry.InvestmentsInPropertiesAnd2 = this.getView().byId("input_COM_FTP_TOT_POL").getValue();
				oEntry.InvestmentProperty1 = this.getView().byId("input_COM_FTP_COM_REC").getValue();
				oEntry.InvestmentProperty2 = this.getView().byId("input_COM_FTP_OTH_COS").getValue();
				oEntry.InvestmentsInQuotedEquiti11 = this.getView().byId("input_COM_COMPRE_TOT_INS").getValue();
				oEntry.InvestmentsInQuotedEquiti12 = this.getView().byId("input_COM_COMPRE_TOT_PRE").getValue();
				oEntry.TechnicalAssets1 = this.getView().byId("input_COM_COMPRE_TOT_POL").getValue();
				oEntry.TechnicalAssets2 = this.getView().byId("input_COM_COMPRE_COM_REC").getValue();
				oEntry.ReinsurersShareOfOutstandi1 = this.getView().byId("input_COM_COMPRE_OTH_COS").getValue();
				oEntry.ReinsurersShareOfOutstandi2 = this.getView().byId("input_COM_MARINE_TOT_INS").getValue();
				oEntry.DacOrUcr1 = this.getView().byId("input_COM_MARINE_TOT_PRE").getValue();
				oEntry.DacOrUcr2 = this.getView().byId("input_COM_MARINE_TOT_POL").getValue();
				oEntry.TotalTechnicalAssets1 = this.getView().byId("input_COM_MARINE_COM_REC").getValue();
				oEntry.TotalTechnicalAssets2 = this.getView().byId("input_COM_MARINE_OTH_COS").getValue();
				oEntry.CurrentAssets1 = this.getView().byId("input_COM_AVIATI_TOT_INS").getValue();
				oEntry.CurrentAssets2 = this.getView().byId("input_COM_AVIATI_TOT_PRE").getValue();
				oEntry.InvestmentsInTheMoneyMark1 = this.getView().byId("input_COM_AVIATI_TOT_POL").getValue();
				oEntry.InvestmentsInTheMoneyMark2 = this.getView().byId("input_COM_AVIATI_COM_REC").getValue();
				oEntry.CashAndCashEquivalents1 = this.getView().byId("input_COM_AVIATI_OTH_COS").getValue();
				oEntry.CashAndCashEquivalents2 = this.getView().byId("input_COM_P_ACCI_TOT_INS").getValue();
				oEntry.PremiumReceivableDebtors1 = this.getView().byId("input_COM_P_ACCI_TOT_PRE").getValue();
				oEntry.PremiumReceivableDebtors2 = this.getView().byId("input_COM_P_ACCI_TOT_POL").getValue();
				oEntry.InvestmentsInPrescribedAss1 = this.getView().byId("input_COM_P_ACCI_COM_REC").getValue();
				oEntry.InvestmentsInPrescribedAss2 = this.getView().byId("input_COM_P_ACCI_OTH_COS").getValue();
				oEntry.AccuredInvestmentIncome1 = this.getView().byId("input_COM_M_ACCI_TOT_INS").getValue();
				oEntry.AccuredInvestmentIncome2 = this.getView().byId("input_COM_M_ACCI_TOT_PRE").getValue();
				oEntry.OtherCurrentAssets1 = this.getView().byId("input_COM_M_ACCI_TOT_POL").getValue();
				oEntry.OtherCurrentAssets2 = this.getView().byId("input_COM_M_ACCI_COM_REC").getValue();
				oEntry.CurrentTaxAsset1 = this.getView().byId("input_COM_M_ACCI_OTH_COS").getValue();
				oEntry.CurrentTaxAsset2 = this.getView().byId("input_COM_BONDS_TOT_INS").getValue();
				oEntry.TotalCurrentAssets1 = this.getView().byId("input_COM_BONDS_TOT_PRE").getValue();
				oEntry.TotalCurrentAssets2 = this.getView().byId("input_COM_BONDS_TOT_POL").getValue();
				oEntry.TotalAssets1 = this.getView().byId("input_COM_BONDS_COM_REC").getValue();
				oEntry.TotalAssets2 = this.getView().byId("input_COM_BONDS_OTH_COS").getValue();
				oEntry.GrossPremiums1 = this.getView().byId("input_COM_FARM_TOT_INS").getValue();
				oEntry.GrossPremiums2 = this.getView().byId("input_COM_FARM_TOT_PRE").getValue();
				oEntry.GrossPremiums3 = this.getView().byId("input_COM_FARM_TOT_POL").getValue();
				oEntry.GrossPremiums4 = this.getView().byId("input_COM_FARM_COM_REC").getValue();
				oEntry.GrossPremiums5 = this.getView().byId("input_COM_FARM_OTH_COS").getValue();
				oEntry.GrossPremiums6 = this.getView().byId("input_COM_HAIL_TOT_INS").getValue();
				oEntry.Reinsurance1 = this.getView().byId("input_COM_HAIL_TOT_PRE").getValue();
				oEntry.Reinsurance2 = this.getView().byId("input_COM_HAIL_TOT_POL").getValue();
				oEntry.Reinsurance3 = this.getView().byId("input_COM_HAIL_COM_REC").getValue();
				oEntry.Reinsurance4 = this.getView().byId("input_COM_HAIL_OTH_COS").getValue();
				oEntry.Reinsurance5 = this.getView().byId("input_COM_HEALTH_TOT_INS").getValue();
				oEntry.Reinsurance6 = this.getView().byId("input_COM_HEALTH_TOT_PRE").getValue();
				oEntry.PremiumsWrittenLessReinsur1 = this.getView().byId("input_COM_HEALTH_TOT_POL").getValue();
				oEntry.PremiumsWrittenLessReinsur2 = this.getView().byId("input_COM_HEALTH_COM_REC").getValue();
				oEntry.PremiumsWrittenLessReinsur3 = this.getView().byId("input_COM_HEALTH_OTH_COS").getValue();
				oEntry.PremiumsWrittenLessReinsur4 = this.getView().byId("input_COM_OTHER_TOT_INS").getValue();
				oEntry.PremiumsWrittenLessReinsur5 = this.getView().byId("input_COM_OTHER_TOT_PRE").getValue();
				oEntry.PremiumsWrittenLessReinsur6 = this.getView().byId("input_COM_OTHER_TOT_POL").getValue();
				oEntry.TransferToFromUnearnedPre7 = this.getView().byId("input_COM_OTHER_COM_REC").getValue();
				oEntry.TransferToFromUnearnedPre8 = this.getView().byId("input_COM_OTHER_OTH_COS").getValue();
				oEntry.TransferToFromUnearnedPre9 = this.getView().byId("input_INS01_TOT_POL").getValue();
			oEntry.TransferToFromUnearnedPre10 = this.getView().byId("input_INS01_COM_REC").getValue();
			oEntry.TransferToFromUnearnedPre11 = this.getView().byId("input_INS01_OTH_COS").getValue();
			oEntry.TransferToFromUnearnedPre12 = this.getView().byId("input_INS02_NAME").getValue();
			oEntry.EarnedPremiums1 = this.getView().byId("input_INS02_TOT_PRE").getValue();
			oEntry.EarnedPremiums2 = this.getView().byId("input_INS02_TOT_POL").getValue();
			oEntry.EarnedPremiums3 = this.getView().byId("input_INS02_COM_REC").getValue();
			oEntry.EarnedPremiums4 = this.getView().byId("input_INS02_OTH_COS").getValue();
			oEntry.EarnedPremiums5 = this.getView().byId("input_INS03_NAME").getValue();
			oEntry.EarnedPremiums6 = this.getView().byId("input_INS03_TOT_PRE").getValue();
			oEntry.ClaimsPaidAndOutstandingC1 = this.getView().byId("input_INS03_TOT_POL").getValue();
			oEntry.ClaimsPaidAndOutstandingC2 = this.getView().byId("input_INS03_COM_REC").getValue();
			oEntry.ClaimsPaidAndOutstandingC3 = this.getView().byId("input_INS03_OTH_COS").getValue();
			oEntry.ClaimsPaidAndOutstandingC4 = this.getView().byId("input_INS04_NAME").getValue();
			oEntry.ClaimsPaidAndOutstandingC5 = this.getView().byId("input_INS04_TOT_PRE").getValue();
			oEntry.ClaimsPaidAndOutstandingC6 = this.getView().byId("input_INS04_TOT_POL").getValue();
			oEntry.IncurredButNotReportedCl11 = this.getView().byId("input_INS04_COM_REC").getValue();
			oEntry.IncurredButNotReportedCl22 = this.getView().byId("input_INS04_OTH_COS").getValue();
			oEntry.IncurredButNotReportedCla3 = this.getView().byId("input_INS05_NAME").getValue();
			oEntry.IncurredButNotReportedCla4 = this.getView().byId("input_INS05_TOT_PRE").getValue();
			oEntry.IncurredButNotReportedCla5 = this.getView().byId("input_INS05_TOT_POL").getValue();
			oEntry.IncurredButNotReportedCla6 = this.getView().byId("input_INS05_COM_REC").getValue();
			oEntry.UnearnedPremiumReserveMvt1 = this.getView().byId("input_INS05_OTH_COS").getValue();
			oEntry.UnearnedPremiumReserveMvt2  = this.getView().byId("input_INS06_NAME").getValue();
			oEntry.UnearnedPremiumReserveMvt3 = this.getView().byId("input_INS06_TOT_PRE").getValue();
			oEntry.UnearnedPremiumReserveMvt4 = this.getView().byId("input_INS06_TOT_POL").getValue();
			oEntry.UnearnedPremiumReserveMvt5 = this.getView().byId("input_INS06_COM_REC").getValue();
			oEntry.UnearnedPremiumReserveMvt6 = this.getView().byId("input_INS06_OTH_COS").getValue();
			oEntry.Commissions1 = this.getView().byId("input_INS07_NAME").getValue();
			oEntry.Commissions2 = this.getView().byId("input_INS07_TOT_PRE").getValue();
			oEntry.Commissions3 = this.getView().byId("input_INS07_TOT_POL").getValue();
			oEntry.Commissions4 = this.getView().byId("input_INS07_COM_REC").getValue();
			oEntry.Commissions5 = this.getView().byId("input_INS07_OTH_COS").getValue();
			oEntry.Commissions6 = this.getView().byId("input_INS08_NAME").getValue();
			oEntry.Expenses1 = this.getView().byId("input_INS08_TOT_PRE").getValue();
			oEntry.Expenses2 = this.getView().byId("input_INS08_TOT_POL").getValue();
			oEntry.Expenses3 = this.getView().byId("input_INS08_COM_REC").getValue();
			oEntry.Expenses4 = this.getView().byId("input_INS08_OTH_COS").getValue();
			
			oEntry.Expenses5 = this.getView().byId("input_INS09_NAME").getValue();
			oEntry.Expenses6 = this.getView().byId("input_INS09_TOT_PRE").getValue();
			oEntry.TotalExpenses1 = this.getView().byId("input_INS09_TOT_POL").getValue();
			oEntry.TotalExpenses2 = this.getView().byId("input_INS09_COM_REC").getValue();
			oEntry.TotalExpenses3 = this.getView().byId("input_INS09_OTH_COS").getValue();
			oEntry.TotalExpenses4 = this.getView().byId("input_INS10_NAME").getValue();
			oEntry.TotalExpenses5 = this.getView().byId("input_INS10_TOT_PRE").getValue();
			oEntry.TotalExpenses6 = this.getView().byId("input_INS10_TOT_POL").getValue();
			oEntry.OperatingResults1 = this.getView().byId("input_INS10_COM_REC").getValue();
			oEntry.OperatingResults2 = this.getView().byId("input_INS10_OTH_COS").getValue();
			oEntry.OperatingResults3 = this.getView().byId("input_INS11_NAME").getValue();
			oEntry.OperatingResults4 = this.getView().byId("input_INS11_TOT_PRE").getValue();
			oEntry.OperatingResults5 = this.getView().byId("input_INS11_TOT_POL").getValue();
			oEntry.OperatingResults6 = this.getView().byId("input_INS11_COM_REC").getValue();
			oEntry.SundryIncomeExpenses1 = this.getView().byId("input_INS11_OTH_COS").getValue();
			oEntry.SundryIncomeExpenses2 = this.getView().byId("input_INS12_NAME").getValue();
			oEntry.SundryIncomeExpenses3 = this.getView().byId("input_INS12_TOT_PRE").getValue();
			oEntry.SundryIncomeExpenses4 = this.getView().byId("input_INS12_TOT_POL").getValue();
			oEntry.SundryIncomeExpenses5 = this.getView().byId("input_INS12_COM_REC").getValue();
			oEntry.SundryIncomeExpenses6 = this.getView().byId("input_INS12_OTH_COS").getValue();
			oEntry.InvestmentIncome1 = this.getView().byId("input_INS13_NAME").getValue();
			oEntry.InvestmentIncome2 = this.getView().byId("input_INS13_TOT_PRE").getValue();
			oEntry.InvestmentIncome3 = this.getView().byId("input_INS13_TOT_POL").getValue();
			oEntry.InvestmentIncome4 = this.getView().byId("input_INS13_COM_REC").getValue();
			oEntry.InvestmentIncome5 = this.getView().byId("input_INS13_OTH_COS").getValue();
			oEntry.InvestmentIncome6 = this.getView().byId("input_INS14_NAME").getValue();
			oEntry.UnrealisedMovementEquity1 = this.getView().byId("input_INS14_TOT_PRE").getValue();
			oEntry.UnrealisedMovementEquity2 = this.getView().byId("input_INS14_TOT_POL").getValue();
			oEntry.UnrealisedMovementEquity3 = this.getView().byId("input_INS14_COM_REC").getValue();
			oEntry.UnrealisedMovementEquity4 = this.getView().byId("input_INS14_OTH_COS").getValue();
			oEntry.UnrealisedMovementEquity5 = this.getView().byId("input_INS15_NAME").getValue();
			oEntry.UnrealisedMovementEquity6 = this.getView().byId("input_INS15_TOT_PRE").getValue();
			oEntry.UnrealisedMovementProperty1 = this.getView().byId("input_INS15_TOT_POL").getValue();
			oEntry.UnrealisedMovementProperty2 = this.getView().byId("input_INS15_COM_REC").getValue();
			oEntry.UnrealisedMovementProperty3 = this.getView().byId("input_INS15_OTH_COS").getValue();
			oEntry.UnrealisedMovementProperty4 = this.getView().byId("input_CLASS01_NAME").getValue();
			oEntry.UnrealisedMovementProperty5 = this.getView().byId("input_CLASS01_SUM_INS").getValue();
			oEntry.UnrealisedMovementProperty6 = this.getView().byId("input_CLASS01_LOC_INS").getValue();
			oEntry.ForeignExchangeFinancialAs1 = this.getView().byId("input_CLASS01_FOR_INS").getValue();
			oEntry.ForeignExchangeFinancialAs2 = this.getView().byId("input_CLASS01_CED_PRE").getValue();
			oEntry.ForeignExchangeFinancialAs3 = this.getView().byId("input_CLASS01_PER_RIS").getValue();
			oEntry.ForeignExchangeFinancialAs4 = this.getView().byId("input_CLASS01_COM_REC").getValue();
			oEntry.ForeignExchangeFinancialAs5 = this.getView().byId("input_CLASS01_OTH_REC").getValue();
			oEntry.ForeignExchangeFinancialAs6 = this.getView().byId("input_CLASS02_NAME").getValue();
			oEntry.MonetaryAdjustmentIas1 = this.getView().byId("input_CLASS02_SUM_INS").getValue();
			oEntry.MonetaryAdjustmentIas2 = this.getView().byId("input_CLASS02_LOC_INS").getValue();
			oEntry.MonetaryAdjustmentIas3 = this.getView().byId("input_CLASS02_FOR_INS").getValue();
			oEntry.MonetaryAdjustmentIas4 = this.getView().byId("input_CLASS02_CED_PRE").getValue();
			oEntry.MonetaryAdjustmentIas5 = this.getView().byId("input_CLASS02_PER_RIS").getValue();
			oEntry.MonetaryAdjustmentIas6 = this.getView().byId("input_CLASS02_COM_REC").getValue();
			oEntry.TotalInvestmentAndOtherIn1 = this.getView().byId("input_CLASS02_OTH_REC").getValue();
			oEntry.TotalInvestmentAndOtherIn2 = this.getView().byId("input_CLASS03_NAME").getValue();
			oEntry.TotalInvestmentAndOtherIn3 = this.getView().byId("input_CLASS03_SUM_INS").getValue();
			oEntry.TotalInvestmentAndOtherIn4 = this.getView().byId("input_CLASS03_LOC_INS").getValue();
			oEntry.TotalInvestmentAndOtherIn5 = this.getView().byId("input_CLASS03_FOR_INS").getValue();
			oEntry.TotalInvestmentAndOtherIn6 = this.getView().byId("input_CLASS03_CED_PRE").getValue();
			oEntry.ProfitBeforeTaxation1 = this.getView().byId("input_CLASS03_PER_RIS").getValue();
			oEntry.ProfitBeforeTaxation2 = this.getView().byId("input_CLASS03_COM_REC").getValue();
			oEntry.ProfitBeforeTaxation3 = this.getView().byId("input_CLASS03_OTH_REC").getValue();
			oEntry.ProfitBeforeTaxation4 = this.getView().byId("input_CLASS04_NAME").getValue();
			oEntry.ProfitBeforeTaxation5 = this.getView().byId("input_CLASS04_SUM_INS").getValue();
			oEntry.ProfitBeforeTaxation6 = this.getView().byId("input_CLASS04_LOC_INS").getValue();
			oEntry.Taxation1 = this.getView().byId("input_CLASS04_FOR_INS").getValue();
			oEntry.Taxation2 = this.getView().byId("input_CLASS04_CED_PRE").getValue();
			oEntry.Taxation3 = this.getView().byId("input_CLASS04_PER_RIS").getValue();
			oEntry.Taxation4 = this.getView().byId("input_CLASS04_COM_REC").getValue();
			oEntry.Taxation5 = this.getView().byId("input_CLASS04_OTH_REC").getValue();
			oEntry.Taxation6 = this.getView().byId("input_CLASS05_NAME").getValue();
			oEntry.ProfitAfterTax1 = this.getView().byId("input_CLASS05_SUM_INS").getValue();
			oEntry.ProfitAfterTax2 = this.getView().byId("input_CLASS05_LOC_INS").getValue();
			oEntry.ProfitAfterTax3 = this.getView().byId("input_CLASS05_FOR_INS").getValue();
			oEntry.ProfitAfterTax4 = this.getView().byId("input_CLASS05_CED_PRE").getValue();
			oEntry.ProfitAfterTax5 = this.getView().byId("input_CLASS05_PER_RIS").getValue();
			oEntry.ProfitAfterTax6 = this.getView().byId("input_CLASS05_COM_REC").getValue();
			oEntry.Dividends1 = this.getView().byId("input_CLASS05_OTH_REC").getValue();
			
			oEntry.Dividends2 = this.getView().byId("input_CLASS06_NAME").getValue();
			oEntry.Dividends3 = this.getView().byId("input_CLASS06_SUM_INS").getValue();
			oEntry.Dividends4 = this.getView().byId("input_CLASS06_LOC_INS").getValue();
			oEntry.Dividends5 = this.getView().byId("input_CLASS06_FOR_INS").getValue();
			oEntry.Dividends6 = this.getView().byId("input_CLASS06_CED_PRE").getValue();
			oEntry.RetainedProfitQuarte1 = this.getView().byId("input_CLASS06_PER_RIS").getValue();
			oEntry.RetainedProfitQuarte2 = this.getView().byId("input_CLASS06_COM_REC").getValue();
			oEntry.RetainedProfitQuarte3 = this.getView().byId("input_CLASS06_OTH_REC").getValue();
			oEntry.RetainedProfitQuarte4 = this.getView().byId("input_CLASS07_NAME").getValue();
			oEntry.RetainedProfitQuarte5 = this.getView().byId("input_CLASS07_SUM_INS").getValue();
			oEntry.RetainedProfitQuarte6 = this.getView().byId("input_CLASS07_LOC_INS").getValue();
			oEntry.RetainedIncomeBf1 = this.getView().byId("input_CLASS07_FOR_INS").getValue();
			oEntry.RetainedIncomeBf2 = this.getView().byId("input_CLASS07_CED_PRE").getValue();
			oEntry.RetainedIncomeBf3 = this.getView().byId("input_CLASS07_PER_RIS").getValue();
			oEntry.RetainedIncomeBf4 = this.getView().byId("input_CLASS07_COM_REC").getValue();
			oEntry.RetainedIncomeBf5 = this.getView().byId("input_CLASS07_OTH_REC").getValue();
			oEntry.RetainedIncomeBf6 = this.getView().byId("input_CLASS08_NAME").getValue();
			oEntry.RetainedIncomeCf1 = this.getView().byId("input_CLASS08_SUM_INS").getValue();
			oEntry.RetainedIncomeCf2 = this.getView().byId("input_CLASS08_LOC_INS").getValue();
			oEntry.RetainedIncomeCf3 = this.getView().byId("input_CLASS08_FOR_INS").getValue();
			oEntry.RetainedIncomeCf4 = this.getView().byId("input_CLASS08_CED_PRE").getValue();
			oEntry.RetainedIncomeCf5 = this.getView().byId("input_CLASS08_PER_RIS").getValue();
			oEntry.RetainedIncomeCf6 = this.getView().byId("input_CLASS08_COM_REC").getValue();
			oEntry.Fire1 = this.getView().byId("input_CLASS08_OTH_REC").getValue();
			oEntry.Fire2 = this.getView().byId("input_CLASS09_NAME").getValue();
			oEntry.Motor1 = this.getView().byId("input_CLASS09_SUM_INS").getValue();
			oEntry.Motor2 = this.getView().byId("input_CLASS09_LOC_INS").getValue();
			oEntry.Engineering1 = this.getView().byId("input_CLASS09_FOR_INS").getValue();
			oEntry.Engineering2 = this.getView().byId("input_CLASS09_CED_PRE").getValue();
			oEntry.Marine1 = this.getView().byId("input_CLASS09_PER_RIS").getValue();
			oEntry.Marine2 = this.getView().byId("input_CLASS09_COM_REC").getValue();
			oEntry.Aviation1 = this.getView().byId("input_CLASS09_OTH_REC").getValue();
			oEntry.Aviation2 = this.getView().byId("input_CLASS10_NAME").getValue();
			oEntry.Paccident1 = this.getView().byId("input_CLASS10_SUM_INS").getValue();
			oEntry.Paccident2 = this.getView().byId("input_CLASS10_LOC_INS").getValue();
			oEntry.Bondsguarantee1 = this.getView().byId("input_CLASS10_FOR_INS").getValue();
			oEntry.Bondsguarantee2 = this.getView().byId("input_CLASS10_CED_PRE").getValue();
			oEntry.Credit1 = this.getView().byId("input_CLASS10_PER_RIS").getValue();
			oEntry.Credit2 = this.getView().byId("input_CLASS10_COM_REC").getValue();
			oEntry.Farming1 = this.getView().byId("input_CLASS10_OTH_REC").getValue();
			oEntry.Farming2 = this.getView().byId("input_CLASS11_NAME").getValue();
			oEntry.Currenttotals1 = this.getView().byId("input_CLASS11_SUM_INS").getValue();
			oEntry.Currenttotals2 = this.getView().byId("input_CLASS11_LOC_INS").getValue();
			oEntry.Previoustotals1 = this.getView().byId("input_CLASS11_FOR_INS").getValue();
			oEntry.Previoustotals2 = this.getView().byId("input_CLASS11_CED_PRE").getValue();
			oEntry.Changeone = this.getView().byId("input_CLASS11_PER_RIS").getValue();
			oEntry.Changetwo = this.getView().byId("input_CLASS11_COM_REC").getValue();
			oEntry.U111 = this.getView().byId("input_CLASS11_OTH_REC").getValue();
			oEntry.U112 = this.getView().byId("input_CLASS12_NAME").getValue();
			oEntry.U1111 = this.getView().byId("input_CLASS12_SUM_INS").getValue();
			oEntry.U1122 = this.getView().byId("input_CLASS12_LOC_INS").getValue();
			oEntry.Fire11 = this.getView().byId("input_CLASS12_FOR_INS").getValue();
			oEntry.Motor11 = this.getView().byId("input_CLASS12_CED_PRE").getValue();
			oEntry.Engineering11 = this.getView().byId("input_CLASS12_PER_RIS").getValue();
			oEntry.Marine11 = this.getView().byId("input_CLASS12_COM_REC").getValue();
			oEntry.Aviation11 = this.getView().byId("input_CLASS12_OTH_REC").getValue();
			oEntry.Paccident11 = this.getView().byId("input_CLASS13_NAME").getValue();
			oEntry.Bondsguarantee11 = this.getView().byId("input_CLASS13_SUM_INS").getValue();
			oEntry.Credit11 = this.getView().byId("input_CLASS13_LOC_INS").getValue();
			oEntry.Farming11 = this.getView().byId("input_CLASS13_FOR_INS").getValue();
			oEntry.Currenttotals11 = this.getView().byId("input_CLASS13_CED_PRE").getValue();
			oEntry.Previoustotals11 = this.getView().byId("input_CLASS13_PER_RIS").getValue();
			oEntry.Change11 = this.getView().byId("input_CLASS13_COM_REC").getValue();
			oEntry.Zerochange11 = this.getView().byId("input_CLASS13_OTH_REC").getValue();
			oEntry.U131 = this.getView().byId("input_CLASS14_NAME").getValue();
			oEntry.V131 = this.getView().byId("input_CLASS14_SUM_INS").getValue();
			oEntry.Zerofire = this.getView().byId("input_CLASS14_LOC_INS").getValue();
			oEntry.Zeromotor = this.getView().byId("input_CLASS14_FOR_INS").getValue();
			oEntry.Zeroengineering = this.getView().byId("input_CLASS14_CED_PRE").getValue();
			oEntry.Zeromarine = this.getView().byId("input_CLASS14_PER_RIS").getValue();
			oEntry.Zeroaviation = this.getView().byId("input_CLASS14_COM_REC ").getValue();
			oEntry.Zeropaccident = this.getView().byId("input_CLASS14_OTH_REC").getValue();
			oEntry.Zerobondsguarantee = this.getView().byId("input_CLASS15_NAME").getValue();
			oEntry.Zerocredit = this.getView().byId("input_CLASS15_SUM_INS").getValue();
			oEntry.Zerofarming = this.getView().byId("input_CLASS15_LOC_INS").getValue();
			oEntry.Zerocurrenttotals = this.getView().byId("input_CLASS15_FOR_INS").getValue();
			oEntry.Zeroprevioustotals = this.getView().byId("input_CLASS15_CED_PRE").getValue();
			oEntry.Zerochange = this.getView().byId("input_CLASS15_PER_RIS").getValue();
			oEntry.Zerochengezero = this.getView().byId("input_CLASS15_COM_REC").getValue();
			oEntry.Onefire = this.getView().byId("input_CLASS15_OTH_REC").getValue();
			oEntry.Onemotor = this.getView().byId("input_TOTAL_SUM_INS1").getValue();
			oEntry.Oneengineering = this.getView().byId("input_TOTAL_LOC_INS1").getValue();
			oEntry.Onemarine = this.getView().byId("input_TOTAL_FOR_INS1").getValue();
			oEntry.Oneaviation = this.getView().byId("input_TOTAL_CED_PRE1").getValue();
			oEntry.Onepaccident = this.getView().byId("input_TOTAL_PER_RIS1").getValue();
			oEntry.Onebondsguarantee = this.getView().byId("input_TOTAL_COM_REC1").getValue();
			oEntry.Onecredit = this.getView().byId("input_TOTAL_OTH_REC1").getValue();

			oEntry.Onefarming = this.getView().byId("input_INS01_NAME_CR").getValue();
			oEntry.Onecurrenttotals = this.getView().byId("input_INS01_TOT_CLM").getValue();
			oEntry.Oneprevioustotals = this.getView().byId("input_INS01_TOT_VAL").getValue();
			oEntry.One1change = this.getView().byId("input_INS01_TOT_SET").getValue();
			oEntry.Onechange1 = this.getView().byId("input_INS01_SET_VAL").getValue();
			oEntry.Oneu15 = this.getView().byId("input_INS01_TOT_UNS").getValue();
			oEntry.Onez15 = this.getView().byId("input_INS01_OUT_VAL").getValue();
			oEntry.Twofire = this.getView().byId("input_INS01_OUT_ARR").getValue();
			oEntry.Twomotor = this.getView().byId("input_INS02_NAME_CR").getValue();
			oEntry.Twoengineering = this.getView().byId("input_INS02_TOT_CLM").getValue();
			oEntry.Twomarine = this.getView().byId("input_INS02_TOT_VAL").getValue();
			oEntry.Twoaviation = this.getView().byId("input_INS02_TOT_SET").getValue();
			oEntry.Twopaccident = this.getView().byId("input_INS02_SET_VAL").getValue();
			oEntry.Twobondsguarantee = this.getView().byId("input_INS02_TOT_UNS").getValue();
			oEntry.Twocredit = this.getView().byId("input_INS02_OUT_VAL").getValue();
			oEntry.Twofarming = this.getView().byId("input_INS02_OUT_ARR").getValue();
			oEntry.Twocurrenttotals = this.getView().byId("input_INS03_NAME_CR").getValue();
			oEntry.Twoprevioustotals = this.getView().byId("input_INS03_TOT_CLM").getValue();
			oEntry.Twochange = this.getView().byId("input_INS03_TOT_VAL").getValue();
			oEntry.Chang2 = this.getView().byId("input_INS03_TOT_SET").getValue();
			oEntry.Threefire = this.getView().byId("input_INS03_SET_VAL").getValue();
			oEntry.Threemotor = this.getView().byId("input_INS03_TOT_UNS").getValue();
			oEntry.Threeengineering = this.getView().byId("input_INS03_OUT_VAL").getValue();
			oEntry.Threemarine = this.getView().byId("input_INS03_OUT_ARR").getValue();
			oEntry.Threeaviation = this.getView().byId("input_INS04_NAME_CR").getValue();
			oEntry.Threepaccident = this.getView().byId("input_INS04_TOT_CLM").getValue();
			oEntry.Threebondsguarantee = this.getView().byId("input_INS04_TOT_VAL").getValue();
			oEntry.Threecredit = this.getView().byId("input_INS04_TOT_SET").getValue();
			oEntry.Threefarming = this.getView().byId("input_INS04_SET_VAL").getValue();
			oEntry.Threecurrenttotals = this.getView().byId("input_INS04_TOT_UNS").getValue();
			oEntry.Threeprevioustotals = this.getView().byId("input_INS04_OUT_VAL").getValue();
			oEntry.Threechange = this.getView().byId("input_INS04_OUT_ARR").getValue();
			oEntry.Threechange3 = this.getView().byId("input_INS05_NAME_CR").getValue();
			oEntry.Fourfire = this.getView().byId("input_INS05_TOT_CLM").getValue();
			oEntry.Fourmotor = this.getView().byId("input_INS05_TOT_VAL").getValue();
			oEntry.Fourengineering = this.getView().byId("input_INS05_TOT_SET").getValue();
			oEntry.Fourmarine = this.getView().byId("input_INS05_SET_VAL").getValue();
			oEntry.Fouraviation = this.getView().byId("input_INS05_TOT_UNS").getValue();
			oEntry.Fourpaccident = this.getView().byId("input_INS05_OUT_VAL").getValue();
			oEntry.Fourbondsguarantee = this.getView().byId("input_INS05_OUT_ARR").getValue();

			oEntry.Fourcredit = this.getView().byId("input_INS06_TOT_CLM").getValue();
			oEntry.Fourfarming = this.getView().byId("input_INS06_TOT_VAL").getValue();
			oEntry.Fourcurrenttotals = this.getView().byId("input_INS06_TOT_SET").getValue();
			oEntry.Fourprevioustotals = this.getView().byId("input_INS06_SET_VAL").getValue();
			oEntry.Fourchange = this.getView().byId("input_INS06_TOT_UNS").getValue();
			oEntry.Fourchange4 = this.getView().byId("input_INS06_OUT_VAL").getValue();
			oEntry.Fivefire = this.getView().byId("input_INS06_OUT_ARR").getValue();
	
			oEntry.Fivemotor = this.getView().byId("input_INS07_TOT_CLM").getValue();
			oEntry.Fiveengineering = this.getView().byId("input_INS07_TOT_VAL").getValue();
			oEntry.Fivemarine = this.getView().byId("input_INS07_TOT_SET").getValue();
			oEntry.Fiveaviation = this.getView().byId("input_INS07_SET_VAL").getValue();
			oEntry.Fivepaccident = this.getView().byId("input_INS07_TOT_UNS").getValue();
			oEntry.Fivebondsguarantee = this.getView().byId("input_INS07_OUT_VAL").getValue();
			oEntry.Fivecredit = this.getView().byId("input_INS07_OUT_ARR").getValue();
		
			oEntry.Fivefarming = this.getView().byId("input_INS08_TOT_CLM").getValue();
			oEntry.Fivecurrenttotals = this.getView().byId("input_INS08_TOT_VAL").getValue();
			oEntry.Fiveprevioustotals = this.getView().byId("input_INS08_TOT_SET").getValue();
			oEntry.Fivechange = this.getView().byId("input_INS08_SET_VAL").getValue();
			oEntry.Fivechange5 = this.getView().byId("input_INS08_TOT_UNS").getValue();
			oEntry.Z19 = this.getView().byId("input_INS08_OUT_VAL").getValue();
			oEntry.Sixfire = this.getView().byId("input_INS08_OUT_ARR").getValue();

			oEntry.Sixmotor = this.getView().byId("input_INS09_TOT_CLM").getValue();
			oEntry.Sixengineering = this.getView().byId("input_INS09_TOT_VAL").getValue();
			oEntry.Sixmarine = this.getView().byId("input_INS09_TOT_SET").getValue();
			oEntry.Sixaviation = this.getView().byId("input_INS09_SET_VAL").getValue();
			oEntry.Sixpaccident = this.getView().byId("input_INS09_TOT_UNS").getValue();
			oEntry.Sixbondsguarantee = this.getView().byId("input_INS09_OUT_VAL").getValue();
			oEntry.Sixcredit = this.getView().byId("input_INS09_OUT_ARR").getValue();
			
			oEntry.Sixfarming = this.getView().byId("input_INS10_TOT_CLM").getValue();
			oEntry.Sixcurrenttotals = this.getView().byId("input_INS10_TOT_VAL").getValue();
			oEntry.Sixprevioustotals = this.getView().byId("input_INS10_TOT_SET").getValue();
			oEntry.Sixchange = this.getView().byId("input_INS10_SET_VAL").getValue();
			oEntry.Sixchange6 = this.getView().byId("input_INS10_TOT_UNS").getValue();
			oEntry.Sevenfire = this.getView().byId("input_INS10_OUT_VAL").getValue();
			oEntry.Sevenmotor = this.getView().byId("input_INS10_OUT_ARR").getValue();
			
			oEntry.Sevenengineering = this.getView().byId("input_INS11_TOT_CLM").getValue();
			oEntry.Sevenmarine = this.getView().byId("input_INS11_TOT_VAL").getValue();
			oEntry.Sevenaviation = this.getView().byId("input_INS11_TOT_SET").getValue();
			oEntry.Sevenpaccident = this.getView().byId("input_INS11_SET_VAL").getValue();
			oEntry.Sevenbondsguarantee = this.getView().byId("input_INS11_TOT_UNS").getValue();
			oEntry.Sevencredit = this.getView().byId("input_INS11_OUT_VAL").getValue();
			oEntry.Sevenfarming = this.getView().byId("input_INS10_TOT_CLM").getValue();
			oEntry.Sevencurrenttotals = this.getView().byId("input_INS10_TOT_VAL").getValue();
			oEntry.Sevenprevioustotals = this.getView().byId("input_INS10_TOT_SET").getValue();
			oEntry.Sevenchange = this.getView().byId("input_INS10_SET_VAL").getValue();
			
			oEntry.U21 = this.getView().byId("input_INS12_TOT_CLM").getValue();
			oEntry.Z21 = this.getView().byId("input_INS12_TOT_VAL").getValue();
			oEntry.Aa21 = this.getView().byId("input_INS12_TOT_SET").getValue();
			oEntry.Ab21 = this.getView().byId("input_INS12_SET_VAL").getValue();
			
			oEntry.Eightfire = this.getView().byId("input_INS10_OUT_VAL").getValue();
			oEntry.Eightmotor = this.getView().byId("input_INS10_OUT_ARR").getValue();
			oEntry.Eightengineering = this.getView().byId("input_INS11_TOT_CLM").getValue();
			oEntry.Eightmarine = this.getView().byId("input_INS11_TOT_VAL").getValue();
			oEntry.Eightaviation = this.getView().byId("input_INS11_TOT_SET").getValue();
			oEntry.Eightpaccident = this.getView().byId("input_INS11_SET_VAL").getValue();
			oEntry.Eightbondsguarantee = this.getView().byId("input_INS11_TOT_UNS").getValue();
			oEntry.Eightcredit = this.getView().byId("input_INS11_OUT_VAL").getValue();
			oEntry.Eightfarming = this.getView().byId("input_INS10_TOT_CLM").getValue();
			oEntry.Eightcurrenttotals = this.getView().byId("input_INS10_TOT_VAL").getValue();
			oEntry.Eightprevioustotals = this.getView().byId("input_INS10_TOT_SET").getValue();
			oEntry.Eightchange = this.getView().byId("input_INS10_SET_VAL").getValue();
			oEntry.Eightchange8 = this.getView().byId("input_INS10_SET_VAL").getValue();
			
			oEntry.Ninefire = this.getView().byId("input_INS10_OUT_VAL").getValue();
			oEntry.Ninemotor = this.getView().byId("input_INS10_OUT_ARR").getValue();
			oEntry.Nineengineering = this.getView().byId("input_INS11_TOT_CLM").getValue();
			oEntry.Ninemarine = this.getView().byId("input_INS11_TOT_VAL").getValue();
			oEntry.Nineaviation = this.getView().byId("input_INS11_TOT_SET").getValue();
			oEntry.Ninepaccident = this.getView().byId("input_INS11_SET_VAL").getValue();
			oEntry.Ninebondsguarantee = this.getView().byId("input_INS11_TOT_UNS").getValue();
			oEntry.Ninecredit = this.getView().byId("input_INS11_OUT_VAL").getValue();
			oEntry.Ninefarming = this.getView().byId("input_INS10_TOT_CLM").getValue();
			oEntry.Ninecurrenttotals = this.getView().byId("input_INS10_TOT_VAL").getValue();
			oEntry.Nineprevioustotals = this.getView().byId("input_INS10_TOT_SET").getValue();
			oEntry.Ninechange = this.getView().byId("input_INS10_SET_VAL").getValue();
			oEntry.Ninechange9 = this.getView().byId("input_INS10_SET_VAL").getValue();
			
			oEntry.U23 = this.getView().byId("input_INS13_TOT_VAL").getValue();
			oEntry.V23 = this.getView().byId("input_INS13_TOT_SET").getValue();
			
			oEntry.Tenfire = this.getView().byId("input_INS10_OUT_VAL").getValue();
			oEntry.Tenmotor = this.getView().byId("input_INS10_OUT_ARR").getValue();
			oEntry.Tenengineering = this.getView().byId("input_INS11_TOT_CLM").getValue();
			oEntry.Tenmarine = this.getView().byId("input_INS11_TOT_VAL").getValue();
			oEntry.Tenaviation = this.getView().byId("input_INS11_TOT_SET").getValue();
			oEntry.Tenpaccident = this.getView().byId("input_INS11_SET_VAL").getValue();
			oEntry.Tenbondsguarantee = this.getView().byId("input_INS11_TOT_UNS").getValue();
			oEntry.Tencredit = this.getView().byId("input_INS11_OUT_VAL").getValue();
			oEntry.Tenfarming = this.getView().byId("input_INS10_TOT_CLM").getValue();
			oEntry.Tencurrenttotals = this.getView().byId("input_INS10_TOT_VAL").getValue();
			oEntry.Tenprevioustotals = this.getView().byId("input_INS10_TOT_SET").getValue();
			oEntry.Tenchange = this.getView().byId("input_INS10_SET_VAL").getValue();
			oEntry.Tenchange10 = this.getView().byId("input_INS10_SET_VAL").getValue();
			
			oEntry.Elevenfire = this.getView().byId("input_INS10_OUT_VAL").getValue();
			oEntry.Elevenmotor = this.getView().byId("input_INS10_OUT_ARR").getValue();
			oEntry.Elevenengineering = this.getView().byId("input_INS11_TOT_CLM").getValue();
			oEntry.Elevenmarine = this.getView().byId("input_INS11_TOT_VAL").getValue();
			oEntry.Elevenaviation = this.getView().byId("input_INS11_TOT_SET").getValue();
			oEntry.Elevenpaccident = this.getView().byId("input_INS11_SET_VAL").getValue();
			oEntry.Elevenbondsguarantee = this.getView().byId("input_INS11_TOT_UNS").getValue();
			oEntry.Elevencredit = this.getView().byId("input_INS11_OUT_VAL").getValue();
			oEntry.Elevenfarming = this.getView().byId("input_INS10_TOT_CLM").getValue();
			oEntry.Elevencurrenttotals = this.getView().byId("input_INS10_TOT_VAL").getValue();
			oEntry.Elevenprevioustotals = this.getView().byId("input_INS10_TOT_SET").getValue();
			oEntry.Elevenchange = this.getView().byId("input_INS10_SET_VAL").getValue();
			oEntry.Elevenchange11 = this.getView().byId("input_INS10_SET_VAL").getValue();
			
			oEntry.Z251 = this.getView().byId("input_INS13_OUT_VAL").getValue();
			
//	*****************************************end of mapping**************************************************************************************************************

	
			oModel.setUseBatch(true);

			oModel.create("/ZNONLIFERETURNSet", oEntry, {
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
});