import { useState, useEffect } from 'react';

const DU_LIEU_MAU: TH08Type.BaiViet[] = Array.from({ length: 20 }).map((_, i) => ({
  id: `bv-${i + 1}`,
  tieuDe: `Hướng dẫn lập trình Web bài số ${i + 1}`,
  slug: `huong-dan-web-${i + 1}`,
  tomTat: 'Đây là phần tóm tắt nội dung bài viết cho dự án TH08 cá nhân...',
  noiDung: '## Chào mừng \n\n Đây là nội dung bài viết định dạng **Markdown**. \n\n - Mục 1 \n - Mục 2',
  tacGia: 'Nguyễn Văn Điệp',
  ngayDang: '2026-04-29',
  tags: i % 2 === 0 ? ['React', 'TH08'] : ['TypeScript', 'Frontend'],
  luotXem: Math.floor(Math.random() * 500),
  trangThai: 'Published',
  anhDaiDien: `https://picsum.photos/400/250?random=${i}`,
}));

export default () => {
  const [baiViets, setBaiViets] = useState<TH08Type.BaiViet[]>(() => {
    const saved = localStorage.getItem('th08_posts');
    return saved ? JSON.parse(saved) : DU_LIEU_MAU;
  });

  const [danhSachTags, setDanhSachTags] = useState<string[]>(['React', 'TH08', 'TypeScript', 'Frontend', 'UmiJS']);

  useEffect(() => {
    localStorage.setItem('th08_posts', JSON.stringify(baiViets));
  }, [baiViets]);

  return { baiViets, setBaiViets, danhSachTags, setDanhSachTags };
};