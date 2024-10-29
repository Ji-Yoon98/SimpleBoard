package com.pm.simple.mapping;

import org.springframework.stereotype.Component;

import com.pm.simple.dto.BoardViewLogDTO;
import com.pm.simple.entity.Board;
import com.pm.simple.entity.BoardViewLog;
import com.pm.simple.entity.User;

@Component
public class BoardViewLogMapping {
    // DTO -> Entity
    public BoardViewLog toEntity(BoardViewLogDTO dto, Board board, User user) {
        return BoardViewLog.builder()
            .id(dto.getId())
            .board(board)
            .user(user)
            .viewDate(dto.getViewDate())
            .build();
    }

    // Entity -> DTO
    public BoardViewLogDTO toDTO(BoardViewLog entity) {
        return BoardViewLogDTO.builder()
            .id(entity.getId())
            .boardId(entity.getBoard().getId())
            .userId(entity.getUser().getId())
            .viewDate(entity.getViewDate())
            .build();
    }
}
