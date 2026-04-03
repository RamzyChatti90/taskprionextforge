package com.taskprionextforge.service.mapper;

import com.taskprionextforge.domain.Comment;
import com.taskprionextforge.domain.Task;
import com.taskprionextforge.service.dto.CommentDTO;
import com.taskprionextforge.service.dto.TaskDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Comment} and its DTO {@link CommentDTO}.
 */
@Mapper(componentModel = "spring")
public interface CommentMapper extends EntityMapper<CommentDTO, Comment> {
    @Mapping(target = "task", source = "task", qualifiedByName = "taskId")
    CommentDTO toDto(Comment s);

    @Named("taskId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    TaskDTO toDtoTaskId(Task task);
}
