package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;

/**
 * A PhanLoaiChiTietTiepNhan.
 */
@Entity
@Table(name = "phan_loai_chi_tiet_tiep_nhan")
public class PhanLoaiChiTietTiepNhan implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "so_luong")
    private Integer soLuong;

    @OneToMany(mappedBy = "phanLoaiChiTietTiepNhan")
    @JsonIgnoreProperties(value = { "phanTichSanPhams", "sanPham", "donBaoHanh", "phanLoaiChiTietTiepNhan" }, allowSetters = true)
    private Set<ChiTietSanPhamTiepNhan> chiTietSanPhamTiepNhans = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "phanLoaiChiTietTiepNhans" }, allowSetters = true)
    private DanhSachTinhTrang danhSachTinhTrang;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public PhanLoaiChiTietTiepNhan id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getSoLuong() {
        return this.soLuong;
    }

    public PhanLoaiChiTietTiepNhan soLuong(Integer soLuong) {
        this.setSoLuong(soLuong);
        return this;
    }

    public void setSoLuong(Integer soLuong) {
        this.soLuong = soLuong;
    }

    public Set<ChiTietSanPhamTiepNhan> getChiTietSanPhamTiepNhans() {
        return this.chiTietSanPhamTiepNhans;
    }

    public void setChiTietSanPhamTiepNhans(Set<ChiTietSanPhamTiepNhan> chiTietSanPhamTiepNhans) {
        if (this.chiTietSanPhamTiepNhans != null) {
            this.chiTietSanPhamTiepNhans.forEach(i -> i.setPhanLoaiChiTietTiepNhan(null));
        }
        if (chiTietSanPhamTiepNhans != null) {
            chiTietSanPhamTiepNhans.forEach(i -> i.setPhanLoaiChiTietTiepNhan(this));
        }
        this.chiTietSanPhamTiepNhans = chiTietSanPhamTiepNhans;
    }

    public PhanLoaiChiTietTiepNhan chiTietSanPhamTiepNhans(Set<ChiTietSanPhamTiepNhan> chiTietSanPhamTiepNhans) {
        this.setChiTietSanPhamTiepNhans(chiTietSanPhamTiepNhans);
        return this;
    }

    public PhanLoaiChiTietTiepNhan addChiTietSanPhamTiepNhan(ChiTietSanPhamTiepNhan chiTietSanPhamTiepNhan) {
        this.chiTietSanPhamTiepNhans.add(chiTietSanPhamTiepNhan);
        chiTietSanPhamTiepNhan.setPhanLoaiChiTietTiepNhan(this);
        return this;
    }

    public PhanLoaiChiTietTiepNhan removeChiTietSanPhamTiepNhan(ChiTietSanPhamTiepNhan chiTietSanPhamTiepNhan) {
        this.chiTietSanPhamTiepNhans.remove(chiTietSanPhamTiepNhan);
        chiTietSanPhamTiepNhan.setPhanLoaiChiTietTiepNhan(null);
        return this;
    }

    public DanhSachTinhTrang getDanhSachTinhTrang() {
        return this.danhSachTinhTrang;
    }

    public void setDanhSachTinhTrang(DanhSachTinhTrang danhSachTinhTrang) {
        this.danhSachTinhTrang = danhSachTinhTrang;
    }

    public PhanLoaiChiTietTiepNhan danhSachTinhTrang(DanhSachTinhTrang danhSachTinhTrang) {
        this.setDanhSachTinhTrang(danhSachTinhTrang);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PhanLoaiChiTietTiepNhan)) {
            return false;
        }
        return id != null && id.equals(((PhanLoaiChiTietTiepNhan) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PhanLoaiChiTietTiepNhan{" +
            "id=" + getId() +
            ", soLuong=" + getSoLuong() +
            "}";
    }
}
