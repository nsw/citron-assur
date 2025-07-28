package com.citronassur.backend.service;

import com.citronassur.backend.model.Product;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SimpleProductService {
    
    private final ObjectMapper objectMapper = new ObjectMapper();
    private Map<String, List<Map<String, Object>>> allProducts = new HashMap<>();
    
    @PostConstruct
    public void loadProducts() throws IOException {
        // Load all product types
        loadProductType("assurance-vie");
        loadProductType("per-individuel");
        loadProductType("contrat-madelin");
        loadProductType("contrat-capitalisation");
        loadProductType("prevoyance-mixte");
        loadProductType("rente-viagere");
    }
    
    private void loadProductType(String type) throws IOException {
        InputStream stream = getClass().getResourceAsStream("/data/" + type + ".json");
        if (stream != null) {
            List<Map<String, Object>> products = objectMapper.readValue(stream, new TypeReference<List<Map<String, Object>>>() {});
            allProducts.put(type, products);
        }
    }
    
    public List<Product> getAllProducts() {
        List<Product> products = new ArrayList<>();
        
        for (Map.Entry<String, List<Map<String, Object>>> entry : allProducts.entrySet()) {
            String type = entry.getKey();
            for (Map<String, Object> data : entry.getValue()) {
                Product product = new Product();
                product.setId((String) data.get("id"));
                product.setNom_commercial((String) data.get("nom_commercial"));
                product.setType(type);
                product.setData(data);
                products.add(product);
            }
        }
        
        return products;
    }
    
    public List<Map<String, Object>> getProductsByType(String type) {
        return allProducts.getOrDefault(type, new ArrayList<>());
    }
    
    public Map<String, Object> getProductById(String type, String id) {
        List<Map<String, Object>> products = allProducts.get(type);
        if (products != null) {
            for (Map<String, Object> product : products) {
                if (id.equals(product.get("id"))) {
                    return product;
                }
            }
        }
        return null;
    }
}