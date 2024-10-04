
package com.example.MajorProject;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

public class ProductReviewRowMapper implements RowMapper<ProductReview>  {
    @Override
    public ProductReview mapRow(ResultSet rs, int rowNum) throws SQLException{
        ProductReview c = new ProductReview();
        c.setPrid(rs.getInt("PRID"));
        String Author = rs.getString("USERNAME");c.setAuthor(Author);
        String Title = rs.getString("TITLE");c.setTitle(Title);
        int ReviewRating = rs.getInt("PR_RATING");c.setRating(ReviewRating);
        String DateTime = rs.getString("CREATION_DATE");c.setDateTime(DateTime);
        String AnswerOne = rs.getString("ANSWER_1");c.setAnswerOne(AnswerOne);
        String AnswerTwo = rs.getString("ANSWER_2");c.setAnswerTwo(AnswerTwo);
        String AnswerThree = rs.getString("ANSWER_3");c.setAnswerThree(AnswerThree);
        String AnswerFour = rs.getString("ANSWER_4");c.setAnswerFour(AnswerFour);
        return c;
    }
}


