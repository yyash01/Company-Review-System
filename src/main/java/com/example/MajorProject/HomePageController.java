package com.example.MajorProject;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "reviewer")
public class HomePageController {
    

    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    @CrossOrigin
    @GetMapping
    public String Home() {
        return "Hello to the Home Page";
    }

    @GetMapping("/Search/products/{ProductName}")
    public List<Product> GetProduct(@PathVariable String ProductName){
       String Query = String.format("select * from PRODUCT where PRODUCT_NAME='"+ProductName+"';");
       List<Product> products =jdbcTemplate.query(Query,new ProductRowMapper());
       return products;
    }

    @GetMapping("/search/company/{CompanyName}")
    public List<Company> GetCompany(@PathVariable String CompanyName){
       String Query = String.format("select * from COMPANY where COMPANY_NAME='"+CompanyName+"';");
       List<Company> company =jdbcTemplate.query(Query,new CompanyRowMapper());
       return company;
    }

}
