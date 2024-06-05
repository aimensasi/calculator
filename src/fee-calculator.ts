import type { PricingCluster } from "./interface/pricing-rule";
import type { Job } from "./interface/recruitment-brief";

export class FeeCalculator {
  private clusters: PricingCluster[];

  constructor(clusters: PricingCluster[]) {
    this.clusters = clusters;
  }

  protected findCluster(job: Job): PricingCluster {
    const cluster = this.clusters.find(cluster => 
      cluster.classification === job.classification && 
      cluster.location === job.location
    );
    if (!cluster) {
      throw new Error(`No pricing cluster found for the job classification ${job.classification} and location ${job.location}.`);
    }
    return cluster;
  }

  protected calculateFee(annualSalary: number, percentage: number): number {
    if (annualSalary < 0) {
      throw new Error("Annual Salary must be a positive number.");
    }
    if (percentage < 0 || percentage > 100) {
      throw new Error("Percentage must be between 0 and 100.");
    }

    const fee = (percentage / 100) * annualSalary;
    return Number(fee.toFixed(2));
  }
}