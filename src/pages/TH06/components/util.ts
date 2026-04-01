export type DestinationType = 'beach' | 'mountain' | 'city';

export interface BudgetDetail {
	food: number;
	transport: number;
	accommodation: number;
}

export interface Destination {
	id: string;
	name: string;
	image?: string;
	location: string;
	type: DestinationType;
	price: number; // Tổng chi phí dự tính cá nhân
	duration: number; // Thời gian tham quan (giờ)
	rating: number;
	description?: string;
	budget: BudgetDetail; // Chi tiết ngân sách
}

export interface PlanDay {
	day: number;
	date?: string;
	items: Destination[];
}
