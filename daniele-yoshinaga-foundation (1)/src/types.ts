export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  category: 'founding' | 'milestone' | 'expansion' | 'achievement';
}

export interface ContributionCampaign {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  raised: number;
  goal: number;
  category: string;
  impactMetrics: {
    amount: number;
    description: string;
  }[];
}

export interface Donation {
  id: string;
  donorName: string;
  amount: number;
  campaignId: string;
  message?: string;
  timestamp: string;
  isRecurring: boolean;
  paymentMethod: string;
}

export interface ActiveDonationInput {
  name: string;
  email: string;
  amount: number;
  campaignId: string;
  isRecurring: boolean;
  message: string;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  paypalEmail?: string;
  bankCountry?: string;
  bankAccount?: string;
}
