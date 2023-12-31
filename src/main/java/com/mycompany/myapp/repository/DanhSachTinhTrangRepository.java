package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.DanhSachTinhTrang;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the DanhSachTinhTrang entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DanhSachTinhTrangRepository extends JpaRepository<DanhSachTinhTrang, Long> {}
