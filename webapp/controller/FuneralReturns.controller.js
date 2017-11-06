sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"jquery.sap.global",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"sap/m/MessageBox"
], function(Controller) {
	"use strict";

	return Controller.extend("com.ipec.crm.controller.FuneralReturns", {
		onInit : function () {
			// var sUrl2 = "#" + this.getOwnerComponent().getRouter().getURL("page2");
			// this.byId("link2").setHref(sUrl2);
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
		_calNetWrittenPremium: function(){
			// set Net Written Premium
			//Gross Premium Written + Outward Reassurance Premium = Net Written Premium
			var orp,gpw,nwp;
			gpw = this.getView().byId("__inputGPW").getValue();
			orp = this.getView().byId("__inputORP").getValue();
			gpw = parseFloat(gpw) ? parseFloat(gpw) : 0;
	    	orp = parseFloat(orp) ? parseFloat(orp) : 0;
			nwp = gpw+orp;
			this.getView().byId("__inputNWP").setValue(nwp);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calNetEarnedPremium: function(){
			// set Net Earned Premium
			//Net Written Premium + Unearned Premium = Net Earned Premium
			var nwp,up,nep;
			nwp = this.getView().byId("__inputNWP").getValue();
			up = this.getView().byId("__inputUP").getValue();
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
			cp = this.getView().byId("__inputCP").getValue();
			co = this.getView().byId("__inputCO").getValue();
			cibnt = this.getView().byId("__inputCIBNT").getValue();
			uxp = this.getView().byId("__inputUXP").getValue();
			cp = parseFloat(cp) ? parseFloat(cp) : 0;
	    	co = parseFloat(co) ? parseFloat(co) : 0;
	    	cibnt = parseFloat(cibnt) ? parseFloat(cibnt) : 0;
	    	uxp = parseFloat(uxp) ? parseFloat(uxp) : 0;
			nc = cp+co+cibnt+uxp;
			this.getView().byId("__inputNC").setValue(nc);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calUnderwritingProfitLoss: function(){
			// set Underwriting Profit/(Loss)
			//Net Earned Premium  - Net Claims – Administrative Expenses - Net Fees and Commission Paid = Underwriting Profit/(Loss)
			var nep,nc,ae,nfcp,upl;
			nep = this.getView().byId("__inputNEP").getValue();
			nc = this.getView().byId("__inputNC").getValue();
			ae = this.getView().byId("__inputAE").getValue();
			nfcp = this.getView().byId("__inputNFCP").getValue();
			nep = parseFloat(nep) ? parseFloat(nep) : 0;
	    	nc = parseFloat(nc) ? parseFloat(nc) : 0;
	    	ae = parseFloat(ae) ? parseFloat(ae) : 0;
	    	nfcp = parseFloat(nfcp) ? parseFloat(nfcp) : 0;
			upl = nep-nc-ae-nfcp;
			this.getView().byId("__inputUPL").setValue(upl);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calEarningsBeforeInterestAndTaxation: function(){
			// TO VERIFY IF FORMULAR IS CORRECT
			// set Earnings Before Interest and Taxation
			//Underwriting Profit/(Loss) + Investment Income + Other Income (Specify) - Management Expenses - Other Expenses (Specify) = Earnings Before Interest and Taxation 
			var upl,ii,oi,me,oe,ebit;
			upl = this.getView().byId("__inputUPL").getValue();
			ii = this.getView().byId("__inputII").getValue();
			oi = this.getView().byId("__inputOI").getValue();
			me = this.getView().byId("__inputME").getValue();
			oe = this.getView().byId("__inputOE").getValue();
			upl = parseFloat(upl) ? parseFloat(upl) : 0;
	    	ii = parseFloat(ii) ? parseFloat(ii) : 0;
	    	oi = parseFloat(oi) ? parseFloat(oi) : 0;
	    	me = parseFloat(me) ? parseFloat(me) : 0;
	    	oe = parseFloat(oe) ? parseFloat(oe) : 0;
			ebit = upl+ii+oi-me-oe;
			this.getView().byId("__inputEBIT").setValue(ebit);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calEarningsBeforeTaxation: function(){
			// TO VERIFY IF FORMULAR IS CORRECT
			// set Earnings Before Tax
			//Earnings Before Interest and Taxation - Interest = Earnings Before Tax
			var ebit,i,ebt;
			ebit = this.getView().byId("__inputEBIT").getValue();
			i = this.getView().byId("__inputI").getValue();
			ebit = parseFloat(ebit) ? parseFloat(ebit) : 0;
	    	i = parseFloat(i) ? parseFloat(i) : 0;
			ebt = ebit-i;
			this.getView().byId("__inputEBT").setValue(ebt);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calEarningsAfterTaxation: function(){
			// set Earnings After Tax
			//Earnings Before Tax – Taxation = Earnings After Tax
			var ebt,t,eat;
			ebt = this.getView().byId("__inputEBT").getValue();
			t = this.getView().byId("__inputT").getValue();
			ebt = parseFloat(ebt) ? parseFloat(ebt) : 0;
	    	t = parseFloat(t) ? parseFloat(t) : 0;
			eat = ebt-t;
			this.getView().byId("__inputEAT").setValue(eat);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calTotalComprehensiveProfitLossForPeriod: function(){
			// set Total Comprehensive Profit/(Loss) for the Period
			//Earnings After Tax + Other Comprehensive Income = Total Comprehensive Profit/(Loss) for the Period
			var eat,oci,tcplp;
			eat = this.getView().byId("__inputEAT").getValue();
			oci = this.getView().byId("__inputOCI").getValue();
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
			ia = this.getView().byId("__inputIA").getValue();
			pe = this.getView().byId("__inputPE").getValue();
			is = this.getView().byId("__inputIS").getValue();
			inva = this.getView().byId("__inputINVA").getValue();
			aonca = this.getView().byId("__inputAONCA").getValue();
			ia = parseFloat(ia) ? parseFloat(ia) : 0;
	    	pe = parseFloat(pe) ? parseFloat(pe) : 0;
	    	is = parseFloat(is) ? parseFloat(is) : 0;
	    	inva = parseFloat(inva) ? parseFloat(inva) : 0;
	    	aonca = parseFloat(aonca) ? parseFloat(aonca) : 0;
			ta = ia+pe+is+inva+aonca;
			this.getView().byId("__inputTA").setValue(ta);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calExcessOfAssetsOverLiabilities: function(){
			// set Excess of Assets over Liabilities
			//Total Assets – Total Liabilities = Excess of Assets over Liabilities 
			var ta,tl,eoaol;
			ta = this.getView().byId("__inputTA").getValue();
			tl = this.getView().byId("__inputTI").getValue();
			ta = parseFloat(ta) ? parseFloat(ta) : 0;
	    	tl = parseFloat(tl) ? parseFloat(tl) : 0;
			eoaol = ta-tl;
			this.getView().byId("__inputEOAOL").setValue(eoaol);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calNetPremiumIncome: function(){
			// set Net Premium Income
			//Net Premium Income = Gross Premium Written – Reassurance
			var gpws,r,npi;
			gpws = this.getView().byId("__inputGPWS").getValue();
			r = this.getView().byId("__inputR").getValue();
			gpws = parseFloat(gpws) ? parseFloat(gpws) : 0;
	    	r = parseFloat(r) ? parseFloat(r) : 0;
			npi = gpws-r;
			this.getView().byId("__inputNPI").setValue(npi);
			this._cal025NetPremiumIncome();
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_cal025NetPremiumIncome: function(){
			// set 25% of Net Premium 
			//25% of Net Premium = 0.25 * Net Premium Income 
			var npi,npi025;
			npi = this.getView().byId("__inputNPI").getValue();
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
			eoaol = this.getView().byId("__inputEOAOL").getValue();
	    	eoaol = parseFloat(eoaol) ? parseFloat(eoaol) : 0;
			sf = eoaol;
			this.getView().byId("__inputSF").setValue(sf);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calSafetyMargin: function(){
			//TODO VERIFY FORMULA it is inconsistent
			// set Safety Margin
			//Safety Margin  + Shareholder Funds – 25% of Net Premium = Safety Margin 
			var sf,npi025,sm;
			npi025 = this.getView().byId("__inputNPI025").getValue();
			sf = this.getView().byId("__inputSF").getValue();
	    	npi025 = parseFloat(npi025) ? parseFloat(npi025) : 0;
	    	sf = parseFloat(sf) ? parseFloat(sf) : 0;
			sm = sf-npi025;
			this.getView().byId("__inputSM").setValue(sm);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calSolvencyMargin: function(){
			//TODO VERIFY FORMULA it is inconsistent since % is division by 100
			// set % Solvency Margin
			//% Solvency Margin = Excess of Assets Over Liabilities / Net Premium Income
			var eoaol,npi,psm;
			eoaol = this.getView().byId("__inputEOAOL").getValue();
			npi = this.getView().byId("__inputNPI").getValue();
	    	eoaol = parseFloat(eoaol) ? parseFloat(eoaol) : 0;
	    	npi = parseFloat(npi) ? parseFloat(npi) : 0;
			psm = (eoaol/npi);
			this.getView().byId("__inputPSM").setValue(psm);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		
		// -------Breakdown by Class of Business (Individual Life) CODE BELOW-------------
		
		_calBrokersTotalPolicies: function(){
			// set Brokers Total Policies(Individual Life)
			//Brokers-> Number of Policies for new Business + Number of policies for recurring premium = Sub Total
			var npnb,nprp,st;
			npnb = this.getView().byId("__inputNPNB").getValue();
			nprp = this.getView().byId("__inputNPRP").getValue();
	    	npnb = parseFloat(npnb) ? parseFloat(npnb) : 0;
	    	nprp = parseFloat(nprp) ? parseFloat(nprp) : 0;
			st = npnb+nprp;
			this.getView().byId("__inputSTP").setValue(st);
			this._calTotalsIndividual();
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calBrokersTotalGrossPremium: function(){
			// set Brokers Total Gross Premium (Individual Life)
			//Brokers -> Gross Premium for new business + Gross Premium for recurring premium = Sub Total
			var gpnb,gprp,st;
			gpnb = this.getView().byId("__inputGPNB").getValue();
			gprp = this.getView().byId("__inputGPRP").getValue();
	    	gpnb = parseFloat(gpnb) ? parseFloat(gpnb) : 0;
	    	gprp = parseFloat(gprp) ? parseFloat(gprp) : 0;
			st = gpnb+gprp;
			this.getView().byId("__inputSTGP").setValue(st);
			this._calTotalsIndividual();
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calAgentsTotalPolicies: function(){
			// set Agents Total Policies(Individual Life)
			//Agents = Number of Policies for new Business + Number of policies for recurring premium = Sub Total
			var npnba,nprpa,sta;
			npnba = this.getView().byId("__inputNPNBA").getValue();
			nprpa = this.getView().byId("__inputNPRPA").getValue();
	    	npnba = parseFloat(npnba) ? parseFloat(npnba) : 0;
	    	nprpa = parseFloat(nprpa) ? parseFloat(nprpa) : 0;
			sta = npnba+nprpa;
			this.getView().byId("__inputSTPA").setValue(sta);
			this._calTotalsIndividual();
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calAgentsTotalGrossPremium: function(){
			// set Agents Total Gross Premium (Individual Life)
			//Agents -> Gross Premium for new business + Gross Premium for recurring premium = Sub Total
			var gpnb,gprp,st;
			gpnb = this.getView().byId("__inputGPNBA").getValue();
			gprp = this.getView().byId("__inputGPRPA").getValue();
	    	gpnb = parseFloat(gpnb) ? parseFloat(gpnb) : 0;
	    	gprp = parseFloat(gprp) ? parseFloat(gprp) : 0;
			st = gpnb+gprp;
			this.getView().byId("__inputSTGPA").setValue(st);
			this._calTotalsIndividual();
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calDirectClientsTotalPolicies: function(){
			// set Direct Clients Total Policies(Individual Life)
			//Direct Clients = Number of Policies for new Business + Number of policies for recurring premium = Sub Total
			var npnba,nprpa,sta;
			npnba = this.getView().byId("__inputNPNBDC").getValue();
			nprpa = this.getView().byId("__inputNPRPDC").getValue();
	    	npnba = parseFloat(npnba) ? parseFloat(npnba) : 0;
	    	nprpa = parseFloat(nprpa) ? parseFloat(nprpa) : 0;
			sta = npnba+nprpa;
			this.getView().byId("__inputSTPDC").setValue(sta);
			this._calTotalsIndividual();
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calDirectClientsTotalGrossPremium: function(){
			// set Direct Clients Total Gross Premium (Individual Life)
			//Direct Clients -> Gross Premium for new business + Gross Premium for recurring premium = Sub Total
			var gpnb,gprp,st;
			gpnb = this.getView().byId("__inputGPNBDC").getValue();
			gprp = this.getView().byId("__inputGPRPDC").getValue();
	    	gpnb = parseFloat(gpnb) ? parseFloat(gpnb) : 0;
	    	gprp = parseFloat(gprp) ? parseFloat(gprp) : 0;
			st = gpnb+gprp;
			this.getView().byId("__inputSTGPDC").setValue(st);
			this._calTotalsIndividual();
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calNewBusinessTotalPolicies: function(){
			// set New Business Total Policies(Individual Life)
			//Brokers Number of Policies for new Business + Agents Number of Policies for new Business + Direct Clients Number of Policies for new Business = Sub Total
			var npnbb,npnba,npndc,st;
			npnbb = this.getView().byId("__inputNPNB").getValue();
			npnba = this.getView().byId("__inputNPNBA").getValue();
			npndc = this.getView().byId("__inputNPNBDC").getValue();
	    	npnbb = parseFloat(npnbb) ? parseFloat(npnbb) : 0;
	    	npnba = parseFloat(npnba) ? parseFloat(npnba) : 0;
	    	npndc = parseFloat(npndc) ? parseFloat(npndc) : 0;
			st = npnbb+npnba+npndc;
			this.getView().byId("__inputSTPNB").setValue(st);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calNewBusinessTotalGrossPremium: function(){
			// set New Business Total Gross Premium(Individual Life)
			//Brokers Number of Gross Premium for new Business + Agents Number of Gross Premium for new Business + Direct Clients Number of Gross Premium for new Business = Sub Total
			var gpnbb,gpnba,gpndc,st;
			gpnbb = this.getView().byId("__inputGPNB").getValue();
			gpnba = this.getView().byId("__inputGPNBA").getValue();
			gpndc = this.getView().byId("__inputGPNBDC").getValue();
	    	gpnbb = parseFloat(gpnbb) ? parseFloat(gpnbb) : 0;
	    	gpnba = parseFloat(gpnba) ? parseFloat(gpnba) : 0;
	    	gpndc = parseFloat(gpndc) ? parseFloat(gpndc) : 0;
			st = gpnbb+gpnba+gpndc;
			this.getView().byId("__inputSTGPNB").setValue(st);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calRecurringPremiumsTotalPolicies: function(){
			// set Recurring Premiums Total Policies(Individual Life)
			//Brokers Number of Policies for Recurring Premiums + Agents Number of Policies for Recurring Premiums + Direct Clients Number of Policies for Recurring Premiums = Sub Total
			var npnbb,npnba,npndc,st;
			npnbb = this.getView().byId("__inputNPRP").getValue();
			npnba = this.getView().byId("__inputNPRPA").getValue();
			npndc = this.getView().byId("__inputNPRPDC").getValue();
	    	npnbb = parseFloat(npnbb) ? parseFloat(npnbb) : 0;
	    	npnba = parseFloat(npnba) ? parseFloat(npnba) : 0;
	    	npndc = parseFloat(npndc) ? parseFloat(npndc) : 0;
			st = npnbb+npnba+npndc;
			this.getView().byId("__inputSTPRP").setValue(st);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calRecurringPremiumsTotalGrossPremium: function(){
			// set Recurring Premiums Total Gross Premium(Individual Life)
			//Brokers Number of Gross Premium for Recurring Premiums + Agents Number of Gross Premium for Recurring Premiums + Direct Clients Number of Gross Premium for Recurring Premiums = Sub Total
			var gpnbb,gpnba,gpndc,st;
			gpnbb = this.getView().byId("__inputGPRP").getValue();
			gpnba = this.getView().byId("__inputGPRPA").getValue();
			gpndc = this.getView().byId("__inputGPRPDC").getValue();
	    	gpnbb = parseFloat(gpnbb) ? parseFloat(gpnbb) : 0;
	    	gpnba = parseFloat(gpnba) ? parseFloat(gpnba) : 0;
	    	gpndc = parseFloat(gpndc) ? parseFloat(gpndc) : 0;
			st = gpnbb+gpnba+gpndc;
			this.getView().byId("__inputSTGPRP").setValue(st);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calGrossTotalPoliciesIndividual: function(){
			// set Gross Total Policies(Individual Life)
			//Total Policies for New Business + Total Policies for Recurring Premiums = Gross Total Policies
			var npnbb,npnba,st;
			npnbb = this.getView().byId("__inputSTPNB").getValue();
			npnba = this.getView().byId("__inputSTPRP").getValue();
	    	npnbb = parseFloat(npnbb) ? parseFloat(npnbb) : 0;
	    	npnba = parseFloat(npnba) ? parseFloat(npnba) : 0;
			st = npnbb+npnba;
			this.getView().byId("__inputGTP").setValue(st);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calGrossTotalGrossPremiumIndividual: function(){
			// set Gross Total Gross Premium(Individual Life)
			//Total Gross Premium for New Business + Total Gross Premium for Recurring Premiums = Gross Total Gross Premium
			var gpnbb,gpnba,st;
			gpnbb = this.getView().byId("__inputSTGPNB").getValue();
			gpnba = this.getView().byId("__inputSTGPRP").getValue();
	    	gpnbb = parseFloat(gpnbb) ? parseFloat(gpnbb) : 0;
	    	gpnba = parseFloat(gpnba) ? parseFloat(gpnba) : 0;
			st = gpnbb+gpnba;
			this.getView().byId("__inputGTGP").setValue(st);
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
			npnb = this.getView().byId("__inputNPNBE").getValue();
			nprp = this.getView().byId("__inputNPRPE").getValue();
	    	npnb = parseFloat(npnb) ? parseFloat(npnb) : 0;
	    	nprp = parseFloat(nprp) ? parseFloat(nprp) : 0;
			st = npnb+nprp;
			this.getView().byId("__inputSTPE").setValue(st);
			this._calTotalsEmployee();
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calBrokersTotalGrossPremiumEmployee: function(){
			// set Brokers Total Gross Premium (Individual Life)
			//Brokers -> Gross Premium for new business + Gross Premium for recurring premium = Sub Total
			var gpnb,gprp,st;
			gpnb = this.getView().byId("__inputGPNBE").getValue();
			gprp = this.getView().byId("__inputGPRPE").getValue();
	    	gpnb = parseFloat(gpnb) ? parseFloat(gpnb) : 0;
	    	gprp = parseFloat(gprp) ? parseFloat(gprp) : 0;
			st = gpnb+gprp;
			this.getView().byId("__inputSTGPE").setValue(st);
			this._calTotalsEmployee();
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calAgentsTotalPoliciesEmployee: function(){
			// set Agents Total Policies(Individual Life)
			//Agents = Number of Policies for new Business + Number of policies for recurring premium = Sub Total
			var npnba,nprpa,sta;
			npnba = this.getView().byId("__inputNPNBAE").getValue();
			nprpa = this.getView().byId("__inputNPRPAE").getValue();
	    	npnba = parseFloat(npnba) ? parseFloat(npnba) : 0;
	    	nprpa = parseFloat(nprpa) ? parseFloat(nprpa) : 0;
			sta = npnba+nprpa;
			this.getView().byId("__inputSTPAE").setValue(sta);
			this._calTotalsEmployee();
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calAgentsTotalGrossPremiumEmployee: function(){
			// set Agents Total Gross Premium (Individual Life)
			//Agents -> Gross Premium for new business + Gross Premium for recurring premium = Sub Total
			var gpnb,gprp,st;
			gpnb = this.getView().byId("__inputGPNBAE").getValue();
			gprp = this.getView().byId("__inputGPRPAE").getValue();
	    	gpnb = parseFloat(gpnb) ? parseFloat(gpnb) : 0;
	    	gprp = parseFloat(gprp) ? parseFloat(gprp) : 0;
			st = gpnb+gprp;
			this.getView().byId("__inputSTGPAE").setValue(st);
			this._calTotalsEmployee();
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calDirectClientsTotalPoliciesEmployee: function(){
			// set Direct Clients Total Policies(Individual Life)
			//Direct Clients = Number of Policies for new Business + Number of policies for recurring premium = Sub Total
			var npnba,nprpa,sta;
			npnba = this.getView().byId("__inputNPNBDCE").getValue();
			nprpa = this.getView().byId("__inputNPRPDCE").getValue();
	    	npnba = parseFloat(npnba) ? parseFloat(npnba) : 0;
	    	nprpa = parseFloat(nprpa) ? parseFloat(nprpa) : 0;
			sta = npnba+nprpa;
			this.getView().byId("__inputSTPDCE").setValue(sta);
			this._calTotalsEmployee();
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calDirectClientsTotalGrossPremiumEmployee: function(){
			// set Direct Clients Total Gross Premium (Individual Life)
			//Direct Clients -> Gross Premium for new business + Gross Premium for recurring premium = Sub Total
			var gpnb,gprp,st;
			gpnb = this.getView().byId("__inputGPNBDCE").getValue();
			gprp = this.getView().byId("__inputGPRPDCE").getValue();
	    	gpnb = parseFloat(gpnb) ? parseFloat(gpnb) : 0;
	    	gprp = parseFloat(gprp) ? parseFloat(gprp) : 0;
			st = gpnb+gprp;
			this.getView().byId("__inputSTGPDCE").setValue(st);
			this._calTotalsEmployee();
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calNewBusinessTotalPoliciesEmployee: function(){
			// set New Business Total Policies(Individual Life)
			//Brokers Number of Policies for new Business + Agents Number of Policies for new Business + Direct Clients Number of Policies for new Business = Sub Total
			var npnbb,npnba,npndc,st;
			npnbb = this.getView().byId("__inputNPNBE").getValue();
			npnba = this.getView().byId("__inputNPNBAE").getValue();
			npndc = this.getView().byId("__inputNPNBDCE").getValue();
	    	npnbb = parseFloat(npnbb) ? parseFloat(npnbb) : 0;
	    	npnba = parseFloat(npnba) ? parseFloat(npnba) : 0;
	    	npndc = parseFloat(npndc) ? parseFloat(npndc) : 0;
			st = npnbb+npnba+npndc;
			this.getView().byId("__inputSTPNBE").setValue(st);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calNewBusinessTotalGrossPremiumEmployee: function(){
			// set New Business Total Gross Premium(Individual Life)
			//Brokers Number of Gross Premium for new Business + Agents Number of Gross Premium for new Business + Direct Clients Number of Gross Premium for new Business = Sub Total
			var gpnbb,gpnba,gpndc,st;
			gpnbb = this.getView().byId("__inputGPNBE").getValue();
			gpnba = this.getView().byId("__inputGPNBAE").getValue();
			gpndc = this.getView().byId("__inputGPNBDCE").getValue();
	    	gpnbb = parseFloat(gpnbb) ? parseFloat(gpnbb) : 0;
	    	gpnba = parseFloat(gpnba) ? parseFloat(gpnba) : 0;
	    	gpndc = parseFloat(gpndc) ? parseFloat(gpndc) : 0;
			st = gpnbb+gpnba+gpndc;
			this.getView().byId("__inputSTGPNBE").setValue(st);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calRecurringPremiumsTotalPoliciesEmployee: function(){
			// set Recurring Premiums Total Policies(Individual Life)
			//Brokers Number of Policies for Recurring Premiums + Agents Number of Policies for Recurring Premiums + Direct Clients Number of Policies for Recurring Premiums = Sub Total
			var npnbb,npnba,npndc,st;
			npnbb = this.getView().byId("__inputNPRPE").getValue();
			npnba = this.getView().byId("__inputNPRPAE").getValue();
			npndc = this.getView().byId("__inputNPRPDCE").getValue();
	    	npnbb = parseFloat(npnbb) ? parseFloat(npnbb) : 0;
	    	npnba = parseFloat(npnba) ? parseFloat(npnba) : 0;
	    	npndc = parseFloat(npndc) ? parseFloat(npndc) : 0;
			st = npnbb+npnba+npndc;
			this.getView().byId("__inputSTPRPE").setValue(st);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calRecurringPremiumsTotalGrossPremiumEmployee: function(){
			// set Recurring Premiums Total Gross Premium(Individual Life)
			//Brokers Number of Gross Premium for Recurring Premiums + Agents Number of Gross Premium for Recurring Premiums + Direct Clients Number of Gross Premium for Recurring Premiums = Sub Total
			var gpnbb,gpnba,gpndc,st;
			gpnbb = this.getView().byId("__inputGPRPE").getValue();
			gpnba = this.getView().byId("__inputGPRPAE").getValue();
			gpndc = this.getView().byId("__inputGPRPDCE").getValue();
	    	gpnbb = parseFloat(gpnbb) ? parseFloat(gpnbb) : 0;
	    	gpnba = parseFloat(gpnba) ? parseFloat(gpnba) : 0;
	    	gpndc = parseFloat(gpndc) ? parseFloat(gpndc) : 0;
			st = gpnbb+gpnba+gpndc;
			this.getView().byId("__inputSTGPRPE").setValue(st);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calGrossTotalPoliciesEmployee: function(){
			// set Gross Total Policies(Individual Life)
			//Total Policies for New Business + Total Policies for Recurring Premiums = Gross Total Policies
			var npnbb,npnba,st;
			npnbb = this.getView().byId("__inputSTPNBE").getValue();
			npnba = this.getView().byId("__inputSTPRPE").getValue();
	    	npnbb = parseFloat(npnbb) ? parseFloat(npnbb) : 0;
	    	npnba = parseFloat(npnba) ? parseFloat(npnba) : 0;
			st = npnbb+npnba;
			this.getView().byId("__inputGTPE").setValue(st);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calGrossTotalGrossPremiumEmployee: function(){
			// set Gross Total Gross Premium(Individual Life)
			//Total Gross Premium for New Business + Total Gross Premium for Recurring Premiums = Gross Total Gross Premium
			var gpnbb,gpnba,st;
			gpnbb = this.getView().byId("__inputSTGPNBE").getValue();
			gpnba = this.getView().byId("__inputSTGPRPE").getValue();
	    	gpnbb = parseFloat(gpnbb) ? parseFloat(gpnbb) : 0;
	    	gpnba = parseFloat(gpnba) ? parseFloat(gpnba) : 0;
			st = gpnbb+gpnba;
			this.getView().byId("__inputGTGPE").setValue(st);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calTotalGrossPremiumWrittenEmployee: function(){
			// Brokers Policies
			// __inputSTP + __inputSTPE = __inputTGPWPBE
			
			var stp,stpe,TGPWPBE;
			stp = this.getView().byId("__inputSTP").getValue();
			stpe = this.getView().byId("__inputSTPE").getValue();
	    	stp = parseFloat(stp) ? parseFloat(stp) : 0;
	    	stpe = parseFloat(stpe) ? parseFloat(stpe) : 0;
			TGPWPBE = stp+stpe;
			this.getView().byId("__inputTGPWPBE").setValue(TGPWPBE);
			
			// Brokers GrossPremium
			// __inputSTGP + __inputSTGPE = __inputTGPWGPBE
			
			var STGP,STGPE,TGPWGPBE;
			STGP = this.getView().byId("__inputSTGP").getValue();
			STGPE = this.getView().byId("__inputSTGPE").getValue();
	    	STGP = parseFloat(STGP) ? parseFloat(STGP) : 0;
	    	STGPE = parseFloat(STGPE) ? parseFloat(STGPE) : 0;
			TGPWGPBE = STGP+STGPE;
			this.getView().byId("__inputTGPWGPBE").setValue(TGPWGPBE);
			
			// Agents Policies
			// __inputSTPA + __inputSTPAE = __inputTGPWPAE
			
			var STPA,STPAE,TGPWPAE;
			STPA = this.getView().byId("__inputSTPA").getValue();
			STPAE = this.getView().byId("__inputSTPAE").getValue();
	    	STPA = parseFloat(STPA) ? parseFloat(STPA) : 0;
	    	STPAE = parseFloat(STPAE) ? parseFloat(STPAE) : 0;
			TGPWPAE = STPA+STPAE;
			this.getView().byId("__inputTGPWPAE").setValue(TGPWPAE);
			
			// Agents GrossPremium
			// __inputSTGPA + __inputSTGPAE = __inputTGPWGPAE
			
			var STGPA,STGPAE,TGPWGPAE;
			STGPA = this.getView().byId("__inputSTGPA").getValue();
			STGPAE = this.getView().byId("__inputSTGPAE").getValue();
	    	STGPA = parseFloat(STGPA) ? parseFloat(STGPA) : 0;
	    	STGPAE = parseFloat(STGPAE) ? parseFloat(STGPAE) : 0;
			TGPWGPAE = STGPA+STGPAE;
			this.getView().byId("__inputTGPWGPAE").setValue(TGPWGPAE);
			
			// Direct Clients Policies
			// __inputSTPDC + __inputSTPDCE = __inputTGPWPDCE
			
			var STPDC,STPDCE,TGPWPDCE;
			STPDC = this.getView().byId("__inputSTPDC").getValue();
			STPDCE = this.getView().byId("__inputSTPDCE").getValue();
	    	STPDC = parseFloat(STPDC) ? parseFloat(STPDC) : 0;
	    	STPDCE = parseFloat(STPDCE) ? parseFloat(STPDCE) : 0;
			TGPWPDCE = STPDC+STPDCE;
			this.getView().byId("__inputTGPWPDCE").setValue(TGPWPDCE);
			
			// Direct Clients GrossPremium
			// __inputSTGPDC + __inputSTGPDCE = __inputTGPWGPDCE
			
			var STGPDC,STGPDCE,TGPWGPDCE;
			STGPDC = this.getView().byId("__inputSTGPDC").getValue();
			STGPDCE = this.getView().byId("__inputSTGPDCE").getValue();
	    	STGPDC = parseFloat(STGPDC) ? parseFloat(STGPDC) : 0;
	    	STGPDCE = parseFloat(STGPDCE) ? parseFloat(STGPDCE) : 0;
			TGPWGPDCE = STGPDC+STGPDCE;
			this.getView().byId("__inputTGPWGPDCE").setValue(TGPWGPDCE);
			
			// Total Policies
			// __inputGTP + __inputGTPE = __inputTGPWPTE
			
			var GTP,GTPE,TGPWPTE;
			GTP = this.getView().byId("__inputGTP").getValue();
			GTPE = this.getView().byId("__inputGTPE").getValue();
	    	GTP = parseFloat(GTP) ? parseFloat(GTP) : 0;
	    	GTPE = parseFloat(GTPE) ? parseFloat(GTPE) : 0;
			TGPWPTE = GTP+GTPE;
			this.getView().byId("__inputTGPWPTE").setValue(TGPWPTE);
			
			// Total GrossPremium
			// __inputGTGP + __inputGTGPE = __inputTGPWGPTE
			
			var GTGP,GTGPE,TGPWGPTE;
			GTGP = this.getView().byId("__inputGTGP").getValue();
			GTGPE = this.getView().byId("__inputGTGPE").getValue();
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
			npnb = this.getView().byId("__inputNPNBN").getValue();
			nprp = this.getView().byId("__inputNPRPN").getValue();
	    	npnb = parseFloat(npnb) ? parseFloat(npnb) : 0;
	    	nprp = parseFloat(nprp) ? parseFloat(nprp) : 0;
			st = npnb+nprp;
			this.getView().byId("__inputSTPN").setValue(st);
			this._calTotalsNot();
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calBrokersTotalGrossPremiumNot: function(){
			// set Brokers Total Gross Premium (Individual Life)
			//Brokers -> Gross Premium for new business + Gross Premium for recurring premium = Sub Total
			var gpnb,gprp,st;
			gpnb = this.getView().byId("__inputGPNBN").getValue();
			gprp = this.getView().byId("__inputGPRPN").getValue();
	    	gpnb = parseFloat(gpnb) ? parseFloat(gpnb) : 0;
	    	gprp = parseFloat(gprp) ? parseFloat(gprp) : 0;
			st = gpnb+gprp;
			this.getView().byId("__inputSTGPN").setValue(st);
			this._calTotalsNot();
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calAgentsTotalPoliciesNot: function(){
			// set Agents Total Policies(Individual Life)
			//Agents = Number of Policies for new Business + Number of policies for recurring premium = Sub Total
			var npnba,nprpa,sta;
			npnba = this.getView().byId("__inputNPNBAN").getValue();
			nprpa = this.getView().byId("__inputNPRPAN").getValue();
	    	npnba = parseFloat(npnba) ? parseFloat(npnba) : 0;
	    	nprpa = parseFloat(nprpa) ? parseFloat(nprpa) : 0;
			sta = npnba+nprpa;
			this.getView().byId("__inputSTPAN").setValue(sta);
			this._calTotalsNot();
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calAgentsTotalGrossPremiumNot: function(){
			// set Agents Total Gross Premium (Individual Life)
			//Agents -> Gross Premium for new business + Gross Premium for recurring premium = Sub Total
			var gpnb,gprp,st;
			gpnb = this.getView().byId("__inputGPNBAN").getValue();
			gprp = this.getView().byId("__inputGPRPAN").getValue();
	    	gpnb = parseFloat(gpnb) ? parseFloat(gpnb) : 0;
	    	gprp = parseFloat(gprp) ? parseFloat(gprp) : 0;
			st = gpnb+gprp;
			this.getView().byId("__inputSTGPAN2").setValue(st);
			this._calTotalsNot();
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calDirectClientsTotalPoliciesNot: function(){
			// set Direct Clients Total Policies(Individual Life)
			//Direct Clients = Number of Policies for new Business + Number of policies for recurring premium = Sub Total
			var npnba,nprpa,sta;
			npnba = this.getView().byId("__inputNPNBDCN").getValue();
			nprpa = this.getView().byId("__inputNPRPDCN").getValue();
	    	npnba = parseFloat(npnba) ? parseFloat(npnba) : 0;
	    	nprpa = parseFloat(nprpa) ? parseFloat(nprpa) : 0;
			sta = npnba+nprpa;
			this.getView().byId("__inputSTPDCN").setValue(sta);
			this._calTotalsNot();
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calDirectClientsTotalGrossPremiumNot: function(){
			// set Direct Clients Total Gross Premium (Individual Life)
			//Direct Clients -> Gross Premium for new business + Gross Premium for recurring premium = Sub Total
			var gpnb,gprp,st;
			gpnb = this.getView().byId("__inputGPNBDCN").getValue();
			gprp = this.getView().byId("__inputGPRPDCN").getValue();
	    	gpnb = parseFloat(gpnb) ? parseFloat(gpnb) : 0;
	    	gprp = parseFloat(gprp) ? parseFloat(gprp) : 0;
			st = gpnb+gprp;
			this.getView().byId("__inputSTGPDCN").setValue(st);
			this._calTotalsNot();
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calNewBusinessTotalPoliciesNot: function(){
			// set New Business Total Policies(Individual Life)
			//Brokers Number of Policies for new Business + Agents Number of Policies for new Business + Direct Clients Number of Policies for new Business = Sub Total
			var npnbb,npnba,npndc,st;
			npnbb = this.getView().byId("__inputNPNBN").getValue();
			npnba = this.getView().byId("__inputNPNBAN").getValue();
			npndc = this.getView().byId("__inputNPNBDCN").getValue();
	    	npnbb = parseFloat(npnbb) ? parseFloat(npnbb) : 0;
	    	npnba = parseFloat(npnba) ? parseFloat(npnba) : 0;
	    	npndc = parseFloat(npndc) ? parseFloat(npndc) : 0;
			st = npnbb+npnba+npndc;
			this.getView().byId("__inputSTPNBN").setValue(st);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calNewBusinessTotalGrossPremiumNot: function(){
			// set New Business Total Gross Premium(Individual Life)
			//Brokers Number of Gross Premium for new Business + Agents Number of Gross Premium for new Business + Direct Clients Number of Gross Premium for new Business = Sub Total
			var gpnbb,gpnba,gpndc,st;
			gpnbb = this.getView().byId("__inputGPNBN").getValue();
			gpnba = this.getView().byId("__inputGPNBAN").getValue();
			gpndc = this.getView().byId("__inputGPNBDCN").getValue();
	    	gpnbb = parseFloat(gpnbb) ? parseFloat(gpnbb) : 0;
	    	gpnba = parseFloat(gpnba) ? parseFloat(gpnba) : 0;
	    	gpndc = parseFloat(gpndc) ? parseFloat(gpndc) : 0;
			st = gpnbb+gpnba+gpndc;
			this.getView().byId("__inputSTGPNBN").setValue(st);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calRecurringPremiumsTotalPoliciesNot: function(){
			// set Recurring Premiums Total Policies(Individual Life)
			//Brokers Number of Policies for Recurring Premiums + Agents Number of Policies for Recurring Premiums + Direct Clients Number of Policies for Recurring Premiums = Sub Total
			var npnbb,npnba,npndc,st;
			npnbb = this.getView().byId("__inputNPRPN").getValue();
			npnba = this.getView().byId("__inputNPRPAN").getValue();
			npndc = this.getView().byId("__inputNPRPDCN").getValue();
	    	npnbb = parseFloat(npnbb) ? parseFloat(npnbb) : 0;
	    	npnba = parseFloat(npnba) ? parseFloat(npnba) : 0;
	    	npndc = parseFloat(npndc) ? parseFloat(npndc) : 0;
			st = npnbb+npnba+npndc;
			this.getView().byId("__inputSTPRPN").setValue(st);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calRecurringPremiumsTotalGrossPremiumNot: function(){
			// set Recurring Premiums Total Gross Premium(Individual Life)
			//Brokers Number of Gross Premium for Recurring Premiums + Agents Number of Gross Premium for Recurring Premiums + Direct Clients Number of Gross Premium for Recurring Premiums = Sub Total
			var gpnbb,gpnba,gpndc,st;
			gpnbb = this.getView().byId("__inputGPRPN").getValue();
			gpnba = this.getView().byId("__inputGPRPAN").getValue();
			gpndc = this.getView().byId("__inputGPRPDCN").getValue();
	    	gpnbb = parseFloat(gpnbb) ? parseFloat(gpnbb) : 0;
	    	gpnba = parseFloat(gpnba) ? parseFloat(gpnba) : 0;
	    	gpndc = parseFloat(gpndc) ? parseFloat(gpndc) : 0;
			st = gpnbb+gpnba+gpndc;
			this.getView().byId("__inputSTGPRPN").setValue(st);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calGrossTotalPoliciesNot: function(){
			// set Gross Total Policies(Individual Life)
			//Total Policies for New Business + Total Policies for Recurring Premiums = Gross Total Policies
			var npnbb,npnba,st;
			npnbb = this.getView().byId("__inputSTPNBN").getValue();
			npnba = this.getView().byId("__inputSTPRPN").getValue();
	    	npnbb = parseFloat(npnbb) ? parseFloat(npnbb) : 0;
	    	npnba = parseFloat(npnba) ? parseFloat(npnba) : 0;
			st = npnbb+npnba;
			this.getView().byId("__inputGTPN").setValue(st);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calGrossTotalGrossPremiumNot: function(){
			// set Gross Total Gross Premium(Individual Life)
			//Total Gross Premium for New Business + Total Gross Premium for Recurring Premiums = Gross Total Gross Premium
			var gpnbb,gpnba,st;
			gpnbb = this.getView().byId("__inputSTGPNBN").getValue();
			gpnba = this.getView().byId("__inputSTGPRPN").getValue();
	    	gpnbb = parseFloat(gpnbb) ? parseFloat(gpnbb) : 0;
	    	gpnba = parseFloat(gpnba) ? parseFloat(gpnba) : 0;
			st = gpnbb+gpnba;
			this.getView().byId("__inputGTGPN").setValue(st);
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
			NPBTI = this.getView().byId("__inputNPBTI").getValue();
			NPBEN = this.getView().byId("__inputNPBEN").getValue();
			NPBPE = this.getView().byId("__inputNPBPE").getValue();
			NPBWL = this.getView().byId("__inputNPBWL").getValue();
			NPBF = this.getView().byId("__inputNPBF").getValue();
			NPBO = this.getView().byId("__inputNPBO").getValue();
	    	NPBA = parseFloat(NPBA) ? parseFloat(NPBA) : 0;
	    	NPBTI = parseFloat(NPBTI) ? parseFloat(NPBTI) : 0;
	    	NPBEN = parseFloat(NPBEN) ? parseFloat(NPBEN) : 0;
	    	NPBPE = parseFloat(NPBPE) ? parseFloat(NPBPE) : 0;
	    	NPBWL = parseFloat(NPBWL) ? parseFloat(NPBWL) : 0;
	    	NPBF = parseFloat(NPBF) ? parseFloat(NPBF) : 0;
	    	NPBO = parseFloat(NPBO) ? parseFloat(NPBO) : 0;
			sta = NPBA+NPBTI+NPBEN+NPBPE+NPBWL+NPBF+NPBO;
			this.getView().byId("__inputNPBTOTAL").setValue(sta);
			this._calTotalsInsuranceType();
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calBrokersTotalGrossPremiumInsuranceType: function(){
			// set Brokers Total Gross Premium (Individual Life)
			//Brokers -> Gross Premium for new business + Gross Premium for recurring premium = Sub Total
			var GPBA,GPBTI,GPBEN,GPBPE,GPBWL,GPBF,GPBO,sta;
			GPBA = this.getView().byId("__inputGPBAN").getValue();
			GPBTI = this.getView().byId("__inputGPBTI").getValue();
			GPBEN = this.getView().byId("__inputGPBEN").getValue();
			GPBPE = this.getView().byId("__inputGPBPE").getValue();
			GPBWL = this.getView().byId("__inputGPBWL").getValue();
			GPBF = this.getView().byId("__inputGPBF").getValue();
			GPBO = this.getView().byId("__inputGPBO").getValue();
	    	GPBA = parseFloat(GPBA) ? parseFloat(GPBA) : 0;
	    	GPBTI = parseFloat(GPBTI) ? parseFloat(GPBTI) : 0;
	    	GPBEN = parseFloat(GPBEN) ? parseFloat(GPBEN) : 0;
	    	GPBPE = parseFloat(GPBPE) ? parseFloat(GPBPE) : 0;
	    	GPBWL = parseFloat(GPBWL) ? parseFloat(GPBWL) : 0;
	    	GPBF = parseFloat(GPBF) ? parseFloat(GPBF) : 0;
	    	GPBO = parseFloat(GPBO) ? parseFloat(GPBO) : 0;
			sta = GPBA+GPBTI+GPBEN+GPBPE+GPBWL+GPBF+GPBO;
			this.getView().byId("__inputGPBTOTAL").setValue(sta);
			this._calTotalsInsuranceType();
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calAgentsTotalPoliciesInsuranceType: function(){
			// set Agents Total Policies(Individual Life)
			//Agents = Number of Policies for new Business + Number of policies for recurring premium = Sub Total
			var NPAA,NPATI,NPAEN,NPAPE,NPAWL,NPAF,NPAO,sta;
			NPAA = this.getView().byId("__inputNPAAN").getValue();
			NPATI = this.getView().byId("__inputNPATI").getValue();
			NPAEN = this.getView().byId("__inputNPAEN").getValue();
			NPAPE = this.getView().byId("__inputNPAPE").getValue();
			NPAWL = this.getView().byId("__inputNPAWL").getValue();
			NPAF = this.getView().byId("__inputNPAF").getValue();
			NPAO = this.getView().byId("__inputNPAO").getValue();
	    	NPAA = parseFloat(NPAA) ? parseFloat(NPAA) : 0;
	    	NPATI = parseFloat(NPATI) ? parseFloat(NPATI) : 0;
	    	NPAEN = parseFloat(NPAEN) ? parseFloat(NPAEN) : 0;
	    	NPAPE = parseFloat(NPAPE) ? parseFloat(NPAPE) : 0;
	    	NPAWL = parseFloat(NPAWL) ? parseFloat(NPAWL) : 0;
	    	NPAF = parseFloat(NPAF) ? parseFloat(NPAF) : 0;
	    	NPAO = parseFloat(NPAO) ? parseFloat(NPAO) : 0;
			sta = NPAA+NPATI+NPAEN+NPAPE+NPAWL+NPAF+NPAO;
			this.getView().byId("__inputNPATOTAL").setValue(sta);
			this._calTotalsInsuranceType();
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calAgentsTotalGrossPremiumInsuranceType: function(){
			// set Agents Total Gross Premium (Individual Life)
			//Agents -> Gross Premium for new business + Gross Premium for recurring premium = Sub Total
			var GPAA,GPATI,GPAEN,GPAPE,GPAWL,GPAF,GPAO,sta;
			GPAA = this.getView().byId("__inputGPAAN").getValue();
			GPATI = this.getView().byId("__inputGPATI").getValue();
			GPAEN = this.getView().byId("__inputGPAEN").getValue();
			GPAPE = this.getView().byId("__inputGPAPE").getValue();
			GPAWL = this.getView().byId("__inputGPAWL").getValue();
			GPAF = this.getView().byId("__inputGPAF").getValue();
			GPAO = this.getView().byId("__inputGPAO").getValue();
	    	GPAA = parseFloat(GPAA) ? parseFloat(GPAA) : 0;
	    	GPATI = parseFloat(GPATI) ? parseFloat(GPATI) : 0;
	    	GPAEN = parseFloat(GPAEN) ? parseFloat(GPAEN) : 0;
	    	GPAPE = parseFloat(GPAPE) ? parseFloat(GPAPE) : 0;
	    	GPAWL = parseFloat(GPAWL) ? parseFloat(GPAWL) : 0;
	    	GPAF = parseFloat(GPAF) ? parseFloat(GPAF) : 0;
	    	GPAO = parseFloat(GPAO) ? parseFloat(GPAO) : 0;
			sta = GPAA+GPATI+GPAEN+GPAPE+GPAWL+GPAF+GPAO;
			this.getView().byId("__inputGPATOTAL").setValue(sta);
			this._calTotalsInsuranceType();
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calDirectClientsTotalPoliciesInsuranceType: function(){
			// set Direct Clients Total Policies(Individual Life)
			//Direct Clients = Number of Policies for new Business + Number of policies for recurring premium = Sub Total
			var NPDCA,NPDCTI,NPDCEN,NPDCPE,NPDCWL,NPDCF,NPDCO,sta;
			NPDCA = this.getView().byId("__inputNPDCAN").getValue();
			NPDCTI = this.getView().byId("__inputNPDCTI").getValue();
			NPDCEN = this.getView().byId("__inputNPDCEN").getValue();
			NPDCPE = this.getView().byId("__inputNPDCPE").getValue();
			NPDCWL = this.getView().byId("__inputNPDCWL").getValue();
			NPDCF = this.getView().byId("__inputNPDCF").getValue();
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
			GPDCA = this.getView().byId("__inputGPDCAN").getValue();
			GPDCTI = this.getView().byId("__inputGPDCTI").getValue();
			GPDCEN = this.getView().byId("__inputGPDCEN").getValue();
			GPDCPE = this.getView().byId("__inputGPDCPE").getValue();
			GPDCWL = this.getView().byId("__inputGPDCWL").getValue();
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
			this.getView().byId("__inputGPDCTOTAL").setValue(sta);
			this._calTotalsInsuranceType();
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calAnnuitiesTotalPoliciesInsuranceType: function(){
			// set Annuities Total Policies(Individual Life)
			//Brokers Number of Policies for new Business + Agents Number of Policies for new Business + Direct Clients Number of Policies for new Business = Sub Total
			var npnbb,npnba,npndc,st;
			npnbb = this.getView().byId("__inputNPBAN").getValue();
			npnba = this.getView().byId("__inputNPAAN").getValue();
			npndc = this.getView().byId("__inputNPDCAN").getValue();
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
			gpnbb = this.getView().byId("__inputGPBAN").getValue();
			gpnba = this.getView().byId("__inputGPAAN").getValue();
			gpndc = this.getView().byId("__inputGPDCAN").getValue();
	    	gpnbb = parseFloat(gpnbb) ? parseFloat(gpnbb) : 0;
	    	gpnba = parseFloat(gpnba) ? parseFloat(gpnba) : 0;
	    	gpndc = parseFloat(gpndc) ? parseFloat(gpndc) : 0;
			st = gpnbb+gpnba+gpndc;
			this.getView().byId("__inputSTGPAN2").setValue(st);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calTermInsuranceTotalPoliciesInsuranceType: function(){
			// set Term Insurance Total Policies(Individual Life)
			//Brokers Number of Policies for Recurring Premiums + Agents Number of Policies for Recurring Premiums + Direct Clients Number of Policies for Recurring Premiums = Sub Total
			var npnbb,npnba,npndc,st;
			npnbb = this.getView().byId("__inputNPBTI").getValue();
			npnba = this.getView().byId("__inputNPATI").getValue();
			npndc = this.getView().byId("__inputNPDCTI").getValue();
	    	npnbb = parseFloat(npnbb) ? parseFloat(npnbb) : 0;
	    	npnba = parseFloat(npnba) ? parseFloat(npnba) : 0;
	    	npndc = parseFloat(npndc) ? parseFloat(npndc) : 0;
			st = npnbb+npnba+npndc;
			this.getView().byId("__inputSTNPTI").setValue(st);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calTermInsuranceTotalGrossPremiumInsuranceType: function(){
			// set Term Insurance Total Gross Premium(Individual Life)
			//Brokers Number of Gross Premium for Recurring Premiums + Agents Number of Gross Premium for Recurring Premiums + Direct Clients Number of Gross Premium for Recurring Premiums = Sub Total
			var gpnbb,gpnba,gpndc,st;
			gpnbb = this.getView().byId("__inputGPBTI").getValue();
			gpnba = this.getView().byId("__inputGPATI").getValue();
			gpndc = this.getView().byId("__inputGPDCTI").getValue();
	    	gpnbb = parseFloat(gpnbb) ? parseFloat(gpnbb) : 0;
	    	gpnba = parseFloat(gpnba) ? parseFloat(gpnba) : 0;
	    	gpndc = parseFloat(gpndc) ? parseFloat(gpndc) : 0;
			st = gpnbb+gpnba+gpndc;
			this.getView().byId("__inputSTGPTI").setValue(st);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calEndowementTotalPoliciesInsuranceType: function(){
			// set Endowement Total Policies(Individual Life)
			//Brokers Number of Policies for Recurring Premiums + Agents Number of Policies for Recurring Premiums + Direct Clients Number of Policies for Recurring Premiums = Sub Total
			var npnbb,npnba,npndc,st;
			npnbb = this.getView().byId("__inputNPBEN").getValue();
			npnba = this.getView().byId("__inputNPAEN").getValue();
			npndc = this.getView().byId("__inputNPDCEN").getValue();
	    	npnbb = parseFloat(npnbb) ? parseFloat(npnbb) : 0;
	    	npnba = parseFloat(npnba) ? parseFloat(npnba) : 0;
	    	npndc = parseFloat(npndc) ? parseFloat(npndc) : 0;
			st = npnbb+npnba+npndc;
			this.getView().byId("__inputSTNPEN").setValue(st);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calEndowementTotalGrossPremiumInsuranceType: function(){
			// set Endowement Total Gross Premium(Individual Life)
			//Brokers Number of Gross Premium for Recurring Premiums + Agents Number of Gross Premium for Recurring Premiums + Direct Clients Number of Gross Premium for Recurring Premiums = Sub Total
			var gpnbb,gpnba,gpndc,st;
			gpnbb = this.getView().byId("__inputGPBEN").getValue();
			gpnba = this.getView().byId("__inputGPAEN").getValue();
			gpndc = this.getView().byId("__inputGPDCEN").getValue();
	    	gpnbb = parseFloat(gpnbb) ? parseFloat(gpnbb) : 0;
	    	gpnba = parseFloat(gpnba) ? parseFloat(gpnba) : 0;
	    	gpndc = parseFloat(gpndc) ? parseFloat(gpndc) : 0;
			st = gpnbb+gpnba+gpndc;
			this.getView().byId("__inputSTGPEN").setValue(st);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calPureEndowmentTotalPoliciesInsuranceType: function(){
			// set Pure Endowment Total Policies(Individual Life)
			//Brokers Number of Policies for Recurring Premiums + Agents Number of Policies for Recurring Premiums + Direct Clients Number of Policies for Recurring Premiums = Sub Total
			var npnbb,npnba,npndc,st;
			npnbb = this.getView().byId("__inputNPBPE").getValue();
			npnba = this.getView().byId("__inputNPAPE").getValue();
			npndc = this.getView().byId("__inputNPDCPE").getValue();
	    	npnbb = parseFloat(npnbb) ? parseFloat(npnbb) : 0;
	    	npnba = parseFloat(npnba) ? parseFloat(npnba) : 0;
	    	npndc = parseFloat(npndc) ? parseFloat(npndc) : 0;
			st = npnbb+npnba+npndc;
			this.getView().byId("__inputSTNPPE").setValue(st);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calPureEndowmentTotalGrossPremiumInsuranceType: function(){
			// set Pure Endowment Total Gross Premium(Individual Life)
			//Brokers Number of Gross Premium for Recurring Premiums + Agents Number of Gross Premium for Recurring Premiums + Direct Clients Number of Gross Premium for Recurring Premiums = Sub Total
			var gpnbb,gpnba,gpndc,st;
			gpnbb = this.getView().byId("__inputGPBPE").getValue();
			gpnba = this.getView().byId("__inputGPAPE").getValue();
			gpndc = this.getView().byId("__inputGPDCPE").getValue();
	    	gpnbb = parseFloat(gpnbb) ? parseFloat(gpnbb) : 0;
	    	gpnba = parseFloat(gpnba) ? parseFloat(gpnba) : 0;
	    	gpndc = parseFloat(gpndc) ? parseFloat(gpndc) : 0;
			st = gpnbb+gpnba+gpndc;
			this.getView().byId("__inputSTGPPE").setValue(st);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calWholeLifeTotalPoliciesInsuranceType: function(){
			// set Whole Life Total Policies(Individual Life)
			//Brokers Number of Policies for Recurring Premiums + Agents Number of Policies for Recurring Premiums + Direct Clients Number of Policies for Recurring Premiums = Sub Total
			var npnbb,npnba,npndc,st;
			npnbb = this.getView().byId("__inputNPBWL").getValue();
			npnba = this.getView().byId("__inputNPAWL").getValue();
			npndc = this.getView().byId("__inputNPDCWL").getValue();
	    	npnbb = parseFloat(npnbb) ? parseFloat(npnbb) : 0;
	    	npnba = parseFloat(npnba) ? parseFloat(npnba) : 0;
	    	npndc = parseFloat(npndc) ? parseFloat(npndc) : 0;
			st = npnbb+npnba+npndc;
			this.getView().byId("__inputSTNPWL").setValue(st);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calWholeLifeTotalGrossPremiumInsuranceType: function(){
			// set Whole Life Total Gross Premium(Individual Life)
			//Brokers Number of Gross Premium for Recurring Premiums + Agents Number of Gross Premium for Recurring Premiums + Direct Clients Number of Gross Premium for Recurring Premiums = Sub Total
			var gpnbb,gpnba,gpndc,st;
			gpnbb = this.getView().byId("__inputGPBWL").getValue();
			gpnba = this.getView().byId("__inputGPAWL").getValue();
			gpndc = this.getView().byId("__inputGPDCWL").getValue();
	    	gpnbb = parseFloat(gpnbb) ? parseFloat(gpnbb) : 0;
	    	gpnba = parseFloat(gpnba) ? parseFloat(gpnba) : 0;
	    	gpndc = parseFloat(gpndc) ? parseFloat(gpndc) : 0;
			st = gpnbb+gpnba+gpndc;
			this.getView().byId("__inputSTGPWL").setValue(st);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calFuneralTotalPoliciesInsuranceType: function(){
			// set Funeral Total Policies(Individual Life)
			//Brokers Number of Policies for Recurring Premiums + Agents Number of Policies for Recurring Premiums + Direct Clients Number of Policies for Recurring Premiums = Sub Total
			var npnbb,npnba,npndc,st;
			npnbb = this.getView().byId("__inputNPBF").getValue();
			npnba = this.getView().byId("__inputNPAF").getValue();
			npndc = this.getView().byId("__inputNPDCF").getValue();
	    	npnbb = parseFloat(npnbb) ? parseFloat(npnbb) : 0;
	    	npnba = parseFloat(npnba) ? parseFloat(npnba) : 0;
	    	npndc = parseFloat(npndc) ? parseFloat(npndc) : 0;
			st = npnbb+npnba+npndc;
			this.getView().byId("__inputSTNPF").setValue(st);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calFuneralTotalGrossPremiumInsuranceType: function(){
			// set Funeral Total Gross Premium(Individual Life)
			//Brokers Number of Gross Premium for Recurring Premiums + Agents Number of Gross Premium for Recurring Premiums + Direct Clients Number of Gross Premium for Recurring Premiums = Sub Total
			var gpnbb,gpnba,gpndc,st;
			gpnbb = this.getView().byId("__inputGPBF").getValue();
			gpnba = this.getView().byId("__inputGPAF").getValue();
			gpndc = this.getView().byId("__inputGPDCF").getValue();
	    	gpnbb = parseFloat(gpnbb) ? parseFloat(gpnbb) : 0;
	    	gpnba = parseFloat(gpnba) ? parseFloat(gpnba) : 0;
	    	gpndc = parseFloat(gpndc) ? parseFloat(gpndc) : 0;
			st = gpnbb+gpnba+gpndc;
			this.getView().byId("__inputSTGPF").setValue(st);
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
			this.getView().byId("__inputSTGPO").setValue(st);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calGrossTotalPoliciesInsuranceType: function(){
			// set Gross Total Policies(Individual Life)
			//Total Policies for New Business + Total Policies for Recurring Premiums = Gross Total Policies
			var STNPA,STNPTI,STNPEN,STNPPE,STNPWL,STNPF,STNPO,sta;
			STNPA = this.getView().byId("__inputSTNPAN").getValue();
			STNPTI = this.getView().byId("__inputSTNPTI").getValue();
			STNPEN = this.getView().byId("__inputSTNPEN").getValue();
			STNPPE = this.getView().byId("__inputSTNPPE").getValue();
			STNPWL = this.getView().byId("__inputSTNPWL").getValue();
			STNPF = this.getView().byId("__inputSTNPF").getValue();
			STNPO = this.getView().byId("__inputSTNPO").getValue();
	    	STNPA = parseFloat(STNPA) ? parseFloat(STNPA) : 0;
	    	STNPTI = parseFloat(STNPTI) ? parseFloat(STNPTI) : 0;
	    	STNPEN = parseFloat(STNPEN) ? parseFloat(STNPEN) : 0;
	    	STNPPE = parseFloat(STNPPE) ? parseFloat(STNPPE) : 0;
	    	STNPWL = parseFloat(STNPWL) ? parseFloat(STNPWL) : 0;
	    	STNPF = parseFloat(STNPF) ? parseFloat(STNPF) : 0;
	    	STNPO = parseFloat(STNPO) ? parseFloat(STNPO) : 0;
			sta = STNPA+STNPTI+STNPEN+STNPPE+STNPWL+STNPF+STNPO;
			this.getView().byId("__inputNPGROSSTOTAL").setValue(sta);
			//this.getView().byId("sbtnTotal").setValueState(sap.ui.core.ValueState.Success);
		},
		_calGrossTotalGrossPremiumInsuranceType: function(){
			// set Gross Total Gross Premium(Individual Life)
			//Total Gross Premium for New Business + Total Gross Premium for Recurring Premiums = Gross Total Gross Premium
			var STGPA,STGPTI,STGPEN,STGPPE,STGPWL,STGPF,STGPO,sta;
			STGPA = this.getView().byId("__inputSTGPAN2").getValue();
			STGPTI = this.getView().byId("__inputSTGPTI").getValue();
			STGPEN = this.getView().byId("__inputSTGPEN").getValue();
			STGPPE = this.getView().byId("__inputSTGPPE").getValue();
			STGPWL = this.getView().byId("__inputSTGPWL").getValue();
			STGPF = this.getView().byId("__inputSTGPF").getValue();
			STGPO = this.getView().byId("__inputSTGPO").getValue();
	    	STGPA = parseFloat(STGPA) ? parseFloat(STGPA) : 0;
	    	STGPTI = parseFloat(STGPTI) ? parseFloat(STGPTI) : 0;
	    	STGPEN = parseFloat(STGPEN) ? parseFloat(STGPEN) : 0;
	    	STGPPE = parseFloat(STGPPE) ? parseFloat(STGPPE) : 0;
	    	STGPWL = parseFloat(STGPWL) ? parseFloat(STGPWL) : 0;
	    	STGPF = parseFloat(STGPF) ? parseFloat(STGPF) : 0;
	    	STGPO = parseFloat(STGPO) ? parseFloat(STGPO) : 0;
			sta = STGPA+STGPTI+STGPEN+STGPPE+STGPWL+STGPF+STGPO;
			this.getView().byId("__inputGPGROSSTOTAL").setValue(sta);
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
		}
	});
},true);