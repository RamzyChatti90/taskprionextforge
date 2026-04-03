package com.taskprionextforge.service.mapper;

import com.taskprionextforge.domain.Category;
import com.taskprionextforge.service.dto.CategoryDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Category} and its DTO {@link CategoryDTO}.
 */
@Mapper(componentModel = "spring")
public interface CategoryMapper extends EntityMapper<CategoryDTO, Category> {}
