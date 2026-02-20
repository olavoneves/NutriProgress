package br.com.api.server.avaliation.repository;

import br.com.api.server.avaliation.domain.model.Avaliation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface AvaliationRepository extends JpaRepository<Avaliation, UUID> {

}
