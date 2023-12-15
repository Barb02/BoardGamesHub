package com.pt.ua.boardgameshub.dao.request_body;

import java.util.List;
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

        double min = Double.parseDouble(parts[0]);
        double max = Double.parseDouble(parts[1]);

        return new Range(min, max);
    }
}
