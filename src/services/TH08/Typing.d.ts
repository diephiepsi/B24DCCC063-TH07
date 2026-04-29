declare namespace TH08Type {
  export interface BaiViet {
    id: string;
    tieuDe: string;
    slug: string;
    tomTat: string;
    noiDung: string; // Markdown format
    tacGia: string;
    ngayDang: string;
    tags: string[];
    luotXem: number;
    trangThai: 'Draft' | 'Published';
    anhDaiDien: string;
  }

  export interface TheTag {
    id: string;
    ten: string;
  }
}