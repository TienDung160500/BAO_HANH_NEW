import { IChiTietSanPhamTiepNhan } from 'app/entities/chi-tiet-san-pham-tiep-nhan/chi-tiet-san-pham-tiep-nhan.model';
import { IDanhSachTinhTrang } from 'app/entities/danh-sach-tinh-trang/danh-sach-tinh-trang.model';

export interface IPhanLoaiChiTietTiepNhan {
  id?: number;
  soLuong?: number | null;
  chiTietSanPhamTiepNhans?: IChiTietSanPhamTiepNhan[] | null;
  danhSachTinhTrang?: IDanhSachTinhTrang | null;
}

export class PhanLoaiChiTietTiepNhan implements IPhanLoaiChiTietTiepNhan {
  constructor(
    public id?: number,
    public soLuong?: number | null,
    public chiTietSanPhamTiepNhans?: IChiTietSanPhamTiepNhan[] | null,
    public danhSachTinhTrang?: IDanhSachTinhTrang | null
  ) {}
}

export function getPhanLoaiChiTietTiepNhanIdentifier(phanLoaiChiTietTiepNhan: IPhanLoaiChiTietTiepNhan): number | undefined {
  return phanLoaiChiTietTiepNhan.id;
}
