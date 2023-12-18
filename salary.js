
    //A function named calculateNetSalary with two parameters, basicSalary and benefits.
    function calculateNetSalary(basicSalary, benefits) {

    // Variable taxRates that stores different tax rates based on salary ranges.
    const taxRates = {
      "Up to 24,000": 10,
      "24,001 - 32,333": 25,
      "32,334 - 500,000": 30,
      "500,001 - 800,000": 32,
      "Above 800,000": 35
    };

    // Variable nhifRates that stores different nhif rates based on salary ranges.
    const nhifRates= {
      "Up to 5,999": 150,
      "6,000 - 7,999": 300,
      "8,000 - 11,999": 400,
      "12,000 - 14,999": 500,
      "15,000 - 19,999": 600,
      "20,000 - 24,999": 750,
      "25,000 - 29,999": 850,
      "30,000 - 34,999": 900,
      "35,000 - 39,999": 950,
      "40,000 - 44,999": 1000,
      "45,000 - 49,999": 1100,
      "50,000 - 59,999": 1200,
      "60,000 - 69,999": 1300,
      "70,000 - 79,999": 1400,
      "80,000 - 89,999": 1500,
      "90,000 - 99,999": 1600,
      "100,000 - 109,999": 1700,
      "110,000 - 119,999": 1800,
      "Above 120,000": 2000
    };

    const nssfDeduction = 200; 


    // calculates the total gross salary by adding the basicSalary and benefits
    const grossSalary = basicSalary + benefits;

    // Calculate payee (tax)
    let payee = 0;

    // Starts a loop that goes through each tax rate range defined in the taxRates const.
    for (const rate in taxRates) {

      //splits each rate range into lower and upper limits.
      const [lower, upper] = rate.split(" - ");

      // convert the salary limits into numbers (parseInt) and remove commas
      const lowerLimit = parseInt(lower.replace(/,/g, ""));
      const upperLimit = upper ? parseInt(upper.replace(/,/g, "")) : undefined; //if there's no upper limit, it's set to undefined 

      // Check if the grossSalary falls within the tax rate range. If it does, it calculates the payee (tax) based on the range and breaks out of the loop.
      if (upperLimit !== undefined) {
        if (grossSalary > lowerLimit && grossSalary <= upperLimit) {
          payee = (grossSalary - lowerLimit) * (taxRates[rate] / 100);
          break;
        }
      } else {
        if (grossSalary > lowerLimit) {
          payee = (grossSalary - lowerLimit) * (taxRates[rate] / 100);
          break;
        }
      }
    }

    
    // Calculate NHIF Deductions
    let nhifDeductions = 0;

    //repeat of what goes on in payee (Tax) calculations
    for (const rate in nhifRates) {
      const [lower, upper] = rate.split(" - ");
      const lowerLimit = parseInt(lower.replace(/,/g, ""));
      const upperLimit = upper ? parseInt(upper.replace(/,/g, "")) : undefined;

      if (upperLimit !== undefined) {
        if (grossSalary > lowerLimit && grossSalary <= upperLimit) {
          nhifDeductions = nhifRates[rate];
          break;
        }
      } else {
        if (grossSalary > lowerLimit) {
          nhifDeductions = nhifRates[rate];
          break;
        }
      }
    }

    //netSalary is calculated by the equation 
    const netSalary = grossSalary - payee - nhifDeductions - nssfDeduction;

    return {
      payee,
      nhifDeductions,
      nssfDeduction: nssfDeduction,
      grossSalary,
      netSalary
    };
}

// Test Case
const basicSalary = 120000;
const benefits = 2000;

const salaryDetails = calculateNetSalary(basicSalary, benefits);
console.log(salaryDetails);

