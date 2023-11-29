import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class KafkaConsumerService {

    @KafkaListener(topics = "bgh")
    public void consumeMessage(String message) {
        // Process the received message
        System.out.println("Received message: " + message);
        // Perform your business logic here
    }
}