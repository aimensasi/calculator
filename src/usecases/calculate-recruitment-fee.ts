import type { CalculationResult } from "../interface/calculation-result";
import type { Job } from "../interface/recruitment-brief";
import { FeeCalculator } from "../fee-calculator";

export class CalculateRecruitmentFee extends FeeCalculator {
    
	execute(job: Job): CalculationResult {
		const cluster = this.findCluster(job);
		const percentage = cluster.recruitmentFeePercentage;
    const fee = this.calculateFee(job.annualSalary, percentage);

		return { percentage, fee };
	}
}