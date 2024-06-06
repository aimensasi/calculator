import { expect, it, describe } from "bun:test";
import { CalculateAgencyFee } from "../src/usecases/calculate-agency-fee";
import type { Job } from "../src/interface/recruitment-brief";
import type { CalculationResult } from "../src/interface/calculation-result";
import type { PricingCluster } from "../src/interface/pricing-rule";

describe("Calculate Agency Fee", () => {
  const pricingClusters: PricingCluster[] = [
    { classification: 'Engineering', location: 'NY', agencyFeePercentage: 10, recruitmentFeePercentage: 10 },
    { classification: 'Marketing', location: 'SF', agencyFeePercentage: 12, recruitmentFeePercentage: 12 },
  ];
  const feeCalculator = new CalculateAgencyFee(pricingClusters);


  it('should calculate agency fee for a job', () => {
    const job: Job = { 
      title: 'Software Engineer',
      classification: 'Engineering', 
      location: 'NY', 
      annualSalary: 100_000, 
      description: 'Can do magic' 
    };
    const result: CalculationResult = feeCalculator.execute(job);

    expect(result).toEqual({ percentage: 10, fee: 10_000 });
  });

  it('should throw an error if no cluster is found', () => {
    const job: Job = { 
      title: 'Software Engineer',
      classification: 'Engineering', 
      location: 'LA', 
      annualSalary: 30_000, 
      description: 'Can do magic' 
    };

    expect(() => {
      feeCalculator.execute(job);
    }).toThrow('No pricing cluster found for the job classification Engineering and location LA.');
  });

  it('should throw an error if the salary is a non-positive number', () => {
    const job: Job = { 
      title: 'Digital Marketing',
      classification: 'Marketing', 
      location: 'SF', 
      annualSalary: -102, 
      description: 'Can do magic' 
    };

    expect(() => {
      feeCalculator.execute(job);
    }).toThrow('Annual Salary must be a positive number.');
  });
});