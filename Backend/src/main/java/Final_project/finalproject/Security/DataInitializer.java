package Final_project.finalproject.Security;

import Final_project.finalproject.Entity.User;
import Final_project.finalproject.Repository.UserRepo;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * Crea l'utente admin al primo avvio se non esiste.
 * Credenziali di default: admin / admin123
 * CAMBIA la password dopo il primo accesso!
 */
@Component
public class DataInitializer {

    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepo userRepo, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @PostConstruct
    public void init() {
        if (userRepo.findByUsername("admin").isEmpty()) {
            User admin = new User(
                    "admin",
                    passwordEncoder.encode("admin123"),
                    "ADMIN"
            );
            userRepo.save(admin);
            log.info("Utente admin creato. Username: admin — CAMBIA LA PASSWORD!");
        } else {
            log.info("Utente admin già presente.");
        }
    }
}
