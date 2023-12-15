import dayjs from 'dayjs/esm';
import { IChiTietSanPhamTiepNhan } from 'app/entities/chi-tiet-san-pham-tiep-nhan/chi-tiet-san-pham-tiep-nhan.model';
import { IKhachHang } from 'app/entities/khach-hang/khach-hang.model';

export interface IDonBaoHanh {
  id?: number;
  ngayTiepNhan?: string | null;
  trangThai?: string | null;
  nhanVienGiaoHang?: string | null;
  ngaykhkb?: dayjs.Dayjs | null;
  nguoiTaoDon?: string | null;
  ghiChu?: string | null;
  ngayTraBienBan?: dayjs.Dayjs | null;
  chiTietSanPhamTiepNhans?: IChiTietSanPhamTiepNhan[] | null;
  khachHang?: IKhachHang | null;
}

export class DonBaoHanh implements IDonBaoHanh {
  constructor(
    public id?: number,
    public ngayTiepNhan?: string | null,
    public trangThai?: string | null,
    public nhanVienGiaoHang?: string | null,
    public ngaykhkb?: dayjs.Dayjs | null,
    public nguoiTaoDon?: string | null,
    public ghiChu?: string | null,
    public ngayTraBienBan?: dayjs.Dayjs | null,
    public chiTietSanPhamTiepNhans?: IChiTietSanPhamTiepNhan[] | null,
    public khachHang?: IKhachHang | null
  ) {}
}

export function getDonBaoHanhIdentifier(donBaoHanh: IDonBaoHanh): number | undefined {
  return donBaoHanh.id;
}
