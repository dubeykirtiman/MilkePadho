package com.milkepadho.MilkePadho.repositories;

import com.milkepadho.MilkePadho.entities.Doubt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DoubtRepository extends JpaRepository<Doubt, Long> {
}
