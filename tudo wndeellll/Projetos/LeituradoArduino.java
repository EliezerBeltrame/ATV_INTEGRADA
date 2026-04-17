package com.sensor.service;

import com.fazecast.jSerialComm.SerialPort;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

@Service
public class SerialService {

    private float temperatura = 0;
    private float umidade = 0;

    @PostConstruct
    public void iniciar() {

        SerialPort porta = SerialPort.getCommPort("COM6"); // ⚠️ TROCAR

        porta.setBaudRate(115200);

        if (!porta.openPort()) {
            System.out.println("Erro ao abrir a porta!");
            return;
        }

        System.out.println("Arduino conectado!");

        new Thread(() -> {
            StringBuilder buffer = new StringBuilder();

            while (true) {
                byte[] leitura = new byte[1024];
                int numBytes = porta.readBytes(leitura, leitura.length);

                if (numBytes > 0) {
                    String recebido = new String(leitura, 0, numBytes);

                    buffer.append(recebido);

                    // Processa linha completa
                    if (buffer.toString().contains("\n")) {

                        String linha = buffer.toString().trim();
                        buffer.setLength(0);

                        try {
                            String[] valores = linha.split(",");

                            if (valores.length == 2) {
                                temperatura = Float.parseFloat(valores[0]);
                                umidade = Float.parseFloat(valores[1]);

                                System.out.println(
                                    "Temp: " + temperatura +
                                    " | Umidade: " + umidade
                                );
                            }

                        } catch (Exception e) {
                            System.out.println("Erro ao converter dados");
                        }
                    }
                }
            }
        }).start();
    }

    public float getTemperatura() {
        return temperatura;
    }

    public float getUmidade() {
        return umidade;
    }
}