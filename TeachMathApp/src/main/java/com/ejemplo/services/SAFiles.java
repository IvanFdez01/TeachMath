package com.ejemplo.services;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


@Service
public class SAFiles {

    private final Path basePath = Paths.get("C:","Users","vanfl","uploads");

    public ResponseEntity<?> upload(String teacher_uname, MultipartFile file) {
        Path path = basePath.resolve(teacher_uname);
        try {
            // si no existe la carpeta, crearla
            if (!Files.exists(path)) 
                Files.createDirectories(path);
            
            // concatenacion de la ruta con el file, path/filename
            Path dest = path.resolve(file.getOriginalFilename());
            // guarda el contenido del file en dest (sobreescribe)
            Files.copy(file.getInputStream(), dest, StandardCopyOption.REPLACE_EXISTING);

            return ResponseEntity.ok()
                .body("Guardado en: " + dest.toString());

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error: " + e.getMessage());
        }
    }

    public ResponseEntity<?> getMyFiles(String teacher_uname) {
        try {
            Path path = basePath.resolve(teacher_uname).normalize();
            if (!Files.exists(path))
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Error obteniendo los archivos");

            // directorio => lista de nombres de sus archivos
            List<String> fileNames = Files.list(path)
                .filter(Files::isRegularFile)
                .map(filepath -> filepath.getFileName().toString())
                .collect(Collectors.toList());

            return ResponseEntity.ok(fileNames);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error obteniendo los archivos");
        }
    }

    public ResponseEntity<?> getFile(String teacher_uname, String filename) {
        try {
            Path path = basePath.resolve(teacher_uname).resolve(filename).normalize();
            Resource res = new UrlResource(path.toUri());

            if (!res.exists() || !res.isReadable()) 
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();

            return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + filename + "\"")
                .body(res);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
