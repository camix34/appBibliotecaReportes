package com.example.sistemabiblioteca.Controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
public class BibliotecaController {
    @GetMapping("/home")

    public String home(){
        return "index";
    }

    @GetMapping ("/text")
    @ResponseBody
    public String textoplano(){
        return "hola texto plano";
    }
}
