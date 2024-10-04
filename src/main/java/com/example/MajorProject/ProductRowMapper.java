package com.example.MajorProject;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

public class ProductRowMapper implements RowMapper<Product> {

    @Override
    public Product mapRow(ResultSet rs, int rowNum) throws SQLException{
        Product p = new Product();

        int ProductId = rs.getInt("PRODUCT_ID"); p.setProductId(ProductId);
        String ProductName = rs.getString("PRODUCT_NAME"); p.setProductName(ProductName);
        String Category = rs.getString("CATEGORY"); p.setCategory(Category);
        int CompanyId = rs.getInt("COMPANY_ID"); p.setCompanyId(CompanyId);
        double Price = rs.getDouble("PRICE"); p.setPrice(Price);
        String Features = rs.getString("FEATURES"); p.setFeatures(Features);
        int Rating = rs.getInt("RATING");p.setRating(Rating);
        return p;
    }
    
}
