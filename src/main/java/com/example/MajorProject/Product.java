package com.example.MajorProject;

public class Product {
    private int ProductId;
    private String ProductName;
    private String Category;
    private int CompanyId;
    private double Price;
    private String Features;
    private int Rating;
    private String CompanyName;
    
    public String getCompanyName() {
        return CompanyName;
    }
    public void setCompanyName(String companyName) {
        CompanyName = companyName;
    }
    public int getRating() {
        return Rating;
    }
    public void setRating(int rating) {
        Rating = rating;
    }
    public int getProductId() {
        return ProductId;
    }
    public void setProductId(int productId) {
        ProductId = productId;
    }
    public String getCategory() {
        return Category;
    }
    public void setCategory(String category) {
        Category = category;
    }
    public int getCompanyId() {
        return CompanyId;
    }
    public void setCompanyId(int companyId) {
        CompanyId = companyId;
    }
    public double getPrice() {
        return Price;
    }
    public void setPrice(double price) {
        Price = price;
    }
    public String getFeatures() {
        return Features;
    }
    public void setFeatures(String features) {
        Features = features;
    }
    public void setProductName(String productName) {
        ProductName = productName;
    }
    public String getProductName() {
        return ProductName;
    }
}
