package Final_project.finalproject.Repository;

import Final_project.finalproject.Entity.Marca;
import Final_project.finalproject.Entity.Modelli;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ModelliRepo extends JpaRepository<Modelli,Integer> {

    List<Modelli> findByNameContainingOrderByName(String name);
  //  List<Modelli> findByYearOfProductionGreaterThanEqual(String s);

}
