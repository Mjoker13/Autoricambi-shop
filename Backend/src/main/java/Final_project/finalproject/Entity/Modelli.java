package Final_project.finalproject.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PastOrPresent;

import java.util.List;

@Entity
@Table(name="modelli")
public class Modelli {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @NotBlank(message = "name must not be blank")
    private String name;
    private int yearOfProduction;
    private String image;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "marca_id", nullable = false)
    @JsonIgnore
    private Marca marca;
    @OneToMany(mappedBy = "modelli",cascade = CascadeType.ALL)
    private List<Ricambi> ricambi;

    public Modelli() {
    }

    public Modelli(int id, String name, int yearOfProduction, String image, Marca marca, List<Ricambi> ricambi) {
        this.id = id;
        this.name = name;
        this.yearOfProduction = yearOfProduction;
        this.image = image;
        this.marca = marca;
        this.ricambi = ricambi;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getYearOfProduction() {
        return yearOfProduction;
    }

    public void setYearOfProduction(int yearOfProduction) {
        this.yearOfProduction = yearOfProduction;
    }

    public Marca getMarca() {
        return marca;
    }

    public void setMarca(Marca marca) {
        this.marca = marca;
    }

    public List<Ricambi> getRicambi() {
        return ricambi;
    }

    public void setRicambi(List<Ricambi> ricambi) {
        this.ricambi= ricambi;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
