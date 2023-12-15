import dayjs from 'dayjs/esm';
import { IPhanTichLoi } from 'app/entities/phan-tich-loi/phan-tich-loi.model';
import { IChiTietSanPhamTiepNhan } from 'app/entities/chi-tiet-san-pham-tiep-nhan/chi-tiet-san-pham-tiep-nhan.model';

export interface IPhanTichSanPham {
  id?: number;
  tenNhanVienPhanTich?: string | null;
  theLoaiPhanTich?: string | null;
  lotNumber?: string | null;
  detail?: string | null;
  soLuong?: number | null;
  ngayKiemTra?: dayjs.Dayjs | null;
  username?: string | null;
  namSanXuat?: string | null;
  trangThai?: string | null;
  phanTichLois?: IPhanTichLoi[] | null;
  chiTietSanPhamTiepNhan?: IChiTietSanPhamTiepNhan | null;
}

export class PhanTichSanPham implements IPhanTichSanPham {
  constructor(
    public id?: number,
    public tenNhanVienPhanTich?: string | null,
    public theLoaiPhanTich?: string | null,
    public lotNumber?: string | null,
    public detail?: string | null,
    public soLuong?: number | null,
    public ngayKiemTra?: dayjs.Dayjs | null,
    public username?: string | null,
    public namSanXuat?: string | null,
    public trangThai?: string | null,
    public phanTichLois?: IPhanTichLoi[] | null,
    public chiTietSanPhamTiepNhan?: IChiTietSanPhamTiepNhan | null
  ) {}
}

export function getPhanTichSanPhamIdentifier(phanTichSanPham: IPhanTichSanPham): number | undefined {
  return phanTichSanPham.id;
}
