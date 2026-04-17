package com.sensor.controller;

import com.sensor.service.SerialService;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin // libera pro front acessar
public class SensorController {

    private final SerialService serialService;

    public SensorController(SerialService serialService) {
        this.serialService = serialService;
    }

    @GetMapping("/dados")
    public Map<String, Float> getDados() {

        Map<String, Float> resposta = new HashMap<>();
        resposta.put("temperatura", serialService.getTemperatura());
        resposta.put("umidade", serialService.getUmidade());

        return resposta;
    }
}