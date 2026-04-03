package com.taskprionextforge.service.mapper;

import com.taskprionextforge.domain.Category;
import com.taskprionextforge.domain.Task;
import com.taskprionextforge.domain.User;
import com.taskprionextforge.service.dto.CategoryDTO;
import com.taskprionextforge.service.dto.TaskDTO;
import com.taskprionextforge.service.dto.UserDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Task} and its DTO {@link TaskDTO}.
 */
@Mapper(componentModel = "spring")
public interface TaskMapper extends EntityMapper<TaskDTO, Task> {
    @Mapping(target = "assignee", source = "assignee", qualifiedByName = "userLogin")
    @Mapping(target = "category", source = "category", qualifiedByName = "categoryId")
    TaskDTO toDto(Task s);

    @Named("userLogin")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "login", source = "login")
    UserDTO toDtoUserLogin(User user);

    @Named("categoryId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    CategoryDTO toDtoCategoryId(Category category);
}
