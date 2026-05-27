package Final_project.finalproject.Controller;

import Final_project.finalproject.Entity.Modelli;
import Final_project.finalproject.Entity.Ricambi;
import Final_project.finalproject.Repository.ModelliRepo;
import Final_project.finalproject.Repository.RicambiRepo;
import org.apache.logging.log4j.util.Strings;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/v1/ricambi")
public class RicambiController {

    private static final Logger log = LoggerFactory.getLogger(RicambiController.class);

    @Autowired
    private RicambiRepo ricambiRepo;
    @Autowired
    private ModelliRepo modelliRepo;

    @GetMapping
    public List<Ricambi> getAllRicambi(@RequestParam(name = "keyword", required = false) String s) {
        if (Strings.isNotBlank(s)) {
            return ricambiRepo.findByNameContainingOrCategoryContainingOrReferenceContainingOrderByName(s, s,s);
        } else {
            return ricambiRepo.findAll();
        }
    }

    @GetMapping("/{id}")
    public Ricambi getRicambiById(@PathVariable Integer id){
        Optional<Ricambi> r = ricambiRepo.findById(id);
        if(r.isPresent()){
            return r.get();
        }else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/{id}")
    public Ricambi createRicambi(@RequestBody Ricambi ricambi, @PathVariable Integer id) {
        Optional<Modelli> result = modelliRepo.findById(id);
        if (result.isPresent()) {
            ricambi.setModelli(result.get());
            return ricambiRepo.save(ricambi);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public boolean deleteRicambi(@PathVariable Integer id) {
        Optional<Ricambi> r = ricambiRepo.findById(id);
        if (r.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        } else {
            ricambiRepo.deleteById(id);
            return true;
        }
    }

    @PutMapping("/{id}")
    public Ricambi putRicambi(@RequestBody Ricambi ricambi, @PathVariable Integer id) {
            Optional<Ricambi> result = ricambiRepo.findById(id);
            if (result.isPresent()) {
                Ricambi r2 = result.get();
                r2.setName(ricambi.getName());
                r2.setCategory(ricambi.getCategory());
                r2.setQuantity(ricambi.getQuantity());
                r2.setPrice(ricambi.getPrice());
                r2.setReference(ricambi.getReference());
                r2.setId(id);
                return ricambiRepo.save(r2);
            } else {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND);
            }
    }

    /**
     * POST /api/v1/ricambi/{id}/purchase
     *
     * Acquisto atomico: decrementa la quantità di 1 se disponibile.
     * Usato dal frontend al momento del checkout.
     *
     * Risposta:
     *   200 OK    → acquisto OK, ritorna il ricambio aggiornato
     *   409 Conflict → esaurito (un altro utente ha comprato l'ultimo pezzo)
     *   404 Not Found → id non esiste
     *
     * L'operazione è transazionale e usa una UPDATE atomica a livello DB:
     * nessun overselling anche con N acquirenti simultanei sullo stesso ricambio.
     */
    @PostMapping("/{id}/purchase")
    @Transactional
    public Ricambi purchaseRicambi(@PathVariable Integer id) {
        if (!ricambiRepo.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Ricambio non trovato");
        }
        int updated = ricambiRepo.decrementQuantityIfAvailable(id);
        if (updated == 0) {
            log.warn("Tentativo di acquisto su ricambio esaurito id={}", id);
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "Ricambio non disponibile: quantità esaurita");
        }
        log.info("Acquisto completato per ricambio id={}", id);
        return ricambiRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/{modelli_id}/{id}")
    public Ricambi putRicambi(@RequestBody Ricambi ricambi, @PathVariable Integer id, @PathVariable Integer modelli_id) {
        Optional<Modelli> modelli = modelliRepo.findById(modelli_id);
        if (modelli.isPresent()) {
            Modelli mo = modelli.get();
            Optional<Ricambi> result = ricambiRepo.findById(id);
            if (result.isPresent()) {
                Ricambi r2 = result.get();
                r2.setModelli(mo);
                r2.setName(ricambi.getName());
                r2.setCategory(ricambi.getCategory());
                r2.setQuantity(ricambi.getQuantity());
                r2.setPrice(ricambi.getPrice());
                r2.setReference(ricambi.getReference());
                r2.setId(id);
                return ricambiRepo.save(r2);
            } else {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND);
            }
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }
}
   /* @PutMapping("/{id}")
    public Ricambi putRicambi(@RequestBody Ricambi r, @PathVariable Integer id){
        Optional<Ricambi> result = ricambiRepo.findById(id);
        if(result.isPresent()){
            Ricambi r2 = result.get();
            r2.setId(r.getId());
            r2.setName(r.getName());
            r2.setCategory(r.getCategory());
            r2.setPrice(r.getPrice());
            r2.setModelli(r.getModelli());
            r2.setReference(r.getReference());
            return ricambiRepo.save(r2);
        }else {
            throw  new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }*/

  /* @GetMapping("/dto")
    public List<RicambiDTO> getRicambiDto(@RequestParam(name = "keyword", required = false) String s){
        List<Ricambi> r = ricambiRepo.findAll();
        List<RicambiDTO> rdto = new ArrayList<>();
        if(r.isEmpty()){
            return rdto;
        }else {
            int index = 0;
            for (Ricambi ricambi: r) {
                RicambiDTO ricambiDTO = new RicambiDTO();
                ricambiDTO.setName(ricambi.getName());
                ricambiDTO.setId(ricambi.getId());
                ricambiDTO.setCategory(ricambi.getCategory());
                ricambiDTO.setQuantity(ricambi.getQuantity());
                ricambiDTO.setPrice(ricambi.getPrice());
                ricambiDTO.setModelli(ricambi.getModelli().getId());
                rdto.add(index,ricambiDTO);
                index++;
            }
            return rdto;
        }
    }

    @PostMapping("/dto")
    public Ricambi postDto(@RequestBody RicambiDTO ricambiDTO){
        Optional<Modelli> m = modelliRepo.findById(ricambiDTO.getModelli());
        RicambiDTO rdto = ricambiDTO;
        Ricambi r = new Ricambi();
        r.setModelli(m.get());
        r.setQuantity(ricambiDTO.getQuantity());
        r.setName(ricambiDTO.getName());
        r.setPrice(ricambiDTO.getPrice());
        r.setCategory(ricambiDTO.getCategory());
        return ricambiRepo.save(r);
    }

    @DeleteMapping("/dto/{id}")
    public boolean deleteDto(@PathVariable Integer id){
       RicambiDTO rdto = new RicambiDTO();
        Optional<Ricambi> r = ricambiRepo.findById(id);
        rdto = r.get().getId();
    }*/
