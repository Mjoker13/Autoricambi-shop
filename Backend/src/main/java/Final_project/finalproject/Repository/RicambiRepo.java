package Final_project.finalproject.Repository;

import Final_project.finalproject.Entity.Marca;
import Final_project.finalproject.Entity.Modelli;
import Final_project.finalproject.Entity.Ricambi;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface RicambiRepo extends JpaRepository<Ricambi,Integer> {
   // List<Ricambi> findByNameAndCategoryEqualsIgnoreCase(String s);
    List<Ricambi> findByNameContainingOrCategoryContainingOrReferenceContainingOrderByName(String name, String category, String reference);
}
