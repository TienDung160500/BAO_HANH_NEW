package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.TinhThanh;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the TinhThanh entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TinhThanhRepository extends JpaRepository<TinhThanh, Long> {}
