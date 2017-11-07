sap.ui.define([
		"com/ipec/crm/controller/BaseController",
		"jquery.sap.global",
		"sap/ui/core/mvc/Controller",
		"sap/ui/model/json/JSONModel",
		"sap/m/MessageToast",
		"sap/m/MessageBox"
	], function(BaseController,jQuery, Controller, JSONModel, MessageToast,MessageBox) {
	"use strict";

	return Controller.extend("com.ipec.crm.controller.PensionReport", {
		onInit : function () {
			
			this.oModel = this.getOwnerComponent().getModel();
			
		},
		onSave : function (evt){
			
			
			var that=this;
                var oController = this;
				var oModel = oController.oModel;
				
				var oEntry = {};
				var obusyDialog = new sap.m.BusyDialog();


	//Annexxure 1
						var InsuaranceCompany = this.getView().byId("NameOfAdministratorInsuaranceCompany").getValue();
						var ContactPerson = this.getView().byId("PrincipalOfficerContactPerson").getValue();
						var Address = this.getView().byId("AddressHeadOffice").getValue();
						var LandlinesCell = this.getView().byId("LandlineCellFax").getValue();
						var EmailAddress = this.getView().byId("EmailAddress").getValue();
						var BranchesAddress = this.getView().byId("BranchesAddress").getValue();
						var NameOfOfficial = this.getView().byId("NameOfOfficialCompletingTheReturn").getValue();
						var Designation = this.getView().byId("PensionOfficialDesignation").getValue();
						var ReportingDate = this.getView().byId("ReportingDate").getValue();
						var check = this.getView().byId("declaration").getSelected();
						
						var Declaration = "";
						if(check === true)
						{
							Declaration = "X";
						}
						
						
						oEntry.InsuranceComp = InsuaranceCompany;
						oEntry.ContactPerson = ContactPerson;
						oEntry.Address = Address;
						oEntry.LandlinesCell = LandlinesCell;
						oEntry.EmailAddress = EmailAddress;
						oEntry.BranchesAddress = BranchesAddress;
						oEntry.NameOfOfficial = NameOfOfficial;
						oEntry.Designation = Designation;
						oEntry.ReportingDate = ReportingDate;
						oEntry.Declaration = Declaration;
						
						
						//Annexxure 2
						
						//one
						var OfficeOfAdminName = this.getView().byId("OfficeOfAdminName").getValue();
						var OfficeOfAdminGender = this.getView().byId("OfficeOfAdminGender").getSelectedKey();
						var OfficeOfAdminDesignation = this.getView().byId("OfficeOfAdminDesignation").getSelectedKey();
						var OfficeOfAdminDesignationWithinBoard = this.getView().byId("OfficeOfAdminDesignationWithinBoard").getSelectedKey();
						var OfficeOfAdminDesignationAtCompany = this.getView().byId("OfficeOfAdminDesignationAtCompany").getValue();
						var OfficeOfAdminNumberOfYearsAsBoardMember = this.getView().byId("OfficeOfAdminNumberOfYearsAsBoardMember").getValue();
						var OfficeOfAdminBoardCommitteeMembership = this.getView().byId("OfficeOfAdminBoardCommitteeMembership").getValue();
						
						oEntry.Officeofadminname = OfficeOfAdminName;
						oEntry.Officeofadmingender = OfficeOfAdminGender;
						oEntry.Officeofadmindesignation = OfficeOfAdminDesignation;
						oEntry.Officeofadmindesignationwithin = OfficeOfAdminDesignationWithinBoard;
						oEntry.Officeofadmindesignationatcomp = OfficeOfAdminDesignationAtCompany;
						oEntry.Officeofadminnumberofyearsasbo = OfficeOfAdminNumberOfYearsAsBoardMember;
						oEntry.Officeofadminboardcommitteemem = OfficeOfAdminBoardCommitteeMembership;
						
						//two
						var OfficeOfAdminName2 = this.getView().byId("OfficeOfAdminName2").getValue();
						var OfficeOfAdminGender2 = this.getView().byId("OfficeOfAdminGender2").getSelectedKey();
						var OfficeOfAdminDesignation2 = this.getView().byId("OfficeOfAdminDesignation2").getSelectedKey();
						var OfficeOfAdminDesignationWithinBoard2 = this.getView().byId("OfficeOfAdminDesignationWithinBoard2").getSelectedKey();
						var OfficeOfAdminDesignationAtCompany2 = this.getView().byId("OfficeOfAdminDesignationAtCompany2").getValue();
						var OfficeOfAdminNumberOfYearsAsBoardMember2 = this.getView().byId("OfficeOfAdminNumberOfYearsAsBoardMember2").getValue();
						var OfficeOfAdminBoardCommitteeMembership2 = this.getView().byId("OfficeOfAdminBoardCommitteeMembership2").getValue();
						
						oEntry.Officeofadminname2 = OfficeOfAdminName2;
						oEntry.Officeofadmingende2 = OfficeOfAdminGender2;
						oEntry.Officeofadmindesignation2 = OfficeOfAdminDesignation2;
						oEntry.Officeofadmindesignationwithi2 = OfficeOfAdminDesignationWithinBoard2;
						oEntry.Officeofadmindesignationatcom2 = OfficeOfAdminDesignationAtCompany2;
						oEntry.Officeofadminnumberofyearsasb2 = OfficeOfAdminNumberOfYearsAsBoardMember2;
						oEntry.Officeofadminboardcommitteeme2 = OfficeOfAdminBoardCommitteeMembership2;
						
						//three
						var OfficeOfAdminName3 = this.getView().byId("OfficeOfAdminName3").getValue();
						var OfficeOfAdminGender3 = this.getView().byId("OfficeOfAdminGender3").getSelectedKey();
						var OfficeOfAdminDesignation3 = this.getView().byId("OfficeOfAdminDesignation3").getSelectedKey();
						var OfficeOfAdminDesignationWithinBoard3 = this.getView().byId("OfficeOfAdminDesignationWithinBoard3").getSelectedKey();
						var OfficeOfAdminDesignationAtCompany3 = this.getView().byId("OfficeOfAdminDesignationAtCompany3").getValue();
						var OfficeOfAdminNumberOfYearsAsBoardMember3 = this.getView().byId("OfficeOfAdminNumberOfYearsAsBoardMember3").getValue();
						var OfficeOfAdminBoardCommitteeMembership3 = this.getView().byId("OfficeOfAdminBoardCommitteeMembership3").getValue();
						
						oEntry.Officeofadminname3 = OfficeOfAdminName3;
						oEntry.Officeofadmingende3 = OfficeOfAdminGender3;
						oEntry.Officeofadmindesignation3 = OfficeOfAdminDesignation3;
						oEntry.Officeofadmindesignationwithi3 = OfficeOfAdminDesignationWithinBoard3;
						oEntry.Officeofadmindesignationatcom3 = OfficeOfAdminDesignationAtCompany3;
						oEntry.Officeofadminnumberofyearsasb3 = OfficeOfAdminNumberOfYearsAsBoardMember3;
						oEntry.Officeofadminboardcommitteeme3 = OfficeOfAdminBoardCommitteeMembership3;
						
						//four
						var OfficeOfAdminName4 = this.getView().byId("OfficeOfAdminName4").getValue();
						var OfficeOfAdminGender4 = this.getView().byId("OfficeOfAdminGender4").getSelectedKey();
						var OfficeOfAdminDesignation4 = this.getView().byId("OfficeOfAdminDesignation4").getSelectedKey();
						var OfficeOfAdminDesignationWithinBoard4 = this.getView().byId("OfficeOfAdminDesignationWithinBoard4").getSelectedKey();
						var OfficeOfAdminDesignationAtCompany4 = this.getView().byId("OfficeOfAdminDesignationAtCompany4").getValue();
						var OfficeOfAdminNumberOfYearsAsBoardMember4 = this.getView().byId("OfficeOfAdminNumberOfYearsAsBoardMember4").getValue();
						var OfficeOfAdminBoardCommitteeMembership4 = this.getView().byId("OfficeOfAdminBoardCommitteeMembership4").getValue();
						
						oEntry.Officeofadminname4 = OfficeOfAdminName4;
						oEntry.Officeofadmingende4 = OfficeOfAdminGender4;
						oEntry.Officeofadmindesignation4 = OfficeOfAdminDesignation4;
						oEntry.Officeofadmindesignationwithi4 = OfficeOfAdminDesignationWithinBoard4;
						oEntry.Officeofadmindesignationatcom4 = OfficeOfAdminDesignationAtCompany4;
						oEntry.Officeofadminnumberofyearsasb4 = OfficeOfAdminNumberOfYearsAsBoardMember4;
						oEntry.Officeofadminboardcommitteeme4 = OfficeOfAdminBoardCommitteeMembership4;
						
						//five
						var OfficeOfAdminName5 = this.getView().byId("OfficeOfAdminName5").getValue();
						var OfficeOfAdminGender5 = this.getView().byId("OfficeOfAdminGender5").getSelectedKey();
						var OfficeOfAdminDesignation5 = this.getView().byId("OfficeOfAdminDesignation5").getSelectedKey();
						var OfficeOfAdminDesignationWithinBoard5 = this.getView().byId("OfficeOfAdminDesignationWithinBoard5").getSelectedKey();
						var OfficeOfAdminDesignationAtCompany5 = this.getView().byId("OfficeOfAdminDesignationAtCompany5").getValue();
						var OfficeOfAdminNumberOfYearsAsBoardMember5 = this.getView().byId("OfficeOfAdminNumberOfYearsAsBoardMember5").getValue();
						var OfficeOfAdminBoardCommitteeMembership5 = this.getView().byId("OfficeOfAdminBoardCommitteeMembership5").getValue();
						
						oEntry.Officeofadminname5 = OfficeOfAdminName5;
						oEntry.Officeofadmingende5 = OfficeOfAdminGender5;
						oEntry.Officeofadmindesignation5 = OfficeOfAdminDesignation5;
						oEntry.Officeofadmindesignationwithi5 = OfficeOfAdminDesignationWithinBoard5;
						oEntry.Officeofadmindesignationatcom5 = OfficeOfAdminDesignationAtCompany5;
						oEntry.Officeofadminnumberofyearsasb5 = OfficeOfAdminNumberOfYearsAsBoardMember5;
						oEntry.Officeofadminboardcommitteeme5 = OfficeOfAdminBoardCommitteeMembership5;
						
						//Tab Two
						var input_ChiefRiskOfficerName = this.getView().byId("input_ChiefRiskOfficerName").getValue();
						var input_ChiefRiskOfficerContactNumbers = this.getView().byId("input_ChiefRiskOfficerContactNumbers").getValue();
						var input_ChiefRiskOfficerPhysicalAddress = this.getView().byId("input_ChiefRiskOfficerPhysicalAddress").getValue();
						
						var input_FinanceDirectorName = this.getView().byId("input_FinanceDirectorName").getValue();
						var input_FinanceDirectorContactNumbers = this.getView().byId("input_FinanceDirectorContactNumbers").getValue();
						var input_FinanceDirectorPhysicalAddress = this.getView().byId("input_FinanceDirectorPhysicalAddress").getValue();
						
						var input_InternalAuditorName = this.getView().byId("input_InternalAuditorName").getValue();
						var input_InternalAuditorContactNumbers = this.getView().byId("input_InternalAuditorContactNumbers").getValue();
						var input_InternalAuditorPhysicalAddress = this.getView().byId("input_InternalAuditorPhysicalAddress").getValue();
						
						var input_ExternalAuditorsName = this.getView().byId("input_ExternalAuditorsName").getValue();
						var input_ExternalAuditorsContactNumbers = this.getView().byId("input_ExternalAuditorsContactNumbers").getValue();
						var input_ExternalAuditorsPhysicalAddress = this.getView().byId("input_ExternalAuditorsPhysicalAddress").getValue();
						
						var input_ComplianceOfficerName = this.getView().byId("input_ComplianceOfficerName").getValue();
						var input_ComplianceOfficerContactNumbers = this.getView().byId("input_ComplianceOfficerContactNumbers").getValue();
						var input_ComplianceOfficerPhysicalAddress = this.getView().byId("input_ComplianceOfficerPhysicalAddress").getValue();
						
						var input_BankersName = this.getView().byId("input_BankersName").getValue();
						var input_BankersContactNumbers = this.getView().byId("input_BankersContactNumbers").getValue();
						var input_BankersPhysicalAddress = this.getView().byId("input_BankersPhysicalAddress").getValue();
						
						var input_ActuaryName = this.getView().byId("input_ActuaryName").getValue();
						var input_ActuaryContactNumbers = this.getView().byId("input_ActuaryContactNumbers").getValue();
						var input_ActuaryPhysicalAddress = this.getView().byId("input_ActuaryPhysicalAddress").getValue();
						
						var input_LawyersName = this.getView().byId("input_LawyersName").getValue();
						var input_LawyersContactNumbers = this.getView().byId("input_LawyersContactNumbers").getValue();
						var input_LawyersPhysicalAddress = this.getView().byId("input_LawyersPhysicalAddress").getValue();
						
						
						oEntry.Chiefriskofficername = input_ChiefRiskOfficerName;
						oEntry.Chiefriskofficercontactnumbers = input_ChiefRiskOfficerContactNumbers;
						oEntry.Chiefriskofficerphysicaladdres = input_ChiefRiskOfficerPhysicalAddress;
						
						oEntry.Financedirectorname = input_FinanceDirectorName;
						oEntry.Financedirectorcontactnumbers = input_FinanceDirectorContactNumbers;
						oEntry.Financedirectorphysicaladdress = input_FinanceDirectorPhysicalAddress;
						
						oEntry.Internalauditorname = input_InternalAuditorName;
						oEntry.Internalauditorcontactnumbers = input_InternalAuditorContactNumbers;
						oEntry.Internalauditorphysicaladdress = input_InternalAuditorPhysicalAddress;
						
						oEntry.Externalauditorsname = input_ExternalAuditorsName;
						oEntry.Externalauditorscontactnumbers = input_ExternalAuditorsContactNumbers;
						oEntry.Externalauditorsphysicaladdres = input_ExternalAuditorsPhysicalAddress;
						
						oEntry.Complianceofficername = input_ComplianceOfficerName;
						oEntry.Complianceofficercontactnumber = input_ComplianceOfficerContactNumbers;
						oEntry.Complianceofficerphysicaladdre = input_ComplianceOfficerPhysicalAddress;
						
						oEntry.Bankersname = input_BankersName;
						oEntry.Bankerscontactnumbers = input_BankersContactNumbers;
						oEntry.Bankersphysicaladdress = input_BankersPhysicalAddress;
						
						oEntry.Actuaryname = input_ActuaryName;
						oEntry.Actuarycontactnumbers = input_ActuaryContactNumbers;
						oEntry.Actuaryphysicaladdress = input_ActuaryPhysicalAddress;
						
						oEntry.Lawyersname = input_LawyersName;
						oEntry.Lawyerscontactnumbers = input_LawyersContactNumbers;
						oEntry.Lawyersphysicaladdress = input_LawyersPhysicalAddress;
						
						
						//Annexxure 3
						
						var input_NameOfFund = this.getView().byId("input_NameOfFund").getValue();
						var input_TypeOfFund = this.getView().byId("input_TypeOfFund").getSelectedKey();
						var input_SelfAdministeredInsured = this.getView().byId("input_SelfAdministeredInsured").getSelectedKey();
						var input_ContributionStatus = this.getView().byId("input_ContributionStatus").getSelectedKey();
						var input_FundStatus = this.getView().byId("input_FundStatus").getSelectedKey();
						var input_AverageContributionRateEmployer = this.getView().byId("input_AverageContributionRateEmployer").getValue();
						var input_AverageContributionRateEmployee = this.getView().byId("input_AverageContributionRateEmployee").getValue();
						var input_NormalRetirementAge = this.getView().byId("input_NormalRetirementAge").getValue();
						var input_GLACoverMultiplier = this.getView().byId("input_GLACoverMultiplier").getValue();
						
						oEntry.Nameoffund = input_NameOfFund;
						oEntry.Typeoffund = input_TypeOfFund;
						oEntry.Sselfadministeredinsured = input_SelfAdministeredInsured;
						oEntry.Contributionstatus = input_ContributionStatus;
						oEntry.Fundstatus = input_FundStatus;
						oEntry.Averagecontributionrateemplyer = input_AverageContributionRateEmployer;
						oEntry.Averagecontributionrateemplyee = input_AverageContributionRateEmployee;
						oEntry.Normalretirementage = input_NormalRetirementAge;
						oEntry.Glacovermultiplier = input_GLACoverMultiplier;
						
						
						//Annexxure 4
						
						//Tab One
						var input_PensionFund = this.getView().byId("input_PensionFund").getValue();
						var input_NewEntrants = this.getView().byId("input_NewEntrants").getValue();
						var input_ActiveMembersExcludingNewEntrants = this.getView().byId("input_ActiveMembersExcludingNewEntrants").getValue();
						var input_Pensioners = this.getView().byId("input_Pensioners").getValue();
						var input_DefferedPensioners = this.getView().byId("input_DefferedPensioners").getValue();
						var input_SuspendedPensioners = this.getView().byId("input_SuspendedPensioners").getValue();
						var input_UnclaimedBenefitsNumber = this.getView().byId("input_UnclaimedBenefitsNumber").getValue();
						
						
						oEntry.Pensionfund = input_PensionFund;
						oEntry.Newentrants = input_NewEntrants;
						oEntry.Activemembersexcludingnewentra = input_ActiveMembersExcludingNewEntrants;
						oEntry.Pensioners = input_Pensioners;
						oEntry.Defferedpensioners = input_DefferedPensioners;
						oEntry.Suspendedpensioners = input_SuspendedPensioners;
						oEntry.Unclaimedbenefitsnumber = input_UnclaimedBenefitsNumber;
						
						
						//Tab Two
						var input_NumberOfExitsFomFund = this.getView().byId("input_NumberOfExitsFomFund").getValue();
						var input_NumberOfExitsOutsideFund = this.getView().byId("input_NumberOfExitsOutsideFund").getValue();
						var input_NumberOfMembersWithAnnuityBenefits = this.getView().byId("input_NumberOfMembersWithAnnuityBenefits").getValue();
						var input_YearToDateAmountOfAnnuitiesBenefits = this.getView().byId("input_YearToDateAmountOfAnnuitiesBenefits").getValue();
						var input_NumberOfWidowsChildrenSupportedByFund = this.getView().byId("input_NumberOfWidowsChildrenSupportedByFund").getValue();
						var input_OpeningAccumulatedCreditForTheYear = this.getView().byId("input_OpeningAccumulatedCreditForTheYear").getValue();
						var input_AverageMonthlyPensionableSalary = this.getView().byId("input_AverageMonthlyPensionableSalary").getValue();
						var input_YearToDateTotalContributionsIncludingArrears = this.getView().byId("input_YearToDateTotalContributionsIncludingArrears").getValue();
						var input_ClosingAccumulatedCredit = this.getView().byId("input_ClosingAccumulatedCredit").getValue();
						var input_TotalFundContribution = this.getView().byId("input_TotalFundContribution").getValue();
						
						
						oEntry.Numberofexitsfomfund = input_NumberOfExitsFomFund;
						oEntry.Numberofexitsoutsidefund = input_NumberOfExitsOutsideFund;
						oEntry.Numberofmemberswithannuitybene = input_NumberOfMembersWithAnnuityBenefits;
						oEntry.Yeartodateamountofannuitiesben = input_YearToDateAmountOfAnnuitiesBenefits;
						oEntry.Numberofwidowschildrensupporte = input_NumberOfWidowsChildrenSupportedByFund;
						oEntry.Openingaccumulatedcreditforthe = input_OpeningAccumulatedCreditForTheYear;
						oEntry.Averagemonthlypensionablesalar = input_AverageMonthlyPensionableSalary;
						oEntry.Yeartodatetotalcontributionsin = input_YearToDateTotalContributionsIncludingArrears;
						oEntry.Closingaccumulatedcredit = input_ClosingAccumulatedCredit;
						oEntry.Totalfundcontribution = input_TotalFundContribution;
						
						
						//Annexxure 5
						
						//Tab One 
						var input_YearToDateContributions = this.getView().byId("input_YearToDateContributions").getValue();
						var input_TransferFromOtherFunds = this.getView().byId("input_TransferFromOtherFunds").getValue();
						var input_RentalIncome = this.getView().byId("input_RentalIncome").getValue();
						var input_InterestFromInvestments = this.getView().byId("input_InterestFromInvestments").getValue();
						var input_DividentsFromInvestments = this.getView().byId("input_DividentsFromInvestments").getValue();
						var input_GLAPremiumsReceived = this.getView().byId("input_GLAPremiumsReceived").getValue();
						var input_OtherIncome = this.getView().byId("input_OtherIncome").getValue();
						var input_TotalIncome = this.getView().byId("input_TotalIncome").getValue();
						
						oEntry.Yeartodatecontributions = input_YearToDateContributions;
						oEntry.Transferfromotherfunds = input_TransferFromOtherFunds;
						oEntry.Rentalincome = input_RentalIncome;
						oEntry.Interestfrominvestments = input_InterestFromInvestments;
						oEntry.Dividentsfrominvestments = input_DividentsFromInvestments;
						oEntry.Glapremiumsreceived = input_GLAPremiumsReceived;
						oEntry.Otherincome = input_OtherIncome;
						oEntry.Totalincome = input_TotalIncome;
						
						//Tab Two
						var input_YearToDateMonthly = this.getView().byId("input_YearToDateMonthly").getValue();
						var input_13CommutationsPaid = this.getView().byId("input_13CommutationsPaid").getValue();
						var input_FullCommutationsPaid = this.getView().byId("input_FullCommutationsPaid").getValue();
						var input_StaffCosts = this.getView().byId("input_StaffCosts").getValue();
						var input_AdminExpenses = this.getView().byId("input_AdminExpenses").getValue();
						var input_InvestmentManagementExpenses = this.getView().byId("input_InvestmentManagementExpenses").getValue();
						var input_InvestmentAdvisoryServices = this.getView().byId("input_InvestmentAdvisoryServices").getValue();
						var input_ActuarialFees = this.getView().byId("input_ActuarialFees").getValue();
						
						oEntry.Yeartodatemonthly = input_YearToDateMonthly;
						oEntry.Commutationspaid = input_13CommutationsPaid;
						oEntry.Fullcommutationspaid = input_FullCommutationsPaid;
						oEntry.Staffcosts = input_StaffCosts;
						oEntry.Adminexpenses = input_AdminExpenses;
						oEntry.Investmentmanagementexpenses = input_InvestmentManagementExpenses;
						oEntry.Investmentadvisoryservices = input_InvestmentAdvisoryServices;
						oEntry.Actuarialfees = input_ActuarialFees;
						
						//Tab Three
						var input_AuditFees = this.getView().byId("input_AuditFees").getValue();
						var input_LegalFees = this.getView().byId("input_LegalFees").getValue();
						var input_BoardFees = this.getView().byId("input_BoardFees").getValue();
						var input_GroupLifeAssuranceBenefitsPaid = this.getView().byId("input_GroupLifeAssuranceBenefitsPaid").getValue();
						var input_IPECLevies = this.getView().byId("input_IPECLevies").getValue();
						var input_BankCharges = this.getView().byId("input_BankCharges").getValue();
						var input_SundryExpenses = this.getView().byId("input_SundryExpenses").getValue();
						var input_SubscriptionsZAPF = this.getView().byId("input_SubscriptionsZAPF").getValue();
						
						
						oEntry.Auditfees = input_AuditFees;
						oEntry.Legalfees = input_LegalFees;
						oEntry.Boardfees = input_BoardFees;
						oEntry.Grouplifeassurancebenefitspaid = input_GroupLifeAssuranceBenefitsPaid;
						oEntry.Ipeclevies = input_IPECLevies;
						oEntry.Bankcharges = input_BankCharges;
						oEntry.Sundryexpenses = input_SundryExpenses;
						oEntry.Subscriptionszapf = input_SubscriptionsZAPF;
						
						//Tab Four
						var input_PropertyExpenses = this.getView().byId("input_PropertyExpenses").getValue();
						var input_RevaluationExpenses = this.getView().byId("input_RevaluationExpenses").getValue();
						var input_TransferToReserves = this.getView().byId("input_TransferToReserves").getValue();
						var input_LossProfitOnDisposalOfAssets = this.getView().byId("input_LossProfitOnDisposalOfAssets").getValue();
						var input_OthersSpecifyTrusteesCOPRegFees = this.getView().byId("input_OthersSpecifyTrusteesCOPRegFees").getValue();
						var input_TotalExpenditure = this.getView().byId("input_TotalExpenditure").getValue();
						var input_SurplusDeficit = this.getView().byId("input_SundryExpenses").getValue();
						
						oEntry.Propertyexpenses = input_PropertyExpenses;
						oEntry.Revaluationexpenses = input_RevaluationExpenses;
						oEntry.Transfertoreserves = input_TransferToReserves;
						oEntry.Lossprofitondisposalofassets = input_LossProfitOnDisposalOfAssets;
						oEntry.Othersspecifytrusteescopregfee = input_OthersSpecifyTrusteesCOPRegFees;
						oEntry.Totalexpenditure = input_TotalExpenditure;
						oEntry.Surplusdeficit = input_SurplusDeficit;
						
						//Annexxure 6
						
						//Tab One
						var input_Property = this.getView().byId("input_Property").getValue();
						var input_MotorVehicles = this.getView().byId("input_MotorVehicles").getValue();
						var input_ComputerSystems = this.getView().byId("input_ComputerSystems").getValue();
						var input_AssetsOtherSpecify = this.getView().byId("input_AssetsOtherSpecify").getValue();
						var input_TotalOperatingAssets = this.getView().byId("input_TotalOperatingAssets").getValue();
						
						oEntry.Property = input_Property;
						oEntry.Motorvehicles = input_MotorVehicles;
						oEntry.Computersystems = input_ComputerSystems;
						oEntry.Assetsotherspecify = input_AssetsOtherSpecify;
						oEntry.Totaloperatingassets = input_TotalOperatingAssets;
						
						//Tab Two
						var input_InvestmentProperty = this.getView().byId("input_InvestmentProperty").getValue();
						var input_EquitiesQuoted = this.getView().byId("input_EquitiesQuoted").getValue();
						var input_EquitiesUnquoted = this.getView().byId("input_EquitiesUnquoted").getValue();
						var input_PrescribedAssetsGovernmentStock = this.getView().byId("input_PrescribedAssetsGovernmentStock").getValue();
						var input_PrescribedAssetsOther = this.getView().byId("input_PrescribedAssetsOther").getValue();
						var input_FixedInterestSecurities = this.getView().byId("input_FixedInterestSecurities").getValue();
						var input_LoansAndMortagagesOnPropertyExcludingStaff = this.getView().byId("input_LoansAndMortagagesOnPropertyExcludingStaff").getValue();
						var input_StaffLoansAndMortgages = this.getView().byId("input_StaffLoansAndMortgages").getValue();
						var input_LongTermDeposits = this.getView().byId("input_LongTermDeposits").getValue();
						var input_NonCurrentOtherSpecify = this.getView().byId("input_NonCurrentOtherSpecify").getValue();
						var input_TotalNonCurrentInvestmentAssets = this.getView().byId("input_TotalNonCurrentInvestmentAssets").getValue();
						
						oEntry.Investmentproperty = input_InvestmentProperty;
						oEntry.Equitiesquoted = input_EquitiesQuoted;
						oEntry.Equitiesunquoted = input_EquitiesUnquoted;
						oEntry.Prescribedassetsgovernmentstoc = input_PrescribedAssetsGovernmentStock;
						oEntry.Prescribedassetsother = input_PrescribedAssetsOther;
						oEntry.Fixedinterestsecurities = input_FixedInterestSecurities;
						oEntry.Loansandmortagagesonpropertyex = input_LoansAndMortagagesOnPropertyExcludingStaff;
						oEntry.Staffloansandmortgages = input_StaffLoansAndMortgages;
						oEntry.Longtermdeposits = input_LongTermDeposits;
						oEntry.Noncurrentotherspecify = input_NonCurrentOtherSpecify;
						oEntry.Totalnoncurrentinvestmentasset = input_TotalNonCurrentInvestmentAssets;
						
						//Tab Three
						var input_CurrentPrescribedAssetsGovernmentStock = this.getView().byId("input_CurrentPrescribedAssetsGovernmentStock").getValue();
						var input_CurrentPrescribedAssetsOther = this.getView().byId("input_CurrentPrescribedAssetsOther").getValue();
						var input_CurrentFixedInterestSecurities = this.getView().byId("input_CurrentFixedInterestSecurities").getValue();
						var input_CashAtBank = this.getView().byId("input_CashAtBank").getValue();
						var input_MoneyMarketInvestments = this.getView().byId("input_MoneyMarketInvestments").getValue();
						var input_StaffLoans = this.getView().byId("input_StaffLoans").getValue();
						var input_DividendsAndInterestRecievable = this.getView().byId("input_DividendsAndInterestRecievable").getValue();
						var input_CurrentOtherSpecify = this.getView().byId("input_CurrentOtherSpecify").getValue();
						var input_TotalCurrentInvestmentAssets = this.getView().byId("input_TotalCurrentInvestmentAssets").getValue();
						var input_ContributionArrears = this.getView().byId("input_ContributionArrears").getValue();
						var input_RentalArrears = this.getView().byId("input_RentalArrears").getValue();
						var input_TotalAssets = this.getView().byId("input_TotalAssets").getValue();
						
						oEntry.Currentprescribedassetsgovernm = input_CurrentPrescribedAssetsGovernmentStock;
						oEntry.Currentprescribedassetsother = input_CurrentPrescribedAssetsOther;
						oEntry.Currentfixedinterestsecurities = input_CurrentFixedInterestSecurities;
						oEntry.Cashatbank = input_CashAtBank;
						oEntry.Moneymarketinvestments = input_MoneyMarketInvestments;
						oEntry.Staffloans = input_StaffLoans;
						oEntry.Dividendsandinterestrecievable = input_DividendsAndInterestRecievable;
						oEntry.Currentotherspecify = input_CurrentOtherSpecify;
						oEntry.Totalcurrentinvestmentassets = input_TotalCurrentInvestmentAssets;
						oEntry.Contributionarrears = input_ContributionArrears;
						oEntry.Rentalarrears = input_RentalArrears;
						oEntry.Totalassets = input_TotalAssets;
						
						//Tab Four
						var input_Reserves = this.getView().byId("input_Reserves").getValue();
						var input_Provisions = this.getView().byId("input_Provisions").getValue();
						var input_DefferedPensionBenefits = this.getView().byId("input_DefferedPensionBenefits").getValue();
						var input_ArrearPensionBenefits = this.getView().byId("input_ArrearPensionBenefits").getValue();
						var input_SundryCreditors = this.getView().byId("input_SundryCreditors").getValue();
						var input_Withdrawals = this.getView().byId("input_Withdrawals").getValue();
						var input_OtherCreditorsSpecify = this.getView().byId("input_OtherCreditorsSpecify").getValue();
						var input_TotalLiabilities = this.getView().byId("input_TotalLiabilities").getValue();
						var input_NetAssetsAvailableForBenefits = this.getView().byId("input_NetAssetsAvailableForBenefits").getValue();
						
						
						oEntry.Reserves = input_Reserves;
						oEntry.Provisions = input_Provisions;
						oEntry.Defferedpensionbenefits = input_DefferedPensionBenefits;
						oEntry.Arrearpensionbenefits = input_ArrearPensionBenefits;
						oEntry.Sundrycreditors = input_SundryCreditors;
						oEntry.Withdrawals = input_Withdrawals;
						oEntry.Othercreditorsspecify = input_OtherCreditorsSpecify;
						oEntry.Totalliabilities = input_TotalLiabilities;
						oEntry.Netassetsavailableforbenefits = input_NetAssetsAvailableForBenefits;
						
						//Annexxure 7
						
						//Tab One
						var input_CashReceivedFromContributions = this.getView().byId("input_CashReceivedFromContributions").getValue();
						var input_CashTransferredFromToOtherFunds = this.getView().byId("input_CashTransferredFromToOtherFunds").getValue();
						var input_CashCommutationsPaid = this.getView().byId("input_CashCommutationsPaid").getValue();
						var input_WithdrawalsPaid = this.getView().byId("input_WithdrawalsPaid").getValue();
						var input_InterestReceived = this.getView().byId("input_InterestReceived").getValue();
						var input_DividendsReceived = this.getView().byId("input_DividendsReceived").getValue();
						var input_TaxPaid = this.getView().byId("input_TaxPaid").getValue();
						var input_CashflowOpOtherSpecify = this.getView().byId("input_CashflowOpOtherSpecify").getValue();
						var input_TotalCashFromOperatingActivities = this.getView().byId("input_TotalCashFromOperatingActivities").getValue();
						
						oEntry.Cashreceivedfromcontributions = input_CashReceivedFromContributions;
						oEntry.Cashtransferredfromtootherfund = input_CashTransferredFromToOtherFunds;
						oEntry.Cashcommutationspaid = input_CashCommutationsPaid;
						oEntry.Withdrawalspaid = input_WithdrawalsPaid;
						oEntry.Interestreceived = input_InterestReceived;
						oEntry.Dividendsreceived = input_DividendsReceived;
						oEntry.Taxpaid = input_TaxPaid;
						oEntry.Cashflowopotherspecify = input_CashflowOpOtherSpecify;
						oEntry.Totalcashfromoperatingactiviti = input_TotalCashFromOperatingActivities;
						
						//Tab Two
						var input_PurchaseOfInvestmentPropety = this.getView().byId("input_PurchaseOfInvestmentPropety").getValue();
						var input_PurchaseOperationalAssets = this.getView().byId("input_PurchaseOperationalAssets").getValue();
						var input_PurchaseOfIntangibleAssets = this.getView().byId("input_PurchaseOfIntangibleAssets").getValue();
						var input_ProceedsFromSaleAndRealisationOfFixedAssets = this.getView().byId("input_ProceedsFromSaleAndRealisationOfFixedAssets").getValue();
						var input_AcquisationOfSubsidiariesAndEquities = this.getView().byId("input_AcquisationOfSubsidiariesAndEquities").getValue();
						var input_InvestmentsInLoansMortgagesAndLongTermLoans = this.getView().byId("input_InvestmentsInLoansMortgagesAndLongTermLoans").getValue();
						var input_CashFromInvestingOtherSpecify = this.getView().byId("input_CashFromInvestingOtherSpecify").getValue();
						var input_TotalCashflowFromInvestingActivities = this.getView().byId("input_TotalCashflowFromInvestingActivities").getValue();
						
						oEntry.Purchaseofinvestmentpropety = input_PurchaseOfInvestmentPropety;
						oEntry.Purchaseoperationalassets = input_PurchaseOperationalAssets;
						oEntry.Purchaseofintangibleassets = input_PurchaseOfIntangibleAssets;
						oEntry.Proceedsfromsaleandrealisation = input_ProceedsFromSaleAndRealisationOfFixedAssets;
						oEntry.Acquisationofsubsidiariesandeq = input_AcquisationOfSubsidiariesAndEquities;
						oEntry.Investmentsinloansmortgagesand = input_InvestmentsInLoansMortgagesAndLongTermLoans;
						oEntry.Cashfrominvestingotherspecify = input_CashFromInvestingOtherSpecify;
						oEntry.Totalcashflowfrominvestingacti = input_TotalCashflowFromInvestingActivities;
						
						//Tab Three
						var input_ProceedsFromBorrowingFacilities = this.getView().byId("input_ProceedsFromBorrowingFacilities").getValue();
						var input_RepaymentsOfBorrowingsByFund = this.getView().byId("input_RepaymentsOfBorrowingsByFund").getValue();
						var input_FinanceLeasePayments = this.getView().byId("input_FinanceLeasePayments").getValue();
						var input_InvestmentInFinancingOtherSpecify = this.getView().byId("input_InvestmentInFinancingOtherSpecify").getValue();
						var input_TotalCashFromFinancingActivities = this.getView().byId("input_TotalCashFromFinancingActivities").getValue();
						
						oEntry.Proceedsfromborrowingfacilitie = input_ProceedsFromBorrowingFacilities;
						oEntry.Repaymentsofborrowingsbyfund = input_RepaymentsOfBorrowingsByFund;
						oEntry.Financeleasepayments = input_FinanceLeasePayments;
						oEntry.Investmentinfinancingotherspec = input_InvestmentInFinancingOtherSpecify;
						oEntry.Totalcashfromfinancingactiviti = input_TotalCashFromFinancingActivities;
						
						//Tab Four
						var input_CashAndCashEquivalentsAsAt1JanuaryCurrentYear = this.getView().byId("input_CashAndCashEquivalentsAsAt1JanuaryCurrentYear").getValue();
						var input_CashAndCashEquivalentsAsAtEndOfReportingPeriod = this.getView().byId("input_CashAndCashEquivalentsAsAtEndOfReportingPeriod").getValue();
						var input_MovementInCashAndCashEquivalents = this.getView().byId("input_MovementInCashAndCashEquivalents").getValue();
						
						oEntry.Cashandcashequivalentsasat1jan = input_CashAndCashEquivalentsAsAt1JanuaryCurrentYear;
						oEntry.Cashandcashequivalentsasatendo = input_CashAndCashEquivalentsAsAtEndOfReportingPeriod;
						oEntry.Movementincashandcashequivalen = input_MovementInCashAndCashEquivalents;
						
						
						//Annexxure 8
						
						//Tab One
						var input_RentalArrearsNameOfFund = this.getView().byId("input_RentalArrearsNameOfFund").getValue();
						var input_RentalLessThan30Days = this.getView().byId("input_RentalLessThan30Days").getValue();
						var input_RentalBetween30And90Days = this.getView().byId("input_RentalBetween30And90Days").getValue();
						var input_RentalBetween90DaysAnd180Days = this.getView().byId("input_RentalBetween90DaysAnd180Days").getValue();
						var input_RentalGreater180Days = this.getView().byId("input_RentalGreater180Days").getValue();
						var input_RentalTotalForQuarter = this.getView().byId("input_RentalTotalForQuarter").getValue();
						var input_RentalOpeningQuartelyFigure = this.getView().byId("input_RentalOpeningQuartelyFigure").getValue();
						
						oEntry.Rentalarrearsnameoffund = input_RentalArrearsNameOfFund;
						oEntry.Rentallessthan30days = input_RentalLessThan30Days;
						oEntry.Rentalbetween30and90days = input_RentalBetween30And90Days;
						oEntry.Rentalbetween90daysand180days = input_RentalBetween90DaysAnd180Days;
						oEntry.Rentalgreater180days = input_RentalGreater180Days;
						oEntry.Rentaltotalforquarter = input_RentalTotalForQuarter;
						oEntry.Rentalopeningquartelyfigure = input_RentalOpeningQuartelyFigure;
						
						//Tab Two
						var input_ContributionArrearsNameOfFund = this.getView().byId("input_ContributionArrearsNameOfFund").getValue();
						var input_ContributionLessThan30Days = this.getView().byId("input_ContributionLessThan30Days").getValue();
						var input_ContributionBetween30And90Days = this.getView().byId("input_ContributionBetween30And90Days").getValue();
						var input_ContributionBetween90DaysAnd180Days = this.getView().byId("input_ContributionBetween90DaysAnd180Days").getValue();
						var input_ContributionGreater180Days = this.getView().byId("input_ContributionGreater180Days").getValue();
						var input_ContributionTotalForQuarter = this.getView().byId("input_ContributionTotalForQuarter").getValue();
						var input_ContributionOpeningQuartelyFigure = this.getView().byId("input_ContributionOpeningQuartelyFigure").getValue();
						
						oEntry.Contributionarrearsnameoffund = input_ContributionArrearsNameOfFund;
						oEntry.Contributionlessthan30days = input_ContributionLessThan30Days;
						oEntry.Contributionbetween30and90days = input_ContributionBetween30And90Days;
						oEntry.Contributionbetween90daysand18 = input_ContributionBetween90DaysAnd180Days;
						oEntry.Contributiongreater180days = input_ContributionGreater180Days;
						oEntry.Contributiontotalforquarter = input_ContributionTotalForQuarter;
						oEntry.Contributionopeningquartelyfig = input_ContributionOpeningQuartelyFigure;
						
						
						//Annexxure 9
						
						var input_CommutationNameOfFund = this.getView().byId("input_CommutationNameOfFund").getValue();
						var input_TotalNumberOfApplications = this.getView().byId("input_TotalNumberOfApplications").getValue();
						var input_TotalAmountRequested = this.getView().byId("input_TotalAmountRequested").getValue();
						var input_TotalNumberOfCommutationsApproved = this.getView().byId("input_TotalNumberOfCommutationsApproved").getValue();
						var input_TotalAmountOfCommutationsApproved = this.getView().byId("input_TotalAmountOfCommutationsApproved").getValue();
						var input_TotalNumberOfRejectedCommutations = this.getView().byId("input_TotalNumberOfRejectedCommutations").getValue();
						var input_TotalAmountOfRejectedCommutations = this.getView().byId("input_TotalAmountOfRejectedCommutations").getValue();
						var input_TotalNumberOfApprovedCommutations = this.getView().byId("input_TotalNumberOfApprovedCommutations").getValue();
						var input_TotalAmountOfApprovedCommutations = this.getView().byId("input_TotalAmountOfApprovedCommutations").getValue();
						
						oEntry.Commutationnameoffund = input_CommutationNameOfFund;
						oEntry.Totalnumberofapplications = input_TotalNumberOfApplications;
						oEntry.Totalamountrequested = input_TotalAmountRequested;
						oEntry.Totalnumberofcommutationsappro = input_TotalNumberOfCommutationsApproved;
						oEntry.Totalamountofcommutationsappro = input_TotalAmountOfCommutationsApproved;
						oEntry.Totalnumberofrejectedcommutati = input_TotalNumberOfRejectedCommutations;
						oEntry.Totalamountofrejectedcommutati = input_TotalAmountOfRejectedCommutations;
						oEntry.Totalnumberofapprovedcommutati = input_TotalNumberOfApprovedCommutations;
						oEntry.Totalamountofapprovedcommutati = input_TotalAmountOfApprovedCommutations;

			
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
		// DIALOG 1 - Pay Scale Group
	    _getDialog : function () {
	         if (this._oDialog) {
	             return this._oDialog;
	                    
	          }
	      this._oDialog = sap.ui.xmlfragment("com.ipec.crm.view.pensionfund", this);
	      this.getView().addDependent(this._oDialog);
	      return this._oDialog;
    	},
    	//DIALOG 1
		    handleValueHelp: function () {
		    this._getDialog();
		    this._oDialog.open();
		    },
		
		//DIALOG1
		   _onTableItemPress1: function(oEvent) {
		       var oController=this;
		       var id = oEvent.getParameters("rowContext").listItem.mAggregations.cells[0].getText();
		       var oInput1 = oController.byId("NameOfAdministratorInsuaranceCompany");
		       oInput1.setValue(id);
		       this._getDialog().close();
		   },
		    
		   closeDialog: function(oEvent) {
		        var oController = this;
		        this._getDialog().close();
		
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
		}
	});
});