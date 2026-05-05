const syncAllData = (lastUpdatedKey?: string) => {
    console.log("Sync Triggered By:", lastUpdatedKey);

    // ----------------------------
    // LOAD
    // ----------------------------
    const get = (key: string) => localStorage.getItem(key);
    const getJSON = (key: string) => JSON.parse(localStorage.getItem(key) || "[]");

    const TAMSAMdb = getJSON("rows");
    const SAM = get("SAM");
    const IntendedPricingValue = get("IntendedPricingValue");
    const OPDays = get("OPdays");
    const SAMPercent = get("SAMPercent");
    const OpExDB = getJSON("OpExDB");
    const CapExDB = getJSON("CapExDB");
    const WCMonths = get("WCMonths");
    const FundingDB = getJSON("FundingDB");

    const num = (v: any) => Number(v) || 0;

    // ----------------------------
    // SAFE SET (only if changed)
    // ----------------------------
    const setIfChanged = (key: string, value: number | null) => {
        if (value === null) return; // skip invalid calc

        const existing = localStorage.getItem(key);

        // If no previous value → save
        if (existing === null) {
            localStorage.setItem(key, String(value));
            // console.log("new LocalStorage",key,":",String(value))
            return;
        }

        // If changed → update
        if (Number(existing) !== value) {
            localStorage.setItem(key, String(value));
            // console.log("Update LocalStorage",key,":",String(value))

        }
    };

    // ----------------------------
    // CALCULATIONS
    // ----------------------------

    // TAMTotal
    let TAMTotal: number | null = null;
    if (TAMSAMdb.length && TAMSAMdb.some((r: any) => r.size)) {
        TAMTotal = TAMSAMdb.reduce((t: number, r: any) => t + num(r.size), 0);
    }

    // SAMTotal
    let SAMTotal: number | null = null;
    if (TAMSAMdb.length && TAMSAMdb.some((r: any) => r.sizeofSAM)) {
        SAMTotal = TAMSAMdb.reduce((t: number, r: any) => t + num(r.sizeofSAM), 0);
    }

    // Revenue
    let DailyRevenuefromSAM: number | null = null;
    if (SAMTotal !== null && IntendedPricingValue) {
        DailyRevenuefromSAM = SAMTotal * num(IntendedPricingValue);
    }

    let MonthlyRevenuefromSAM: number | null = null;
    let YearlyRevenuefromSAM: number | null = null;

    if (DailyRevenuefromSAM !== null && OPDays) {
        MonthlyRevenuefromSAM = num(OPDays) * DailyRevenuefromSAM;
        YearlyRevenuefromSAM = MonthlyRevenuefromSAM * 12;
    }

    // SOM
    let SOM: number | null = null;
    if (SAMPercent && SAM) {
        SOM = (num(SAMPercent) / 100) * num(SAM);
    }

    let SOMDaily: number | null = null;
    let SOMMonthly: number | null = null;
    let SOMYearly: number | null = null;
    if (SOM !== null && IntendedPricingValue && OPDays) {
        SOMDaily = SOM * num(IntendedPricingValue);
        SOMMonthly = SOM * num(IntendedPricingValue) * num(OPDays);
        SOMYearly = SOM * num(IntendedPricingValue) * num(OPDays) * 12;
    }

    // OpEx
    const OpExTotal =
        OpExDB.length
            ? OpExDB.reduce((t: number, r: any) => t + num(r.ValueOfExpense), 0)
            : null;

    const OpExVT =
        OpExDB.length
            ? OpExDB
                .filter((r: any) => r.TypeOfExpense?.toLowerCase() === "variable")
                .reduce((t: number, r: any) => t + num(r.ValueOfExpense), 0)
            : 0;

    const OpExFT =
        OpExDB.length
            ? OpExDB
                .filter((r: any) => r.TypeOfExpense?.toLowerCase() === "fixed")
                .reduce((t: number, r: any) => t + num(r.ValueOfExpense), 0)
            : 0;

    // CapEx
    const CapExTotal =
        CapExDB.length
            ? CapExDB.reduce((t: number, r: any) => t + num(r.ValueOfExpense), 0)
            : null;

    // EBT
    let EBT: number | null = null;
    if (SOMMonthly !== null) {
        EBT = SOMMonthly - OpExVT;
    }

    // WC
    let WC: number | null = null;
    if (CapExTotal !== null && WCMonths) {
        WC = (CapExTotal + OpExFT) + (OpExVT * num(WCMonths));
    }

    // Funding
    const TAB =
        FundingDB.length
            ? FundingDB.reduce((t: number, r: any) => t + num(r.BorrowedAmount), 0)
            : null;

    const TMI =
        FundingDB.length
            ? FundingDB.reduce((t: number, r: any) => t + num(r.MonthlyInterestPayment), 0)
            : null;

    const EMI =
        FundingDB.length
            ? FundingDB.reduce(
                (t: number, r: any) =>
                    t + num(r.MonthlyPrincipalPayment) + num(r.MonthlyInterestPayment), 0)
            : null;

    // ----------------------------
    // SAVE (only if valid + changed)
    // ----------------------------
    setIfChanged("TAM", TAMTotal);
    setIfChanged("SAM", SAMTotal);
    setIfChanged("DailyRevenuefromSAM", DailyRevenuefromSAM);
    setIfChanged("IntendedPricingMonthly", MonthlyRevenuefromSAM);
    setIfChanged("IntendedPricingYearly", YearlyRevenuefromSAM);
    setIfChanged("SOMDaily", SOMDaily);
    setIfChanged("SOMMonthly", SOMMonthly);
    setIfChanged("SOMYearly", SOMYearly);
    setIfChanged("SOM", SOM);
    setIfChanged("OpExTotal", OpExTotal);
    setIfChanged("ebt", EBT);
    setIfChanged("WC", WC);
    setIfChanged("TAB", TAB);
    setIfChanged("TMI", TMI);
    setIfChanged("EMI", EMI);
};

export default syncAllData

// // Code sample for GPT
// // Data example
// let TAM = "100", SAM = "100", IntendedPricingValue = "100", OPDays = "30", SAMPercent = "100", WCMonths = "3"
// let TAMSAMdb = [{ id: 1, customerSegment: "sainm", size: "100", percentage: "100", sizeofSAM: "100.00" }]
// let OpExDB = [{ id: 1, ExpenseName: 'OpEx1', TypeOfExpense: 'Variable', ValueOfExpense: '100' }]
// let CapExDB = [{ id: 1, ExpenseName: 'CapEx1', ValueOfExpense: '100' }]
// let FundingDB = [{ id: 1, SourceofFunds: 'Fund1', BorrowedAmount: '100', interest: '8', interestPayable: '', RepaymentPeriod: '', MonthlyPrincipalPayment: '', MonthlyInterestPayment: '' }]

// const getOpExVariableTotal = () => {
//     let data = OpExDB
//     // console.log("data 1", data);
//     let res = 0
//     data.forEach((row) => {
//         if (row.TypeOfExpense == "variable") {
//             res += parseFloat(row.ValueOfExpense)
//         }
//     })
//     return res
// }

// const getOpExFixedTotal = () => {
//     let data = OpExDB
//     // console.log("data 1", data);
//     let res = 0
//     data.forEach((row) => {
//         if (row.TypeOfExpense == "fixed") {
//             res += parseFloat(row.ValueOfExpense)
//         }
//     })
//     return res
// }

// /* TAM */
// // check if TAMSAMdb.size has data the get TAMTotal
// let TAMTotal = TAMSAMdb.reduce((total, row) => total + parseInt(row.size), 0);

// /* SAM */
// // check if TAMSAM.sizeofSAM has data then get SAMTotal
// let SAMTotal = TAMSAMdb.reduce((total, row) => total + parseInt(row.sizeofSAM), 0);

// /* IntendedPrice */
// let DailyRevenuefromSAM = SAMTotal * parseFloat(IntendedPricingValue)

// /* OPdays */
// let MonthlyRevenuefromSAM = parseFloat(OPDays) * DailyRevenuefromSAM
// let YearlyRevenuefromSAM = MonthlyRevenuefromSAM * 12

// /* SOM */
// let SOM = (parseFloat(SAMPercent) / 100) * parseFloat(SAM)
// let SOMDaily = SOM * parseFloat(IntendedPricingValue)
// let SOMMonthly = SOM * parseFloat(IntendedPricingValue) * parseFloat(OPDays)
// let SOMYearly = SOM * parseFloat(IntendedPricingValue) * parseFloat(OPDays) * 12

// /* OpEx */
// let OpExTotal = OpExDB.reduce((total, row) => total + parseInt(row.ValueOfExpense), 0);

// /* CapEx */
// let CapExTotal = CapExDB.reduce((total, row) => total + parseInt(row.ValueOfExpense), 0);

// /* EBT  */
// let OpExVT = getOpExVariableTotal()
// let EBT = SOMMonthly - OpExVT

// /* WC */
// let OpExFT = getOpExFixedTotal()
// let WC = (CapExTotal + OpExFT) + (OpExVT * parseInt(WCMonths))

// /* Funding */
// //Total Amount borrowed
// let TAB = FundingDB.reduce((total, row) => total + parseFloat(row.BorrowedAmount), 0);
// //Total Monthly interest
// let TMI = FundingDB.reduce((total, row) => total + parseFloat(row.MonthlyInterestPayment), 0);
// //Total Interest + Principal Repayment
// let TMP = FundingDB.reduce((total, row) => { return total + parseFloat(row.MonthlyPrincipalPayment) + parseFloat(row.MonthlyInterestPayment) }, 0);
// // Monthly EMI
// let EMI = TMP

// // END Code sample for GPT 