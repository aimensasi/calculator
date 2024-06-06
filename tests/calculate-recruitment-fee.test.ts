import { expect, it, describe, beforeAll } from "bun:test";
import { CalculateAgencyFee } from "../src/usecases/calculate-agency-fee";
import type { Job } from "../src/interface/recruitment-brief";
import type { CalculationResult } from "../src/interface/calculation-result";
import type { PricingCluster } from "../src/interface/pricing-rule";

describe("Calculate Recruitment Fee", () => {
  const pricingClusters: PricingCluster[] = [
    { classification: 'BD', location: 'MY', agencyFeePercentage: 4.32, recruitmentFeePercentage: 15 },
  ];
  const feeCalculator = new CalculateAgencyFee(pricingClusters);


  it('should calculate hiring company fee for a job', () => {
    const job: Job = { 
      title: 'Business Development',
      classification: 'BD', 
      location: 'MY', 
      annualSalary: 30_000, 
      description: 'Can sell stuff' 
    };
    const result: CalculationResult = feeCalculator.execute(job);

    expect(result).toEqual({ percentage: 4.32, fee: 1296 });
  });

  it('should throw an error if no cluster is found', () => {
    const job: Job = { 
      title: 'UX Researcher',
      classification: 'UX', 
      location: 'Sydney', 
      annualSalary: 250_000, 
      description: 'Can do magic' 
    };

    expect(() => {
      feeCalculator.execute(job);
    }).toThrow('No pricing cluster found for the job classification UX and location Sydney.');
  });

  it('should throw an error if the salary is a non-positive number', () => {
    const job: Job = { 
      title: 'Business Development',
      classification: 'BD', 
      location: 'MY', 
      annualSalary: -1, 
      description: 'Can do magic' 
    };

    expect(() => {
      feeCalculator.execute(job);
    }).toThrow('Annual Salary must be a positive number.');
  });
});