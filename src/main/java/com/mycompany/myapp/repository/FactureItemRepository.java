package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.FactureItem;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the FactureItem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FactureItemRepository extends JpaRepository<FactureItem, Long> {
}
