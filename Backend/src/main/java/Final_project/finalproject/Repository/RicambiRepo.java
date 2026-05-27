package Final_project.finalproject.Repository;

import Final_project.finalproject.Entity.Ricambi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RicambiRepo extends JpaRepository<Ricambi, Integer> {

    List<Ricambi> findByNameContainingOrCategoryContainingOrReferenceContainingOrderByName(
            String name, String category, String reference
    );

    /**
     * Decrementa la quantità in modo atomico solo se > 0.
     * Ritorna il numero di righe aggiornate:
     *   - 1 → successo
     *   - 0 → esaurito (race condition: un altro utente ha comprato l'ultimo pezzo)
     *
     * UPDATE è atomico a livello DB: nessun overselling anche con N acquirenti simultanei.
     */
    @Modifying
    @Query("UPDATE Ricambi r SET r.quantity = r.quantity - 1 WHERE r.id = :id AND r.quantity > 0")
    int decrementQuantityIfAvailable(@Param("id") Integer id);
}
