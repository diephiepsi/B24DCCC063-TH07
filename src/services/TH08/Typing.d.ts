declare namespace TH08Type {
	export interface TheTag {
		id: string;
		ten: string;
	}
}
export interface BaiViet {
	id: string;
	tieuDe: string;
	slug: string;
	tomTat: string;
	noiDung: string;
	tacGia: string;
	ngayDang: string;
	tags: string[];
	luotXem: number;
	trangThai: 'Published' | 'Draft';
	anhDaiDien: string;
}
