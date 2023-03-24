package Final_project.finalproject.Controller;

import Final_project.finalproject.Entity.Marca;
import Final_project.finalproject.Entity.Modelli;
import Final_project.finalproject.Entity.Ricambi;
import Final_project.finalproject.Repository.MarcaRepo;
import Final_project.finalproject.Repository.ModelliRepo;
import Final_project.finalproject.Repository.RicambiRepo;
import jakarta.validation.Valid;
import org.apache.logging.log4j.util.Strings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/modelli")
@CrossOrigin
public class ModelliController {

    @Autowired
    private ModelliRepo modelliRepo;
    @Autowired
    private MarcaRepo marcaRepo;
    @Autowired
    private RicambiRepo ricambiRepo;

    @GetMapping
    public List<Modelli> getAllModelli(@RequestParam(name = "keyword", required = false) String s){
        if (Strings.isNotBlank(s)) {
            return modelliRepo.findByNameContainingOrderByName(s);
        }
        else {
            return modelliRepo.findAll();
        }
    }

    @PostMapping("/{id}")
    public Modelli createModel (@RequestBody Modelli m, @PathVariable Integer id){
        Optional<Marca> result = marcaRepo.findById(id);
        if(result.isPresent()){
            m.setMarca(result.get());
            return modelliRepo.save(m);
        }else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND) ;
        }
    }

    @DeleteMapping("/{id}")
    public List<Modelli> deleteModel(@PathVariable Integer id) {
        Optional<Modelli> result = modelliRepo.findById(id);
        if (result.isPresent()) {
            Modelli m = result.get();
            modelliRepo.delete(m);
            return modelliRepo.findAll();
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{marca_id}/{id}")
    public Modelli puModel(@RequestBody Modelli m,@PathVariable Integer id, @PathVariable Integer marca_id){
        Optional<Marca> marcaRes = marcaRepo.findById(marca_id);
        if(marcaRes.isPresent()) {
            Marca ma = marcaRes.get();
            Optional<Modelli> result = modelliRepo.findById(id);
            if (result.isPresent()) {
                Modelli m2 = result.get();
                m2.setMarca(ma);
                m2.setName(m.getName());
                m2.setYearOfProduction(m.getYearOfProduction());
                m2.setImage(m.getImage());
                m2.setRicambi(m.getRicambi());
                m2.setId(id);
                return modelliRepo.save(m2);
            } else {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND);
            }
        }else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }


// costanza tag
   /* @PostMapping("/{id}/ricambi")
    public List<Ricambi> addRicambi(@PathVariable Integer id, @RequestBody Ricambi ricambi) {
        Optional<Modelli> result = modelliRepo.findById(id);
        if (result.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "task with id " + id + " not found");
        } else {
            Modelli mode = result.get();

            Optional<Ricambi> resultRica = Optional.ofNullable(ricambiRepo.findByIdIgnoreCase(ricambi.getId()));
            Ricambi ricambiToAdd = new Ricambi();
            ricambiToAdd.setId(ricambi.getId());
            if (resultRica.isPresent() && resultRica.get().equals(ricambi)) {
                ricambiToAdd = resultRica.get();
            } else {
                Ricambi ricambiToCreate = new Ricambi();

                ricambiToAdd = ricambiRepo.save(ricambiToCreate);
            }
            if (mode.getRicambi() == null) {
                mode.setRicambi((List<Ricambi>) new HashSet<Ricambi>());
            }
            if (ricambiToAdd.getModelli() == null) {
                ricambiToAdd.setModelli((List<Modelli>) new HashSet<Modelli>());
            }

            mode.getRicambi().add(ricambiToAdd);
            ricambiToAdd.getModelli().add(mode);
            modelliRepo.save(mode);
            return mode.getRicambi();
        }
    }*/

}
