package in.vijaykarthik.mlyfcycle;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GenericRestErrorHandler {

    @ExceptionHandler
    ResponseEntity<String> handle(Exception e) {
        e.printStackTrace();
        return new ResponseEntity<>("Error While processing the request", new HttpHeaders(), HttpStatus.BAD_REQUEST);
    }
}
