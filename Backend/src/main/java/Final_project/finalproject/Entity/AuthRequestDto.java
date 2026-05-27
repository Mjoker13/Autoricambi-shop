package Final_project.finalproject.Entity;

import jakarta.validation.constraints.NotBlank;

public class AuthRequestDto {

    @NotBlank(message = "username obbligatorio")
    private String username;

    @NotBlank(message = "password obbligatoria")
    private String password;

    public AuthRequestDto() {}

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
