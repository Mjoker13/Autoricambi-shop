package Final_project.finalproject.Repository;

import Final_project.finalproject.Entity.Marca;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface MarcaRepo extends JpaRepository<Marca,Integer>{
    List<Marca> findByNameContainingIgnoreCaseOrderByName(String name);
}
