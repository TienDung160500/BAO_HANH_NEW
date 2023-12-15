package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;

/**
 * A PhanTichSanPham.
 */
@Entity
@Table(name = "phan_tich_san_pham")
public class PhanTichSanPham implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "ten_nhan_vien_phan_tich")
    private String tenNhanVienPhanTich;

    @Column(name = "the_loai_phan_tich")
    private String theLoaiPhanTich;

    @Column(name = "lot_number")
    private String lotNumber;

    @Column(name = "detail")
    private String detail;

    @Column(name = "so_luong")
    private Integer soLuong;

    @Column(name = "ngay_kiem_tra")
    private ZonedDateTime ngayKiemTra;

    @Column(name = "username")
    private String username;

    @Column(name = "nam_san_xuat")
    private String namSanXuat;

    @Column(name = "trang_thai")
    private String trangThai;

    @OneToMany(mappedBy = "phanTichSanPham")
    @JsonIgnoreProperties(value = { "loi", "phanTichSanPham" }, allowSetters = true)
    private Set<PhanTichLoi> phanTichLois = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "phanTichSanPhams", "sanPham", "donBaoHanh", "phanLoaiChiTietTiepNhan" }, allowSetters = true)
    private ChiTietSanPhamTiepNhan chiTietSanPhamTiepNhan;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public PhanTichSanPham id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTenNhanVienPhanTich() {
        return this.tenNhanVienPhanTich;
    }

    public PhanTichSanPham tenNhanVienPhanTich(String tenNhanVienPhanTich) {
        this.setTenNhanVienPhanTich(tenNhanVienPhanTich);
        return this;
    }

    public void setTenNhanVienPhanTich(String tenNhanVienPhanTich) {
        this.tenNhanVienPhanTich = tenNhanVienPhanTich;
    }

    public String getTheLoaiPhanTich() {
        return this.theLoaiPhanTich;
    }

    public PhanTichSanPham theLoaiPhanTich(String theLoaiPhanTich) {
        this.setTheLoaiPhanTich(theLoaiPhanTich);
        return this;
    }

    public void setTheLoaiPhanTich(String theLoaiPhanTich) {
        this.theLoaiPhanTich = theLoaiPhanTich;
    }

    public String getLotNumber() {
        return this.lotNumber;
    }

    public PhanTichSanPham lotNumber(String lotNumber) {
        this.setLotNumber(lotNumber);
        return this;
    }

    public void setLotNumber(String lotNumber) {
        this.lotNumber = lotNumber;
    }

    public String getDetail() {
        return this.detail;
    }

    public PhanTichSanPham detail(String detail) {
        this.setDetail(detail);
        return this;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    public Integer getSoLuong() {
        return this.soLuong;
    }

    public PhanTichSanPham soLuong(Integer soLuong) {
        this.setSoLuong(soLuong);
        return this;
    }

    public void setSoLuong(Integer soLuong) {
        this.soLuong = soLuong;
    }

    public ZonedDateTime getNgayKiemTra() {
        return this.ngayKiemTra;
    }

    public PhanTichSanPham ngayKiemTra(ZonedDateTime ngayKiemTra) {
        this.setNgayKiemTra(ngayKiemTra);
        return this;
    }

    public void setNgayKiemTra(ZonedDateTime ngayKiemTra) {
        this.ngayKiemTra = ngayKiemTra;
    }

    public String getUsername() {
        return this.username;
    }

    public PhanTichSanPham username(String username) {
        this.setUsername(username);
        return this;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getNamSanXuat() {
        return this.namSanXuat;
    }

    public PhanTichSanPham namSanXuat(String namSanXuat) {
        this.setNamSanXuat(namSanXuat);
        return this;
    }

    public void setNamSanXuat(String namSanXuat) {
        this.namSanXuat = namSanXuat;
    }

    public String getTrangThai() {
        return this.trangThai;
    }

    public PhanTichSanPham trangThai(String trangThai) {
        this.setTrangThai(trangThai);
        return this;
    }

    public void setTrangThai(String trangThai) {
        this.trangThai = trangThai;
    }

    public Set<PhanTichLoi> getPhanTichLois() {
        return this.phanTichLois;
    }

    public void setPhanTichLois(Set<PhanTichLoi> phanTichLois) {
        if (this.phanTichLois != null) {
            this.phanTichLois.forEach(i -> i.setPhanTichSanPham(null));
        }
        if (phanTichLois != null) {
            phanTichLois.forEach(i -> i.setPhanTichSanPham(this));
        }
        this.phanTichLois = phanTichLois;
    }

    public PhanTichSanPham phanTichLois(Set<PhanTichLoi> phanTichLois) {
        this.setPhanTichLois(phanTichLois);
        return this;
    }

    public PhanTichSanPham addPhanTichLoi(PhanTichLoi phanTichLoi) {
        this.phanTichLois.add(phanTichLoi);
        phanTichLoi.setPhanTichSanPham(this);
        return this;
    }

    public PhanTichSanPham removePhanTichLoi(PhanTichLoi phanTichLoi) {
        this.phanTichLois.remove(phanTichLoi);
        phanTichLoi.setPhanTichSanPham(null);
        return this;
    }

    public ChiTietSanPhamTiepNhan getChiTietSanPhamTiepNhan() {
        return this.chiTietSanPhamTiepNhan;
    }

    public void setChiTietSanPhamTiepNhan(ChiTietSanPhamTiepNhan chiTietSanPhamTiepNhan) {
        this.chiTietSanPhamTiepNhan = chiTietSanPhamTiepNhan;
    }

    public PhanTichSanPham chiTietSanPhamTiepNhan(ChiTietSanPhamTiepNhan chiTietSanPhamTiepNhan) {
        this.setChiTietSanPhamTiepNhan(chiTietSanPhamTiepNhan);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PhanTichSanPham)) {
            return false;
        }
        return id != null && id.equals(((PhanTichSanPham) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PhanTichSanPham{" +
            "id=" + getId() +
            ", tenNhanVienPhanTich='" + getTenNhanVienPhanTich() + "'" +
            ", theLoaiPhanTich='" + getTheLoaiPhanTich() + "'" +
            ", lotNumber='" + getLotNumber() + "'" +
            ", detail='" + getDetail() + "'" +
            ", soLuong=" + getSoLuong() +
            ", ngayKiemTra='" + getNgayKiemTra() + "'" +
            ", username='" + getUsername() + "'" +
            ", namSanXuat='" + getNamSanXuat() + "'" +
            ", trangThai='" + getTrangThai() + "'" +
            "}";
    }
}
