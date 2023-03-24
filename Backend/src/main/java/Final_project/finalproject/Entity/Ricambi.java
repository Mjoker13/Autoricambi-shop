package Final_project.finalproject.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

import java.util.List;

@Entity
@Table(name="ricambi")
public class Ricambi {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @NotBlank(message = "name must not be blank")
    private String name;
    private double price;
   // private String model_compatible;
    @NotBlank
    private String category;
    private int quantity;
    private String reference;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "modelli_id", nullable = false)
    @JsonIgnore
    private Modelli modelli;

    public Ricambi() {
    }

    public Ricambi(int id, String name, double price, String category, int quantity, String reference, Modelli modelli) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.category = category;
        this.quantity = quantity;
        this.reference = reference;
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

    public String getReference() {
        return reference;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Modelli getModelli() {
        return modelli;
    }

    public void setModelli(Modelli modelli) {
        this.modelli = modelli;
    }

    @Override
    public String toString() {
        return "Ricambi{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", price=" + price +
                ", category='" + category + '\'' +
                ", quantity=" + quantity +
                ", reference='" + reference + '\'' +
                ", modelli=" + modelli +
                '}';
    }
}

