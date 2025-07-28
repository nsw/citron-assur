package com.citronassur.backend.controller;

import com.citronassur.backend.model.Product;
import com.citronassur.backend.service.SimpleProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/products")
@Tag(name = "Products", description = "API for managing all insurance products")
public class ProductController {
    
    @Autowired
    private SimpleProductService productService;
    
    @GetMapping
    @Operation(summary = "Get all products", 
               description = "Returns a list of all available insurance products")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved list"),
        @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }
    
    @GetMapping("/{type}")
    @Operation(summary = "Get products by type", 
               description = "Returns a list of products filtered by type")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved list"),
        @ApiResponse(responseCode = "404", description = "Product type not found"),
        @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public ResponseEntity<List<Map<String, Object>>> getProductsByType(
            @Parameter(description = "Type of products to retrieve") 
            @PathVariable String type) {
        List<Map<String, Object>> products = productService.getProductsByType(type);
        if (products.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(products);
    }
    
    @GetMapping("/{type}/{id}")
    @Operation(summary = "Get product by type and ID", 
               description = "Returns a single product by its type and ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved product"),
        @ApiResponse(responseCode = "404", description = "Product not found"),
        @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public ResponseEntity<Map<String, Object>> getProductById(
            @Parameter(description = "Type of the product") 
            @PathVariable String type,
            @Parameter(description = "ID of the product to retrieve") 
            @PathVariable String id) {
        Map<String, Object> product = productService.getProductById(type, id);
        if (product != null) {
            return ResponseEntity.ok(product);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}