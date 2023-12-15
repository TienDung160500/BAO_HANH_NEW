package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;

/**
 * A ChiTietSanPhamTiepNhan.
 */
@Entity
@Table(name = "chi_tiet_san_pham_tiep_nhan")
public class ChiTietSanPhamTiepNhan implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "so_luong_khach_hang")
    private Integer soLuongKhachHang;

    @Column(name = "id_kho")
    private String idKho;

    @Column(name = "id_bien_ban")
    private String idBienBan;

    @Column(name = "tong_loi_ki_thuat")
    private Integer tongLoiKiThuat;

    @Column(name = "tong_loi_linh_dong")
    private Integer tongLoiLinhDong;

    @Column(name = "ngay_phan_loai")
    private ZonedDateTime ngayPhanLoai;

    @Column(name = "so_luong")
    private Integer soLuong;

    @Column(name = "tinh_trang_bao_hanh")
    private String tinhTrangBaoHanh;

    @OneToMany(mappedBy = "chiTietSanPhamTiepNhan")
    @JsonIgnoreProperties(value = { "phanTichLois", "chiTietSanPhamTiepNhan" }, allowSetters = true)
    private Set<PhanTichSanPham> phanTichSanPhams = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "chiTietSanPhamTiepNhans", "nhomSanPham", "kho", "nganh", "chungLoai" }, allowSetters = true)
    private SanPham sanPham;

    @ManyToOne
    @JsonIgnoreProperties(value = { "chiTietSanPhamTiepNhans", "khachHang" }, allowSetters = true)
    private DonBaoHanh donBaoHanh;

    @ManyToOne
    @JsonIgnoreProperties(value = { "chiTietSanPhamTiepNhans", "danhSachTinhTrang" }, allowSetters = true)
    private PhanLoaiChiTietTiepNhan phanLoaiChiTietTiepNhan;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public ChiTietSanPhamTiepNhan id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getSoLuongKhachHang() {
        return this.soLuongKhachHang;
    }

    public ChiTietSanPhamTiepNhan soLuongKhachHang(Integer soLuongKhachHang) {
        this.setSoLuongKhachHang(soLuongKhachHang);
        return this;
    }

    public void setSoLuongKhachHang(Integer soLuongKhachHang) {
        this.soLuongKhachHang = soLuongKhachHang;
    }

    public String getIdKho() {
        return this.idKho;
    }

    public ChiTietSanPhamTiepNhan idKho(String idKho) {
        this.setIdKho(idKho);
        return this;
    }

    public void setIdKho(String idKho) {
        this.idKho = idKho;
    }

    public String getIdBienBan() {
        return this.idBienBan;
    }

    public ChiTietSanPhamTiepNhan idBienBan(String idBienBan) {
        this.setIdBienBan(idBienBan);
        return this;
    }

    public void setIdBienBan(String idBienBan) {
        this.idBienBan = idBienBan;
    }

    public Integer getTongLoiKiThuat() {
        return this.tongLoiKiThuat;
    }

    public ChiTietSanPhamTiepNhan tongLoiKiThuat(Integer tongLoiKiThuat) {
        this.setTongLoiKiThuat(tongLoiKiThuat);
        return this;
    }

    public void setTongLoiKiThuat(Integer tongLoiKiThuat) {
        this.tongLoiKiThuat = tongLoiKiThuat;
    }

    public Integer getTongLoiLinhDong() {
        return this.tongLoiLinhDong;
    }

    public ChiTietSanPhamTiepNhan tongLoiLinhDong(Integer tongLoiLinhDong) {
        this.setTongLoiLinhDong(tongLoiLinhDong);
        return this;
    }

    public void setTongLoiLinhDong(Integer tongLoiLinhDong) {
        this.tongLoiLinhDong = tongLoiLinhDong;
    }

    public ZonedDateTime getNgayPhanLoai() {
        return this.ngayPhanLoai;
    }

    public ChiTietSanPhamTiepNhan ngayPhanLoai(ZonedDateTime ngayPhanLoai) {
        this.setNgayPhanLoai(ngayPhanLoai);
        return this;
    }

    public void setNgayPhanLoai(ZonedDateTime ngayPhanLoai) {
        this.ngayPhanLoai = ngayPhanLoai;
    }

    public Integer getSoLuong() {
        return this.soLuong;
    }

    public ChiTietSanPhamTiepNhan soLuong(Integer soLuong) {
        this.setSoLuong(soLuong);
        return this;
    }

    public void setSoLuong(Integer soLuong) {
        this.soLuong = soLuong;
    }

    public String getTinhTrangBaoHanh() {
        return this.tinhTrangBaoHanh;
    }

    public ChiTietSanPhamTiepNhan tinhTrangBaoHanh(String tinhTrangBaoHanh) {
        this.setTinhTrangBaoHanh(tinhTrangBaoHanh);
        return this;
    }

    public void setTinhTrangBaoHanh(String tinhTrangBaoHanh) {
        this.tinhTrangBaoHanh = tinhTrangBaoHanh;
    }

    public Set<PhanTichSanPham> getPhanTichSanPhams() {
        return this.phanTichSanPhams;
    }

    public void setPhanTichSanPhams(Set<PhanTichSanPham> phanTichSanPhams) {
        if (this.phanTichSanPhams != null) {
            this.phanTichSanPhams.forEach(i -> i.setChiTietSanPhamTiepNhan(null));
        }
        if (phanTichSanPhams != null) {
            phanTichSanPhams.forEach(i -> i.setChiTietSanPhamTiepNhan(this));
        }
        this.phanTichSanPhams = phanTichSanPhams;
    }

    public ChiTietSanPhamTiepNhan phanTichSanPhams(Set<PhanTichSanPham> phanTichSanPhams) {
        this.setPhanTichSanPhams(phanTichSanPhams);
        return this;
    }

    public ChiTietSanPhamTiepNhan addPhanTichSanPham(PhanTichSanPham phanTichSanPham) {
        this.phanTichSanPhams.add(phanTichSanPham);
        phanTichSanPham.setChiTietSanPhamTiepNhan(this);
        return this;
    }

    public ChiTietSanPhamTiepNhan removePhanTichSanPham(PhanTichSanPham phanTichSanPham) {
        this.phanTichSanPhams.remove(phanTichSanPham);
        phanTichSanPham.setChiTietSanPhamTiepNhan(null);
        return this;
    }

    public SanPham getSanPham() {
        return this.sanPham;
    }

    public void setSanPham(SanPham sanPham) {
        this.sanPham = sanPham;
    }

    public ChiTietSanPhamTiepNhan sanPham(SanPham sanPham) {
        this.setSanPham(sanPham);
        return this;
    }

    public DonBaoHanh getDonBaoHanh() {
        return this.donBaoHanh;
    }

    public void setDonBaoHanh(DonBaoHanh donBaoHanh) {
        this.donBaoHanh = donBaoHanh;
    }

    public ChiTietSanPhamTiepNhan donBaoHanh(DonBaoHanh donBaoHanh) {
        this.setDonBaoHanh(donBaoHanh);
        return this;
    }

    public PhanLoaiChiTietTiepNhan getPhanLoaiChiTietTiepNhan() {
        return this.phanLoaiChiTietTiepNhan;
    }

    public void setPhanLoaiChiTietTiepNhan(PhanLoaiChiTietTiepNhan phanLoaiChiTietTiepNhan) {
        this.phanLoaiChiTietTiepNhan = phanLoaiChiTietTiepNhan;
    }

    public ChiTietSanPhamTiepNhan phanLoaiChiTietTiepNhan(PhanLoaiChiTietTiepNhan phanLoaiChiTietTiepNhan) {
        this.setPhanLoaiChiTietTiepNhan(phanLoaiChiTietTiepNhan);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ChiTietSanPhamTiepNhan)) {
            return false;
        }
        return id != null && id.equals(((ChiTietSanPhamTiepNhan) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ChiTietSanPhamTiepNhan{" +
            "id=" + getId() +
            ", soLuongKhachHang=" + getSoLuongKhachHang() +
            ", idKho='" + getIdKho() + "'" +
            ", idBienBan='" + getIdBienBan() + "'" +
            ", tongLoiKiThuat=" + getTongLoiKiThuat() +
            ", tongLoiLinhDong=" + getTongLoiLinhDong() +
            ", ngayPhanLoai='" + getNgayPhanLoai() + "'" +
            ", soLuong=" + getSoLuong() +
            ", tinhTrangBaoHanh='" + getTinhTrangBaoHanh() + "'" +
            "}";
    }
}
