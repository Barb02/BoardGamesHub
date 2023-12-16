package com.pt.ua.boardgameshub.dao.request_body;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Range {
    private double min;
    private double max;

    public static Range parseString(String rangeString) {

        if(rangeString.isEmpty()){
            return new Range(-1,-1);
        }

        String[] parts = rangeString.split("_");

        if (parts.length != 2) {
            throw new IllegalArgumentException("Invalid range format. Expected format: min_max");
        }
        double min,max;
        if(parts[0].equalsIgnoreCase("any"))
            min = Double.MAX_VALUE;
        else
             min = Double.parseDouble(parts[0]);

        if(parts[1].equalsIgnoreCase("any"))
            max = Double.MIN_VALUE;
        else
            max = Double.parseDouble(parts[1]);

        return new Range(min, max);
    }
}
