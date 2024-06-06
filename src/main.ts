import { pricingClusters } from "./data/pricing-cluster";
import type { Job } from "./interface/recruitment-brief";
import { CalculateAgencyFee } from "./usecases/calculate-agency-fee";
import { CalculateRecruitmentFee } from "./usecases/calculate-recruitment-fee";

const recruitmentBrief: Job = {
	title: 'Senior Software Engineer',
	classification: 'Engineering',
	location: 'Sydney',
	annualSalary: 100_000,
	description: 'Responsible for developing high-quality software solutions.'
};

function bootstrap(): void {
	const calculateRecruitmentFeeUseCase = new CalculateRecruitmentFee(pricingClusters);
	const calculateAgencyFeeUseCase = new CalculateAgencyFee(pricingClusters);

		
	const recruitmentFee = calculateRecruitmentFeeUseCase.execute(recruitmentBrief)
	console.log(`Recruitment Fee Percentage: ${recruitmentFee.percentage}%`);
	console.log(`Recruitment Fee: AUD ${recruitmentFee.fee}`);
	
	const agencyFee = calculateAgencyFeeUseCase.execute(recruitmentBrief);
	console.log(`Agency Fee Percentage: ${agencyFee.percentage}%`);
	console.log(`Agency Fee: AUD ${agencyFee.fee}`);
}


bootstrap();