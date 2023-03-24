package Final_project.finalproject.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;


import java.util.List;

@Entity
@Table(name="marca_auto")
public class Marca {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @NotBlank(message = ("name must not be blanke"))
    private String name;
    private String image;
    private int yearOfFondation;
    @OneToMany(mappedBy = "marca",cascade = CascadeType.ALL)
    private List<Modelli> modelli;

    public Marca() {
    }

    public Marca(int id, String name, String image, int yearOfFondation,  List<Modelli> modelli) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.yearOfFondation = yearOfFondation;
        this.modelli = modelli;
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

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public int getYearOfFondation() {
        return yearOfFondation;
    }

    public void setYearOfFondation(int yearOfFondation) {
        this.yearOfFondation = yearOfFondation;
    }

    public List<Modelli> getModelli() {
        return modelli;
    }

    public void setModelli(List<Modelli> modelli) {
        this.modelli = modelli;
    }

    @Override
    public String toString() {
        return "Marca{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", image='" + image + '\'' +
                ", yearOfFondation=" + yearOfFondation +
                ", modelli=" + modelli +
                '}';
    }
}
