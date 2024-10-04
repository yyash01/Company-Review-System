package com.example.MajorProject;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value="product")
public class ProductController {
    
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping
    public List<Product> GetAllProduct(){
        String query = String.format("select P.*,C.COMPANY_NAME from PRODUCT P INNER JOIN COMPANY C ON P.COMPANY_ID=C.COMPANY_ID;");
        List<Product> res = jdbcTemplate.query(query,new ProdWithCompanyMapper());
        return res;
    }

    @GetMapping("/{ProductId}")
    public Product GetProduct(@PathVariable int ProductId){
        String query = String.format("select * from PRODUCT where PRODUCT_ID=%d;",ProductId);
        Product obj = jdbcTemplate.queryForObject(query, new ProductRowMapper());
        return obj;
    }

    @GetMapping("/GetReview/{ProductId}")
    public List<ProductReview> GetReview(@PathVariable int ProductId){
        String query = String.format("select P.*,U.USERNAME from PRODUCT_REVIEW P INNER JOIN USER U ON P.AUTHOR=U.ID where P.PRODUCTID=%d;",ProductId);
        List<ProductReview> obj = jdbcTemplate.query(query, new ProductReviewRowMapper());
        return obj;
    }

    @GetMapping("/Search/{Name}")
    public List<Product> GetProductByNameOrCategory(@PathVariable String Name){
        String query = String.format("select * from PRODUCT where PRODUCT_NAME like '%s%%' or CATEGORY like '%s%%'",Name,Name);
        List<Product> res = jdbcTemplate.query(query, new ProductRowMapper());
        return res;
    }

    @GetMapping("/SearchByRating/{Name}/{Rating}")
    public List<Product> GetProductByRating(@PathVariable int Rating,@PathVariable String Name){
        String query = String.format("select * from PRODUCT where PRODUCT_NAME='"+Name+"' or CATEGORY='"+Name+"' AND RATING='"+Rating+"';");
        List<Product> res = jdbcTemplate.query(query, new ProductRowMapper());
        return res;
    }


    @GetMapping("/SearchByPrice/{Name}/{StartRange}/{EndRange}")
    public List<Product> GetProductByPrice(@PathVariable String Name, @PathVariable int StartRange, @PathVariable int EndRange){
        String query = String.format("select * from PRODUCT where PRODUCT_NAME='"+Name+"' or CATEGORY='"+Name+"' AND( PRICE BETWEEN'"+StartRange+"' and '"+EndRange+"');");
        List<Product> res = jdbcTemplate.query(query, new ProductRowMapper());
        return res;
    }

    @PostMapping("/AddReview")
    public String AddReview(@RequestBody ProductReview obj){
        String findUser = String.format("select ID from USER where USERNAME='%s'", obj.getAuthor());
        Map<String,Object>res =  jdbcTemplate.queryForMap(findUser);

        String query = String.format("insert into PRODUCT_REVIEW (AUTHOR,TITLE,PR_RATING,CREATION_DATE,PRODUCTID,ANSWER_1,ANSWER_2,ANSWER_3,ANSWER_4) Values (%d,'%s',%d,'%s',%d,'%s','%s','%s','%s');",res.get("ID"),obj.getTitle(),obj.getRating(),obj.getDateTime(),obj.getProductId(),obj.getAnswerOne(),obj.getAnswerTwo(),obj.getAnswerThree(),obj.getAnswerFour());
        jdbcTemplate.execute(query);
        return "OK";
    }

    @DeleteMapping("/DeleteReview")
    public String DeleteReview(@RequestBody int obj){
       String query = String.format("DELETE from PRODUCT_REVIEW where PRID=%d",obj);
       jdbcTemplate.execute(query);
       return "OK";
    }
}
