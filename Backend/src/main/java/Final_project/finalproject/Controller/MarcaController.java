package Final_project.finalproject.Controller;

import Final_project.finalproject.Entity.Marca;
import Final_project.finalproject.Entity.Modelli;
import Final_project.finalproject.Repository.MarcaRepo;
import Final_project.finalproject.Repository.ModelliRepo;
import jakarta.validation.Valid;
import org.apache.logging.log4j.util.Strings;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/marche")
@CrossOrigin
public class MarcaController {
    @Autowired
    private MarcaRepo marcaRepo;
    @Autowired
    private ModelliRepo modelliRepo;

    @GetMapping
    public List<Marca> getMarche(@RequestParam (name = "keyword", required = false) String keyword){
        if (Strings.isNotBlank(keyword)){
            return  marcaRepo.findByNameContainingIgnoreCaseOrderByName(keyword);
        } else {
            return marcaRepo.findAll();
        }
    }

    @GetMapping("/{id}")
    public Marca getMarcaById(@PathVariable Integer id){
        Optional<Marca> result= marcaRepo.findById(id);
        if(result.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Not found this ID");
        }else{
          return result.get();
        }
    }

    @PostMapping
    public Marca postMarca(@Valid @RequestBody @NotNull Marca newMarca){
        newMarca.setId(0);
        return marcaRepo.save(newMarca);
    }

    @DeleteMapping("/{id}")
    public List<Marca> deleteMarcaById(@PathVariable Integer id){
        Optional<Marca> result = marcaRepo.findById(id);
        if (result.isPresent()) {
            Marca marca = result.get();
            marcaRepo.delete(marca);
            return marcaRepo.findAll();
        } else{
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public Marca putMarca(@PathVariable Integer id, @Valid @RequestBody Marca putMarca){
        Optional<Marca> result= marcaRepo.findById(id);
        if(result.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Not found this ID");
        }else {
            Marca putMarca2 = result.get();
            putMarca2.setId(id);
            putMarca2.setImage(putMarca.getImage());
            putMarca2.setName(putMarca.getName());
            putMarca2.setYearOfFondation(putMarca.getYearOfFondation());
            return marcaRepo.save(putMarca2);
        }
    }

    @PostMapping("/{id}/model")
    public Modelli createUserTask(@Valid @RequestBody Modelli model, @PathVariable Integer id) {
        Optional<Marca> result = marcaRepo.findById(id);
        if (result.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Marca with id " + id + " not found");
        } else {
            Modelli newModel = new Modelli();
            newModel.setMarca(result.get());
            newModel.setId(0);
            newModel.setName(model.getName());
            newModel.setYearOfProduction(model.getYearOfProduction());
            return modelliRepo.save(newModel);
        }
    }
}
