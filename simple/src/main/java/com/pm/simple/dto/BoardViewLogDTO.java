package com.pm.simple.dto;

import java.time.LocalDate;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BoardViewLogDTO {
    private Long id;
    private Long boardId;
    private Long userId;
    private LocalDate viewDate;

    @Builder
    public BoardViewLogDTO(Long id, Long boardId, Long userId, LocalDate viewDate) {
        this.id = id;
        this.boardId = boardId;
        this.userId = userId;
        this.viewDate = viewDate;
    }
}
