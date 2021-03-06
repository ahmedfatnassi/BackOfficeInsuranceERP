package com.ERP.authentification.repositories;

import com.ERP.authentification.Models.Board;
import com.ERP.authentification.Models.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {
}
