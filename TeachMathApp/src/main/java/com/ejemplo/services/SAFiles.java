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

import com.ejemplo.model.MyException;


@Service
public class SAFiles {

    private final Path basePath = Paths.get("C:","Users","vanfl","uploads");

    public void upload(String teacher_uname, MultipartFile file) {
        Path path = basePath.resolve(teacher_uname);
        try {
            // si no existe la carpeta, crearla
            if (!Files.exists(path)) 
                Files.createDirectories(path);
            
            // concatenacion de la ruta con el file, path/filename
            Path dest = path.resolve(file.getOriginalFilename());
            // guarda el contenido del file en dest (sobreescribe)
            Files.copy(file.getInputStream(), dest, StandardCopyOption.REPLACE_EXISTING);

        } catch (Exception e) {
            e.printStackTrace();
            throw new MyException("Error: " + e.getMessage(), 
                HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public List<String> getUploads(String teacher_uname) {
        try {
            Path path = basePath.resolve(teacher_uname).normalize();
            if (!Files.exists(path))
                throw new MyException("No existe path: " + path.toString(),
                    HttpStatus.NOT_FOUND);

            // directorio => lista de nombres de sus archivos
            List<String> fileNames = Files.list(path)
                .filter(Files::isRegularFile)
                .map(filepath -> filepath.getFileName().toString())
                .collect(Collectors.toList());

            return fileNames;

        } catch (Exception e) {
            throw new MyException("Error obteniendo los archivos",
                HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public Resource getFile(String teacher_uname, String filename) {
        try {
            Path path = basePath.resolve(teacher_uname).resolve(filename).normalize();
            Resource res = new UrlResource(path.toUri());

            if (!res.exists() || !res.isReadable()) 
                throw new MyException("No existe o no es legible: " + res.toString(), HttpStatus.NOT_FOUND);

            return res;

        } catch (Exception e) {
            throw new MyException("Error obteniendo el archivo.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
}
